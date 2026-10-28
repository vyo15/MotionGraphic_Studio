---
name: remotion-interactivity
description: Editable text, drag, keyframe dan penyimpanan. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-interactivity

MOST IMPORTANT FOR THIS STUDIO. Read the official upstream skill whenever available: https://www.remotion.dev/docs/ai/skills and https://www.remotion.dev/docs/studio/make-component-interactive

- An ordinary React `<div>` is not automatically draggable or editable. Check the installed Remotion API before using `Interactive`; do not assume any JSX is visually editable.
- Prefer named `Interactive.Div`/compatible media elements for selectable layers where supported. For fixed text, put the text directly as literal JSX children so double-click editing is possible when Studio supports the structure.
- Keep style values that Studio should edit as simple, inline literal properties at the element call site. Avoid `...layerStyle`, interpolated computed style objects or CSS custom properties for visual edit controls unless the Master's dedicated editor supports them.
- Avoid computed text JSX children such as `{config.title}` when native Studio text editing is required. Choose either native inline edit with a source-of-truth rule, or dedicated editor-config edit with persistent save/reload, and test both without conflicts.
- Make each important layer independent (title, subtitle, icon, UI, background, cursor, audio); give each a stable descriptive `name` and preserve IDs during revisions.
- If animation is needed, ensure position changes made by the editor do not get overwritten by an animated `transform`: use a tested representation for base/user/animation transforms. Verify preview and render use the saved configuration.
- For props/controls, use only APIs available in Master remotion version. The current archive uses Remotion 4.0.538; read upstream API docs before using newer features.
- Before completion test: select layer; move X/Y; edit text via double-click if supported; change color/scale; save; reload; rerender; verify persistence.
- `npm run editcheck` is an audit, NOT proof of working interaction. Do not promise all old video components become editable just by installing a skill.
