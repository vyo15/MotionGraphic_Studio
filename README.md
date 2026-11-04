# MotionGraphic Studio Master v1.8.1 — Remotion Only

**Satu Master, satu Studio: Remotion.** Paket ini adalah pembersihan terhadap Master v1.8.1 yang sama, **bukan Master baru** dan bukan perpindahan proyek. Tidak ada Concat, launcher aplikasi kedua, Easy Editor, atau Studio Hub.

## Mulai di Windows

1. Simpan ZIP/folder Master lama sebagai cadangan di luar folder Studio. Gunakan folder hasil ekstrak ini sebagai **Master yang sama**. Jika memakai Git, terapkan perubahan di repository yang sudah ada, bukan membuat repo baru.
2. Dari folder `MotionGraphic-Studio` jalankan `npm install` (pertama kali), kemudian `npm run dev`, atau klik `01-BUKA-STUDIO.bat`.
3. Pilih video di sidebar Remotion Studio: **Belajar IP Address** atau **WINDOWS HACKS | 5 Shortcut Windows**. Pilih komposisi full atau preview segmen.
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

## Struktur Master folder-first

```text
MotionGraphic-Studio/
├── projects/
│   ├── ip-address/                       # Belajar IP Address
│   └── windows-hacks-5-shortcut-lengkap/ # Windows Hacks
├── src/                                 # komposisi, auto-generated saat sync
├── public/videos/                       # mirror aset dari project, jangan edit
├── library/catalog.json                # katalog auto-generated
├── library/.studio-generated-state.json # status internal sync
├── library/masuk/                       # tempat ZIP add-on yang akan diimpor
├── tools/                               # alat Remotion, render, impor, audit, ZIP
├── tests/                               # tes regresi Remotion
└── package.json
```

## Audio, editability, dan batas yang benar

Audio sumber dipertahankan di masing-masing `projects/<slug>/public/`. Untuk mengatur voice-over dan musik, lihat [Panduan Audio Timeline](PANDUAN-AUDIO-TIMELINE.md). Untuk impor, preview, props, render dan ekspor, baca [Panduan Remotion Studio](PANDUAN-REMOTION-STUDIO.md). Aturan produksi ada di [PRODUCTION-RULES.md](PRODUCTION-RULES.md).

Remotion Studio **tidak otomatis membuat semua node React draggable**. Layer `Interactive`, Properties/Props dan struktur masing-masing video menentukan apa yang bisa diedit secara visual. Beberapa layer Windows Hacks masih memiliki animasi/posisi computed dan belum semua bebas drag-and-drop. Tidak ada editor voice-over waveform multi-track bawaan tambahan dalam paket ini. Editabilitas penuh tidak boleh diklaim tanpa pengujian per layer.

**Riwayat dipertahankan terpisah:** arsip backup/import lama dari ZIP sumber ada di ZIP pendamping `MotionGraphic-Studio-ARSIP-LAMA-20261104.zip`. Tidak perlu mengekstrak arsip itu ke dalam Master kecuali ingin memulihkan berkas tertentu. Backup baru di `library/backups/` akan dibuat oleh tool saat perlu; output export/render CLI disimpan di folder cadangan di luar Master.

Hasil dan batas audit: [AUDIT-REMOTION-ONLY-20261104.md](AUDIT-REMOTION-ONLY-20261104.md). UI Remotion di Windows, drag/edit manual, dan render MP4 aktual memerlukan uji langsung di PC pengguna.
