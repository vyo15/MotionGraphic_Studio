# Smart Diagnostic Logger — Remotion + Concat

Satu Master, dua aplikasi. **Tidak ada aplikasi log tambahan.** `npm run logs` membaca catatan sesi launcher, log asli Concat, dan bila ada, Windows Event Viewer. Tidak mengirim data ke internet dan tidak memodifikasi video.

## Jalankan secara normal

- `npm run dev` membuka Remotion Studio seperti sebelumnya; error build/remotion tetap di terminal dan log render di folder backup yang sudah digunakan Master.
- `npm run concat` menyiapkan/buka Concat portable, membuat sesi lokal dan memantau proses sampai aplikasi ditutup. **Terminal ini tetap menunggu sampai Concat ditutup; ini diperlukan untuk menangkap exit code/crash.**
- `npm run logs` menampilkan ringkasan sesi Concat terakhir. `npm run logs -- --share` menuliskan `RINGKASAN-BAGI.txt` yang menyamarkan identitas umum (tetap periksa sendiri sebelum dibagikan).
- `npm run concat:debug` menjalankan Concat dengan `CONCAT_LOG=debug` satu sesi; untuk error import yang berulang, gunakan ini agar ada detail tambahan.
- `npm run concat:safe` memulai Concat dengan `--software` dan masih memakai monitoring/log yang sama.

Saat Concat berakhir dengan exit code bukan 0, Master menyimpan hasil percobaan normal dahulu dan otomatis mencoba **satu kali** dengan `--software`. Jangan anggap otomatis memperbaiki import: coba ulang media dengan sengaja, dan simpan project secara rutin. Aplikasi yang ditutup normal tidak dibuka ulang. Jika tidak ada kode keluar, tidak ada percobaan ulang otomatis.

## Sumber log resmi

Concat v0.2.8 telah mempunyai logger sendiri (lihat `src/crates/concat-host/src/logs.rs`, `crash.rs`, `dirs.rs` dari repo resmi): 10 file terbaru, maksimal 16 MB per file, dengan `CONCAT_LOG=debug` untuk lebih detail. Native logger juga mencatat beberapa crash memori/exception, nama modul dan GPU device lost bila handler sempat berjalan.

**Portable Master:** `apps/concat/runtime/current/portable/logs/concat-*.log` — folder `portable` otomatis disiapkan tepat di samping `concat.exe`. Pada source build, lokasi log bergantung pada konfigurasi runtime/source. **Profil lama** di `%LOCALAPPDATA%\app.concat.editor\` **tidak dihapus atau dipindah otomatis**; ini penting bila sebelumnya pernah menyimpan model, template, voice clone dan setting di sana. `npm run logs` masih dapat membaca log dari lokasi lama jika tersedia. Menggunakan `portable` membuat data Concat sepenuhnya lokal pada folder executable, termasuk model suara yang diunduh berikutnya.

**Diagnostik Master:** `apps/concat/logs/sessions/<tanggal-id>/` berisi `session.json`, `01-normal/`, `02-software/` jika diperlukan, `attempt.json`, `stdout.log`, `stderr.log`, `windows-events.txt` bila dapat dibaca, `RINGKASAN.txt`, dan `report.json`. Menyimpan 15 sesi terbaru secara otomatis. Hanya data `apps/concat/` yang diabaikan Git dan tidak ikut ZIP Master. Hasil export audio/video serta project tidak dipangkas.

## Apa yang dicatat dan apa yang tidak

Yang dapat diketahui: kode proses keluar, error native dari Concat, indikasi masalah GPU, decoder, DLL, panic, dan Windows Application Error yang menyebut Concat. Yang **tidak** bisa diketahui langsung: klik di dalam aplikasi dan semua nama video yang diimpor, kecuali Concat sendiri menuliskannya ke log. Kesimpulan adalah *indikasi*, bukan diagnosis hardware yang pasti. Jika Concat tertutup dengan kode 0, logger tidak boleh menyebutnya crash tanpa bukti.

`CONCAT_LOG=info` adalah default Concat; `npm run concat:debug` aktifkan debug sementara. Bila file log tetap kosong akibat crash sebelum logger inisialisasi, periksa event Windows dan `stderr`—tidak semua native crash dapat ditangkap.

## Menangani media yang membuat aplikasi tertutup

1. Jalankan `npm run concat:debug` dan ulangi import media yang menyebabkan crash.
2. Jika Concat menutup diri, jalankan `npm run logs` dan lihat `RINGKASAN.txt`.
3. Jika indikasi GPU, coba `npm run concat:safe`; jika indikasi decoder, coba satu MP4 sederhana H.264/AAC untuk membedakan masalah media.
4. Simpan `RINGKASAN-BAGI.txt` lewat `npm run logs -- --share`; periksa kembali informasi sensitif sebelum mengirimnya. Log internal mentah jangan langsung dibagikan karena bisa berisi path personal atau informasi perangkat.

Bila laporan belum cukup untuk identifikasi masalah, buka issue upstream beserta *reproduction steps*, versi aplikasi, info Windows/GPU, dan potongan log tersamarkan. Contoh kasus serupa: https://github.com/jub0t/Concat/issues/575

## Keterbatasan verifikasi

Unit test Node dapat mensimulasikan file log/crash, tapi **tidak membuktikan** Concat GUI/driver/GPU di komputer Windows sudah sembuh. Launcher yang mengawasi GUI memerlukan tes nyata di Windows. Juga tidak dijanjikan seluruh log Remotion menjadi satu format identik: `npm run logs` menampilkan ringkasan Concat dan lokasi log render/runtime Remotion terbaru jika ada, tetapi log `npm run dev` yang berjalan tetap di terminal Remotion. Tidak ada logging ulang yang mengganti atau mengintersepsi proses Remotion.
