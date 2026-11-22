# PATCH SOUND DESIGN — CARA PASANG (SATU ZIP)

Target: **folder `MotionGraphic_Studio` yang berisi `package.json`**.

1. Tutup `npm run dev` / Remotion Studio. Simpan backup Master.
2. Buka ZIP `PASTE_LANGSUNG_KE_MotionGraphic_Studio.zip`.
3. **Salin semua isi ZIP** langsung ke folder `MotionGraphic_Studio/`. Izinkan Replace untuk file lama.
4. Jangan menyalin ZIP itu ke `projects/` dan jangan menyalin folder `patch/` karena tidak ada folder pembungkus di dalam ZIP.
5. Di Git Bash (root Master) jalankan:

   `npm test`

   `npm run qa:sound -- projects/easy2boot-multiboot-reels`

   `npm run dev`

Patch hanya menambah/memperbarui file sistem dan template. Tidak mengubah `projects/`, `src/Root.tsx`, `library/catalog.json`, atau audio video lama.

## Skill ChatGPT berbeda dari skill di Master

File `skills/sound-design-director/SKILL.md` berfungsi sebagai panduan lokal Master. **Custom Skill ChatGPT di akun tidak bisa diperbarui hanya dengan copy file ke PC**.
Untuk menyamakan pengetahuan Project ChatGPT: unggah `docs/CHATGPT-SOUND-DIRECTOR-REFERENCE.md` sekali ke tab Sumber; saat memperbarui Custom Skill Director di UI, gunakan Skill v1.3 yang sesuai.

## QA dan batasan

`npm run qa:sound -- projects/<slug> --strict` akan memeriksa sound cue jika file `production/sound-cues.json` tersedia. Tidak membuat SFX otomatis, tidak memodifikasi render, tidak menjamin sound sudah enak didengar.
