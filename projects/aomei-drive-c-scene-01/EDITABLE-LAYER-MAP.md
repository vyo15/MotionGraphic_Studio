# LAYER MAP — AOMEI SCENE 01

Semua kelompok di dalam `Scene01Hook` berlabel `Sequence` dan editor offset via `sceneEditor`, dengan layer Interactive terpisah untuk teks/UI.

| ID / Nama layer | Komponen | Mulai–akhir | Editable |
|---|---|---|---|
| S01 — Latar off-white | Background | 0–447 | Fill via Interactive, grid via Props |
| S01 — Label editorial | SceneHeader | 0–447 | Text, garis, warna via Interactive; transform grup Props |
| S01 — File Explorer editable | ExplorerWindow | 10–280 | Window/toolbar/sidebar/details/Drive C/Drive D adalah Interactive Div |
| S01 — Border sorotan Drive C | ExplorerWindow | 56–230 | Warna/border/style via Interactive |
| S01 — Border sorotan Drive D | ExplorerWindow | 910–280 | Warna/border/style via Interactive |
| S01 — Diagram Disk 0 | DiskDiagram | 255–447 | Card, C, D, labels, tanda ?, footer via Interactive |
| S01 — Cursor / track path | WindowsCursor | 20–274 | Kursor visual via Interactive; lintasan via keyframes config |
| S01 — Subtitle VO terbaru | SceneCaptions | 0–447 | 4 teks literal Interactive, position/scale grup via Props |
| S01 — Audio VO | Video.tsx | opsional | WAV mandiri, enable/mute via Props |

**Catatan:** Layer level utama bisa dipindahkan lewat `sceneEditor`, tetapi jarak relatif cursor ke tombol harus diperiksa jika Explorer dipindah. Semua waktu interpolasi deterministic dari `useCurrentFrame`.
