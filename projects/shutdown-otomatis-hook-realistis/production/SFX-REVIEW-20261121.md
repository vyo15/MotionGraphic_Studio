# SFX Shutdown Otomatis — review

- Scene 01–06 tidak berubah secara visual atau VO; durasi tetap 1395 frame / 30 FPS.
- 15 cue original mikro (dari aset produksi Master) ditambahkan pada aksi penting, bukan setiap perpindahan teks.
- Audio SFX dapat dimatikan dengan `showSfx: false` di Props / manifest.
- `SceneSoundCues` menyala untuk video penuh **dan** preview per segmen.
- Scene 06: `shutdown /a` teks literal untuk editor langsung; typewriter menggunakan `clipPath` dan caret berbasis frame. Custom Props `scene06CommandText` menggunakan fallback teks vektor (tidak dianggap direct text editable).
- **Belum final:** sesuaikan SFX dengan rekaman VO dan putar render native di Windows sebelum rilis.
