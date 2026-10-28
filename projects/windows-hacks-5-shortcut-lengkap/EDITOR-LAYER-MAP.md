# PETA LAYER — 7 ADEGAN

Buka **Props → sceneEditor → [ADEGAN] → layers**. Setiap layer memiliki offset `x/y` terpisah dari transform animasinya. Semua nilai awal `x=0`, `y=0`, `scale=1`, `opacity=1` kecuali bila diubah sendiri.

| Adegan | Layer utama yang bisa dipilih | Contoh pengeditan |
|---|---|---|
| HOOK | badge, headline, shortcut-list, progress | Pindah daftar shortcut, ubah teks hook di `copy` |
| CTRL_SHIFT_T | window, cursor, title, subtitle, badge, keyboard, annotation, success | Posisi browser, arah kursor, pesan tab kembali |
| CTRL_SHIFT_ESC | window, cursor, zoom, keyboard, title-problem/hotkey/demo/result, subtitle-problem/hotkey/demo/result, annotation, success | Jendela Task Manager dan zoom End task secara terpisah |
| WIN_SHIFT_S | window, cursor, zoom, keyboard, title-problem/hotkey/selecting/result, subtitle-problem/hotkey/selecting/result, annotation, success | Jendela Snipping Tool dan pembesaran seleksi |
| WIN_E | window, cursor, keyboard, comparison, title-problem/keyboard/new-window/two-windows/result, subtitle..., annotation, success | Dua File Explorer, panel perbandingan dan label |
| CTRL_SHIFT_N | window, cursor, zoom, keyboard, browser-keyboard, comparison, title-Problem/Shortcut/Result/Bonus/Outro, subtitle..., annotation, success, steps | Proses buat folder dan bagian bonus browser |
| CTA | badge, bookmark, headline, subtitle, button | Ubah posisi ikon bookmark dan ajakan simpan |

## Edit teks dari Props

- `CTRL_SHIFT_T.copy`: `title-top`, `title-bottom`, `subtitle`, `tab-title`, `document-title`, `success`, `success-prefix`.
- `CTRL_SHIFT_ESC.copy`: `title-problem-top`, `title-problem-bottom`, `subtitle-problem` (serta hotkey/demo/result), `task-app`, `task-status`, `task-action`.
- `WIN_SHIFT_S.copy`: `title-problem-top`, dst (hotkey/selecting/result), `subtitle-*`, `clipboard-text`, `clipboard-subtitle`.
- `WIN_E.copy`: `title-problem-top`, dst (keyboard/new-window/two-windows/result), `subtitle-*`.
- `CTRL_SHIFT_N.copy`: `title-Problem-top`, dst (Shortcut/Result/Bonus/Outro), `subtitle-*`, `folder-name`, `private-title`.
- `HOOK.copy`: `heading-0-first`, `heading-0-second`, `heading-0-tag` sampai indeks 3.
- `CTA.copy`: `cta-first`, `cta-second`, `cta-top`, `cta-small`, `cta-button`.

Contoh: Untuk membuat Task Manager lebih kecil tanpa merusak zoom, ubah `sceneEditor.CTRL_SHIFT_ESC.layers.window.scale` menjadi `0.90`, tetapi biarkan `sceneEditor.CTRL_SHIFT_ESC.layers.zoom.scale` pada `1.00`.

Contoh lain: untuk menggeser kursor Win+E ke kanan 20px tanpa mengubah lintasan animasi, isi `sceneEditor.WIN_E.layers.cursor.x=20`.

## Cara menambah atau menghapus jeda

Jeda akhir masing-masing scene ada pada `TIMELINE` (lihat `VOICEOVER-CUES.md`). Durasi demo aslinya tidak diperlambat. Bila mengedit timeline, pastikan total frame di manifest sesuai dan scene yang dipakai tidak saling tumpang tindih.

**Catatan penting:** Layer mikro di dalam jendela UI (teks tombol Windows, banyak baris daftar, posisi toolbar) tetap HTML/CSS/SVG dan dapat diubah pada `components/` serta `config/video.ts`, namun belum semuanya diekspos menjadi kontrol drag individual di Remotion Studio.
