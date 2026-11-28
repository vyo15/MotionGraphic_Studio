# Panduan edit Sharing Printer — V10 aktif

**Status aktif:** V10 ACC referensi. 10 segmen, 3395 frame, 113,17 detik. Bagian lama adalah riwayat.

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

## SFX preview v2.2
Studio Props: `showSfx` (on/off) dan `sfxGain` (1 = default, 0 = mute). Per cue: `production/sound-cues.json` (frame absolut, end inklusif, gainDb) dan `public/audio/sfx/`. Ganti audio dengan aset legal; jika nama berubah, update `src/components/SoundAssets.ts`, lalu sync. Full dan segment memakai SoundCueTrack yang sama. Edit text/timing perlu cek ulang cue ketikan. Belum diuji Save/reload GUI.


## Audio redesign — Soft Editorial
Edit cue gainDb, frame and source in production/sound-cues.json; showSfx/sfxGain are global Props. Typing follows runCommand, hostAddress and ctaComment visible increments via canonical opt-in text-adaptive-v1. If editing timing rather than text, update matching rule and test; do not touch visual ACC without approval. WAV EQ/fades baked, replacement requires correct metadata + literal map. Native per-cue Studio Save/reload not verified. Legacy audio remains physically present but inactive.

## V4: opening editable (riwayat)
Pilih SharingPrinterLan-S01-Question / SharingPrinterLan-S01-Response / SharingPrinterLan-S01 untuk edit terpisah. Lima teks literal, Arial; gerak parent terpisah dari base position, timing source di Scene01Question.tsx / Scene01Response.tsx. Dua slide tipografi menggantikan subtitle duplikat. S01 demo memakai Topology01 asli dan dua cue subtitle. S02–08 nama layer dan ID tetap; Captions02–07 mengambil offset dari manifest. Jika timing berubah, perbarui narration, sound, motion/spatial dan state, lalu sync. Native Save/reload belum diuji.

## Design v2.1 review
`SceneLayout.tsx` dipakai full/segment untuk satu transform luar scene; kamera dan cursor tetap memakai koordinat original; guide di screen space terpisah dan toggle showSubtitles. Lima teks opening native dan 34 cue guide native (4 cue tambahan; naskah dan beat original tetap). Edit source style literal/target native seperti sebelumnya; Save/reload belum diuji. Font lokal dari library Master, gunakan prosedur patch.

## V10: opening editable (aktif)
Pilih SharingPrinterLan-S01-Question untuk 3 teks awal, 3 tanda tanya dan coral; Scene01Question.tsx memisahkan transform animasi dari posisi literal. Pilih SharingPrinterLan-S01 untuk dua headline dan topology asli. Topology dipindah via wrapper 140px sebelum skala 0.8 (112px layar); headline terpisah, guide tetap screen-space. Handoff S02 mengikuti V10 +112→+80px selama 36f, lalu settle ke posisi asli sampai 78f. Uji edit, Save, reload dan render aktual sebelum menyatakan native verified.

### S02/S03 — highlight ACC
Di segment S02 pilih layer `S02 — Highlight Printer Sharing` / `S02 — Highlight jaringan yang sama`. Pada S03 pilih `S03 — Highlight komputer utama`, `S03 — Highlight Win R` atau enam target `S03 — Highlight …` pada frame aktif. Outline berada pada koordinat UI, sehingga ikut kamera. Offset layout dan timing reveal ada di Scene03.tsx; computed transforms source-editable. Belum uji edit, Save/reload native.
