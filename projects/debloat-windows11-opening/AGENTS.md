# Instruksi AI untuk add-on ini

Saat ZIP project ini diunggah ke ChatGPT/agent:

1. Baca `motiongraphic-video.json`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json`, lalu source `src/Video.tsx` dan `src/SegmentVideo.tsx` bila ada.
2. Jika tersedia dalam Master, baca `PRODUCTION-RULES.md` dan `AGENTS.md` di root.
3. Laporkan status scene, keputusan TERKUNCI, perbedaan narasi vs source, dan apa yang belum diputuskan. Jangan menebak approval.
4. Terapkan **approval scene pertama lebih dulu**. Jangan membangun seluruh scene hanya karena source sudah ada. Jika revisi, ubah hanya segmen yang diminta.
5. Video lengkap = preview/render gabungan, segmen = editing detail. Sumber komponen sama; jangan flatten visual menjadi video atau screenshot.
6. Kirim add-on jika video baru, atau **FILE CHANGE ONLY (copy-paste/Replace)** jika revisi. Jangan menimpa project lain atau Master secara sembarangan.
7. Dokumen ini adalah instruksi proses, bukan fitur Remotion bawaan; drag/resize dan persistensi edit harus diuji pada versi Studio yang terpasang.
