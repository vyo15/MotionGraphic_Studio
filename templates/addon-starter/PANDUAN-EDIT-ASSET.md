# Edit asset dan layer — native Remotion Studio

Pilih layer bernama pada timeline atau preview, ubah teks/style/keyframe yang didukung. Klik Save lalu reload dan bandingkan hasil render sebelum menyebutnya editable. Nilai yang computed/diakses lewat JSX biasa tidak otomatis dapat diedit pada kanvas.

Aset video asli disimpan di `public/` add-on dan diakses melalui `staticFile('videos/<slug>/...')` setelah sync. Gunakan `src/config/narration.json` untuk VO Guide, bukan untuk subtitle final. Dokumentasikan setiap layer penting di `EDITABLE-LAYER-MAP.md`. Lihat `docs/EDITABLE-CONTRACT.md` di Master.

Subtitle draft aktif pada preview (`showSubtitles: true`), nonaktifkan untuk export bahan mentah CapCut. Edit cue literal dan posisi/style pada node Interactive masing-masing; perbarui teks/timing pada `src/config/narration.json` agar tetap konsisten. Subtitle final baru setelah rekaman; jangan tumpuk draft/final/VO Guide.

Font/ukuran/weight/lineHeight/spacing/posisi per native layer tetap literal; guide satu baris per cue, `showSubtitles` menyembunyikan tanpa layout shift. `showSafeZone` overlay Studio-only. Periksa glyph aktual dan gap min 80 px di frame aksi. Font family lokal alias MG Poppins/MG Inter/MG Manrope.
