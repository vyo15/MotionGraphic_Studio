# SAMPLE — MotionGraphic Studio Director / Windows Startup (editable)

Add-on mandiri untuk **MotionGraphic Studio Master v1.8.1**, sesuai `studio-direct-v4`. ID tetap `SampleStartupWindowsDirector` dan slug tetap `sample-startup-windows-director`.

- Resolusi: **1080×1920**, **30 FPS**, **2.445 frame / 81,5 detik**, 6 scene.
- S01: hook typography center dengan tanda tanya menyatu teks → kartu Excel berisi data & Chrome inbox → Welcome Windows → **Excel + Gmail/Chrome + ERP** terbuka sendiri → respons → jawaban → pengantar tutorial.
- Scene 02–06: source draft sampel sebelumnya dipertahankan; start timeline mereka digeser 120 frame untuk memberi hold realistis di S01.
- **Hook VO dan CTA tetap seperti ACC.** Belum ada rekaman VO; timing SFX dan subtitle final belum dikunci.
- Tidak ada running header, footer scene, progress bar, border video, dan animasi dekoratif tanpa fungsi.

## Pemasangan
Ekstrak folder `sample-startup-windows-director` **utuh** ke `MotionGraphic-Studio/projects/`. Jalankan `npm run dev` (atau `npm run sync`), lalu cari komposisi `SampleStartupWindowsDirector`. **Jangan menyalin `src` atau `public` add-on ke root Master.** Jika proyek lokal dengan slug sama sudah ada, backup atau bandingkan perubahan sebelum menimpa.

## Status editable
Source `.tsx` memiliki node `Interactive.Div` bernama untuk typography, mini app cards, shortcut desktop, tiga jendela, judul/data pilihan, diagram dan audio; **sebagian child UI masih source-editable**, bukan otomatis bisa drag. Kontrol timing ada di `src/scenes/Scene01.tsx` dan metadata di manifest/narration. Pengujian native GUI (drag, Save, reload), preview native Remotion dan render MP4 masih memerlukan Master terpasang di PC pengguna. Preview browser lama adalah referensi keputusan, bukan file sumber.

Lihat `PANDUAN-EDIT-ASSET.md`, `STORYBOARD.md`, `production/editable-blueprint.json`, dan `QA-REPORT.md`.
