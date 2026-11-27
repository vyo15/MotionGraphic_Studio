# Edit asset

1. Ekstrak File Change Only ke root MotionGraphic-Studio; backup bila sharing-printer-lan sudah ada.
2. npm run sync, npm run dev. Pilih SharingPrinterLan dan segmen S01/S02/S03/S04/S05.
3. Pada frame aktif pilih Interactive layer bernama di canvas; ubah teks/posisi via Studio, Save, reload dan cek render. Nama lengkap di EDITABLE-LAYER-MAP.md.
4. Kamera dan cursor timing source-editable di src/config/scene03-timing.json; parameter animasi topology di src/components/Topology*.tsx. Perubahan letak menu perlu menyesuaikan hotspot cursor dan spatial plan; tidak ada auto-lock pointer.
5. Subtitle literal di Captions*.tsx, timing dari narration.json. Jika revisi teks, update narration.json dan review motion/spatial hash. Native edit subtitle tidak otomatis mengubah naskah JSON.
6. Props: showSubtitles, backgroundColor, runCommand, hostAddress. Rekaman VO & audio final belum ada.
7. S06–08 belum dirender. Durasi komposisi 77,2s; bukan MP4 final.


## Patch S04–S05 (2026-11-27)
- 540 + 450 frame; preview visual ACC, rekonstruksi native belum diuji. UI layer bernama di WindowsPrinterUI.tsx dan WindowsConnectUI.tsx; Topology05, Captions04/05; scene04/05-timing.json untuk cursor dan aksi. hostAddress Props untuk ketikan UNC; bila alamat berubah, sesuaikan juga label Explorer/instalasi dan IP pada S02. SFX hanya planned/omit.
- Nama layer per komponen di editable-blueprint.json. Dialog asli overlap parent disengaja. Scene 01–03 source tidak berubah.

## S06–08: edit tambahan
1. Buka komposisi `SharingPrinterLan-S06/S07/S08`; pilih layer bernama sesuai scene. Untuk label/subtitle/cover gunakan node literal; untuk komentar dinamis buka Props `ctaComment` (default “Aku juga pernah pakai cara ini.”). Teks final dipertahankan sebagai satu string, typing berdasarkan frame. Panjang berlebih perlu penyesuaian width/font.
2. `src/config/scene06-timing.json` menyimpan waktu dialog dan posisi cursor. Jika memindah tombol Print, sesuaikan hotspot dan timing. `scene07-timing.json` menyimpan fade, reflow dan typing. `scene08-timing.json` mencatat fade, skala referensi, hold dan thumbnail. Skala native di `Cover08Artwork.tsx` pada layer Cover composition scale; perubahan config skala saja tidak mengubah canvas. Gerak internal printer dan data packet tetap source-editable.
3. Uji edit → Save → reload → render frame awal/tengah/akhir di Studio. `Freeze` membawa frame akhir scene sebelumnya untuk fade tanpa menyisipkan MP4. Hindari mengubah S01–05. Subtitle draft default aktif; cover silent. Setelah rekaman, perbarui timing narration dan subtitle satu track, serta motion/spatial hash dan SFX cue.
