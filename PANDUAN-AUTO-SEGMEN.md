# AUTO FOLDER & SEGMEN — MotionGraphic Studio v1.8.1

Master tetap **satu Remotion Studio**. Tidak perlu daftar komposisi, edit `src/Root.tsx`, atau edit `library/catalog.json` sendiri.

## Cara pakai (folder-first)

1. Nyalakan Master dengan `npm run dev` (cukup sekali).
2. Copy **folder add-on utuh** ke `MotionGraphic-Studio/projects/<slug>/`.
3. Studio yang sedang berjalan memantau folder `projects/`; setelah copy selesai, sinkronisasi dan registrasi komposisi terjadi otomatis. Jika sidebar belum terlihat, refresh browser.
4. Alternatif: taruh ZIP add-on di `library/masuk/`. ZIP yang sudah selesai dicopy dideteksi, diimpor ke `projects/`, lalu disinkron otomatis.
5. Kalau Studio sedang tutup, `npm run dev` juga mengimpor dan sync otomatis saat startup.

Hasil sidebar: **Videos → [Judul Video] → Video Lengkap + Segmen 01, 02, ...**. Edit scene/Props dari source yang sama tercermin pada versi lengkap. Props yang disimpan di Remotion akan dipromosikan ke manifest ketika sync. Konflik Props tidak ditimpa diam-diam.

## Dari mana durasi segmen diketahui?

Agar deteksi aman, Master memprioritaskan metadata yang sudah ada. **Master tidak mengarang durasi** berdasarkan nama folder atau screenshot.

1. Jika `motiongraphic-video.json` sudah berisi `segments`, gunakan itu apa adanya (tanpa overwrite).
2. Jika belum ada, coba `src/config/segments.json`, `src/config/segments.ts`, `src/config/scenes.ts`, atau `src/config/series.ts` dengan array statis `SEGMENTS`, `SCENES`, atau `TIMELINE`.
3. Jika belum ada, coba membaca konstanta `SCENE_1`, `SCENE_2`, ... dalam `src/Video.tsx` yang dipakai oleh `<Sequence>`.
4. Jika belum ada, coba membaca `<Sequence from={0} durationInFrames={...}>` yang memakai **angka literal** dan bersama-sama mencakup seluruh durasi tanpa celah atau overlap.
5. Jika tidak bisa dipastikan, **video tetap terdaftar, tetapi segmen tidak dibuat otomatis**. Log akan menjelaskan bahwa timing scene perlu diberikan.

Untuk video baru dengan timing dinamis/rumit, solusi terbaik adalah sertakan `segments` di manifest sejak add-on dibuat, atau sertakan file `src/config/segments.json` berikut. Ini cukup dilakukan oleh **pembuat add-on**, bukan langkah manual pengguna saat mengimpor:

```json
[
  {"title":"01 — Opening", "startFrame":0, "durationInFrames":90},
  {"title":"02 — Penjelasan", "startFrame":90, "durationInFrames":180},
  {"title":"03 — CTA", "startFrame":270, "durationInFrames":90}
]
```

Contoh di atas untuk video 360 frame; total durasi harus sama dengan `durationInFrames` pada manifest. ID segmen yang tidak ditentukan dihasilkan otomatis dari ID video. Semua ID harus unik di seluruh Master.

## Keamanan

- Hanya memutakhirkan metadata segmen untuk **project yang belum punya segmen**.
- Tidak mengganti source scene, audio, media, atau `defaultProps`.
- Sebelum memutakhirkan manifest, backup dibuat di `library/backups/segment-registration/`.
- Sync berjalan satu per satu (debounce), tidak memulai Remotion Studio kedua.
- Proyek dengan metadata timing ambigu tidak dipecah secara asal.
- Jika source JSX atau manifest belum selesai dicopy, tunggu sinkronisasi ulang otomatis; jika tetap gagal, cek pesan terminal.

## Jika belum muncul

Pastikan folder video memiliki `motiongraphic-video.json` dan file `src/Video.tsx`, serta nama folder cocok dengan `slug` manifest. Refresh browser Studio. `npm run sync` tetap dapat dijalankan untuk pemeriksaan manual, **tetapi bukan syarat import normal**.
