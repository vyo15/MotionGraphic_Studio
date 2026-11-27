# PRODUCTION FLOW — Unified Production 1.0
Ini flow resmi untuk setiap konten. Scope dan **FILE CHANGE ONLY**: `AGENTS.md`. Style/TEXT HIERARCHY & SUBTITLE LOCK v1.0: `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md`. Gerak: `docs/MOTION-DIRECTION-RULES.md`. Sound: `docs/SOUND-DIRECTION-RULES.md`. Gate: `docs/QA-VISUAL-MOTION-CHECKLIST.md`.

## 1. Pilih mode dari permintaan user
| Mode | Hasil | Scope |
|---|---|---|
| Judul/ide/diskusi | Konsep, hook, naskah draft, storyboard | Tidak mengubah source |
| Audit/review | Temuan, bukti dan rekomendasi | Read-only |
| Preview satu scene | Preview bergerak scene diminta | Hanya target, tunggu ACC bila bertahap |
| Langsung buat/build lengkap | Add-on utuh + preview bila runtime tersedia | Semua scene DRAFT; jangan menunggu approval tambahan |
| Revisi/ACC | Perbaikan/keputusan terbatas | Lindungi semua bagian yang sudah ACC |
Default jika cukup jelas; jangan tanya kembali data tersedia. Mode langsung build mengerjakan tahap 1–3 internal, bukan berhenti pada konsep.

## 2. Flow tunggal
1. **Konsep:** satu audiens, pesan, hook dan naskah natural. Pilih teknik utama sesuai topik. Periksa kebenaran teknis materi.
2. **Storyboard:** gunakan `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md` sebagai form; MASALAH → KONFLIK → REAKSI → SOLUSI → DEMONSTRASI → HASIL → CTA → COVER. Tahap tidak sama dengan scene. Rancang aksi/reaksi/hasil/hold, handoff, visual hierarchy, native target dan cue/omit. Cover terakhir mini-demo → hero → hold 1–2 detik; durasi fleksibel ±4–6 detik dan crop 3:4.
3. **Build + pre-preview QA:** gunakan starter/komponen lokal sebagai fondasi, bukan template visual wajib. Build satu Master, penuhi kontrak teknis di bawah. Preview MP4/GIF nyata, inspeksi full dan segment; jika runtime tidak tersedia beri source/add-on dan nyatakan preview belum teruji (jangan mengganti dengan gambar statis). SFX aktual dari build pertama jika ada cue bermakna; planned hanya storyboard/prototype.
4. **Motion review/ACC:** cek beat, realisme UI, posisi, transisi, hold dan editable layer. Catat ACC hanya jika user setuju, lewat `PRODUCTION-STATE.json` + decisionLog, bukan edit board generated. Baca seluruh board tetapi tampilkan sesuai mode review. Revisi lokal tanpa merombak scene tetangga yang locked.
5. **VO Guide & rekam:** motion ACC lebih dulu. Naskah/timing tunggal `src/config/narration.json`; `<ID>VOGuide` terpisah, user merekam natural. Ikuti `docs/WORKFLOW-VO-UNIVERSAL.md`.
6. **Sync + final QA:** retiming berdasarkan audio nyata, satu subtitle track, update plan/hash, scene duration, SFX frame dan mixing. `vo:align` hanya proposal dari timestamp, bukan ASR/auto-retime. Review perubahan terhadap ACC. Uji full/segment, Save/reload/render, audio/listening dan output. Profil CapCut HQ jika diminta.
7. **Arsip & ulangi:** MP4 jika benar-benar dirender; source add-on/patch sesuai scope; backup dan report. Final ACC terpisah dari visual ACC.

## 3. Kontrak build video baru (Master 2.0.0)
`contracts/studio-capabilities.json` dan `contracts/addon.schema.json` adalah acuan machine-readable. Manifest contractVersion 1.0.0, ID PascalCase unik, slug lowercase-hyphen sama dengan folder, entry `src/Video.tsx`, export `Video`, ukuran/FPS/durasi/defaultProps/segments. `src/SegmentVideo.tsx` memakai scene yang sama untuk edit detail; `segmentIndex` sesuai urutan manifest. Pisahkan scenes/components/animations/config; README dan PANDUAN-EDIT-ASSET. Aset lokal `public/`, referensi literal `staticFile('videos/<slug>/...')`. Tidak membawa cache/node_modules/.git/path absolut.

- `editableContract: studio-direct-v4` + `production/editable-blueprint.json`, `EDITABLE-LAYER-MAP.md`; satu call-site native dengan name literal unik, inline style/teks literal, base/user/animation transform terpisah, frame deterministic. Lihat `docs/EDITABLE-CONTRACT.md`.
- `motionPlanContract: focus-driven-v1` + `production/motion-plan.json`, narration contiguous termasuk silent; `production/spatial-plan.json` sesuai geometry source, keyframes, hash dan alasan overlap. Lihat Motion Plan Contract/Production Toolkit; copy helper kamera lokal bila perlu. Tidak import lintas project.
- `soundImplementationContract: cue-track-v1` + `production/SOUND-PLAN.md`, `production/sound-cues.json`, canonical SoundCueTrack dan literal SoundAssets; default showSfx true/sfxGain 1; lokal WAV legal, satu track full/segment, cue aktual atau omit beralasan. Detail di Sound Direction dan Local-First.
- Gate tunggal yang sudah tersedia: `npm run addon:validate -- <folder-addon> --production --syntax`. Ini pemeriksaan statis (motion/spatial/native/sound/source), bukan sertifikat preview. Gunakan CLI diagnostik di QA checklist saat perlu. Legacy tidak dipaksa migrasi. Jangan menandai scaffold contoh sebagai video produksi.

## 4. Aturan pemeliharaan
Rule baru hanya jika gap belum dicakup dan sifatnya lintas video; revisi tunggal menjadi perbaikan scene, keputusan kreatif menjadi ACC, error berulang menjadi reusable asset/test/validator. Update pemilik aturan, jangan append ke semua prompt. Jangan ubah engine/versi dependency hanya untuk konsolidasi dokumentasi.
