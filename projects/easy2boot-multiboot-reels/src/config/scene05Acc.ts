/** Scene05 ACC, 21 November 2026. One source for the approved draft VO and its timing. */
export const S05_FPS = 30;
export const S05_DURATION = 486; // 16.2 seconds
export const S05_VO_BEATS = [
  {
    from:0,to:144,
    segments:[
      {from:0,to:60,text:'Sekarang, booting seperti biasa,'},
      {from:60,to:144,text:'Pilih booting USB.'},
    ],
  },
  {
    from:144,to:309,
    segments:[
      {from:144,to:231,text:'Begitu muncul, kamu tinggal pilih ISO'},
      {from:231,to:309,text:'yang kamu butuhkan.'},
    ],
  },
  {
    from:309,to:486,
    segments:[
      {from:309,to:402,text:'Jalankan, dan beberapa saat kemudian,'},
      {from:402,to:486,text:'Windows Setup pun terbuka.'},
    ],
  },
] as const;
export const S05_APPROVED_VO = S05_VO_BEATS.map(b=>b.segments.map(s=>s.text).join(' '));

/** The original 16.2-second approved preview's visual timing, expressed in frames. */
export const S05_STAGES = [
  {id:'usb',from:0,to:57},
  {id:'boot-menu',from:57,to:144},
  {id:'agfm-home',from:144,to:195},
  {id:'agfm-windows',from:195,to:248},
  {id:'agfm-win11',from:248,to:309},
  {id:'agfm-boot-method',from:309,to:381},
  {id:'windows-loading',from:381,to:419},
  {id:'windows-setup',from:419,to:486},
] as const;
