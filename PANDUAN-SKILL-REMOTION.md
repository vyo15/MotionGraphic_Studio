# PANDUAN REMOTION AGENT SKILLS — MotionGraphic Studio v1.7.0

## Temuan audit dan ruang lingkup

ZIP Master Studio awal yang diaudit tidak memiliki `.agents/skills`, `SKILL.md`, atau `AGENTS.md`. Dua project aktif dipertahankan: `ip-address` dan `windows-hacks-5-shortcut-lengkap`. Semua folder arsip dan backup dipertahankan.

**Paket ini membundel 13 panduan lokal yang dapat dibaca coding agent (12 nama skill dalam repo `remotion-dev/skills` + 1 referensi `remotion-license`).** Panduan lokal disusun khusus agar aturan **satu Master, folder-first dan editor visual** tidak dilanggar. **Ini bukan klaim bahwa teks asli 12 skill dari GitHub sudah ikut didistribusikan.** Untuk mengganti 12 panduan lokal dengan isi resmi terbaru, gunakan installer berikut saat PC tersambung internet.

## Cara menggunakan (Windows)

1. Ekstrak ZIP Master ini sebagai satu folder `MotionGraphic-Studio`; **backup dulu** Master lama. Jangan ekstrak dan merge ke Master lama.
2. Klik dua kali `INSTALL-SEMUA-SKILL-REMOTION.bat` di folder Master, atau cukup jalankan `npm run dev` (mencoba instalasi resmi satu kali secara otomatis).
3. Bila instalasi otomatis gagal karena koneksi internet, Node, atau akses GitHub, jalankan file `.bat` tersebut saat koneksi stabil.
4. Klik `CEK-SKILL-REMOTION.bat` untuk melihat status: **[ADA]** artinya SKILL.md upstream terdeteksi; **[LOKAL]** adalah panduan fallback lokal; **[MISSING]** belum ada.
5. Buka Studio seperti biasa (`npm run dev`), buka http://localhost:3000 dan Visual Editor di http://localhost:4077/visual.

Alternatif resmi: dari terminal folder Master jalankan `npx skills add remotion-dev/skills --all -y` atau `npx remotion skills add` (ketika CLI Remotion mendukung). Lihat https://www.remotion.dev/docs/ai/skills dan https://github.com/remotion-dev/skills.

## Daftar skill dalam paket

| Skill | Kegunaan |
|---|---|
| `remotion-best-practices` | Panduan utama dan pemilihan skill |
| `remotion-create` | Buat komposisi baru tanpa membuat Master baru |
| `remotion-markup` | Animasi, layout, teks dan media |
| `remotion-studio` | Preview komposisi di Studio |
| `remotion-render` | Render MP4 dan validasi visual |
| `remotion-maps` | Peta, rute, marker dan penjelasan geografi |
| `remotion-captions` | Subtitle singkat dan selaras audio |
| `remotion-saas` | Arsitektur aplikasi berbasis Remotion |
| `remotion-interactivity` | Editable text, drag, keyframe dan penyimpanan |
| `remotion-docs` | Cari referensi resmi Remotion |
| `remotion-license` | Informasi lisensi dan kewajiban penggunaan |
| `remotion-upgrade` | Pembaruan versi aman |
| `remotion-multimedia` | Audio/video metadata dan pengolahan aset |

Situs dokumentasi Remotion pada 28 Oktober 2026 menyebut `remotion-license`, sedangkan isi direktori repository `remotion-dev/skills/skills` terverifikasi hanya memiliki 12 direktori. `remotion-license` adalah panduan referensi lokal, bukan skill upstream dari repository yang dipasang installer.

## Penting: Skill AI ≠ plugin baru di Remotion Studio

- Skills adalah **instruksi untuk AI coding agents** (misalnya Codex, Cursor, Claude Code), bukan paket runtime editor dan bukan plugin yang otomatis terpasang ke akun ChatGPT.
- Setelah pemasangan, skill membantu AI membuat proyek berikutnya dengan pola yang benar. Memasang skill **tidak otomatis mengubah JSX computed lama** menjadi teks editable atau menjamin semua elemen bisa di-drag.
- Untuk kebutuhan Anda, prioritaskan `remotion-interactivity`, lalu `remotion-markup`, `remotion-create`, `remotion-captions`, `remotion-render`.
- Untuk konten baru dari ChatGPT, tetap gunakan aturan pada `AGENTS.md` dan `PROMPT-PROYEK-CHATGPT.md`. ChatGPT yang tidak memiliki akses langsung ke disk PC harus diberi Master ZIP/project relevan agar bisa memeriksa layer dan fitur editor dengan benar.
- Folder `.agents/skills` tidak boleh ikut disalin ke `projects/<slug>/` video baru; tempatnya tetap satu kali di ROOT Master.
- Penginstalan 12 skill resmi tidak melakukan upgrade versi Remotion, tidak menambah dependency runtime, dan tidak mengedit katalog atau video lama.

## Validasi status

Jalankan `node tools/remotion-skills.mjs status`. Script `prepare-studio.mjs` hanya mencoba sekali saat `npm run dev` pertama agar tidak menunda tiap startup. Jika paket resmi berhasil, laporan tersimpan di `.agents/remotion-skills-bootstrap.json`; jika tidak, panduan lokal tetap ada dan Master melanjutkan startup. Untuk mengulangi secara eksplisit gunakan file installer `.bat`.

**Batas pengujian di lingkungan penyusunan ZIP:** file dan sintaks skrip diperiksa, daftar project dan file asli dicocokkan. Instalasi internet di Windows, UI drag/save/reload dan render MP4 tidak dapat diuji dari ZIP ini.
