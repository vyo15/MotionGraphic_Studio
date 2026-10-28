# MotionGraphic Studio v1.6.2 — Satu Master, Semua Video Folder-First

**Master Studio ini sudah memuat 7 video aktif yang tersimpan sepenuhnya di `projects/<slug>/`.** Tidak ada lagi video aktif di `src/videos`. Daftar komposisi (`src/Root.tsx`) dan `library/catalog.json` adalah file hasil sinkronisasi otomatis; **jangan diedit manual**.

## Memulai pada Windows

1. Backup Master sebelumnya. Ekstrak paket Master v1.6.2 ke direktori baru; jangan dicampur dengan folder master lama.
2. Buka terminal pada folder `MotionGraphic-Studio` yang berisi `package.json`.
3. Jalankan `npm run dev`. Saat pertama kali, sistem menginstal dependensi menggunakan `npm ci` (butuh koneksi internet). Server biasanya muncul di `http://localhost:3000`.
4. Biarkan terminal menjalankan Studio. Buka terminal kedua bila ingin menjalankan perintah lain.

> Jika komputer sebelumnya sudah memiliki `node_modules` versi lain, jangan menyalinnya dari Master lama; biarkan `npm ci` memasang dependensi yang sesuai paket lock.

## Workflow menambahkan video

**Rekomendasi: folder-first.** Saat ChatGPT mengirim ZIP add-on, ekstrak sehingga ditemukan satu folder bernama `<slug>` yang memuat `motiongraphic-video.json`. Copy **foldernya**, bukan isinya, ke `MotionGraphic-Studio/projects/<slug>/`. Jalankan `npm run sync` (ketika Studio sudah terbuka), lalu refresh browser; jika Studio belum aktif jalankan `npm run dev`.

Alternatif: `npm run addfolder` membuka pemilih folder Windows; atau `npm run addfolder -- "C:\\Users\\vio\\Downloads\\video-slug"`. Untuk ZIP add-on juga tersedia `npm run add` (pemilih ZIP) atau `npm run import` sesudah ZIP diletakkan di `library/masuk/`.

**Dilarang:** menyalin isi add-on secara terpisah ke `src/`, `public/`, atau root Master; mengganti `src/Root.tsx` secara manual. Jika ZIP berisi satu folder `MotionGraphic-Studio`, itu **backup Master**, bukan add-on video.

## Alur paling mudah untuk pemula

Jalankan **`npm run menu`** bila ingin semua perintah dalam satu tempat. Pilih tambah folder, rename, sync, render, ZIP, hapus, restore, atau cek masalah tanpa menghafal semua command.

**Rename project aman:** jalankan `npm run rename`. Pilih project lalu opsi **judul saja**, **judul + folder + slug**, **adopsi nama folder Explorer**, atau **perbaiki nama folder mengikuti manifest**. ID komposisi tidak berubah dan referensi path aset dalam project diperbarui. Rename memakai staging dan rollback bila sinkronisasi/validasi gagal.

Jika sudah mengubah nama folder di Explorer lalu `npm run dev` error, gunakan `npm run doctor` untuk melihat penyebab dan `npm run rename -- IDVideo --adopt-folder` untuk menyesuaikan slug dengan nama folder. Nama yang diawali angka (misalnya `5 Shortcut Windows`) otomatis menggunakan prefiks `video-` agar manifest valid. Jangan mengubah slug manual.

## Perintah harian

| Perintah | Fungsi |
|---|---|
| `npm run menu` | Menu utama (satu pintu untuk semua operasi) |
| `npm run dev` | Sync semua folder dan buka Remotion Studio |
| `npm run sync` | Daftarkan folder baru / sinkron aset |
| `npm run list` | Daftar video aktif |
| `npm run rename` | Rename judul / folder / slug secara aman, otomatis sesuaikan path aset |
| `npm run doctor` | Deteksi folder tidak cocok, manifest/entry hilang; tanpa perubahan file |
| `npm run addfolder` | Pilih folder add-on untuk disalin ke `projects/` |
| `npm run add` | Pilih ZIP add-on untuk diimpor |
| `npm run render` | Pilih video, render MP4 ke `out/` |
| `npm run render -- IPAddressReels` | Render langsung tanpa menu |
| `npm run zip` | Menu: 1 video / semua video / **Master lengkap** |
| `npm run zip -- --studio` | ZIP **Master Studio lengkap ke folder saudara `../MotionGraphic-Studio-Backups/`** |
| `npm run zip -- --all` | ZIP terpisah untuk semua video |
| `npm run zip -- IPAddressReels` | ZIP hanya satu video |
| `npm run delete` | Arsipkan video (soft delete) |
| `npm run restore` | Pulihkan video dari arsip |
| `npm run check` | Sync, validasi aset, pemeriksaan TypeScript |

ZIP video disimpan di `exports/zips/`, tetapi ZIP Master disimpan di `../MotionGraphic-Studio-Backups/` (di luar folder Studio). Perintah ZIP **tidak menggunakan WinRAR**: PowerShell Compress-Archive pada Windows atau zip pada Linux/macOS. Untuk hasil render perlu Remotion dan kemampuan rendering video lokal.

## Struktur dan pemeliharaan

```text
MotionGraphic-Studio/
├── projects/               # SUMBER UTAMA: semua video aktif (7 folder)
│   ├── ip-address/
│   ├── windows-hacks-5-shortcut-lengkap/
│   ├── windows-shortcut-ctrl-shift-t/
│   ├── windows-shortcut-ctrl-shift-esc-pro-v2/
│   ├── windows-shortcut-ctrl-shift-n-pro-slow-v1/
│   ├── windows-shortcut-win-shift-s-pro-v2/
│   └── windows-shortcut-win-e-dua-jendela-pro-v2/
├── src/                    # Root.tsx (otomatis) + index.ts
├── tools/                  # Import, sync, rename, doctor, menu, ZIP, render, delete, restore
├── library/                # Catalog otomatis, arsip lama, backups, inbox
├── public/videos/          # MIRROR dibuat otomatis dari projects/*/public
├── exports/zips/           # ZIP video saja (diabaikan Git)
├── out/                    # Hasil render (tidak termasuk ZIP backup)
├── package.json
└── package-lock.json
```

- Edit file **asli** video pada `projects/<slug>/src/` atau `projects/<slug>/public/`, bukan pada mirror `public/videos/`.
- Setelah mengubah aset asli, jalankan `npm run sync`.
- **Arsip video lama**, termasuk Excel dan video yang pernah dihapus, disimpan di `library/sampah/`. Riwayat sinkronisasi lama ada di `library/arsip-migrasi-v15/`. Jangan menghapus arsip bila mungkin diperlukan lagi.
- ZIP Master menyertakan semua project aktif, konfigurasi, tools, dan arsip. ZIP Master **tidak** berisi `node_modules`, cache, hasil MP4, mirror aset yang bisa digenerate, ataupun ZIP hasil export lainnya. Saat restore Master, jalankan `npm run dev` untuk meregenerasi aset dan registrasi.
- Jaga `id` dan `slug` video tetap sama saat merevisi konten. Bila ingin benar-benar mengganti slug/nama folder, gunakan `npm run rename` (ID tetap).

## Editabilitas

Layer yang terlihat pada timeline bisa disunting sesuai API/komponen aslinya. Tidak semua elemen React otomatis drag-and-drop. Teks/posisi/warna/timing dapat diedit pada source/config bila kontrol visual tidak tersedia. Preview dan renderer menggunakan komposisi yang sama.

Dokumen `PANDUAN-EDIT-ASSET.md` menjelaskan aturan aset dan `PROMPT-PROYEK-CHATGPT.md` menjelaskan kontrak add-on untuk ChatGPT.

## Backup Master di luar folder Studio (v1.6.2)

- `npm run zip` lalu pilih **3**, atau `npm run zip -- --studio`. File `MotionGraphic-Studio-Master-v1.6.2-*.zip` dibuat otomatis di **sebelah** folder Studio: `../MotionGraphic-Studio-Backups/`. Folder backup akan dibuat otomatis.
- ZIP **satu video** dan **semua video** tetap disimpan ke `exports/zips/`.
- Jika ingin folder backup di drive lain, set `MOTIONGRAPHIC_STUDIO_BACKUP_DIR` ke path folder **di luar** Studio sebelum menjalankan perintah.
- ZIP Master berisi source, tools, proyek, konfigurasi dan arsip lama untuk pemulihan privat. Untuk GitHub, **unggah folder source yang sudah diekstrak, bukan ZIP Master**. Baca `PANDUAN-GITHUB.md` sebelum membuat repo publik.
- Jangan letakkan backup Master di `projects/`, `library/`, `exports/`, atau direktori mana pun di dalam Studio.
# MotionGraphic_Studio
