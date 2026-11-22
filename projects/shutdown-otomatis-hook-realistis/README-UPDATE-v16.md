# Shutdown v16: Editable Scene 01–05, Scene 04 ACC v15

Project disusun berdasarkan ZIP master terbaru. **Timeline 9 scene**, kini 65 detik; Scene 04 selama 8 detik, dimulai frame 540. Dari frame 780 sampai akhir semua scene lama tetap memakai source yang sama, hanya start +30 frame.

Buka `npm run dev` setelah `npm install`, lalu di Remotion pilih folder *Shutdown Otomatis → Scenes* dan komposisi S01–S09. Untuk Scene 04, gunakan nama `S04Solusi`. Gunakan panel **Props** untuk mengatur awal progress 62%/76%, frame selesai dan frame OFF. Teks dan elemen vektor menggunakan layer native bernama.

Jangan gunakan preview MP4 v15 sebagai scene; animasinya sudah dibangun ulang sebagai React/SVG. Master tidak termasuk VO final.

Batas pemeriksaan: sintaks, metadata, native-layer validation, timeline dan asset SFX lulus. GUI drag, penulisan text langsung, Save/reload serta render Windows **belum** teruji dan harus dicek saat dijalankan di laptop Anda.
