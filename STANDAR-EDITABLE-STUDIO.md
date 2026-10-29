# Standar Editable — Remotion Studio Saja (v1.8.1)

Satu Master Remotion, semua add-on disimpan utuh di `projects/<slug>/`; Remotion Studio bawaan adalah **satu-satunya editor**. Preview, timeline, Props, layer `Interactive` dan render dikerjakan dalam UI Remotion. Tidak menjalankan Studio Hub/Easy/Visual Editor.

1. Setiap add-on punya manifest dengan ID dan slug unik, entry `src/Video.tsx` dan export `Video`. `src/Root.tsx`, `src/index.ts`, dan `library/catalog.json` dihasilkan secara otomatis saat sync.
2. Utamakan `Interactive.Div`, `Interactive.Svg` dan sejenisnya untuk elemen yang bisa dipilih, drag, dan dimodifikasi langsung di Remotion. Gunakan nama layer stabil; teks/gaya literal lebih mudah diedit. Jangan menjanjikan drag pada node biasa atau style computed.
3. Untuk elemen dinamis, pisahkan `basePosition`, `userTransform`, dan `animationTransform` (deterministik berdasarkan frame) agar posisi user tidak menghilangkan animasi.
4. Gunakan Props/parameter terhubung untuk pengaturan `copy`, `sceneEditor`, `audioTimeline` yang tidak bisa diubah langsung pada layer. Pengubahan disimpan melalui **ikon Save Props** dari Remotion dan disalin secara aman ke manifest sewaktu sync berikutnya. Konflik akan menghentikan sync, bukan menimpa file.
5. Audio memakai `staticFile('videos/<slug>/audio/nama.wav')` dan sumber file asli di `projects/<slug>/public/audio/`. Props `audioTimeline` menggunakan `id`, `enabled`, `src`, `startFrame`, `trimStartFrames`, `durationFrames`, `volume`, `muted`.
6. `npm run check` dan QA statis hanya mendeteksi sebagian error layout, keterhubungan konfigurasi, dan aset. Verifikasi visual dan tes render asli tetap perlu.
7. Pertahankan ID, slug, aset dan arsip lama saat revisi; jangan hapus data historis otomatis. Backup hasil simpan props baru dibuat sebelum mengubah manifest, di `library/backups/studio-props/`.

Tools CLI untuk sync, render dan ZIP bukan editor/Studio kedua.
