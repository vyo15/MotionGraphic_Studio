> **ARSIP HISTORIS:** Instruksi editor 4077/4081 dalam dokumen lama ini sudah tidak berlaku. Versi v1.8.1 menggunakan Remotion Studio (`http://127.0.0.1:3000`) saja. Ikuti README proyek untuk langkah terkini.

# WINDOWS HACKS — EDITOR KURSOR VISUAL V5

Ini adalah **editor khusus gerakan kursor dan efek klik**, bukan pengganti semua fitur CapCut. Proyek tetap satu folder (`windows-hacks-5-shortcut-lengkap`), dengan ID tetap `WindowsHacks5ShortcutLengkap` dan komposisi lama tidak dihapus.

## Cara menggunakan di PC Windows

1. Cadangkan folder project `MotionGraphic-Studio/projects/windows-hacks-5-shortcut-lengkap`.
2. Ekstrak paket ZIP ini. Salin **folder add-on utuh** ke `MotionGraphic-Studio/projects/` menggantikan hanya folder project yang sama; jangan salin isi `src` atau `public` ke root Master.
3. Jalankan `npm run sync` dari folder Master (atau `npm run dev` jika Studio belum dibuka).
4. Klik dua kali `projects/windows-hacks-5-shortcut-lengkap/BUKA-EDITOR-KURSOR.bat`. Alternatif: dari terminal Master jalankan:
   ```bash
   node projects/windows-hacks-5-shortcut-lengkap/tools/visual-cursor-editor.mjs
   ```
5. Buka `http://127.0.0.1:4081`. Pilih shortcut. Klik `Render frame asli` untuk mendapat screenshot komposisi yang benar-benar di-render Remotion dari source project.
6. Centang **Gunakan posisi kursor yang diedit**. Drag lingkaran **A** (awal) dan **B** (akhir). Atur awal/akhir frame, frame klik, ukuran, warna efek. Titik A/B dinyatakan dalam koordinat 1080×1920.
7. Klik **Simpan permanen**. Editor menyimpan nilai ke `motiongraphic-video.json`, membuat cadangan sebelum perubahan, dan menjalankan sinkronisasi Master. Refresh Studio setelah menyimpan. Klik **Render frame asli** lagi untuk melihat frame terbaru.
8. Jika salah, gunakan **Undo** di editor. Backup disimpan dalam `library/backups/visual-cursor-windows-hacks.json` dalam Master.

## Mengapa ada kursor pengganti?

Pada versi V4, beberapa efek klik menggunakan koordinat terpisah dari pointer. Di V5, pada adegan **Ctrl+Shift+T**, ring klik sudah menjadi anak dari kursor sehingga bergeser bersama. Pada **Ctrl+Shift+Esc**, kursor dalam panel zoom mendapat layer `02 · Kursor Zoom Detail (klik End Task)` sendiri yang dapat diedit lewat Easy Editor.

Untuk perbaikan klik yang butuh koordinat frame penuh, kursor pengganti V5 menggunakan props `cursorEditor` dan menyembunyikan kursor asli hanya selama interval aktif. Ini tidak mengubah source adegan lain dan bisa dimatikan per shortcut.

## Fitur yang benar-benar tersedia

- Drag posisi A/B dari lintasan kursor pada overlay editor, disertai input angka X/Y.
- Frame awal, frame akhir, frame klik, ukuran kursor dan warna ring bisa diubah.
- Pengubahan menyimpan file manifest **permanen**, bukan sementara dalam browser.
- `Undo` mengembalikan manifest dari backup.
- Penanda klik selalu berada di lokasi kursor pengganti; tidak ada koordinat ring yang terpisah.
- Screenshot frame menggunakan perintah Remotion yang sama dengan project, bukan gambar mockup. Renderer ini bergantung pada instalasi Remotion di Master dan bisa gagal jika browser Chromium/renderer bermasalah.
- Lima shortcut, hook, CTA, dan tujuh slot audio narasi tetap ada di project yang sama.

## Batasan penting

- Ini **belum** editor selengkap CapCut: tidak ada video multitrack dengan drag untuk pemotongan bebas, editing kurva motion interaktif semua elemen, dan waveform audio.
- Yang bisa di-drag di editor V5 adalah **titik lintasan kursor pengganti**. Layer lain masih menggunakan Remotion Studio/Easy Editor. Beberapa style yang tersusun dari transform CSS mungkin tidak mendukung drag langsung.
- `Render frame asli` bekerja setelah Remotion CLI terpasang di folder Master dan proses sync berhasil. Tidak boleh menganggap ini sama dengan video playback realtime.
- Edit `cursorEditor` mengubah kursor **pengganti** pada scene yang dipilih; tombol, isi dokumen, posisi jendela dan aset visual tidak otomatis mengikuti kursor.
- Voice-over tetap berupa placeholder WAV sampai pengguna mengganti rekaman.

## Uji yang sudah dilakukan pada salinan Master v1.7.0

- JSON manifest dan slug/ID tetap sama; 2 project aktif tetap terdeteksi.
- Pemeriksaan parse 41 file TS/TSX: lolos.
- `tools/sync-projects.mjs` + `tools/validate-library.mjs`: 0 masalah.
- API simpan → file manifest berubah → sync → undo → data kembali: lolos.
- Uji tampilan drag visual berbasis Chromium pada lingkungan ChatGPT **belum berhasil** karena akses browser ke alamat localhost diblokir. Fitur render still/MP4 final di Windows pengguna juga **belum diverifikasi**. Jangan anggap semua fungsi diuji menyeluruh.

**Workflow:** Edit posisi di visual cursor editor → Simpan → refresh Remotion Studio → preview dan render memakai config yang sama. 
