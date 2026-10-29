# Status Implementasi — v1.8.0

## Termasuk dalam revisi
- Single-page Hub dengan 5 tab dan UI lokal `127.0.0.1`.
- Launcher Windows + proses tersembunyi, log startup dan launcher stop dengan verifikasi proses.
- Riwayat transaksi multi-step Undo/Redo bersama, cek konflik, tulis atomik. Layer source ID berbasis nama file+nama elemen.
- Preview bergerak memakai Remotion Studio yang dipasang di iframe pada halaman yang sama. Snapshot frame di Edit Layer masih diambil melalui Remotion still berdasarkan permintaan.
- Upload aset dan timeline audio dengan waveform dekode browser, drag offset, trim awal, panjang klip, volume/mute; sumber timeline bersifat terpusat dalam manifest.
- QA statis geometri offscreen, safe-zone, overlap berstatus review, validitas kursor/audio, rekomendasi frame sampling.
- Background jobs via local API: render, ZIP video/master, check, cancel/retry, status, log. Ekspor di luar Master.

## Batas yang penting
- **Belum** deteksi pixel-accurate otomatis untuk semua frame. Overlap transform animasi dan target click perlu inspeksi visual.
- **Belum** drag segala layer computed; non-literal memerlukan adapter atau refactor template.
- **Belum** player custom tersinkron penuh dalam satu kanvas edit: Preview bergerak adalah embed Remotion Studio, sedangkan drag layer berada di tampilan snapshot.
- **Belum** keyframe audio, cut otomatis video, subtitle sinkron atau penggantian gambar source yang tidak mengekspos props asset.
- **Belum** otomatis backup lengkap per klik dalam folder Master; riwayat edit disimpan di backup eksternal.
- Render MP4, browser Windows, dan drag menggunakan mouse asli harus diuji pada PC pengguna bila tidak tersedia runtime Remotion/Windows di lingkungan build.

Perubahan lama: kedua folder project/ID/slug asli tetap sama. Arsip historis pengguna tidak dihapus.

## Hasil verifikasi pada 29 Oktober 2026
- Sumber ZIP v1.7.0 dibandingkan byte-per-byte: **tidak ada file media maupun scene selain entry `src/Video.tsx` dan manifest yang berubah** pada dua project aktif. Dua snapshot katalog lama yang terhapus akibat kebijakan retensi sinkronisasi dipulihkan dari ZIP asli; retensi otomatis kemudian dinonaktifkan.
- `node tools/sync-projects.mjs`: **2 project aktif**, ID asli `IPAddressReels` dan `WindowsHacks5ShortcutLengkap`, berhasil sinkronisasi.
- `node tools/validate-library.mjs`: **9 referensi aset dicek, 0 error**.
- `node --check` seluruh file `.mjs` dan JavaScript tiga halaman editor: **lolos**.
- TypeScript AST parse (`createSourceFile`): **48 TS/TSX, 0 error sintaks**. Ini **bukan** pengganti `tsc --noEmit` yang membutuhkan dependensi lokal.
- `npm test`: **4/4 lulus**: isolasi project, transaksi multi-Undo/Redo dan konflik edit, QA deteksi overlap/offscreen, referensi audio.
- HTTP localhost: **berhasil** akses Hub, Visual Editor, daftar project, daftar layer sumber (Windows 216), QA, track audio. Tes API project sementara: save posisi dan teks bernama stabil, Undo, Redo dan penyimpanan ulang **berhasil**; fixture dibersihkan setelah selesai.
- Audit aktual menampilkan 5 kandidat temuan pada Windows Hacks (1 offscreen efek klik dan 4 overlap berstatus review) serta 0 kandidat pada IP Address setelah pemisahan antar-scene. Temuan bukan bukti visual rusak; perlu dilihat secara nyata sebelum mengubah animasi.
- Paket ZIP Master diuji dengan `zipfile.testzip()`: CRC **lolos**; launcher, semua dokumen, skill adapter, scene, audio placeholder, ID project asli dan arsip ikut.

**Belum diuji:** instalasi lengkap `npm ci` gagal karena batas lingkungan/koneksi saat pengujian; `tsc --noEmit` penuh, render H.264, preview/drag pada browser Windows, kesesuaian klik kursor di frame sebenarnya, pemulihan lewat launcher Windows dan CI runner Windows belum dapat diverifikasi. Jangan menandainya lulus sebelum menjalankan `02-CEK-STUDIO.bat`, tes render, dan pengujian mouse di PC Windows.

**Pembersihan aman:** file build/cache dan `node_modules` tidak disertakan ZIP; arsip lama/backup asli tidak dihapus. Tidak ada penghapusan otomatis terhadap arsip pengguna.

**Status:** pembaruan fungsional tersedia dan lolos tes statis, tetapi belum memenuhi seluruh Definition of Done yang memerlukan preview bergerak terintegrasi penuh, QA piksel/frame seluruh scene, drag semua layer computed, dan uji render Windows. Fitur tersebut memerlukan validasi dan pengembangan berikutnya.
