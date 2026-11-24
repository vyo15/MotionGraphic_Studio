# Instruksi AI untuk add-on ini

Saat ZIP project ini diunggah ke ChatGPT/agent:

1. Baca `motiongraphic-video.json`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json`, lalu source `src/Video.tsx` dan `src/SegmentVideo.tsx` bila ada.
2. Jika tersedia dalam Master, baca `PRODUCTION-RULES.md` dan `AGENTS.md` di root.
3. Baca juga production/SCENE-VO-ACC-BOARD.md jika tersedia: tampilkan VO asli seluruh scene + status VO teks, visual, rekaman/sync dan final; jangan menebak approval.
4. Review scene pertama bila pengguna meminta workflow bertahap; jika meminta langsung build, kerjakan add-on lengkap tanpa menunggu approval. Revisi hanya segmen diminta.
5. Video lengkap = preview/render gabungan, segmen = editing detail. Sumber komponen sama; jangan flatten visual menjadi video atau screenshot.
6. Kirim add-on jika video baru, atau **FILE CHANGE ONLY (copy-paste/Replace)** jika revisi. Jangan menimpa project lain atau Master secara sembarangan.
7. Dokumen ini adalah instruksi proses, bukan fitur Remotion bawaan; drag/resize dan persistensi edit harus diuji pada versi Studio yang terpasang.
