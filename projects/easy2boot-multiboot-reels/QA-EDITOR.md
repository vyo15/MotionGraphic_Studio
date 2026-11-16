# QA — Easy2Boot Visual Editable v2

## Inspeksi versi sebelum revisi
- SVG besar per scene memiliki banyak objek visual tanpa ID, Props hanya mencakup sebagian teks.
- `zIndex` pada renderer lama belum aktif.
- Keyframe asli dibekukan per frame; edit bebas gerak belum disediakan.

## Pemeriksaan revisi pada lingkungan build ini
- Enam scene dilengkapi ID untuk grup dan bentuk/teks individual, tanpa meraster grafik.
- Dua sumber state disiapkan: `editor/state.json` dan `src/config/editorState.ts` yang dibuat ulang saat Save.
- HTTP POST/GET save diuji pada server Node lokal, dan isi TS yang dihasilkan diperiksa. Uji ini direset sehingga paket yang dikirim tidak mengandung perubahan uji coba.
- UI editor diuji pada Chromium headless via harness inline: memilih layer, mengubah posisi, mengubah rotasi, membuat keyframe, menyimpan state, berpindah scene, dan menampilkan SVG. Tidak ditemukan page error pada pengujian tersebut.
- File renderer TS, Props, typography, geometry, dan editorState lulus `tsc --noEmit --strict` secara terisolasi.
- Enam sampel frame source vs preview MP4 diperiksa dengan rata-rata selisih absolut kanal RGB: 1,31; 1,31; 1,68; 1,53; 3,76; 1,80 (skala 0–255), sebagian perbedaan adalah encoding MP4 dan rendering font.
- Server Node menggunakan localhost dan tidak meminta npm install.

## Belum terverifikasi
- Integrasi dan render melalui **Master Studio asli pengguna** di Windows; Master tidak tersedia untuk dieksekusi di lingkungan ini.
- Uji buka editor melalui double-click `.cmd` di Windows.
- Semua kombinasi edit ekstrem dan impor gambar pengguna, termasuk clip-path dan layer bertransformasi kompleks.
- Editing timeline audio secara visual atau titik Bézier, yang memang **tidak diimplementasikan** di UI ini.
- Sinkronisasi VO karena rekaman final belum diberikan.

**Kesimpulan:** perbaikan editabilitas signifikan dan kontrol persisten sudah tersedia, tetapi istilah “100% full editable tanpa batas” tidak akurat untuk kemampuan ini. Detail batasannya tertulis jelas di README.
