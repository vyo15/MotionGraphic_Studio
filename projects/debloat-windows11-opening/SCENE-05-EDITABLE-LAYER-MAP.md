# Scene 05 — Peta Layer Editable (Patch Smooth v5)

Komposisi: `DebloatWindows11Opening-S05` — **630 frame / 21 detik / 30 fps**.

## Urutan berdasarkan VO terbaru

| Waktu visual perkiraan | Voice-over | Tindakan UI |
|---|---|---|
| 0–3,0 dtk | Begitu WinUtil terbuka, masuk ke tab Tweaks. | Kursor menuju tab Tweaks; klik ±1,27 dtk |
| 3,0–8,05 dtk | Centang Create Restore Point, lalu klik Run Tweaks. | Centang ±3,73; klik Run Tweaks ±5,28; proses sampai ±7,60 |
| 8,05–10,65 dtk | Setelah itu, buka AppX Removal. | Kursor menuju AppX; klik ±9,11 |
| 10,65–15,4 dtk | Pilih aplikasi yang nggak kepakai, misalnya Xbox atau Copilot. | Pilih Xbox ±11,47 dan Copilot ±12,65 |
| 15,4–21 dtk | Kalau udah yakin, klik Remove Selected. | Klik ±15,60; proses ilustratif sampai ±20,40 |

Waktu ini acuan visual tanpa VO asli. Jika rekaman dimasukkan, sesuaikan onset visual mengikuti audio.

## File revisi

- `src/scenes/Scene05.tsx`: heading dan subtitle teks literal `Interactive.Div` per beat.
- `src/config/scene05.ts`: teks referensi, posisi, klik, path kursor, durasi, dan timing.
- `src/animations/scene05.ts`: interpolasi easing dan lintasan melengkung deterministik.
- `src/components/Scene05Cursor.tsx`: kursor editable + respons klik.
- `src/components/Scene05WinUtil.tsx`: state UI, checkbox, Remove Selected, dan progress bawah.
- `src/Video.tsx`: durasi scene 05 menjadi 630 frame; source Scene 01–04 dan 06 tidak diubah.
- `motiongraphic-video.json`: segmen 05 jadi 630 frame, start segmen 06 jadi 2235, total 2752 frame.

## Cara mengedit

Edit teks dengan memilih layer bertanda `S05 — ...` di Remotion Studio yang mendukung `Interactive.Div`. Atau ubah literal teks pada `Scene05.tsx`.

Untuk mengubah jalur kursor, edit `cursorKeyframes`, `clickTimes` dan `time` dalam `src/config/scene05.ts`. Jangan ubah titik klik saja tanpa menggeser state antarmuka terkait.

Semua visual tetap berupa React/HTML/SVG per layer; audio VO sebelumnya masih placeholder. Tampilan WinUtil, proses restore dan remove hanyalah simulasi demonstrasi, bukan eksekusi nyata.
