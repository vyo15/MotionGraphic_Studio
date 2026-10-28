# WINDOWS HACKS — 5 SHORTCUT WINDOWS | EDITABLE V2

**Satu add-on folder-first · 7 adegan · 1080 × 1920 · 30 FPS · 2.085 frame (69,5 detik).**

## Pemasangan tanpa menimpa Master

1. Backup **hanya** folder lama `MotionGraphic-Studio/projects/windows-hacks-5-shortcut-lengkap/` jika kamu ingin bisa kembali ke versi lama.
2. Ekstrak ZIP ini hingga terlihat folder `windows-hacks-5-shortcut-lengkap` yang di dalamnya ada `motiongraphic-video.json`.
3. Ganti folder project dengan **folder hasil ekstrak utuh** di `MotionGraphic-Studio/projects/`. Jangan memindahkan `src/` atau `public/` ke root Master.
4. Jalankan `npm run dev` atau `npm run sync` **dari folder Master** (yang berisi `package.json`).
5. Buka komposisi **WindowsHacks5ShortcutLengkap**. Preview dan render memakai source yang sama; jika sudah siap, jalankan `npm run render`.

Slug dan ID lama **dipertahankan**, karena ini revisi dari project gabungan, bukan video baru. Project asli 5 episode lainnya tidak diubah.

## Kenapa sekarang lebih editable?

- Tiap adegan punya beberapa `Interactive.Div` bernama, dan seluruh lapisan demo utama tetap berupa HTML/CSS/SVG, bukan video raster.
- Di panel **Props** komposisi, buka `sceneEditor` → pilih adegan → `layers` → pilih elemen (misalnya `window`, `zoom`, `keyboard`, `cursor`, `title-problem`). Ubah `x`, `y`, `scale`, `rotation`, `opacity`, `zIndex`, `enabled`, `startFrame`, `endFrame`, `animation`, `delayFrames`, `animationFrames`.
- `sceneEditor.<ADEGAN>.copy` mengubah judul, subtitle, dan sejumlah teks isi UI melalui Props. Kosong = gunakan teks default. Daftar lengkap lihat `EDITOR-LAYER-MAP.md`.
- `sceneEditor.<ADEGAN>.sfxVolume` dan `sfxEnabled` mengatur SFX masing-masing shortcut secara independen.
- CSS `translate`, `scale`, `rotate` dari editor **terpisah** dari `transform` animasi asli; perpindahan posisi tidak menghilangkan animasi klik/zoom.
- Konfigurasi UI kecil (mis. isi daftar file, warna detail, lintasan kursor dan timing proses) tetap dapat diubah di `src/scenes/<episode>/config/video.ts` dan file komponen terkait.
- Kemampuan drag/resize secara langsung bergantung pada bagian JSX yang didukung `Interactive` di versi Remotion Studio, **tidak menjamin semua subelemen** bisa di-drag. Props dan edit file konfigurasi adalah cara edit yang lebih dapat diandalkan.

## Tempo Reels + voice-over

Tempo ditargetkan mudah untuk rekaman suara: **69,5 detik**. Animasi asli tetap bergerak dengan kecepatan normal. Jeda setelah beberapa demo hanya **0,5–1,0 detik**. Semua waktu ada dalam `src/config/series.ts`, `VOICEOVER-CUES.md`.

Rekam VO per adegan agar mudah diulang. Simpan `00-hook.wav` hingga `06-cta.wav` dalam `public/audio/`. Jalankan `npm run sync`, lalu set `voice.enabled=true` lewat Props. Disertakan **7 file WAV placeholder hening (0,1 detik)** agar pemeriksaan aset Master lolos. Ganti dengan rekaman asli; kontrol default `false`.

## Struktur

```
windows-hacks-5-shortcut-lengkap/
├── motiongraphic-video.json          # ID/slugs tetap, defaultProps edit-layer
├── src/
│   ├── Video.tsx                     # 7 scene + tujuh jalur suara
│   ├── scenes/Hook.tsx, CTA.tsx
│   ├── scenes/01-ctrl-shift-t/...     # DOM Chrome
│   ├── scenes/02-ctrl-shift-esc/...   # DOM Task Manager
│   ├── scenes/03-win-shift-s/...      # DOM Snipping Tool
│   ├── scenes/04-win-e/...            # dua Explorer
│   ├── scenes/05-ctrl-shift-n/...     # folder baru + InPrivate
│   ├── editor/                        # layer posisi, animasi, teks, opacity
│   ├── animations/
│   ├── components/DemoSlot.tsx       # normal-speed + jeda akhir
│   └── config/series.ts             # timeline utama
├── public/                           # SFX asli + folder audio VO kosong
├── EDITOR-LAYER-MAP.md
├── PANDUAN-EDIT-ASSET.md
├── VOICEOVER-CUES.md
└── README.md
```

**Batas uji:** migrasi dan sync master berhasil, typecheck `tsc --noEmit` lolos. Render Windows/MP4 dan drag interaktif tiap komponen belum diuji; native renderer Linux pada lingkungan produksi ini terkendala dependensi binari Rspack Windows dari ZIP Master.
