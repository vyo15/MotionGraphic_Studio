# FIX: Folder video + komposisi per segmen (MotionGraphic Studio v1.8.1)

**Masalah yang ditangani**: Studio sebelumnya hanya menampilkan satu composition di dalam folder karena `motiongraphic-video.json` kedua video belum memiliki array `segments`. `Root.tsx` adalah file hasil otomatis, sehingga mengeditnya langsung tidak menyelesaikan masalah.

## Isi patch change-only

- `tools/register-scene-segments.mjs` — membaca timing frame scene dari source video dan **menambahkan metadata hanya jika belum ada**.
- `tools/sync-projects.mjs` — memanggil pendaftaran scene sebelum registrasi composition otomatis.
- `PASANG-FIX-SEGMEN.bat` — satu kali klik untuk menjalankan `npm run sync`.

Patch **tidak membawa** `src/Root.tsx`, `library/catalog.json`, `package.json`, project ZIP lama, maupun aset video. File-file tersebut dikelola otomatis atau dipertahankan di Master.

## Cara memasang (Windows)

1. Backup Master yang sedang dipakai (opsional tetapi dianjurkan). Hentikan terminal `npm run dev` terlebih dahulu.
2. Ekstrak ZIP ini. **Copy isi folder `MotionGraphic-Studio` di ZIP ke folder `MotionGraphic-Studio` yang sekarang**; pilih merge/replace untuk `tools/sync-projects.mjs`. JANGAN mengganti atau menghapus folder `projects/`.
3. Double-click `PASANG-FIX-SEGMEN.bat` yang sekarang ada di root Master.
4. Pastikan keluar pesan `[FOLDER SYNC] 2 folder video, 14 komposisi` dan `HASIL: 2 video, 12 segmen, ... 0 masalah` (bila library masih berisi 2 video).
5. Jalankan `npm run dev` atau BAT pembuka Studio yang biasa digunakan. Refresh browser bila diperlukan.
6. Klik panah di samping `Videos > Windows-Hacks-5-Shortcut` untuk melihat komposisi lengkap dan 7 segmen. `Belajar-IP-Address` memiliki video lengkap dan 5 segmen.

## Apa yang berubah / tidak berubah?

- **Terdaftar otomatis**: `WinHacks-00-Opening`, `WinHacks-01-CtrlShiftT`, `WinHacks-02-TaskManager`, `WinHacks-03-Win-Shift-S`, `WinHacks-04-Win-E`, `WinHacks-05-Ctrl-Shift-N`, `WinHacks-06-CTA`.
- **Video IP Address** terdaftar menjadi `IPAddress-01-Hook` ... `IPAddress-05-CTA`.
- ID video lengkap, frame keseluruhan, efek, suara, defaultProps, layer edit dan aset **tidak diubah**.
- Komposisi segmen menampilkan **rentang frame dari `Video.tsx` asli**, bukan video baru yang berbeda. Source scene tetap satu dan tidak perlu dicopy. Edit JSX scene otomatis dipakai komposisi lengkap dan segmen.
- Props yang disimpan dari Studio digabung ke manifest melalui fitur jembatan Props Master yang sudah ada. Perubahan yang konflik sengaja ditolak agar data tidak tertimpa.
- Sebelum metadata baru ditambahkan, backup manifest diletakkan di `library/backups/segment-registration/`. Bila metadata `segments` sudah terisi, **tidak akan ditimpa**.
- Nama segmen di sidebar menggunakan ID dengan tanda hubung, karena Remotion membatasi karakter ID composition. Judul ramah pengguna tetap tersedia sebagai metadata dalam manifest.

## Standar project selanjutnya

Untuk video baru, disarankan menyediakan `segments` dalam `motiongraphic-video.json` (id, title, startFrame, durationInFrames). Generator akan mendaftarkan semuanya. Untuk format `src/config/series.ts` dengan `TIMELINE` JSON statis atau `SCENE_1`, `SCENE_2` ... di `Video.tsx`, patch dapat membaca dan mendaftarkan secara otomatis. Struktur lain perlu metadata segmen eksplisit.

## Validasi

Diuji pada salinan dari Master yang diunggah 30 Oktober 2026: sinkronisasi 14 composition, 12 segmen, seluruh 11 test node lulus, tanpa perubahan Props video yang sudah ada. **Belum diuji langsung pada Windows atau lewat preview/render browser di PC pengguna.**
