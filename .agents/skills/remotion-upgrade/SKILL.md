---
name: remotion-upgrade
description: Pembaruan versi aman. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-upgrade

Do not automatically upgrade Remotion packages in the existing Master.
- Record current versions of `remotion`, `@remotion/cli` and the project's dependencies before proposing an upgrade.
- Make a full backup first; test a copy with `npm run check`, Studio visual edit/save/reload and one render.
- Keep compatible Remotion package versions synchronized; apply changes only when user approves them.
- For agent instruction updates, run the double-click installer or `node tools/remotion-skills.mjs install`; these are distinct from code/library upgrades.
- Preserve all archive and project folders as-is.
