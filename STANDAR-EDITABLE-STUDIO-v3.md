# Kontrak V3 untuk Add-on Baru

Gunakan `editableContract: "studio-direct-v3"` pada manifest baru jika semua teks utama dan posisi yang dijanjikan benar-benar dapat diedit lewat Interactive.* atau konfigurasi yang didukung. Nilai computed untuk teks headline/CTA tidak boleh menjadi satu-satunya sumber editing.

Pengecualian: add-on lama `windows-hacks-5-shortcut-lengkap` memakai `studio-inline-v2` agar tidak dimigrasi secara destruktif. UI baru menolak overwrite properti yang computed. Periksa `npm run check` untuk audit dan hasil rinci. Jangan mengubah kontrak ke V3 tanpa migrasi dan pengujian yang valid.
