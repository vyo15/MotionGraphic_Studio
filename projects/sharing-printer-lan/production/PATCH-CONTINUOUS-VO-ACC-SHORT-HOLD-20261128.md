# Continuous VO ACC + shorter Wi-Fi hold (2026-11-28)

Baseline: Master `MotionGraphic-Studio-FULL-v2.0.0-20261128-084315.zip` plus installed S01-Q VO, S01-R/S01 VO, and S01 Continuous VO patches in that order. Backup target project and the two Master documents before Replace; compare baseline SHA-256 below, stop on local conflicts. Generated registry, mirror and board excluded; `npm run sync` regenerates them. No deletion or installer required.

User approved continuous VO preview, requested reusable rule and slightly shorter Wi-Fi hold. Remove 12 frames of silent final hold (old local 171–182; 5.70–6.10s); preserve original reveal, resolve and fade length (fade moved -12f). Question 186f, full 3383f, opening 548f. Other local durations, source scenes, assets and audio samples unchanged. Full continuous audio begins 212f, boundary 270f, ends 382f exclusive; local segment offsets unchanged. Global cue/typing and spatial frames shifted -12f. New hold still review; ACC refers to previously approved reference, not native render or final.

Rule owner: docs/WORKFLOW-VO-UNIVERSAL.md (CONTINUOUS VO LOCK), with QA reference in existing checklist. No engine changes. No new dependency. No forced retrofit.

QA performed: strict addon syntax 0 FAIL/0 WARN; motion metadata PASS; spatial declared geometry 3383f PASS; sound 46 cues PASS; sync/validate 6 videos, 63 comps, 51 segments, 75 asset refs, 0 source issues; board check OK. Source protection: 112 unchanged project files (including all WAV/MP3 assets), excluding generated board. MP4 prototype derived from approved continuous preview by cutting 12 silent frames; 548f, 1080x1920, 30fps, decode PASS; audio re-encoded for MP4 only. Native render, GUI, listening and word-level alignment not verified. Generated board shows global partial recording status rather than per-scene recordingSync; per-scene approval is retained in state notes. Legacy production gate not rerun; no migration.

## Changed files / baseline and result SHA-256

| Path | Baseline | Result |
|---|---|---|
| `docs/QA-VISUAL-MOTION-CHECKLIST.md` | `13b66956bbda6316917506a6918095284867be148e8af6da166f49a3fef388de` | `6fdc31ede85fda476ebef3dfca6bf4d59b24748dd3a013b29bfc0a05f0e8563c` |
| `docs/WORKFLOW-VO-UNIVERSAL.md` | `ccd40107271d91edd210f94e6d0d4531f92238dfd197be47add890d9af45da0c` | `72ceffbc0debc0594b43d554071e4bcda0c418b2f32a21bf26a1d6cb5854fc67` |
| `projects/sharing-printer-lan/PANDUAN-EDIT-ASSET.md` | `048875c1b809c2053aff9ef9a93d75e1b519b4a4815d6f6e9c32653547fad8e3` | `ce790660570f4415cc6dd68f12af5a3cdd90756a827c285ab908bc257247e00d` |
| `projects/sharing-printer-lan/PRODUCTION-STATE.json` | `c3ce9f8c9ca76fa1f5d072a5876f1a301fd708ee5ca6755b8185be930c7ac0f6` | `767dc35eb417f44bdd696a9022265b5e785548b410ec7ebd10ab51c6f1b93395` |
| `projects/sharing-printer-lan/PROJECT-SCOPE.md` | `23622f2ae098af9883d5cf093be9f94cce2cd580cd535d81e314b138f3c9f62a` | `e08e73cf9ca7fd3fd4cbe9e5593409e10c1d8c446dde9b3a6e1cf5393f0b0685` |
| `projects/sharing-printer-lan/README.md` | `b7175347ffae07c832d601fe7990b072d3138302d6ebcf09d2011f9883ab1ec9` | `e1c4d7a0945da4913a433fd5d28ef085b860e23b7b3f5a5fa86e4bbeb59537e9` |
| `projects/sharing-printer-lan/STORYBOARD.md` | `cfb1df9aededd5bd5f51312e52564a2653cc92524d70ec490fc15ebf555e98e4` | `d50e9ee09976bce46bece37561aec2d7cfb8d07373aef82f84dc31cf4834981e` |
| `projects/sharing-printer-lan/motiongraphic-video.json` | `4be5def58777451bfc1d9c530bdddbcea6ef04485a54531561a3972b3141a130` | `4895346153288beb5397dad7d5af88c54a4a342591fa817e0bcc0d38cc87a2cc` |
| `projects/sharing-printer-lan/production/MOTION-PLAN.md` | `b596c7e375a2d8cd6ed72e418fc0e3c3c00646edee926b73af6eacc52640c4b3` | `14df12fae22d90dc3ab0f22b61611685f33ffcc69b9862f3486e4b51f674cb23` |
| `projects/sharing-printer-lan/production/S01-Q-VO-RECORDING.json` | `00cdf30d0c01447bcbaf528d9f7640b5d688679989d90c60370a5860ee0772f6` | `daf271748fedcdd58ec8483e8f108be203eef5bda13ba9449a8a52da37c6964e` |
| `projects/sharing-printer-lan/production/S01-R-S01-VO-RECORDING.json` | `9a52debd3cf418d1124441988eab7af2ef1efa80b005b67ba1d4e762aba769ca` | `63ef55e26f927c734ebc6b84c3d5f5526891127d7a7060da8ba2c8b9bd98164c` |
| `projects/sharing-printer-lan/production/SOUND-PLAN.md` | `8a21e01635419721df78fe265b3b852c1c145b7ac454b479970766f201393799` | `cea3010c50af116209fd77871d1923a99fbce25c0c280b2246f7a7cdbbe3232d` |
| `projects/sharing-printer-lan/production/motion-plan.json` | `85512435b21753fce0360da9980dd2d709f57b0d14fc8bc16f0403bac342ba36` | `246c71d4cd556d5de04e52f71dc6b3a77b218ad57a2e98020bedd9ec9591aee7` |
| `projects/sharing-printer-lan/production/sound-cues.json` | `9ca62c0297d669967940c8804bb02a729d12437a1f040f9e3a295544799ac813` | `103e5f60b627ad4b29917fa1556c93673c8e1861acbe8d6adcf672ec16721be7` |
| `projects/sharing-printer-lan/production/spatial-plan.json` | `f71a72ea49de133b32819e74b62e06bd21988cea976ab549cc983193f98df4cf` | `28f79efbdecd3d7fec0d247cde2f2e4f8d4220ef745d5b727a3a79a33df248fe` |
| `projects/sharing-printer-lan/src/Video.tsx` | `3cde078b19d42f98b38bcff29ff61aef0e63e60027ca2bf5b8be03fdbd8c7e47` | `fb9ce2afb51696f6d1ac6ae625daa8fc2dcc9e8546304055f2b8bcc9efaf06d1` |
| `projects/sharing-printer-lan/src/config/narration.json` | `86806e8074fc28e4b688c1d3a5d91ae58cde7fce46799d1adc28658d87a54396` | `2cd4ae623c898866e41041d946316e22100eb352bf1d0bac7b9252bf5cc29d34` |
| `projects/sharing-printer-lan/src/scenes/Scene01Question.tsx` | `3ec2f33648981e0e28575b3db28378b7d099507335dd35463d56ff82e43fffbe` | `2ddbe804dc5e7daa3cff3bfcd85d7ca6c9383bdfea5331eadd11390375dab3f8` |
