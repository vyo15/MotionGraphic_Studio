# Shutdown Otomatis — Stickman V35 (Remotion editable)

Add-on folder-first untuk **MotionGraphic Studio Master v1.8.1**, mempertahankan identitas `ShutdownOtomatisHookRealistis` dan slug `shutdown-otomatis-hook-realistis` dari revisi sebelumnya.

**Isi:** Full 32 detik (960 frame) serta 4 komposisi segmen independen, 1080×1920 / 30 FPS. Animasi adalah HTML/SVG/React berbasis `useCurrentFrame`, tanpa GIF atau screenshot video.

## Instalasi

1. Ekstrak ZIP add-on hingga ada folder `shutdown-otomatis-hook-realistis` yang berisi `motiongraphic-video.json`.
2. Salin **folder tersebut secara utuh** ke `MotionGraphic-Studio/projects/`.
3. Jalankan `npm run dev` atau `npm run sync` dari **Master**, bukan dari add-on.
4. Buka komposisi full atau S01–S04 dalam folder Scenes. Editor Remotion Master akan memakai source yang sama.

Jangan copy folder `src` ke root Master. Jangan mengubah Root.tsx/index.ts/catalog/package.json secara manual.

## Info penting

- Voice-over asli **tidak disertakan**. Preview bawaan tanpa audio VO, subtitle ESTIMASI.
- Untuk menambahkan VO asli, simpan di `public/audio/voiceover.wav` pada add-on, sync ulang, set `voiceEnabled=true`, lalu cocokkan cue di `src/config/voice.ts`.
- Setiap segmen bisa dibuka secara terpisah. Nama layer `Interactive.G` dan `Interactive.Div` dipasang agar bisa dipilih di Studio versi yang sesuai. **Fungsi drag/edit/save/reload pada komputer Windows belum diuji**, sehingga jangan menganggap semua komponen pasti draggable; kontrol Props selalu tersedia.
- Scene 03 dan 04 menggunakan komponen React/SVG asli. Scene 01 dan 02 mempertahankan geometri vektor V29/V31; setiap grup SVG dibaca sebagai layer interaktif terpisah.
- Status review `in-review` sampai disetujui. Tidak ada CTA atau tambahan scene di luar V35.

Baca `PANDUAN-EDIT-ASSET.md`, `EDITABLE-LAYER-MAP.md`, `SCRIPT.md` dan `VALIDASI.md`.
