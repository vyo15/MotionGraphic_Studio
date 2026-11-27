# Sound plan — Soft Editorial redesign v1 (draft audio review)

Scope S01–S08 audio only. Source visual, subtitle, scene duration, VO text and approvals preserved. All new sound assets are original synthetic graphic accents, not real mouse/keyboard/printer recordings. Physical recording pack unavailable; no final sound ACC.

| Scene | Direction | Intentional silence |
|---|---|---|
| S01 | Airy connection at LAN reveal, soft paper-motion texture as sheet appears | S01→S02 no whoosh |
| S02 | Quiet icon reveal at local frame 23 | explanation and transition silent |
| S03 | Adaptive Run typing, selective soft tap, small checkbox tick, Save emphasis | Network Center, secondary radio, S03→S04 silent |
| S04 | Select devices, context, properties, check and confirmation with differentiated gain | Home and tab change silent; handoff silent |
| S05 | Shortcut, adaptive UNC typing, context click, Connect, soft graphic settle on install result | focus handoff silent; no fake Windows sound |
| S06 | Open document, shortcut, Print, subtle data pulse, designed mechanical-texture paper feed | printer selection and CTA fade silent |
| S07 | Comment bubble reveal, paper texture, adaptive typing, subtle completion | no fake send; CTA→cover silent |
| S08 | Data mini-demo and subtle paper texture | silent hero hold |

Frame-exact cues and gain in sound-cues.json (endFrame inclusive). Typing cue windows expand deterministically on visible character changes; one tap per frame, empty text silent. Other cues remain normal. WAVs EQ/envelope baked, gain editable, same canonical opt-in track on full and segment. Old WAVs intentionally retained as rollback but not referenced. No VO or music added. Preview MP4 and listening still pending.
