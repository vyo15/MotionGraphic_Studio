/** Scene 05 — preview-approved tutorial. Relative seconds, 30fps, 23.5s.
 * Change duration/position/paths here. All displayed text is additionally an
 * editable Interactive.Div literal in the JSX so Studio text editing works.
 */
export type Scene05Point={s:number;x:number;y:number};
export const SCENE05={
  durationInFrames:705,
  fps:30,
  ui:{x:90,y:630,width:900,height:820},
  heading:{x:64,y:340,width:952},
  subtitle:{x:115,y:1502,width:850,height:86},
  time:{
    installToTweaks:1.73,
    restoreSelect:3.70,
    restoreRun:5.56,
    restoreProgressStart:5.85,
    restoreProgressEnd:8.00,
    restoreStatusEnd:8.85,
    secondTweakSelect:10.13,
    appxOpen:13.72,
    xboxSelect:16.15,
    copilotSelect:18.15,
  },
  colors:{
    ui:'#FBFCFD',panel:'#FFFFFF',text:'#34414F',muted:'#778592',border:'#D9E1E8',
    select:'#EDF6FE',blue:'#398DD5',coral:'#D8876D',green:'#31A878',
  },
  // Base coordinates are in 1080x1920 composition space, independently editable.
  cursorKeyframes:[
    {s:0,x:398,y:762},{s:.9,x:394,y:764},{s:1.50,x:360,y:756},
    {s:1.72,x:358,y:758},{s:2.30,x:362,y:758},
    {s:3.13,x:176,y:1058},{s:3.73,x:170,y:1062},
    {s:4.80,x:542,y:1196},{s:5.45,x:802,y:1408},
    {s:5.67,x:804,y:1408},{s:6.70,x:804,y:1408},
    {s:8.45,x:564,y:1090},{s:9.70,x:168,y:1132},
    {s:10.20,x:166,y:1126},{s:11.8,x:394,y:1162},
    {s:12.70,x:722,y:980},{s:13.55,x:788,y:984},
    {s:14.15,x:778,y:978},{s:14.7,x:768,y:974},
    {s:15.95,x:170,y:1060},{s:16.20,x:168,y:1058},
    {s:17.5,x:174,y:1152},{s:18.2,x:170,y:1150},
    {s:19.70,x:400,y:1216},{s:21,x:738,y:1422},
    {s:23.5,x:782,y:1410},
  ] as Scene05Point[],
  clickTimes:[1.68,3.70,5.56,10.10,13.65,16.12,18.16],
  headings:[
    {start:0,title:'WINUTIL SIAP DIGUNAKAN'},
    {start:2,title:'BUAT RESTORE POINT DULU'},
    {start:8.9,title:'PILIH TWEAKS SEPERLUNYA'},
    {start:13.2,title:'BUKA APPX REMOVAL'},
    {start:15,title:'PILIH APLIKASI YANG TAK DIPAKAI'},
  ],
  subtitles:[
    {start:0,end:3.1,text:'Setelah terbuka, buat Restore Point dulu.'},
    {start:3.1,end:8.9,text:'Buat Restore Point dulu.'},
    {start:8.9,end:12.2,text:'Terus masuk ke Tweaks,'},
    {start:12.2,end:13.6,text:'pilih pengaturan yang dibutuhkan.'},
    {start:13.6,end:17.6,text:'Kalau mau hapus aplikasi bawaan,'},
    {start:17.6,end:20.3,text:'buka AppX Removal,'},
    {start:20.3,end:23.5,text:'lalu pilih aplikasi yang nggak dipakai.'},
  ],
} as const;
