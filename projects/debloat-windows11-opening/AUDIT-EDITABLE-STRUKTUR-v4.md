# AUDIT EDITABLE — Debloat Windows 11 (patch struktur v4)

**Status nyata: peningkatan struktur, BELUM 100% terbukti editable melalui Studio.**

## Dasar audit
Source user `debloat-windows11-opening-editable-20261111-093211.zip` plus patch audit sebelumnya; add-on tetap `debloat-windows11-opening`, ID `DebloatWindows11Opening`. Tidak membuat Master baru. Tidak mengubah manifest, durasi, warna, frame, voiceover, komposisi, kode master, atau proyek lain.

## Yang diubah
1. Meningkatkan interaksi seleksi langsung pada node `Interactive.*` untuk 6 scene: node penting mengizinkan pointer selection meski animasi wrapper sebelumnya menyetel `pointerEvents:none`.
2. Scene 05: `Checkbox`, `Button`, `PaneText`, `TweakRow`, dan `AppXRow` memakai `Interactive.create()` (fitur Remotion 4.0.536+, Master memakai 4.0.538). Label/button menerima `Interactive.childrenSchema` agar instance dapat dipilih/diedit pada callsite di Studio.
3. Scene 05: WinUtil dan kursor berada di grup transformasi bersama. **Geser grup S05 — Grup WinUtil dan Kursor**, bukan jendela sendirian, agar lintasan klik ikut bergeser. Pengubahan posisi *tombol satu per satu* tidak otomatis memutakhirkan lintasan kursor; ini masih batas penting.
4. Scene 01: 8 ikon Start Menu dan 3 kartu fokus menjadi instance `IconSlot`/`FocusCard` tersendiri dengan `Interactive.create()`, bukan satu `.map()` untuk semuanya.
5. Scene 02: 3 panel, 3 kartu aplikasi, dan 3 baris review diberi callsite tersendiri untuk kontrol per instance.
6. Scene 06: empat tile logo, tiga titik komentar, dan empat aplikasi pinned tidak lagi menggunakan satu `.map()`; nama dan bentuk masing-masing memiliki node terpisah.

## Verifikasi yang benar-benar dilakukan (pada copy Master)
- Parser TypeScript/TSX untuk semua source Debloat: tanpa parse error.
- `node tools/sync-projects.mjs`: berhasil — tiga project, 21 komposisi.
- `node tools/validate-library.mjs`: berhasil — 18 aset dicek, 0 masalah.
- `node tools/check-direct-studio-text.mjs`: berhasil — 0 style rumit/No-Code V3 terlapor. Masih **18 fragmen dinamis**.
- `node tools/check-editability.mjs --strict`: berhasil untuk pemeriksaan statis; bukan uji drag/drop.
- `node tools/check-layout-flow.mjs`: 0 layout invalid; tiga peringatan berasal dari Windows Hacks (tidak disentuh).
- Masih **0 layer manifest dan 0 track kursor** terdaftar untuk Debloat. Efek/objek yang tergambar di dalam satu SVG belum otomatis menjadi tiap sub-layer.

## BELUM DIBUKTIKAN / jangan klaim 100%
- Belum menjalankan Remotion Studio browser asli, uji drag/resize/rotate, Save/Reload, atau MP4 render. Paket node_modules tidak tersedia untuk uji penuh di lingkungan ini.
- Tidak semua elemen grafis kini mendapat kontrol mandiri per detail (contoh sub-path SVG, isi kartu UI dan gambar statis). Komponen reusable dan beberapa style dinamis masih ada.
- Kursor posisi klik hanya konsisten ketika WinUtil dan mouse bergerak *sebagai grup*. Menggeser checkbox/tombol individual masih memerlukan penyesuaian keyframe kursor secara terkoordinasi.
- Enam file VO pada paket user adalah placeholder hening. Sinkronisasi per kata belum dapat diklaim.

## Cara pasang aman
1. Backup `MotionGraphic_Studio/projects/debloat-windows11-opening/` (folder ini saja).
2. Ekstrak ZIP patch, lalu **merge** folder `debloat-windows11-opening/` ke `MotionGraphic_Studio/projects/`. Overwrite hanya file yang ada dalam patch; jangan hapus folder lama.
3. Jalankan dari Master `npm run sync` dan `npm run check`, lalu `npm run dev`.
4. Buka komposisi `DebloatWindows11Opening-S05`, scrub ke frame 345 (11,5 dtk), pilih baris `S05 — Baris AppX Xbox App` di timeline/layer list, coba **edit teks dan translate** pada Inspector. Uji juga `S05 — Grup WinUtil dan Kursor (geser bersama)`; bandingkan posisi pointer dengan UI setelah grup dipindah.
5. Coba simpan perubahan di Remotion Studio, **reload** Studio, periksa apakah perubahan tetap ada. Jika tidak, catat satu nama layer & screenshot Inspector yang menunjukkan property terkunci. Jangan lanjut overwrite masif sebelum tes ini lolos.
6. Untuk membatalkan, pulihkan backup folder Debloat; proyek lain tidak terpengaruh.

**Peringatan:** kontrol `Interactive.create()` memang didukung API Remotion 4.0.538, tetapi validasi apakah editor Windows pengguna bisa menyimpan edit source tetap harus dilakukan di Studio sebenarnya.
