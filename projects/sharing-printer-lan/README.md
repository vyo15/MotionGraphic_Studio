# Sharing Printer Tanpa Wi-Fi — S01–S05

File baru untuk Master v2.0.0. Source vector editable, tidak memakai MP4 sebagai background. Durasi 77,2 detik. Preview lama adalah referensi, bukan native hasil render.

Salin folder projects dari ZIP ke root Master, lalu `npm run sync` dan `npm run dev`. Tidak perlu mengganti Root/package/catalog. Jika folder slug sudah ada di PC, backup dan bandingkan dahulu.

Status: native GUI, Save/reload, bundling Remotion, render dan kesamaan piksel belum diuji. Scope S01–05; S06–08 tetap di SCRIPT.md.


## Patch S04–S05 (2026-11-27)
- 540 + 450 frame; preview visual ACC, rekonstruksi native belum diuji. UI layer bernama di WindowsPrinterUI.tsx dan WindowsConnectUI.tsx; Topology05, Captions04/05; scene04/05-timing.json untuk cursor dan aksi. hostAddress Props untuk ketikan UNC; bila alamat berubah, sesuaikan juga label Explorer/instalasi dan IP pada S02. SFX hanya planned/omit.
- Nama layer per komponen di editable-blueprint.json. Dialog asli overlap parent disengaja. Scene 01–03 source tidak berubah.

## Patch penutup S06–08 — 2026-11-27 (status terbaru)
Total 3111 frame / 103,7 detik. Scene 01–05 tetap byte-identical. S06 hasil (390f), S07 CTA (225f), S08 cover (180f). Gunakan `npm run sync` lalu `npm run dev`; board generated diperbarui oleh sync, tidak disertakan di patch. Komposisi `SharingPrinterLan-S06`, `-S07`, `-S08`, full `SharingPrinterLan` dan `SharingPrinterLanVOGuide`. CTA prop `ctaComment` = Aku juga pernah pakai cara ini. Cover 88%, frame thumbnail lokal 179 (global 3110). Tanpa VO/track subtitle pada cover. Native reconstruction bukan MP4 flatten. Backup jika edit lokal sesudah ZIP baseline 085802. QA status terbaru di QA-REPORT.md.
