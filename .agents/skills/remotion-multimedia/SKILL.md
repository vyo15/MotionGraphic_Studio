---
name: remotion-multimedia
description: Audio/video metadata dan pengolahan aset. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-multimedia

Extract media dimensions, frame rates, duration and audio properties with tools available to the current environment.
- Do not assume Mediabunny or FFmpeg is installed; inspect dependencies and runtime tools first.
- Keep originals within `projects/<slug>/public/` and use Remotion's project asset mirror path `videos/<slug>/...`.
- Use source durations and frame math for video clips, subtitles, VO and sound effects; never guess synchronization.
- Avoid introducing a new multimedia package to the Master without compatibility checks and user approval.
