# Scene 05 ACC — Editable untuk MotionGraphic Studio 1.8.1

Gunakan sebagai **update project yang sudah ada**, bukan Master baru atau project/slug baru.

## Instalasi di Windows

1. Tutup `npm run dev` bila terbuka, lalu backup `projects/easy2boot-multiboot-reels/`.
2. Ekstrak `Easy2Boot-Scene05-ACC-EDITABLE-SIAP-COPY-PASTE.zip`.
3. Salin folder `easy2boot-multiboot-reels` hasil ekstrak ke `MotionGraphic-Studio/projects/`.
4. Pilih **Replace files in destination** untuk file yang bernama sama. **Jangan menghapus folder project lama.**
5. Dari root `MotionGraphic-Studio/`, jalankan `npm run sync` lalu `npm run dev`.
6. Preview komposisi Scene05 dan uji satu teks/menu, Save, reload, lalu render pendek untuk memastikan edit di komputer kamu benar-benar tersimpan.

Jangan menyalin ZIP ini ke dalam `projects/easy2boot-multiboot-reels/files/` atau `src/`.

## Visual ACC

- 16,2 detik (486 frame @30 FPS); urutan USB → Boot Menu → agFM → Windows → WIN11 → ISO → opsi boot → loading → Windows Setup.
- VO persis dari `src/config/scene05Acc.ts` dan `src/config/narration.json`.
- Scene01–04 source tidak disentuh; Scene06 tidak berubah secara visual.
- Total video 2.467 frame (82,23 detik).

## Edit layer

- `src/scenes/Scene05Boot.tsx` untuk elemen laptop, USB, Boot Menu, tiap item agFM, Windows Setup, serta motion.
- Setiap elemen memiliki ID terpisah seperti `S05:boot-usb-highlight`, `S05:row-win11-label`, `S05:setup-title`.
- Edit manual melalui `layerOverrides` di Props: `text`, `x`, `y`, `scale`, `rotation`, `opacity`, `keyframes`.
- `bootOption`, `isoBootName`, `scene05SubtitleLines` tetap bisa diubah lewat Props.
- 5 cue teks standar memakai `Interactive.Text` terpisah untuk memudahkan edit langsung di Studio. Pengujian interaksi GUI Windows dan Save-to-code belum dilakukan secara nyata.

## VO Guide ACC

> Sekarang, booting seperti biasa, Pilih booting USB.
> Begitu muncul, kamu tinggal pilih ISO yang kamu butuhkan.
> Jalankan, dan beberapa saat kemudian, Windows Setup pun terbuka.

Timing per beat adalah 0–4,8 s, 4,8–10,3 s, dan 10,3–16,2 s. Tidak ada rekaman VO final yang disertakan.

## QA

- Validator add-on ketat: 0 error, 0 warning.
- Sintaks source: 0 error.
- Tes Master: 102 lulus, 6 dilewati, 1 gagal (project Shutdown Otomatis kehilangan file `src/config/timeline.ts` dalam Master ZIP; bukan Scene05 Easy2Boot).
- Preview: diproses lewat renderer browser dari JSX/TS source pada 540×960, 30 FPS. Bukan native Remotion.
- Drag/Save/reload UI dan native MP4 Remotion: belum diuji.
