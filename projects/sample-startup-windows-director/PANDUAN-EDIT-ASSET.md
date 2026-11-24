# PANDUAN EDIT — SOURCE ADD-ON

1. `src/scenes/Scene01.tsx`: teks hook/reaksi/solusi/intro, posisi, warna, timing `hold()`, animasi `ramp()`, serta dua cue SFX.
2. `src/components/WorkWindows.tsx`: **kartu mini Excel dan Chrome**, jendela Windows asli-bergaya simulasi, tiga shortcut (Excel/Chrome/ERP), isi Excel 4 aktivitas, Gmail 3 pesan, ERP 3 KPI. Setiap window adalah named `Interactive.Div`; beberapa teks penting juga bernama terpisah.
3. `src/scenes/Scene02.tsx` s.d. `Scene06.tsx`: tutorial, hasil, CTA, cover (belum dibangun ulang dalam revisi ini).
4. `src/config/narration.json`: VO GUIDE per beat dan timing absolut; hook & CTA ACC tidak boleh diganti diam-diam.
5. `motiongraphic-video.json` dan `src/Video.tsx`: duration scene dan offset 6 scene. Setelah ubah total durasi, sinkronkan keduanya.
6. `production/editable-blueprint.json`: daftar callsite nama native; verifikasi dengan `npm run qa:native`.
7. `public/audio/sfx/*.wav`, `production/sound-cues.json`: WAV original, cue absolute scene. Jika offset berubah, sesuaikan cue dan `Sequence` audio.

**Editing di Studio:** klik node `Interactive` yang tampil untuk mencoba properti visual; teks tertentu juga bisa diedit sesuai dukungan API dan struktur callsite. Detail sel spreadsheet berbasis `Cell` komponen bersifat **source-editable**, walaupun wrapper aktivitas bernama. Font default Arial/Helvetica agar tidak bergantung instalasi font lain. Jangan anggap target statis berarti semua drag dan Save sudah lulus: harus uji klik → Save → reload → render sendiri.

**Akurasi:** UI Excel/Chrome/Gmail/ERP pada scene adalah simulasi untuk demonstrasi, bukan screenshot asli atau data sungguhan. Hanya shortcut yang disalin ke folder Startup. Auto-open aplikasi dipicu login Windows, bukan klik kursor atau menyalin file asli ke Startup.

## PATCH Scene 01 — Clean Motion v3 (detik 17–26)

Layer native baru/terkait pada `src/scenes/Scene01.tsx`:

- `S01 Teks — Kayaknya praktis banget`: kata praktis dengan aksen coral, teks centered.
- `S01 Teks — Emang bisa`: tanda tanya **bagian teks**, tanpa ikon/tanda tanya di atas.
- `S01 Teks — Jawabannya bisa`: dua baris jawaban yang memberi ruang saat pertanyaan bergeser.
- `S01 Visual — Aksen coral menyambung ke tutorial`: satu layer shape yang berubah ukuran/posisi dari kapsul menjadi garis tipis.
- `S01 Teks — Masuk ke cara`: layout title terpusat yang sudah ACC.
- `S01 Teks — Masuk ke langkah pertama`: keterangan kecil di bawah judul.

**Edit:** di Studio pilih target bernama untuk mencoba warna/posisi/ukuran. Perubahan teks atau timing nonlinear yang tidak disediakan kontrol GUI masih bisa dilakukan di source. `left/top/opacity/scale` bergerak mengikuti local frame (fungsi `ramp()`), sehingga mengganti posisi sebaiknya diuji di beberapa frame dan di-render ulang. Tidak ada ikon folder atau chip aplikasi pada rentang 17–26 detik.

Scene 01 **tetap 855 frame** (28,5 detik, 30 FPS); pengantar shortcut di 26–28,5 detik dan Scene 02–06 tidak diganti. VO guide belum direkam. Setelah merge jalankan `npm run dev`; preview komposisi `SampleStartupWindowsDirector` di 17–28,5 detik, lakukan uji klik/Save/reload di GUI sebelum klaim 100% drag-editable.
