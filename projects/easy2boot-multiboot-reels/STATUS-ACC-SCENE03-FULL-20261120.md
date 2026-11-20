# Scene 03 — ACC / LOCKED

**Disetujui pengguna:** 20 November 2026.  
**Project:** `Easy2BootMultibootReels` — folder `easy2boot-multiboot-reels`.  
**Sumber:** `MotionGraphic-Studio-Master-v1.8.1-20261120-023455.zip`.

## Keputusan yang dikunci

- Scene 01 tetap ACC: Impact Stamp — **source tidak diubah**.
- Scene 02 tetap ACC: Card Break, 3 ISO masuk USB — **source tidak diubah**.
- Pengantar 02→03 tetap ACC: Opsi 01 Match Move — **source tidak diubah**.
- **Seluruh Scene 03 sekarang ACC** (sebelumnya baru bagian masuk): backup data → status data aman → buka Easy2Boot / Make_E2B → pilih USB yang benar → buat USB multiboot → hasil USB siap.
- Scene 04: **masih review**; video konsep Folder Stack + ISO serentak belum diterapkan ke source utama.
- Scene 05–06: **belum ACC**.

## Kontrak teknis Scene 03

- Komposisi utama: ID `Easy2BootMultibootReels`, slug `easy2boot-multiboot-reels`, 1080×1920, 30 FPS.
- Scene 03: dari frame global **879**, durasi **472 frame** (15,73 detik).
- Masuk Scene 03 mengandung pengantar terpisah 32 frame, animasi backup 70 frame, dan tahan 25 frame; tidak mengubah implementasi sebelumnya.
- File SVG, data frame, dan scene React berasal dari proyek terbaru dan **tidak dimodifikasi** oleh ACC.
- Status penguncian diterbitkan dalam `APPROVAL-LOCK-20261120.json`, disertai checksum.

## Editabilitas

Scene 03 dapat diedit melalui teks Props (`titleBackup`, `titleOpen`, `titleSelect`, `titleCreate`, `titleDone`), `usbDriveLabel`, parameter entrance Scene 03, serta `layerOverrides` untuk elemen SVG yang diberi ID `S03:<id>`. Objek visual merupakan SVG/layer, bukan MP4 yang di-flatten. Namun tidak semua bagian UI otomatis draggable sebagai elemen React tersendiri; dukungan dan persistensi editor visual Windows **belum diuji**.

## Preview

`Preview-Scene03-ACC-30FPS.mp4` (dikirim terpisah): 540×960, 30 FPS, ~15,73 detik, SFX yang dipetakan dari proyek. Direkonstruksi dari source SVG dan data animasi yang sama, **bukan render native Remotion**. VO final belum tersedia sehingga sinkronisasi terhadap suara narator belum terverifikasi.

## Pemasangan

1. Cadangkan `MotionGraphic-Studio/projects/easy2boot-multiboot-reels` bila sudah ada.
2. Ekstrak ZIP add-on lengkap; salin folder `easy2boot-multiboot-reels` **utuh** ke `projects/` Master (jangan menyalin `src`/`public` ke root).
3. Jalankan `npm run sync`, kemudian `npm run dev` dari root Master.
4. Jangan mengedit manual `src/Root.tsx`, `src/index.ts`, `package.json`, atau `library/catalog.json`.

**Patch status ACC** hanya untuk Master `20261120-023455` yang sudah punya source identik. Patch tidak berisi ulang animasi; ZIP lengkap berisi sumber editable.
