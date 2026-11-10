# Scene 04 — Peta Layer Editable

**Komposisi:** `DebloatWindows11Opening-S04` — 450 frame / 15 detik @ 30 fps.

## Peta layer

| Komponen | Nama layer Studio | Lokasi source | Editable |
|---|---|---|---|
| Background Windows 11 | `S04 — Wallpaper Windows 11 Bloom (aset bisa diganti)` | `src/components/Scene04Windows.tsx` | Aset gambar/posisi/dimensi/opacity (ganti `public/images/windows11-bloom-scene04.png`) |
| Logo/tampilan desktop | `S04 — Recycle Bin Desktop`, `S04 — Edge Desktop`, `S04 — Taskbar Windows 11` | `Scene04Windows.tsx` | HTML/SVG terpisah, bukan screenshot |
| Windows Search | `S04 — Teks Search PowerShell`, `S04 — Hasil Nama Windows PowerShell`, `S04 — Tombol Run as administrator` | `Scene04Windows.tsx` | Teks, warna, ukuran, posisi |
| Dialog UAC | `S04 — Dialog User Account Control`, `S04 — UAC Tombol Yes`, `S04 — UAC Tombol No` | `Scene04Windows.tsx` | Layer dan teks |
| PowerShell | `S04 — Jendela PowerShell / Warna / Posisi`, `S04 — Judul PowerShell Administrator`, `S04 — Prompt PowerShell` | `Scene04Terminal.tsx` | Warna, ukuran, posisi, teks |
| **Command** | **`S04 — PERINTAH SATU BARIS (edit teks di sini)`** | `Scene04Terminal.tsx` | Teks langsung, tanpa line wrap |
| Progress bar | `S04 — Loading Bar (edit posisi dan warna)` | `Scene04Terminal.tsx` | Posisi, ukuran, warna dan waktu/kecepatan via config |
| WinUtil | `S04 — Jendela WinUtil`, `S04 — Tab WinUtil ...` | `Scene04WinUtil.tsx` | HTML/CSS setiap baris/tab, teks sebagai layer |
| Kursor | `S04 — Kursor Windows (X/Y editable)` | `Scene04.tsx` + config | Ukuran, warna SVG, transform, lintasan keyframe |
| Headline | `S04 — Judul ...`, `S04 — Helper ...` | `Scene04.tsx` | Teks dan styling langsung di Interactive |
| Subtitle | `S04 — Subtitle 1` sampai `S04 — Subtitle 4` | `Scene04.tsx` | Teks langsung pada setiap layer |
| Audio | `voiceover-scene04.wav` | `public/audio/` | Ganti file, nyalakan prop `voiceEnabled` |

## Timing dan koordinat

Semua waktu, panjang scene, dan koordinat dasar berada di `src/config/scene04.ts`:
- Cari PowerShell: 1,15 s; Run as administrator: 4,23 s; UAC Yes: 5,20 s.
- Terminal masuk: 5,75 s; ketik: 7,05–9,90 s; Enter: 10,12 s.
- **Progress bar:** 10,30–12,15 s; WinUtil muncul: 12,43–12,95 s.

`src/animations/scene04.ts` menangani easing dan kursor. Komponen animasi adalah **pembungkus** layer, sedangkan posisi/ukuran pengguna berada di `Interactive.Div` masing-masing; drag tidak mengganti path animasi.

## Perintah satu baris

Default: `irm https://christitus.com/win | iex`.

Perintah di terminal memakai **teks HTML yang sama sebagai satu layer**; sepanjang animasi ketik yang berubah adalah lebar pembungkusnya, bukan karakter yang dihasilkan dua objek berbeda. Properti `whiteSpace: 'pre'` menjaga satu baris. Jika mengganti perintah ke teks yang jauh lebih panjang, perbarui `SCENE04.command` di konfigurasi agar timing/clip mengetik tetap sesuai, dan perbesar terminal atau kecilkan font jika memang diperlukan. Jangan tampilkan perintah palsu dengan baris baru.

## Catatan validitas

Progress bar adalah **visualisasi untuk penonton**, bukan klaim bahwa WinUtil benar-benar mengeluarkan bar persen seperti itu pada PowerShell. Wallpaper adalah ilustrasi bergaya Windows 11 Bloom dan antarmuka yang tampak direkonstruksi; bukan rekaman desktop asli. Berkas WAV bawaan hanya hening, VO final belum disediakan.
