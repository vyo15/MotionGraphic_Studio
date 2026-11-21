# PERBAIKAN MASTER STUDIO — 21 November 2026

Sumber: `MotionGraphic-Studio-Master-v1.8.1-20261121-032547(2).zip`. Ini **perbaikan Master yang sama**, bukan studio/video baru. Keenam proyek tetap berada di `projects/<slug>/` dan ID-nya dipertahankan.

## Masalah yang diperbaiki

1. **`npm run dev` / sync gagal**: manifest `shutdown-otomatis-hook-realistis` menyatakan 7 scene (1635 frame), tetapi `src/config/timeline.ts` dan komposisi `Video.tsx` masih hanya memuat 4 scene (960 frame). Timeline dan `Video.tsx` / `SegmentVideo.tsx` sekarang konsisten dengan manifest S01–S07.
2. **VO Guide tidak menutup durasi video**: `src/config/narration.json` diperpanjang dari 4 ke 7 beat. Semua teks lama yang ada dipertahankan. Subtitle S05–S07 dilengkapi sebagai **estimasi**, bukan transkripsi VO asli.
3. **Scene S05–S06 tidak ada di folder yang diunggah**: dibuat ulang sebagai layer React/SVG editable dari deskripsi, Props, dan storyboard yang sudah terdaftar. Scene baru masih perlu persetujuan visual; jangan dikira footage sebelumnya telah dipulihkan dengan identik.
4. **Scene S07 TypeScript salah konfigurasi**: beat scene07 kini ada di timeline. CTA memakai source vektor yang sudah ada. Efek suara `public/audio/cta_ui.wav` dibuat sebagai suara pendek orisinal dan diputar pada beat aksi CTA.
5. **Error TS2550 replaceAll**: `tsconfig.json` memakai target/lib ES2021 yang mendukung `replaceAll`. **Error TS2352** di `src/FullPreviewComposition.tsx` juga diperbaiki.
6. **Tes import ZIP gagal**: pengujian fixture sekarang mewarisi lokasi modul TypeScript dari Master untuk pemeriksaan sintaks secara ketat, alih-alih menganggap folder fixture memiliki instalasi sendiri.
7. **Asset mirror & registrasi**: `tools/sync-projects.mjs` dijalankan untuk menghasilkan ulang `src/Root.tsx` dan `library/catalog.json`; keduanya **tidak diubah secara manual**.

## Pemeriksaan yang benar-benar dijalankan di lingkungan perbaikan

- `node tools/sync-projects.mjs`: **lolos**, 6 folder, 39 komposisi total.
- `node tools/validate-library.mjs`: **lolos**, 6 video, 31 segmen, 23 rujukan aset, 0 masalah sumber.
- `node tools/check-sync-state.mjs`: **lolos**, 0 masalah.
- `node tools/check-source-syntax.mjs`: **lolos**, 179 source, 0 masalah parsing.
- `node --test tests/*.test.mjs`: **lolos 64/64**, termasuk regresi baru untuk 7 scene shutdown dan import ZIP.
- `node tools/studio-check.mjs`: validasi sebagian lolos, tetapi gate typecheck penuh **belum lolos dalam lingkungan ini** karena dependency lokal (React/Remotion/TypeScript CLI di `node_modules`) tidak dapat dipasang; `npm ci` mengalami timeout.

## Belum terverifikasi

- TypeScript typecheck `npm run check` penuh setelah `npm ci` di PC Windows.
- Preview/render video langsung dengan Remotion CLI dan uji visual scene S05–S07.
- Drag/resize/edit/save Props/refresh di Remotion Studio Windows.
- Sinkronisasi subtitle/VO nyata karena sumber voiceover belum ada di proyek Shutdown.

## Instalasi aman di Windows

1. **Backup** folder Master lama sebelum menimpa atau mengganti apa pun.
2. Ekstrak ZIP hasil perbaikan sehingga ada satu folder `MotionGraphic-Studio/` dengan `package.json`, `projects/`, dan `tools/`.
3. Gunakan folder hasil ekstrak sebagai kelanjutan Master yang sama. Jangan menyalin folder `projects/*/src` ke `src/` root.
4. Dari dalam folder Master, jalankan `npm ci`, lalu `npm run sync`, `npm test`, `npm run check`, kemudian `npm run dev`.
5. Buka video Shutdown Otomatis, periksa preview full dan S05–S07; render setelah pemeriksaan visual dan VO.

**Catatan**: warning `npm audit` terkait dependency perlu ditinjau tersendiri; jangan jalankan `npm audit fix --force` secara otomatis karena dapat mengganti versi Remotion dan mengganggu kompatibilitas Master. ZIP tidak menyertakan `node_modules`, cache, MP4 render, atau cermin aset `public/videos` (dibuat ulang saat sync).
