# MotionGraphic Studio — Unified Production 1.0 (Master engine 2.0.0)
Satu pintu masuk, bukan kumpulan prompt. Buka ZIP aktual, jangan memakai snapshot lama. Dokumen ini tidak mengubah konfigurasi akun ChatGPT.

Baca `CHATGPT-HISTORY.md` sekali di awal pekerjaan untuk mengetahui pelajaran dan batas QA terakhir. Riwayat bukan sumber rule/ACC baru; keputusan aktual tetap ada pada source.

## Routing berdasarkan tugas
1. Selalu baca `AGENTS.md` (scope, prioritas, perlindungan) dan `PRODUCTION-RULES.md` (flow). Untuk project existing, baca manifest, `PRODUCTION-STATE.json`, `src/config/narration.json`, board generated, lock, source dan AGENTS/PROJECT-SCOPE/SCRIPT/STORYBOARD terkait. Laporkan konflik, jangan menimpa keputusan ACC. Untuk audit/ide, tidak perlu menjalankan seluruh toolkit.
2. Untuk konsep/build baru, tiga acuan kreatif: `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md`, `docs/MOTION-DIRECTION-RULES.md`, `docs/QA-VISUAL-MOTION-CHECKLIST.md`. Inilah enam dokumen inti termasuk file ini, AGENTS dan Production Rules. `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md` adalah format kerja, bukan flow kedua.
3. Untuk build/revisi teknis, verifikasi `package.json`, `contracts/studio-capabilities.json`, `contracts/addon.schema.json`, struktur project dan CLI aktual. Buka modul berikut hanya untuk fungsi terkait; kontrak yang berlaku tetap wajib dipenuhi.

| Modul | Kapan dibaca |
|---|---|
| `docs/EDITABLE-CONTRACT.md` | build/ubah layer, segment, subtitle native, Save-to-code |
| `docs/MOTION-PLAN-CONTRACT.md`, `docs/PRODUCTION-TOOLKIT.md` | build/retime/geometry video baru |
| `docs/MOTION-DECISION-MATRIX.md`, `docs/MOTION-VOCABULARY.md`, `skills/motion-continuity-director/SKILL.md` | ketika memilih gerak rumit atau troubleshooting continuity |
| `docs/PORTRAIT-CAMERA-STANDARD.md` | UI landscape atau kamera virtual |
| `docs/SOUND-DIRECTION-RULES.md`, `docs/SFX-LOCAL-FIRST.md`, `docs/SFX-SOFT-EDITORIAL.md` | sound plan/build/preview/mixing; modul sound, bukan director kedua |
| `docs/PREVIEW-VIDEO-OUTPUT-CONTRACT.md` | permintaan preview bergerak |
| `docs/SCENE-VO-ACC-WORKFLOW.md`, `docs/WORKFLOW-VO-UNIVERSAL.md` | review, ACC, guide dan sync VO |
| `docs/ARTIFACT-HYGIENE.md`, `docs/MAINTENANCE-AND-RECOVERY.md` | cleanup/recovery |
| `docs/RENDER-HQ-CAPCUT.md` | hanya jika finishing CapCut diminta |

## Skill selector
Satu MotionGraphic Studio Director (bila skill benar-benar tersedia). Jika tidak, enam dokumen inti cukup sebagai fallback. Gunakan `docs/SKILL-ROUTING.md` untuk pilihan spesialis; prinsip Opuscar sudah masuk Motion Direction, tidak perlu membaca adapter berulang. Jangan instal skill atau dependensi saat produksi biasa.

## Batas baca dan laporan
Jangan membaca ulang seluruh koleksi docs, riwayat patch, semua skill, atau seluruh project yang tidak relevan. Snapshot, patch audit, contoh dan tutorial adalah referensi, bukan instruksi aktif. Hanya klaim uji yang dilakukan. Jika ZIP/source tidak dapat dibaca atau render tidak tersedia, laporkan. Untuk video aktif baca board penuh setiap kali, tetapi tampilkan penuh hanya sesuai kebijakan `docs/SCENE-VO-ACC-WORKFLOW.md`.
