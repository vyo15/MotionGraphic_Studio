# Template kerja Motion Plan (bukan plan JSON final)

Baca `docs/MOTION-PLAN-CONTRACT.md` di root Master. Isi narration lengkap, lalu buat `production/motion-plan.json` dengan hash narration (`node tools/qa-motion-plan.mjs <folder-addon> --fingerprint`), status draft dan satu item per beat termasuk silent. Tambah `motionPlanContract: "focus-driven-v1"` ke manifest setelah plan siap.

| Beat index | Intent | Target | Motion + alasan | State in/out | Camera pose | Action/reaction/hold | Handoff | Collision policy | Editable targets | Sound cue/omit |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | isi | isi | isi | isi | null atau world pose | offset frame | start | isi | isi | isi |

Template placeholder tidak menyatakan plan telah lulus. QA metadata: `node tools/qa-motion-plan.mjs <folder-addon>`; lanjut preview bergerak, frame/collision, GUI dan render. Jangan retrofit proyek lama.
