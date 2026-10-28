---
name: remotion-markup
description: Animasi, layout, teks dan media. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-markup

Author Remotion JSX in React + TypeScript, preserving independently editable scene elements.
- Use `AbsoluteFill`, `Sequence`, `useCurrentFrame`, `useVideoConfig`, `interpolate` and `spring` as needed.
- Keep animation deterministic and independent of wall-clock time. For content edited directly inside Studio, prefer JSX literal text and simple inline style values where the installed API supports it.
- Maintain safe zone approximately 250 px from top and 350 px from bottom in a vertical 1080x1920 canvas.
- Avoid illegible text and unrelated moving decoration; one idea per scene with concise captions.
- Split backgrounds, titles, Windows UI, cursor, diagrams, subtitles, sound and foreground graphics into separately named layers.
- Use real Remotion media components and a consistent asset path; do not fetch media at runtime without a reason.
- Avoid introducing dependencies without verifying compatibility with Master remotion version and testing `npm run check`.
