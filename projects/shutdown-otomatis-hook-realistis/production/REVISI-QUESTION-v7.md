# Revisi Question Motion v7 — 22 Nov 2026

- ACC user: Pertanyaan centered tanpa garis; tanda tanya 5; jam berputar/mengambang dan diteruskan ke solusi.
- Source SVG/React berasal dari preview v6 yang disetujui, bukan video di-flatten.
- S02 165 frame → question 135 frame → solution 210 frame; total video 1920 frame (64 detik).
- Scene Questions mandiri pada Composition `S03Pertanyaan`.
- File Scene03.tsx tetap jadi scene solusi (display S04).
- Timings VO/subtitle/SFX setelah pertanyaan bergeser 135 frame; cue SFX lama tetap terikat ke scene asli.
- Tidak menyisipkan VO audio rekaman: belum ada file rekaman final.
- Validasi kontrak native edit dan sync tersedia; Remotion GUI Save/reload/render final belum diuji pada Windows.
- Untuk revisi scene per scene, buka storyboard HTML dan sebut Scene 01–09.
