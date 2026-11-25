# QA — 24 November 2026

Test pada salinan Master FULL v1.8.1-20261124-080253, bukan instalasi pengguna.
- npm run sync: lulus; 4 video, 43 komposisi, 35 segmen, 33 referensi aset, 0 masalah sumber. Konflik ID segmen S01 diselesaikan dengan prefix unik PCUnlockerRecoveryReels-. Tidak ada file inti atau project existing dalam paket add-on.
- addon:validate --strict --syntax: lulus, 0 FAIL, 0 WARN.
- qa:native: lulus AST, 228 target bernama, 0 FAIL, 0 WARN. 124 target teks dan 104 visual tercatat dalam blueprint.
- Preview gabungan eksternal: 1080×1920, 30 FPS, 330 frame (11 detik); preview full 1950 frame (65 detik). S02 memakai MP4 pilihan 09 yang disetujui.
- Source editable merupakan rekonstruksi vektor, bukan MP4 sebagai layer tunggal. Preview eksternal bukan render native source.
- Belum diuji: bundling Remotion, render native, kecocokan visual piksel per piksel, GUI Windows, drag/resize, Save/reload, VO aktual, sinkronisasi final. Ilustrasi UI pihak ketiga belum diuji pada aplikasi asli.

## Revisi S03 — 25 November 2026
Base: MotionGraphic-Studio-FULL-v1.8.1-20261125-010122.zip.
- Panel Alert 05 ACC referensi; native Scene03 dibangun dari pose akhir S02, tidak flatten MP4.
- qa:native: 242 target, 0 FAIL, 0 WARN; S03: 10 teks + 12 visual.
- addon:validate --strict --syntax: statis valid, 0 FAIL, 0 WARN.
- qa-sound-cues --strict: PASS, 12 cue.
- check-layer-instances: 0 FAIL, 0 WARN.
- npm run sync: 4 video, 43 komposisi, 35 segmen, 33 rujukan aset, 0 masalah sumber. Board generated diperbarui oleh sync; tidak ikut ZIP.
- SFX berasal dari preview pilihan 05, onset frame lokal 51, 12 frame WAV; volume mengikuti props.
- Belum diuji: bundling Remotion, render native, kesamaan piksel dengan preview ACC, drag, Save/reload Studio, mix/rekaman VO.
- Copy–Replace tidak mendeteksi konflik lokal; cocokkan file yang berubah dengan snapshot ZIP terbaru atau backup terlebih dahulu.

## Revisi S04 — 25 November 2026
Base: MotionGraphic-Studio-FULL-v1.8.1-20261125-041418.zip.
- Icon Spotlight Soft Scale-Up ACC; posisi komposisi terpusat (x=540, pusat rentang y=920), subtitle tetap dalam zona aman. 150 frame; VO cue 81 tetap.
- Validator add-on strict/syntax: 0 FAIL/0 WARN; AST native 242 target (S04: 4 teks + 4 visual); check-layer-instances 0 FAIL/0 WARN; sound 12 cue PASS. Sync salinan Master: 4 video, 43 komposisi, 35 segmen, 34 referensi aset, 0 masalah sumber.
- Preview eksternal rekonstruksi layout: 1080x1920, 30 FPS, 150 frame; internal 540x960 upscaled, memakai rasterisasi SVG yang sama dan SFX Master. Bukan render native Remotion.
- SVG rekonstruksi yang dipilih, bukan logo resmi. Path internal SVG source-editable; bukan target GUI tersendiri.
- Belum diuji: bundling/render Remotion, GUI drag/Save/reload, kesinambungan transisi native, rekaman dan mix VO final. Backup sebelum Replace apabila ada edit lokal setelah base ZIP.

## Revisi S05 — 25 November 2026
Base: MotionGraphic-Studio-FULL-v1.8.1-20261125-044057.zip.
- Soft Connected visual ACC; logo berkesinambungan dari pose akhir S04, lalu menjadi bagian ilustrasi ISO. S04 dan scene lain tidak diubah. Laptop body 720×434, x=180, y=650; layar 640×366, no zoom; batas layout utama berada dalam safe zone berdasarkan koordinat source. Subtitle VO dan 240 frame dipertahankan.
- `validate-addon --strict --syntax`: STATIS VALID, 46 file, 0 FAIL, 0 WARN. `qa-native-editable --strict`: 256 target (S05 14 teks + 15 visual), 0 FAIL, 0 WARN. `check-layer-instances --strict`: 0 FAIL, 0 WARN; `qa-sound-cues --strict`: PASS, 12 cue.
- `npm run sync` pada salinan Master: 4 video, 43 komposisi, 35 segmen, 36 rujukan aset, 0 masalah sumber. Tidak ada penghapusan file; project lain byte-identik terhadap ZIP input. Board generated diperbarui oleh sync dan sengaja tidak ikut patch.
- SFX WAV dari preview Soft Connected ACC, 8 detik; VO belum direkam. Visual pemulihan merupakan ilustrasi, bukan UI aktual.
- Belum diuji: bundling/render native Remotion, kesamaan piksel terhadap MP4 referensi, GUI drag/resize/Save/reload, listening QA dan sinkronisasi VO. Preview ACC sebelumnya bukan bukti hasil render patch ini. Path internal SVG hanya source-editable. Backup apabila ada perubahan lokal setelah ZIP base.

### S06 Realistic UI — 2026-11-25
- S06 only: 49 text + 25 visual targets; project total 307. Static addon strict + syntax, AST native, 12 sound cues PASS.
- Browser alternative sample frames 0,12,24,90,179: stationary 720 px laptop; visual simulated from approved preview. Native Remotion bundle/render and GUI Save/reload not verified.
- S07 preview only, conceptual narration proposed separately; source and narration unchanged.

## Revisi S06–10 — Fullscreen / Stable Click / Clean Pointer — 2026-11-25
Base: MotionGraphic-Studio-FULL-v1.8.1-20261125-065611.zip.
- S06–10 saja: laptop tidak tampil setelah S05; UI simulasi 960 px; S07–08 stable click, pointer panah standar dan dialog sebagai layer independen, tanpa zoom pada teks tombol. S07–08 ACC visual referensi; S09–10 masih review. Scene 01–05, 11–12, manifest dan master core tidak masuk patch.
- Naskah draft, cue subtitle, SRT dan SFX preview terkait diselaraskan; durasi keseluruhan tetap 1950 frame pada 30 fps.
- Addon validator dengan syntax: 0 FAIL / 0 WARN; Native Editable AST: 443 target (268 teks + 175 visual), 0 FAIL / 0 WARN; QA SFX: PASS, 12 cue; sync salinan Master: 4 project / 43 komposisi.
- Pemeriksaan layer global menemukan 4 FAIL di project Easy2Boot yang sudah ada; tidak diubah dalam patch ini.
- Belum diuji: render native Remotion dari patch, GUI Windows, drag/Save/reload, kecocokan piksel dengan MP4 referensi, sinkronisasi rekaman VO. Preview sebelumnya merupakan rekonstruksi/simulasi dan bukan bukti native render. UI tidak fungsional.
- File change only berbasis ZIP di atas; backup perubahan lokal sebelum Replace. Generated board diperbarui melalui npm run sync.

## Unified background + ending motion — 2026-11-25
Base: MotionGraphic-Studio-FULL-v1.8.1-20261125-082040(2).zip.
- S01–09: hanya backgroundImage radial .82 → .32, dasar #F7F7F5; verifikasi diff persis satu penggantian per scene. S10–12: rekonstruksi Connected Gallery, CTA tanpa laptop, cover vektor 3 layer. Seluruh durasi, narasi, cue subtitle, sound-cues, manifest, entry dan core Master tetap byte-identik.
- Add-on static --strict --syntax PASS; native editable AST 437 targets (267 teks + 170 visual), 0 FAIL / 0 WARN; QA SFX PASS 12 cue.
- Browser alternatif: 18 sampel 1080×1920, 0 page error; sampel 12 scene di (10,10) dan (20,800) = RGB 247,247,245. Cover frame 60 dan 119 identik pada sampel browser, crop 3:4 diperiksa. Tidak mengklaim render native atau GUI.
- Global npm run sync gagal preflight karena folder-jadi-drive/src/Video.tsx tidak ada di ZIP asli (manifest menunjuk path itu). Tidak diperbaiki karena di luar scope; restore entry project tersebut dari backup valid sebelum sync.
- Belum diuji: native Remotion bundle/render, GUI Windows drag/Save/reload, audio playback dan kecocokan piksel dengan preview lama. S10–12 tetap review; ilustrasi hasil bukan jaminan akses data.
