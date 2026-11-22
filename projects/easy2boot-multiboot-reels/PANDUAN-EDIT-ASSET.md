# Panduan Edit Aset dan Layer — Easy2Boot Clean 2026-11-20

## 1. Edit tanpa mengganti kode scene

Buka komposisi `Easy2BootMultibootReels` di Remotion Studio. Pada Props komposisi, edit nilai `scene04IsoFiles`, `scene04InstallerLabels`, `scene04FolderPaths`, subtitle S03/S04, serta `layerOverrides`. Source bersifat folder-first, semua perubahan harus dilakukan di folder proyek, bukan di file mirror Master.

**Contoh defaultProps (di `motiongraphic-video.json`):**

```json
{
  "scene03CleanLayout": true,
  "scene03ShowTextVO": true,
  "scene04CleanLayout": true,
  "scene04ShowTextVO": true,
  "scene04IsoFiles": ["Win8_64.iso", "Win10_22H2.iso", "Win11_24H2.iso", "Ubuntu_24.04.iso"],
  "scene04InstallerLabels": ["WINDOWS 8", "WINDOWS 10", "WINDOWS 11", "LINUX"],
  "scene04FolderPaths": ["WINDOWS / WIN8", "WINDOWS / WIN10", "WINDOWS / WIN11", "LINUX"],
  "scene04SubtitleLines": ["Salin file ISO installer", "ke folder masing-masing.", "Sesuai sistem operasinya."]
}
```

Folder installer di storyboard adalah ilustrasi. Sesuaikan nama dan lokasi berdasarkan versi Easy2Boot yang kamu gunakan sebelum publikasi tutorial.

## 2. Daftar layer penting Scene 04 (semua berbeda, bukan video flatten)

| Layer | Identitas untuk `layerOverrides` | Fungsinya |
|---|---|---|
| Latar | `S04:bg`, `S04:grid`, `S04:background-accent` | Off-white, grid dan bidang coral samar |
| Handoff | `S04:handoff-folder` | Folder `_ISO` dari Scene 03 |
| Kartu file | `S04:source-card-win8` / `win10` / `win11` / `linux` | Empat kartu sumber ISO |
| Nama file | `S04:filename-win8` / `win10` / `win11` / `linux` | Nama ISO independen |
| Folder tujuan | `S04:folder-card-win8` / `win10` / `win11` / `linux` | Empat kartu folder |
| Label OS | `S04:os-label-win8` / ... | Nama sistem operasi independen |
| Path folder | `S04:destination-win8` / ... | Teks lokasi folder independen |
| Logo OS | `S04:os-logo-win8` / ... | Bentuk logo SVG yang dapat diganti asset |
| Jalur transfer | `S04:path-win8` / ... | Garis arah file ke folder |
| File bergerak | `S04:flying-iso-win8` / ... | Copy serentak dalam lintasan 1x |
| Tanda hasil | `S04:success-win8` / ... | Centang hasil |
| Hasil keseluruhan | `S04:success-banner`, `S04:success-text` | Empat ISO tersimpan |
| USB penutup | `S04:hero-title`, `S04:hero-support`, `S04:usb-hero`, `S04:usb-ready` | 4 installer satu flashdisk |
| VO bawah | `S04:vo-0`, `S04:vo-1`, `S04:vo-2` | Caption teks saja |

## 3. Contoh mengedit posisi, teks, ukuran dan keyframe

Tambahkan di object `defaultProps.layerOverrides`:

```json
{
  "S04:filename-win8": {
    "text": "Windows_8.1.iso",
    "x": -10,
    "y": 3,
    "fontSize": 29,
    "fill": "#202628"
  },
  "S04:folder-card-win10": {
    "x": 0,
    "y": 4,
    "scale": 1.03,
    "rotation": 0,
    "opacity": 1
  },
  "S04:usb-hero": {
    "scale": 1,
    "keyframes": [
      {"frame": 372, "scale": 0.9},
      {"frame": 407, "scale": 1}
    ]
  },
  "S03:element_094": {
    "text": "E: USB Flash Drive  —  32 GB"
  }
}
```

Koordinat Scene 04 memakai kanvas logis **1080×1920**. `basePosition` di komponen adalah posisi default; `userTransform` dari `layerOverrides` diterapkan relatif terhadapnya; `animationTransform` tetap berjalan berdasarkan frame. Mengedit X/Y tidak merusak lintasan animasi. Lapisan dari S03 legacy memakai geometri SVG bawaan.

Override layer menyediakan `x`, `y`, `scale`, `rotation`, `opacity`, `visible`, `fill`, `stroke`, `startFrame`, `endFrame`, `animation`, `animationStartFrame`, `delayFrames`, `durationFrames`, `easing`, dan `keyframes`. Layer teks mendukung `text`, `fontSize`, `fontFamily`, `fontWeight`, serta `letterSpacing`. Layer visual dapat memakai `asset` berupa nama file gambar di `public/images/`. Pergantian `zIndex` atau urutan antargrup secara visual masih memerlukan pengujian editor; susunan default dibangun menurut urutan JSX.

## 4. Ubah timing dan warna

- `src/config/scene04Clean.ts`: semua posisi kartu/USB, layout, token warna dan timeline aksi copy.
- `src/animations/scene04Clean.ts`: preset `ease5`, interpolasi, slide, opacity. Semua berdasarkan frame deterministik.
- `src/config/sceneTextVO.ts`: `from`/`to` untuk setiap cue subtitle.
- `src/config/scene03Clean.ts`: elemen metadata yang disembunyikan dari SVG Scene 03.
- `src/config/frames/scene03.ts`: lintasan kursor dan UI Scene 03 yang sudah diperbaiki satu jendela.

**Timing Scene 04:** ISO mulai bergerak pada frame 138 dan selesai pada frame 218 (bersamaan untuk keempatnya); hasil ditahan, lalu animasi USB masuk pada frame sekitar 371–407. Semua frame relatif ke Scene 04 (mulai dari 0).

## 5. VO, subtitle, SFX dan aset

- `scene03SubtitleLines` / `scene04SubtitleLines`: teks VO ditampilkan sebagai **teks biasa tanpa kotak**.
- `scene03ShowTextVO` dan `scene04ShowTextVO` dapat dimatikan tersendiri.
- Subtitle **masih draft**, tidak ada rekaman VO final dalam ZIP.
- Audio SFX asli tetap ada di `public/audio`; jangan dikonversi menjadi lapisan visual.
- Jika memasukkan VO asli, tempatkan di `public/audio/`, gunakan `showVoiceOver` dan `voiceOverFileName` di Props, lalu sesuaikan waktu caption menurut suaranya.
- Aset lokal referensikan `staticFile('videos/easy2boot-multiboot-reels/images/nama.png')` atau `.../audio/nama.wav` setelah sync Master.

## 6. Periksa dan render

1. Dari Master jalankan `npm run sync`, lalu `npm run dev`.
2. Cek batas S01/S02/bridge sudah sama; verifikasi Scene 03 dan Scene 04 pada resolusi penuh.
3. Ubah salah satu Props (mis. `scene04IsoFiles[0]`) dan verifikasi tampilan. Simpan, reload, lalu pastikan perubahan tetap tersimpan sebelum mengandalkan edit visual.
4. Jalankan `npm run check` dan `npm run render` dari Master.
5. Jika menemukan masalah pada Scene 04, revisi hanya file Scene 04 dan konfigurasi terkait; jangan sentuh source Scene 01/02.


## Panduan baru: kontrol per elemen (21 November 2026)
Baca `EDITABLE-PER-ELEMEN-20261121.md` untuk daftar lengkap ID teks S03/S06 dan bagian UI S05. Props `layerOverrides` terisi key eksplisit agar teks/posisi bisa diperiksa dalam Studio. Teks `""` berarti menggunakan teks bawaan dan tidak mengubah animasi.


## Subtitle Scene 01 — klik langsung di Remotion Studio

Buka komposisi `Easy2BootMultibootReels-S01` dan geser ke frame 104 (~3,47 detik).
Pilih teks bawah **“Mau instal Windows 11,”** di preview atau baris
`S01 — Subtitle 01 — Mau instal Windows 11` pada timeline.
Subtitle Scene 01 sekarang terdiri dari lima node `Interactive.Text` mandiri
(1 baris pembuka, 2 baris perbandingan, 2 baris pertanyaan akhir); tiap
baris dapat diedit pada source Studio bila teks dan warna masih default.
Setelah mengubah teks, simpan, reload, lalu cek lagi di frame yang sama.

Jika sudah pernah mengubah `scene01CaptionLines` atau `subtitleColor` melalui Props,
source sengaja memakai versi Props untuk menghindari menimpa pilihan tersebut.
Untuk pengeditan melalui kanvas lagi, kembalikan Props ke nilai draft;
untuk mempertahankan override, edit melalui Props.

**Catatan:** ini subtitle draft Scene 01, bukan subtitle dari rekaman VO final.
Tidak ada perubahan pada timing atau data frame animasi.

## Subtitle draft versus subtitle final — status Native Editable First

- Pada scene S01, S02, S03, S04 dan S05, teks panduan/draft yang dinyatakan `Interactive.Text` bisa dipilih bila default/Props tidak menggantinya. Jika teks diganti lewat Props, mode fallback adalah **Props-editable**, bukan otomatis klik native.
- Di `Easy2BootMultibootReels` (Full Video), `showSubtitles: true` menampilkan subtitle final berlapis `Interactive.Div` per cue. Mode ini **untuk setelah VO direkam**; saat belum ada rekaman, biarkan `showSubtitles: false` agar tidak menumpuk draft.
- Komposisi scene `Easy2BootMultibootReels-S01` sampai `-S06` menggunakan offset global untuk cue final saat `showSubtitles` aktif, dan menyembunyikan subtitle draft S01/02 yang akan bentrok.
- Subtitle final diedit secara langsung pada JSX `src/components/SubtitleTrack.tsx` melalui Remotion Studio. `src/config/subtitles.ts` hanya menyimpan timing draft. Bila VO baru sudah direkam, perbarui keduanya.
- Scene 06 dan beberapa atom SVG lama **belum sepenuhnya native-editable**; kontrol Props/source tetap tersedia dan data animasi lama sengaja dipertahankan.
- Setelah perubahan: pilih cue yang terlihat → ubah teks/posisi → Save → reload → sync → render dan bandingkan. Belum boleh mengklaim lulus sebelum diuji di Studio Windows.

## Scene 03 ACC (21 November 2026) — Fold & Unfold + Loading

- **Source revisi:** `src/components/Scene03MergedWorkflow.tsx` (native React/SVG, layer `Interactive.G` dan `Interactive.Text` bernama), dipanggil dari `src/scenes/Scene03Preparation.tsx`.
- **Status:** visual dan alur Scene 03 ACC oleh pengguna. Layer lama B/C/D/E masih ada **sebagai referensi rollback** di `src/config/scene03Svg.ts` tetapi *tidak ditampilkan* pada komposisi revisi. Scene 01–02, Match Move, dan Scene 04–06 tidak diubah.
- **Bingkai:** `S03_MERGED_TIMING` dapat mengatur frame klik EXE, proses fold, loading, unfold, pilihan USB, klik Make E2B, progress, dan hold.
- **Edit langsung di Remotion Studio (perlu tes GUI):** cari `S03 — Jendela folder Easy2Boot`, `S03 — Nama file Make_E2B.exe`, `S03 — Loading pill`, `S03 — Loading spinner`, `S03 — Jendela Make_E2B.exe`, `S03 — Dropdown USB Drive`, `S03 — Tombol Make E2B Drive`, `S03 — Angka progress (simulasi)`, `S03 — Kursor / hotspot` dan label lain di panel Interactive. Tiap group/text terpisah, bukan frame yang diflatten.
- **Nilai teks dari Props:** `titleOpen`, `usbDriveLabel`, dan `fontFamily`; teks lain bisa diedit pada sumber JSX pada komponen di atas. Master native Studio harus memverifikasi drag/text/Save dan reload; jangan dianggap sudah lulus sebelum diuji.
- **Progress 0–100% adalah simulasi deterministik untuk edukasi, bukan proses USB asli.** SFX S03 telah di-retime ke aksi yang baru. Voice-over tetap DRAFT.


## Pembaruan Scene04 ACC (21 November 2026)

Daftar layer Scene04 di bagian lama adalah **inventaris versi sebelumnya** dan kini digantikan oleh `README-SCENE04-ACC.md`. Tidak ada lagi `S04:background-accent`, `S04:path-*`, `S04:source-card-*`, atau garis/duplikat file. Semua transfer berasal dari `S04:source-tile-*` dan elemen `S04:flying-file-*` ke `S04:focus-folder-*`. Total Scene04 **240 frame**; source timeline di `src/config/scene04Clean.ts`. Tampilan hasil tetap `S04:usb-hero`, `S04:hero-title`, `S04:hero-support`.


## Scene 05 — ACC 21 November 2026 (source native)

Teks/objek Scene05 adalah layer yang terpisah di `src/scenes/Scene05Boot.tsx`, bukan MP4/PNG ter-flatten. Nama layer `S05:<id>`; contoh: `boot-usb-highlight` untuk kotak highlight USB, `row-win11-label` untuk tulisan WIN11, `row-iso-win11-label` untuk nama ISO, `method-name` untuk opsi boot, `setup-title` untuk Windows Setup, dan `usb-multiboot-object` untuk flashdisk.

Gunakan `layerOverrides: {"S05:row-win11-label": {"text": "WIN11", "x": 0, "y": 0, "scale": 1}}` pada Props untuk mengubah parameter. `src/config/scene05Acc.ts` menetapkan 486 frame dan VO tiga beat; `scene05SubtitleLines` menyediakan pengganti teks VO. Lima tampilan subtitle normal memakai `Interactive.Text` terpisah; Save/reload visual editor **belum diverifikasi di Windows**. Lihat `README-SCENE05-ACC.md`.


## Scene 06 — CTA Mix ACC (21 Nov 2026)

Scene06 adalah vektor React/Remotion, bukan footage MP4. Komponen utama: `src/scenes/Scene06Closing.tsx`, `src/components/Scene06EditableIcons.tsx`, animasi `src/animations/scene06Acc.ts`.

**Props di Studio:** `scene06ShowTextVO=true` untuk panduan narasi tanpa kotak, `false` untuk menyembunyikan. Teks cover dari `coverBrand`, `coverLine1`, `coverLine2`; teks pertanyaan dari `scene06Question`; CTA dari `scene06Prompt`. `showSubtitles=false` mencegah subtitle global dobel.

**Layer utama** di kanvas: latar, judul Bootable/ULANG, judul Multiboot, judul Kamu Tim Mana, USB kiri, USB kanan, konektor/badan/label tiap USB, lima tile (masing-masing latar/logo/tulisan), pita CTA, ikon komentar, teks VO, dan empat teks cover. Sebagian teks dapat ditata lewat Props `layerOverrides` dengan ID semantik; misalnya:

```json
{
  "S06:usb-multi": {"x": 0, "y": 0, "scale": 1, "opacity": 1},
  "S06:cover-easy2boot": {"x": 0, "y": 0, "text": "EASY2BOOT"},
  "S06:cover-1-flashdisk": {"x": 0, "y": 0, "fontSize": 49},
  "S06:pertanyaan-kamu-tim-mana": {"x": 0, "y": 0}
}
```

**Cara QA di PC:** pilih layer satu per satu, geser, ubah teks, Save, tutup dan buka kembali Studio, lalu render still di frame awal/mid/akhir S06. Jika perubahan tidak bertahan, gunakan Props/source dan laporkan elemen tersebut sebagai **belum Studio-editable**; jangan mengklaim berhasil hanya karena kotak seleksi muncul.

**Cover Instagram:** teks dan USB berada di area tengah 9:16 yang juga relatif aman untuk tampilan grid 3:4 dan 1:1. Jangan memperbesar cover hingga keluar area tersebut.
