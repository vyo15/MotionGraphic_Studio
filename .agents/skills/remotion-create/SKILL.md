---
name: remotion-create
description: Buat komposisi baru tanpa membuat Master baru. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-create

New video = independent add-on, NOT new Remotion project.
1. Select a unique kebab-case slug and PascalCase ID; do not change IDs when revising.
2. Create `projects/<slug>/motiongraphic-video.json` with `entry: "src/Video.tsx"`, `exportName: "Video"`, `width: 1080`, `height: 1920`, `fps: 30`, `durationInFrames` and `defaultProps: {}`.
3. Export `export const Video` in `src/Video.tsx` and put subscenes, components, animations, config and original assets inside the same project folder.
4. Put sounds in `projects/<slug>/public/audio`; inside Remotion refer to `staticFile('videos/<slug>/audio/name.wav')`.
5. Sync from the Master via `npm run sync` or `npm run dev`; do not import into the generated Root by hand.
6. Supply project README and editable-assets guide, then verify through `npm run check`.
