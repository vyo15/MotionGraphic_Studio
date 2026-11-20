# Change list — V35 Editable

## Dibuat/diubah dari basis project shutdown V17 + revisi stickman V29/V31

- `motiongraphic-video.json` — 960 frame, 4 segmen, defaultProps untuk 38 layer dan subtitle.
- `src/Video.tsx` — 4 segmen asli + track subtitle + VO opsional.
- `src/SegmentVideo.tsx` — 4 scene independen memakai komponen yang sama.
- `src/scenes/Scene01Hook.tsx`, `Scene02Download.tsx` — artwork vektor V29/V31 dengan layer interaktif.
- `src/scenes/Scene03Time.tsx` — kartu dua masalah → jam → timer.
- `src/scenes/Scene04Run.tsx` — keyboard shortcut, jendela Run, input perintah, mouse, hasil ilustratif.
- `src/components/stickman-scene.mjs`, `stickman-download.mjs` — penambahan teks editable dari Props, geometri dan frame gerak lama dipertahankan.
- `src/components/editable/EditableG.tsx`, `NativeSvgLayers.tsx`, `SubtitleTrack.tsx` — grup visual dan subtitle independen.
- `src/components/ui/WindowsRun.tsx`, `EditorialFrame.tsx` — UI reusable.
- `src/config/editable.ts`, `timeline.ts`, `voice.ts` — kontrol sentral.
- `src/config/design.ts` — dibawa dari versi sebelumnya, isi tidak diubah.
- `PRODUCTION-STATE.json`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `EDITABLE-LAYER-MAP.md`, `README.md`, `PANDUAN-EDIT-ASSET.md`, `VALIDASI.md` — dokumentasi proyek.

Tidak ada perubahan manual pada Master `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, `package.json`, dan tidak ada video/project lain dalam paket.
