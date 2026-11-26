# Release 2.0.0 — integrated production toolkit / QA audit

Base exact: `MotionGraphic-Studio-FULL-v1.9.0-20261126-020359.zip`. Upgrade in-place, one Master, no forced migration. Remotion/CLI 4.0.538, addonContractVersion 1.0.0, studio-direct-v4, Motion Direction 3.0, focus-driven-v1. Project Rules 2.0. Version 2.0.0 chosen for integrated tooling; not a claim all production runtime/GUI is certified.

## How to apply
1. Close Studio/watcher. Back up full Master and unsaved Studio edits. Extract FILE CHANGE ONLY outside Master. Compare changed existing files with SHA-256 below (PowerShell `Get-FileHash -Algorithm SHA256 -LiteralPath <file>`). If local file differs, stop and reconcile; do not blind overwrite. Copy listed files to corresponding root-relative paths. No deletion/patcher. No new runtime dependency; dependency graph unchanged. If node_modules is absent, install using `npm ci` on PC. Do not copy generated registry from archive.
2. `npm run release:check`, `npm run check:syntax`, `npm run qa:approval`, `npm run check:sync`, `npm run sync`, `npm run validate`, `npm run qa:motion -- --all`, `npm test`. Known legacy failures below are reported, not hidden. `npm run dev` then test Studio edit/Save/reload/preview before using production.
3. Replace ChatGPT Project Instructions with copy block in `docs/CHATGPT-PROJECT-INSTRUCTIONS.md`; sources include `docs/PRODUCTION-TOOLKIT.md`, latest Master, and existing skill reference docs. Local skill adapter isn't installed in account automatically. For future add-ons use `npm run qa:motion -- <folder>`, `npm run qa:spatial -- <folder>`, `npm run addon:validate -- <folder> --production --syntax`, then QA native, layers, sound and actual render. New gate only; no retrofit existing videos.

## QA performed (Node 22.16.0)
- ZIP input integrity PASS; no files removed. Package/lock/capabilities versions agree. Lock dependency graph exactly unchanged after normalizing root version.
- Full baseline 139 tests: 129 PASS / 4 FAIL / 6 SKIP. After 150 tests: 142 PASS / 2 FAIL / 6 SKIP; 11 production toolkit tests passed. Global installed TypeScript parser used via NODE_PATH, not a full tsc typecheck; syntax parse 151 source files, 0 errors. New camera geometry, endpoints, global frame parity, per-frame planned collision, clip, exemptions, motion/spatial drift, measured trace, exact word/frase alignment, alias approval and hold classifier tested. Production validator integration fixture passes then rejects pose drift. Legacy skipped tests reference unavailable old video fixtures, not GUI proof.
- release:check PASS; approval metadata validation PASS with existing warnings on script/storyboard phase (no ACC invented); check:sync 5 registered / 0 issue; isolated actual sync 5 project, 51 composition, 41 segments, 44 asset references, 0 source issue. Generated output from test copy excluded from package. `qa:motion -- --all`: 5 SKIP legacy without declared plan.
- Synthetic 3-second 1080x1920 30fps H264 FFmpeg test clip: `qa:render` 0 FAIL, 1 WARN (no audio), 3 INFO, 15 OK; 89 static frame transitions classified as planned hold, no unplanned dead zone. This is a real MP4 QA tool test, NOT a Remotion video render.
- Headless Chromium smoke attempt timed out; no browser/Studio GUI success claimed. Remotion packages not installed in sandbox, so native bundling/GUI Save/reload and native Remotion render not verified. SFX PCM metadata checked, listening/mix not verified. No ASR engine installed, VO alignment needs timestamp transcript. Spatial plan checks declared geometry each frame; optional trace checks supplied measured data, not automated Remotion frame capture or pixel occlusion.

## Remaining legacy issues (preserved intentionally)
1. Easy2Boot `Scene01Problem.tsx`: two default caption branches are null; three remaining literal Interactive.Text subtitle nodes have empty bodies (02A, 03A, 03B). Test now correctly counts 3 of 5 instead of 0 because multiline JSX is supported. Existing defaultProps `showOnScreenCaptions=false`, `showSubtitles=false`; possible intentional local caption removals. Restoring them would alter locked source. Needs explicit review/ACC for restoration. No source changed and failing test remains visible.
2. Easy2Boot `Scene02Solution.tsx`: five native draft nodes exist, four empty (01, 02, 03A, 03C); only 03B literal text remains. S05 five native nodes present. Test now handles multiline JSX and explicitly detects empty native captions. No silent restoration. Full/segment track gating test fixed to match `sceneProps.showSubtitles` and remains protective. Final subtitle track not certified at runtime.
3. Shutdown actual 11 manifest segments (S06 bridge, S08 question), source sequences, segment editor and narration match; old test expected 9. Corrected test without changing scene durations/source. Sample Startup reference ID alias recognized by manifest prefix, no approval rewrite. The shared resolver refuses unknown, conflicting and duplicate mappings rather than ordinal inference. Read-only qa:approval still reports phase/script warnings where appropriate.

## File inventory and base conflict checks
Original files: 496. Protected project/library/public/src files unchanged: 336. Changes below plus this audit: 57; new including audit: 20; modified: 37. No deleted files.

| Root-relative path | Base SHA-256 (— = new) | New SHA-256 |
|---|---|---|
| `AGENTS.md` | `40c12d77ba284503cdd9265592e34c45c93ccc4cf4fa86f16be7491a18ae976c` | `9721fa602d63c949468e7c5cb1e4b054143c18330a09ab6c6370790033b90704` |
| `CHATGPT-READ-FIRST.md` | `96fdae98354f7e7035bd9aa6a68869086272a03d565155f85967dc19f762e684` | `11db230dfab2bb36e03a3d9cb462f0264d8821142108adc99003870128016b00` |
| `PRODUCTION-RULES.md` | `1d924b2d817cc45180f98c735388e2cd3b04356eb2f2977331d10d772c4d7e9e` | `d5a725c3eed6690c3be41799a9f220e36cf78524cb53012bf14a106f984f85c9` |
| `PROMPT-PROYEK-CHATGPT.md` | `8355ffb191551f73c71d502a85e993d61a56fd25ab72ad729d3ff70dbc5c36b5` | `3e2548a226588ae67f85f2d7869b5d6ee70f4ec27b519fb69b27da2870a560ca` |
| `README.md` | `881c806f918aabdfe63a5d371f5fbecf87e0e5e42ea3aef97b3a75c008daed79` | `618181696b6d5570ac982e80d551c96805ee5536dc458e42166a00bb96d78483` |
| `contracts/studio-capabilities.json` | `68062389abeb7dd73b0dd8bcbcc7a909a053450225daae31f14fe2717d60e5cc` | `90e9d3f2f43f3e7d9b02216a0a5a1bc8df44e25d21d6ffecbf5608e7eb441c37` |
| `docs/AI-PRODUCTION-WORKFLOW.md` | `56450fa6a14a19602fb7c6e8bae3c137b82a6f305dfb5014e7e2077d7a76ce83` | `249fc28a3b9da6f1fbb349600a61b55cdcb1be07bfe472939f7f852ba24b7795` |
| `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` | `7a63098a5a892a1475daf8f2d0eaa926690e065e5f29fca3b9c208f1bb894665` | `3626d94c148d9c0bfa4929c12ea6c64b614b746d731b19582053cdd1cca52d80` |
| `docs/CHATGPT-PROJECT-REFERENCE.md` | `8dd46167a7a7ef50ae7b9b6070d88feafa43e7626ce59141817a116235dcb636` | `cdeea75aab2aca31b4935348a78f75b90952b67bb4be0a0ad7b11e20b653948d` |
| `docs/MOTION-PLAN-CONTRACT.md` | `f7a3f9c9ad10d87f443261d6c66bf4f6d787cd4002a8454b446baccd3b906ba9` | `e54677529c969e66b72466b2519627757cb3fb787d1a814f3021efd7cb456f1c` |
| `docs/PORTRAIT-CAMERA-STANDARD.md` | `c48361104a2cc4c9146d1be8dfe5c8a7dd1e7f9e219d9f3f4f9ce5826fce52d1` | `19718a281c58eab6ea742bac35ba6fb69b547b9222f47f9c86b5d99daa3a7cff` |
| `docs/PRODUCTION-TOOLKIT.md` | `—` | `b25dc04fe11d12456a8217b118b6e42b03c98fbc87364b70ab256fa99696694a` |
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | `9d0013ae30b828c283cbbcd22edd70c762b09ac31bcfd71f4cdd846b0d712501` | `53281a073ac47d6aacc49b4de65beee87a1a5b169704ab9b5855e1b6085389d0` |
| `docs/RENDER-HQ-CAPCUT.md` | `aa1f96e6ab580801fd4247188772afc92a17acca2f5cecb6be00618f18192c8a` | `f5d507b916acee12fc9c8a8dc8340b736d7bbbe331c9b7c797fa3f0689a0480f` |
| `docs/SOUND-DIRECTION-RULES.md` | `a363d17bb29997493259bcfe3e18c5489326adefc1035a2891e40aa870ec0c69` | `2385aca5e5bd2057d134b0a4290f18d1782ecd2b2876b797d210931515c53acd` |
| `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md` | `546d286937c72899ff4fe7184eef8590923a54dc092feb2bb22c70541fad76c5` | `6579712df8a631952f3218853f7533abcc2eaf458c2d9333fac5212f6b1757d2` |
| `docs/WORKFLOW-VO-UNIVERSAL.md` | `a31fc37295833b6385febe538ab3c503d15e4be7b190e7af47d39b478745de47` | `89669a498aeedddc4f99cac94d95f96e4a5406f8e6607f998f7ed456800529f1` |
| `package-lock.json` | `de701c1ea04b0d80f244ab0ae870d49f9b78e14c601422b32522dcc505a45a87` | `a15284b199635d3d1e73db25c040dbd79fdb825e39b97ea69ba3bd6f1e601185` |
| `package.json` | `4d5e5d5e855b777ddb8f8298e586cf203b95334c87487368c6d5d6bd1f0ce782` | `8d463636e83182675007fc489b4cab60c7c6a9c7172a088aa83b1204204870f0` |
| `skills/motion-continuity-director/SKILL.md` | `0bb24952c209a838f935fb1fb5bb7ea4d8c00cde7b0fc2301a784d167dbbb3b3` | `e93316a71f0ef958af9a683e87d7602f3de03877a23c19965c1ac217410f357f` |
| `templates/addon-starter/README.md` | `de3ff7e4bb8610923855b74f43a926c1e2ea8313a7a627b1c7c841dbd27d5abe` | `543b69a88406459b22538382b6c855c5a5c8eb07083845eaa2f44aff9434d314` |
| `templates/production-toolkit/README.md` | `—` | `6c7827a312b7795669416fd7570398e58c968b11f83e36e4a4c6e74a479f8fac` |
| `templates/production-toolkit/examples/capture-spatial-frame.js` | `—` | `7e2d6c3d27e4035aeb504c62a3a5aaed001481cfdf3f59bbe0c0f6a03f17bcbe` |
| `templates/production-toolkit/examples/phrases.example.json` | `—` | `db40bcceb4520674a0218328be87af4b6e1da61ac90acddb4db9d1091c538b86` |
| `templates/production-toolkit/examples/spatial-plan.example.json` | `—` | `96d0f52b9f31502d9668d62b26d475b4eb6fabf04d47beefb9a4bda103967abd` |
| `templates/production-toolkit/public/audio/sfx/click-soft.wav` | `—` | `8d13f7d6ca56ea4b38a3584cc5aaa5c4d1b40eb01e9a690071350790841802f2` |
| `templates/production-toolkit/public/audio/sfx/confirm-soft.wav` | `—` | `4a96de0d5a504164ac65ffaf731338a2e9ea55fb7dcb4daf720cc4e96e7b5f2b` |
| `templates/production-toolkit/public/audio/sfx/error-soft.wav` | `—` | `ae14e3bcf36bfd3074fa1a57f77365f637bb7419d4e596b16912c4d2d68f1db0` |
| `templates/production-toolkit/public/audio/sfx/key-soft.wav` | `—` | `c174fb0d3044fe951f3fce39e5c8a0a82a8d3a89bd396af489e89639c1c1a435` |
| `templates/production-toolkit/src/animations/camera.d.mts` | `—` | `d5bd7240ca6f4fb2d5878787c630300d0ab04dd02db24f458abce9b4699a2079` |
| `templates/production-toolkit/src/animations/camera.mjs` | `—` | `998877ad92ffb12909532e09965e5fdb8ee43c18abb87d722ad7c69dd2856075` |
| `templates/production-toolkit/src/components/PortraitCamera.tsx` | `—` | `70a2df24729c3b08c1aed14e2cdbc8a8c96c331507816e7ad068c320d0f84ab8` |
| `templates/production-toolkit/src/components/WorldAssets.tsx` | `—` | `a5d9afccc947948d70d4b8b2a010c494ee0828e95c5d03d6d15f1ad48adc545f` |
| `tests/ai-addon-pipeline.test.mjs` | `3de94e4691ccacc2b71836966a187098d2bafb39ebc8ea117e4f58bcf18e0b2c` | `3e9cccd8ef27c06425efae9f0570481ffedd7bed16abd1c82dab58361cdf24e4` |
| `tests/empty-master-recovery.test.mjs` | `249986156e910b21cbbd0fceb041c382d6ef2aba9b68505d9b413566c464c95b` | `db2558d56d2b9fdeeb7c067d63b4a95dda222b616040b3a1747ddabdb150b4c2` |
| `tests/import-export-integration.test.mjs` | `2146b99ddbad355d08a7085c38a5e88fc0b785a8f128a397d3b4d9c5d826665e` | `f42a646aefba45e9f8afebe980f7a1213f1739ce43f6ec3505f871004ca43c0b` |
| `tests/native-editable-first.test.mjs` | `66714cde3bbed916568906ffaa1319206e83a8257de13a2233e843de9710153c` | `608ae6a1486ebe943544d3a62f25fade475a7b4da1df107bd39fbfd173236f66` |
| `tests/production-toolkit.test.mjs` | `—` | `054026abbace4a22f4c8a1e76193c82817af5675f560e5b1f4f692101cd8c3e5` |
| `tests/release-motion.test.mjs` | `a83c4af490d7cb4da707ec595f774dd76061a72f385912f77df5b99d750822f0` | `9e00fa417809c4a0c7894ae4e6ee38ee109756deb7922d790ae1ee6f6a839830` |
| `tests/scene-editor-mode.test.mjs` | `4eb7ca44b659a869e2491898857f36c54ec1050dcb2b1c828948b17570afa14b` | `e4488a3db13fff01b70d0e47cba321628da6be0d752b4ff886c2a4d55db76cc4` |
| `tests/scene01-subtitle-native.test.mjs` | `e379159fb5492efdb517d142c1a3536db12602f3aefcca76f2235790cfdb65be` | `c4eb0d7d02db8ffb54afaa9d1522286e73225c8f3fc702209f086bfaa1685db3` |
| `tests/shutdown-timeline-integrity.test.mjs` | `4766263541b3d93d83524c04cc06487dbf4c166b6c1257a48f7b6b88fcc6ebf0` | `2090a72b9a9c03fa9fa1ed7dea06805832292ffb39c5e550ed37e2263738b340` |
| `tests/voice-guide-safety.test.mjs` | `08997014ada0d85e7198839772fd8f8b1a4cec5f3fdb0f9b1151c1ff6b91c3c9` | `b1a223b13c23fff08870b456005ef4240a526bae39c227151e78a7f0e76eacda` |
| `tools/approval-identity.mjs` | `—` | `839df91962fe7611fb0d895588254b72e742cbfee8e5afaf93e138c9cb1392bc` |
| `tools/check-release.mjs` | `e7fcf6d956a10577be91da934884a1044aadf1aa20af94a50b257d539e196370` | `a4b53d9f2d10d5b021077cc7c093175239b99bba07aaf7bc978973c8fd637f96` |
| `tools/check-source-syntax.mjs` | `63cd4bb348508acf34776f1e4157739e597f5dd7b4d07a3819b9181295f2007f` | `a4b570c0b05670a4c428313e94741d150c8a20a9b5045ea892f104dcb69c871f` |
| `tools/planned-holds.mjs` | `—` | `93d058826b39e1b2a61107ce82e9f15cd8a8ecde5d3a6b5bc6bf7babc4ecfef9` |
| `tools/production-scope.mjs` | `4de980bfd4e2730040aa66e94c6f90d9e285d68bee22ee9e7b49ce100a229f38` | `eb8faf6e6bd0845a8a9bd1c074414dde929991c22bd2e0573998a31b56b3e060` |
| `tools/project-flow.mjs` | `bc7fd328b5fdf713674ee9ce2de31d72da2262d8f4c9e7b68c53d003fb2e08ff` | `936fea6ba1e4571bf23978bee9c4c9b059795fa497adee0c4d7abab1817859a4` |
| `tools/qa-render.mjs` | `a7223c5d4969d91c4c03f8415086915e08eedc8f7f8770b9ce4f04fcda0f002c` | `d501aa4f7b19c27d08c6f1312e9bf9e7e284337f328c2d318ae784c31b0da829` |
| `tools/qa-spatial-trace.mjs` | `—` | `e765695e02ce2e25d240e8a3bbca9de16f644c8bbfa77da163e50ec2f48497c9` |
| `tools/qa-spatial.mjs` | `—` | `bea15a33fa97a26fbbccc8c1198dcc0ae4991c6dff4acf481f501dbb7fc7d14f` |
| `tools/scene-approval-board.mjs` | `c3d4904d40ee5c62926300602742dad48543d8046318468dfd8be0d41cc78067` | `faeb4f517a479436710ad9f5ede9355b4cb024bc2274db9abd3bc7335cbc2bdc` |
| `tools/studio-menu.mjs` | `52bd16a91e1d0a32db7f483a0916be0990c88020da7b2ae9d6a9b8bde7e49017` | `0daf4ef297456545ae371aa7504ee2ba84ada055d976964872da902917f698d1` |
| `tools/validate-addon.mjs` | `bd7168a4d09b3ce2130e28eb7f9c40461d8c9435f8070e99ab56778736a379c1` | `ba2cac0836f32e050c39b1dcfac29ee56de70995d7f5567be7786a8d76180e65` |
| `tools/vo-align.mjs` | `—` | `517c0473987ecce3169ef08c6287d6a3a6d4fa6c73de9e0a70f6cff7b88b5861` |

This audit is itself a new file; its self-hash is omitted.
