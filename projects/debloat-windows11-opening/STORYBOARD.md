# Storyboard — Debloat Windows 11, progres Scene 01–02

Naskah dikunci; Scene 03–06 belum dibangun. **VO hanya tersedia sebagai teks, bukan audio final.**

| Scene | Durasi | VO / Beat | Pesan utama | Objek utama | Aksi objek (sebab → akibat) | Teks layar | Transisi / continuity | Editable assets |
|---|---:|---|---|---|---|---|---|---|
| 01 | 8s | Ternyata, nggak semua fitur bawaan Windows 11 harus kita pakai, lho. | Banyak fitur ada, tidak harus dipakai | Windows + Start Menu + kartu aplikasi | Windows → Start Menu → aplikasi muncul dan berkumpul → Xbox dipilih | FITUR BAWAAN; SEMUANYA DIPAKAI? | Xbox dari Scene 01 dipertahankan ke Scene 02 | UI, judul, kartu, ikon, subtitle |
| 02A | 0–3,45s | Gue sendiri jarang pakai Xbox... | Pengguna jarang memakai Xbox | kartu / aplikasi Xbox | Kartu Xbox dari S01 → tampilan Xbox diperbesar | Xbox | Kartu dari ending Scene 01 ke panel | UI Xbox, teks, logo, subtitle |
| 02B | 3,45–6,45s | Bing Search... | Integrasi Bing di Windows Search | Windows Search | UI Xbox bergeser → panel Search | Bing Search | Pergerakan antarpanel | UI Windows Search, ikon, teks |
| 02C | 6,45–10,2s | sama Copilot. | Contoh fitur Copilot | Panel Copilot | Search berganti panel Copilot | Copilot | Crossfade halus | UI Copilot, teks, ikon |
| 02D | 10,2–15,5s | Nah, daripada nggak kepakai, mending kita rapihin aja. | Tinjau fitur tidak terpakai; **belum menghapus** | Xbox + Bing + Copilot | Tiga kartu muncul dan tersusun menjadi daftar review | JARANG DIPAKAI; Belum dihapus | Daftar ini menjadi jembatan ke pengenalan WinUtil | kartu, baris, teks, subtitle |

Target visual: Minimal Editorial, off-white, grid samar, kartu putih dan aksen coral. Satu fokus visual pada satu waktu. UI masih simulasi grafis, bukan bukti konfigurasi Windows sungguhan.

## Scene 03 — Simulasi Debloat → GitHub → Stars (DITAMBAHKAN, 15 detik)

| Scene | Durasi | VO/Beat | Pesan | Objek | Sebab → akibat | Teks layar | Continuity | Editable assets |
|---|---|---|---|---|---|---|---|---|
| S03a | 0–2.65s | “Buat ngerapihinnya, kita bisa manfaatin tools debloat...” | Aplikasi bawaan dapat ditinjau | Xbox / Bing / Copilot + tong | App Scene 02 ditampilkan ulang; tong terbuka | APLIKASI BAWAAN | Freeze frame terakhir S02 → kartu aktif S03 | 3 ikon, 3 nama, tong body/lid, judul |
| S03b | 2.65–6.75s | “...bernama WinUtil, buatan Chris Titus Tech.” | Simbol fungsi penghapusan | Tiga ikon terbang masuk tong | Xbox → Bing → Copilot masuk satu-satu → tong menutup | WINUTIL · DEBLOAT, Chris Titus Tech | Gerakan objek, bukan panah/garis | Tiap ikon, lintasan, status, judul, pembuat |
| S03c | 6.75–9.6s | “Tools ini open-source” | Kode sumber tersedia | Panel GitHub / file repository | WinUtil → Github, file muncul bertahap | Open Source | Crossfade lembut | Browser, logo, URL, nama repo, file, badge |
| S03d | 9.6–15s | “...udah punya lebih dari 65 ribu stars di GitHub.” | Minat komunitas | Ikon bintang dan angka | Ikon bintang → label → angka 65K+, tanpa zoom besar | 65K+ GITHUB STARS | Hold hingga siap masuk Scene 04 | Ikon bintang, angka, label, catatan |

Catatan fakta: bintang GitHub **bukan** rating bintang 1–5, bukan jumlah pengguna, dan bukan bukti keamanan. Animasi tong sampah hanyalah metafora; penghapusan aplikasi **bukan** pemindahan ke Windows Recycle Bin. Timing ini estimasi sebelum rekaman VO asli disediakan.

## Scene 04 — PowerShell sebagai Administrator (15 detik)

| Scene | Durasi | VO/Beat | Pesan utama | Objek utama | Sebab → akibat | Teks layar | Transisi | Editable assets |
|---|---|---|---|---|---|---|---|---|
| S04a | 0–3,3s | “Buat mencobanya, buka PowerShell...” | Temukan terminal | Desktop Windows 11 / Search | Search dibuka → PowerShell terlihat | BUKA POWERSHELL | Stars Scene 03 → Desktop Bloom | Wallpaper, taskbar, Search, kursor, subtitle |
| S04b | 3,3–5,7s | “...sebagai Administrator...” | Membuka dengan hak admin | Search → UAC | Run as administrator → Yes | JALANKAN SEBAGAI ADMIN | Search tetap dalam viewport sama | Search result, UAC, tombol, kursor |
| S04c | 5,7–10,1s | “...lalu masukkan perintah ini.” | Ketik perintah dengan benar | PowerShell | Perintah muncul **satu baris** | `irm https://christitus.com/win \| iex` | UAC hilang → Terminal | Terminal, teks perintah, caret |
| S04d | 10,1–12,4s | jeda demonstrasi | Enter memicu proses | Terminal | Enter → progress bar bergerak | Processing... | Dalam window yang sama | Progress track/fill, easing |
| S04e | 12,4–15s | hold hasil | WinUtil terbuka | WinUtil | Progress selesai → aplikasi muncul | WINUTIL TERBUKA | Siap lanjut Scene 05 | UI WinUtil, tab, subtitle |

VO final belum ada, sehingga timing masih mengikuti preview disetujui dan dapat disesuaikan nanti.
