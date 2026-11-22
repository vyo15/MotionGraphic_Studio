# Easy2Boot FULL Editable — untuk MotionGraphic Studio Master v1.8.1 (21 Nov 2026)

## Ringkasan

**Yang diimpor hanya folder `easy2boot-multiboot-reels/`.** ZIP Master `MotionGraphic-Studio-FULL-v1.8.1-20261121-044452.zip` yang kamu unggah adalah **engine-only**: direktori `projects/` dan `library/catalog.json` kosong. Paket ini mengisi satu project Easy2Boot, bukan menggantikan Master atau project lainnya.

- ID: `Easy2BootMultibootReels`
- Slug: `easy2boot-multiboot-reels`
- Durasi: **2701 frame @ 30 FPS (90,03 detik)**; 1080 × 1920.
- Enam scene dan bridge S02→S03. Full video + enam segmen (dan VO Guide dari `src/config/narration.json`).
- Basis sumber: add-on editable per elemen yang membentuk preview FULL terakhir; tidak ada penggantian scene/gerak/teks/VO dari source basis.
- Di dalam ZIP: seluruh JSX/TSX, animasi, konfigurasi, manifest, SFX, dokumen status dan peta layer; **bukan MP4 flatten**.

## Cara pakai (Master engine-only)

1. Ekstrak ZIP ini. **Salin satu folder `easy2boot-multiboot-reels/` utuh** ke `MotionGraphic-Studio/projects/`.
2. Jalankan `npm run dev` (akan menyiapkan studio/sync), atau `npm run sync` setelah dependency Master terpasang.
3. Cari komposisi `Easy2BootMultibootReels`, atau pilih segmen S01–S06 pada Studio.
4. Untuk mengubah teks/folder/ISO/warna/posisi, buka panel Props > `layerOverrides` atau properti bernama `scene04IsoFiles`, `scene04FolderPaths`, `scene04SubtitleLines`, `scene05SubtitleLines`, `bootOption`, `isoBootName`.
5. Untuk daftar ID lengkap, lihat `PANDUAN-LAYER-PER-ELEMEN.md` dan `EDITABLE-LAYER-MAP.md`.
6. Simpan, tutup/reload Studio, cek perubahan, lalu render dari Master. Hasil drag/Save-to-code tergantung dukungan Native Studio; **belum diuji di lingkungan Windows**.

> Master terbaru berisi fitur no-code langsung, tetapi proyek ini berbasis kontrak `studio-inline-v2` (legacy). Ada ratusan named `Interactive` dan layer source, namun tidak semua kontrol dapat dijamin double-click editable, draggable, atau persist lewat Save-to-code sampai diuji. Jangan mengubah label kontrak menjadi `studio-direct-v4` tanpa memigrasikan seluruh source.

## Status scene dan approval

- S01 Impact Stamp: **ACC** — source lama dipertahankan.
- S02 Card Break dan bridge Match Move: **ACC** — source lama dipertahankan.
- S03: versi clean/efisiensi UI setelah revisi sebelumnya, **perlu review ulang** sebelum lock baru.
- S04: batch salin ISO serentak Folder Stack — **review**, belum ACC eksplisit.
- S05: laptop model Scene01 dengan agFM/Boot Menu/Setup — **dipilih untuk editable**, belum ACC final.
- S06: CTA, masih **belum ACC**.

## Audio dan subtitle

- SFX dari proyek dipertahankan di `public/audio/` dan digunakan melalui `staticFile('videos/easy2boot-multiboot-reels/...')`.
- VO user belum ada di ZIP. `src/config/narration.json` adalah sumber VO **draft** untuk VO Guide.
- Subtitle visual untuk S03–S05 bisa diaktifkan/dimatikan melalui Props. Edit teks sejalan naskah final setelah rekaman.

## QA yang sudah dan belum dilakukan

- Master engine-only diaudit; `npm run sync` berhasil mendaftarkan proyek.
- `npm test` Master: **66 pass, 14 skip, 0 gagal** (total 80).
- `npm run check:syntax`: **62 berkas sumber, 0 kesalahan sintaks** dalam Master uji.
- Validator statis add-on: 0 error, **5 peringatan** untuk jalur aset dinamis (SFX via array, filename VO dan musik, penggantian gambar) yang tidak dapat dibuktikan validator otomatis; bukan klaim kesalahan file aset.
- Master check no-code mengidentifikasi 247 penggunaan Interactive tetapi 0 teks literal langsung/241 fragmen dinamis: dukungan visual editing sebagian **belum terverifikasi**.
- Render Remotion native dan interaksi GUI Windows tidak dilakukan (dependensi Remotion belum terpasang pada lingkungan uji).

Detail lebih lengkap di `QA-MASTER-1.8.1.md`.


> Pembaruan ACC Scene04 (21 November 2026): timeline total **2461 frame / 30 FPS** (Scene04: **240 frame / 8 detik**), berkas `production/SCENE04-ACC-20261121.md` dan `README-SCENE04-ACC.md` adalah rujukan lebih baru daripada angka atau status Scene04 di atas. Scene05–06 masih review.
