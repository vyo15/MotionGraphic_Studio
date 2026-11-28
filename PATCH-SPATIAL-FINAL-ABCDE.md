# MotionGraphic Studio — Final Spatial A–E / FILE CHANGE ONLY

Base: MotionGraphic-Studio-FULL-v2.0.0-20261128-102954.zip (v2.0.0). All 457 original files in six projects remain byte-identical. 846 original files checked; no deletions. Only 25 existing files replaced and two tools added. All boards already fresh; no board rewrite or ACC change needed. Package scripts, dependencies, Root/index, catalog, existing video assets unchanged.

## Install safely
1. Close Studio, QA and render. Backup Master outside its root.
2. Extract patch separately. Compare each local file SHA-256 with Base below (`Get-FileHash -Algorithm SHA256 <file>` on PowerShell). If local hash is After, already installed; if neither matches, merge deliberately rather than overwrite. For NEW paths, do not overwrite an unrelated existing file.
3. Copy root-relative files into Master. The report itself is documentation. No patcher or font assets included. Run `npm run dev` (normal sync/check/test/startup). `npm run prod` remains lightweight. `npm run menu` for deeper QA.

## A–E scope and actual QA
- A: exact primary font family/weight metadata, containment even when disjoint, bounded fade/hidden, preset subtitle policy and full/segment metric parity. All six boards current; protected legacy unchanged.
- B: new compact review anchor policy and measured artwork markers; headline group follows primary object, anchor remains fixed unless motivated; read-only advice, no forced layout or source edits.
- C: bounded pointer-events-none candidate, axis-aligned plain-text reflow candidate, differential PNG isolation for up to 3 suspect text/cover pairs on manual capture (four additional stills/pair). Never waives geometric findings. Pixel contribution candidate, NOT exact glyph mask. No arbitrary SVG/mask/filter/contrast or actual font fallback certification.
- D: Remotion browser reuse within one job when available, performance metrics (Node RSS only). Staged pilot: 4 starter scenes / 20s / 600 frames, 5 diagnostic faults. No auto registration or ACC. Runtime and actual performance not certified.
- E: existing auto queue/cache/final gate retained, precision summary included in handoff index. Separate diagnostic source ZIP preserves valid LATEST. Static failure log + marker; requires filesystem hard-link capability; fails safely otherwise. Normal handoff unchanged. Windows runtime/GUI/final/actual evidence proof pending.

## Pilot and diagnosis
Menu 17: choose stage Spatial QA pilot. Copy staged `exports/file-change-only/spatial-qa-pilot/projects/spatial-qa-pilot` into `projects/` only if desired, then dev syncs. Menu 17 select pilot and sample preview (baseline). Option 6 tests `overflow`, `cursor`, `guide`, `anchor`, `occlusion` one at a time. Fault Props are temporary; only generated diagnostic draft allowed. Check expected issue status; INCOMPLETE/NOT_VERIFIED is not pass. Use full preview and matched full/segment comparison for runtime proof; test drag/resize/text/Save/reload in dev, render a diagnostic MP4 and visually review/listen. Pilot has no recorded VO or ACC; do not publish or mark final. Review `report.json`, `precision-review.json`, `performance.json`, `layout-advice.json` in qa-out. Normal latest handoff includes bounded current evidence; if static gate fails, menu 7 → 6 creates separate dated diagnostic source archive. Source-only diagnostic ZIP does not include QA evidence; attach local report if needed.

## Evidence from this session
Node v22.16.0, Linux; baseline 254 pass / 0 fail / 7 skip (261); updated 265 pass / 0 fail / 7 skip (272), including 11 new tests and extended diagnostic handoff regression. Six boards current; library 6 videos / 51 segments / 75 source asset references / 0 missing (mirror not in archive; sync locally). Starter 600 frames, Sharing Printer 3383 frames, staged pilot 600 frames PASS **declared only**. Pilot synced in isolated clone (7 videos / 69 compositions); capture returned INCOMPLETE due missing @remotion/bundler, released QA lock and recorded evidence index. Separate enabled Chromium fixture did not finish capture in 20s (failed outside default skipped suite). No actual Remotion MP4, GUI Save/reload, Windows startup, actual browser reuse/benchmark, full/segment pixel parity, normal handoff of real capture, or listening QA proven. Do not interpret synthetic regression as runtime certification. Object visual bounds and pixel differential are approximations; reflow is measured plain text only, not general typography solution. Remaining blockers require PC testing.

## Checksums (SHA-256)
| Path | Base | After |
|---|---|---|
| `contracts/studio-capabilities.json` | `759f75e192c84e0f0c5847fafce8f85442437c9ee63ad81a1976d6531fb56c04` | `b2c164ba03b5fcefdc9d462e2c53eb73345c5a24a108a091b92222e5f1b58853` |
| `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` | `98b16a00ae1e5e4d5d4a157471cc3d3a264f279c12ced4f46ddc9c82b8b2cf19` | `a26c0f2f79f80246a2db57a792cc39e25ea36a713a7ef875fe93924c5a49c815` |
| `docs/PRODUCTION-TOOLKIT.md` | `93ab47dfcd93afebb614410569da658e848ffff79c0d0abb211a2a3be421b683` | `2fcc8aef82eb0408028235778fcef6b179ddf78d651d075a3b83d7eb585ba498` |
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | `6fdc31ede85fda476ebef3dfca6bf4d59b24748dd3a013b29bfc0a05f0e8563c` | `a076eba67e480c8b257ddd70ab6c868a3db98b26ed058bffe7ea8ecef80a0a92` |
| `templates/addon-starter/production/spatial-plan.json` | `ba20cee0acd760bf0b19afb57b3a9e1a2d37c316ebfa19acc4b29ad9b77b800b` | `d004f98f19b565f71776eb929f4b55de6f1ccd0cf96a43716b44880e139d983e` |
| `templates/addon-starter/src/SegmentVideo.tsx` | `a47d2fe1ce75e9cdfbb8830e627ff81273e4f4650f21f68ad9cccd6ba6027125` | `9932d2efd1056bb635844a5567d95290fc8d0e0f6a416c044bf6096c0cb07cab` |
| `templates/addon-starter/src/Video.tsx` | `4be69a0096303bb0b1b0778142a5d814f27dba9a52fd6d6bfe17069eebf14d68` | `2676ee9b622b2d8bd5fdc81b671005afa79e376a5d2f92ff53bdee1793155165` |
| `templates/addon-starter/src/components/VisualGlyphs.tsx` | `a312d212af86c423b1a85a9e1c1692b8b485083fb8d2943081298eeb97713f69` | `d96996c0e2deb7fb83f7ce0dfd0ff2b028e8c8e24b3a43a220aa83ffe9e3c444` |
| `templates/addon-starter/src/qa/SpatialProbe.tsx` | `340ed561b95467bbf20d51bca3f1f43857c66ab9b8c51a2d3e8b6d97ede73303` | `6f5fa59bdf75ead5712811e11d411b53a678a6bbd8ef64a9a748be6d620e3f3f` |
| `templates/addon-starter/src/qa/capture-spatial-frame.mjs` | `0fcd0f1183777bdcff21819b2a97731765dd459734b4b95b71de65f7a9c069be` | `0f3c763e356e985a63f2f927581308afc3d1780faf2c62eba6fa5570608c50e3` |
| `templates/production-toolkit/examples/capture-spatial-frame.js` | `bed51e3b7d3214ab0a629a5a9d95b8a31f186b022b42870c3fc536582465f06b` | `aad89384400a9429bc5f988927b2103f2333f391b8ed3f15c18dfc4b9f920e54` |
| `tests/prompt-first.test.mjs` | `a8ab2894b91340f5b865522adb80700df54bc544163b24c94d12e6aab1358179` | `0fac010be273e73a26d1e8b3eec9c7fc4608660299ecd830ad359f1963823b5c` |
| `tests/spatial-intelligence.test.mjs` | `1138e804acc595e9e5633e010c19bc0025bc41b132e9f8ab69a6c47c61dd1653` | `41dae6cf816d32c46068523b6d20309f7b4f167a05994dfa8f68b78a8c160e4c` |
| `tools/capture-spatial.mjs` | `740ccde00c022c88c043eaa30ef603340b46c3bfda637984ab04367775ab9c08` | `6c154ae7111e44f0247f2c450e86501642869d4f5b4487422f2ed5c3445de104` |
| `tools/qa-spatial-trace.mjs` | `ea97034c973f9973d1d533bf72efc6700774c1d9008f50f44077130f3dcedd3e` | `ce508e34aa5c90d3523c840fad25181b65ebbcada7bce5cb233c6efb7be9e720` |
| `tools/qa-spatial.mjs` | `d79063df378ad4d3f37135ca610f8fda794aaeb8315b22f10d3f0c0422106fcb` | `b3871eabf0db4f24c8417c4f8185c6f433be2ade6ffb8fc281105df2c7ea1f1f` |
| `tools/render-profiles.mjs` | `b981ee6696f29d51390182ac0422ecbee44f09a9d796d5e71f1e994e57ed1636` | `7be7bbe1916821e5289c39e6d60b47ad8fcc0c37371739bafe550d530888aa76` |
| `tools/spatial-collision.mjs` | `793274050e008dbf0f69b699bd3f6a36c7855193da51650fc2e41b2b1952eca4` | `c6e702bc840f203a93ddbf83861c4de85daa3062cb15a8b575dcf573b2d16b56` |
| `tools/spatial-contract.mjs` | `844aef59cf40d2545336ca9c2f5d74f847c3bef8917e05e456885779863dde1e` | `21c849fbd4b28ebca9258222f72d211e476c6baad5d0b747ee044e7e663b1cb7` |
| `tools/spatial-evidence-index.mjs` | `4e20b2fee4b2a2c4f059656465661a4e375e3e19c7505815b345581a899f330d` | `d46a782881b9205d1107218c6aa4b4112a66d665e3e53d1bb40024e81424c62d` |
| `tools/spatial-layout-advisor.mjs` | `92dbe3c8fac92d9856944fd6a6368336235bb918866812caf4b57a49d70efaf8` | `48fdc4ac521f113b9b303ca6520967eff6126aea949281c1f0292ace1f8821b8` |
| `tools/spatial-pilot.mjs` | `NEW` | `fc33e440766c37f0fcf16a8809b88c966eca6b6708430fb41161bad68e552b18` |
| `tools/spatial-pixel-review.mjs` | `NEW` | `b16ec7fd7b7352bade8f37a5ddd23476766b9cc50af495f187a3daeefa31acae` |
| `tools/spatial-sampling.mjs` | `127f27d838ef3a8dcb57f10f3429c3c0700050f8a8d3912475047d4dd9b891ad` | `65e890b72b3278665c30c5f76ec0a4046ae0de624f2a97e878c014797da14ee1` |
| `tools/studio-menu.mjs` | `0b5fd73c62d8105cd450da1ac2f318462bb07ea517da7aa6296aef88a6966a9c` | `95b6d42ce03c78443b69659a8e41a3ba24422d07c4d39fb822824bc166d7ca55` |
| `tools/validate-addon.mjs` | `d898b5c87d55754dc72829853bef236029185ee45d1a32f2377f17a369a5c6f4` | `574ba7ecf197dee7e60a381e59de732777afdedbc15e14decfbe512827308e9f` |
| `tools/zip-video.mjs` | `bb4834af3d501f84697048e4b6a779f4bb6e0cf966cf4a867d2e471f1da07273` | `23a21f9d0039fc01decda49ebea26a653fb801aa7dc95955e8c8188b858640e9` |
