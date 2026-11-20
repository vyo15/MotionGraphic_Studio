# Easy2Boot — 1 Flashdisk Banyak Installer (Editable Source)

**Project ID tetap:** `Easy2BootMultibootReels`  
**Slug tetap:** `easy2boot-multiboot-reels`  
**Format:** 1080×1920, 30 FPS, 2641 frame (88,03 detik), enam scene + pengantar.

## Revisi clean / source 20 November 2026

Add-on ini berasal dari ZIP **MotionGraphic-Studio-Master-v1.8.1-20261120-075345(1).zip** milik pengguna. Hanya folder project Easy2Boot yang dikemas; tidak berisi dan tidak mengubah Master ataupun project video lain.

- **S01 dan S02 serta bridge 02→03:** seluruh berkas source aslinya dipertahankan. Status ACC sebelumnya tetap berlaku.
- **S03:** UI Make_E2B satu jendela (pilih USB lalu klik), metadata header/footer dan judul berulang disembunyikan saat render. Subtitle VO berupa **teks langsung tanpa kotak** di layer independen. Pengeditan ini atas permintaan terbaru, sehingga perlu review visual pada PC sebelum status ACC baru.
- **S04:** Scene berisi empat ISO (Windows 8, 10, 11, Linux) disalin **serentak secara simulasi** ke empat folder tujuan. Empat kartu ISO, folder, nama file, nama OS, jalur, animasi salin, centang dan USB hero berupa layer SVG/React terpisah. Tidak ada header/footer/nomor scene atau headline dekoratif. Subtitle VO teks langsung di bawah.
- **S05/S06:** tidak diubah, belum ACC.

## Cara memasang (satu Master saja)

1. Cadangkan folder `MotionGraphic-Studio/projects/easy2boot-multiboot-reels` yang sudah ada agar revisi lama aman.
2. Ekstrak ZIP hingga terlihat **folder `easy2boot-multiboot-reels`** (bukan hanya isi foldernya).
3. Salin folder tersebut ke `MotionGraphic-Studio/projects/`, gabungkan/replace **hanya folder video ini**.
4. Dari folder Master Studio (berisi `package.json`), jalankan `npm run sync` lalu `npm run dev`.
5. Buka komposisi `Easy2BootMultibootReels` atau segmen S03/S04 yang diregistrasi otomatis Master.
6. Jalankan `npm run check`, review di Studio, kemudian `npm run render` untuk MP4 final.

Jangan menyalin `src/` atau `public/` add-on ke root Master, dan jangan mengedit `src/Root.tsx`, `package.json`, atau katalog Master secara manual.

## Struktur penting

- `motiongraphic-video.json` — manifest/Props default (ID dan slug lama).
- `src/Video.tsx` dan `src/SegmentVideo.tsx` — komposisi penuh dan per segmen, tidak berubah.
- `src/scenes/Scene03Preparation.tsx` + `Scene03ReadableEntrance.tsx` — UI S03 dari SVG sumber, hanya dirapikan.
- `src/scenes/Scene04CopyIso.tsx` — scene ISO serentak, SVG/React yang bisa diedit.
- `src/components/EditableSvgLayer.tsx` — transform posisi pengguna terpisah dari animasi.
- `src/components/SceneTextVO.tsx` — subtitle teks biasa, bukan gambar.
- `src/config/scene04Clean.ts` — daftar posisi/palet/timing dan empat key OS.
- `src/config/sceneTextVO.ts` — timing draft subtitle S03–S04.
- `src/config/props.ts` + `defaultProps` manifest — pilihan teks, posisi/warna override dan layer.
- `public/audio/` — SFX asli master dipertahankan; VO rekaman final belum tersedia.

Lihat `PANDUAN-EDIT-ASSET.md`, `REVISION-STATUS-CLEAN.md`, dan `QA-REVISION-CLEAN.md` untuk daftar layer, kontrol dan hasil validasi.

## Batasan yang penting

Empat ISO bergerak sekaligus merupakan **penyingkatan visual** empat penyalinan, bukan fungsi File Explorer yang dapat mengelompokkan berbagai ISO otomatis dengan satu klik. Tujuan folder masih perlu disesuaikan dengan konfigurasi Easy2Boot aktual pada komputer pengguna.

Preview MP4 lokal dibuat melalui pengujian JSX/SVG dengan renderer uji, **bukan** hasil render native Remotion Studio. Kemampuan menyimpan perubahan setelah drag-and-drop di editor PC belum diuji. Source dan konfigurasi sudah disertakan untuk dilakukan pengujian tersebut pada master terpasang.
