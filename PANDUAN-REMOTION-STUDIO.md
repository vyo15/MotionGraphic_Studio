# Panduan Praktis: Hanya Remotion Studio

## Buka video

Klik `01-BUKA-STUDIO.bat` → browser membuka `http://127.0.0.1:3000` → klik folder **Videos** → pilih video. Tidak ada URL, tab editor, maupun dashboard tambahan.

## Edit tanpa membuka VS Code

1. Pilih frame dengan menggeser playhead pada timeline.
2. Klik objek atau track pada kanvas/timeline. Untuk node `Interactive.*`, gunakan panel Properties yang muncul. **Tidak semua node React dapat digeser otomatis.**
3. Untuk opsi yang sudah dibuat sebagai Props, pilih panel **Props** komposisi, kemudian ubah nilai yang diinginkan. Video Windows Hacks memakai `sceneEditor` untuk sebagian teks, gaya, audio, dan `cursorEditor`; video IP Address memiliki pilihan warna latar, volume, dan audio.
4. Simpan perubahan dengan mekanisme Remotion Studio yang tersedia. Jalankan Play untuk memastikan animasi dan tampilan sesuai.
5. Klik **Render** pada Remotion Studio dan pilih format/lokasi output. Tidak perlu editor lain.

**Catatan:** Sebagian Windows UI memakai komponen CSS lama (computed), sehingga transform / teks tidak selalu ditangani native oleh Inspector. Jangan mengubah layer yang tidak mendukungnya lewat klaim drag/drop. Untuk membuatnya benar-benar draggable, komponen terkait harus dimigrasi ke `Interactive.*` dan gaya yang didukung.

## Aset dan suara

Simpan file sumber di `projects/<slug>/public/...` kemudian jalankan `npm run sync` (atau restart launcher). Untuk audio yang mendukung Props `audioTimeline`, masukkan `src` relatif ke `public/` (contoh `audio/narasi.wav`), `enabled=true`, lalu atur frame, trim, durasi, volume. Ini bukan editor waveform / upload audio khusus.

## Perbaikan masalah

- Video tidak muncul: cek apakah folder `projects/<slug>/motiongraphic-video.json` benar, lalu `npm run sync`.
- Port 3000 dipakai: hentikan server lama (`03-STOP-STUDIO.bat` jika proses dari launcher Master ini). Jangan membuka Master lain bersamaan pada port yang sama.
- Browser tidak terbuka: periksa `../MotionGraphic-Studio-Backups/Runtime/` dan jalankan `02-CEK-STUDIO.bat`.
- Jangan pernah mengubah mirror `public/videos/<slug>`; perubahan di situ ditimpa saat sync.
