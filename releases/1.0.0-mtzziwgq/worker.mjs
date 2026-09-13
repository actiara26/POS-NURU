import sqlite3InitModule from './sqlite.mjs';
import { createStore } from './store.mjs';
let store;
let frozen = false;
let releaseLock;
let queue = Promise.resolve();
const version = new URL(import.meta.url).pathname.split('/').at(-2);
const fail = error => ({ status: 503, data: { error: error.message || 'ฐานข้อมูลในเครื่องไม่พร้อม กรุณาปิดแล้วเปิดแอปอีกครั้ง' } });
async function start() {
  if (!navigator.locks || !navigator.storage?.getDirectory) throw new Error('เครื่องนี้ไม่รองรับพื้นที่ข้อมูลที่จำเป็น ใช้ iPadOS 17 ขึ้นไปและ Safari ปกติ');
  const scope = new URL('../../', import.meta.url).pathname;
  const scopeHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(scope))), b => b.toString(16).padStart(2, '0')).join('').slice(0, 24);
  await new Promise((resolve, reject) => {
    navigator.locks.request(`massage-pos-database-v1:${scope}`, { ifAvailable: true }, lock => {
      if (!lock) { reject(new Error('POS เปิดอยู่ในหน้าต่างอื่น ให้ปิดหน้าต่างนั้นก่อน แล้วเปิดจากไอคอนหน้าจอโฮมเพียงครั้งเดียว')); return; }
      resolve();
      return new Promise(done => { releaseLock = done; });
    }).catch(reject);
  });
  const sqlite3 = await sqlite3InitModule({ locateFile: name => new URL(name, import.meta.url).href });
  const pool = await sqlite3.installOpfsSAHPoolVfs({ name: 'massage-pos-v1', directory: `/massage-pos-v1-${scopeHash}`, initialCapacity: 12 });
  store = createStore(sqlite3, pool);
  store.beginMigration(version);
  globalThis.__posHost = store.host;
  await import('./engine.js');
  const boot = await globalThis.POSNative.request({ method: 'GET', path: '/auth/status' });
  if (boot.status !== 200) throw new Error(boot.data?.error || 'ตรวจโครงสร้างข้อมูลไม่สำเร็จ');
  store.finishMigration(version);
  return { version, database: 'SQLite OPFS', schemaVersion: 17 };
}
const ready = start();
ready.then(data => postMessage({ ready: true, data }), error => postMessage({ ready: false, error: error.message }));
async function request(message) {
  await ready;
  const { request: input } = message;
  if (frozen) return { status: 409, data: { error: 'หยุดรับรายการเพื่ออัปเดตแล้ว กรุณาเปิดแอปใหม่' } };
  // Every privileged host operation is preceded by the shared engine's owner check.
  if (input.path === '/runtime/prepare-update') {
    const auth = await POSNative.request({ method: 'POST', path: '/runtime/import', headers: input.headers });
    if (auth.status !== 200) return auth;
    const db = store.open();
    if (db.selectValue("SELECT count(*) FROM shifts WHERE status='OPEN'")) return { status: 409, data: { error: 'ต้องปิดกะก่อนอัปเดต' } };
    if (db.selectValue('SELECT count(*) FROM ipad_pending_requests')) return { status: 409, data: { error: 'ยังมีรายการไม่ยืนยันผล ให้ผู้ทำรายการเข้าสู่ระบบและตรวจรายการเดิมก่อน' } };
    const file = store.snapshot(`pos-${crypto.randomUUID()}.sqlite`);
    frozen = true;
    return { status: 200, data: { ...file, bytes: store.bytesOf(file.name) } };
  }
  if (input.path === '/settings/backups/restore') {
    // Include pending envelopes from ALL users, not only the owner currently signed in.
    const auth = await POSNative.request({ method: 'POST', path: '/runtime/import', headers: input.headers });
    if (auth.status !== 200) return auth;
    if (store.open().selectValue('SELECT count(*) FROM ipad_pending_requests')) return { status: 409, data: { error: 'ตรวจผลรายการค้างของผู้ใช้ทุกคนก่อนกู้คืน' } };
  }
  const response = await POSNative.request(input);
  if (input.path === '/runtime/status' && response.status === 200) response.data.platform = 'pwa';
  if (response.status === 200 && response.data?.nativeAction === 'export') {
    response.data = { success: true, name: response.data.name, bytes: store.bytesOf(response.data.name) };
  } else if (response.status === 200 && response.data?.nativeAction === 'import') {
    if (!message.importBytes) return { status: 400, data: { error: 'กรุณาเลือกไฟล์สำรอง' } };
    const file = store.save(`pos-${crypto.randomUUID()}.sqlite`, new Uint8Array(message.importBytes));
    response.data = { success: true, ...file };
  }
  return response;
}
onmessage = event => {
  const message = event.data;
  if (message.command !== 'request') return;
  const work = queue.then(() => request(message)).catch(fail);
  queue = work.then(result => postMessage({ id: message.id, result }));
};
