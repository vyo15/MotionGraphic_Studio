# AUTO QA WORKFLOW — FILE CHANGE ONLY
Base: MotionGraphic-Studio-FULL-v2.0.0-20261128-061702.zip

## Install
Tutup Studio. Backup Master lengkap, ekstrak ZIP di luar Master, periksa checksum file existing, lalu copy isi ke root Master. File laporan ini boleh disimpan di luar root. Jalankan `npm run dev` (bukan npm test/sync terlebih dahulu). Startup mengembalikan font Sharing Printer dari library resmi yang sudah ada, hanya jika loader identik dan folder pack belum ada; pack parsial/berubah tidak ditimpa. Tidak ada font binary di patch. Jika pack lokal hilang/corrupt, proses berhenti dan melaporkan masalah.

## Workflow
- Dev: sync + static gate + backup + regression suite otomatis; gagal = startup berhenti dengan log.
- Selama sesi: sampling setelah source stabil, khusus screen-space-v1; satu child capture per waktu, tidak mengulang kegagalan input yang sama. Perubahan source memicu pemeriksaan baru. Legacy NOT RUN. Tidak ada auto reposition.
- Tutup Studio, `npm run menu` > 17 > project > sample preview / full preview / full final / declared plan. Full final = default Props dengan guide compact off, bukan CapCut HQ. Full scan tidak berjalan otomatis saat startup/render.
- Bukti capture di qa-out/<slug>/spatial-*; log startup di Logs eksternal. QA aktual tidak disertakan dalam ZIP handoff source.
- `MOTION_STUDIO_AUTO_SPATIAL=0` (opsional) menonaktifkan sampling; CLI lama tetap tersedia untuk recovery.

## QA
- 208 tests: 201 pass, 0 fail, 7 skip (Linux/Node 22, TypeScript lokal tersedia). Setelah penyelarasan dokumen/menu, 16/16 targeted tests lulus; syntax check 6 modul lulus.
- Pemulihan font nyata dalam salinan Master: verified pack; idempotent; 0 missing source assets, 71 references; sync 6 videos, 63 compositions; static gates pass, existing native editable warning legacy.
- Seluruh file project asli identik; hanya pemulihan aset lokal saat dev (font pack + license + lock, tanpa overwrite), tidak ada asset/font yang dikirim dalam ZIP.
- Runtime Remotion/Chromium, Windows startup GUI, actual capture, Save/reload, MP4/listening belum diuji karena dependensi Remotion tidak lengkap. Semua 6 video sekarang masih legacy untuk capture. Test automasi menggunakan fixture, bukan browser nyata.
- Tidak mengubah package.json/lock, generated Root/catalog/mirror, keputusan ACC, atau renderer.

## Checksums (SHA-256)
| Path | Base | New |
|---|---|---|
| `tools/auto-spatial.mjs` | NEW | affc58405a20fdd9170dda06b5aba02f5f372d9927c23d58dc097568336bab9e |
| `tools/run-regression.mjs` | NEW | 272ba818252d53eb53ab5cbb2cd3a27d481c417e1a7616e17f67678b79382d1b |
| `tools/prepare-studio.mjs` | 29c011a98b62d6033a04104dfaa5cf83359f0bc529792847207e92ad37fe80e6 | 5260325ef2e768a8e3a0cdeec95049c36c39a8f83edb2043985f0a5ed6439383 |
| `tools/start-studio.mjs` | 4f227a642cee1149a988e55f29bcd52c82467ec62183943b21639b9d9ec88acf | 64bdec67540e55fdc983a7438197e3e4aff82627aa97b9f5a4e973d1a315ee33 |
| `tools/studio-menu.mjs` | 2da7dba8cf2eb435cbc435af8557c1e351c5c83e6c7e25a7417b2834161f7b12 | 3ad74c983bc0c8259e1cfcde83db08d734f02c91aa35013484813cced9a0f2b5 |
| `tools/font-library.mjs` | 234f7f1e7c53cc2937ff357e0c61ad87e7058fa7d50428ab10ae206595e4af79 | 5ffe95410c3021df3012b93bdf3a576973057a2f75ef1d526c150a06688349e3 |
| `tests/auto-spatial-workflow.test.mjs` | NEW | b78756e269d486fb04223089be228a76fd637b65aa980bd3e1f0f2983300e99a |
| `tests/prompt-first.test.mjs` | 8014f1c465c6e9a37382e19ceee1eaa60cb2b837a53f27691d2fd3a889905d08 | a8ab2894b91340f5b865522adb80700df54bc544163b24c94d12e6aab1358179 |
| `contracts/studio-capabilities.json` | 19492a786c641ac898a30b98fe8438b958253597b56fceab220b0844f9f76381 | d50a574d9f7328d5aac4e562ce7e6f678854e8276151e8e4583f526eb687a92b |
| `docs/PRODUCTION-TOOLKIT.md` | 223179935b081a21d57466169ab68971024eeecdc3283abd5f44493a13b9a1b6 | d466829ea93d106488b0d8434dea7325af2e3ef2c6cbe90b19403b43653fdfd9 |
| `docs/OPERASIONAL-STUDIO.md` | b6a93f7f3235aa21837791f1a19cd902498cd7ac0cc3ccfda39ea67d3fc9ea28 | e0c5aee7d32fdfb33cd04a1746a71641c17c16595d570fd3ced82a6ef948a21c |
| `README.md` | ef5a9953674a753a44040dce4b85c15f76f3d510a3e1197a934a1f9af80fb142 | 76d1e82b088d60e114f241d826abce0a5855b2a7779b1c50a660d4af8b2d4bf4 |
