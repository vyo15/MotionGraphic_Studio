# Windows Hacks 04 — Win + E (Dua Jendela)

Video 1080×1920, 30 FPS, 10 detik. Komposisi: `WindowsShortcutWinEDuaJendelaProV2`.

## Pasang

Copy seluruh folder `windows-shortcut-win-e-dua-jendela-pro-v2` ke `MotionGraphic-Studio/projects/`, **bukan menyalin isi `src/` ke folder utama Master**. Jalankan `npm run dev` atau `npm run sync` dari folder Master.

## Edit

Ubah teks, warna, posisi, timing, nama folder di `src/config/video.ts`; komponen tampilan Windows berada pada `src/components/` dan timeline utama di `src/Video.tsx`. Ganti WAV pada `public/audio/`. Aset asli harus tetap di dalam folder project ini.

## Render dan backup

Di folder Master jalankan `npm run render` lalu pilih `WindowsShortcutWinEDuaJendelaProV2`. Jalankan `npm run zip` lalu pilih video yang sama untuk membuat paket backup ZIP editable.
