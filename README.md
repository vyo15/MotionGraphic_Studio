## PENGEDITAN TANPA CODING — Perbaikan Inline Editable

**Windows:** klik dua kali `01-MULAI-STUDIO-EDITABLE.bat` untuk Remotion Studio plus Visual Editor. `02-BUKA-EASY-EDITOR.bat` untuk teks, VO dan parameter manifest. Editor berjalan lokal; hasil disimpan di source/manifest project.

Standar wajib video baru: `STANDAR-EDITABLE-STUDIO.md`. Untuk mengecek: klik `03-CEK-EDITABLE.bat`. Model IP Address adalah contoh pola komponen inline yang valid. Informasi pengujian dan keterbatasan tercantum dalam standar.

---

# Visual Editor Universal (pembaruan dari Master v1.7.0)

Jalankan `npm run dev` seperti biasa, atau klik dua kali `BUKA-EDIT-VISUAL.bat` di Windows. **Visual Editor** tersedia di http://localhost:4077/visual, **Easy Editor** di http://localhost:4077, dan **Remotion Studio** di http://localhost:3000. Tidak perlu instalasi Studio baru; semua folder project dan arsip lama dipertahankan. Baca `PANDUAN-VISUAL-EDITOR.md` dan `STANDAR-EDITABLE-STUDIO.md`.

---

> **NEW — Easy Editor:** Jalankan `npm run dev`; buka [Remotion Studio](http://localhost:3000) untuk preview/drag layer yang kompatibel atau [Easy Editor](http://localhost:4077) untuk teks, posisi, opsi animasi/audio yang tersedia, animasi preset, dan audio seri 5 Shortcut. Baca [Panduan Easy Editor](PANDUAN-EASY-EDITOR.md).

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

### Audit kesiapan editing

Jalankan `npm run editcheck` untuk menemukan pola source yang sering menghambat edit visual. Hasilnya hanya peringatan, bukan bukti bahwa semua layer sudah draggable.

**Penting:** `src/Root.tsx` merupakan hasil sync; untuk video yang mengandalkan `sceneEditor`, simpan perubahan melalui Easy Editor agar tidak hilang ketika Root diregenerasi.


### No-code editor V3
Untuk semua add-on baru baca `STANDAR-EDITABLE-STUDIO-v3.md`. Teks utama harus langsung editable di Remotion Studio; teks UI dinamis/legacy dapat diedit lewat Easy Editor → Edit Visual → `LAYER_INTERACTIVE` → pilih layer → `Edit teks` → Simpan. `computed` pada properti animasi dinamis tidak serta-merta hilang dengan install skill.
