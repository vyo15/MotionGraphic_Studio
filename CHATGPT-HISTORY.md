# Riwayat singkat MotionGraphic Studio — baca sebelum produksi
Status: engine 2.0.0 / Remotion 4.0.538. Ini memori pembelajaran, bukan flow/rule/ACC kedua. Aturan berlaku ada di CHATGPT-READ-FIRST.md dan pemilik modul. ACC per-video tetap di PRODUCTION-STATE.json + decisionLog.

## Awal → sekarang
- v1.x: beberapa flow/editor/prompt dan audit terpisah membuat maintenance berat. Sistem disederhanakan menjadi satu Remotion Studio, add-on per video, file-change-only. Jangan menghidupkan lagi editor/renderer paralel.
- v2.0.0: motion/spatial/native/sound production gate, camera toolkit, VO guide, ACC identity dan local SFX. Unified Production 1.0 mengurangi prompt berulang; enam dokumen obsolete dihapus oleh user. Log PC 27 Nov 2026: 6 project, 61 komposisi, 49 segmen, 68 referensi aset, 0 masalah sumber; Studio built. Easy2Boot legacy masih WARN karena blueprint belum ada; GUI Save/reload, render dan listening tidak dibuktikan oleh log.
- Sound Sharing Printer: Soft Editorial sintetis, text-adaptive opt-in. Bukan rekaman fisik; naturalitas/final belum ACC. Rekaman nyata dan listening masih diperlukan. Jangan retrofit visual ACC.
- Cleanup lanjutan: pengarah duplikat dan laporan migrasi lama keluar dari Master aktif; CLI flow membaca Production Rules; pemeriksaan inline dan direct-text disatukan. Riwayat detail tersedia di backup ZIP sebelum cleanup.

- Automasi operasional: dev menjadi pintu harian; startup gate, log ringkas dan ZIP handoff otomatis setelah perubahan stabil. Log PC: 157 lulus, 3 gagal, 6 skip; fixture scaffold gagal resolve TypeScript pada Windows, diperbaiki dengan resolusi dependency host. QA patch Linux: 163 lulus, 2 gagal (subtitle Easy2Boot legacy), 6 skip; 5 tes automasi lulus. GUI/render Windows belum diuji ulang. Tidak perlu mengetik sync/flow/test/zip berulang.

## Pelajaran yang mencegah revisi berulang
| Kesalahan terdahulu | Pencegahan / pemilik |
|---|---|
| Hook/CTA tidak nyambung; visual cuma mengulang VO | Uji beat aksi–reaksi–hasil dan handoff di Motion Direction; review preview bergerak. |
| Cursor meleset; UI terlalu kecil; teks/angka tertutup | Periksa hotspot, spatial plan dan safe zone pada frame aksi serta hold. Design System + QA. |
| Subtitle ganda atau terlambat; cover terlalu penuh | Design System dan narration sebagai sumber tunggal; cek cue/hasil crop. |
| Terlalu banyak SFX, suara sintetis dianggap natural | Sound Direction + Local-First + Soft Editorial; cue/omit dan listening nyata. |
| Layer terlihat tetapi Save/reload tidak terbukti | Editable Contract; uji native target nyata, jangan klaim 100% dari hitungan JSX. |
| Revisi menyentuh scene yang sudah ACC | Scope, state dan decisionLog; jangan reset ACC atau edit generated board. |
| Banyak rules/prompt dan test fixture copy list menjadi basi | Perbaiki satu pemilik aturan/komponen/test; CLI mengikuti dokumen resmi; fixture copy tool tree. |

## Cara merawat log
Catat hanya perubahan Master yang penting, kesalahan lintas video dan status bukti yang masih relevan. Ringkas/replace catatan yang sudah superseded, target maksimal 60 baris. Tidak menyimpan VO, storyboard, daftar seluruh file, atau ACC per-scene di sini. Simpan detail patch di backup di luar Master. Jangan catat hasil QA yang belum dilakukan.
