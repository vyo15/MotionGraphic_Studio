# PANDUAN EDIT — LAYER & ASSET

## A. Cara yang paling mudah (melalui Props di Remotion Studio)

1. Pilih `WindowsHacks5ShortcutLengkap`, lalu buka **Props**.
2. Buka `sceneEditor`. Nama kategori: `HOOK`, `CTRL_SHIFT_T`, `CTRL_SHIFT_ESC`, `WIN_SHIFT_S`, `WIN_E`, `CTRL_SHIFT_N`, `CTA`.
3. Buka `layers`, pilih lapisan misalnya `window` atau `cursor`.
4. Untuk geser elemen: `x` (+ ke kanan), `y` (+ ke bawah). Untuk memperbesar: `scale` (contoh 1.12), untuk putar: `rotation` dalam derajat. Untuk menyembunyikan: `enabled=false` atau `opacity=0`. `zIndex=0` berarti susunan asli.
5. `startFrame` dan `endFrame` memakai frame **lokal scene** pada 30 FPS; `endFrame=-1` berarti tanpa batas akhir. `animation` menerima `none`, `fade`, `slide-up`, `pop`. Gunakan `delayFrames` dan `animationFrames` untuk menunda dan mengatur lama efek tambahan.
6. Teks utama dan sejumlah teks isi Windows dapat diubah di `copy`. Isi value teks (kosong = kembali ke aslinya). **Nilai yang disimpan secara permanen ada di** `motiongraphic-video.json > defaultProps`. Jika panel Studio hanya mengubah preview sementara, ubah nilai yang sama di manifest dengan editor teks dan jalankan `npm run sync`.
7. `sfxEnabled` dan `sfxVolume` per shortcut mengendalikan audio efek suara; untuk suara narasi gunakan `voice.enabled` dan `voice.volume` di tingkat atas.

## B. Detail UI, font, warna, kursor dan zoom

- `src/scenes/01-ctrl-shift-t/components/BrowserChrome.tsx`: tab browser, URL, dokumen dan toolbar. `config/video.ts`: posisi browser, trigger tutup/kembali, warna, timing.
- `02-ctrl-shift-esc/components/TaskManager.tsx`: baris proses, status **Not responding**, tombol **End task**. `config/video.ts`: ukuran window, crop zoom, event select/end.
- `03-win-shift-s/components/Desktop.tsx`: toolbar Snipping Tool, area seleksi, overlay, notifikasi. `config/video.ts`: koordinat awal/akhir drag, ukuran crop zoom.
- `04-win-e/components/ExplorerWindow.tsx` dan `Desktop.tsx`: dua jendela, sidebar, isi folder, status folder lama tetap terbuka. `config/video.ts`: jarak jendela, durasi klik, tampilan dan teks.
- `05-ctrl-shift-n/components/WindowsUI.tsx`: File Explorer, nama folder, kursor, bonus Edge InPrivate. `config/video.ts`: nama folder, ketikan, timing, warna.
- CSS `styles.css` di tiap episode mengendalikan warna, font, ukuran elemen mikro, stroke ikon, background, dan warna hover.
- `src/scenes/Hook.tsx` dan `CTA.tsx` mengatur opening/closing. Teks penting juga tersedia dalam Props.

## C. Jika ingin mengubah total durasi video

Total utama `src/config/series.ts` adalah 2.085 frame. Untuk mengganti durasi, ubah *bersamaan* `TIMELINE`, `START`, `FRAMES`, `TOTAL_FRAMES` serta `motiongraphic-video.json > durationInFrames`. Nilai `nativeFrames` menandakan durasi aksi asli; menambah `frames` hanya menahan frame terakhir (jangan set lebih rendah dari `nativeFrames`). 

Untuk memperpendek video secara sehat, kurangi jeda *hold* yang 0,5–1 detik, **jangan mempercepat animasi utama**. Untuk menyelaraskan voice, baca `VOICEOVER-CUES.md`.

## D. Lokasi aset

Aset asli disimpan di dalam `public/<episode>/audio/`. File suara narasi baru ditaruh di `public/audio/`; Master otomatis membuat mirror `public/videos/windows-hacks-5-shortcut-lengkap/` sesudah `npm run sync`. Jangan ubah mirror itu secara manual.

## E. Batas editing visual

Beberapa elemen dengan animasi dinamis mungkin tidak bisa langsung di-drag di Studio (opsi abu-abu). Itu **bukan tombol palsu**: gunakan Props `sceneEditor`, atau ubah nilai file JSX/config. Tidak ada editor drag terpisah dengan fungsi Save/Reload yang dijanjikan dalam ZIP ini.
