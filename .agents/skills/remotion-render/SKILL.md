---
name: remotion-render
description: Render MP4 dan validasi visual. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-render

Use the existing Master `npm run render` workflow and select the composition to render.
- Confirm `width`, `height`, `fps`, and `durationInFrames` in the add-on manifest before rendering.
- Keep narration, subtitles and SFX aligned to frame-accurate timeline offsets.
- Preview multiple points across the timeline before final MP4 H.264 export.
- Only say an MP4 has been rendered if an output file exists and was verified. Preserve all source files for later edits.
- Do not change master package scripts or Root to render one video.
