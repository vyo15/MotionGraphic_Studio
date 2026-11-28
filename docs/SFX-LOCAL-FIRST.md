# Sound Design Director v3.0 — Local-First adapter untuk Master 2.0.0

**Scope:** video baru dan revisi audio yang diminta saja. Tetap `Sound Direction v2.2`, `cue-track-v1`, satu renderer Remotion 4.0.538, source per slug dan ACC protection. Tidak mengubah track canonical, format manifest, paket npm, atau video lama. v3.0 adalah versi adapter pengadaan, bukan versi engine.

## Auto routing sebelum preview
1. Prompt video di Project ChatGPT → baca instruksi Master aktual, Motion Direction dan Sound Direction; tulis `production/SOUND-PLAN.md` per aksi/transisi (CTA→Cover termasuk, silence/omit beralasan). Motion dulu; tidak meminta rekaman VO.
2. Setelah frame aksi ditentukan, pilih karakter suara `recorded` (mekanisme nyata), `synthetic` (UI grafis/typography/reveal), atau `either` hanya jika keduanya benar-benar layak. Pilih tag tepat, dengarkan kandidat; prefer rekaman nyata untuk aksi nyata. Jangan menyebut click sintetis sebagai mouse fisik, jangan memakai whoosh untuk semua transisi. Bila tidak cocok, pilih rekaman yang sah atau `omit` beralasan (bukan untuk menyembunyikan kegagalan cue penting).
3. Gunakan `node tools/sfx-local.mjs search ...`/`list`, siapkan request, jalankan `prepare` untuk **staging baru**. Tidak ada HTTP/API/AI key, instalasi Python atau FFmpeg dalam langkah inti. Script memilih ID deterministik, hitung onset/tail dari titik alignment WAV dan frame aksi, salin audio + metadata + map. Agent tetap wajib menentukan frame/karakter dan menilai hasil; tool bukan pengenal gerakan otomatis.
4. Terapkan staging hanya pada draft add-on atau file/scene yang diizinkan, setelah diff dan cek ACC. Untuk video baru gunakan `SoundCueTrack.tsx` canonical dan wiring full/segment persis `SOUND-DIRECTION-RULES.md`. Untuk existing, jangan merge cue JSON/map secara penuh: pertahankan seluruh cue/map ACC, ganti hanya cue yang diminta; staging tidak menyunting proyek otomatis. SFX tetap file terpisah di `public/audio/sfx/`; preview full/segment memakai satu track; source dan metadata bisa diedit. Tidak ada pencarian atau generator dalam render Remotion.
5. Strict QA source → render preview MP4 dengan audio stream → cek attack/impact/tail pada aksi, mono HP, peak dan listening → ACC visual → VO Guide → rekam → sync/mix final → QA render. Jika runtime render tidak tersedia, laporkan preview belum berhasil; jika tidak benar-benar mendengar, listening belum diuji. Jangan mengklaim Real SFX/Earshot dijalankan hanya karena metode dipakai.

## Isi yang sudah tersedia offline
- `templates/sfx-library/`: 41 WAV PCM sintetis original (20 starter + 21 editorial) + katalog SHA256, lisensi CC0. Bukan library eksternal dan bukan rekaman fisik. Python generator optional hanya untuk regenerasi ke folder baru. Starter selalu ikut engine-only export karena berada di templates/.
- `library/sfx/<pack-id>/`: pack impor lokal milik pengguna, opsional. Backup full membawa folder library; engine-only sengaja tidak membawa pack personal atau berlisensi terbatas. Bila diperlukan di ChatGPT, unggah pack legal yang dimaksud secara terpisah atau lampirkan full Master setelah memeriksa hak redistribusi. Jangan merujuk file yang hanya ada di PC.
- `tools/sfx-local.mjs`: CLI Node 22 tanpa dependency. `prepare` tidak mengubah source Master maupun file project. Verifikasi PCM dan SHA256, bukan penilaian naturalitas atau bukti izin hukum.

## Mouse — koleksi bersama yang dipilih
Sumber: [Mouse / HunteR4708](https://freesound.org/people/HunteR4708/packs/15732/), Logitech MX 620, Zoom H1. Empat WAV click/double-click asli sudah tersedia dengan deklarasi CC0 embedded; scroll dan right-click masih belum tersedia. Jangan memasukkan placeholder ke katalog aktif.

Gunakan pack existing `library/sfx/hunter4708-mouse/` (satu katalog pack + folder audio), bukan library global runtime baru. ID adalah nama file tanpa `.wav`; tag tambahan sesuai tabel.

| Judul sumber | Nama WAV hasil impor | Tag wajib (selain `mouse`, `computer`) |
|---|---|---|
| Mouse Click | `mouse-click-01.wav` | `single-click` |
| Mouse Click 2 | `mouse-click-02.wav` | `single-click` |
| Mouse Double Click | `mouse-double-click-01.wav` | `double-click` |
| Mouse Double Click 2 | `mouse-double-click-02.wav` | `double-click` |
| Mouse Scrolling | `mouse-scroll.wav` | `scroll-normal` |
| Mouse Scrolling Slow | `mouse-scroll-slow.wav` | `scroll-slow` |

Saat WAV asli tersedia: periksa nama/asal/lisensi CC0 per file dan audition asli. Simpan WAV asli byte-for-byte, termasuk sample rate/channel (HunteR Mouse Click dan Scrolling Slow: PCM16 stereo 96 kHz). Jangan trim, resample, normalize, atau mengganti WAV tanpa ACC. Catat SHA-256 file unduhan asli di `source.originalSha256`, bukti sumber di `rightsEvidence`, lalu gunakan importer existing. Ukur attack tekan pertama dan tail; jangan gunakan peak otomatis sebagai bukti onset. Pertahankan ID, SHA256 dan source URL di katalog. `prepare` menerima `"character": "recorded"`, `"tags": ["mouse", "single-click"]`, atau `assetId` spesifik dengan tag aksi yang sesuai. Variasi dipilih melalui ID sesuai aksi/fit, bukan random atau mengulang dua single untuk meniru double. Pack tidak membuktikan klik kanan khusus atau arah scroll; omit jika belum ada sumber yang sesuai dan disetujui. Untuk sumber klik kanan terverifikasi gunakan tag `right-click`. `selectAsset` menolak fallback sintetis untuk request bertag mouse atau ID mouse-*; metadata hak tetap perlu review manusia. Untuk mouse, `prepare` menyimpan `mouseAction`, SHA256 asli dan bukti hak pada cue; QA mengecek hash file project dan kecocokan aksi. Bukti metadata bukan verifikasi independen bahwa file berasal dari situs tersebut.

Library adalah sumber bersama saat authoring; salin hanya WAV yang dipakai ke project melalui staging existing. Ini mempertahankan kontrak `staticFile('videos/<slug>/...')`, validasi, portabilitas dan bunyi project ACC saat library diperbarui. Tidak ada helper runtime global, download saat render, atau command harian tambahan. Sharing Printer memakai rekaman HunteR untuk klik yang telah disambungkan; right-click menunggu rekaman yang sesuai. Starter tidak memakai rekaman HunteR; tunggu sumber asli. Jangan mengganti shortcut keyboard starter dengan suara mouse.

## Koleksi HD eksternal CC0 — 2026-11-28
- `library/sfx/dustyroom-cgs-hd/`: 29 KEEP aktif dan 21 DROP dikeluarkan dari katalog aktif sesuai sortir pengguna; 42 file produksi/original DROP yang tidak terpakai dibersihkan setelah backup; path dan hash historis tetap dicatat. Kategori fungsi kandidat berdasarkan analisis teknis (lihat `library/sfx/INDEX-FUNGSI.md`), belum listening QA fungsi; status `pending-function` tidak dipilih otomatis berdasarkan tag, pilih ID eksplisit setelah audition. Prioritaskan 37 KEEP eksternal, 4 mouse HunteR dan 4 efek Freesound tambahan untuk konten baru, bukan template sintetis lama. Original dan hash tetap utuh. Jangan klaim Dustyroom sebagai rekaman perangkat asli.
- `library/sfx/unfa-pop-hd/`: satu pop, PCM24 48 kHz stereo, FLAC asli disimpan.
- `library/sfx/sadiquecat-foley-hd/`: satu whoosh PCM24 96 kHz mono dan enam typing excerpts PCM24 96 kHz stereo. Original FLAC/WAV tetap utuh; typing bukan rekaman Enter/Backspace/shortcut terisolasi. Pilih cuplikan sesuai timing, bukan untuk adaptive typing satu frame.
- `library/sfx/freesound-motion-hd/`: dua swoosh, satu riser, satu shutter + flash; semua sumber CC0 terverifikasi. Original utuh; PCM24 native rate. `pending-listening`: pilih ID eksplisit setelah audition, tidak dipilih otomatis. Alignment estimasi envelope, bukan listening QA.
- Versi produksi memakai gain menuju peak -3 dBFS, tanpa resampling, limiter, pitch/tempo change. Typing saja diberi high-pass 45 Hz dan fade tepi 8 ms. Metadata processing dan hash asli/hasil tercatat. Peak -3 dBFS bukan true-peak atau loudness normalization. Kualitas sumber tidak bertambah hanya karena bit-depth lebih tinggi; source clipping tidak dapat diperbaiki oleh gain. 
- Local library mendukung PCM16/24 integer RIFF mono/stereo hingga 96 kHz. Kontrak adaptive keypress satu frame masih PCM16 (tidak dipakai oleh typing excerpts). Tidak ada dependency tambahan. Preview listening dan penempatan cue tetap wajib; tidak mengubah project lama secara otomatis.

## CLI (root Master; Node 22)

```bash
node tools/sfx-local.mjs verify
node tools/sfx-local.mjs list
node tools/sfx-local.mjs search synthetic ui click
node tools/sfx-local.mjs search recorded computer keyboard
node tools/sfx-local.mjs prepare /path/draft/motiongraphic-video.json /path/sfx-requests.json /path/new-staging-folder
```

Windows: gunakan path aktual, beri tanda kutip jika mengandung spasi. Folder induk staging harus sudah ada; nama output belum ada dan bukan di `projects/`. Request `schemaVersion: 1`, `cues` array; contoh lengkap `templates/sfx-library/example-requests.json` (contoh untuk video 2 segment, bukan template timing wajib). Gunakan satu request per kejadian bermakna, `impactFrame` absolut sesuai source, `scene` S01 dst. `status: ready` membutuhkan `character` + `tags` **semua harus cocok** atau `assetId` eksplisit; `status: omit` membutuhkan `reason`. `gainDb` opsional (default aset −16 dB, bukan mix final). Tiap scene perlu cue/omit; tidak boleh clip melewati segment. Bila timing tidak muat, pilih file lebih pendek atau ubah timing yang belum ACC; jangan memotong tail tanpa review.

Output staging: `production/sound-cues.json`, `production/sfx-provider-log.json`, `src/components/SoundAssets.ts`, `public/audio/sfx/*.wav` yang dipilih. Log `local-file-only` tidak mengklaim provider upstream dieksekusi. Untuk video baru copy canonical track dan sambungkan satu kali pada entry/SegmentVideo; jangan copy contoh slug atau rewrite Root. Satu cue satu file playback; satu file dapat dipakai beberapa cue jika masuk akal. Jalankan `npm run qa:sound -- <folder-addon> --strict` dan `npm run addon:validate -- <folder-addon> --production --syntax` setelah wiring.

## Tambah koleksi repo/library sekali saja (tidak wajib untuk starter)

Review sumber, lisensi per aset, commit/tag dan hak redistribusi. Simpan salinan lisensi/credit/source URL dan bukti hak. Tidak boleh otomatis mengambil ulang media setiap render. `import` hanya file lokal, tidak membuka ZIP asing atau menjalankan kode asing. Input WAV PCM16/24 mono/stereo, 8–96 kHz, 0–15 detik, maksimum 6 MB; rekomendasi 48 kHz mono. FFmpeg lokal opsional untuk konversi, bukan syarat produksi:

```bash
ffmpeg -n -i input.ogg -ar 48000 -ac 1 -c:a pcm_s16le output.wav
node tools/sfx-local.mjs import path/to/reviewed-spec.json kenney-reviewed-01
node tools/sfx-local.mjs verify
```

Isi `reviewed-spec.json` mengikuti `templates/sfx-library/example-import.json` (placeholder; jangan jalankan tanpa mengganti metadata/file nyata). `file` harus relatif terhadap lokasi spec; `rightsEvidence` wajib, `impactSample` bisa dipilih manual (default peak sampel hasil ukur). Pack/ID tidak boleh menimpa yang sudah ada. Tool menolak NC/ND/SA pada kebijakan konservatif ini, dan CC BY tanpa atribusi/URL; verifikasi hak tetap tanggung jawab review asal. Source kind gunakan `real-recording`, `licensed-other`, `openverse`, `earshot`, `own` sesuai kenyataan; character bukan nama sumber. Gunakan `earshot-rendered-output` hanya hasil bank/kit asli yang haknya telah diperiksa, bukan fit dari sumber berlisensi lain.

| Sumber | Cara local-first | Status patch |
|---|---|---|
| [Real SFX](https://github.com/Clipwing/skills/tree/main/skills/real-sfx) | Skill/directing referensi. Pack uisfx CC0 sintetis untuk UI; rekaman lain milik pengguna. Impor hanya file dan bukti hak yang diperiksa; jangan menjalankan pipeline mux MP4 kedua di Master. | metode diadaptasi, upstream tidak dibundel |
| [Earshot](https://github.com/Leonxlnx/earshot) | Generator lokal opsional; install di environment terpisah sekali jika user perlu. Hasil WAV masuk pack, tidak ada runtime dependency. | adapter CLI lokal opsional + impor siap; runtime upstream belum diuji |
| [Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds), [UI Audio](https://kenney.nl/assets/ui-audio), [Impact Sounds](https://kenney.nl/assets/impact-sounds) | Download pack CC0 secara manual sekali, pilih aset yang sesuai, catat bukti lisensi. | tidak dibundel |
| [FoleyKit](https://github.com/rudqlsdla/foleykit) | Preset sintesis alternatif, gunakan hasil audio yang sah. | referensi, tidak dibundel |
| [Openverse](https://openverse.org/) | Discovery opsional sekali saja, periksa sumber asli. Tidak dibutuhkan untuk produksi offline. | tidak ada API client |

### Earshot opsional (dokumentasi upstream, belum diuji di patch ini)
Jika repo/runtime sudah benar-benar tersedia, contoh `earshot sfx list` lalu `earshot sfx render whoosh_fast/crisp -o take.wav --dur 0.8 --apex 0.32 --sr 48000` (lihat [SFX docs](https://github.com/Leonxlnx/earshot/blob/main/docs/SFX.md), [license output](https://github.com/Leonxlnx/earshot/issues/21)). Uji bantuan versi aktual; PCM24 diterima langsung bila RIFF integer valid; konversi hanya bila format input gagal. Review file, catat preset/seed/versi/hak, impor sebagai synthetic. Tidak ada keharusan memasang paket Python atau listening model di Master. Earshot base rendering bank tidak membutuhkan API/model. Jangan menyamakan fit berlisensi dengan output original bank. Untuk menjalankan adapter bila Earshot sudah terpasang: `node tools/sfx-local.mjs earshot whoosh_fast/crisp earshot-whoosh-01 motion whoosh transition`. Adapter hanya memanggil `earshot sfx render` (non-fit), menggunakan FFmpeg bila format WAV input tidak didukung, kemudian impor pack baru. Tidak memanggil MCP/listening model. Verifikasi versi/lisensi upstream sebelum eksekusi. Adapter diuji dengan mock proses, belum dengan runtime Earshot nyata. Tidak ada auto install atau Git clone dalam patch ini.

## Pemilihan cue otomatis
Request `preferSoftEditorial: true` mengutamakan aset bertag editorial dan soft setelah exact match karakter/tag (rekaman nyata tetap diprioritaskan untuk `either`). Untuk cue ready, kandidat harus muat utuh dalam segmen sebelum dipilih; jika tidak ada, pilih omit dengan alasan atau revisi timing. ID eksplisit tetap dihormati. Jangan menganggap sintetis sebagai rekaman, jangan potong tail otomatis.

## ChatGPT Project setup satu kali
Ganti (jangan append) Project Instructions dengan `docs/CHATGPT-PROJECT-INSTRUCTIONS.md`. Master ZIP terbaru adalah sumber aktual; tidak perlu menambahkan file auto-skill atau sound reference terpisah. Skill akun opsional sebagai referensi; tidak ada instalasi agent/skill pack lokal. Jika Node/file/audio tidak tersedia laporkan blocker. ZIP PC tidak otomatis terbaca browser; patch tidak mengubah akun.
