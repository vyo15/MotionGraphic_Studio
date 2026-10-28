# Peta Kontrol Editable — V3

## Yang bisa diubah dari Props Remotion Studio

`sceneEditor.SCENE.layers.NAMA`: `x,y,scale,rotation,opacity,zIndex,enabled,startFrame,endFrame,animation,delayFrames,animationFrames`.

`sceneEditor.SCENE.copy`: teks penting. Nilai kosong memakai teks asli.

`sceneEditor.SCENE.sfxEnabled/sfxVolume`: SFX per shortcut. `voice.enabled/volume`: track suara narator.

*Transforms* sengaja dipisahkan: posisi dasar di komponen asli, translasi pengguna via `layerStyle` dan CSS longhand, animasi asli via `transform`. Menggeser layer tidak menghapus animasi tersebut.

| Scene | Kontrol detail utama (contoh) |
|---|---|
| CTRL_SHIFT_T | `tab-document`, `tab-home`, `browser-toolbar`, `browser-document`, `browser-page`, `keyboard-key-ctrl`, `keyboard-key-shift`, `keyboard-key-t`, `series-brand`, `series-footer` |
| CTRL_SHIFT_ESC | `title-demo`, `title-hotkey`, `title-problem`, `title-result`, `subtitle-problem`, `subtitle-hotkey`, `subtitle-demo`, `subtitle-result`, `task-titlebar`, `task-sidebar`, `task-search`, `task-toolbar`, `task-end-button`, `task-row-frozen`, `task-row-edge`, `task-row-explorer`, `task-process-list`, `series-brand`, `series-footer` |
| WIN_SHIFT_S | `subtitle-hotkey`, `subtitle-problem`, `subtitle-result`, `title-hotkey`, `title-problem`, `title-result`, `title-selecting`, `subtitle-selecting`, `snip-toolbar`, `snip-overlay`, `snip-selection`, `snip-toast`, `snip-desktop`, `snip-browser`, `snip-dashboard`, `series-brand`, `series-footer` |
| WIN_E | `title-problem`, `title-result`, `subtitle-problem`, `title-keyboard`, `subtitle-keyboard`, `title-new-window`, `subtitle-new-window`, `title-two-windows`, `subtitle-two-windows`, `subtitle-result`, `explorer-tabs`, `explorer-sidebar`, `explorer-toolbar`, `explorer-files`, `explorer-address`, `explorer-old`, `explorer-new`, `series-brand`, `series-footer` |
| CTRL_SHIFT_N | `browser-keyboard`, `steps`, `title-Problem`, `subtitle-Problem`, `title-Shortcut`, `subtitle-Shortcut`, `title-Result`, `subtitle-Result`, `title-Bonus`, `subtitle-Bonus`, `title-Outro`, `subtitle-Outro`, `folder-tabs`, `folder-sidebar`, `folder-toolbar`, `folder-files`, `folder-new-row`, `folder-context`, `browser-private`, `browser-tabs`, `browser-page`, `folder-zoom-name`, `series-brand`, `series-footer` |
| HOOK | `shortcut-list`, `progress`, `headline-0`, `headline-1`, `headline-2`, `headline-3`, `shortcut-chip-0`, `shortcut-chip-1`, `shortcut-chip-2`, `shortcut-chip-3`, `shortcut-chip-4` |
| CTA | `bookmark`, `headline`, `button`, `cta-button` |

## Apa yang tetap source-level?

- Isi tabel detail palsu (angka performa, tanggal Windows), glyph ikon satu-per-satu, bentuk vektor wallpaper, dan sebagian posisi internal UI dibuat dari React/HTML/CSS, bukan video rata. Perubahan mikro tersebut dapat dilakukan di `src/scenes/.../components/*.tsx` dan `styles.css`.
- **Tidak semua child UI drag/resize langsung** tersedia atau telah diuji di Windows. `Interactive.Div` ditambahkan pada banyak kontainer relevan; kemampuan drag bergantung versi Studio dan apakah style statis dapat dianalisis. Semua kontrol `sceneEditor.layers` tetap bisa diedit melalui Props.
- Timeline 5 beat dibuat menjadi node `<Sequence>` yang berbeda per shortcut, bukan komposit MP4; geser cut/split di `src/config/beat-timeline.ts`.
- Project ini **satu folder add-on**, tidak menyentuh `Root.tsx`, `package.json`, ataupun `library/catalog.json` Master.
