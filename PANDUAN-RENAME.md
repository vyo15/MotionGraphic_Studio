# Panduan Rename MotionGraphic Studio v1.6.2

**Cara paling mudah:** buka terminal pada folder yang berisi `package.json`, jalankan `npm run rename`, pilih video, kemudian pilih mode.

1. **Judul saja** — nama tampilan di daftar berubah, ID/folder/slug/aset tetap.
2. **Judul + slug + folder** — masukkan nama baru; nama folder dinormalisasi `kebab-case`, slug pada manifest serta rujukan aset dalam folder video diubah otomatis.
3. **Ikuti nama folder Explorer** — bila nama folder sudah terlanjur diubah, sistem memakai nama itu dan menormalkannya ke slug valid.
4. **Ikuti slug manifest** — memperbaiki nama folder bila diganti manual, tanpa mengganti slug.

Proses rename menampilkan simulasi perubahan dan meminta konfirmasi `RENAME`; membuat salinan sementara, memvalidasi, serta rollback bila gagal. **ID komposisi tetap sama.** Jalankan `npm run sync` jika Studio sedang terbuka, lalu refresh browser. Nama folder tidak boleh bentrok dengan folder lain. Slug yang diawali angka otomatis ditambahi `video-` (contoh `5 Tips` menjadi `video-5-tips`).

## Perintah langsung (opsional)

```bash
npm run doctor
npm run rename
npm run rename -- WindowsShortcutCtrlShiftT --name "Tutorial Shortcut Baru"
npm run rename -- WindowsShortcutCtrlShiftT --title-only --title "Judul Tampilan Baru"
npm run rename -- WindowsShortcutCtrlShiftT --adopt-folder
npm run rename -- WindowsShortcutCtrlShiftT --repair
npm run rename -- WindowsShortcutCtrlShiftT --name "Nama Baru" --dry-run
```

Tambahkan `--yes` **hanya untuk otomasi yang disengaja**, karena akan menghilangkan konfirmasi ketik `RENAME`. Cek hasil dengan `npm run doctor` dan `npm run check`.

## Flow yang direkomendasikan

- Mulai kerja: `npm run menu` → `Buka Remotion Studio` (atau `npm run dev`).
- Tambah video baru: copy folder add-on ke `projects/` atau pilih `Tambah folder video` → `npm run sync`.
- Ubah judul/slug: `npm run rename` → pilih mode → konfirmasi → refresh Studio.
- Cek error: `npm run doctor`; untuk pemeriksaan menyeluruh, `npm run check`.
- Render: `npm run render` → pilih video → file MP4 di `out/`.
- Export: `npm run zip` → pilih video / semua / Master. ZIP Master selalu berada **di luar folder Studio**, pada folder saudara `MotionGraphic-Studio-Backups`.
- Hapus: `npm run delete` mengarsipkan (bukan menghapus permanen), lalu `npm run restore` untuk memulihkan.

**Batasan:** Rename memperbarui referensi teks di dalam folder project tersebut. Jika ada script eksternal, tautan luar, atau dokumentasi di tempat lain yang memakai slug lama, perbarui secara manual. Jangan rename folder atau project ketika proses render sedang berjalan. Setelah rename, preview dan render lokal pada PC harus diuji.
