# SOUND DESIGN DIRECTOR — CHATGPT PROJECT MOTION-GRAPHIC

**BACA TERLEBIH DAHULU:** `docs/SOUND-DIRECTION-RULES.md` v2.1 adalah kontrak sound universal terkini. Setiap aksi dan transisi diperiksa untuk `cue` **atau `omit`**; VO harus paling jelas, sound antar-scene continuity, CTA→Cover tenang, anti-whoosh berulang, tidak ada double-track, perencanaan dan mix mengikuti tahap motion ACC → VO Guide → rekam → sync → listening QA. Dokumen ini ringkasan/rujukan, bukan pengganti aturan utama.


## Tujuan
Aturan tambahan untuk setiap ChatGPT lain di Project ini. Terapkan sound design otomatis secara selektif ketika membuat/revisi video Remotion. Project tetap satu Master, Minimal Editorial, scene-first review/ACC, VO direkam **setelah** visual disetujui. **SFX merupakan lapisan penunjang visual, bukan efek wajib di setiap transisi.**

## Tiga alat dari video referensi pengguna
1. **Openverse** (`https://openverse.org/`): cari rekaman nyata dengan lisensi terbuka. Ini mesin pencari, bukan skill ChatGPT; periksa lisensi, kredit, izin monetisasi, dan halaman asal tiap rekaman.
2. **Real SFX** (`https://github.com/Clipwing/skills/tree/main/skills/real-sfx`): rujukan penempatan rekaman asli tepat di frame, melindungi musik/VO dari efek ganda. Skill upstream untuk Claude Code, *bukan* skill yang otomatis aktif di ChatGPT.
3. **earshot** (`https://github.com/Leonxlnx/earshot`): tool open-source opsional untuk merancang/menilai SFX berbasis kode. Gunakan hanya bila tersedia; simpan hasil WAV dalam project, jangan membuat runtime render bergantung pada tool tersebut.

**Pilih secara otomatis sesuai jenis gerakan.** Untuk demo Windows: UI click/notification lembut, tanpa bunyi pada hover kecil. Mekanisme fisik: rekaman nyata. Hook grafis: pop/impact lembut, hindari whoosh berulang. Data: reveal halus, angka tidak perlu ding di setiap perubahan. Jika jeda natural lebih baik, pilih diam.

## Flow yang harus diterapkan
Naskah draft → storyboard → motion per scene → review dan ACC → sound cues per frame → VO Guide teks → rekam VO sendiri → sinkronisasi level dan timing SFX/musik terhadap VO → QA audio/video → render.

Simpan cue pada `production/sound-cues.json` masing-masing slug, SFX mentah di `public/audio/sfx`, VO asli di `public/audio/voiceover` setelah rekam. Setiap cue terisi aksi, start/impact/end frame, sumber audio, status, gain; tidak ada aset berarti jangan mengklaim sudah dihasilkan. Akurasi berdasarkan frame, bukan menebak berdasarkan durasi bebas.

## Batas kemampuan & version-lock
Master saat dirujuk menggunakan `remotion` 4.0.538. Jangan mengimpor `@remotion/media` atau `@remotion/sfx` karena tidak tercantum pada dependencies Master saat ini. Gunakan `<Html5Audio>`/`<Audio>` versi `remotion` yang didukung, `Sequence`, `staticFile()` dan path literal untuk aset saat build. Uji typecheck, preview, render dan kualitas audio sebenarnya. Jangan mengklaim AI sudah mendengarkan sound mix tanpa bukti mendengarkan/menganalisis.

## Quality bar
- SFX terdengar mendukung gerakan; tidak generik, pecah, terlalu keras atau mengganggu VO.
- One effect for one meaningful action; sisakan visual hold dan silence bila perlu.
- Pilih suara nyata bila dibutuhkan; gunakan earshot hanya bila cocok, bukan default.
- Catat atribusi dan hak guna file eksternal. Lisensi CC BY-NC bukan jaminan aman monetisasi.
- Dengar ulang di HP, ukur peak/LUFS render, cek onset dan impact frame, subtitle/VO, dan revisi manual.
- ChatGPT harus memberi status **direncanakan / aset dibuat / audionya diuji** secara jujur.

Referensi lengkap: `skills/sound-design-director/SKILL.md` di Master terbaru, `docs/SOUND-DESIGN-WORKFLOW.md` dan dokumen resmi Remotion. Menambahkan sumber Project ini tidak otomatis memasang tool atau memperbarui Custom Skill yang sudah diinstal.
