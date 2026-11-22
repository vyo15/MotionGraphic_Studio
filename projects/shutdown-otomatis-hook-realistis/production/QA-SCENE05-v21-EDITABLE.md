# QA — Shutdown Scene 05 Soft Depth v21 Editable

**Master source:** `MotionGraphic-Studio-FULL-v1.8.1-20261122-055735.zip` (user upload).
**Sumber preview ACC:** `Preview_Shutdown_Scene05_SoftDepth_v21.mp4`.

## Perubahan fungsional
- Ubah hanya Scene 05/`S05RunKlikOK` pada file legacy `src/scenes/Scene04.tsx`, plus manifest Props/editor, blueprint, dan panduan.
- Judul center dua baris tanpa separator / background grid.
- Tombol Windows dan R sekarang soft-depth, ukuran Reels-safe, dengan respons coral saat ditekan dan tanpa ring/arc.
- Jendela Run native: titlebar, petunjuk, input command typing, tombol, kursor yang mengklik OK.
- Penutup `3600 DETIK` tetap menjadi penghubung ke Scene 06.
- Semua visual dibangun dengan SVG React / Remotion Interactive, bukan video atau gambar statis.
- 9 scene dan durasi 1950 frame / 30 fps (65 detik) tetap sama; Scene 05 berada pada frame 780–1079 (26–36 detik).

## Validasi statis yang benar-benar dijalankan
- `check-source-syntax`: 85 file, **0 sintaks error**.
- `qa-native-editable --strict`: **195 target** untuk Shutdown, **0 FAIL** dan **0 WARN**.
- `shutdown-timeline-integrity.test.mjs`: **PASS**.
- `qa-sound-cues --strict`: **15 cue PASS**.
- `check-sync-state`: **2 projects**, **0 issues**.
- `validate-library`: **2 projects, 15 segments**, sumber valid.
- `sync-projects`: **19 komposisi**, registrasi tersinkron.
- Easy2Boot project source and assets preserved byte-for-byte versus uploaded master.

## Batas validasi dan keterbatasan
- **Belum** menguji Remotion Studio GUI di Windows: drag/resize, double-click edit, Save/reload, render MP4 resmi.
- `Interactive` mendukung elemen native yang dapat dipilih; beberapa bentuk internal terkelompok per semantik dan tidak otomatis bisa diubah bentuknya via GUI.
- Teks judul dan command memiliki literal native default untuk direct edit; Props juga dapat mengubah nilainya. Mask typewriter dan jalur kursor dihitung per frame, sehingga kurva dan timing khusus membutuhkan edit source.
- Video preview v21 disetujui, tetapi hasil render dari source baru belum dipastikan identik frame-per-frame dengan preview.
- Font Inter akan menggunakan font yang tersedia di lingkungan pengguna; bila tidak ada, fallback Arial/sans-serif.
- Full source testing (tsc + Remotion renderer) membutuhkan instalasi dependensi master sesuai `package.json`.
- Tidak ada rekaman VO final dalam master.

## Cara buka
1. Ekstrak master ZIP, buka terminal di folder `MotionGraphic-Studio`.
2. Jika belum ada dependensi: `npm install`, lalu `npm run dev`.
3. Pilih Shutdown Otomatis → Scenes → `S05RunKlikOK`.
4. Edit native `S05 / Heading`, `S05 / Keyboard`, `S05 / Run`, `S05 / Cursor`, dan `S05 / Subtitle`. Props `scene04...` masih memakai nama sumber legacy.
5. Uji drag, Save, reload, preview dan render 10 detik untuk memastikan perubahan di PC Anda tetap tersimpan.
