# EDITABLE PER ELEMEN — EASY2BOOT (21 November 2026)

Proyek: `Easy2BootMultibootReels` · folder: `easy2boot-multiboot-reels` · 1080×1920 @30 FPS, 2701 frame (90,03 detik).

## Komitmen visual dan scope

- Scene 01: **visual Impact Stamp tetap**. Laptop/USB yang sebelumnya satu grup dipecah (bezel, layar, logo, label, alas, body).
- Scene 02: **visual Card Break tetap**. USB hero dipisahkan menjadi konektor, bodi, label, tulisan USB, indikator.
- Pengantar 02→03 tidak diubah. Scene 03: konten dan timing sebelumnya dipertahankan, render SVG dipecah menjadi atom-atom per node (bukan satu grup `innerHTML`).
- Scene 04: komponen ISO, folder, rute, logo, status, dan VO tetap vector layer terpisah.
- Scene 05: **baru**, laptop memakai siluet Scene 01, menu Boot→agFM→Windows Setup berada di layar yang sama, 16 detik / 480 frame.
- Scene 06: layout tidak didesain ulang; SVG dipecah menjadi atom per node.
- Tidak membuat Master baru. ZIP ini hanya `projects/easy2boot-multiboot-reels/`.

## Edit tanpa VSCode via Remotion Studio

1. Salin folder add-on ke `MotionGraphic-Studio/projects/`; dari Master jalankan `npm run dev` atau `npm run sync`.
2. Pilih komposisi `Easy2BootMultibootReels`, geser playhead pada scene dan klik elemen yang akan diedit. Seleksi berlabel **S01/S02/S03/S04/S05/S06**.
3. Untuk **posisi/ukuran/rotasi** gunakan kontrol elemen Interactive.G di canvas Studio jika tersedia pada instalasi Remotion kamu; hasilnya perlu diuji setelah Save + reload.
4. Untuk **teks/posisi melalui Props**, buka tab Props → `layerOverrides` → key misalnya `S03:element_059`, `S05:setup-title`. `text` mengubah teks. `x/y` offset relatif; `scale=1` normal; `opacity=1` terlihat. Teks kosong `""` pada S03/S06 berarti gunakan teks sumber, bukan sembunyikan.
5. Untuk Scene 05: `scene05SubtitleLines` (5 bagian), `bootOption`, `isoBootName`, `scene05ShowTextVO`, `scene05ShowIntro`.
6. Buka menu Save Props to Code bila tersedia; tutup dan buka kembali Studio, uji bahwa perubahan masih ada. Uji hasil render MP4 lewat `npm run render`.

**Batasan terverifikasi:** pemeriksaan statis sudah dilakukan, tetapi drag-save-reload dan perubahan inline teks lewat kanvas pada editor Windows belum pernah dijalankan di lingkungan ini. Untuk kepastian gunakan Props dengan key di bawah dan lakukan tes simpan/reload. Nilai `zIndex` untuk SVG memakai urutan lukis; sebagian layer Scene 05 belum mendukung reordering dinamis.


## Contoh key Scene 01 dan 02 (unit logical scene 540×960)

### S01

- `S01:laptop-bezel`
- `S01:laptop-screen`
- `S01:laptop-windows-logo`
- `S01:laptop-os-name`
- `S01:laptop-silver-base`
- `S01:usb-metal`
- `S01:usb-body`
- `S01:usb-label-text`
- `S01:headlineNeed`
- `S01:headlineWin11`
### S02

- `S02:hero-usb-connector`
- `S02:hero-usb-body`
- `S02:hero-usb-label`
- `S02:hero-usb-name`
- `S02:hero-usb-leds`
- `S02:reaction`
- `S02:reactionSecond`
- `S02:solutionLine1`
- `S02:solutionLine2`
- `S02:manyLine1`
- `S02:manyLine2`

## Scene 03 — teks SVG yang tadinya berada di dalam grup

| Key Props | Isi awal (bila tersedia) |
|---|---|
| `S03:element_006` | EASY2BOOT |
| `S03:element_007` | 03 / PERSIAPAN |
| `S03:element_009` | EASY2BOOT — SATU USB, BANYAK PILIH |
| `S03:element_010` | 03/06 |
| `S03:element_011` | BEBERAPA |
| `S03:element_012` | INSTALLER. |
| `S03:element_019` | ISI FLASHDISK |
| `S03:element_023` | Windows 10 |
| `S03:element_029` | Windows 11 |
| `S03:element_035` | Linux |
| `S03:element_039` | DALAM SATU FLASHDISK |
| `S03:element_040` | PERTAMA, |
| `S03:element_041` | BACKUP DATA. |
| `S03:element_047` | USB DRIVE |
| `S03:element_048` | E: |
| `S03:element_052` | BACKUP |
| `S03:element_062` | DATA SUDAH AMAN |
| `S03:element_063` | BUKA |
| `S03:element_064` | EASY2BOOT. |
| `S03:element_068` | 📁 |
| `S03:element_069` | Easy2Boot_v2.xx |
| `S03:element_071` | Name |
| `S03:element_072` | Type |
| `S03:element_076` | Make_E2B.exe |
| `S03:element_077` | Application |
| `S03:element_078` | EXE |
| `S03:element_081` | BUKA APLIKASI |
| `S03:element_085` | PASTIKAN |
| `S03:element_086` | PILIH USB. |
| `S03:element_091` | Make_E2B.exe |
| `S03:element_092` | − □ × |
| `S03:element_093` | USB DRIVE |
| `S03:element_094` | E: USB Flash Drive — 32 GB |
| `S03:element_097` | Refresh |
| `S03:element_101` | Make E2B Drive |
| `S03:element_105` | Warning: |
| `S03:element_106` | USB drive will |
| `S03:element_107` | be erased! |
| `S03:element_108` | Simulasi UI • Pilih kapasitas & na |
| `S03:element_111` | E: USB Flash Drive — 32 GB |
| `S03:element_116` | LALU, |
| `S03:element_117` | BUAT USB. |
| `S03:element_120` | E: USB Flash Drive — 32 GB |
| `S03:element_124` | Make E2B Drive |
| `S03:element_128` | USB drive will be erased! |
| `S03:element_129` | SIMULASI TINDAKAN — BACKUP SEBELUM |
| `S03:element_133` | SELESAI. |
| `S03:element_134` | USB SIAP. |
| `S03:element_138` | USB multiboot selesai |
| `S03:element_139` | Drive E: • Easy2Boot |
| `S03:element_142` | Siap untuk ditambahkan file ISO |
| `S03:element_143` | 100% |
| `S03:element_146` | _ISO |

## Scene 04 — file dan label

- `scene04IsoFiles[0..3]`: nama file Win8, Win10, Win11, Linux.
- `scene04InstallerLabels[0..3]`: nama tampilan sistem operasi.
- `scene04FolderPaths[0..3]`: tujuan folder. `scene04SubtitleLines[0..2]`: subtitle VO.
- `S04:flying-iso-win8`, `S04:folder-card-win10`, dll. Periksa nama layer yang muncul pada Studio.

## Scene 05 — elemen selectable / editable

- `S05:agfm-folder-heading`
- `S05:agfm-folder-navigation`
- `S05:agfm-folder-panel`
- `S05:agfm-folder-path`
- `S05:agfm-iso-filename`
- `S05:agfm-iso-filetype`
- `S05:agfm-iso-heading`
- `S05:agfm-iso-highlight`
- `S05:agfm-iso-icon`
- `S05:agfm-iso-navigation`
- `S05:agfm-iso-panel`
- `S05:agfm-iso-path`
- `S05:agfm-win11-selected`
- `S05:boot-menu-background`
- `S05:boot-menu-heading`
- `S05:boot-navigation`
- `S05:boot-option-manager`
- `S05:boot-option-manager-text`
- `S05:boot-option-usb`
- `S05:boot-option-usb-text`
- `S05:intro-line-1`
- `S05:intro-line-2`
- `S05:laptop-base`
- `S05:laptop-bezel`
- `S05:laptop-shadow`
- `S05:loading-agfm`
- `S05:loading-agfm-text`
- `S05:loading-setup`
- `S05:loading-setup-text`
- `S05:screen-system`
- `S05:screen-system-logo`
- `S05:screen-system-name`
- `S05:setup-button`
- `S05:setup-button-text`
- `S05:setup-screen`
- `S05:setup-title`
- `S05:setup-windows-logo`
- `S05:usb-body`
- `S05:usb-label`
- `S05:usb-metal`
- `S05:usb-orange-badge`
- `S05:usb-os-grid`

Contoh override pada Props:
```json
"layerOverrides": {
  "S05:setup-title": {
    "text": "Windows Setup",
    "x": 0, "y": 0, "scale": 1,
    "rotation": 0, "opacity": 1
  }
}
```


## Scene 06 — teks SVG yang tadinya satu grup

| Key Props | Isi awal (bila tersedia) |
|---|---|
| `S06:element_006` | EASY2BOOT |
| `S06:element_007` | 06 / PENUTUP |
| `S06:element_009` | EASY2BOOT — SATU USB, BANYAK PILIH |
| `S06:element_010` | 06/06 |
| `S06:element_011` | ISO BERHASIL DIJALANKAN. |
| `S06:element_012` | INSTALLER TERBUKA. |
| `S06:element_018` | Windows Setup |
| `S06:element_020` | Next |
| `S06:element_021` | KALAU KAMU, BIASANYA... |
| `S06:element_022` | BOOTABLE ULANG? |
| `S06:element_026` | USB BOOTABLE |
| `S06:element_027` | Windows 10 |
| `S06:element_029` | TERPASANG |
| `S06:element_033` | MAU GANTI INSTALLER |
| `S06:element_034` | Windows 11 |
| `S06:element_038` | BUAT USB LAGI |
| `S06:element_040` | ATAU... |
| `S06:element_041` | PAKAI |
| `S06:element_042` | MULTIBOOT? |
| `S06:element_049` | EASY2BOOT |
| `S06:element_050` | MULTIBOOT USB |
| `S06:element_053` | 10 |
| `S06:element_054` | Windows |
| `S06:element_055` | 10 |
| `S06:element_058` | 11 |
| `S06:element_059` | Windows |
| `S06:element_060` | 11 |
| `S06:element_063` | ISO |
| `S06:element_064` | Linux |
| `S06:element_067` | TULIS DI KOMENTAR |
| `S06:element_068` | EASY2BOOT |
| `S06:element_069` | 1 FLASHDISK |
| `S06:element_070` | BANYAK INSTALLER |
| `S06:element_077` | EASY2BOOT |
| `S06:element_078` | MULTIBOOT USB |
| `S06:element_080` | WINDOWS |
| `S06:element_081` | 10 |
| `S06:element_083` | WINDOWS |
| `S06:element_084` | 11 |
| `S06:element_086` | LINUX |
| `S06:element_088` | USB MULTIBOOT |

## Timeline sesudah revisi

| Scene | Frame awal | Durasi frame |
|---|---:|---:|
| 01 — Masalah: Bootable ulang | 0 | 381 |
| 02 — Solusi: Easy2Boot | 381 | 498 |
| 03 — Persiapan USB | 879 | 472 |
| 04 — Salin ISO | 1351 | 480 |
| 05 — Booting Windows 11 | 1831 | 480 |
| 06 — CTA + Cover | 2311 | 390 |

## Catatan audio dan simulasi

- Enam track SFX tetap dipertahankan. Audio VO final belum ada di ZIP. Durasi dan teks VO hanya rancangan hingga rekaman tersedia.
- Scene 05 adalah simulasi UEFI boot/agFM dan bukan rekaman laptop; menu boot asli dapat berbeda menurut perangkat/versi Easy2Boot.
