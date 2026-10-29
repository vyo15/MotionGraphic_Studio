# Agent notes — MotionGraphic Studio

- Only one Remotion Master. A new video belongs to `projects/<slug>/`, with `motiongraphic-video.json`, `src/Video.tsx` and its own public assets. Don't hand-edit generated `src/Root.tsx`, `src/index.ts` or `library/catalog.json`.
- Keep old IDs, slugs, scenes, source, media and archives. Run `npm run sync` for registrations and `npm run check` for validation.
- Interactive layers must have unique human-readable names; use literal JSX editable values or wire a tested manifest config. Avoid destructive computed-style rewrites.
- Layer IDs are name-based; changing names can break saved selections. Keep preview and rendered timing driven by the same props; use independent base/user/animation transforms.
- Audio assets use `staticFile('videos/<slug>/audio/name.ext')`, physically stored under project `public/audio`.
- No new runtime dependency without explicit testing and updated lockfile. HTML/SVG/React remain editable.
- Test QA/Undo/Redo, project isolation, save/reload, asset paths and ZIP packaging before claiming completion. Browser and Windows end-to-end tests require a real environment.
