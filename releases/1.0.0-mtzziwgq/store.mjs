// All calls run synchronously inside one dedicated Worker. Never fall back to memory.
export function createStore(sqlite3, pool) {
  let db;
  const catalog = new pool.OpfsSAHPoolDb('/backups.sqlite');
  catalog.exec(`PRAGMA journal_mode=DELETE; PRAGMA synchronous=FULL;
    CREATE TABLE IF NOT EXISTS files(name TEXT PRIMARY KEY, bytes BLOB NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT NOT NULL)`);
  const query = (connection, sql, params = []) => connection.exec({ sql, bind: params, rowMode: 'object', returnValue: 'resultRows' });
  const meta = key => query(catalog, 'SELECT value FROM meta WHERE key=?', [key])[0]?.value;
  const setMeta = (key, value) => catalog.exec({ sql: 'INSERT OR REPLACE INTO meta VALUES (?,?)', bind: [key, value] });
  const nameCheck = name => {
    if (typeof name !== 'string' || !/^pos-[a-f0-9-]{36}\.sqlite$/i.test(name)) throw new Error('ชื่อไฟล์สำรองไม่ถูกต้อง');
    return name;
  };
  const bytesOf = name => {
    const row = query(catalog, 'SELECT bytes FROM files WHERE name=?', [nameCheck(name)])[0];
    if (!row) throw new Error('ไม่พบไฟล์สำรอง');
    return row.bytes;
  };
  const close = () => { db?.close(); db = undefined; };
  const open = () => {
    if (!db) {
      db = new pool.OpfsSAHPoolDb('/pos.sqlite');
      db.exec('PRAGMA journal_mode=DELETE; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON; PRAGMA trusted_schema=OFF');
    }
    return db;
  };
  function validate(bytes) {
    if (!(bytes instanceof Uint8Array) || bytes.length < 512 || bytes.length > 256 * 1024 * 1024) throw new Error('ไฟล์ต้องเป็น SQLite ของ POS ขนาดไม่เกิน 256 MB');
    let check;
    try {
      pool.importDb('/verify.sqlite', bytes);
      check = new pool.OpfsSAHPoolDb('/verify.sqlite');
      check.exec('PRAGMA trusted_schema=OFF');
      if (check.selectValue('PRAGMA integrity_check') !== 'ok') throw new Error('ไฟล์ฐานข้อมูลเสียหาย');
      const version = check.selectValue('SELECT version FROM schema_version WHERE id=1');
      if (!Number.isInteger(version) || version < 1 || version > 17) throw new Error('รุ่นฐานข้อมูลนี้ยังไม่รองรับ');
      for (const table of ['users', 'orders', 'services', 'therapists', 'rooms', 'shifts', 'settings']) {
        if (!check.selectValue("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?", [table])) throw new Error('ไฟล์นี้ไม่ใช่ข้อมูลร้าน POS ที่ครบถ้วน');
      }
      if (check.selectValue('SELECT count(*) FROM pragma_foreign_key_check') !== 0) throw new Error('ความสัมพันธ์ข้อมูลในไฟล์ไม่ครบถ้วน');
      return { schemaVersion: version, orders: check.selectValue('SELECT count(*) FROM orders') };
    } finally { check?.close(); pool.unlink('/verify.sqlite'); }
  }
  function save(name, bytes) {
    nameCheck(name);
    validate(bytes);
    const createdAt = new Date().toISOString();
    catalog.exec({ sql: 'INSERT INTO files VALUES(?,?,?)', bind: [name, bytes, createdAt] });
    // Bounded local history. A recovery marker's baseline is never removed.
    const baseline = meta('restore') ? JSON.parse(meta('restore')).before : '';
    let retention = 30;
    try { retention = Math.max(5, Math.min(365, Number(open().selectValue("SELECT value FROM settings WHERE key='backup_retention_count'")) || 30)); } catch { /* Initial setup uses the default. */ }
    catalog.exec({ sql: 'DELETE FROM files WHERE name<>? AND name<>? AND name NOT IN (SELECT name FROM files ORDER BY createdAt DESC,rowid DESC LIMIT ?)', bind: [baseline, name, retention] });
    return { name, size: bytes.length, createdAt };
  }
  function snapshot(name) {
    const prior = query(catalog, 'SELECT name,length(bytes) AS size,createdAt FROM files WHERE name=?', [nameCheck(name)])[0];
    if (prior) { validate(bytesOf(name)); return prior; }
    if (!sqlite3.capi.sqlite3_get_autocommit(open().pointer)) throw new Error('รอให้บันทึกรายการเสร็จก่อนสำรอง');
    return save(name, sqlite3.capi.sqlite3_js_db_export(db.pointer));
  }
  const restore = name => { const bytes = bytesOf(name); validate(bytes); close(); pool.importDb('/pos.sqlite', bytes); };
  // The marker is flushed in a separate SQLite transaction BEFORE replacing the live database.
  // A killed worker or failed migration recovers the pre-restore snapshot on the next boot.
  const interrupted = meta('restore');
  if (interrupted) { restore(JSON.parse(interrupted).before); catalog.exec("DELETE FROM meta WHERE key='restore'"); }
  function host(action, json) {
    try {
      const body = JSON.parse(json);
      let value = true;
      switch (action) {
        case 'db.open': open(); break;
        case 'db.close': close(); break;
        case 'db.exec': open().exec(body.sql.replace(/PRAGMA\s+journal_mode\s*=\s*WAL/gi, 'PRAGMA journal_mode=DELETE')); break;
        case 'db.query': {
          const rows = query(open(), body.sql, body.params.map(p => p === undefined ? null : p));
          value = body.mode === 'get' ? rows[0] ?? null : body.mode === 'all' ? rows : {
            changes: sqlite3.capi.sqlite3_changes(db.pointer), lastInsertRowid: Number(sqlite3.capi.sqlite3_last_insert_rowid(db.pointer))
          };
          break;
        }
        case 'random': {
          if (!Number.isInteger(body.length) || body.length < 0 || body.length > 65536) throw new Error('Invalid random size');
          value = Array.from(crypto.getRandomValues(new Uint8Array(body.length)), b => b.toString(16).padStart(2, '0')).join(''); break;
        }
        case 'backup.exists': value = !!query(catalog, 'SELECT 1 FROM files WHERE name=?', [nameCheck(body.name)])[0]; break;
        case 'backup.validate': value = validate(bytesOf(body.name)); break;
        case 'backup.create': value = snapshot(body.name); break;
        case 'backup.list': value = query(catalog, 'SELECT name,length(bytes) AS size,createdAt FROM files ORDER BY createdAt DESC'); break;
        case 'backup.restore': restore(body.name); break;
        case 'restore.begin': setMeta('restore', JSON.stringify(body)); break;
        case 'restore.complete': catalog.exec("DELETE FROM meta WHERE key='restore'"); break;
        default: throw new Error(`Unsupported local action: ${action}`);
      }
      return JSON.stringify({ ok: true, value }, (_, v) => typeof v === 'bigint' ? Number(v) : v);
    } catch (error) { return JSON.stringify({ ok: false, error: error.message, status: 503 }); }
  }
  return { host, open, close, meta, setMeta, snapshot, restore, validate, bytesOf, save,
    shutdown() { close(); catalog.close(); },
    beginMigration(version) {
      if (meta('release') === version || !pool.getFileNames().includes('/pos.sqlite')) return;
      // Existing data is validated and snapshotted before shared code can run migrations.
      open();
      const name = `pos-${crypto.randomUUID()}.sqlite`;
      snapshot(name);
      setMeta('restore', JSON.stringify({ before: name, reason: 'migration' }));
    },
    finishMigration(version) { setMeta('release', version); catalog.exec("DELETE FROM meta WHERE key='restore'"); },
  };
}
