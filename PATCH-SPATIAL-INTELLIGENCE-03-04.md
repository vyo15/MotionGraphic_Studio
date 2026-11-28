# PATCH — Smart Spatial Intelligence 03 + 04 / Master 2.0.0

Base: MotionGraphic-Studio-FULL-v2.0.0-20261128-071224.zip. Paket 01/02: 23/23 file implementasi identik dengan paket sebelumnya pada base. Patch ini root-relative FILE CHANGE ONLY (22 file implementasi/test/docs + dokumen ini). Tidak ada file yang dihapus. Tidak ada perubahan package, dependency, root generated, katalog, atau 446 file project asli (6 video/51 segmen). Tidak menyertakan font, aset, node_modules, mirror, cache, log, atau output render.

## Instalasi aman
1. Tutup Studio, QA, render, watcher. Backup Master terlebih dahulu.
2. Ekstrak ZIP di luar Master. Bandingkan SHA-256 base untuk setiap file lama di tabel di bawah (PowerShell: `Get-FileHash -Algorithm SHA256 <path>`); bila berbeda atau file baru sudah ada dengan isi berbeda, jangan replace buta: reconcile edit lokal.
3. Copy isi ZIP ke root Master, replace hanya file dalam tabel. `PATCH-SPATIAL-INTELLIGENCE-03-04.md` adalah catatan pemasangan, bukan runtime.
4. `npm run dev` untuk sync, regression, editing dan auto QA. `npm run prod` untuk preview cepat tanpa watcher. `npm run menu` untuk render/QA. Menu 17: sample/full preview, full High, declared, full CapCut. Laporan lokal `qa-out/`; Auto ZIP ChatGPT memasukkan ringkasan current-input yang bounded. Jangan edit di prod bila ingin auto QA/backup.
5. Untuk runtime pilot, gunakan project baru berbasis starter dengan font/aset lokal tersinkron dan instrumentasi v3. Menu 17 sample → full → High/CapCut sesuai kebutuhan. Review `review.html`, `layout-advice.json`, report, dan lakukan native drag/text/resize → Save → reload → capture ulang. Periksa full/segment pada frame global sama, render MP4, dan listening. Jangan menandai ACC otomatis. Enam project legacy belum mempunyai capture v3; tidak dimigrasikan otomatis.

## Implementasi
- 4A: rekomendasi optical center, translation akibat overlap/gap/clip, explicit layoutGroups untuk alignment dan spacing bersama; cek kandidat pada frame yang tersedia; jaga UI/world/parent group. 4B: text-fit dimension/font bounds dan reading-time heuristic. 4C: rekomendasi screen-space cursor/scale/layout/timing/camera, metadata native/source; read-only. Tidak menulis ulang source, animasi, ACC, atau naskah. Revisi melalui ChatGPT FILE CHANGE ONLY dengan checksum dan recapture.
- 5A: lease eksklusif lintas proses capture/render, FIFO manual dan auto nonblocking, prioritas perubahan terbaru, debounce, cancellation saat source berubah (monitor/pemeriksaan berkala), sample cache persisten berstatus CACHED_SAMPLE; memo hash watcher, strong rehash untuk bukti final. Satu bundle per capture; browser reuse lintas still belum diimplementasikan/teruji. Timeout antrean manual 10 menit; tidak menghapus lock live atau ambigu, recover hanya PID terbukti mati.
- 5B: production review static gate + fresh full scope capture untuk High/CapCut, resolver visual props sama kecuali flag probe. Preview gagal boleh diagnostik. Post-render QA memakai offset segment, event sheet, cek dimensi/FPS/frame exact untuk video baru dan SHA-256 MP4. WARNING/FAIL menyimpan MP4 diagnostik dan exit nonzero untuk final baru. Legacy tidak dipaksa capture; post QA informatif. Handoff index per preset/scope, hash report/trace/gambar, cap 12 MiB (maks 4 PNG per capture, maks 2 MiB/file); bukti lama/tampered tidak dimasukkan. Failed capture terbaru menghapus reuse PASS lama untuk scope yang sama. Ringkasan bukan bukti provenance independen.
- 5C: regression lama + 17 test tambahan (fixture/mocks, bukan GUI). Tidak ada command utama baru. 

## QA terukur
- Dari ekstraksi base bersih dengan 22 file patch: 261 test, 254 lulus, 0 gagal, 7 skip. Baseline sebelumnya 244 test/237 pass/7 skip. 17 test baru. Node v22.16.0 Linux; TypeScript host dipakai karena node_modules tidak dibundel.
- validate-library: 6 video, 51 segmen, 71 referensi, 0 masalah sumber. Mirror belum dihasilkan dalam arsip; sync/dev di PC. Release metadata PASS. Declared spatial: starter 600 frame dan Sharing Printer 3395 frame PASS (bukan actual render).
- FFmpeg fixture MP4 sintetis 1080x1920, 30 fps, 90 frame, audio sine; QA untuk segment awal dan segment offset 360 menghasilkan contact sheet, masing-masing 0 FAIL / 4 WARN. Bukan video Remotion. Uji CLI capture pilot terisolasi: exit 2, INCOMPLETE karena @remotion/bundler tidak tersedia, failure index tercatat, lease dilepas. Tidak ada actual geometry PASS palsu.
- Belum terverifikasi: Remotion browser end-to-end, full/segment actual parity, GUI Save/reload, Windows launch/performance, MP4 Remotion dan listening. Tujuh skip tidak dianggap pass. Pixel/glyph/mask dan arbitrary shape presisi, responsive reflow aktual, evaluasi density/whitespace/hierarchy menyeluruh, source auto-application/rollback, profiling CPU/RAM dan browser reuse belum lengkap. Rekomendasi tidak mengasumsikan inverse local transform; tidak ada forced layout. Tidak mengklaim 86 butir roadmap 03/04 selesai penuh atau final ACC. Direct diagnostic qa-render standalone tidak memakai lease render-menu; gunakan menu untuk workflow terintegrasi. Full/final selalu fresh (tidak memakai sample cache). 

## SHA-256 per file
| Path | Base SHA-256 (NEW = file belum ada) | Patch SHA-256 |
|---|---|---|
| `contracts/studio-capabilities.json` | `13a2c1e14ea2bf272328e81adb65ac37cfa9ff6b00eaa83dfdd35f00d6ea7a15` | `759f75e192c84e0f0c5847fafce8f85442437c9ee63ad81a1976d6531fb56c04` |
| `docs/PRODUCTION-TOOLKIT.md` | `936a0db535a9559f220090147c45df7a0a41aa6e23122bc30c6daea4be6e956c` | `93ab47dfcd93afebb614410569da658e848ffff79c0d0abb211a2a3be421b683` |
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | `4527d16b8281146160e3464e5f3782f4787be663812f86da091bd3e61e19a4bc` | `13b66956bbda6316917506a6918095284867be148e8af6da166f49a3fef388de` |
| `tests/render-modes.test.mjs` | `50b78e6429abe0066afc33e08694ef51758db48d6678a8a7e6995acda8f6da4d` | `c771a6f65c621f107d58af2aa140c6455e5bf734e142aa5fe23cc41bbb34da86` |
| `tests/render-quality.test.mjs` | `ad8501c9546392ea1375e2990366c6cec3816f0b76735baddf113626dc3fe756` | `833a1d1cd4b027ff44c23f2bf48d02d1842c6e585bff7bd3d35b52b7931c7e7f` |
| `tests/spatial-quality-workflow.test.mjs` | `NEW` | `93182410bcfd20b6037078a6b188af9dbaab69340a66fab83b0b1867093b1616` |
| `tools/auto-chatgpt-export.mjs` | `2c17165cf921746d0630b9ba79bfd450b23a2a230381294b7c40c0f98491b80f` | `0cb64eae84b4df85c6e9a2449c98fa21cdd0421dc7428efe7642842a665af6e8` |
| `tools/auto-spatial.mjs` | `80b306df87c4968d714701e3fc7deb593110bd33bfa6dcfc5b7287c48cf72f8d` | `77695d3e574544637a529596829c46946928569ec43a6789fa8f1829075ab0fe` |
| `tools/capture-spatial.mjs` | `77f986cddd0dc2c9eccc6927a71531e428bf35f35e99f8c66301a52752dc1b04` | `740ccde00c022c88c043eaa30ef603340b46c3bfda637984ab04367775ab9c08` |
| `tools/master-export-inputs.mjs` | `4b8cf8c19d9e81658a25a9fbae6067eb92a57350eeefdca89518150adc9407c3` | `f3b4d9eace540e128cef40ec12dd6cda9382cd8efc73d4df28e5c90a033e5a71` |
| `tools/qa-render.mjs` | `125fc4621f59399e435cf76f7dbc2c7e528b93a104b8757dbd9a01534e90f532` | `7f920ba3efa02d504fe76d1bfd540e967637b69f7927c1dad03cc139898a5575` |
| `tools/render-menu.mjs` | `69e986b6b805244640fdecbf48c5e0046af99947973e29bca2b62a0269a5e64d` | `4b4baa0e84ede633f4d1d35b05ef5a36ac0200784f6155751248b92bf966f728` |
| `tools/render-profiles.mjs` | `d59f8eb3b694492e67294502c34f6a589afe787fcf4933c08b367bcc393acf97` | `b981ee6696f29d51390182ac0422ecbee44f09a9d796d5e71f1e994e57ed1636` |
| `tools/spatial-contract.mjs` | `359d4c7309795bc8c774baf06894b15db8ae20e809e0cf0d3c496b29a9671136` | `844aef59cf40d2545336ca9c2f5d74f847c3bef8917e05e456885779863dde1e` |
| `tools/spatial-diagnostics.mjs` | `0744f5700f2d04f749a13a25c7ee09f738927d5779cc24476c8cbd70f7d5308f` | `9a19514a433610a21d966bed209504e096cf43f641b5d86ddc9e7cd4de1a4312` |
| `tools/spatial-evidence-index.mjs` | `NEW` | `4e20b2fee4b2a2c4f059656465661a4e375e3e19c7505815b345581a899f330d` |
| `tools/spatial-evidence.mjs` | `ca943f95a090b8b33db4bfc71f114c484b3c39e325996984ed90c03dc9d68fc9` | `5c2aaedcf5035a0060d4cd1903f37f51e9a2fcbff6e4284e24a9c56aea1b6c1b` |
| `tools/spatial-layout-advisor.mjs` | `NEW` | `92dbe3c8fac92d9856944fd6a6368336235bb918866812caf4b57a49d70efaf8` |
| `tools/spatial-queue.mjs` | `NEW` | `d8664439aa10d98e0974f740de95f392028a4afe32d01ba0766b9e334fab9f01` |
| `tools/spatial-render-gate.mjs` | `NEW` | `52a01338aea4d4caaf0f8ffbd2310502ec8b42980239ab8e73647cde40597854` |
| `tools/spatial-sampling.mjs` | `f13a642d6c32bf4424d8be4762f911c49ae526a550418ff217a24bd669f57c75` | `127f27d838ef3a8dcb57f10f3429c3c0700050f8a8d3912475047d4dd9b891ad` |
| `tools/studio-menu.mjs` | `3ad74c983bc0c8259e1cfcde83db08d734f02c91aa35013484813cced9a0f2b5` | `0b5fd73c62d8105cd450da1ac2f318462bb07ea517da7aa6296aef88a6966a9c` |

Base archive SHA-256: `2208e51b03ec4c312f144678fb282d88207012e3d7e8639b095ad6792e1425ef`
