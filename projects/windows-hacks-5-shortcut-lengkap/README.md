# Edisi Inline Editable — sesuai pola IP Address

**Perubahan pada revisi ini:** 135 node `Interactive` mengandung `translate/scale/rotate` secara inline; 54 properti layout statis dipindah ke JSX; 40 target UI kecil dipromosikan menjadi elemen `Interactive`. 175 slider warisan yang tidak lagi terhubung dihapus dari manifest agar tidak ada kontrol palsu; 22 kontrol legacy masih dipakai untuk elemen non-Interactive. Source, animasi, script, dan durasi 73,5 detik dipertahankan.

**Cara edit termudah:** buka komposisi `WindowsHacks5ShortcutLengkap` di Remotion Studio, pilih elemen langsung pada preview/timeline, edit Offset / Scale / Rotation, klik keyframe bila didukung, simpan. Untuk teks dinamis/VO gunakan Easy Editor dari Master. Jangan edit parameter legacy dengan nama sama karena layer tersebut sudah diganti kontrol Studio.

**Batas:** animasi per-frame, beberapa font atau warna dari CSS, dan teks yang dihasilkan fungsi masih tampil `computed`. Jangan mengasumsikan semua node bisa drag. Belum diverifikasi render langsung pada Windows.

---

# WINDOWS HACKS — 5 SHORTCUT WINDOWS | DETAIL EDITABLE V4

**Komposisi:** `WindowsHacks5ShortcutLengkap`  
**Folder:** `windows-hacks-5-shortcut-lengkap`  
**Format:** 1080×1920, 30 FPS, 2205 frame (73,5 detik).

## Yang berubah di V4

- Error saat menjalankan Studio diperbaiki: `Interactive` hanya diimpor dari `remotion`; bukan dari `./Icons`.
- Error File Explorer diperbaiki: `useCopy()` sekarang diinisialisasi sebelum dipakai.
- Nama setiap layer dalam `Props → sceneEditor → pilih scene → layers` dibuat mudah dibaca, bernomor sesuai urutan video.
- `scaleX` dan `scaleY` mengubah ukuran horizontal/vertikal secara terpisah. `hueShift` menggeser nuansa warna layer secara deterministik.
- Garis **loading/progress bawah di semua demo** sekarang punya kontrol terpisah: *Jalur*, *Isi Bergerak*, serta identitas/footer seri yang bisa diubah.
- Ada pengaturan `transitionEditor` untuk enabled, fadeFrames, opacity, color.
- Text layer menggunakan kunci berbahasa Indonesia di `Props → sceneEditor → [scene] → copy`.
- Tiap shortcut tetap berisi **5 beat + 1 jeda hasil** untuk memudahkan cut serta VO; animasi utama 1×.
- Tidak ada video lain di Master yang diubah dan tidak ada file root Master yang disentuh.

## Cara memasang

1. Backup dulu folder `MotionGraphic-Studio/projects/windows-hacks-5-shortcut-lengkap` jika sudah ada.
2. Ekstrak ZIP add-on dan salin **folder `windows-hacks-5-shortcut-lengkap` utuh** ke `MotionGraphic-Studio/projects/`.
3. Jalankan `npm run sync` (atau `npm run dev` jika Studio belum berjalan).
4. Buka komposisi `WindowsHacks5ShortcutLengkap`.
5. Buka `Props → sceneEditor` lalu pilih bagian yang ingin diedit.

## Cara mengubah satu elemen

Contoh: `03 · Snipping · Area Seleksi` di bawah `WIN_SHIFT_S → layers`. Ubah `x`, `y`, `scale`, `scaleX`, `scaleY`, `rotation`, `opacity`, `enabled`, `startFrame`, `endFrame`, `animation`, `delayFrames`, atau `animationFrames`. Hindari mengubah kolom `id` karena menjadi penghubung ke elemen sebenarnya. Untuk teks, ubah di `copy` pada bagian scene yang sama.

**Catatan penting:** Ini editor berbasis Props dan source Remotion. Beberapa elemen bisa dipilih melalui `Interactive.Div` di Studio, tetapi **drag-and-drop langsung seluruh subelemen belum terverifikasi**. Warna dasar UI Windows dan ukuran detail kontrol yang tersusun dalam CSS masih dapat diedit melalui file CSS/TSX. Jangan menganggap setiap path SVG/ikon kecil sudah mendukung drag langsung.

## Voice-over

File `public/audio/00-hook.wav` sampai `06-cta.wav` berupa placeholder WAV dan dapat diganti rekaman aslimu. Set `voice.enabled=true` bila sudah siap. Atur volume efek pada `sceneEditor → [scene] → sfxVolume`.

Tata cara editing berdasarkan subelemen lihat `EDIT-MAP-V4.md`, jadwal naskah dan cut lihat `VOICEOVER-CUES.md`.


## Pembaruan V5: edit kursor secara visual

Baca `PANDUAN-EDITOR-KURSOR-V5.md` dan `CATATAN-REVISI-V5.md`. Jalankan `BUKA-EDITOR-KURSOR.bat` setelah menyalin folder add-on ke Master. Editor ini khusus kursor/klik, **bukan NLE setara CapCut**. ID dan slug project tetap sama.
