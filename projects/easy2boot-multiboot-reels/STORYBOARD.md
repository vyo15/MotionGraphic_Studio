# Storyboard Final — Easy2Boot: 1 Flashdisk Banyak Installer

Durasi: **80 detik**, vertikal 9:16, 1080x1920 @ 30 FPS, enam scene. Visual Minimal Editorial v1.7. **Script VO rancangan**, belum ada file VO final.

| Scene | Waktu | VO / Narasi | Teks Layar | Objek & Aksi Sebab→Akibat | Transisi | Layer Editable |
|---|---|---|---|---|---|---|
| 01 Masalah | 00:00–00:12 | Mau instal Windows 11, tapi flashdisknya masih Windows 10? Masa harus bikin bootable ulang lagi? | MAU INSTAL / WINDOWS 11? / WINDOWS 10 / BUAT ULANG? / NUNGGU LAGI | Laptop butuh installer baru → USB lama tidak sesuai → progress bootable ulang | Progress disambung ke solusi | Laptop, USB, UI pembuat bootable, progress, typography |
| 02 Solusi | 00:12–00:23 | Nggak perlu bikin ulang terus. Pakai Easy2Boot. Satu flashdisk bisa isi beberapa installer sekaligus. | NGGAK PERLU / EASY2BOOT / SATU FLASHDISK / BEBERAPA INSTALLER | Proses diulang berhenti → USB Easy2Boot → tiga ISO masuk satu USB | ISO list menjadi awal persiapan | USB, ISO, badge, typography, counter |
| 03 Persiapan | 00:23–00:37 | Pertama, backup data flashdisk. Buka Easy2Boot. Pilih USB yang benar, lalu buat USB multiboot. | BACKUP DATA / BUKA EASY2BOOT / PILIH USB / BUAT USB / USB SIAP | Backup → Make_E2B → pilih drive → konfirmasi wipe → proses selesai | Folder _ISO berpindah ke Explorer | UI, kursor, peringatan, progress, folder |
| 04 Salin ISO | 00:37–00:53 | Setelah jadi, tinggal salin file ISO ke folder yang sesuai. Windows 10, Windows 11, atau Linux. Mau tambah installer? Cukup salin lagi. | SALIN ISO / WINDOWS 10 / WINDOWS 11 / LINUX / CUKUP SALIN | Explorer buka → file ISO disalin ke folder sesuai → file sebelumnya tetap ada | USB membawa isi ISO ke laptop | Folder, label ISO, kursor, progress, Explorer |
| 05 Booting | 00:53–01:07 | Sekarang, boot dari USB. Pilih flashdisk di boot menu. Di agFM, cari ISO Windows 11. Pilih, lalu jalankan. Installer Windows mulai terbuka. | BOOT DARI USB / PILIH USB BOOT / CARI FILE ISO / PILIH WINDOWS 11 / INSTALLER TERBUKA | Komputer boot USB → agFM → memilih ISO Windows 11 → Windows Setup | Setup mengantar ke CTA | Laptop, firmware, agFM simulasi, installer, seleksi |
| 06 CTA / Cover | 01:07–01:20 | Kalau kamu, biasanya bikin bootable ulang atau pakai multiboot? Coba tulis di kolom komentar! | BOOTABLE ULANG? / MULTIBOOT? / TULIS DI KOMENTAR / EASY2BOOT: 1 FLASHDISK BANYAK INSTALLER | Perlihatkan dua kebiasaan tanpa menyindir → ajak komentar → cover statis bersih | Hold cover akhir ±2 detik | USB, opsi, CTA, cover/title |

## Visual & audio lock
Background `#F7F7F5`, charcoal `#202020`, coral `#DF805F`. Gerak multi-komposisi setiap beat bermakna, objek aktif memperagakan VO, transisi natural, kursor dan UI logis. SFX terpisah. Subtitle track tidak dimasukkan sebelum ada rekaman VO agar tidak memberi sinkronisasi palsu. Tidak ada karakter/talking head.

## Catatan validasi
Video preview MP4 disusun dari render per-scene SVG/HTML yang disetujui pengguna; bukan hasil render lewat Remotion Master. Boot menu dan installer adalah simulasi; verifikasi nyata terhadap konfigurasi Easy2Boot tetap diperlukan sebelum dipakai sebagai tutorial langkah teknis.
