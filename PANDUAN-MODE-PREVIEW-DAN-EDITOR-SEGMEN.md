# Mode Preview & Editor Per Segmen — standar Master v1.8.1

## Kenapa dua mode?

1. **Video lengkap**: komposisi Master id asli, tetapi timeline Remotion Studio tampil sebagai satu `Sequence` utama. Bisa di-expand bila perlu. Rendering dan animasi tetap HTML/CSS/SVG; ini bukan screenshot/video flatten. Render MP4 menggunakan video gabungan yang sama.
2. **Per segmen**: memakai `src/SegmentVideo.tsx` untuk memanggil **komponen scene asli secara langsung**, sehingga track dan layer internal bisa terlihat/diedit di timeline, tanpa pemotongan satu `Sequence` berisi seluruh video.

Windows Hacks dan IP Address sudah memakai mode ini. ID, manifest, durasi dan default Props tidak diubah.

## Standard bagi SEMUA add-on baru

Di samping file wajib `src/Video.tsx` yang mengekspor `Video`, setiap add-on yang ingin **editor segmen detail** perlu menyertakan `src/SegmentVideo.tsx` yang mengekspor `SegmentVideo`. Keduanya harus memakai **scene/component dan Props yang sama**, tidak menyalin ulang/flatten seluruh visual.

Contoh konsep:

```tsx
// src/SegmentVideo.tsx
import React from 'react';
import {SceneIntro} from './scenes/SceneIntro';
import {SceneDemo} from './scenes/SceneDemo';

const scenes = [SceneIntro, SceneDemo] as const;
export const SegmentVideo:React.FC<{title:string;segmentIndex:number}> = ({title,segmentIndex}) => {
  const Scene=scenes[segmentIndex];
  return Scene ? <Scene title={title}/> : null;
};
```

- `segmentIndex`: nomor urutan mulai 0, disuplai otomatis oleh Master; bukan field pengguna di `defaultProps`.
- Waktu segmen otomatis dari `motiongraphic-video.json` > `segments`, atau deteksi `src/config/segments.json`/`series.ts`/scene source yang dapat dikenali. **Jangan menebak timeline dinamis.**
- **Tidak perlu** mengubah `src/Root.tsx` maupun `library/catalog.json`. Master otomatis memakai `SegmentVideo` saat `npm run dev` / `npm run sync`. Bila Studio sedang aktif, watcher menjalankan sync ketika add-on masuk ke `projects/`.
- Kalau `SegmentVideo.tsx` belum tersedia (legacy), segmen tetap muncul tetapi dalam mode frame-trim untuk preview saja. Layer tidak otomatis menjadi editable. Buat satu komponen scene bersama dahulu agar pengeditan source tetap konsisten.
- Saat mengubah `defaultProps` melalui Remotion Studio dan menyimpannya ke source, `npm run sync` menggabungkan perubahan ke manifest video yang sama dengan pemeriksaan konflik.

## Pengujian yang dianjurkan

1. Setelah patch, `npm run sync` lalu `npm run dev`.
2. Buka `Videos/Windows-Hacks-5-Shortcut/WinHacks-01-CtrlShiftT`: timeline harus menunjukkan `DemoSlot` dengan beberapa sub-sequence, bukan `Segmen mulai frame 240` sebagai track tunggal.
3. Buka `WinHacks-02-TaskManager`: cek layer kursor & langkah End Task. Edit satu layer; buka `WindowsHacks5ShortcutLengkap`, cek perubahan di tampilan gabungan.
4. Buka `Videos/Belajar-IP-Address/IPAddress-02-Alamat-Rumah`: objek `Interactive.*` seharusnya bisa dipilih langsung di scene editor.
5. Buka komposisi video lengkap: timeline berisi `VIDEO LENGKAP — preview gabungan`; expand jika perlu melihat seluruh video.
6. Jalankan `npm run check` sebelum ekspor. Jika terjadi error, jangan hapus video lama; gunakan backup.

**Keterbatasan**: merapikan timeline tidak otomatis mempercepat renderer secara drastis. Editabilitas visual tetap mengikuti `Interactive` dan props yang memang dibuat oleh masing-masing project. Hasil render Windows masih harus diverifikasi di komputer pengguna.
