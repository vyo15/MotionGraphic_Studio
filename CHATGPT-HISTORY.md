# Riwayat singkat MotionGraphic Studio — baca sebelum produksi
Status: engine 2.0.0 / Remotion 4.0.538. Ini memori pembelajaran, bukan flow/rule/ACC kedua. Aturan berlaku ada di CHATGPT-READ-FIRST.md dan pemilik modul. ACC per-video tetap di PRODUCTION-STATE.json + decisionLog.

## Awal → sekarang
- v1.x: beberapa flow/editor/prompt dan audit terpisah membuat maintenance berat. Sistem disederhanakan menjadi satu Remotion Studio, add-on per video, file-change-only. Jangan menghidupkan lagi editor/renderer paralel.
- v2.0.0: motion/spatial/native/sound production gate, camera toolkit, VO guide, ACC identity dan local SFX. Unified Production 1.0 mengurangi prompt berulang; enam dokumen obsolete dihapus oleh user. Log PC 27 Nov 2026: 6 project, 61 komposisi, 49 segmen, 68 referensi aset, 0 masalah sumber; Studio built. Easy2Boot legacy masih WARN karena blueprint belum ada; GUI Save/reload, render dan listening tidak dibuktikan oleh log.
- Sound Sharing Printer: Soft Editorial sintetis, text-adaptive opt-in. Bukan rekaman fisik; naturalitas/final belum ACC. Rekaman nyata dan listening masih diperlukan. Jangan retrofit visual ACC.
- Cleanup lanjutan: pengarah duplikat dan laporan migrasi lama keluar dari Master aktif; CLI flow membaca Production Rules; pemeriksaan inline dan direct-text disatukan. Riwayat detail tersedia di backup ZIP sebelum cleanup.

- Automasi operasional: dev menjadi pintu harian; startup gate, log ringkas dan ZIP handoff otomatis setelah perubahan stabil. Log PC: 157 lulus, 3 gagal, 6 skip; fixture scaffold gagal resolve TypeScript pada Windows, diperbaiki dengan resolusi dependency host. QA patch Linux: 163 lulus, 2 gagal (subtitle Easy2Boot legacy), 6 skip; 5 tes automasi lulus. GUI/render Windows belum diuji ulang. Tidak perlu mengetik sync/flow/test/zip berulang.

- Prompt-first: audit GitHub menemukan instalasi agent duplikat; hapus installer, wrapper dan salinan skill lokal, pertahankan teknik di Motion Direction serta sound/QA/ACC. GitHub hanya mencerminkan source yang sudah di-push. Pelajaran 21 Nov: timeline/manifest/narration harus menutup durasi yang sama; jangan mengklaim scene yang dibuat ulang identik/ACC.

- Konsolidasi delivery: semua ZIP FILE CHANGE ONLY root-relative; starter lengkap termasuk silent/segment/sound, review gate otomatis, recovery importer lama tidak aktif di dev; inbox lama tidak menghalangi handoff. QA Linux: 169 lulus, 2 gagal subtitle Easy2Boot legacy, 6 skip; pilot root-relative draft/review/revisi/export lulus; 6 project lama identik. SFX 41 WAV sintetis valid secara PCM/metadata. GUI/render/listening belum diuji. Jangan copy paket multi-file saat Studio membaca source; backup, cek base, tutup Studio.

## Pelajaran yang mencegah revisi berulang
| Kesalahan terdahulu | Pencegahan / pemilik |
|---|---|
| Hook/CTA tidak nyambung; visual cuma mengulang VO | Uji beat aksi–reaksi–hasil dan handoff di Motion Direction; review preview bergerak. |
| Cursor meleset; UI terlalu kecil; teks/angka tertutup | Periksa hotspot, spatial plan dan safe zone pada frame aksi serta hold. Design System + QA. |
| Subtitle ganda atau terlambat; cover terlalu penuh | Design System dan narration sebagai sumber tunggal; cek cue/hasil crop. |
| Terlalu banyak SFX, suara sintetis dianggap natural | Sound Direction + Local-First + Soft Editorial; mouse fisik wajib rekaman sesuai aksi atau omit. Sharing Printer tap sintetis tidak terdengar seperti klik; empat WAV HunteR CC0 (deklarasi embedded) kini di library, 13 cue dipulihkan dan dua klik kanan tetap omit. Reuse Startup Windows ditolak karena bukan sumber yang dipilih. Jangan mengganti/mengubah bytes aset asli. Listening tetap wajib. |
| Layer terlihat tetapi Save/reload tidak terbukti | Editable Contract; uji native target nyata, jangan klaim 100% dari hitungan JSX. |
| Revisi menyentuh scene yang sudah ACC | Scope, state dan decisionLog; jangan reset ACC atau edit generated board. |
| Banyak rules/prompt dan test fixture copy list menjadi basi | Perbaiki satu pemilik aturan/komponen/test; CLI mengikuti dokumen resmi; fixture copy tool tree. |

- 2026-11-28: tambah 58 WAV produksi eksternal CC0 (50 Dustyroom, 1 pop, 1 whoosh, 6 typing excerpts), sumber asli disimpan terpisah dengan hash. PCM24 support; Sortir pengguna memilih 37 KEEP dan 21 DROP; DROP keluar dari katalog aktif; 42 file WAV DROP dibersihkan setelah cek referensi/hash, backup Master sebagai rollback. Dustyroom 29 KEEP dikelompokkan kandidat fungsi dari analisis teknis, bukan listening; pemilihan ID eksplisit setelah audition. Project lama tidak diubah.
- 2026-11-28: tambah 4 SFX Freesound CC0 (2 swoosh, riser, shutter+flash) PCM24, original identik; 45 eksternal aktif + 41 template kompatibilitas. Kategori dari sumber, alignment envelope, listening belum dilakukan.

- 2026-11-28: konsolidasi gate harian dan audit penuh; perbaiki subtitle native Easy2Boot yang hilang berdasarkan fallback/naskah, pertahankan timing, transform lokal dan ACC. Silent marker tidak ditampilkan di VO Guide. QA runtime tetap terpisah.

- 2026-11-28: ACC Poppins utama, Inter guide, Manrope alternatif; compact typography, balanced visual, isolated VO Guide satu baris tanpa block. Starter dan spatial gate opt-in compact-balanced-v1; font lokal OFL perlu download sekali di PC (DNS unduhan diblokir di sandbox). Gate deklaratif starter 600 frame + test style/gap dan transaksi font dengan fixture lulus; font/render/GUI nyata belum diuji. Legacy tidak dimigrasikan.

## Cara merawat log
Catat hanya perubahan Master yang penting, kesalahan lintas video dan status bukti yang masih relevan. Ringkas/replace catatan yang sudah superseded, target maksimal 60 baris. Tidak menyimpan VO, storyboard, daftar seluruh file, atau ACC per-scene di sini. Simpan detail patch di backup di luar Master. Jangan catat hasil QA yang belum dilakukan.
