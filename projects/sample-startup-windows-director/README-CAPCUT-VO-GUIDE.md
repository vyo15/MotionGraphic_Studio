# VO Subtitle Guide — untuk sinkronisasi di CapCut

Source naskah: `src/config/narration.json` (tidak diubah). Subtitle kalimat pendek dalam `src/config/vo-subtitle-cues.json` dibuat dengan pemecahan teks yang **persis** dari naskah, tanpa menambah kata.

## Cara pakai

1. Di Remotion Studio, gunakan Props `showVoGuide: true` serta `showSubtitles: true` untuk melihat subtitle panduan **teks gelap polos tanpa blok hitam**, di bawah layar. Subtitle pendek ini berfungsi sebagai guide, bukan subtitle final.
2. Bila render **video FULL**, impor `production/VO-GUIDE-FULL-CAPCUT.srt` ke CapCut sebagai subtitle eksternal. Timestamp SRT dimulai dari `00:00:00,000` video penuh.
3. Bila render **hanya S02**, impor `production/VO-GUIDE-S02-CAPCUT.srt`; timestamp dimulai dari 0 detik khusus Scene 02.
4. Rekam lalu impor VO asli kamu ke CapCut, cocokkan gelombang suara dengan cue SRT, geser/potong cue bila perlu. SRT adalah **perkiraan timing sebelum VO direkam**, bukan hasil transkripsi audio.
5. Untuk bahan MP4 bersih ke CapCut, pilih `npm run menu` → Render → **CapCut HQ**: profil ini menonaktifkan `showSubtitles` pada temporary props. Pastikan subtitle guide **tidak** terlihat di MP4 hasil render.
6. Saat konten final, kamu bisa edit ulang kalimat, waktu, font, posisi subtitle di CapCut dan ekspor final di sana. VO guide tidak perlu dibakar ke video.

## Penting

- `showVoGuide` bukan `showDraftCaptions`. Yang pertama cue VO untuk placement, yang kedua caption dekoratif (draft) dari scene lain.
- `showVoGuide` dan `showSubtitles` default `true` untuk preview Studio. Profil CapCut HQ mematikan `showSubtitles` (sudah diverifikasi melalui kode render dan uji override); jika memilih render mode Props asli, guide akan terlihat.
- File SRT dapat diimpor tanpa mengubah Remotion Master, dan bisa dipakai untuk VO alignment di luar Studio.
- Jangan gunakan SRT sebagai timing final sampai sudah dicek dengan rekaman VO asli.

## Kontinuitas dengan Scene 01

- Seluruh naskah, teks dan visual Clean Motion v3 Scene 01 tetap dipertahankan; perubahan hanya pada tampilan VO Guide opsional.
- Desktop Scene 01 yang ACC memakai wallpaper berbeda dari mock Windows11 Familiar v4 Scene 02. Wallpaper Scene 01 **sengaja tidak diubah** demi menjaga ACC. Kesamaan wallpaper perlu persetujuan terpisah jika hendak dibuat identik.
- Excel `Laporan Kerja.xlsx`, Chrome/Gmail dan ERP tetap identik sebagai objek cerita.

## Revisi subtitle polos + konsistensi font (2026-11-24)

- S01/S02/S05: komponen `VoGuide` sekarang hanya teks, tanpa background, border, padding, shadow, label atau panel. Posisi S05 sengaja lebih rendah (Y=1590) agar tidak menimpa CTA; S01/S02 Y=1377.
- S03/S04: subtitle yang sudah ACC dipertahankan, dengan penetapan font eksplisit sama: `Arial, Helvetica, sans-serif`, ukuran 39, weight 590 dan warna `#343434`.
- Typography editorial semua scene menggunakan font utama Master (`src/config/design.ts`); UI simulasi Windows tetap `Segoe UI` sesuai tampilan Windows, dan perintah teknis boleh menggunakan monospace. Perbedaan font UI Windows adalah disengaja, bukan font konten editorial.
- Untuk S01/S02/S05 tersedia 19 target native bernama `S01 VO — Cue 01` dst. Teks visual tiap cue adalah literal JSX di `src/components/SceneBase.tsx` dan dapat dicoba diedit melalui Studio. `src/config/vo-subtitle-cues.json` menjadi acuan **timing** dan teks untuk SRT; setelah mengganti teks lewat Studio, perbarui teks cue JSON/SRT secara manual untuk tetap sinkron. GUI drag/Save/reload belum diuji.
- Untuk MP4 yang bersih, matikan `showSubtitles` atau gunakan profil CapCut HQ. Jangan render dengan guide menyala jika tidak ingin teks tertanam.
