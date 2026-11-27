# Add-on starter — DRAFT, not production ready
This scaffold demonstrates native call-sites and editable caption, not final content. The production validator must reject untouched placeholders. Copy to unique slug; replace sample scene, VO/timing and identity. Follow root `CHATGPT-READ-FIRST.md` and `PRODUCTION-RULES.md`.

Completion before first preview:
1. Build topic-specific scenes, add manifest segments and SegmentVideo sharing the exact scene components. Use local `templates/production-toolkit/` camera/WorldAssets when appropriate; copy helper dependencies, never import across projects. Design tokens in src/config/design.ts are defaults, keep native inline values where required.
2. Narration must cover the complete duration, including silent/cover. Literal captions match text/timing. Rebuild editable blueprint and layer map; never reuse native names through repeated wrappers.
3. Add manifest motionPlanContract focus-driven-v1 and `production/motion-plan.json`; generate narration hash with QA motion CLI. Add `production/spatial-plan.json` using actual geometry and keys, reasoned exceptions. Examples in production toolkit, not ready-made plans.
4. Sound: choose local library assets (`node tools/sfx-local.mjs verify` then prepare from actual action request). Copy canonical SoundCueTrack and literal SoundAssets map; manifest cue-track-v1 with showSfx true/sfxGain 1. Ready cues or reasoned omit per segment, not draft. Full/segment one track. Do not use placeholder slug in staticFile.
5. `npm run addon:validate -- <folder-addon> --production --syntax`; inspect real moving full/segment preview and sound, test Studio edit/Save/reload. Draft strict gate only checks scaffold structure. Keep ACC only on explicit approval. No render claim without output.
