# Master v1.9.0 — Release & production integration audit

Base: `MotionGraphic-Studio-FULL-v1.8.1-20261126-015140.zip`. Upgrade instalasi yang sama, bukan Master/renderer baru. Master 1.9.0, Motion Direction 3.0, Project Rules 1.9, addon contract 1.0.0, editable studio-direct-v4, motion plan focus-driven-v1; Remotion & CLI tetap 4.0.538. Package/lock root version dan capability diselaraskan; tidak mengubah dependency graph atau versi package eksternal.

## Pasang aman
Tutup Studio/watcher. Backup folder Master, terutama file pada daftar SHA-256 di bawah. Ekstrak ZIP perubahan ke folder sementara, copy isinya ke root Master (Merge/Replace). Bila checksum file lokal berbeda dari base, review diff dahulu. Tidak ada penghapusan atau perubahan source/ACC/manifest project existing. Tidak perlu npm install/ci ulang semata-mata karena perubahan nomor versi jika dependency sudah tersedia. Bila belum tersedia ikuti workflow instalasi Master. Jalankan:

```cmd
npm run release:check
npm run doctor
npm run check:sync
npm run validate
npm run qa:motion -- --all
node --test tests/release-motion.test.mjs tests/motion-plan.test.mjs
```

Kemudian `npm run dev` bila ingin membuka Studio. Gunakan `npm run zip -- --studio --full` untuk arsip lengkap baru; export Master mengambil versi dari package.json dan memeriksa konsistensinya terlebih dahulu. Tidak mengubah nama file ZIP lama. `npm run menu` opsi 15 = QA Motion Plan semua project; 16 = cek versi release. QA/check manual mencakup kedua gate ini; startup/sync legacy tidak diblokir oleh absennya Motion Plan. `npm run qa:motion -- --all` SKIP legacy, bukan PASS project. Untuk video baru sebelum delivery `npm run addon:validate -- <folder> --production --syntax`; flag ini eksplisit, import/sync lama tetap kompatibel, bukan jaminan semua import baru dipaksa memakai kontrak. `--production` mewajibkan deklarasi motion dan editable; `--syntax` memerlukan TypeScript lokal. Salin Project Instructions terbaru secara manual ke ChatGPT.

## Hasil QA aktual (Node 22.16.0, npm 10.9.2)
- Full npm test base: 135 test, 118 PASS, 11 FAIL, 6 SKIP. Upgrade: 139 test, 129 PASS, 4 FAIL, 6 SKIP. Tujuh kegagalan fixture integrasi diperbaiki dengan menyertakan qa-motion-plan.mjs pada clone test yang semula tidak lengkap; tidak mengubah assertion lama. Empat test baru release gate PASS; total 11 test khusus release/motion PASS.
- Empat FAIL lama tetap terbuka: Easy2Boot subtitle S02/S05 native, penekanan track final vs draft, S01 native text callsites; Shutdown test mengharapkan 9 segmen sedangkan manifest terbaru punya 11. Tidak mengubah source/ACC atau melemahkan assertion. Perlu audit khusus, bukan otomatis menyesuaikan angka atau source demi PASS.
- Release check, doctor, check:sync, scene approval board --all --check, library validation PASS: 5 project, 41 segmen, 44 rujukan aset asli; mirror belum ada di ZIP, sync sebelum preview/render.
- Seluruh 5 project memiliki narration beats contiguous 0..durasi manifest; belum ada manifest yang mendeklarasikan Motion Plan. Batch QA: 0 PASS, 0 FAIL, 5 SKIP. Tidak dimigrasi otomatis. Scope check masih exit 1: referenceSceneId sample-startup-windows-director tidak ditemukan dalam manifest dan ada review mapping state ID lama (termasuk PCUnlocker); board fresh tidak membuktikan metadata approval sepenuhnya cocok.
- Tidak ada node_modules pada ZIP. Belum diuji: dependency install, TypeScript bundling, Remotion Studio GUI/Save/reload, preview/render MP4, audio listening, hardware Windows. Node test statis bukan bukti produksi visual.

## Audit gap produksi dan prioritas berikutnya

| Prioritas | Kebutuhan | Kriteria selesai |
|---|---|---|
| P0 | Rekonsiliasi approval existing | Mapping ID scene terbukti satu-ke-satu, decisionLog/lock dipertahankan, tidak mengubah ACC atau VO. Audit dan persetujuan terpisah. |
| P0 | Perbaiki empat test yang masih gagal | Periksa source, kontrak dan test aktual, uji subtitle single track/native dan timing 11 scene; tidak sekadar ganti expected value. |
| P1 | Reusable portrait virtual camera | Prototype add-on baru, world/screen space, shared pose global, fit/pan/zoom/hold, hotspot tepat; full/segment boundary sama, source/Props/native editing diberi label dan diuji GUI. |
| P1 | Spatial/visibility QA | Protected bounds terproyeksi dari UI/camera, inspeksi setiap frame di area target kritis; overlap native UI disengaja dapat diizinkan. Declared focusSamples saat ini hanya sampling metadata, bukan DOM/MP4 collision. |
| P1 | VO beat alignment & retiming | Satu narration source; draft → rekaman aktual → alignment frasa → review manual → sync motion/subtitle/SFX, scene locked perlu izin. Hash stale terdeteksi; tidak auto-approve. |
| P2 | QA render yang sadar intent | qa-render.mjs saat ini menandai hampir diam >1 detik; hold baca/cover 1–2 detik memang dapat disengaja. Bedakan planned hold dan dead zone dengan evidence aktual, jangan matikan detektor global. |
| P2 | Production readiness report | Satu laporan read-only per slug: version, contract, native/layer/sound/motion/static/render/listening/ACC; NOT RUN berbeda dari PASS. |
| P2 | Asset/UI evidence | Library reusable asset legal, UI reference/version, cursor hotspot, cue/omit dan provenance; hindari flatten serta duplicate/obsolete asset. |
| P3 | Preview regression & retention | Fixture UI netral baru, contact sheet dan frame boundary, uji readability 9:16, bandingkan retention publikasi bila data diberikan; tanpa klaim prediksi performa. |

Semua butir di tabel adalah roadmap, bukan fitur yang sudah diimplementasikan. Release ini menyelesaikan integrasi versi, gate produksi dan fixture pengujian. Engine camera, collision runtime, ASR dan migrasi ACC belum dikerjakan. Jangan mengubah kontrak lama tanpa pengujian kompatibilitas. Jangan memasang custom skill ke akun dari ZIP; dokumen skill adalah fallback produksi.

## File perubahan dan checksum base

| File | Status | SHA-256 base |
|---|---|---|
| `AGENTS.md` | Update | efe7bfc9b985bccd42f0668bd173a4e4a4cb5fe86990d04952c67808ee3502b5 |
| `CHATGPT-READ-FIRST.md` | Update | 578bc28cd1d5226c97809f51798f5674b9602db10b8592aa233b89fbaaeafef3 |
| `PROMPT-PROYEK-CHATGPT.md` | Update | 43af41763547d17e9fa501e0b5fad4d5c0ca3dd21ec1f126193d69f1addfa1ca |
| `README.md` | Update | 93838342b6dfd3d9ab86f3327d31937ea35fd4838c1c1db92a46279664c59325 |
| `contracts/studio-capabilities.json` | Update | eeb993366b5c8f9cc789dfcba7d9a34b68319b19cd8b14b0b581db1bdc61a867 |
| `docs/AI-PRODUCTION-WORKFLOW.md` | Update | 8d9f9bb5dfd729069d054aca5e27f792a093ce271d28510ddc239298b35be0ad |
| `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` | Update | 3d6d08561b183846824452820621e95a22cb5e50cd5d366057dfdc9ed3085d4d |
| `docs/CHATGPT-PROJECT-REFERENCE.md` | Update | 48396877c20fb61676bd6d5a67367efd224bfc3558fca4b54eb3bd379acd0732 |
| `docs/MOTION-PLAN-CONTRACT.md` | Update | 57d33de72b5711b4321a69b26b8f82375616c709373ebd672fd5f28bf451ab2d |
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | Update | 5c7ffd8a6dc955f45f1247338caa0b8f171c7f1b86da30ff22622dd3dc87409b |
| `docs/RELEASE-1.9.0-AUDIT.md` | Baru | — |
| `docs/RENDER-HQ-CAPCUT.md` | Update | f643085e790c6acae48b63b4196e3de7a4c759527653ae6ea2872c53b13bcbd9 |
| `docs/SOUND-DIRECTION-RULES.md` | Update | 6dbe6b26249228b1cef69e703e2f2a20fe4775e77a906c22b7173b06b12cacd7 |
| `docs/USER-FLOW-CHATGPT.md` | Update | f40e5eb7d291d558db95ea1e2991c0464e6e5c63bc2bdbeb339aa2ccfff833f8 |
| `package-lock.json` | Update | 50702f9e5c25667e8461704a5b90595987ffa57f2ee1a718c3e2abb0381eb743 |
| `package.json` | Update | 518ed313386386a8591a98719eda75c3ea16f2c35231128711f834cfad8ddda0 |
| `templates/addon-starter/README.md` | Update | 9f7da4ef9250c80b08b8a8f2800bf8a018791bfe5806c7d7919e0721b4d1b181 |
| `tests/ai-addon-pipeline.test.mjs` | Update | 7122c09b722e4599bfe56917dfde49154e0a7b72dfe49a849ceab4eee8e2ee81 |
| `tests/empty-master-recovery.test.mjs` | Update | 5d2f53a4f01725949b3c272053facbc2f8ace85ad819812ea012814b80332030 |
| `tests/import-export-integration.test.mjs` | Update | 797dc55e7cc51f56d388486c250698477e0126aa6f6474663a0ddbc5b0ca77f1 |
| `tests/release-motion.test.mjs` | Baru | — |
| `tests/scene-editor-mode.test.mjs` | Update | 7b2b2aea093d816d6c967971a2d3f2bf95800309fa1ccb4a2a3bd3faff8f0c92 |
| `tests/voice-guide-safety.test.mjs` | Update | 72faaaf5143548c835b1fa77013b224379288f5fc97bc2d42e0d72ea3e3cddb9 |
| `tools/check-release.mjs` | Baru | — |
| `tools/project-flow.mjs` | Update | e68ea37b128cfcbc9e108d57228bce8706e4d537c85929ecc1bc41115f7f97fe |
| `tools/qa-motion-plan.mjs` | Update | e28eb0afa5d7d701fab62d0ed231fe97a9d874a9d7bdb01fd8d9ea6a94dceac0 |
| `tools/studio-check.mjs` | Update | a752cc0034a25870c476ecbe4c0d094f2a59a43eba095bca0c3482e3e94f071b |
| `tools/studio-menu.mjs` | Update | 9e02b2128c26ff773d01405509d9737bc163be9ebbfc0a8d18c12fc94386ec75 |
| `tools/validate-addon.mjs` | Update | 36129e80774f418bdcbb6df5aa8c712d21d6894e68915fa1b2acf6b2277722fb |
| `tools/zip-video.mjs` | Update | b9fadce89465d492c6147ee2218bde47f0c7568a25bde43e5e31d65d84e8d856 |

30 file baru/berubah; 466 file base identik. Tidak ada file project/src/library/public yang berubah.
