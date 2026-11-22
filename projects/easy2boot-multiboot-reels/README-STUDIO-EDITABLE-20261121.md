# Easy2Boot — Perbaikan Native Editable untuk Master 1.8.1 (21 Nov 2026)

## Apa yang dibetulkan

Master terbaru: Remotion 4.0.538 dan kontrak `studio-inline-v2`. Kotak seleksi dari `Interactive.G` yang berisi hasil render SVG/DOM secara dinamis **belum otomatis menyediakan pengeditan isi teks**. Revisi ini memisahkan teks penting menjadi `Interactive.Text` dengan **anak teks literal** di source serta mempertahankan layer grafis individual, animasi deterministik, manifest dan aset.

- Scene 01: judul utama punya target native teks; bentuk laptop tetap dipisah per komponen, sementara teks laptop kecil dan sebagian label tetap menggunakan layer SVG/Props.
- Scene 02 + pengantar: beberapa headline diubah ke native teks, dengan fallback saat Props mengubah kata.
- Scene 03: teks SVG sederhana diubah menjadi native `Interactive.Text` dengan shell animasi asli; teks majemuk bertspan dan beberapa elemen yang perlu interpolasi tetap lewat SVG + Props.
- Scene 04: nama ISO, OS, folder tujuan, status, serta teks VO dibuat target native teks terpisah; jalur copy, ikon, kartu dan USB masih layer grafis tersendiri.
- Scene 05: item menu Boot Menu, agFM, nama ISO, Windows Setup dan teks lain punya target native teks; siluet laptop sama dengan Scene 01.
- Scene 06: teks SVG sederhana dipisah sebagai native text; aset lain sebagai layer vektor.

**Penting:** perubahan ini meningkatkan kompatibilitas Studio, tetapi tidak menjamin semua elemen bisa diedit dengan double-click atau disimpan ke kode sebelum uji GUI yang nyata. Bila teks sudah diubah via `layerOverrides`, renderer sengaja kembali ke jalur Props untuk menghormati teks tersebut; source-editable dan Studio-editable adalah dua hal berbeda.

## Cara pasang aman

1. Backup `MotionGraphic-Studio/projects/easy2boot-multiboot-reels/` versi saat ini (jangan menimpa hasil edit lokal tanpa membandingkan).
2. Untuk **full add-on**, ekstrak ZIP sehingga tersedia `easy2boot-multiboot-reels/`, salin folder utuh ke `MotionGraphic-Studio/projects/`. Bila memakai **patch-only**, ekstrak ke folder `projects/` dan timpa hanya file yang tercantum dalam patch.
3. Dari Master jalankan `npm run sync` lalu `npm run dev`.
4. Pilih `Easy2BootMultibootReels`, lalu uji pada komposisi full maupun per segmen.
5. Klik teks `S01 — headlineNeed`, `S03 — Make_E2B.exe`, `S04 — Win10...`, atau `S05 — boot-menu-heading`; coba ubah teks, drag posisi, Save, reload, preview dan render, lalu periksa apakah edit tersimpan.
6. Bila objek hanya berubah lewat panel Props, gunakan `defaultProps.layerOverrides` dengan ID scene yang disediakan di peta layer proyek; jangan mengubah Master `src/Root.tsx` manual.

## Status produksi dan batasan

Scene 01/02/pengantar adalah **visual ACC** yang tidak boleh didesain ulang. Scene 03 awal/visual yang telah di-ACC dijaga; Scene 04–05 masih tahap review; Scene 06 belum ACC. Timeline tetap **2701 frame / 30 FPS / 1080×1920**. VO masih panduan draft. Source animasi dan style sumber dipertahankan, namun **paritas pixel render native Remotion belum diverifikasi**.

Pemeriksaan yang dilakukan: sintaks TypeScript/TSX 62 file, validator statis ketat Master 0 error 0 warning, sinkronisasi full+6 segmen, 84 uji node (77 lulus, 7 skip). **Belum dilakukan**: typecheck penuh, render native Remotion, uji memilih semua layer, drag, edit teks, Save/reload di Windows. Uji ini wajib sebelum klaim `100% editable`.

## Batas teknis penting

Elemen teks majemuk dengan `<tspan>`, beberapa elemen yang dihasilkan frame data, tombol GUI asli Windows dan layer gambar tidak otomatis menjadi objek editor teks. Sebagian dipakai sebagai layer vektor dan dapat dipindah atau diedit lewat Props/source, bergantung dukungan GUI. Penguncian ACC bersifat proses kerja, bukan proteksi editor terhadap perubahan pengguna.


> Pembaruan ACC Scene04 (21 November 2026): timeline total **2461 frame / 30 FPS** (Scene04: **240 frame / 8 detik**), berkas `production/SCENE04-ACC-20261121.md` dan `README-SCENE04-ACC.md` adalah rujukan lebih baru daripada angka atau status Scene04 di atas. Scene05–06 masih review.
