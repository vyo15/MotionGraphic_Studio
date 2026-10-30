# Handoff Remotion → Concat (satu Master, dua aplikasi)

## 1. Pemakaian sehari-hari

Jalankan perintah dari folder `MotionGraphic-Studio` yang berisi `package.json`:

```bash
npm run dev
```

Selesaikan motion graphic di Remotion (visual, kursor, ilustrasi, hook, isi, CTA). Lalu pada terminal lain:

```bash
npm run handoff -- --project windows-hacks-5-shortcut-lengkap
npm run concat
```

Perintah pertama melakukan render **tiga MP4 terpisah** tanpa suara Remotion (default), dengan jalur stabil:

```text
out/concat/windows-hacks-5-shortcut-lengkap/current/
  01-HOOK.mp4
  02-ISI.mp4
  03-CTA.mp4
  concat-timeline.json
  AUDIT-ASET-MEDIA.md
  BUKTI-LISENSI-PENGGUNA.csv
  BACA-SEBELUM-UPLOAD.txt
```

Impor ketiga MP4 dari `current/` secara berurutan ke Concat. Tambah footage presenter, voice-over, lakukan pembersihan suara, lalu Generate Captions dari fitur Whisper GUI. Koreksi kata-kata teknis dan cek jeda. Setelah semua selesai, export MP4 dari Concat, lalu periksa audio/subtitle/video final pada ponsel.

## 2. Revisi aman dari Remotion

**Simpan project Concat dan tutup project/jendela Concat sebelum memperbarui media** jika Windows mengunci file atau cache media. Setelah revisi adegan selesai di Remotion:

```bash
npm run handoff -- --project windows-hacks-5-shortcut-lengkap --only CTA
```

- Bagian `CTA` dirender ulang; Hook dan Isi tetap sama.
- `current/` berisi **tiga file dengan nama stabil** (relink manual umumnya tidak diperlukan selama path sama, tetapi refresh/reopen mungkin diperlukan menurut Concat; jangan mengklaim live update).
- Versi sebelumnya dipindah ke `out/concat/<slug>/history/<timestamp>-<id>/` (jangan hapus sampai revisi telah dicek).
- Jika render atau pembaruan gagal, `current/` sebelumnya tetap dijaga; script mengembalikan folder sebelumnya jika rename gagal.
- Metadata dan lisensi pengguna (`BUKTI-LISENSI-PENGGUNA.csv`) tetap dipertahankan.
- Jika **timing, resolusi, audio, atau batas Hook/Isi/CTA berubah**, lakukan export penuh (tanpa `--only`) lalu rapikan timeline/caption Concat lagi sesuai kebutuhan.
- Handoff tidak memodifikasi project atau timeline Concat secara otomatis dan tidak dapat menjaga timing caption yang digeser secara manual.

## 3. Opsi yang diperlukan saja

```bash
npm run handoff -- --project ip-address --dry-run
npm run handoff -- --project ip-address
npm run handoff -- --project ip-address --only ISI
```

Default **tanpa audio** agar musik dan voice-over bisa ditambahkan di Concat. Jika SFX/audio asli Remotion memang ingin ikut dan lisensinya cocok:

```bash
npm run handoff -- --project ip-address --with-remotion-audio
```

Cek `concat-timeline.json` untuk timing frame, resolusi dan hash setiap video. Jangan campur `current/` dari project atau durasi berbeda. Gunakan 1080×1920, 30fps pada project Concat untuk kedua video saat ini.

## 4. Concat dari GitHub tanpa instalasi aplikasi

`npm run concat` menyiapkan folder `apps/concat/source/` dari tag rilis GitHub Concat bila Git tersedia, kemudian memakai runtime **portable** di `apps/concat/runtime/current/`. Saat runtime belum ada, script mengambil paket `.msi` dari GitHub Releases resmi, mencocokkan checksum SHA-256 dari metadata GitHub, lalu menjalankan **ekstraksi administratif** Windows Installer (`msiexec /a`, bukan `/i`) ke direktori sementara dan memindahkan file aplikasi ke `runtime/current/`.

Mekanisme itu **bukan instalasi normal Concat**: tidak ada penambahan aplikasi ke daftar software terinstal. Windows Installer digunakan sebagai alat pengekstrak; ia bukan aplikasi editor ketiga. Ini mengandalkan dukungan ekstraksi administratif dari paket MSI upstream, yang perlu diuji pada Windows.

GitHub source tetap terpisah dari runtime portable; saat membuka editor normal, **tidak dibutuhkan Rust, CMake, MSVC, LLVM atau compiler lain**. Runtime yang diunduh adalah binary resmi yang dibangun upstream, **bukan hasil build source lokal**. Jika ingin mengubah engine/source Concat lalu menjalankan modifikasi tersebut, langkah build source dengan toolchain tetap diperlukan. Folder `apps/concat/` tidak ikut Git/ZIP Master.

Perintah:

```bash
npm run concat          # otomatis menyiapkan dan membuka Concat portable
npm run concat:status   # status GitHub source dan runtime
npm run concat:safe     # fallback grafik jika UI bermasalah
```

Hanya sumber `https://github.com/jub0t/Concat` yang diterima, dan file yang tidak cocok checksum ditolak. Tidak ada perintah `msiexec /i`, winget install atau Rustup yang dipanggil otomatis. Bila ekstraksi gagal, baca log `apps/concat/cache/portable-extract.log`.

## 5. Hak cipta untuk lintas platform

Jangan menganggap MP4 hasil render otomatis bebas copyright. Periksa `AUDIT-ASET-MEDIA.md`, lalu isi `BUKTI-LISENSI-PENGGUNA.csv` secara manual. Untuk YouTube, Instagram, Facebook dan TikTok, gunakan visual/voice-over original, musik dan SFX dengan lisensi komersial lintas platform yang jelas, dan jangan menganggap pustaka musik satu platform berlaku otomatis di platform lain. Lisensi Concat (AGPL) mengenai software, bukan menjamin lisensi aset video. Rujukan aturan ada di `tools/concat-bridge/CHECKLIST-HAK-CIPTA.md`.

## 6. Pemulihan

- Jika hasil Concat tidak berubah setelah update: **reopen project Concat**, periksa file dari `current/` atau lakukan relink manual.
- Jika render gagal: periksa error yang muncul; file di `current/` tidak sengaja dihapus oleh render gagal.
- Jika video preview tidak sesuai: cek `projects/<slug>/` di Remotion; jangan mengedit mirror `public/videos/` secara manual.
- Jika terjadi masalah proyek Concat, gunakan versi sebelumnya di `history/` dan backup project Concat sendiri. Script tidak membackup file project Concat.
