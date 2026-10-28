# Panduan Edit Asset & Timing

## Teks dan warna
- `src/config/video.ts` → `CFG.text`, `CFG.colors`.
- `CFG.timings` berisi detik **timeline asli 18s**; `timelineTime()` memetakan ke 15s agar ritme gerakan tetap natural.
- Ubah durasi hanya dengan memperbarui `timelineTime()` dan `motiongraphic-video.json` bersamaan.

## Layer
- `src/Video.tsx` → judul, keyboard, zoom inset, label, suara.
- `src/components/WindowsUI.tsx` → File Explorer, menu klik kanan, pointer, browser InPrivate.
- `src/scenes/TimelineOverlay.tsx` → penanda langkah.
- `src/scenes/SuccessCue.tsx` → konfirmasi Enter dan hasil pembuatan folder.
- `src/styles.css` → ukuran, layout, opacity dasar, warna dan tipografi.

## Audio
- `public/audio/ctrl-shift-n-v2.wav` → efek keyboard, muncul folder, Enter, pop InPrivate. Audio ini telah disesuaikan untuk durasi 15 detik.
- VO: import narasi sebagai layer Audio baru, pisahkan dari SFX.
- Path Remotion: `staticFile('videos/windows-shortcut-ctrl-shift-n-pro-slow-v1/audio/ctrl-shift-n-v2.wav')`.

## Catatan visual
Area teks utama berada di safe zone. Renderer preview menggunakan frame deterministik. Desain Windows disimulasikan (tidak mengakses Windows sungguhan), sehingga detail bisa berbeda antar versi OS.
