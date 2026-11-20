# MotionGraphic Studio Master v1.8.1 — Remotion Only

**Satu Master, satu Studio: Remotion.** Paket ini adalah pembersihan terhadap Master v1.8.1 yang sama, **bukan Master baru** dan bukan perpindahan proyek. Tidak ada Concat, launcher aplikasi kedua, Easy Editor, atau Studio Hub.

## Mulai di Windows

1. Simpan ZIP/folder Master lama sebagai cadangan di luar folder Studio. Gunakan folder hasil ekstrak ini sebagai **Master yang sama**. Jika memakai Git, terapkan perubahan di repository yang sudah ada, bukan membuat repo baru.
2. Dari folder `MotionGraphic-Studio` jalankan `npm install` (pertama kali), kemudian `npm run dev`, atau klik `01-BUKA-STUDIO.bat`.
3. Pilih salah satu video aktif di sidebar Remotion Studio (`npm run list` untuk daftar terbaru). Pilih komposisi full, segmen, atau VO Guide.
4. Edit melalui Remotion Studio dan Props bila layer mendukung, lalu render lewat dialog Remotion Studio atau `npm run render`.
5. Simpan project tambahan sebagai folder mandiri `projects/<slug>/`. Jalankan `npm run sync` untuk registrasi ulang; tidak perlu mengedit `src/Root.tsx`, `src/index.ts`, atau `library/catalog.json` secara manual.

## Perintah yang dipakai

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Sinkronisasi, lalu membuka Remotion Studio resmi |
| `npm run sync` | Registrasi project dan aset otomatis |
| `npm run list` | Menampilkan semua video aktif |
| `npm run check` | Audit manifest, editability, layout, TypeScript |
| `npm test` | Jalankan pengujian otomatis |
| `npm run render` | Render full/segmen ke MP4 |
| `npm run zip` | Menu ekspor ZIP video editable / Master |
| `npm run zip -- --studio` | Ekspor ZIP Master lengkap |
| `npm run zip -- --all` | Ekspor semua video satu per satu |
| `npm run addfolder -- "C:\\lokasi\\folder-video"` | Impor folder add-on |
| `npm run delete` / `npm run restore` | Arsipkan / pulihkan video dengan aman |
| `npm run qa` | Audit kualitas statis |
| `npm run addon:validate -- <folder> --strict` | Periksa kontrak dan import add-on ChatGPT |
| `npm run addon:scaffold -- <slug> <ID> <judul>` | Buat contoh add-on di exports/addons (tidak aktif otomatis) |
| `npm run addon:patch -- <folder> --dry-run` | Simulasi patch revisi dengan SHA-256 tanpa menulis |
| `npm run addon:patch -- <folder>` | Terapkan patch dengan backup dan deteksi konflik |
| `npm run vo:edit -- <slug>` | Edit naskah panduan rekaman melalui terminal |
| `npm run qa:render -- <MP4> --src projects/<slug>` | QA hasil video sesuai manifest |
| `npm run zip -- --studio --lean` | ZIP ringan tanpa sejarah backup, tidak menghapus file backup |

## Struktur Master folder-first

```text
MotionGraphic-Studio/
├── projects/
│   └── <slug>/                          # setiap video dalam folder add-on mandiri
├── src/                                 # komposisi, auto-generated saat sync
├── public/videos/                       # mirror aset dari project, jangan edit
├── library/catalog.json                # katalog auto-generated
├── library/.studio-generated-state.json # status internal sync
├── library/masuk/                       # tempat ZIP add-on yang akan diimpor
├── contracts/                           # manifest schema + capabilities untuk ChatGPT
├── templates/addon-starter/             # add-on standar untuk konten baru
├── docs/                                # SOP universal, VO & maintenance
├── tools/                               # alat Remotion, render, impor, audit, ZIP
├── tests/                               # tes regresi Remotion
└── package.json
```

## Audio, editability, dan batas yang benar

Audio sumber dipertahankan di masing-masing `projects/<slug>/public/`. Untuk mengatur voice-over dan musik, lihat [Panduan Audio Timeline](PANDUAN-AUDIO-TIMELINE.md). Untuk impor, preview, props, render dan ekspor, baca [Panduan Remotion Studio](PANDUAN-REMOTION-STUDIO.md). Aturan produksi ada di [PRODUCTION-RULES.md](PRODUCTION-RULES.md).

Remotion Studio **tidak otomatis membuat semua node React draggable**. Layer `Interactive`, Properties/Props dan struktur masing-masing video menentukan apa yang bisa diedit secara visual. Beberapa layer Windows Hacks masih memiliki animasi/posisi computed dan belum semua bebas drag-and-drop. Tidak ada editor voice-over waveform multi-track bawaan tambahan dalam paket ini. Editabilitas penuh tidak boleh diklaim tanpa pengujian per layer.

**Riwayat dipertahankan terpisah:** arsip backup/import lama dari ZIP sumber ada di ZIP pendamping `MotionGraphic-Studio-ARSIP-LAMA-20261104.zip`. Tidak perlu mengekstrak arsip itu ke dalam Master kecuali ingin memulihkan berkas tertentu. Backup baru di `library/backups/` akan dibuat oleh tool saat perlu; output export/render CLI disimpan di folder cadangan di luar Master.

Hasil dan batas audit: [AUDIT-REMOTION-ONLY-20261104.md](AUDIT-REMOTION-ONLY-20261104.md). UI Remotion di Windows, drag/edit manual, dan render MP4 aktual memerlukan uji langsung di PC pengguna.

## VO Guide universal (workflow rekam setelah motion)

Selesaikan storyboard, scene dan revisi visual dulu. **Jangan rekam VO sebelum motion disetujui.**
Setiap add-on baru otomatis mendapatkan template `src/config/narration.json` saat sync pertama.
Isi `beats[].text` dan pecah estimasi `startFrame`/`endFrame` mengikuti visual (jumlah frame akhir harus sama dengan manifest).
Lalu jalankan `npm run sync`. Remotion Studio akan menampilkan satu komposisi ekstra (meski teks masih kosong)
`<IDVideo>VOGuide`, yang menumpangkan naskah pada video untuk latihan/rekaman.
Video utama `<IDVideo>` **tidak** mendapat overlay panduan. Audio VO dan subtitle final dimasukkan setelah rekaman.

- Untuk video lama tanpa naskah: `npm run vo:init -- <slug>` (tidak menimpa data).
- Lihat panduan lengkap: `docs/WORKFLOW-VO-UNIVERSAL.md`.
- `npm run sync` sekarang menolak kehilangan project yang masih terdaftar bila tidak ada arsip sah di `library/sampah`.
  Pulihkan folder project dari backup bila muncul pesan `SYNC DIBATALKAN`.

## ChatGPT → Add-on → Master (kontrak versi 1.0)

Dokumen aktif: [AI Production Workflow](docs/AI-PRODUCTION-WORKFLOW.md), [VO Guide Universal](docs/WORKFLOW-VO-UNIVERSAL.md), [Maintenance](docs/MAINTENANCE-AND-RECOVERY.md). Bagi pengguna yang hanya memberikan judul ke ChatGPT, dokumen `contracts/studio-capabilities.json` bisa dikirim sebagai kontrak versi Master agar proyek baru konsisten.

```bash
# Buat scaffold di exports/addons/ (tidak memodifikasi projects aktif)
npm run addon:scaffold -- contoh-baru ContohBaruReels "Contoh Judul"
# Validasi add-on yang diberikan ChatGPT
npm run addon:validate -- "C:\alamat\contoh-baru" --strict
# Impor folder; ZIP add-on dapat diletakkan di library/masuk lalu npm run import
npm run addfolder -- "C:\alamat\contoh-baru"
# Voice Guide setelah motion selesai
npm run vo:edit -- contoh-baru
# Saat revisi file tertentu — cek konflik sebelum apply
npm run addon:patch -- "C:\alamat\patch" --dry-run
npm run addon:patch -- "C:\alamat\patch"
# QA video mengikuti FPS/resolusi manifest
npm run qa:render -- out/video.mp4 --src projects/contoh-baru
# ZIP Master tanpa riwayat backup dalam paket saja (backup di PC tidak dihapus)
npm run zip -- --studio --lean
```

Pengeditan naskah melalui native Props pada komposisi VO Guide kini memiliki jalur persistensi ke narration.json dengan deteksi konflik, tetapi uji interaksi langsung di Remotion Studio Windows masih diperlukan.
