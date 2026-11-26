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

## S10 Relaxed Pacing V4 — 2026-11-26
- 303 frame S10, 2073 frame total. Source rekonstruksi dari preview ACC; bukan reproduksi pixel-identik yang sudah dirender.
- PASS addon:validate --strict --syntax, qa:native (512 target), qa:layers --strict, qa:sound --strict (12 cue), manifest/sequence/narration/cue bounds, sync dan validate-library di salinan Master (5 video, 51 komposisi).
- Sound S10 diekstrak dari preview ACC; impact estimasi, listening QA belum. Render native, type-check lengkap dependency Remotion, Studio drag/Save/reload belum dilakukan.
- Generated board/Root/catalog/mirror tidak disertakan dalam patch, dibuat oleh sync. S03–S08 preview revisi terpisah tidak masuk patch ini.

## Revisi S11–S12 — 26 November 2026
Base: MotionGraphic-Studio-FULL-v2.0.0-20261126-085834.zip. Preview referensi: PCUnlocker-CTA04-Opening-Motion-Revision.mp4.
- Source S11/S12 direkonstruksi dari preview ACC; 270 + 120 frame, durasi full 2193 frame; S01–S10 source tidak disentuh.
- Add-on strict/syntax: 0 FAIL/0 WARN. Native: 521 target, 0 FAIL/0 WARN; layer instances 0 FAIL/0 WARN; sound 12 cue PASS; syntax 153 source 0 error.
- Sync salinan Master: 5 video, 51 komposisi, 41 segmen, 43 rujukan aset, 0 masalah sumber. Board generated diperbarui, tidak dikirim. Timeline narration, manifest, subtitle dan production state diperiksa.
- Inspeksi 11 frame source S11/S12 melalui harness HTML sementara (TS transpile, stub React/Remotion, Chromium), bukan render Remotion. Pose akhir S11/awal S12 identik dan hold cover stabil pada sampel. Tidak ada MP4 flattened dalam source.
- Native bundling/render, typecheck penuh, interactivity Windows Save/reload, VO rekaman dan listening QA belum diuji; dependensi Remotion tidak terpasang di lingkungan ini.
- Preview tambahan S03–S05 yang pernah ACC belum seluruhnya terimplementasi pada base; preview kontinuitas S06–S09 juga belum seluruhnya diterapkan. Patch ini khusus penutup, mempertahankan semua file scene lain; S09 status REVIEW tidak ditingkatkan. Backup dan periksa konflik edit lokal sebelum Replace.

## Technical audit and continuity fix — 2026-11-26
Base: MotionGraphic-Studio-FULL-v2.0.0-20261126-092146.zip. Screenshot: global f1539 / S10 local f39. Observed: premature ghost cards and blank artwork at login. Source expected individual opacity=0, but gallery parent remained visible throughout. Root cause of discrepancy in actual Remotion Studio not proven; non-Interactive phase gates added to prevent early compositing. Original artwork existed as inline SVG, not a missing external file. Five explicit SVG copies added and independently named; no original artwork or logo changed.

- Audit all 12 scene sources, 73.1s/2193f at 30fps; manifest/Video/SegmentVideo/narration checked. S10 old desktop fade 2f and gallery Documentation opacity 3f too short. S10 revised login typing 12–54; desktop transition 63–81; Explorer 105–123 then hold to 198; desktop fades 198–222; gallery reveal 204–242 staggered; confirmation 248–264 then hold through 302. Gallery cannot display before f204.
- S04 outgoing S03 pose carries f0–18; original logo reveal f8–30. S06 outgoing S05 pose carries f0–17, UI fades as complete group; no alteration of existing focus path. S11 outgoing S10 final pose carries f0–11, first text reveal f11–26; final CTA/cover unchanged. No old subtitle or SFX on carried pose.
- Browser approximation (TS transpile and stub React/Remotion, SVG embedded for inspection): 59 samples, all 12 scenes; f1539 gallery client rect count 0, five images loaded; central crops at S03→04, S05→06, S10→11, S11→12 identical on boundary (S09→10 nearly identical, caret/text minor differences). Not native renderer; real Studio discrepancy must be re-tested.
- Other candidates: S01 micro-shake and S03 alert 4–5 frames deliberate impacts; S07 UI reaction 6 frames; S05 VO 8s with many words, review with recorded VO; no global slowdown without timing/audio review. S03–S09 older additional preview continuity not fully reproduced in source, avoid silently claiming otherwise. S06–S09 dynamic focus UI/text scale and detailed timing still need native full-motion QA.
- Static checks: add-on strict+syntax, native AST 526 targets, layers strict, sound 12 cues, sync/asset references. Full runtime/type-check/native render unavailable (offline npm ci ENOTCACHED). Audio retained, existing S10/S04 preview cue timing may require re-sync; no listening QA. No new visual/final ACC recorded.

## Screen State Continuity revision — 26 November 2026
Base: MotionGraphic-Studio-FULL-v2.0.0-20261126-093430.zip. User requested correction of unsynchronized transition at global frame 846 and audit of smooth pacing for CapCut HQ. No new ACC inferred. All narration, scene durations, asset files, audio files, manifest and original final poses retained.
- S06: opaque screen substitution inside laptop at local f12, proportional expansion to f36, then existing focus camera. No two translucent UI surfaces.
- S07–09: camera reframe before dialog, opaque dialog open/close, independent dim layer, gated restart state, and login continuity. S10: opaque login and desktop, Explorer lifts/shrinks while opaque artwork emerges; late outgoing fade, final hold retained. S04/S11/S12: reduce conflicting visual overlap during handoff.
- Source: strict add-on + syntax PASS (0 FAIL/0 WARN); native editable AST PASS (526 targets), layers PASS, 12 sound cues PASS. 153 source syntax files checked. Sync/validate-library on copy: 5 videos, 51 compositions, 41 segments, 48 asset references, 0 source issues. Render profile tests: 8 passed, 2 skipped. CapCut HQ dry run confirms composition and 73.10s; no native file rendered.
- Browser substitute QA: 165 sampled frames across 12 scenes, plus 24 S10 recheck frames after final change; no failed image loads in these samples. S05→S06 moving preview (global f810–929) produced by TSX-derived HTML/browser substitute, 120 frames, 1080×1920, 30 FPS, H.264 CRF16 slow, yuv420p BT.709, decoded without errors. No VO or audio in this preview. Contact sheets are diagnostic, not proof of actual Remotion render.
- Native Remotion bundle/render blocked: npm ci --offline failed ENOTCACHED (zod 4.5.4). Native Studio preview/drag/Save/reload, full motion render, actual audio/VO timing and listening QA remain pending. qa:motion/qa:spatial require plan files absent in this legacy project; no PASS claimed for these gates. SFX preserved and must be checked against revised animation and recording.
- Preserve local edits: compare base before replacing, backup project folder first. Generated board is deliberately excluded; run sync after applying.
