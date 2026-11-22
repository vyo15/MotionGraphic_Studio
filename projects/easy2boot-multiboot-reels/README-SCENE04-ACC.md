# Scene04 ACC — Instalasi dan Edit

**Ini patch terbatas untuk existing project** `easy2boot-multiboot-reels`, bukan video add-on baru. Jika memakai ZIP copy-paste, ekstrak sehingga folder `easy2boot-multiboot-reels` berada di bawah `MotionGraphic-Studio/projects/`; replace **file terkait saja**. Disarankan backup project sebelum mengganti file.

Source utama: `src/scenes/Scene04CopyIso.tsx`; timing `src/config/scene04Clean.ts`, `src/config/timings.ts`, VO `src/config/sceneTextVO.ts`, `src/config/narration.json`, suara `production/sound-cues.json`, manifest `motiongraphic-video.json`. Buka `npm run sync` atau `npm run dev` dari **root Master**.

## Edit tanpa flatten

- Edit nama ISO/label/path melalui `motiongraphic-video.json` > `defaultProps.scene04IsoFiles`, `scene04InstallerLabels`, `scene04FolderPaths` (empat nilai masing-masing).
- Edit teks hero: `defaultProps.scene04HeroTitle`, `scene04HeroSupport`, `scene04UsbLabel`.
- Posisi, skala, opasitas, dan warna: `defaultProps.layerOverrides["S04:<id-layer>"]` — contoh `S04:source-tile-win8`, `S04:pending-file-win8`, `S04:flying-file-win8`, `S04:focus-folder-linux`, `S04:usb-hero`, `S04:hero-title`, `S04:usb-ready`.
- Mengubah warna latar: `defaultProps.backgroundColor`; `S04:grid.visible=false` bila ingin benar-benar polos tanpa grid.
- Gerak copy: `src/config/scene04Clean.ts` (`copyStart`/`copyEnd`), satuan **frame lokal Scene04**.
- VO Guide: `scene04ShowTextVO` (default true); naskah `scene04SubtitleLines`. Matikan untuk final jika subtitle audio final digunakan.

**Catatan kompatibilitas:** sumber berupa elemen SVG React, bukan gambar penuh. Editability via Props/React bisa diperiksa dari source; drag, double-click teks, Save/reload di Studio belum dinyatakan lulus sebelum uji GUI Windows. Keyframe dan label baru perlu diverifikasi sesuai kemampuan editor Master aktual.
