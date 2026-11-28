# Master cleanup — FILE CHANGE ONLY

Base: CHATGPT-LATEST(5).zip (Master 2.0.0). Close Studio and all QA/render jobs. Back up entire Master outside root before replacing. Compare base SHA-256 below against local files; if different, preserve local edits and reconcile instead of blindly replacing. Extract this ZIP outside Master, then copy only implementation files into root. This report is for installation only; keep outside active Master.

## Manual removal (Git Bash, root Master)
`tools/setup-segment-folders.mjs` is a one-time v1.8.1 migration for two absent videos, no active import/script/doc/test references, executed against audit copy: 0 manifests changed. Current registration uses `register-scene-segments.mjs` through sync. Preserve old migrator in full backup. Delete only if hash matches.

```bash
printf '%s\n' '5c24bc3a00343561bd9bd833184960b16e47190f5bdfff06d78e96f4524d03a0  tools/setup-segment-folders.mjs' | sha256sum -c - && rm -f -- tools/setup-segment-folders.mjs
```

No other file deleted. Do not delete old project decisions, template copies, recovery scripts, external backup, registry or mirror.

## Changes
- Static literal geometry diagnostic uses central spatial profile for all four scaled safe margins, not hardcoded legacy vertical thresholds. Review-only; not actual DOM geometry.
- Regression fixture checks asymmetric compact at 720x1280 and legacy comparison.
- Four docs reconcile semantic roles, bounded overlap, browser reuse, differential review, subtitle policy, prod/menu and diagnostic ZIP. No creative lock changed.

## SHA-256
| File | Base | Patched |
|---|---|---|
| `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` | `8ad680d7bf623682bbcc859d89c70028d3254c95006b9f7cf8a5c00b02d26987` | `6b24ef5263e92e789db0dafdb6f548d204a52154ea2692f46834ce036a4e69aa` |
| `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` | `a26c0f2f79f80246a2db57a792cc39e25ea36a713a7ef875fe93924c5a49c815` | `7ca8b6839850855801c10944953c24878dd0fef5e9b2691abd730928d18b70be` |
| `docs/OPERASIONAL-STUDIO.md` | `d06c8cf7d8066278c29118c3547a99606e634cf7005f31ecf54bb6d2b8924dfb` | `5d24a245d8f4f3ddf6dea3eb58a3585d3776afb744e8614fba9155c6a438c6e6` |
| `docs/PRODUCTION-TOOLKIT.md` | `2fcc8aef82eb0408028235778fcef6b179ddf78d651d075a3b83d7eb585ba498` | `b8fb91a8adfe3e40bf83b228043056b5614f538c8f445e8c41a6c0f06109c8e1` |
| `tests/studio.test.mjs` | `8aea42a790ff2277a344b7d62073d7fbd18948b6b6be6028ca38433bbf315ed0` | `25c50e7b9da4a2fe0d36d6ee4306f076ba976d702ddd01d2d25927dc228c35e1` |
| `tools/studio-quality.mjs` | `7d847dbc4c049d6ae41a3155f7c89b5579594a76a696fd29abdb691161e6d456` | `66ebc94b37f5e9a050edcb907b613c65effe49b6ea45786bb9eb257713aeb7a7` |

## QA
Baseline npm test: 265 pass, 0 fail, 7 skip (272). Patched copy after deletion: 266 pass, 0 fail, 7 skip (273). Six active project folders, all 457 source/project files byte-identical. Registration read-only 0 issues, 75 source asset refs, 0 missing, six boards current, release metadata passes. Sharing Printer declared 3383 frames pass. No Remotion renderer installed in audit copy; runtime, Save/reload, actual capture and MP4 not verified. No QA evidence in input ZIP; no active project instrumented. The original archive was not modified.
