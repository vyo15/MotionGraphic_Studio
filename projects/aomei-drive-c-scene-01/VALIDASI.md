# VALIDASI — AOMEI Scene 01

- [x] Struktur add-on folder-first dibuat, tanpa mengganti Master pengguna.
- [x] `motiongraphic-video.json` memiliki id unik, slug sesuai folder, entry, exportName, 1080x1920, 60fps, 447 frame.
- [x] `src/Video.tsx` mengekspor `Video`.
- [x] UI Explorer, diagram, cursor, subtitle terdiri dari React/HTML/SVG bukan screenshot atau MP4 flat.
- [x] Hook terbaru digunakan pada subtitle 4 beat.
- [x] Audio disimpan terpisah dan dinonaktifkan default; WAV yang disertakan hanya placeholder sunyi.
- [x] Transform dasar, user, animasi dipisahkan.
- [ ] Uji drag/resize/edit teks dan save/reload dalam Remotion Studio pada Windows — belum diuji.
- [ ] Cek lip-sync ke rekaman VO asli — belum tersedia.
- [ ] Render MP4 dari source Remotion ini — belum diverifikasi.
- [ ] `npm run check` di Master Windows pengguna — belum dilakukan.

Sumber visual referensi: `SCENE-01-LEBIH-CEPAT-HALUS-60FPS.mp4` yang sudah disetujui; source ini adalah rekonstruksi editable, bukan frame-identik dari preview yang sebelumnya dirender.

## Hasil validasi di salinan Master v1.8.1 (Linux sandbox)

- **LULUS:** `node tools/sync-projects.mjs` mengenali add-on baru dan seluruh 3 proyek Master sebelumnya tetap terdaftar pada salinan uji.
- **LULUS:** `node tools/validate-library.mjs` — 0 masalah dan semua rujukan aset ditemukan.
- **LULUS:** `node tools/check-direct-studio-text.mjs` — 56 layer Interactive; style literal, tanpa pelanggaran `studio-direct-v3`.
- **LULUS:** `node tools/check-layout-flow.mjs` — tidak ada kesalahan posisi flow (3 peringatan proyek lama, bukan add-on ini).
- **LULUS:** parser TypeScript seluruh source dan pengecekan relative imports (12 file, 0 error).
- **LULUS bersyarat:** type-check menggunakan deklarasi stub untuk React/Remotion (untuk mendeteksi kesalahan kode umum). **Ini bukan pengganti `tsc --noEmit` dengan paket Remotion sesungguhnya**.
- **BELUM DIUJI:** `npm run check` penuh dan render Remotion asli karena instalasi dependensi Master via `npm ci` tidak selesai di lingkungan pengujian.
