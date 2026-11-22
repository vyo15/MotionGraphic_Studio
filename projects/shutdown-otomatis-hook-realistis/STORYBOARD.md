# STORYBOARD TERBARU — Shutdown Otomatis (9 scene)

> Revisi ACC: Scene 03 pertanyaan 4,5 detik; centered typography tanpa garis; 5 tanda tanya; jam bergerak menerus ke scene solusi. Scene lainnya tidak didesain ulang.

- Durasi: **64 detik / 1920 frame / 30 FPS**
- Resolusi: **1080 × 1920 (Reels 9:16)**
- Status VO: **belum ada rekaman final**.
- Pembuatan: **native React / SVG Interactive**, bukan PNG atau MP4 flatten.

| Scene | Waktu | VO | Visual & animasi | Kelanjutan |
|---|---|---|---|---|
| 01 | 00:00,0–00:08,0 | Pernah nggak sih ketiduran pas lagi nonton, tapi laptopnya masih nyala semalaman? | Stickman menonton video, menguap lalu tertidur; laptop tetap menyala. | Karakter, laptop, dan ruangan diteruskan ke tampilan download. |
| 02 | 00:08,0–00:13,5 | Atau malah sebaliknya, udah ngantuk, tapi download belum selesai? | Layar laptop berubah menjadi UI unduhan, dari 75% menuju 76%. | Laptop tetap terlihat ketika jam mulai muncul; bukan pindah ke desain baru. |
| 03 | 00:13,5–00:18,0 | Emang ada solusinya? | Slide editorial bersih; judul tengah tanpa garis; lima tanda tanya mengitari jam analog yang berputar dan mengambang. | Jam yang sama berada di tengah dan diteruskan ke solusi secara match move. |
| 04 | 00:18,0–00:25,0 | Tenang, kamu bisa atur laptop biar mati sendiri secara otomatis. | Jam berputar lalu berubah menjadi timer digital 01:00:00; kartu status menegaskan shutdown dapat dijadwalkan. | Angka timer menjadi konsep untuk tutorial Windows Run berikutnya. |
| 05 | 00:25,0–00:35,0 | Caranya gampang. Tekan Windows + R, lalu ketik perintah ini, lalu klik OK. | Tekan Win + R, buka dialog Run, ketik `shutdown /s /t 3600`, klik OK. | Perintah mengantar ke penjelasan nilai 3600 detik. |
| 06 | 00:35,0–00:42,5 | Angka 3600 itu artinya satu jam. Kalau waktunya habis, laptop bakal mati sendiri. | Konversi 3600 detik → 60 menit → 1 jam, lalu simulasi countdown hingga laptop OFF. | Perlu konsistensi naratif: adegan OFF adalah ilustrasi masa depan, bukan shutdown yang sudah terjadi. |
| 07 | 00:42,5–00:51,0 | Kalau mau batalin, tinggal buka Run lagi, ketik perintah ini, lalu Enter. | Run dibuka lagi, ketik `shutdown /a`, lalu visual konfirmasi jadwal shutdown dibatalkan. | VO mengucap Enter tetapi visual tombol OK: menunggu revisi satu per satu. |
| 08 | 00:51,0–00:59,0 | Kalau kamu punya cara lain yang lebih praktis, coba share di kolom komentar! | Typography “CARA LAIN” / “LEBIH PRAKTIS”, kartu komentar dan kursor. | Menuju cover penutup tanpa suara. |
| 09 | 00:59,0–01:04,0 | Tanpa VO | Cover “SHUTDOWN OTOMATIS” dan subjudul “Laptop mati sendiri” diikuti ilustrasi laptop OFF. | Penutup video. |

## Mapping nama source legacy ke nomor scene tampilan

| Urutan baru | File JSX master |
|---|---|
| Scene 01 | `src/scenes/Scene01.tsx` |
| Scene 02 | `src/scenes/Scene02.tsx` |
| Scene 03 | `src/scenes/SceneQuestion.tsx` |
| Scene 04 | `src/scenes/Scene03.tsx` |
| Scene 05 | `src/scenes/Scene04.tsx` |
| Scene 06 | `src/scenes/Scene05.tsx` |
| Scene 07 | `src/scenes/Scene06.tsx` |
| Scene 08 | `src/scenes/Scene07.tsx` |
| Scene 09 | `src/scenes/Scene08.tsx` |

> Nama file scene lama dipertahankan agar referensi dan kode sebelumnya tidak rusak. Pilih komposisi berdasarkan **urutan 01–09** di Remotion Studio.

## Hal yang perlu kita audit setelah scene pertanyaan ACC

- Scene 05→06 (sebelumnya 04→05): penekanan angka 3600 ke konversi waktu
- Scene 06→07 (sebelumnya 05→06): OFF pada ilustrasi lalu cara membatalkan; perlu penanda simulasi
- Scene 07: visual klik OK tidak persis sesuai VO “lalu Enter”
- Scene 08→09: ending komentar ke cover masih perlu audit

**Tahap ini hanya integrasi scene dan sinkronisasi metadata; status ACC scene lain tidak otomatis berubah.**
