# Motion Direction v3.0 — Catatan upgrade & QA

Base: `MotionGraphic-Studio-FULL-v1.8.1-20261126-014433.zip`. Engine tetap 1.8.1; Remotion 4.0.538.

## Pemasangan
Backup Master atau minimal file pada daftar di bawah. Bandingkan SHA-256 base bila file lokal pernah diedit; jangan Replace apabila berbeda sebelum menggabungkan perubahan. Ekstrak ZIP ke folder sementara, salin isi ke root MotionGraphic-Studio dengan Merge/Replace. Tidak ada penghapusan file, patcher, instalasi dependensi baru atau perubahan project existing.

Untuk ChatGPT, salin isi blok pada `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` ke Project Instructions dan unggah dokumen motion/skill relevan ke Sources. Skill lokal tidak otomatis terinstal ke akun.

## QA yang benar-benar dijalankan
- Node 22.16.0: 49 selected tests, 46 PASS, 2 FAIL baseline (sama pada ZIP asli), 1 SKIP. 7 test baru Motion Plan PASS.
- Dua FAIL baseline: Easy2Boot scene 02 & 05 draft captions no shared dynamic node; final subtitle mode suppresses S01/S02 draft captions and is present in segment preview. Tidak diperbaiki karena source ACC di luar scope.
- production-scope --check: exit 1 pada base dan upgrade, output identik. Warning pemetaan scene/approval existing, ERROR referenceSceneId sample-startup-windows-director. Tidak diubah.
- Syntax check kedua tool JS PASS; perbandingan semua file: seluruh project/src/library/public dan package files identik, tidak ada file hilang.
- Tidak ada node_modules di ZIP; full npm test, typecheck/bundling, GUI Windows, render MP4 dan listening QA tidak dilakukan. Validator hanya metadata/declared bounds, bukan deteksi seluruh collision actual.
- Tidak ada reusable camera runtime baru atau ASR otomatis. Aturan mengarahkan produksi oleh agent; strict gate aktif jika kontrak baru dinyatakan.

## File baru/berubah (SHA-256 base untuk cek konflik)

| File | Status | SHA-256 base |
|---|---|---|
| `AGENTS.md` | Update | cb7230181dada43f659d2012bfd25c711fc22ad7310f45d734531344a9f68ab8 |
| `CHATGPT-READ-FIRST.md` | Update | e6ddc2fb70e339b000b75625c7ab2737b48d5ceb408c81aac96574df44f8c766 |
| `PRODUCTION-RULES.md` | Update | 7903cc3ba5e969092bbc563b568fcb57d65cfffe5fcabcb44e13fdf05aeb9bbc |
| `PROMPT-PROYEK-CHATGPT.md` | Update | f81d64f72dba5065df17cd60bbc793f0b02e27b4478ca295b2e6d94a49724635 |
| `README.md` | Update | 850bca8dc92fb843781bb47f12a31c3794703781cd9139938fc996ddb3183abc |
| `contracts/addon.schema.json` | Update | 1838d1a9886a69084066e554124c2e63c594aaed0975184db9bf32038a78956a |
| `docs/AI-PRODUCTION-WORKFLOW.md` | Update | f646bf1d9cb601b1d9acda80aa0781575a71c6b00203a5a64bcbb28b82a416e3 |
| `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` | Update | ae25e87240b5b5af7caa8348a910bd59f64f6101c876fba09518736f0236e03b |
| `docs/CHATGPT-PROJECT-REFERENCE.md` | Update | 6306e94625e08976414ca03e3167279bfb95bbd314355265c6d6335040ab756f |
| `docs/EDITABLE-CONTRACT.md` | Update | 90d27b689a3b4df06f625ffb2ec0e49aba2b036a7fd7f21514423fc6f4abd7f9 |
| `docs/MOTION-DECISION-MATRIX.md` | Baru | — |
| `docs/MOTION-DIRECTION-RULES.md` | Update | d1a1e77782dab8cc26123cfbd3ebbc4f4946c9d332fc2780d2f687193a8a93c4 |
| `docs/MOTION-PLAN-CONTRACT.md` | Baru | — |
| `docs/MOTION-VOCABULARY.md` | Baru | — |
| `docs/PORTRAIT-CAMERA-STANDARD.md` | Baru | — |
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | Update | 417ae0d0d0b04a27d6f2841b7f813f5acffa6960b93034f1a2cbc465a36a509c |
| `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md` | Update | 6752f42676160fd084def20663bb3c4cff6218949da34b66cc20f8c758e7a590 |
| `docs/WORKFLOW-VO-UNIVERSAL.md` | Update | 709e3a918e780dfa416dbd2344362f16342255a4ad0fe1ff435fdd27614e39ac |
| `skills/motion-continuity-director/SKILL.md` | Baru | — |
| `templates/addon-starter/README.md` | Update | 5c10c1b65e4f0c1542cbf858d57fe2cb44c108589b76158fc3b3206d2a7bc181 |
| `templates/addon-starter/production/MOTION-PLAN.md` | Baru | — |
| `tests/motion-plan.test.mjs` | Baru | — |
| `tools/qa-motion-plan.mjs` | Baru | — |
| `tools/validate-addon.mjs` | Update | 44be744afbab263040d9ce3e9e2acb8014decc49dbde765c65cf4b3fec7030b1 |
| `docs/UPGRADE-MOTION-V3-QA.md` | Baru | — |

## Cek setelah pemasangan
`node --test tests/motion-plan.test.mjs tests/design-system-contract.test.mjs tests/addon-guardrails.test.mjs`

Untuk add-on baru setelah narration lengkap: `node tools/qa-motion-plan.mjs projects/<slug>` dan `npm run addon:validate -- projects/<slug> --strict`. Kemudian preview/QA biasa sesuai Master. Project lama tidak perlu dibuatkan plan baru.
