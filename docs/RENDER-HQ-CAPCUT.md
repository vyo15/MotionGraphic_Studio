# RENDER HQ UNTUK CAPCUT — MotionGraphic Studio v1.8.1

## Tujuan

Master **Remotion tetap satu**. Gunakan **`npm run menu` → `6. Render MP4` → pilih video → pilih mode → `1. CapCut HQ`**. Impor MP4 ke CapCut **secara manual**, bukan koneksi otomatis. Source setiap scene/ACC tidak berubah.

Profil `CapCut HQ` adalah profil **bahan mentah berkualitas tinggi**, bukan file Reels final. VO rekaman dan subtitle final dikerjakan di CapCut, sedangkan animasi, transisi dan SFX tetap dari Remotion. Cover Reels adalah scene video paling akhir; tidak wajib membuat PNG.

## Pilihan render

| Pilihan menu | Kegunaan | Encoding | Perubahan Props |
| --- | --- | --- | --- |
| 1. CapCut HQ (default) | Bahan untuk CapCut, resolusi/FPS mengikuti komposisi | H.264 CRF 16, preset slow, frame PNG, yuv420p, BT.709, AAC 256k/48kHz | Salinan **sementara**, mengaktifkan `showSfx` jika tersedia, menonaktifkan VO/musik/subtitle guide yang dikenali |
| 2. Kualitas Tinggi (Props asli) | Menghasilkan persis tampilan dan audio default video, dengan kualitas HQ | Sama seperti HQ | Tidak ada |
| 3. Preview Cepat | Pengecekan sebelum render berat | H.264 CRF 23, preset veryfast, frame JPEG, yuv420p, BT.709, AAC 128k/48kHz | Tidak ada |

**Catatan:** CRF 16 bukan bitrate tetap. Size MP4 akan bervariasi sesuai kompleksitas. `slow` bisa memerlukan render jauh lebih lama, ini normal. Semua profil menggunakan satu Remotion CLI v4.0.538, software encoding tanpa renderer kedua dan tanpa dependensi baru.

**Keamanan Props:** mode CapCut tidak menyimpan Props ke manifest, katalog, Root, atau source. Salinan sementara dihapus setelah render, termasuk saat gagal/batal. Subtitle yang dirender langsung tanpa kontrol Props **tidak dapat dihilangkan otomatis**. Jika ada teks narasi yang tetap terlihat, periksa preview dan ubah project terkait melalui revisi ACC sebelum final; jangan klaim sudah bersih tanpa memeriksa MP4. Profil tidak melakukan audio remix otomatis dan tidak menjamin keras-lembut SFX terhadap VO rekaman yang belum masuk.

## Cara penggunaan

1. Jalankan `npm run menu` di folder Master.
2. Pilih **6. Render MP4**, lalu pilih videonya dan mode **Full Video** (atau satu scene/pilihan jika diperlukan).
3. Pada **PILIH KUALITAS VIDEO**, tekan **Enter** untuk `1. CapCut HQ`.
4. MP4 tersimpan di folder `MotionGraphic-Studio-Backups/MP4/<slug>/full/` di luar Master. Log ada di `MotionGraphic-Studio-Backups/Logs/Render/`.
5. Putar MP4 dan pastikan gambar, SFX, transisi, crop serta frame cover terakhir benar. Untuk QA lengkap gunakan `npm run qa:render -- "PATH_KE_MP4" --src projects/<slug>`; **hasil QA tidak menggantikan menonton video**.
6. Import MP4 manual ke CapCut. Tambahkan VO asli, pangkas **hold aman** saja, lalu buat/sinkronkan subtitle final. Jangan memotong frame aksi, SFX atau transisi untuk mengejar durasi.
7. CapCut export 1080×1920, 30 FPS (jangan mengubah FPS dari sumber), H.264 MP4, SDR Rec.709, bitrate tinggi sekitar 12–20 Mbps, AAC 48kHz bila tersedia. Pilih frame pada scene cover terakhir saat mengunggah Reels. Tonton MP4 final di HP, periksa font kecil, subtitle, audio dan clipping.

### Perintah opsional

```bash
npm run render -- Easy2BootMultibootReels --profile capcut
npm run render -- Easy2BootMultibootReels --profile high
npm run render -- Easy2BootMultibootReels --profile preview --dry-run
```

CLI lama `npm run render -- IDVideo` tetap bekerja sebagai **high quality dengan Props asli** demi kompatibilitas. Jika komputer lambat, turunkan `MG_RENDER_CONCURRENCY=1` atau gunakan Preview Cepat dahulu; jangan mengganti CRF tanpa evaluasi visual.

## QA yang wajib dibedakan

- **Teruji di source/test:** pembuatan argumen Remotion, pengelolaan Props sementara, pemilihan mode, pembersihan temp, dan pemeriksaan header output.
- **Harus diuji pada Windows setelah patch:** Remotion/Chrome benar-benar menghasilkan MP4 H.264, sound tetap ada, BT.709 ditandai benar, video tidak patah, dan CapCut mengimpor tanpa masalah.
- **Harus diperiksa setelah CapCut:** durasi, keseimbangan VO-SFX, subtitle final, clipping/true peak, codec/bitrate dan kualitas unggahan. SFX tetap diproduksi di Remotion; jika mix terlalu keras, perbaiki mix proyek lalu render ulang sesuai kebutuhan.

## Catatan kontrak Master

File yang diubah untuk kualitas render hanya `tools/render-menu.mjs`, `tools/studio-menu.mjs`, modul profil yang baru, tes terkait, dan dokumentasi. Jangan edit manual `src/Root.tsx`, `library/catalog.json`, video ACC, atau memindahkan output render ke dalam source Master.
