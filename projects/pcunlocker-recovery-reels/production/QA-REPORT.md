# QA — 24 November 2026

Test pada salinan Master FULL v1.8.1-20261124-080253, bukan instalasi pengguna.
- npm run sync: lulus; 4 video, 43 komposisi, 35 segmen, 33 referensi aset, 0 masalah sumber. Konflik ID segmen S01 diselesaikan dengan prefix unik PCUnlockerRecoveryReels-. Tidak ada file inti atau project existing dalam paket add-on.
- addon:validate --strict --syntax: lulus, 0 FAIL, 0 WARN.
- qa:native: lulus AST, 228 target bernama, 0 FAIL, 0 WARN. 124 target teks dan 104 visual tercatat dalam blueprint.
- Preview gabungan eksternal: 1080×1920, 30 FPS, 330 frame (11 detik); preview full 1950 frame (65 detik). S02 memakai MP4 pilihan 09 yang disetujui.
- Source editable merupakan rekonstruksi vektor, bukan MP4 sebagai layer tunggal. Preview eksternal bukan render native source.
- Belum diuji: bundling Remotion, render native, kecocokan visual piksel per piksel, GUI Windows, drag/resize, Save/reload, VO aktual, sinkronisasi final. Ilustrasi UI pihak ketiga belum diuji pada aplikasi asli.
