# STATUS ACC / LOCKED — 20 November 2026

**Project:** Easy2BootMultibootReels (`easy2boot-multiboot-reels`).

## Yang sudah disetujui dan tidak boleh diubah tanpa permintaan baru

- **Scene 01:** Hook Windows 11 vs Windows 10, Impact Stamp tanpa lingkaran.
- **Scene 02:** “Ah, ribet banget”, Card Break, tiga file ISO masuk satu USB.
- **Pengantar 02 → 03:** Opsi 01 Match Move, USB berlanjut menjadi tanda tanya, pertanyaan “GIMANA CARA BIKINNYA?”.
- **Bagian masuk Scene 03:** judul lama tidak muncul lagi; pergantian menuju “PERTAMA, BACKUP DATA” tanpa overlap (32 frame), demonstrasi awal backup ditahan/diperlambat (70 frame), hasil “DATA SUDAH AMAN” ditahan (25 frame).

**Belum seluruhnya dikunci:** sisa Scene 03 (review v11), Scene 04 (review v9), Scene 05 dan 06 (belum review terbaru). Tidak ada penetapan ACC menyeluruh terhadap Scene 03.

## Kontrak source dan validasi

- Identitas tidak berubah: `Easy2BootMultibootReels` dan `easy2boot-multiboot-reels`.
- Durasi keseluruhan **2641 frame pada 30 FPS**, 1080×1920.
- Semua komponen/animasi visual tetap **identik** dengan versi preview yang di-ACC; file baru pada paket ini hanya metadata persetujuan.
- Pemeriksaan integritas: SHA-256 Source S01/S02 dan tiga file pengantar tercantum dalam `APPROVAL-LOCK-20261120.json`.
- Preview yang disetujui dirender 30 FPS dari sumber visual; belum merupakan hasil uji editor visual Windows atau render Remotion native.
- Voice-over final belum tersedia. Jangan mengklaim sinkronisasi VO telah diverifikasi.

## Instalasi

Pilih **salah satu**: ZIP add-on lengkap atau ZIP patch. Jangan dipasang dua kali.

**Full add-on:** backup folder lama, ekstrak, lalu salin folder `easy2boot-multiboot-reels` utuh ke `MotionGraphic-Studio/projects/`. Tidak perlu menyalin ke root `src`/`public`.

**Patch only:** khusus project yang sudah memakai versi pengantar Opsi 01 sebelumnya. Backup project lalu gabungkan berkas di path yang sama ke `projects/` tanpa menghapus berkas lain.

Dari root Master, jalankan `npm run sync` kemudian `npm run dev`. Jangan mengedit manual `src/Root.tsx`, `src/index.ts`, `package.json`, atau `library/catalog.json`.
