# PERBAIKAN — Objek Hilang di Remotion Studio v1.8.1

## Gejala yang diperbaiki
Pada Full Video sekitar 00:16 (Scene 02), headline **PAKAI EASY2BOOT** terlihat,
namun USB/objek lain kosong walau layer `S02 — B — busb` muncul di timeline.

## Akar masalah
`NativeSceneLayers.tsx` versi sebelumnya membuat 135 `<Interactive.Svg>`
terpisah dengan `viewBox` kecil menggunakan geometri awal objek. Ketika
animasi memberi translasi/skala, bagian objek bisa keluar dari viewport SVG
tersebut sehingga tidak terlihat di Studio.

## Solusi
- Satu `<svg viewBox="0 0 1080 1920">` per scene.
- Di dalamnya ada 135 `<Interactive.G>` **native Remotion** dengan nama layer
  yang sama seperti sebelumnya, bukan editor khusus.
- Definisi filter/gradient/style disimpan sekali di dalam scene.
- Transformasi/opasitas dari animasi lama tetap dipertahankan dalam grup.
- Tidak mengubah enam scene, manifest ID, slug, timing 80 detik, VO, SFX, atau
  proyek lain.

## Cara mengganti add-on
1. Tutup atau hentikan preview Remotion Studio terlebih dulu.
2. Backup folder `MotionGraphic-Studio\projects\easy2boot-multiboot-reels`
   **ke luar folder `projects`**. Jangan memberi nama baru pada project di
   dalam `projects`, karena Master mendeteksi slug yang berbeda sebagai error.
3. Ekstrak ZIP perbaikan ini. Copy folder
   `easy2boot-multiboot-reels` (bukan isinya saja) ke
   `MotionGraphic-Studio\projects\`.
4. Dari folder Master, jalankan `npm run sync` lalu `npm run dev`.
5. Buka Full Video `Easy2BootMultibootReels`, pindah ke **00:16**. Seharusnya
   headline **PAKAI EASY2BOOT** muncul bersama USB hitam/oranye.
6. Coba menu Scenes → Scene 02 dan pilih layer `S02 — B — busb`;
   objek tidak boleh kosong lagi. Lalu periksa Scene 01–06.

## Editabilitas
- Layer grup dapat dipilih, digeser, di-scale, dirotasi, dan diatur opacity
  menggunakan `Interactive.G` pada Remotion Studio.
- Judul utama dan konfigurasi scene tetap melalui Props seperti sebelumnya.
- Konten SVG internal (huruf kecil/tombol internal, titik path, animasi internal)
  **belum seluruhnya dapat diedit langsung satu per satu** lewat Studio.
- Tidak ada editor tambahan; ini adalah add-on folder-first v1.8.1 yang sama.

## Batas pengujian
- 24 sampel frame (4 per scene) diuji dengan merender SVG sumber
  dan SVG hasil pemisahan layer. Maksimum beda rata-rata per kanal = 0,084
  (skala 0–255); 23/24 sampel identik penuh.
- Sinkronisasi pada salinan Master: 5 video, 29 komposisi, 0 masalah rujukan aset.
- Master editability checker: 135 Interactive layers terdeteksi, status 0 error.
- Render **langsung menggunakan Remotion Studio di Windows milik pengguna**
  tidak dapat dijalankan di sini. Perlu uji pengguna pada 00:16.
- Full TypeScript check via `npm run check` belum dijalankan karena paket
  `node_modules` Remotion tidak tersedia di runtime ini.
