**Catatan terbaru 21 November 2026:** referensi lama di bawah digantikan Scene05 yang sudah ACC. Rujukan aktif: `production/SCENE05-ACC-20261121.md` dan `src/scenes/Scene05Boot.tsx`.

# Scene 05 — Laptop konsisten Scene 01 (editable)

Tanggal 21 November 2026. Keputusan: gunakan laptop dari Scene 01 sebagai acuan visual, bukan 3D/3-4-angle. Implementasi yang disusun ulang berupa SVG/React, bukan rekaman video sebagai satu layer.

- 480 frame @30fps, 16 detik. Scene 06 mulai frame 2311 (sebelumnya 2251).
- Lapisan terpisah: bayangan, bezel, panel layar, layar boot, pilihan USB, agFM, folder, file ISO, setup, body bawah, USB komponen dan subtitle.
- `layerOverrides` untuk setiap id memakai key `S05:<id>`; perubahan teks `text`, posisi `x/y`, `scale`, `rotation`, `opacity`, warna dan timing.
- UI Boot Menu dan agFM adalah simulasi edukasi; konfigurasi asli antar mesin bisa berbeda.
- VO asli belum terpasang, teks subtitle adalah draft, perlu sinkronisasi setelah rekaman.

Perubahan editabilitas pada Scene 01/02/S03/S06 hanya pemecahan layer dan tidak mengubah narasi/timeline atau fungsi animasi yang disetujui. Pengujian browser native Remotion masih diperlukan di PC pengguna.
