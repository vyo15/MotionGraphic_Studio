# FILE CHANGE ONLY — S02 Natural Cursor + Shortcut Focus v7 (ACC)

Basis Master: `MotionGraphic-Studio-FULL-v1.8.1-20261125-062014.zip`.

## Yang berubah

- `src/scenes/Scene02.tsx`: sinkronisasi timing judul dan SFX dengan preview ACC.
- `src/components/Scene02Windows11.tsx`: kamera desktop stabil, kursor Bezier natural dengan empat klik berurutan, menu Windows, minimisasi Explorer, dan hasil shortcut dengan fokus coral.
- `production/editable-blueprint.json`: target native baru untuk teks dan penekanan fokus.
- `production/sound-cues.json`: penempatan empat cue klik S02 disamakan dengan source.
- `EDITABLE-LAYER-MAP.md`: daftar layer dan panduan.
- `PRODUCTION-STATE.json`: catatan ACC S02.

Tidak ada perubahan `Scene01.tsx`, `Scene03.tsx`–`Scene06.tsx`, manifest, file inti Master atau proyek lain.

## Cara pakai

1. Backup dulu `projects/sample-startup-windows-director/`, terutama jika pernah mengeditnya di PC.
2. Ekstrak patch dari root folder yang berisi `package.json`; pilih Merge/Replace **hanya jika perubahan lokal sesuai**.
3. Jalankan `npm run dev`, buka `SampleStartupWindowsDirector-S02`, lalu cek klik menu detik 4–12 dan fokus akhir detik 14.4–16.
4. Aktifkan `showVoGuide` dan `showSubtitles` untuk panduan VO; matikan saat video bersih.

## Editable

Teks/fokus/cursor/desktop/menu adalah React/Remotion native layer bernama. Beberapa properti motion dan control points perlu diedit di source `Scene02Windows11.tsx`; tidak semuanya dijamin drag/keyframe no-code. Verifikasi UI Save/reload serta render native pada PC sebelum mengklaim editable langsung. Perubahan teks VO di Studio tidak otomatis menyinkronkan file SRT.
