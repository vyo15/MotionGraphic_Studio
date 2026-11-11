# Scene 05 — Map layer dan alur edit

ID `DebloatWindows11Opening-S05` • 705 frame • 23,5 detik • 1080×1920 • 30fps.

| Layer | Letak source | Yang dapat diganti |
|---|---|---|
| `S05 — Label SCENE 05 WINUTIL` | `src/scenes/Scene05.tsx` | Teks, font, warna, posisi |
| `S05 — Judul ...` | `src/scenes/Scene05.tsx` | Teks judul berdasarkan fase, ukuran, warna |
| `S05 — Helper ...` | `src/scenes/Scene05.tsx` | Teks pendukung masing-masing fase |
| `S05 — Subtitle ...` | `src/scenes/Scene05.tsx` | Teks per penggalan VO |
| `S05 — Jendela WinUtil` | `src/components/Scene05WinUtil.tsx` | Ukuran, posisi, warna, radius, shadow |
| `S05 — Bilah judul WinUtil` | `src/components/Scene05WinUtil.tsx` | Warna, logo, nama program |
| `S05 — Tab Install/Tweaks/Config/Updates/MicroWin` | `src/components/Scene05WinUtil.tsx` | Label/nama tab, warna aktif, layout |
| `S05 — Baris Tweak...` | `src/components/Scene05WinUtil.tsx` | Teks pilihan, kotak centang, highlight |
| `S05 — Tombol Run Tweaks` | `src/components/Scene05WinUtil.tsx` | Teks, posisi, status sorot |
| `S05 — Progress bar Restore Point` | `src/components/Scene05WinUtil.tsx` | Warna, progres, durasi |
| `S05 — Status Restore Point ...` | `src/components/Scene05WinUtil.tsx` | Teks status simulasi |
| `S05 — AppX Search Bar` | `src/components/Scene05WinUtil.tsx` | Posisi, placeholder, warna |
| `S05 — Baris AppX Xbox App` | `src/components/Scene05WinUtil.tsx` | Item, checkbox, waktu centang |
| `S05 — Baris AppX Microsoft Copilot` | `src/components/Scene05WinUtil.tsx` | Item, checkbox, waktu centang |
| `S05 — Baris AppX Feedback Hub` | `src/components/Scene05WinUtil.tsx` | Item; tidak dicentang |
| `S05 — Baris AppX Xbox Identity Provider` | `src/components/Scene05WinUtil.tsx` | Item; **tidak dicentang** |
| `S05 — Tombol Remove Selected` | `src/components/Scene05WinUtil.tsx` | Teks, status; **tidak diklik** |
| `S05 — Kursor mouse` | `src/components/Scene05Cursor.tsx`, `src/config/scene05.ts` | X/Y transform, lintasan, klik |
| VO Scene 05 | `public/audio/voiceover-scene05.wav` | Ganti audio asli per scene |

### Timing relatif Scene 05

| Detik | Tindakan |
|---|---|
| 0–1,73 | Jendela WinUtil tab Install |
| 1,73 | Klik tab Tweaks |
| 3,70 | Centang Create Restore Point |
| 5,56 | Klik Run Tweaks |
| 5,85–8,00 | Indikator progres simulasi |
| 8,90–13,72 | Kembali memilih tweak sesuai kebutuhan |
| 13,72 | Buka AppX Removal |
| 16,15 | Centang Xbox App |
| 18,15 | Centang Microsoft Copilot |
| 18,15–23,5 | Tahan tampilan dua item terpilih |

**Layer terpisah** artinya bisa dimodifikasi secara independen lewat source/fitur Interactive ketika didukung. Ini **tidak** berarti otomatis semua React wrapper draggable/resizeable lewat browser. Seluruh UI hanyalah simulasi video, bukan tindakan pada komputer.
