# Panduan edit

- Pilih komposisi segmen `PCUnlockerRecoveryReels-S01` hingga `PCUnlockerRecoveryReels-S12` untuk mengedit, bukan full timeline. Komponen segmen sama dengan full.
- `src/scenes/Scene02.tsx`: foto 1–3, label masing-masing, file DOCX/XLSX, kartu Windows Setup, ikon, pertanyaan dan tiap subtitle mempunyai layer bernama terpisah.
- Posisi, skala, opacity, ukuran, rotasi, warna, easing, timing di JSX inline. Ilustrasi di `src/components/Artwork.tsx` berisi bentuk SVG biasa; jalur/warna internal source-editable, bukan dijanjikan native-draggable per path.
- `src/config/narration.json`: naskah/timing VO Guide. Subtitle literal independen di masing-masing scene; jika mengubah wording/timing di Studio, samakan narration JSON agar guide konsisten.
- `showSubtitles`, `showVoGuide`, `showSfx`, `backgroundColor`, `sfxVolume` tersedia sebagai props. Audio SFX preview dipotong per scene di `public/audio/sfx/`. Tidak ada VO rekaman.
- Uji pilih layer → ubah posisi atau teks → Save → reload → preview → render sebelum menganggap native editability teruji.

Layer native dideklarasikan: 124 teks + 104 visual. Status GUI belum diuji. Semua source baru, tidak ada master file yang diganti.
