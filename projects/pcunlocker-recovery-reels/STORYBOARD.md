# Storyboard — PCUnlocker

| Scene | Durasi | VO | VO teks | Visual | Rekaman/sync | Final |
|---|---|---|---|---|---|---|
| S01 — Masalah & konflik | 0–5s | Password lupa, akun terkunci. | ACC | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S02 — Memory Gallery | 5–11s | Mana banyak file penting di dalamnya. Masa iya harus install ulang Windows? | ACC | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S03 — Respons | 11–15s | Eits, tenang dulu. Jangan buru-buru install ulang. | ACC | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S04 — Solusi | 15–20s | Kamu bisa coba aplikasi yang satu ini, namanya PCUnlocker. | ACC | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S05 — Persiapan | 20–28s | Caranya cukup simpel. Kamu tinggal download PCUnlocker, buat flashdisk bootable, lalu booting seperti biasa menggunakan flashdisk tadi. | DRAFT | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S06 — Demonstrasi | 28–34s | Setelah aplikasinya terbuka, kamu bakal melihat daftar akun lokal Windows yang terdeteksi. | DRAFT | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S07 — Pemulihan | 34–40s | Nah, di sini kamu tinggal pilih akun Windows kamu yang lupa password, lalu klik Reset Password. | DRAFT | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S08 — Konfirmasi | 40–45s | Setelah itu, kamu bisa masukin password baru, lalu klik OK. | DRAFT | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S09 — Restart | 45–50s | Kalau sudah berhasil, tinggal restart komputernya. | DRAFT | REVIEW | Belum | Belum |
| S10 — Hasil | 50–60,1s | Nah, sekarang kamu bisa coba login lagi. Nggak perlu install ulang, kan? | DRAFT | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S11 — CTA | 60,1–69,1s | Kalau kamu pernah lupa password Windows, waktu itu ngatasinnya gimana? Coba tulis di kolom komentar. | ACC | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |
| S12 — Cover Reels | 69,1–73,1s | Tanpa VO | none | ACC_LOCKED_PENDING_NATIVE_QA | Belum | Belum |

Scene 01: POV login zoom 1→2; input dan reaksi gagal, pesan lockout mulai frame 117; subtitle screen-space. Scene 02: carry pose laptop, smooth pull-back dan fade frame 0–33, kartu foto/dokumen muncul dari area laptop, kemudian panel Windows Setup. Pose akhir S02 tetap match S03. Subtitle teks polos. Ilustrasi file penting, bukan jaminan pemulihan data.

Scene 03: Panel Alert pilihan 05. Pose akhir Memory Gallery ditahan; frame lokal 51 outline dan badge silang muncul, tetot 51–62, hold sampai 119. Subtitle polos. Tidak ada laptop/3D/zoom.

Scene 04: Icon Spotlight, Soft Scale-Up 92%→100% frame lokal 18–48; komposisi utama terpusat, nama muncul frame 81, fungsi frame 85, aksen frame 89. Logo vektor rekonstruksi dari referensi, bukan logo resmi vendor.

Scene 05: Soft Connected. Pose S04 ditahan, judul mereda, satu logo bertransformasi ke lembar ISO, beralih ke ilustrasi media, lalu laptop 720×434 px tanpa zoom. Subtitle cue 0–45/45–111/111–159/159–240. Ilustrasi recovery bukan UI aktual.

S06–10: UI tanpa laptop, lebar 960 px. S07–08: ukuran tombol stabil, highlight dan pointer Windows independen. Simulasi dengan akun contoh. Render native belum diuji.

**Unified Background (2026-11-25):** semua scene S01–S12 memakai dasar `#F7F7F5` dan radial putih 32% di 50% 42%, fade ke transparan pada 70%. Shadow objek dan warna UI tetap. S10: desktop → Explorer → Memory Gallery; S11: bubble komentar dan ajakan; S12: cover LUPA PASSWORD WINDOWS?, logo SVG tiga layer, hold stabil frame 60–119. VO/durasi tetap. Preview source dan GUI native masih perlu QA.


**Dynamic Focus — plan ACC 2026-11-26 (S06–S09):** Camera viewport x50 y390 w980 h900; subtitle dan label tidak ikut zoom. S06 establish lalu fokus daftar; S07 carry pose, pan ke aksi, dialog reframe; S08 dialog stabil, UI belakang redup, kembali ke konteks; S09 fokus aksi lalu kembali ke fit sebelum login. Kamera memakai frame bersama mulai S06; posisi dan timing klik/SFX asli dipertahankan. Source kamera editable di `src/components/FocusCamera.tsx`; outline dan dim merupakan layer Interactive terpisah. Tidak ada perubahan VO, frame scene atau aset. S09 masih REVIEW native; S06–S08 lock UI tetap.

**Opening ACC 2026-11-26:** POV Hook + Connected Storytelling. VO/timing tetap; SFX preview lama dipertahankan, perlu sync/listening QA. Native camera dan Studio Save/reload belum diuji.

**S10 Relaxed Pacing V4 ACC (2026-11-26):** 303 frame; S09 login match, S10 input 0–66, desktop 66–114, Explorer 114–198, galeri/hold 198–303 (transition overlaps only at handoffs). Subtitle cue 0–150 / 150–303. CTA dan cover offset +123 frame; durasi masing-masing tidak berubah. File contoh, bukan jaminan pemulihan. Native QA belum dilakukan.

**CTA 04 + Opening Motion Revision ACC (2026-11-26):** S11 270 frame. Satu ilustrasi komentar, tiap bagian terpisah; VO 0–96 / 96–174 / 174–255, hold 255–270. Tipografi VO menjadi satu-satunya subtitle; frame transisi teks tidak tumpang tindih. Simbol kirim masuk lokal 181–215. S12 120 frame: carry CTA pose 269 melalui Freeze dan crossfade lokal 0–17, tiga SVG asli membentuk ikon, judul 36–60, nama 50–63, hold 63–119. Cover tanpa VO; outgoing CTA hanya pada awal handoff. Omit SFX kedua scene sesuai preview ACC. Total 73,1 detik, coverFrame 2163.

**Technical continuity revision — 2026-11-26 (review, not new ACC).** S06: local f0–11 opaque recovery laptop, f12 content switches inside screen, f12–36 uniform screen expansion, f34–46 label reveal; existing list camera cue f75 preserved. S07: camera reaches dialog-fit at local f154, opaque dialog scale-in f154–166, holds through f179. S08: opaque dialog settles/closes f128–136; dim recedes f128–140. S09: exclusive app/restart state at f58, camera returns to fit; restart text/spinner fade f112–124 before login background transition. S10: login controls fade f63–75 before opaque desktop; Explorer retains original timing; desktop shrinks/lifts f204–228 with late fade f220–228; five opaque gallery cards grow f208–246 (artwork emerges from Explorer), confirmation f248–264, hold through f302. S04/S11/S12: spatially separated outgoing fades, final ACC poses unchanged. Durations/VO unchanged (2193f). SFX retained, needs listening and recorded-VO alignment; no final approval.
