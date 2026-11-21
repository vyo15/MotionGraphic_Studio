export const SCENE01={fps:30,durationInFrames:381,beats:{
 need:{from:0,to:90,vo:'Mau instal Windows 11'},
 mismatch:{from:90,to:180,vo:'tapi flashdisknya masih Windows 10?'},
 redo:{from:180,to:270,vo:'Masa harus bikin bootable ulang lagi?'},
 hold:{from:270,to:360,vo:'(visual hold)'}
}} as const;
export const SCENE02={fps:30,mainDurationInFrames:390,durationInFrames:498,beats:{
 noRedo:{from:0,to:84,vo:'Ah, ribet banget.'},
 tool:{from:84,to:181,vo:'Mending pakai Easy2Boot aja.'},
 iso:{from:181,to:287,vo:'Satu flashdisk bisa nyimpen installer'},
 result:{from:287,to:390,vo:'Windows 10, Windows 11, sampai Linux sekaligus.'}
}} as const;
export const SCENE03 = {
  fps: 30,
  durationInFrames: 472,
  sourceDurationInFrames:420,
  beats: {
    backup: { from: 0, to: 142, vo: 'Pertama, backup data flashdisk.' },
    open: { from: 142, to: 232, vo: 'Buka Easy2Boot.' },
    select: { from: 232, to: 322, vo: 'Pilih USB yang benar.' },
    create: { from: 322, to: 412, vo: 'Lalu buat USB multiboot.' },
    ready: { from: 412, to: 472, vo: '(visual hold; tanpa VO)' },
  },
} as const;

export const SCENE04={
  fps:30,
  durationInFrames:480,
  /** Draft VO/visual mapping, each copy uses the SAME transfer window. */
  beats:{
    setup:{from:0,to:138,vo:'Salin file ISO installer'},
    transfer:{from:138,to:218,vo:'ke folder masing-masing.'},
    result:{from:218,to:345,vo:'Sesuai sistem operasinya.'},
    carry:{from:345,to:480,vo:'(USB membawa installer ke scene booting)'},
  },
} as const;

export const SCENE05={
 fps:30,
 durationInFrames:480, // ACC visual preview laptop sama Scene01: 16 s
 beats:{
  connection:{from:0,to:108,vo:'Sekarang, boot dari flashdisk.'},
  bootMenu:{from:108,to:202,vo:'Di Boot Menu, pilih USB.'},
  agfm:{from:202,to:285,vo:'Buka menu agFM.'},
  iso:{from:285,to:387,vo:'Pilih ISO Windows 11, lalu jalankan.'},
  setup:{from:387,to:480,vo:'Installer Windows pun terbuka.'},
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

/** Approved 02→03 scene bridge: exact Match Move option 01, 3.6 seconds. */
export const BRIDGE02TO03={
 fps:30,durationInFrames:108,
 titleExitStart:12,titleExitEnd:30,
 captionExitStart:12,captionExitEnd:32,
 headingStart:70,headingEnd:86,
} as const;
