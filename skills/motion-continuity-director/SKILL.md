---
name: motion-continuity-director
description: Arahkan focus, continuity scene, koreografi berdasarkan makna VO, kamera portrait dan collision-free motion untuk add-on Remotion MotionGraphic Studio.
---
# Motion Continuity Director v1.0

Aktif berdasarkan tugas motion graphic: ide/storyboard, build, preview, revisi, audit dan sinkron VO. Ini adapter lokal yang wajib dibaca oleh agent yang mengakses Master; bukan bukti custom skill terinstal di akun ChatGPT. Gunakan bersama MotionGraphic Studio Director bila tersedia, Remotion markup/timing/multi-scene/interactivity/captions yang relevan, Sound Design Director dan Opuscar sebagai referensi. Kontrak Master dan ACC lebih tinggi.

1. Baca `CHATGPT-READ-FIRST.md` lalu `docs/MOTION-DIRECTION-RULES.md`, `docs/MOTION-DECISION-MATRIX.md`, `docs/MOTION-VOCABULARY.md`, `docs/PORTRAIT-CAMERA-STANDARD.md`, `docs/MOTION-PLAN-CONTRACT.md`, `docs/QA-VISUAL-MOTION-CHECKLIST.md`. Jika skill tidak tersedia di runtime, dokumen Master ini adalah fallback.
2. Analisis makna setiap beat dan target fokus. Pilih gerakan minimum: establish, focus, action/reaction, hold, handoff. Gunakan matrix, bukan preset slide mask. Hindari gerak dekoratif. Draft VO tidak dianggap rekaman.
3. Rancang pose camera/objek masuk-keluar, world vs screen, reflow dan protected bounds. Untuk UI landscape: fit, zoom bila detail, pan target, hold, zoom out bila perlu. Cursor natural, hotspot tepat, UI state realistis. Jangan reset world antarscene yang berlanjut.
4. Tulis motion plan dan storyboard, cue/omit, editable targets. Full/segment memakai scene dan timing sama; frame-based, satu callsite native per target; jangan mengubah master generated, tidak ada dependency baru. Rencana bukan source editing otomatis.
5. QA metadata dengan `node tools/qa-motion-plan.mjs projects/<slug>` untuk kontrak baru, lalu periksa lintasan/clip/collision selama preview bergerak; uji Save/reload/render jika tersedia. Laporkan mana yang belum diuji. Jangan klaim lulus karena metadata.
6. Hormati mode user. Audit/diskusi tidak mengubah source; build langsung sesuai scope; revisi hanya target dan keputusan ACC tidak disentuh. VO Guide setelah visual ACC, rekaman natural, sync aktual dan final QA. Delivery FILE CHANGE ONLY untuk revisi.

## Production Toolkit v1.0 — Master 2.0.0
Baca `docs/PRODUCTION-TOOLKIT.md` sebelum build. Untuk video baru: pilih/copy kamera/asset lokal dari `templates/production-toolkit/` bila relevan; wajib `production/spatial-plan.json` dan `npm run qa:spatial -- <folder-addon>` di gate produksi. Catat world/viewport, focus bounds, track aktif dan collision exemption beralasan, gunakan keyframe yang sama dengan source; cek seluruh frame deklarasi dan tetap inspeksi preview full/segment. Setelah rekaman VO: `vo:align` hanya proposal timestamp, bukan ASR/ACC atau retiming otomatis. `qa:approval` read-only; `qa:render` bedakan declared hold dan kandidat dead zone. Legacy/ACC tidak dipaksa migrasi. Lihat laporan release 2.0.0 untuk batas verifikasi.
