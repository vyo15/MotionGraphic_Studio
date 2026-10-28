---
name: remotion-captions
description: Subtitle singkat dan selaras audio. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-captions

Create subtitle data separately from motion graphics and voice-over.
- Time all captions deterministically in frames and keep them synchronized with the supplied audio.
- Prefer 1–2 concise lines per display, high contrast and bottom safe zone clearance (350px on 1080x1920).
- Keep transcript, subtitle typography and animation editable, not burned into a flattened video.
- Preserve asset paths inside `projects/<slug>/public/audio` with `staticFile('videos/<slug>/audio/...')` references.
- Do not claim automated transcription is installed unless the actual tool/package is available and tested.
