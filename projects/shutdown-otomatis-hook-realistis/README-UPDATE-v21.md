# Update Shutdown Scene 05 Soft Depth v21

File `src/scenes/Scene04.tsx` adalah scene ke-5 dalam proyek 9-scene. Preview v21 yang disetujui dipindahkan menjadi shape/text editable SVG Remotion native. Scene 01–04 dan 06–09 tidak diubah.

Menjalankan master: `npm install` (jika belum ada), lalu `npm run dev`. Pilih `Shutdown Otomatis` → `S05RunKlikOK`. Gunakan pilihan layer S05 di editor untuk drag dan double-click, atau edit Props untuk judul/perintah/ukuran/offset. Untuk pemeriksaan: `npm run check:syntax`, `npm run qa:native`, `npm run test`.

Catatan: untuk mendapat timeline lengkap setelah menerapkan patch, jangan menyalin nama `Scene04.tsx` ke `Scene05.tsx`: root sudah memetakan Scene04 sebagai segmen ke-5.
