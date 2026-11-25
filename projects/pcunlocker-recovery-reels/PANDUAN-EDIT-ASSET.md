# Panduan edit

- Pilih komposisi segmen `PCUnlockerRecoveryReels-S01` hingga `PCUnlockerRecoveryReels-S12` untuk mengedit, bukan full timeline. Komponen segmen sama dengan full.
- `src/scenes/Scene02.tsx`: foto 1–3, label masing-masing, file DOCX/XLSX, kartu Windows Setup, ikon, pertanyaan dan tiap subtitle mempunyai layer bernama terpisah.
- Posisi, skala, opacity, ukuran, rotasi, warna, easing, timing di JSX inline. Ilustrasi di `src/components/Artwork.tsx` berisi bentuk SVG biasa; jalur/warna internal source-editable, bukan dijanjikan native-draggable per path.
- `src/config/narration.json`: naskah/timing VO Guide. Subtitle literal independen di masing-masing scene; jika mengubah wording/timing di Studio, samakan narration JSON agar guide konsisten.
- `showSubtitles`, `showVoGuide`, `showSfx`, `backgroundColor`, `sfxVolume` tersedia sebagai props. Audio SFX preview dipotong per scene di `public/audio/sfx/`. Tidak ada VO rekaman.
- Uji pilih layer → ubah posisi atau teks → Save → reload → preview → render sebelum menganggap native editability teruji.

Layer native dideklarasikan: 268 teks + 175 visual. Status GUI belum diuji. Revisi per scene; tidak ada master file yang diganti.

### Scene 03 — Panel Alert (05)
Buka `PCUnlockerRecoveryReels-S03`. Foto, label, file, panel, ikon, outline, badge merah, kedua garis silang dan dua subtitle merupakan target tersendiri. Badge memuat dua garis silang; transform badge memindahkan keduanya. Ubah onset di keyframe opacity/scale dan `Sequence from={51}` bersamaan untuk menjaga sinkron tetot. Audio `s03-panel-alert.wav` berdurasi 12 frame; SFX bisa dimatikan lewat showSfx. Tidak ada VO rekaman.

### Scene 04 — Icon Spotlight / Soft Scale-Up
Buka `PCUnlockerRecoveryReels-S04`. 8 target independen: background, spotlight, ikon, judul, fungsi, aksen coral, dua subtitle. Logo dapat diubah posisi/ukuran/opacity/scale pada layer Ikon pemulihan; warna dan path komponennya dapat diedit di `public/images/pcunlocker-vector.svg` (SVG source, bukan tiap path sebagai handle GUI). Logo masuk frame 18–48, nama 81–99. Untuk memindah komposisi, geser layer visual masing-masing dengan offset sama; subtitle tetap di zona bawah. Aset dan cue audio S04 sebelumnya dipertahankan. Timing VO tetap 0–81 / 81–150.

### Scene 05 — Soft Connected
Buka `PCUnlockerRecoveryReels-S05`. 14 teks dan 15 visual independen dideklarasikan. Ikon kontinu mengacu SVG yang sama dengan S04; di frame 0 ukuran/posisi cocok dengan pose S04 final. Jika posisi S04 diedit lagi, samakan pose awal S05. Edit body laptop 720×434 dan layar 640×366 secara selaras agar screen tidak keluar bezel. File ISO, lipatan, ikon, judul, flashdisk, label, panah, indikator, laptop, layar, ilustrasi recovery dan subtitle mempunyai target bernama. Path internal SVG editable dari source, bukan handle GUI tiap path. Timing animasi inline interpolate; audio cue mengikuti WAV dan props. Jangan mengubah VO Guide tanpa menyamakan narration JSON.

### Scene 06–10 — Fullscreen UI
Buka segmen S06–S10. Layar PCUnlocker / Windows merupakan simulasi editorial, tanpa bingkai laptop setelah S05. Setiap elemen tabel, label, dialog, tombol, subtitle dan pointer memiliki target independen; tidak memakai MP4 sebagai layer. Jendela aplikasi 960 px, tombol tidak berubah ukuran ketika diklik. S07/S08: hotspot pointer SVG ada di ujung panah; koordinat, ukuran dan keyframe inline dapat diedit. Selaraskan posisi UI dan dialog antar scene bila menggeser layer. S07–08 menggunakan audio dari preview yang di-ACC; S09–10 masih review. Jika mengubah VO, samakan subtitle dan narration.json. Sumber SVG internal dapat diedit sebagai source, bukan setiap path sebagai handle GUI.
