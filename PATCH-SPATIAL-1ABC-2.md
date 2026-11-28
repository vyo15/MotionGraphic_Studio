# Patch Spatial Intelligence — Phase 1A / 1B / 1C / 2

Base: MotionGraphic-Studio-FULL-v2.0.0-20261128-053311(3).zip
Base ZIP SHA-256: 896ac903e4fc8f18f610e429f7a4a17ca1b734f57cd641a6bb32fb57c48e18b7

## Install
1. Tutup Studio. Backup Master beserta projects dan local edits.
2. Ekstrak ZIP patch di folder terpisah. Bandingkan base SHA tiap file di daftar di bawah (Get-FileHash di PowerShell); jika file lokal berbeda jangan replace secara buta.
3. Copy isi folder patch ke root Master, Replace hanya file yang sudah cocok base. Tidak ada penghapusan. Jangan copy README patch bila tidak ingin menyimpan log di Master.
4. `npm test` lalu `npm run sync` dan `npm run dev`. Jangan lanjut render jika font/aset hilang.
5. Buat pilot draft baru dengan scaffold, lalu jalankan command capture dalam docs/PRODUCTION-TOOLKIT.md.

## QA / batas
- 195 lulus, 2 gagal, 7 skip dari 204 test suite pada Node 22.16 dengan TypeScript global via NODE_PATH; 2 kegagalan direproduksi pada ZIP asli: auto handoff dan pilot karena 8 file font Sharing Printer LAN tidak tersedia di project/public/fonts (meski library official ada). Tidak menyentuh enam project lama sesuai ACC. Pulihkan font yang memang dimaksud setelah verifikasi backup dan izin, jangan substitusi.
- Starter: 600 frame deklaratif, Sharing Printer LAN: 3317 frame deklaratif lulus. 7 test baru non-browser lulus; 1 browser test opt-in gagal timeout ketika dijalankan (Chromium tidak menyelesaikan dump DOM). Browser fixture bukan Remotion runtime.
- Tidak ada dependensi baru. npm ci tidak berhasil menyediakan renderer dalam sandbox. Capture Remotion, GUI Save/reload, pixel rendering dan audio belum terverifikasi. Phase 2 implementasi source/pilot belum runtime ACC; jangan menganggap selesai end-to-end.
- Phase 1C fingerprint membuktikan input saat QA, bukan provenance. Phase 2 AABB dan Range aproksimasi, belum occlusion/pixel-perfect clipping, cursor hit validation, auto reflow atau full/segment parity test nyata.
- Tidak ada project, ACC, Root, catalog, mirror, package atau aset berubah.

## Daftar perubahan dan base hash
| File | Base SHA-256 | Patch SHA-256 |
|---|---|---|
| `contracts/spatial-profiles.json` | BARU | 49d49c5ef58a915cc35a5ce6173e1de6f4b6b4498c568800ade7c0642ab14ddb |
| `contracts/studio-capabilities.json` | 3fdbe678494db2e793a77f66a0b79955e948a4d7e29b4092e0cf104582cdf803 | 19492a786c641ac898a30b98fe8438b958253597b56fceab220b0844f9f76381 |
| `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` | ee8d63fb4afe7aff431a2bbe004e0195320952631e407c191e520e0647511c5e | d7ff738d64b47df98e93cac8bbe276744a68f75778bc8140c7a38a1cdcc69f03 |
| `docs/PRODUCTION-TOOLKIT.md` | f4909a52e27fad9de95971ead58ddb2d72ebdb0cf2b937a4a9f008afc0d48796 | 223179935b081a21d57466169ab68971024eeecdc3283abd5f44493a13b9a1b6 |
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | f5f3a22435a44e756d92fb2a484a5e9a41004c41f95e30986d8bd728df50b1cd | 94edc7a8e3248090262bead7a02bdad7a11a4aa20ac0f7d17ad1dd5fa2461ce9 |
| `templates/addon-starter/README.md` | b276a441bd291d956e0ec57bcc8b8d7378a1d4f664f3c28ea82fb59333ef8567 | 8e7adbd21a5e3a3e146bfc5a322f6bdbc34cf20c0418ad423bb02945a865a021 |
| `templates/addon-starter/production/spatial-plan.json` | c5259bb5e5f5049e7f49e885d8afaad844c45818e11d52d7f77c0d780d2fa6ce | bdf235aa52aae22b16b8e731a35da94a4fa24882f089ff23c10ee94e2a398e14 |
| `templates/addon-starter/src/SegmentVideo.tsx` | af4137090abcd529b784695936e4061b755fda359c3691710b374b49e22ce42a | a47d2fe1ce75e9cdfbb8830e627ff81273e4f4650f21f68ad9cccd6ba6027125 |
| `templates/addon-starter/src/Video.tsx` | 0fbfdeaa14b31d69ca3b42b240592f5ed5c1ce014b30c517d823174f374c7602 | 4be69a0096303bb0b1b0778142a5d814f27dba9a52fd6d6bfe17069eebf14d68 |
| `templates/addon-starter/src/components/EditorialBackground.tsx` | efd237a17fb3068ab25d1c29bae93ac8225212ac7b11d5e4d8483a80f1047962 | 6d8d4a5a96739ec3fcefe60433086e634d8d0c7b98971233a582c7642fd86a82 |
| `templates/addon-starter/src/components/SafeZoneGuide.tsx` | 54a013f7cd123cdf63ca1190e3801c5848c15d104929e65a6af99c924b4587bb | a8c54e8349fcabed9f099c224bb5de00a222461e8ac1285f016ae84f74506b13 |
| `templates/addon-starter/src/config/design.ts` | e9a9ca5e511a30a7e304a7c01d8305c20bced131eeb006a63f53940d368edfb8 | ada05828156830a82874f0f3c24cc6dc8e9ad0a925e0597f73be7d7e827e418a |
| `templates/addon-starter/src/qa/SpatialProbe.tsx` | BARU | c1da4af3eb9d95286557b2f5ab7bfe5595871118bd18d4ea2dff6fea69783d41 |
| `templates/addon-starter/src/qa/capture-spatial-frame.d.mts` | BARU | 563f4f97f52bf58c26e6afee811aedf300ca5a8732a7d319fb6f691514e98fc7 |
| `templates/addon-starter/src/qa/capture-spatial-frame.mjs` | BARU | 2ef7d546fecfda4de1460aef4ed99223aa667c15a1d701cfa775f5f8c27a025d |
| `templates/addon-starter/src/scenes/Scene01.tsx` | 26154cfd5dd910d64095719a80220fff4a28852bd3f828c57faadfa6d1bcd207 | 7ce533c0a7b4b55cdbb58159eea3e822deb6bc6b98e576ca555de77660534d10 |
| `templates/addon-starter/src/scenes/Scene02.tsx` | ac34b39ddbd5f1a438a7d16264307d16be342ffce29c98f881463f9e15ab527a | 9b1d7d23989855f8629f9b75ea5652672e65585869e1b999af1a89d34418f35c |
| `templates/addon-starter/src/scenes/Scene03.tsx` | a097d20bbdb4ac9e5bf1341bd12fd1691642db4f1a51f0e7d6192e0e1a4ed2ee | b9c45295a8621dd4a00608d7be19992ea6a4c126bbe6459d5bf2344911ec6ea5 |
| `templates/addon-starter/src/scenes/Scene04.tsx` | 490814eaad8bdc1ff889b64569ce33ce5e3331e52a9d112e06ccc7c838cebb6f | 8e311d7ff33328b665272a8c4bcc2e29f12b1c2265d0c75e85001bc1309c0661 |
| `templates/production-toolkit/examples/capture-spatial-frame.js` | 964c12ba918afff2556ae430c006849fb1167cb1a96865aa2a350553c123060f | 0035e426962f2ed3a31763600c54540bd15fea630c91ff813c6c23c0f762c645 |
| `tests/fixture-tools.mjs` | d7cb57f26275f90f351117f2807c6384be8371f9f37a821af1ec24740724c237 | 389e1e9af4245a8fb28b88d38d3914ed8b66a8b57859f13a9e3eb5386b2cfc59 |
| `tests/spatial-foundation.test.mjs` | BARU | a0b6ca263ad2ed7c1982f431b67cb13194ba0e986ea8a049704224cfde2d0a92 |
| `tools/capture-spatial.mjs` | BARU | 0f318fd9bc9563849332af93ec51cc2d9c975448dcd08601ab15dff0e653d954 |
| `tools/qa-design-guide.mjs` | 6b992717843f25a2548b9d5094d52139a2cb43491a0b1388685a94aa93bc5c5b | 65376bcbbef6e6aaf458f3f9ddfb292df60ce02541a27175d87eea76c94abded |
| `tools/qa-motion-plan.mjs` | 0de1cff8ca72a1d68215193e5ce7eb08bef78b2b4962eba734e86028e0738ddf | eaa2d011b87b02be81594fa2743155c954350cffa8943f1e0aa0a45c05d47fd8 |
| `tools/qa-render.mjs` | d501aa4f7b19c27d08c6f1312e9bf9e7e284337f328c2d318ae784c31b0da829 | b781b7086e13757c60fc6404e27c7513c0e871f9a25de7717ca7f359645be862 |
| `tools/qa-spatial-trace.mjs` | 190925798684d4d418c1b2ecfd854e347738ae00fc44a16c599cf3cd5eb1b21e | 9ca7a6fad37908acf182e07ebe94015214d2b29241ae73c90dd9c4864fe98f46 |
| `tools/qa-spatial.mjs` | f16cbf015ff073f6954f9758b14dfcb48b31ae02aa91d48d13110e56eac22dc6 | 1ad9dec67be095970f1523456336d69b140586ce5f668897945bcce8a01694bb |
| `tools/scaffold-addon.mjs` | cdce12e4dd2d98bf0937d3fd66f02b5ff687c16df79a9fbeafb4a08abc0a551b | e2b1ec48558a06f9816f98a4948ee921e3ab50dc2cf296ac1cfe15deb210d63e |
| `tools/spatial-contract.mjs` | BARU | f36d6cac8d5cee88c13f4c3f229b4692d1b0bb9bfded62fd7db3a89259a31e83 |
| `tools/spatial-evidence.mjs` | BARU | c9e7480e953e394fa44d10c845ee2013b1f98c83305b77ed8c2dc8b5be1e2c6a |
| `tools/spatial-profiles.mjs` | BARU | 583808c9ac2d59b11d69c66601a3c7202b203c313f2e4186a1683f0c56b9e330 |
| `tools/spatial-sampling.mjs` | BARU | 305702528b15d8f18a34595febe445c21a430a34c3d113e0ecc0b95a044cee68 |
