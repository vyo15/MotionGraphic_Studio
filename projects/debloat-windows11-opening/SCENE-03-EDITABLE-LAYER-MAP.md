# SCENE 03 — PETA LAYER EDITABLE

Scene 03 menggunakan data 30 FPS, durasi 450 frame, posisi desain 1080x1920. Semua objek adalah SVG/HTML/CSS/Interactive. Yang menyatu dengan satu objek hanyalah bagian SVG dari objek itu (garis/bodi), **bukan seluruh scene**.

| Kelompok | Layer langsung di Studio | Sumber utama |
|---|---|---|
| Identitas | S03 — Label SCENE 03 WINUTIL; APLIKASI BAWAAN; WINUTIL DEBLOAT; Pembuat Chris Titus Tech | `src/scenes/Scene03.tsx` |
| App cards | S03 — Kartu Icon Xbox/Bing Search/Copilot; S03 — Ikon ... (terbang); S03 — Teks ... | `src/components/Scene03Trash.tsx` |
| Tong sampah | S03 — Tong Sampah SVG Badan; S03 — Tutup Tong Sampah SVG; S03 — Status ... | `src/components/Scene03Trash.tsx` |
| GitHub UI | S03 — Browser GitHub / Kartu Putih; Toolbar; Tab Repository; URL; Logo; Pemilik; Nama Repository; Public | `src/components/Scene03Github.tsx` |
| Open source | S03 — File .github/docs/scripts/README.md; Badge Open Source | `src/components/Scene03Github.tsx` |
| Stars | S03 — Background Panel GitHub Stars; Icon Star GitHub SVG; Angka 65K+ GitHub Stars; Label GITHUB STARS | `src/components/Scene03Github.tsx` |
| Subtitle | S03 — Subtitle Buat Ngerapihinnya; Tools Debloat; Chris Titus Tech; Open Source; Jumlah Stars; Di GitHub | `src/scenes/Scene03.tsx` |
| Audio | `voiceover-scene03.wav` (sunyi, placeholder) | `public/audio/` |

## Waktu visual (detik)

- 0–2.65: kartu app dan tong terbuka
- 2.65–3.70: Xbox masuk tong
- 3.85–4.90: Bing Search masuk tong
- 5.00–6.05: Copilot masuk tong
- 6.40–7.10: tong menutup
- 6.75–7.35: pindah ke panel GitHub
- 7.40–9.20: folder kode muncul bertahap
- 8.55–9.20: Open Source
- 9.60–11.90: Star icon → label → 65K+ (tanpa zoom)
- 11.90–15.00: visual hasil ditahan untuk dipahami

Gunakan `src/config/scene03.ts` untuk mengubah timing. `basePosition` ikon disimpan di konfigurasi/definisi sumber, keyframe dijalankan pada wrapper agar transform Interactive tetap independen.
