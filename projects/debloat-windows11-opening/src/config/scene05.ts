/** Scene 05 — 21 detik @30fps, revisi VO dan kursor smooth v5.
 * Semua satuan posisi adalah piksel composition 1080 × 1920.
 * Titik kursor menggunakan koordinat global scene, bukan koordinat window.
 * Sesuaikan titik klik dan onset UI bersamaan jika mengubah timeline.
 */
export type Scene05Point={s:number;x:number;y:number};
export const SCENE05={
  durationInFrames:630,
  fps:30,
  ui:{x:90,y:630,width:900,height:820},
  heading:{x:64,y:340,width:952},
  subtitle:{x:115,y:1502,width:850,height:100},
  time:{
    installToTweaks:1.38,
    restoreSelect:3.74,
    restoreRun:5.28,
    restoreProgressStart:5.45,
    restoreProgressEnd:7.60,
    restoreStatusEnd:8.05,
    appxOpen:9.20,
    xboxSelect:11.50,
    copilotSelect:12.68,
    removeClick:15.60,
    removeProgressStart:15.75,
    removeProgressEnd:20.40,
    removeSuccess:20.40,
  },
  colors:{
    ui:'#FBFCFD',panel:'#FFFFFF',text:'#34414F',muted:'#778592',border:'#D9E1E8',
    select:'#EDF6FE',blue:'#398DD5',coral:'#D8876D',green:'#31A878',
  },
  // Path v5 (720×1280) dikonversi ×1.5 ke komposisi 1080×1920.
  // Tiap berhenti ditetapkan terpisah dari segmen bergerak agar klik tidak drift.
  cursorKeyframes:[
    {s:0.00,x:786,y:1152},{s:.25,x:786,y:1152},
    {s:1.12,x:362,y:753},{s:2.74,x:362,y:753},
    {s:3.58,x:167,y:1062},{s:4.35,x:167,y:1062},
    {s:5.14,x:792,y:1381},{s:7.95,x:792,y:1381},
    {s:8.96,x:801,y:987},{s:10.50,x:801,y:987},
    {s:11.33,x:176,y:1038},{s:12.04,x:176,y:1038},
    {s:12.50,x:176,y:1117},{s:14.20,x:176,y:1117},
    {s:15.38,x:825,y:1381},{s:21,x:825,y:1381},
  ] as Scene05Point[],
  clickTimes:[1.27,3.73,5.28,9.11,11.47,12.65,15.60],
  headingBeats:[
    {start:0,end:3,title:'BUKA TAB TWEAKS',helper:'Masuk ke pengaturan WinUtil'},
    {start:3,end:8.05,title:'BUAT RESTORE POINT',helper:'Simpan titik pemulihan terlebih dahulu'},
    {start:8.05,end:10.65,title:'APPX REMOVAL',helper:'Buka daftar aplikasi bawaan'},
    {start:10.65,end:15.4,title:'PILIH APLIKASI',helper:'Xbox App dan Microsoft Copilot'},
    {start:15.4,end:21,title:'REMOVE SELECTED',helper:'Hapus hanya pilihan yang sudah diperiksa'},
  ],
  subtitles:[
    {start:0,end:3,text:'Begitu WinUtil terbuka, masuk ke tab Tweaks.'},
    {start:3,end:8.05,text:'Centang Create Restore Point, lalu klik Run Tweaks.'},
    {start:8.05,end:10.65,text:'Setelah itu, buka AppX Removal.'},
    {start:10.65,end:12.65,text:'Pilih aplikasi yang nggak kepakai,'},
    {start:12.65,end:15.4,text:'misalnya Xbox atau Copilot.'},
    {start:15.4,end:21,text:'Kalau udah yakin, klik Remove Selected.'},
  ],
} as const;
