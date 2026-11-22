# Scene 10–11 — CTA & Cover Reels v59 (source v57/v58)

- Source: `src/scenes/Scene10To11Flow.tsx` (shared React/SVG timeline, 390 frames at 30 FPS).
- Scene 10: `Scene10CTA.tsx`, frameOffset 0, 240 frames, 8 seconds.
- Scene 11: `Scene11CoverReels.tsx`, frameOffset 240, 150 frames, 5 seconds.
- Scene 10 and Scene 11 are separate selectable Remotion Studio segments, but run **one shared motion timeline**. The cover clock comes from the CTA comment/status badge; no MP4 overlay or duplicate clock handoff.
- Title, CTA copy, subtitle VO, comment placeholder, cover title, timer text, and tagline can be edited through `Props` on the composition. Important individual SVG items have `Interactive.Text` / `Interactive.G` names for selection in the native editor.
- Move CTA title/card or cover title/clock/timer/summary via Props. The clock center is Y=950 and radius=110 in 1080×1920 (cover v58, moved up from Y=1065).
- Background uses `backgroundColor` default #F7F7F5, font Inter, charcoal and coral colors from project Props. No grid/decoration from the legacy CTA source.
- The CTA subtitle follows VO guidance, but is **not synced to a recorded VO file**. Scene 11 has no VO.
- Earlier scenes S01–S09 and all other projects are left unchanged. This patch contains only files under this project's folder.
- Static native layer and source tests do not establish actual Windows Remotion Studio drag, double-click, Save/reload or official CLI render.
