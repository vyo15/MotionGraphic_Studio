# Belajar IP Address

Project add-on siap pakai untuk MotionGraphic Studio v1.6.

- Composition ID: `IPAddressReels`
- Slug: `ip-address`
- Durasi: 24 detik (30 fps)
- Edit source: `src/` (bukan mirror di root Studio).
- Edit aset asli: `public/` (jika ada), kemudian `npm run sync` dari Master.
- Render: `npm run render -- IPAddressReels` dari Master.
- Ekspor add-on: `npm run zip -- IPAddressReels` dari Master.

`src/Video.tsx` diekspor sebagai `Video` tanpa mengubah perilaku animasi aslinya.
