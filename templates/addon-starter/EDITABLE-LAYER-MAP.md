# Layer Map — template native Studio

| Layer name | Source | Editable via Studio | Checks |
|---|---|---|---|
| S00 — Background | `src/components/EditorialBackground.tsx` | color/background, posisi | Select + Save + reload |
| S01 — Judul | `src/scenes/Scene01.tsx` | text literal, posisi, font, opacity, keyframe | Ubah teks dan drag, simpan |
| S01 — Kartu informasi | `src/scenes/Scene01.tsx` | ukuran, background, border, animasi | Ubah ukuran, keyframe, simpan |
| S01 — Subtitle 01 | `src/scenes/Scene01.tsx` | Teks literal, posisi; timing frame 128–218 (end eksklusif), `showSubtitles` via Props | Klik subtitle, ganti teks, Save/reload |
| S01 — Isi kartu | `src/scenes/Scene01.tsx` | text, font, posisi | Ubah teks, simpan |

Penting: ini template, bukan sertifikat 100% editable. Lakukan uji langsung di GUI Windows dan render setelah menyimpan. Untuk video baru, perbarui tabel ini agar setiap elemen penting tercatat, termasuk UI, cursor, audio dan subtitle.

Target penting wajib sesuai `production/editable-blueprint.json`; gate tidak menggantikan pengujian GUI.
