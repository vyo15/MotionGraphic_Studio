export const SCENE01={fps:30,durationInFrames:360,beats:{
 need:{from:0,to:90,vo:'Mau instal Windows 11'},
 mismatch:{from:90,to:180,vo:'tapi flashdisknya masih Windows 10?'},
 redo:{from:180,to:270,vo:'Masa harus bikin bootable ulang lagi?'},
 hold:{from:270,to:360,vo:'(visual hold)'}
}} as const;
export const SCENE02={fps:30,durationInFrames:330,beats:{
 noRedo:{from:0,to:75,vo:'Nggak perlu bikin ulang terus.'},
 tool:{from:75,to:162,vo:'Pakai Easy2Boot.'},
 iso:{from:162,to:252,vo:'Satu flashdisk'},
 result:{from:252,to:330,vo:'bisa isi beberapa installer sekaligus.'}
}} as const;
export const SCENE03 = {
  fps: 30,
  durationInFrames: 420,
  beats: {
    backup: { from: 0, to: 90, vo: 'Pertama, backup data flashdisk.' },
    open: { from: 90, to: 180, vo: 'Buka Easy2Boot.' },
    select: { from: 180, to: 270, vo: 'Pilih USB yang benar.' },
    create: { from: 270, to: 360, vo: 'Lalu buat USB multiboot.' },
    ready: { from: 360, to: 420, vo: '(visual hold; tanpa VO)' },
  },
} as const;

export const SCENE04={
  fps:30,
  durationInFrames:480,
  beats:{
    open:{from:0,to:96,vo:'Setelah jadi, tinggal salin file ISO ke folder yang sesuai.'},
    win10:{from:96,to:186,vo:'Windows 10...'},
    win11:{from:186,to:276,vo:'Windows 11...'},
    linux:{from:276,to:366,vo:'...atau Linux.'},
    extra:{from:366,to:480,vo:'Mau tambah installer? Cukup salin lagi.'},
  }
} as const;

export const SCENE05={
 fps:30,
 durationInFrames:420,
 beats:{
  connection:{from:0,to:84,vo:'Sekarang, boot komputer dari USB.'},
  bootMenu:{from:84,to:159,vo:'Pilih USB saat booting.'},
  agfm:{from:159,to:255,vo:'Cari Windows 11 di menu agFM.'},
  iso:{from:255,to:345,vo:'Pilih ISO-nya, lalu jalankan.'},
  setup:{from:345,to:420,vo:'Installer Windows mulai terbuka.'},
 }
} as const;


export const SCENE06 = {
 fps:30,
 durationInFrames:390,
 beats:{
  carry:{from:0,to:30,vo:'(transisi dari Windows Setup Scene 05)'},
  old:{from:30,to:145,vo:'Kalau kamu, biasanya bikin bootable ulang'},
  multi:{from:145,to:248,vo:'atau pakai multiboot?'},
  comment:{from:244,to:320,vo:'Coba tulis di kolom komentar!'},
  cover:{from:318,to:390,vo:'(visual hold untuk cover Reels)'},
 }
} as const;
