# Edit asset dan layer — native Remotion Studio

Pilih layer bernama pada timeline atau preview, ubah teks/style/keyframe yang didukung. Klik Save lalu reload dan bandingkan hasil render sebelum menyebutnya editable. Nilai yang computed/diakses lewat JSX biasa tidak otomatis dapat diedit pada kanvas.

Aset video asli disimpan di `public/` add-on dan diakses melalui `staticFile('videos/<slug>/...')` setelah sync. Gunakan `src/config/narration.json` untuk VO Guide, bukan untuk subtitle final. Dokumentasikan setiap layer penting di `EDITABLE-LAYER-MAP.md`. Lihat `docs/EDITABLE-CONTRACT.md` di Master.
