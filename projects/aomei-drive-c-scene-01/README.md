# AOMEI — Scene 01 Hook (editable)

**Add-on independen untuk MotionGraphic Studio Master v1.8.1**, bukan Master baru. Tidak mengubah atau menimpa video yang sudah ada.

- Slug: `aomei-drive-c-scene-01`
- Composition ID: `AomeiDriveCScene01`
- Durasi: **447 frame = 7,45 detik**, 60 FPS, resolusi 1080 × 1920 (9:16)
- Desain: editorial terang, grid halus, File Explorer, highlight C lalu D, diagram satu disk yang sama.
- Hook terbaru: **“Waktu Drive C penuh, pernah nggak kepikiran buat nambahin kapasitasnya dari Drive D?”**
- Source TSX/HTML/CSS/SVG; **tidak memakai MP4/screenshot sebagai latar video**.

## Instalasi — copy FOLDER add-on, bukan isi file ke root Master

1. Ekstrak ZIP sampai terlihat folder `aomei-drive-c-scene-01` berisi `motiongraphic-video.json`.
2. Copy folder tersebut ke `<Master Studio>/projects/` sehingga manifest ada di `projects/aomei-drive-c-scene-01/motiongraphic-video.json`.
3. Dari direktori Master yang ada `package.json`, jalankan:
   ```bat
   npm run sync
   npm run dev
   ```
4. Di Remotion Studio pilih **AOMEI — Scene 01 Hook | Drive C dan D**.
5. Untuk validasi di Windows: `npm run check` dan `npm run render`.

**Jangan** mengedit manual `src/Root.tsx`, `src/index.ts`, `package.json`, `library/catalog.json`, ataupun file mirror `public/videos/` Master. **Jangan** menyalin `src/` add-on langsung ke `src/` Master.

## Cara mengedit

- **Tanpa VS Code (yang didukung Remotion native):** pilih layer bernama `S01 — ...` pada preview saat tersedia, edit tulisan/warna/posisi yang merupakan literal `Interactive.Div`. Buka **Props** komposisi untuk `sceneEditor.explorer`, `disk`, `header`, `cursor`, `subtitle` — ubah x/y/scale/rotation/opacity, lalu gunakan perintah **Save Props** Remotion Studio. Perubahan Props direkonsiliasi ke manifest oleh Master saat sync berikutnya.
- **Timing dan jalur kursor**: edit `src/config/scene01.ts`. Timing subtitle disinkronkan secara manual setelah rekaman VO sebenarnya ada.
- **Warna keseluruhan**: `src/config/design.ts` (beberapa fill literal pada layer Interactive di JSX juga dapat diedit langsung di Studio jika fitur inline tersedia).
- **Animasi**: `src/animations/presets.ts` dan `src/scenes/Scene01Hook.tsx`.
- **Audio**: file `public/audio/voiceover-scene01.wav` sekarang hanya **placeholder sunyi**, bukan VO pengguna. Ganti dengan WAV sebenarnya dan set `voiceEnabled=true` di Props. Audio tidak di-*bake* ke elemen visual.

## Catatan penting keakuratan visual

- Nilai pada File Explorer dan disk adalah **contoh**: C 120 GB (5 GB free), D 360 GB (295 GB free), satu disk 480 GB.
- Scene 01 hanya memperlihatkan **masalah dan pertanyaan**. Tidak ada pemindahan ruang partisi yang benar-benar terjadi di Scene 01.
- Preview MP4 yang disetujui sebelumnya memiliki 60 FPS dan panjang 7,45 detik. Add-on ini mempertahankan **60 FPS, 447 frame = 7,45 detik** agar sesuai preview terakhir dengan animasi dihitung per frame; gerakan dirancang mengikuti referensi, bukan salinan frame-identik. Tidak menggunakan motion interpolation untuk menipu editabilitas.
- Uji kemampuan drag dan simpan teks/Props tetap harus dilakukan di Remotion Studio pada PC pengguna karena tidak ada sesi editor Windows lokal di lingkungan ini.

## Struktur

- `motiongraphic-video.json` — manifest
- `src/Video.tsx` — `export const Video`
- `src/scenes/Scene01Hook.tsx` — komposisi scene
- `src/components/` — Explorer, Disk, Header, Cursor, Captions, MotionLayer, Background
- `src/animations/presets.ts` — easing dan utilitas deterministik
- `src/config/scene01.ts`, `design.ts` — koordinat, beat, copy dokumentasi, cursor path, warna
- `public/audio/` — suara terpisah; folder lain siap aset
- `PANDUAN-EDIT-ASSET.md` & `EDITABLE-LAYER-MAP.md` — panduan pengubahan
