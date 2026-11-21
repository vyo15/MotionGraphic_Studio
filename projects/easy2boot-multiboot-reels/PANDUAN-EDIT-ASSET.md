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
