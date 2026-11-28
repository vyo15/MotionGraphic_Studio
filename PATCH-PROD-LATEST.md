# PATCH — Prod Preview, integrasi CHATGPT-LATEST(1)

Base: CHATGPT-LATEST(1).zip, Master v2.0.0. ZIP asli terverifikasi tidak rusak. Auto QA sudah terpasang; mode prod belum ada. Enam file base cocok SHA-256 dengan patch sebelumnya, dua file baru belum ada. Tidak ada perubahan video, ACC, library catalog, Root, index, dependency, lockfile, maupun mirror dalam patch.

## Pasang
Tutup Studio, backup Master, ekstrak di luar root. Bandingkan hash base di bawah dengan file lokal. Jika hash sudah sama dengan patch, lewati; jika berbeda dari keduanya, jangan replace sebelum rekonsiliasi. Copy isi ke root Master. Gunakan `npm run prod` jika PC sudah sync dan dependency tersedia; jika readiness menolak, jalankan `npm run dev` sekali lalu tutup Studio dan buka prod. Prod bukan UI read-only: gunakan dev untuk edit/Save. Menu tetap tersedia.

## QA pada ekstraksi bersih
- Node 22.16.0, TypeScript global hanya untuk pengujian, tidak dipaketkan. 218 test: 211 pass, 0 fail, 7 skip; 10 test khusus prod lulus (launcher mock).
- Release check, sync state, sync, strict mirror asset validation lulus: 6 video, 63 komposisi (51 segmen), 71 referensi aset, 0 masalah sumber. Mirror hasil sync tidak disertakan.
- 446 file project asli identik; semua file asli lain identik kecuali enam target. Tidak ada penghapusan.
- GUI Windows, kecepatan startup aktual, playback, browser capture, Save/reload, MP4 belum diuji: CLI Remotion nyata tidak tersedia di sandbox. Tidak ada perubahan langsung pada PC pengguna.

## File dan checksum SHA-256

- `package.json`
  - Base: `7acbf7536edd8e40602304fc8cd0a5f166b152894eb881695a1bef2ed296e501`
  - Patch: `7014444230f19d17653bdcd55a255d4b5cdbb667725c1b4e75ca1e0d9ee92517`

- `tools/start-studio.mjs`
  - Base: `64bdec67540e55fdc983a7438197e3e4aff82627aa97b9f5a4e973d1a315ee33`
  - Patch: `f8c2691210b184d1a17b3b73cd0b01622143aad93cc4a479429e4dc20f871a89`

- `tools/prod-preflight.mjs`
  - Base: `NEW`
  - Patch: `a90021ac05f257b4be7045147b7b4b23d6e8de495ff59eb21e393d150119cf26`

- `tools/validate-library.mjs`
  - Base: `6303df7348abc39afcd60b926ffbf99ec17949aa7cf38db3559169ac17951591`
  - Patch: `d17b1d5e40c2c5c51d1e0b9686b55d1f14d70565efefec008f58314af2cbab6a`

- `tests/prod-preview.test.mjs`
  - Base: `NEW`
  - Patch: `e33e3105476ac1d39f830a15d02df3a7eea84966ace209b20c9ab2dd7ece7a1f`

- `README.md`
  - Base: `76d1e82b088d60e114f241d826abce0a5855b2a7779b1c50a660d4af8b2d4bf4`
  - Patch: `40bf7d1d90510ca971bc0bfb9ab8635d9e7f696062e9220fc17a5936d38b25e5`

- `docs/OPERASIONAL-STUDIO.md`
  - Base: `e0c5aee7d32fdfb33cd04a1746a71641c17c16595d570fd3ced82a6ef948a21c`
  - Patch: `d06c8cf7d8066278c29118c3547a99606e634cf7005f31ecf54bb6d2b8924dfb`

- `contracts/studio-capabilities.json`
  - Base: `d50a574d9f7328d5aac4e562ce7e6f678854e8276151e8e4583f526eb687a92b`
  - Patch: `ee2b26b6edc977e6017b1447220220dee6972280af88f30908fe23a4f91081cd`
