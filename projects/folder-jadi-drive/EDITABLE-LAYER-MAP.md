# Layer map — 88 target native statis, 24 Props text/appearance targets + 7 kontrol tambahan
| Scene | Target utama | Props/data dinamis |
|---|---|---|
| S01 | Struktur folder per jenjang, card dasar, ikon Project, label Project, panel This PC, C/D individual, Swiss typography/underline | projectName, workFolderName, yearFolderName, drive, projectIconUrl |
| S02 | Explorer, pointer, Ctrl, C, clipboard | folderPath, file labels, cursorPathS02 |
| S03 | Explorer outgoing, clipboard, Win/R/Enter, Run, CMD | runCommand, terminalPrompt/version/copyright |
| S04 | CMD, supporting labels, underline, clipboard, Enter | drive, folderPath, terminal fields |
| S05 | Explorer hasil, pointer, folder asli/icon/label/path, restart, CTA, data tetap | projectName, drive, files, cursorPathS05 |
| S06 | Folder hero/icon/label, drive hero/icon/label, arrow, cover title/penekanan/keterangan | projectName, drive, projectIconUrl |
| Subtitle | 30 literal line targets, plus dua Swiss text pada S01 | position/size/weight/color, captionSource, narration.json timing |
| Semua | User transform terpisah dari animation transform | mainLayouts, motionRates, motionOffsets, fontFamily, backgroundColor |

Nama native eksak dan lokasi source tercatat pada `production/editable-blueprint.json`. Native target statis bukan bukti drag/save. UI internal dan geometri detail tetap bisa diubah lewat Props yang tersedia atau source komponen; bukan masing-masing primitive memiliki kontrol visual mandiri. Tidak ada MP4 embedded.
