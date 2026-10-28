# Menyiapkan MotionGraphic Studio untuk GitHub

Master Studio v1.6.2 memisahkan **backup lengkap** dari **repository source**.

## Lokasi

```text
test/
├── MotionGraphic-Studio/         # source untuk GitHub
└── MotionGraphic-Studio-Backups/ # ZIP Master privat, di luar repo
```

`npm run zip -- --studio` membuat ZIP Master pada folder Backups tersebut. ZIP video tetap di `exports/zips/`. Tidak perlu WinRAR.

## Sebelum publikasi

1. Periksa `projects/*/public/` untuk footage, musik, foto, wajah, merek, dan konten pihak ketiga. Publikasikan hanya yang mempunyai izin distribusi.
2. Periksa `src/`, `tools/`, dan konfigurasi apakah ada token, URL privat, kata sandi, atau data perusahaan. Jangan commit rahasia.
3. `.gitignore` mengabaikan `node_modules`, hasil render, mirror aset `public/videos/`, ZIP hasil export, arsip video terhapus, backup historis, dan `.env`. Pastikan file yang sudah terlanjur masuk Git dihapus dari tracking dengan `git rm --cached` sesuai kebutuhan.
4. **Backup Master jangan di-upload sebagai satu ZIP ke GitHub.** Upload source `MotionGraphic-Studio/` memakai Git (atau fitur upload folder) agar pembaruan tiap project bisa dipantau.
5. Bila repository publik, berhati-hati: backup di `library/sampah/` dapat memuat video personal dan berkas historis. Folder tersebut tetap tersimpan pada backup privat, tetapi diabaikan Git.

## Perintah dasar pada Git Bash Windows

Jalankan di folder `MotionGraphic-Studio` (yang berisi `package.json`), setelah memeriksa isinya:

```bash
git init
git add .
git status
git commit -m "Initial MotionGraphic Studio"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Ganti `USERNAME/NAMA-REPO` dengan repository milik Anda. Buat repository kosong terlebih dahulu di GitHub. Jangan unggah `node_modules` atau backup privat.

## Jalankan dari GitHub di PC baru

```bash
npm ci
npm run dev
```

`npm run dev` menyinkron ulang `projects/`, katalog, dan mirror aset. Bila ukuran file media kelak melebihi batas GitHub, pertimbangkan Git LFS atau penyimpanan terpisah.
