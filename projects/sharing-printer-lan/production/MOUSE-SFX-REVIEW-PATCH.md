# Mouse SFX — correction (supersedes internal review)

The previous internal-review substitute was rejected by the user. The table below is historical, **not** active playback or permission to reuse. That intermediate revision omitted all 15 listed cues. It has since been superseded: original HunteR WAVs are present and active. Current playback is described in SOUND-PLAN.md and sound-cues.json, not the historical table below. SoundAssets does not map the rejected substitutes. Do not use historical hashes as evidence of HunteR provenance.

# Mouse SFX — FILE CHANGE ONLY

Base: CHATGPT-LATEST.zip, Master 2.0.0. Close Studio, back up the files below, compare SHA-256 against base before replacing, copy root-relative paths, then npm run dev (automatic sync). No deletion. Restore prior versions to roll back; newly copied WAVs can remain unused.

Scope: existing user-bundled click assets for private review; physical source and public/commercial rights unverified. No other project/engine/VO/subtitle/visual/approval changes. Recorded-only production rule remains unchanged.

| Cue | Scene | Action | Start | Impact | End inclusive | Gain dB | File |
|---|---|---|---:|---:|---:|---:|---|
| cue-06 | S03 | Run OK | 773 | 773 | 776 | -16 | single_click_realistic.wav |
| cue-07 | S03 | Network and Internet | 842 | 842 | 845 | -19 | single_click_realistic.wav |
| cue-09 | S03 | Advanced sharing settings | 1002 | 1002 | 1005 | -19 | single_click_realistic.wav |
| cue-10 | S03 | Network Discovery | 1089 | 1089 | 1092 | -19 | single_click_realistic.wav |
| cue-12 | S03 | Save changes | 1250 | 1250 | 1253 | -15 | single_click_realistic.wav |
| cue-14 | S04 | View devices and printers | 1446 | 1446 | 1449 | -18 | single_click_realistic.wav |
| cue-15 | S04 | Right click | 1506 | 1506 | 1509 | -16 | single_click_realistic.wav |
| cue-16 | S04 | Printer properties | 1566 | 1566 | 1569 | -18 | single_click_realistic.wav |
| cue-18 | S04 | Share this printer | 1686 | 1686 | 1689 | -19 | single_click_realistic.wav |
| cue-19 | S04 | OK | 1806 | 1806 | 1809 | -16 | single_click_realistic.wav |
| cue-24 | S05 | Run OK | 2076 | 2076 | 2079 | -18 | single_click_realistic.wav |
| cue-25 | S05 | right click | 2154 | 2154 | 2157 | -18 | single_click_realistic.wav |
| cue-26 | S05 | Connect | 2190 | 2190 | 2193 | -16 | single_click_realistic.wav |
| cue-28 | S06 | Buka dokumen | 2363 | 2370 | 2374 | -19 | double_click_realistic.wav |
| cue-31 | S06 | Klik Print | 2467 | 2467 | 2470 | -15 | single_click_realistic.wav |

## Files / SHA-256

| Path | Base SHA-256 | New SHA-256 |
|---|---|---|
| `projects/sharing-printer-lan/public/audio/sfx/single_click_realistic.wav` | NEW | 1f8ecefb8ce00d3a12be5dbaf35c8faf2b33f8a5cddbc3d94b461dc18107530b |
| `projects/sharing-printer-lan/public/audio/sfx/double_click_realistic.wav` | NEW | 3d98ccfafe7b8c46d3e5a7a3acbcb6bac202b423da882254423e22f2fb21e7ec |
| `projects/sharing-printer-lan/production/sound-cues.json` | 305cd472c1b8583571dbed3f67763dd5e6a15bf5b4c450311a5cea4856cb4837 | ba9e9defc762566520673c60de0e4454e4162f2fb7eec2893774dc8f41ed4350 |
| `projects/sharing-printer-lan/src/components/SoundAssets.ts` | 337d4913b36bb33b8effb6d00be281d6a8a2906ad7eb6701586f4f658da90f1b | dbe06175a6be1af56a0ae8738dfb31c68c41bbbcc2d08f2634ee7aa470744e52 |
| `projects/sharing-printer-lan/production/SOUND-PLAN.md` | ee32e1bdf53ab45a5334de7910417972a47cfe205716c2d4bf13c09fe66ad9e2 | c87c8b44fa40cea748f0d32a93089ff0e07867f424fc7c6d54ef4b7919e8a617 |

QA: strict sound PASS (44 cues); production+syntax validator PASS (95 files, 0 FAIL/WARN); exact archive diff only six listed files (including this report), 29 other cues unchanged, all replacement WAV durations fit their sequences and no replacement overlaps another ready cue. Both WAVs identical to source assets. No Remotion runtime dependencies in this environment; no bundling, preview render, listening or GUI QA. Metadata license field records unknown rights, not legal clearance.

## Current revision — mouse clarity (supersedes historical cue table)
Scope: 18 cue edits (13 gain changes, 5 restored clicks). Two right-click omissions and 24 unrelated cues unchanged. Original recordings, all visual source, VO, manifest, and approval state untouched. No source WAV changes.

| Cue | Action | Impact frame | Gain dB |
|---|---|---:|---:|
| cue-06 | Run OK | 773 | -8 |
| cue-07 | Network and Internet | 842 | -5 |
| cue-08 | Network and Sharing Center | 913 | -10 |
| cue-09 | Advanced sharing settings | 1002 | -8 |
| cue-10 | Network Discovery | 1089 | -5 |
| cue-11 | File and Printer Sharing | 1175 | -7 |
| cue-12 | Save changes | 1250 | -8 |
| cue-13 | Control Panel Home | 1386 | -10 |
| cue-14 | View devices and printers | 1446 | -5 |
| cue-16 | Printer properties | 1566 | -8 |
| cue-17 | Sharing tab | 1626 | -7 |
| cue-18 | Share this printer | 1686 | -5 |
| cue-19 | OK | 1806 | -8 |
| cue-24 | Run OK | 2076 | -5 |
| cue-26 | Connect | 2190 | -8 |
| cue-28 | Buka dokumen | 2370 | -8 |
| cue-30 | Pilih printer | 2433 | -10 |
| cue-31 | Klik Print | 2467 | -5 |

Base ZIP: MotionGraphic-Studio-FULL-v2.0.0-20261128-035738.zip. Close Studio, backup these three files, verify base SHA-256, then copy root-relative paths and run npm run dev. No deletion.

| File (relative to Master) | Base SHA-256 |
|---|---|
| `projects/sharing-printer-lan/production/sound-cues.json` | a87a9031d054093239c05aa05c0c91d5253ab8d440ee4c3a6fd88476c162755b |
| `projects/sharing-printer-lan/production/SOUND-PLAN.md` | 514ffe657c825e44377626b2b7c6e67a419277041e7f4006b17b16c1faf66b87 |
| `projects/sharing-printer-lan/production/MOUSE-SFX-REVIEW-PATCH.md` | 3d9d25780fef0706ca3e02ac54c589ef5ba141fd28a663534e7ad26d80b876c7 |

QA current revision: strict sound 44 cues PASS; production + syntax 98 files, 0 FAIL/WARN; focused sound tests 30/30 PASS. 18 mouse playback windows fit original duration without overlapping any other ready cue. Original bytes verified against user uploads; audio A/B audition is PCM mix at configured gain, not actual Remotion render. GUI/render/listening with VO not tested.
