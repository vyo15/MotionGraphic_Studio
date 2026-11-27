# QA report — Master 2.0.0 / S01–S03

- ZIP input: MotionGraphic-Studio-FULL-v2.0.0-20261127-015150.zip; project slug belum ada. Tidak ada file Master/old projects disertakan.
- Source merupakan rekonstruksi vector JSX dari preview 01/02 dan geometry prototype 03, bukan MP4 flatten. Kesamaan piksel belum teruji.
- npm run sync pada copy Master sementara: PASS, 6 video, 44 segmen, 48 rujukan aset, 0 masalah sumber; ID segmen dibuat unik SharingPrinterLan-S01/02/03. Generated files tidak dikirim.
- addon:validate --production --syntax: 0 FAIL, 1 WARN (entry tidak memuat interpolate/spring secara langsung; helper motion.ts memakai interpolate dan smoothstep). TypeScript AST parsing memakai TypeScript global; bukan full typecheck.
- qa:native: 254 target, 0 FAIL, 0 WARN; 138 native text candidates, 116 visual candidates termasuk isi Run dinamis sebagai visual; command Run hanya Props-editable, tidak melakukan eksekusi OS.
- qa:layers --strict: 0 FAIL, 0 WARN.
- qa:motion: PASS (metadata only).
- qa:spatial: PASS 1326 frame declared geometry. Track viewport, subtitle dan focus samples, bukan measured DOM/collision tiap primitive.
- qa:sound: PASS dengan 9 cue planned (warning), 3 omit. Belum playback atau listening QA; audio final sengaja belum dibuat.
- qa:approval --check: review script/storyboard partial versus referensi approved; status benar, bukan full approval. S01 dan S03 reference ACC untuk implementasi; S02 preview; hasil source native belum ACC.
- npm ci --offline: ENOTCACHED (dependency tidak tersedia). Tidak dapat menjalankan bundling, typecheck lengkap, Studio GUI, Save/reload, native render, qa:render atau npm run check penuh. Jangan klaim 100% native editable.
- UI Windows 10 adalah rekonstruksi, bukan screenshot asli; detail/font/ikon dan kamera masih perlu review native. Kursor dan timing source-editable; pemindahan menu memerlukan koreksi hotspot manual. Primitive di dalam grup dapat diedit via source. Subtitle draft aktif default, belum sync rekaman.
- S04–08 belum dibuat; naskah dan CTA ACC tersimpan pada SCRIPT.md dan backlog. Tidak ada placeholder scene dalam komposisi.


## Patch S04–S05 — 2026-11-27
- Baseline: MotionGraphic-Studio-FULL-v2.0.0-20261127-020735.zip. Project sudah ada; file Scene01–03, komponen lama dan timing Scene03 identik dengan baseline.
- S04 (540 frame), S05 (450 frame) ACC referensi MP4; implementasi JSX direkonstruksi dari preview, bukan pixel-identical dan belum dirender. S06–08 backlog. VO draft, CTA teks ACC.
- Sync / validate library: 6 project, 46 segmen, 58 komposisi, 48 rujukan aset, 0 masalah sumber.
- addon:validate --strict --production --syntax: 0 FAIL, 1 WARN (entry tidak menemukan keyframe Remotion; animasi melalui helper frame-based).
- qa:native: 560 target, 0 FAIL, 0 WARN; qa:layers --strict: 0 FAIL, 0 WARN.
- qa:motion PASS metadata; qa:spatial PASS 2316 frame deklarasi viewport/focus; tidak mengukur DOM, glyph, lintasan tiap primitive atau actual collision.
- qa:sound PASS 27 cue total, planned/omit; belum ada playback, mixing, atau listening QA.
- qa:approval: review script/storyboard partial (sesuai status); visual ACC bukan VO/final ACC.
- npm ci --offline --ignore-scripts --no-audit --no-fund: ENOTCACHED pada zod-4.5.4; full typecheck, bundling, native MP4, GUI drag/Save/reload, qa:render belum bisa diuji.
- Edit layer per nama di blueprint; bentuk internal SVG dan cursor/action timing masih source/config-editable. IP contoh tetap 192.168.10.1, EPSON L210 Series. Props hostAddress mengubah ketikan Run; label lain dan S02 tetap source-editable dan perlu disesuaikan bersamaan jika IP diubah. S04 Devices and Printers dipakai kembali di awal S05 untuk continuity.
- Backup folder sharing-printer-lan sebelum Merge/Replace jika ada edit lokal setelah ZIP baseline. Board generated tidak dikirim, npm run sync memperbaruinya. Tidak ada engine, project lain, node_modules, preview MP4 atau cache di patch.

### File Change Only (9 baru, 21 berubah)

- MOD `projects/sharing-printer-lan/AGENTS.md`
- MOD `projects/sharing-printer-lan/EDITABLE-LAYER-MAP.md`
- MOD `projects/sharing-printer-lan/PANDUAN-EDIT-ASSET.md`
- MOD `projects/sharing-printer-lan/PRODUCTION-STATE.json`
- MOD `projects/sharing-printer-lan/PROJECT-SCOPE.md`
- MOD `projects/sharing-printer-lan/QA-REPORT.md`
- MOD `projects/sharing-printer-lan/README.md`
- MOD `projects/sharing-printer-lan/SCRIPT.md`
- MOD `projects/sharing-printer-lan/STORYBOARD.md`
- MOD `projects/sharing-printer-lan/motiongraphic-video.json`
- MOD `projects/sharing-printer-lan/production/BACKLOG-S04-S08.md`
- MOD `projects/sharing-printer-lan/production/MOTION-PLAN.md`
- MOD `projects/sharing-printer-lan/production/SOUND-PLAN.md`
- MOD `projects/sharing-printer-lan/production/editable-blueprint.json`
- MOD `projects/sharing-printer-lan/production/motion-plan.json`
- MOD `projects/sharing-printer-lan/production/sound-cues.json`
- MOD `projects/sharing-printer-lan/production/spatial-plan.json`
- MOD `projects/sharing-printer-lan/src/SegmentVideo.tsx`
- MOD `projects/sharing-printer-lan/src/Video.tsx`
- NEW `projects/sharing-printer-lan/src/components/Captions04.tsx`
- NEW `projects/sharing-printer-lan/src/components/Captions05.tsx`
- NEW `projects/sharing-printer-lan/src/components/Topology05.tsx`
- NEW `projects/sharing-printer-lan/src/components/WindowsConnectUI.tsx`
- NEW `projects/sharing-printer-lan/src/components/WindowsPrinterUI.tsx`
- MOD `projects/sharing-printer-lan/src/config/narration.json`
- MOD `projects/sharing-printer-lan/src/config/props.ts`
- NEW `projects/sharing-printer-lan/src/config/scene04-timing.json`
- NEW `projects/sharing-printer-lan/src/config/scene05-timing.json`
- NEW `projects/sharing-printer-lan/src/scenes/Scene04.tsx`
- NEW `projects/sharing-printer-lan/src/scenes/Scene05.tsx`

## Patch S06–S08 — 2026-11-27 (status terbaru)
- Baseline: MotionGraphic-Studio-FULL-v2.0.0-20261127-085802.zip. Existing manifest 2316f/5 scene; board generated tertinggal 1326f/3 scene. Source S01–05 dan komponen/timing lama dipertahankan byte-for-byte; hanya entry dan metadata/config bersama diperluas.
- Durasi 3111f (103,7s), 8 scene. S06 hasil 390f, S07 CTA 225f dengan komentar “Aku juga pernah pakai cara ini.”, S08 180f skala cover 88% / thumbnail global frame 3110. VO S06 draft; CTA teks ACC; cover silent; ketiganya ACC referensi, bukan native visual lock.
- Sync/validate library: PASS, 6 video, 49 segmen, 61 komposisi, 48 rujukan aset, 0 masalah sumber. Board generated dibuat oleh sync; tidak dikemas.
- addon:validate --strict --production --syntax: 0 FAIL, 0 WARN. Parser TypeScript global dipakai untuk AST, bukan full typecheck.
- qa:native: 700 target, 0 FAIL, 0 WARN (359 teks literal, 341 visual). Props teks dinamis CTA terpisah. qa:layers --strict: 0 FAIL, 0 WARN.
- qa:motion PASS; qa:spatial PASS 3111 frame declared geometry. Group bounds dan reflow dideklarasikan; bukan DOM trace/collision seluruh primitive.
- qa:sound (draft): exit 0, 41 cue total, 29 planned dan 12 omit. STRICT sound exit 1 karena 29 planned cue belum tersedia. Audio belum ditambahkan, tidak ada playback ganda atau klaim listening QA.
- qa:approval --check: exit 0, review script/storyboard partial; sesuai status.
- QA tambahan: 26 sampel JSX ditranspile/evaluasi dengan mock minimal React/Remotion untuk perbandingan HTML full/segment, semua sama dalam model mock. Sampel browser Chromium diinspeksi untuk layout, kertas, komentar dan cover; kabel disambungkan ke casing monitor, bukan jalur terputus. Ini bukan render Remotion/GUI dan tidak menjamin hasil native identik.
- npm ci --offline --ignore-scripts --no-audit --no-fund: ENOTCACHED (zod-4.5.4). npm run check penuh exit 1 karena TypeScript dependency lokal tidak terpasang; quality scanner juga melaporkan kandidat overlap dari cue yang saling eksklusif. Belum bisa membuktikan bundling, full typecheck, preview native, drag/Save/reload, qa:render.
- UI Windows 10/print merupakan rekonstruksi JSX dari preview referensi. Detail Windows dan kesamaan visual dengan MP4 ACC harus diperiksa native. Clip paper feed, bentuk internal SVG, posisi kamera/hotspot, timing dan reflow computed adalah source/config-editable; label literal/target bernama adalah kandidat native edit. CTA text Props-editable.
- Tidak menambah dependensi, tidak menyertakan MP4 preview, tidak mengubah Master maupun project lain. Backup folder project sebelum Merge/Replace jika ada edit lokal setelah baseline.

### File Change Only (12 baru, 21 berubah)

- MOD `projects/sharing-printer-lan/AGENTS.md`
- MOD `projects/sharing-printer-lan/EDITABLE-LAYER-MAP.md`
- MOD `projects/sharing-printer-lan/PANDUAN-EDIT-ASSET.md`
- MOD `projects/sharing-printer-lan/PRODUCTION-STATE.json`
- MOD `projects/sharing-printer-lan/PROJECT-SCOPE.md`
- MOD `projects/sharing-printer-lan/QA-REPORT.md`
- MOD `projects/sharing-printer-lan/README.md`
- MOD `projects/sharing-printer-lan/SCRIPT.md`
- MOD `projects/sharing-printer-lan/STORYBOARD.md`
- MOD `projects/sharing-printer-lan/motiongraphic-video.json`
- MOD `projects/sharing-printer-lan/production/BACKLOG-S04-S08.md`
- MOD `projects/sharing-printer-lan/production/MOTION-PLAN.md`
- MOD `projects/sharing-printer-lan/production/SOUND-PLAN.md`
- MOD `projects/sharing-printer-lan/production/editable-blueprint.json`
- MOD `projects/sharing-printer-lan/production/motion-plan.json`
- MOD `projects/sharing-printer-lan/production/sound-cues.json`
- MOD `projects/sharing-printer-lan/production/spatial-plan.json`
- MOD `projects/sharing-printer-lan/src/SegmentVideo.tsx`
- MOD `projects/sharing-printer-lan/src/Video.tsx`
- NEW `projects/sharing-printer-lan/src/components/CTA07Artwork.tsx`
- NEW `projects/sharing-printer-lan/src/components/Captions06.tsx`
- NEW `projects/sharing-printer-lan/src/components/Captions07.tsx`
- NEW `projects/sharing-printer-lan/src/components/Cover08Artwork.tsx`
- NEW `projects/sharing-printer-lan/src/components/Topology06.tsx`
- NEW `projects/sharing-printer-lan/src/components/WindowsPrintUI.tsx`
- MOD `projects/sharing-printer-lan/src/config/narration.json`
- MOD `projects/sharing-printer-lan/src/config/props.ts`
- NEW `projects/sharing-printer-lan/src/config/scene06-timing.json`
- NEW `projects/sharing-printer-lan/src/config/scene07-timing.json`
- NEW `projects/sharing-printer-lan/src/config/scene08-timing.json`
- NEW `projects/sharing-printer-lan/src/scenes/Scene06.tsx`
- NEW `projects/sharing-printer-lan/src/scenes/Scene07.tsx`
- NEW `projects/sharing-printer-lan/src/scenes/Scene08.tsx`
