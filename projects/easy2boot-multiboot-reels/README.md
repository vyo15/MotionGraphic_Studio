# Easy2Boot — 1 Flashdisk Banyak Installer (MotionGraphic Studio v1.8.1)

**ID:** `Easy2BootMultibootReels` · **slug:** `easy2boot-multiboot-reels` · **1080×1920 · 30 FPS · 2467 frame (82,23 dtk)**.

## Status produksi

**Scene 01–06 dan pengantar 02→03 = ACC/LOCKED visual** (21 November 2026). Pertahankan hook Impact Stamp, Card Break, USB Match Move, persiapan Make_E2B, copy ISO serentak, laptop Boot Menu/agFM dan CTA Mix. **Satu-satunya source visual baru di revisi ini adalah Scene 06.** Rekaman VO final belum ada; VO Guide tetap draft.

Lihat `STORYBOARD.md`, `production/ALL-SCENES-ACC-20261121.json`, `production/SCENE06-ACC-20261121.md`.

## Instal di satu Master

1. Backup `MotionGraphic-Studio/projects/easy2boot-multiboot-reels/` yang ada.
2. Salin folder `easy2boot-multiboot-reels/` lengkap dari ZIP ke `MotionGraphic-Studio/projects/` (jangan salin `src` atau `public` ke root).
3. Jalankan `npm run sync`, lalu `npm run dev` dari folder Master.
4. Buka `Easy2BootMultibootReels` atau komposisi Scene 06.
5. Setelah merekam VO sendiri, sinkronkan audio/subtitle, baru QA dan render final.

Jangan mengedit manual Master `src/Root.tsx`, `src/index.ts`, `package.json`, `library/catalog.json`, atau mirror `public/videos/`.

## Editabilitas

Scene06 disusun ulang sebagai layer React/SVG dan native `Interactive` bernama, **bukan screenshot/MP4**: dua USB (konektor, badan, label terpisah), lima tile OS (latar, logo, teks), headline, komentar, subtitle teks, cover. `scene06ShowTextVO` mematikan/menyalakan VO guide; `scene06Question`, `scene06Prompt`, `coverBrand`, `coverLine1`, `coverLine2` dapat diubah di Props. `layerOverrides` mendukung offset/scale/opacity/teks pada layer tertentu.

Lihat `PANDUAN-EDIT-ASSET.md` untuk contoh. **Source editable tidak sama dengan GUI Save/reload teruji**; pengujian interaksi di Studio Windows dan render native belum dilakukan di lingkungan ini. Pengecekan source dan render pengujian SVG bukan bukti 100% drag-editable.

## QA

Manifest, import, lint aset literal, sintaks sumber dan kebersihan ZIP diperiksa. Preview CTA yang disetujui ada sebagai video review terpisah, tidak dibundel ke source editable. Pengujian source offline dilakukan untuk beberapa frame Scene06; belum dijalankan render native Remotion.
