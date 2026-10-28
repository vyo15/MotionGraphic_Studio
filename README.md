# 🎬 MotionGraphic Studio

**One Studio. Unlimited Projects. Fully Editable.**

MotionGraphic Studio adalah workspace untuk membuat dan mengelola video motion graphic edukasi menggunakan **Remotion, React, dan TypeScript**. Semua video tersimpan sebagai project terpisah, tetapi dijalankan melalui **satu Master Studio**.

## ✨ Fitur Utama

- **Folder-first:** setiap video memiliki source dan aset sendiri di `projects/<slug>/`.
- **Auto-sync:** project baru otomatis terdaftar saat Studio dijalankan.
- **Editable:** scene, teks, warna, aset, dan animasi dapat disesuaikan melalui konfigurasi/source; kontrol visual bergantung pada komponen yang digunakan.
- **Project management:** import folder, rename, arsipkan, dan pulihkan video.
- **One-command export:** render MP4 dan buat ZIP video atau backup Master tanpa WinRAR.

## 🚀 Mulai Menggunakan

Pastikan **Node.js dan npm** tersedia. Buka terminal di folder proyek, lalu jalankan:

```bash
npm run dev
```

Pada penggunaan pertama, dependensi akan dipasang bila belum tersedia. Setelah server siap, buka **http://localhost:3000**.

Untuk menu pengelolaan yang lebih mudah:

```bash
npm run menu
```

## 📁 Menambahkan Video Baru

1. Siapkan folder add-on yang berisi `motiongraphic-video.json` dan `src/Video.tsx`.
2. Salin **folder add-on utuh** ke `projects/<slug>/` (nama folder harus sesuai `slug`).
3. Jalankan `npm run sync` jika Studio sudah terbuka, atau `npm run dev` jika belum.

> Jangan menyalin isi add-on langsung ke root `src/` atau `public/` Master. Registrasi `src/Root.tsx` dan `library/catalog.json` dikelola otomatis.

## 🛠️ Perintah Penting

| Perintah | Fungsi |
|---|---|
| `npm run menu` | Buka menu pengelolaan |
| `npm run dev` | Sinkronisasi dan buka Remotion Studio |
| `npm run addfolder` | Tambahkan folder video |
| `npm run sync` | Daftarkan ulang project dan aset |
| `npm run rename` | Ubah judul / folder / slug dengan aman |
| `npm run render` | Pilih video dan render MP4 ke `out/` |
| `npm run zip` | Export ZIP video atau backup Master |
| `npm run zip -- --studio` | Backup Master ke `../MotionGraphic-Studio-Backups/` |
| `npm run delete` / `npm run restore` | Arsipkan / pulihkan video |
| `npm run doctor` / `npm run check` | Diagnosis / validasi project |

ZIP video disimpan di `exports/zips/`. **ZIP Master disimpan di luar folder Studio** agar tidak memenuhi repository atau ikut terkemas lagi.

## 🗂️ Struktur Singkat

```text
MotionGraphic-Studio/
├── projects/          # Source dan aset tiap video
├── src/               # Entry Remotion dan registrasi otomatis
├── tools/             # Script pengelolaan project
├── library/           # Katalog dan arsip
├── public/videos/     # Mirror aset hasil sync
├── exports/zips/      # Hasil ZIP video
├── out/               # Hasil render MP4
└── package.json
```

**Untuk GitHub:** commit source dan konfigurasi yang diperlukan saja. Jangan unggah `node_modules`, cache, hasil render, ZIP backup, atau data pribadi. Pastikan hak penggunaan seluruh aset sebelum membuat repository publik.

## 👤 Credit

**Created & maintained by Vio Yusup Iskandar**  
GitHub: [@vyo15](https://github.com/vyo15)

---

*CREATE ONCE — EDIT VISUALLY — REUSE FOREVER.*
