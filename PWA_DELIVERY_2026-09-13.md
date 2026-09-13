# PWA delivery and validation — 13 September 2026

Target: one iPad, no server running in the shop. Repository selected by the owner: `actiara26/POS-NURU` (public, initially empty). Only the generated static distribution is published; this development workspace and live `data` directory are excluded.

Release: `1.0.0-mtzziwgq`, database schema 17, SQLite WASM 3.53.4. Distribution: `pwa/dist`; export archive: `_build/pos-nuru-pwa-1.0.0-mtzziwgq.zip` (SHA-256 `e1d5716d3e3bfa7beae37a3504219ac97c5712e3ad54f23985aabc2cb77c602a`). Hosting: Cloudflare Pages Direct Upload, project `pos-nuru`, production URL https://pos-nuru.pages.dev/. GitHub Pages is not enabled. Future GitHub commits alone do not deploy this site.

Implemented:

- React front end calls the shared POS business engine inside a dedicated Worker. SQLite stores data in OPFS; there is no HTTP backend dependency or in-memory database fallback.
- Single writer enforced with Web Locks and the SAH pool VFS. Storage is isolated by origin and stable site path.
- Financial envelopes survive worker termination and prevent duplicate sales/payouts when their result was not acknowledged.
- Owner-only validated SQLite file import/export and restore, pre-restore snapshots, durable restore/migration recovery marker, bounded local backup history.
- Full release precaching with SHA-256 checks. Chosen program version remains pinned even if the browser activates a new service worker while the app is closed.
- Owner update checks all open shifts and pending financial envelopes, makes a backup, freezes requests, requires user confirmation of exported backup, then switches the cached program. Multiple open windows block the final switch.
- Thai installation guide, first-run Home Screen guidance on iPad, explicit storage/export status and disabled external integrations.

Verification performed with disposable data only:

- PWA automated tests: 5 passed (complete distribution, pinned-version lifecycle, incomplete/corrupt release rejection, same-origin HTML redirects normalized for cached navigation, cross-origin redirects rejected).
- Frontend tests: 18 passed.
- Shared local engine tests: 8 passed, including storage failures, replay, cash close and PIN lockout.
- Actual Chromium browser + SQLite WASM/OPFS: owner setup, second-writer rejection, manager permissions, open-shift update rejection, sale recovery after terminated Worker, payout deduplication, cash reconciliation, valid backup export/import/restore, corrupt-file rejection, freeze/reopen all passed.
- Stopped the localhost web server completely, reloaded the PWA, and logged in with the existing owner. Original local data remained available.
- Downloaded actual SQLite backup files to Downloads (516,096 bytes), then updated from `1.0.0-mtznhik3` to `1.0.0-mtzxxif3` through the UI. Existing owner and room data remained; the new version label and guide link appeared.
- Build passed. A ~537 kB frontend bundle size advisory remains; all essential resources are precached, so this is an initial download/performance consideration rather than a failed build.
- The first Cloudflare deployment exposed its automatic HTML canonical redirects, which the original installer rejected. The corrected service worker accepts same-origin redirects only after checking the asset hash, and stores a fresh response without redirect metadata so offline navigation remains valid.
- Final Cloudflare production deployment succeeded. All 18 served program/guide resources matched local build bytes over HTTPS; JavaScript and WASM MIME types were correct. `sw.js` returned `Cache-Control: no-store`; release assets returned immutable caching. The actual production browser completed offline-resource preparation, opened SQLite OPFS and displayed first-owner setup. No shop account or real financial data was created on that browser origin.

Physical-device acceptance is still required: the owner's iPad/iPadOS, Add to Home Screen, airplane-mode restart, an entire test shift, Files/iCloud export + restore, OS termination under memory pressure and actual printer compatibility. None of these should be represented as already tested on a real iPad.

Current limitations: no multi-device synchronization; no automatic Sheets/Drive/Telegram delivery; no guaranteed remote backup; no automatic merge of sales created after an older backup. iPad storage can still be deleted or lost. The installation is ready for device trials, not yet accepted for real shop transactions.
