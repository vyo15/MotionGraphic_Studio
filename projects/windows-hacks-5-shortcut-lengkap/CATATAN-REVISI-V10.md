> **ARSIP HISTORIS:** Instruksi editor 4077/4081 dalam dokumen lama ini sudah tidak berlaku. Versi v1.8.1 menggunakan Remotion Studio (`http://127.0.0.1:3000`) saja. Ikuti README proyek untuk langkah terkini.

# Revisi V10 — Excel, zoom editor dan CTA kreator

- Kursor desktop diarahkan ke baris Microsoft Excel (Not responding), kemudian tombol End task.
- Kursor di panel close-up mengambil proyeksi dari koordinat target yang sama, sehingga efek klik tepat pada tombol yang ditampilkan.
- CTA memakai foto pengguna dan kredit **Vio Yusup Iskandar**. Setiap teks utama/foto disusun sebagai layer terpisah dalam Studio.
- Visual Editor Master (`http://127.0.0.1:4077/visual`) menyediakan preset zoom 60% dan 70% dengan tombol +/- 5%. **Dropdown native Remotion Studio di localhost:3000 tidak berubah**. Zoom hanya alat melihat kanvas, tidak mengubah skala hasil render.
- Tidak mengubah ID, slug, episode lama, durasi maupun video IP Address.

Untuk memasang file change only: salin folder `projects` dan `tools` dari ZIP ke folder Master, lalu replace dan `npm run dev`.
