---
name: remotion-best-practices
description: Panduan utama dan pemilihan skill. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-best-practices

Use this as the first route for any Remotion work in MotionGraphic Studio.
- Locate the existing Master at the repository root and a single existing/add-on video at `projects/<slug>/`.
- Before editing, load `AGENTS.md`, `PROMPT-PROYEK-CHATGPT.md`, and the relevant installed Remotion skill.
- Never initialize a second Remotion app for an individual video. Do not hand edit `src/Root.tsx`, `src/index.ts`, `package.json`, or `library/catalog.json` to register videos.
- Work on the original scene assets and component layers; do not flatten editable visuals to a single video.
- Prefer clear, deterministic animations driven by Remotion frames; preserve source layer IDs and follow 1080x1920, 30 FPS defaults.
- Use `remotion-interactivity` for editable text and draggable layers, `remotion-markup` for animation design, `remotion-captions` for subtitles and `remotion-render` for exports.
- Validate with `npm run check` and the studio's editability audit. Manual Studio drag/edit/save/reload still requires testing on a machine with Remotion.
- This fallback guide is authored for this project; use `INSTALL-SEMUA-SKILL-REMOTION.bat` to replace skills with upstream Remotion files.
