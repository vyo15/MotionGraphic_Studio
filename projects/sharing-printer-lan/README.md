# Sharing Printer — V10 aktif (2026-11-28)

**Status aktif:** V10 ACC referensi, 10 segmen, 3383 frame, 112,77 detik. Bagian V4 dan sebelumnya adalah riwayat.

File baru untuk Master v2.0.0. Source vector editable, tidak memakai MP4 sebagai background. Durasi 77,2 detik. Preview lama adalah referensi, bukan native hasil render.

Salin folder projects dari ZIP ke root Master, lalu `npm run sync` dan `npm run dev`. Tidak perlu mengganti Root/package/catalog. Jika folder slug sudah ada di PC, backup dan bandingkan dahulu.

Status: native GUI, Save/reload, bundling Remotion, render dan kesamaan piksel belum diuji. Scope S01–05; S06–08 tetap di SCRIPT.md.


## Patch S04–S05 (2026-11-27)
- 540 + 450 frame; preview visual ACC, rekonstruksi native belum diuji. UI layer bernama di WindowsPrinterUI.tsx dan WindowsConnectUI.tsx; Topology05, Captions04/05; scene04/05-timing.json untuk cursor dan aksi. hostAddress Props untuk ketikan UNC; bila alamat berubah, sesuaikan juga label Explorer/instalasi dan IP pada S02. SFX hanya planned/omit.
- Nama layer per komponen di editable-blueprint.json. Dialog asli overlap parent disengaja. Scene 01–03 source tidak berubah.

## Patch penutup S06–08 — 2026-11-27 (status terbaru)
Total 3111 frame / 103,7 detik. Scene 01–05 tetap byte-identical. S06 hasil (390f), S07 CTA (225f), S08 cover (180f). Gunakan `npm run sync` lalu `npm run dev`; board generated diperbarui oleh sync, tidak disertakan di patch. Komposisi `SharingPrinterLan-S06`, `-S07`, `-S08`, full `SharingPrinterLan` dan `SharingPrinterLanVOGuide`. CTA prop `ctaComment` = Aku juga pernah pakai cara ini. Cover 88%, frame thumbnail lokal 179 (global 3110). Tanpa VO/track subtitle pada cover. Native reconstruction bukan MP4 flatten. Backup jika edit lokal sesudah ZIP baseline 085802. QA status terbaru di QA-REPORT.md.

## V4 — ACC 2026-11-28 (riwayat)
10 segmen, 3317f / 110,57s. Opening 482f: Question 120f, Response 84f, demo S01 278f. ID lama utuh, S02–08 bergeser +206f tanpa perubahan durasi lokal. Thumbnail cover global 3316, lokal 179. Native QA dan VO asli pending. Jalankan sync/dev setelah backup; generated board tidak termasuk patch.

V4 silent result hold 34f, frame 448–481. Teks narasi tetap utuh.


## V10 — ACC referensi 2026-11-28
Opening 560f: Question 198f, Response 84f, Demo 278f; full 3395f (113,17s), 10 segmen. +78f untuk seluruh segmen/cue/guide setelah question; local timing, VO dan WAV tetap. Demo source asli +112px screen, headline mengikuti objek (gap referensi ~95px), S02 mengikuti V10 selama 36f (+112→+80px), lalu settle ke posisi asli sampai 78f. Silent hold demo frame 526–559, cover thumbnail lokal 179/global 3394. Native parity/GUI/listening pending. Lima teks baru (tiga tanda tanya, dua headline) + satu coral target; tidak ada raster bake.

**Timing aktif terbaru — Continuous VO ACC:** 3383f (112,77s); question 186f (6,2s), response 84f, demo 278f; opening 548f. Full VO kontinu mulai 212f, batas demo 270f, akhir sequence 382f; cover hero terakhir 3382f (lokal 179). Catatan angka lama adalah riwayat. Hold akhir Wi-Fi dipangkas 12f, tanpa mengubah waveform, reveal/resolve, scene lain atau local cue. Native/listening final belum diuji.
