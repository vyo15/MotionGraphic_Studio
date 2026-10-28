# Panduan Visual Editor Master

Buka Master menggunakan `npm run dev`. Gunakan:
- **Remotion Studio**: http://localhost:3000 — lihat animasi, komposisi, timeline, render.
- **Visual Editor**: http://localhost:4077/visual — pilih project/scene/layer, tandai objek di preview, drag untuk mengubah posisi, simpan.
- **Easy Editor**: http://localhost:4077 — teks, pengaturan suara dan angka lainnya.

## Perubahan cepat
1. Di Visual Editor pilih project dan adegan.
2. Gerakkan slider frame ke saat objek tampil; klik **Perbarui Preview**.
3. Pilih layer di kiri. Untuk source `Interactive` yang memiliki X/Y numerik, kotak seleksi dapat langsung digeser atau di-resize lewat handle kanan-bawah. Bila nilai tersedia sebagai literal, warna/rotasi/skala juga bisa diedit lewat Inspector. Untuk sceneEditor/CSS lama, klik **Tandai objek** lalu klik pada objek di screenshot, setelah itu geser penanda. Titik penanda adalah panduan, bukan batas kotak otomatis.
4. Klik **Simpan**. Untuk membuktikan hasil edit, klik **Perbarui Preview** lagi; gunakan **Undo** bila keliru.

### Kursor dan efek klik
Pilih `Kursor & Efek Klik (terhubung)` lalu aktifkan cursor pengganti. Pindahkan **A** (mulai) dan **B** (posisi klik/akhir). Atur `Frame klik`, lalu simpan. Ring klik mengikuti kursor pada frame klik. Hindari membiarkan dua kursor aktif bersamaan.

### `computed` dan batas visual editor
`computed` di Remotion muncul jika nilai berasal dari kode, CSS variable, atau ekspresi dinamis. Visual Editor terpisah dapat menyimpan offset untuk sceneEditor, atau properti inline **numerik** pada elemen Interactive. Tidak mengubah expression dinamis menjadi keyframe yang bisa diedit hanya dengan drag. Jika layer baru belum tersedia, pengembang perlu mengikuti `STANDAR-EDITABLE-STUDIO.md`.

### Jika preview frame gagal
Klik `npm run dev` hingga Remotion Studio benar-benar berjalan, kemudian kembali ke editor. Preview frame memakai Remotion CLI untuk merender satu PNG dan bisa memerlukan beberapa detik. Jika gagal, editor menampilkan alasan dan kamu masih bisa mengubah angka/marker; jangan menganggap gambar tersebut sebagai hasil render terkini.

### Pemulihan
Gunakan Undo di Visual Editor; server memeriksa apakah source belum diubah pihak lain sebelum mengembalikannya. Backups di `library/backups/visual-editor/`. Semua project arsip dan folder lain dipertahankan.
