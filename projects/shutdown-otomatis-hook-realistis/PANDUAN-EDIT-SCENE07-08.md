# PANDUAN EDITABLE — CTA V3 & COVER REELS V2

**Khusus MotionGraphic Studio Master 1.8.1.** Identitas video tetap `ShutdownOtomatisHookRealistis`, slug `shutdown-otomatis-hook-realistis`.

## PASANG MUDAH (FILE CHANGE ONLY)
1. Pastikan patch Scene 05 Swiss Motion #02 dan Scene 06 Swiss Motion #02 sudah diterapkan.
2. Backup `MotionGraphic-Studio/projects/shutdown-otomatis-hook-realistis/`, terutama jika pernah diedit sendiri.
3. Ekstrak ZIP ini. Di dalamnya langsung ada satu folder `shutdown-otomatis-hook-realistis/`.
4. **Copy folder tersebut** ke `MotionGraphic-Studio/projects/`, lalu *merge*. Jika Windows menanyakan Replace, pastikan file lokal yang pernah diedit sudah di-backup; jangan hapus folder proyek lama.
5. Jalankan `npm run dev` (atau `npm run sync` jika Studio sudah berjalan). Lihat segmen `S07CTA` dan `S08CoverReels`.

## YANG DITAMBAH
- `src/scenes/Scene07.tsx` = CTA Swiss Kinetic V3 dari preview sebelumnya (8 detik / 240 frame), dengan underline, UI komentar dan kursor; tanpa rekaman VO.
- `src/scenes/Scene08.tsx` = cover Minimal Editorial V2 (5 detik / 150 frame), judul ringkas dan laptop/timer yang bergerak. **Cover tidak memiliki VO**.
- `src/Video.tsx` dan `src/SegmentVideo.tsx` hanya menambah registrasi Scene 07 & Scene 08; `src/config/timing.ts`, `props.ts`, narration dan manifest menambah data dua scene. Source Scene 01–06 **tidak berubah**.

## EDIT VIA PROPS
Komposisi penuh `ShutdownOtomatisHookRealistis`, atau klik segmen individual `S07CTA` / `S08CoverReels`.

**Scene 07:** `scene07PrimaryText`, `scene07SecondaryText`, `scene07CommentText`; geser dan skala via `scene07MainShiftX/Y`, `scene07MainScale`, `scene07CardShiftX/Y`, `scene07CursorShiftX/Y`, `scene07UnderlineWidth`.

**Scene 08:** `scene08TitleTop`, `scene08TitleBottom`, `scene08Subtitle`; geser/skala via `scene08MainShiftX/Y`, `scene08MainScale`, `scene08PanelShiftX/Y`.

Props global: `backgroundColor`, `navyColor`, `coralColor`, `inkColor`, `showBackgroundGrid`; subtitle Scene07 tetap memakai `showCaptions`, `subtitleColor`, `subtitleFontSize`, `subtitleBaselineY` dan `subtitleShiftX/Y`.

Elemen ini adalah **layer native React/SVG** dengan nama `Interactive.G`/`Interactive.Text`, tidak berupa PNG/MP4 flatten. Label tekstual dinamis melalui Props; jangan diasumsikan otomatis dapat diedit dengan double-click dalam GUI. Gerakan kamera/kursor memakai frame Remotion deterministik.

## COVER PROFIL REELS
Resolusi penuh 1080×1920, 30fps. Area sentral aman untuk crop grid **3:4** adalah X 0–1080, Y 240–1680; untuk 1:1 Y 420–1500. Judul dan ilustrasi pada versi default ditempatkan sekitar Y 640–1325. Gunakan frame akhir segmen cover sebagai thumbnail Reels. Jika posisi/ukuran digeser terlalu jauh lewat Props, periksa crop lagi.

## VO GUIDE
VO Scene07 terkunci: “Kalau kamu punya cara lain yang lebih praktis, coba share di kolom komentar!”
Scene08: tanpa VO (beat kosong untuk menutup semua frame menurut kontrak sync Master). Subtitle tanpa blok hitam; rekaman VO final belum tersedia.

## HASIL QA DAN BATASAN
- Validasi add-on strict, sync, daftar segmen dan syntax source dijalankan pada **salinan Master**, bukan pada PC pengguna.
- Pratinjau sumber Scene07 dan Scene08 diuji pada beberapa frame lewat perender SVG diagnostik, bukan render Remotion asli.
- **BELUM diuji:** drag, Save/reload, keyframe GUI, dan render MP4 asli di Windows Studio. Status: source/Props-editable, GUI editable belum terverifikasi.
