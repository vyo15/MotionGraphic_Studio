# QA Kompatibilitas — Master FULL v1.8.1 21-Nov-2026

## Sumber asli
- Master: `/mnt/data/MotionGraphic-Studio-FULL-v1.8.1-20261121-044452.zip`, **engine-only**. Ditemukan 146 entri, tidak ada file video di `projects/`.
- Source proyek: ZIP add-on Easy2Boot per-elemen dari sesi sebelumnya, sudah menghasilkan full preview 2701 frame pada 30 fps melalui renderer offline (bukan Remotion asli).

## Hasil isolasi (Master uji tidak disalin ke output)
- Registrasi sync: 1 video + 6 segmen, 8 komposisi termasuk VO Guide, **PASS**.
- Validasi manifest + asset + import: **0 FAIL / 5 WARN** (staticFile dinamis tidak terverifikasi oleh validator), **PASS dengan peringatan**.
- `npm test`: 66 PASS / 14 SKIP / 0 FAIL.
- `npm run check:syntax`: 62 source, 0 syntax error.
- `npm run check` komponen awal PASS; tahap TypeScript penuh **BLOCKED** karena node_modules/.bin/tsc dan dependency Remotion tidak disertakan dalam engine-only Master. Bukan PASS.
- Native Remotion render/codec: **NOT TESTED** di lingkungan ini.
- Drag/resize/select/save-reload editor Windows: **NOT TESTED**; 247 komponen Interactive terdeteksi secara statis, bukan bukti direct-edit seluruh elemen.

## Source lock
- File JSX/TSX, animasi, konfigurasi, manifest dan audio pada source add-on lama tidak dimodifikasi. Perubahan pada paket ini hanya dokumentasi, katalog layer dan status persetujuan.
- Jangan menimpa `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, `package.json`, atau mirror `public/videos` Master secara manual.
- Paling aman: install penuh add-on ini ke Master engine-only; revisi berikutnya tetap patch file-change only.
