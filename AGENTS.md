# MOTIONGRAPHIC-STUDIO — Petunjuk agen AI (selalu aktif)

Ini merupakan **satu Master Remotion** yang sudah ada. Jangan scaffold Remotion baru saat membuat video tambahan. Video ditempatkan sebagai add-on terpisah di `projects/<slug>/`. Pertahankan seluruh video, aset dan arsip yang ada; revisi terbatas pada project/scene yang diminta.

## Yang dibaca sebelum mengubah kode

- `PROMPT-PROYEK-CHATGPT.md` (workflow dan batasan pengguna).
- `PANDUAN-SKILL-REMOTION.md` (status dan cara memperbarui skill).
- `.agents/skills/remotion-best-practices/SKILL.md`, kemudian skill yang terkait seperti `remotion-interactivity`, `remotion-markup`, `remotion-captions`.
- `projects/<slug>/motiongraphic-video.json`, README, dan source komposisi terkait sebelum revisi.

## Kontrak yang tidak boleh dilanggar

- Jangan menyunting `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, atau `package.json` Master untuk mendaftarkan video; gunakan `npm run sync` / `npm run dev`.
- Tidak boleh menimpa folder project lain, arsip atau backup lama.
- Manifest video dan `src/Video.tsx` adalah antarmuka add-on; `export const Video` wajib ada.
- Gunakan `staticFile('videos/<slug>/...')` untuk aset asli di `projects/<slug>/public/`.
- Jangan flatten scene jika layer perlu editable. Beri nama independen pada scene/objek, animasi harus deterministik per frame.
- Prioritas: teks bisa diedit tanpa VS Code, drag/resize/rotate bisa disimpan dan bertahan sesudah reload, dan preview/render identik.
- Source baru harus sesuai API Remotion terpasang; `Interactive` biasa jangan diasumsikan mendukung edit tanpa validasi. Favoritkan JSX inline untuk native Remotion Studio jika benar didukung.
- Selalu audit `npm run check` serta uji manual Studio bila tersedia. Jangan mengklaim fitur editor berfungsi tanpa pengujian.

**Catatan:** folder `.agents/skills` menyediakan petunjuk untuk coding agent yang mendukung Agent Skills. Folder itu tidak otomatis menginstal plugin di ChatGPT maupun mengubah editor visual yang berjalan.
