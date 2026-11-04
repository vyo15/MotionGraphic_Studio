# Panduan Remotion Studio — Satu Master

1. Ekstrak Master yang sudah dibersihkan sebagai folder `MotionGraphic-Studio` dan jangan campur dengan folder Master lama. Backup source Anda dulu.
2. Jalankan `npm install` sekali dari dalam folder (atau `npm ci` untuk menggunakan versi tepat pada lockfile). Lanjutkan `npm run dev`.
3. Pilih komposisi lengkap atau segmen di sidebar. Untuk video baru, copy **folder add-on utuh** ke `projects/<slug>/`, lalu `npm run sync`.
4. Atur Props komposisi atau elemen yang mendukung fitur `Interactive`. Tidak semua elemen bisa diseret. Lakukan preview frame awal/tengah/akhir sebelum render.
5. Gunakan `npm run check`, `npm test`, lalu `npm run render` atau tombol render resmi Remotion Studio. File hasil render CLI berada di folder backup luar Master.
6. Gunakan `npm run zip` untuk ekspor source video editable (bukan file MP4 yang menjadi editable).

Catatan: `src/Root.tsx`, `src/index.ts`, dan `library/catalog.json` adalah hasil sinkronisasi; jangan diedit manual. Kode visual asli tidak di-flatten dan kedua project lama tetap aktif.
