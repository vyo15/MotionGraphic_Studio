# Template aturan membuat video editable

Setiap add-on baru harus dibuat dengan **scene/layer terpisah**, bukan gambar datar.

## Contoh JSX

```tsx
import React from 'react';
import {Interactive, interpolate, useCurrentFrame} from 'remotion';

export const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  return <Interactive.Div name="S01 · Judul Utama" style={{
    position:'absolute', left:100, top:380, width:880,
    fontSize:72, color:'#fff', opacity:1,
    translate:'0px 0px', rotate:'0deg',
  }}>
    <div style={{opacity:interpolate(frame,[0,12],[0,1],{extrapolateRight:'clamp'})}}>
      Teks kamu di sini
    </div>
  </Interactive.Div>;
};
```

`left/top` di luar ekspresi animasi membuat editor bisa memindahkan objek tanpa mematikan animasinya. `Interactive.Div` dan `name` literal membantu Remotion Studio menampilkan layer. Jika membutuhkan properti dinamis (misalnya warna atau teks berubah), gunakan props dan skema yang benar; dokumentasikan batasnya.

**Checklist:** posisi/edit, teks, warna, ukuran, timing, cursor/klik, narasi, subtitle, SFX, loading, hasil demo, reset/undo. Semua kontrol wajib berpengaruh nyata dan konsisten saat preview/render.
