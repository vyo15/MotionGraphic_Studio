# Panduan Sumber Aset dan Edit Layer — Studio v1.6.1

**Lokasi sumber asli video:** `projects/<slug>/`. Contohnya:

```
projects/windows-shortcut-ctrl-shift-t/
├── motiongraphic-video.json
├── src/Video.tsx
├── src/components/
├── src/scenes/ (bila ada)
├── src/config/
├── public/audio/sfx.wav
├── README.md
└── PANDUAN-EDIT-ASSET.md
```

1. **Teks, warna, durasi, easing:** buka `src/config/*` jika ada, atau komponen `src/Video.tsx`/`src/scenes/`; jangan ubah file dari project lain.
2. **Posisi, skala, rotasi:** ubah properti layer yang bersangkutan. Jika komponen sudah memakai `Interactive`, edit via kontrol Remotion Studio yang didukung; jika tidak, gunakan source/props. Jangan menjanjikan drag otomatis.
3. **Audio/gambar/icon:** ubah aset asli di `projects/<slug>/public/`, lalu `npm run sync`. Video akan mengaksesnya menggunakan `staticFile('videos/<slug>/audio/...')`.
4. `public/videos/<slug>` adalah **mirror sementara** yang dapat ditimpa saat sync dan bukan sumber untuk editing.
5. Bila revisi, jangan ubah nama folder (`slug`) atau composition ID; hanya edit layer yang diminta.
6. `npm run zip -- IDVideo` membuat paket yang berisi **folder video lengkap**. `npm run zip -- --studio` membuat backup **Master lengkap**. Keduanya tidak memakai WinRAR.
7. Setelah editing, jalankan `npm run check`, preview melalui `npm run dev` dan render memakai `npm run render`.

Perlu diingat: `npm run check` mengecek data, import, TypeScript dan rujukan aset literal, bukan menilai kualitas visual render.
