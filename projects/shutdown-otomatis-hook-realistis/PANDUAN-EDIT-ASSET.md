# Panduan editing tanpa membongkar Master

## Ubah melalui panel Props komposisi

- `textOverrides`: seluruh judul, caption/subtitle, label film/download, timer, command Windows dan status.
- `downloadPercent`: nilai progres unduhan (default 75%).
- `command`: command Windows untuk bagian Run. Jangan mengganti ke command lain tanpa mengubah penjelasan.
- `shutdownSeconds`: default 3600; sesuaikan label/jeda dan command jika berubah.
- `showHookText`, `showEndText`, `showScene02Text`, `showSubtitle`: tampil/sembunyikan konten tertentu.
- `sceneEditor.sceneXX.layers.<nama>.x/y/scale/rotation/opacity`: ubah geometri setiap elemen. X/Y dalam piksel output 1080×1920, bukan koordinat sumber SVG 540×960.
- `sceneEditor.sceneXX.speed`: mempercepat/memperlambat gerak di dalam jatah frame scene (jangan klaim sinkron VO tanpa memeriksa cue).
- `designOverrides.subtitleY`, `subtitleX`, `subtitleWidth`, `subtitleFontSize`, `subtitleBackground`: geser dan rapikan subtitle.
- `startFrame`/`endFrame` opsional pada layer di Scene03/Scene04 mengatur waktu tampil; Scene01/Scene02 saat ini memakai timeline pose dari source generator asli.

## Edit detail animasi melalui kode konfigurasi (tetap reusable)

- Posisi dan karakter Scene01: `src/components/stickman-scene.mjs` + `src/config/character.ts`.
- Detail Scene02: `src/components/stickman-download.mjs`.
- Beat jam dan tutorial: `src/config/timeline.ts` (`DEFAULT_BEATS`).
- Kata subtitle dan pembagian waktu: `src/config/editable.ts`, `src/config/voice.ts`.
- UI Run: `src/components/ui/WindowsRun.tsx`.
- Layer baru pada V35 memakai `EditableG` dengan `base + user transform` dan animasi frame di dalamnya.

## Audio dan preview

1. Tambahkan VO asli sebagai `public/audio/voiceover.wav` (mono/stereo WAV yang valid), lalu sync.
2. Set `voiceEnabled=true` dari Props.
3. Sesuaikan frame tiap kalimat pada `src/config/voice.ts` dengan audio sebenarnya.
4. Simpan Props menggunakan workflow Studio kamu; periksa persistensi setelah reload. Belum diuji otomatis di Windows.

Jika mengganti durasi scene, perbarui **secara berurutan** `src/config/timeline.ts`, manifest segments, dan cue voice. Semua startFrame harus tanpa celah.
