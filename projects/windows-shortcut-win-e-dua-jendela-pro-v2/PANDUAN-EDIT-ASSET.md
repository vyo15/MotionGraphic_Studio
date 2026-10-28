# Panduan Edit Aset — Win + E

- **Judul, subtitle, nama folder, daftar file:** `src/config/video.ts` pada `CONFIG.text`.
- **Warna:** `CONFIG.colors`; **posisi elemen:** `CONFIG.layout` dan `CONFIG.windows`.
- **Timing scene, klik, zoom:** `CONFIG.timing`; **audio:** `CONFIG.sound`.
- **Tampilan desktop:** `src/components/Desktop.tsx`.
- **Tampilan File Explorer:** `src/components/ExplorerWindow.tsx`.
- **Animasi dan layer:** `src/Video.tsx`; **CSS styling:** `src/styles.css`.
- **Audio klik/shortcut:** `public/audio/win-e-two-windows.wav`.

Setelah mengedit file source, Studio akan mem-preview berdasarkan source yang sama. Jika menambah atau mengganti aset di `projects/<slug>/public/`, jalankan `npm run sync` agar mirror `public/videos/<slug>/` ikut diperbarui.

> Sebagian elemen memakai `Interactive.Div`, tetapi kemampuan drag/resize tergantung API Remotion Studio yang terpasang. Jangan menganggap semua elemen otomatis dapat dipindah secara visual.
