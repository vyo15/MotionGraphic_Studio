# PANDUAN EDIT — REMOTION STUDIO BAWAAN MASTER v1.8.1

**Tidak menggunakan Visual Editor tambahan, batch file, atau format project baru.**

1. Backup folder `MotionGraphic-Studio/projects/easy2boot-multiboot-reels` yang sudah ada.
2. Copy folder `easy2boot-multiboot-reels` dari ZIP ini ke `MotionGraphic-Studio/projects/`, ganti hanya folder Easy2Boot (jangan sentuh video lain).
3. Di folder Master jalankan `npm run sync`, lalu `npm run dev`.
4. Pilih `Videos > Easy2Boot ... > Scenes > S01` sampai `S06`. Komposisi Full-Video untuk review/render 80 detik.
5. Di setiap scene, pilih layer bernama `S01 — ...` dst menggunakan Remotion Interactive untuk mengubah posisi, skala, rotasi. Layer berupa SVG vektor, bukan gambar/video flatten.
6. **Teks dan label dinamis:** edit nilai `title...`, `cta...`, `cover...` melalui **Props** pada Remotion. Simpan menggunakan tombol Save Props yang didukung Master, jangan mengedit katalog atau Root manual.
7. Untuk warna, background, teks, dan audio gunakan Props `backgroundColor`, `fontFamily`, `layerOverrides`, `showSfx`, `showSubtitles`, `showVoiceOver`.
8. **Batasan jujur:** teks dalam sub-elemen SVG tidak otomatis menjadi editable text inline; tidak setiap titik path bisa diubah lewat drag. Penyesuaian teks dilakukan melalui Props. Timeline dan keyframe terprogram tidak menjadi draggable keyframe editor bawaan. Jangan klaim seluruh 932 SVG node dapat diedit satu per satu.
9. Semua file SFX sumber ada di `public/audio/`. Voice-over final belum ada, `showVoiceOver` default false.
10. Setelah mengedit, cek Scene 01 tengah & akhir, Scene 06 CTA & cover, kemudian `npm run check` sebelum render.

File lama `editor/` dan `Buka-Editor-Windows.cmd` sengaja dihapus dari paket Native Remotion ini supaya tidak ada Studio/editor kedua.
