# PATCH SPATIAL INTELLIGENCE 01 + 02 — Master v2.0.0

Baseline: MotionGraphic-Studio-FULL-v2.0.0-20261128-064622(1).zip. Paket gabungan 2H + 3A–3F. FILE CHANGE ONLY: 20 file diubah, 3 baru, plus dokumen pemasangan ini. Bukan Master baru. Tidak ada penghapusan atau perubahan registry/dependency/project aktif.

## Pemasangan dan perlindungan edit lokal
1. Tutup Studio dan semua job render/QA. Backup root Master ke lokasi terpisah.
2. Ekstrak ZIP ke direktori sementara. Periksa SHA-256 file target terhadap kolom BASE sebelum copy. PowerShell: `Get-FileHash -Algorithm SHA256 -LiteralPath 'tools/spatial-contract.mjs'`. Jika berbeda, jangan replace: simpan file lokal dan rekonsiliasi terlebih dahulu. File BARU harus belum ada atau identik dengan hash BARU. Jangan timpa file lokal yang berbeda.
3. Copy isi ZIP ke root Master (folder `tools`, `templates`, `tests`, `contracts`, `docs`, dan file root). Replace hanya setelah pemeriksaan konflik. Jangan taruh ZIP ini di inbox add-on.
4. `npm run dev`: jalur existing sync, regression, Studio dan auto spatial sampling. `npm run prod`: preview ringan (hasil sync terakhir). `npm run menu` → 17 QA Spatial → pilih project yang sudah instrumented; sample preview/full preview/full final atau declared. Jangan menjalankan full scan dan auto capture bersamaan; cross-process queue adalah Phase 5.
5. Untuk membuktikan runtime, uji satu add-on BARU dari starter terbaru. Pastikan review gate, capture sample, full preview, full final, full/segment dan Save/reload berjalan di PC. Jalankan render MP4 dan review frame. Keenam project lama tetap legacy dan bukan bukti capture v3. Jika menggunakan probe v2 dari video lain, upgrade hanya dalam revisi terarah, tidak dipaksa oleh patch ini.
6. Periksa `qa-out/<slug>/.../report.json`, `trace.json`, `review.html`, PNG asli dan SVG anotasi. Status WARNING memerlukan review; PASS_SAMPLED tidak sama dengan PASS seluruh frame. Capture yang belum selesai tidak memberi kelulusan. QA tetap read-only terhadap visual. Jangan menjadikan laporan sebagai ACC.

## Implementasi dan sisa pekerjaan
| Scope | Source tersedia dan regression yang dijalankan | Belum terverifikasi / batas |
|---|---|---|
| 2H | Validasi profil, kontrak `screen-space-v1` + `visual-intelligence-v1` pada review baru; role, identity, visibility, fade window, metadata, trace v3, validasi bounds/rect/scope, fingerprint preset/context, invalidasi perubahan source, compare full/segment | Capture nyata dan parity visual, actual browser runtime, glyph fallback per karakter; metadata tidak merupakan bukti asal render. Identitas runtime tercatat; freshness runtime perlu konteks pembanding yang benar. |
| 3A | AABB, convex quad jika tersedia, active frame, role, gap, containment, bounded overlap, area/fraction, interval | Arbitrary SVG/nonrectangular shapes dan kompleksitas CSS memerlukan review visual. |
| 3B | Sampled paint/hit order, visibility, opacity, full-cover geometri solid rectangle, partial/unknown/combined coverage candidates, clipping ancestor aproksimasi, untracked candidates | Bukan engine pixel/glyph mask. Clip-path, filter, shadow, gradient, stacking kompleks, pointer-events:none, dan raster membutuhkan pembuktian visual. Union area merupakan kandidat geometri, bukan persentase huruf tertutup. |
| 3C | Hotspot + visible target, click/action marker, response state, endpoint drag/selection, cue metadata, exact action sample | Tidak membuktikan seluruh lintasan drag/selection dan UI response visual kompleks; tidak melakukan listening QA. |
| 3D | DOM Range text rect, clip/overflow, font readiness/family, effective font size dan line count, estimated contrast, guide gap, duplicate/silent subtitle, preset resolver | Font aktual per glyph, arbitrary masks, kontras background kompleks, audit letter-spacing/line-height visual mendalam, simulasi keterbacaan HP belum lengkap. |
| 3E | Transform-aware capture, convex quad, clipping, cover crop, adaptive event/fade/risk windows, full scan | Spring/camera/transition nyata masih perlu pilot; risk window harus dideklarasikan, sampling bukan full verification. |
| 3F | Kode/severity, frame/scene/layer/source, intervals, JSON + HTML review + PNG originals dan anotasi, event-based contact sheet | Bukti screenshot runtime belum dihasilkan di lingkungan ini. Evidence index lintas sesi/handoff, shared queue dan final render gate berada di Phase 5. |

Phase 4 Smart Layout Assistant dan Phase 5 Automatic Quality Gate bukan bagian dari paket ini. Tidak ada reflow runtime, auto fix source, atau perubahan keputusan ACC.

## QA yang benar-benar dijalankan
- Baseline suite lama: 211 pass, 0 fail, 7 skip (218).
- Setelah patch: 244 total, 237 pass, 0 fail, 7 skip. 26 test tambahan spatial-intelligence lulus. Suite standar memakai TypeScript yang tersedia di lingkungan lokal, bukan npm ci penuh; Remotion bundler/renderer tidak tersedia.
- Explicit optional Chromium DOM fixture: gagal (timeout 20 detik, tidak menghasilkan data). Ini di luar suite standar yang men-skip fixture tersebut. Runtime belum terverifikasi.
- Spatial QA deklaratif starter: 600 frame; Sharing Printer LAN: 3395 frame. Library: 6 video, 51 segmen, 71 referensi, 0 masalah aset sumber. Mirror generated tidak dibawa dalam arsip; sync diperlukan di PC.
- Native GUI drag/resize/Save/reload, Remotion browser capture nyata, MP4 render dan visual/listening QA: belum diuji. Tidak mengklaim 100% lulus runtime atau semua 122 butir selesai penuh.
- 446 file projects/ identik byte-for-byte. Semua file original di luar daftar perubahan tetap identik. ZIP testzip dan daftar path dicek.

## Daftar perubahan dan checksum
`BASE` = hash file asli yang boleh direplace, `NEW` = hash hasil patch. Hash arsip baseline: ac2d36ccf66263e3ca97b31f199ee421e26288854249f91e270ad77c095f8e30

| Path | BASE SHA-256 | NEW SHA-256 |
|---|---|---|
| `PRODUCTION-RULES.md` | `febfbbee8c5d0c6b4de5eb98ed5961778f1b9a83407099fae1524223bcf2bbd4` | `9e1803fa0285f632f5c1e6e9c4fd5fe9786976204ad7ef4b7c7dd5cee5b160d7` |
| `contracts/studio-capabilities.json` | `ee2b26b6edc977e6017b1447220220dee6972280af88f30908fe23a4f91081cd` | `13a2c1e14ea2bf272328e81adb65ac37cfa9ff6b00eaa83dfdd35f00d6ea7a15` |
| `docs/PRODUCTION-TOOLKIT.md` | `d466829ea93d106488b0d8434dea7325af2e3ef2c6cbe90b19403b43653fdfd9` | `936a0db535a9559f220090147c45df7a0a41aa6e23122bc30c6daea4be6e956c` |
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | `cd607b9663a42f0f9ba656cecd9068b270356d60febf6b16d24544a5da43ca97` | `4527d16b8281146160e3464e5f3782f4787be663812f86da091bd3e61e19a4bc` |
| `templates/addon-starter/production/spatial-plan.json` | `bdf235aa52aae22b16b8e731a35da94a4fa24882f089ff23c10ee94e2a398e14` | `ba20cee0acd760bf0b19afb57b3a9e1a2d37c316ebfa19acc4b29ad9b77b800b` |
| `templates/addon-starter/src/qa/SpatialProbe.tsx` | `c1da4af3eb9d95286557b2f5ab7bfe5595871118bd18d4ea2dff6fea69783d41` | `340ed561b95467bbf20d51bca3f1f43857c66ab9b8c51a2d3e8b6d97ede73303` |
| `templates/addon-starter/src/qa/capture-spatial-frame.mjs` | `2ef7d546fecfda4de1460aef4ed99223aa667c15a1d701cfa775f5f8c27a025d` | `0fcd0f1183777bdcff21819b2a97731765dd459734b4b95b71de65f7a9c069be` |
| `templates/production-toolkit/examples/capture-spatial-frame.js` | `0035e426962f2ed3a31763600c54540bd15fea630c91ff813c6c23c0f762c645` | `bed51e3b7d3214ab0a629a5a9d95b8a31f186b022b42870c3fc536582465f06b` |
| `tests/compact-layout.test.mjs` | `71a159cf5759df6b2c05329f0b877f1479f6bf344023fa843a5805e78043f1e5` | `d4c8b41b21e7e3fbdac09ea18c5bc10d7a972befc4c6609e2378ae70bb8a9190` |
| `tests/spatial-intelligence.test.mjs` | `BARU` | `1138e804acc595e9e5633e010c19bc0025bc41b132e9f8ab69a6c47c61dd1653` |
| `tools/auto-spatial.mjs` | `affc58405a20fdd9170dda06b5aba02f5f372d9927c23d58dc097568336bab9e` | `80b306df87c4968d714701e3fc7deb593110bd33bfa6dcfc5b7287c48cf72f8d` |
| `tools/capture-spatial.mjs` | `0f318fd9bc9563849332af93ec51cc2d9c975448dcd08601ab15dff0e653d954` | `77f986cddd0dc2c9eccc6927a71531e428bf35f35e99f8c66301a52752dc1b04` |
| `tools/qa-render.mjs` | `b781b7086e13757c60fc6404e27c7513c0e871f9a25de7717ca7f359645be862` | `125fc4621f59399e435cf76f7dbc2c7e528b93a104b8757dbd9a01534e90f532` |
| `tools/qa-spatial-trace.mjs` | `9ca7a6fad37908acf182e07ebe94015214d2b29241ae73c90dd9c4864fe98f46` | `ea97034c973f9973d1d533bf72efc6700774c1d9008f50f44077130f3dcedd3e` |
| `tools/qa-spatial.mjs` | `1ad9dec67be095970f1523456336d69b140586ce5f668897945bcce8a01694bb` | `d79063df378ad4d3f37135ca610f8fda794aaeb8315b22f10d3f0c0422106fcb` |
| `tools/render-profiles.mjs` | `0809285ff131d1a51e23936111d3f2ea0fbdcb4680a938400b1a88ab3d1ba610` | `d59f8eb3b694492e67294502c34f6a589afe787fcf4933c08b367bcc393acf97` |
| `tools/spatial-collision.mjs` | `BARU` | `793274050e008dbf0f69b699bd3f6a36c7855193da51650fc2e41b2b1952eca4` |
| `tools/spatial-contract.mjs` | `f36d6cac8d5cee88c13f4c3f229b4692d1b0bb9bfded62fd7db3a89259a31e83` | `359d4c7309795bc8c774baf06894b15db8ae20e809e0cf0d3c496b29a9671136` |
| `tools/spatial-diagnostics.mjs` | `BARU` | `0744f5700f2d04f749a13a25c7ee09f738927d5779cc24476c8cbd70f7d5308f` |
| `tools/spatial-evidence.mjs` | `c9e7480e953e394fa44d10c845ee2013b1f98c83305b77ed8c2dc8b5be1e2c6a` | `ca943f95a090b8b33db4bfc71f114c484b3c39e325996984ed90c03dc9d68fc9` |
| `tools/spatial-profiles.mjs` | `583808c9ac2d59b11d69c66601a3c7202b203c313f2e4186a1683f0c56b9e330` | `91b4167e192f9afc717b285eb0d6d0e9f4ff616a494dc0aba738a6425400b2ef` |
| `tools/spatial-sampling.mjs` | `305702528b15d8f18a34595febe445c21a430a34c3d113e0ecc0b95a044cee68` | `f13a642d6c32bf4424d8be4762f911c49ae526a550418ff217a24bd669f57c75` |
| `tools/validate-addon.mjs` | `268d74fa17357da375c853b01f28468a1aa30e313e63a8277de00958dc36c095` | `d898b5c87d55754dc72829853bef236029185ee45d1a32f2377f17a369a5c6f4` |
