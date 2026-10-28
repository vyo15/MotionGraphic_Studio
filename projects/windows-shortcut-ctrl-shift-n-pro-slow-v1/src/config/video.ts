/** Single source of truth for preview, Remotion render and voiceover cue timing. */
export const CFG = {
  fps: 30,
  durationInFrames: 450,
  /** Timeline video 15 detik. Interval yang statis dipersingkat,
   * sementara gerakan klik, zoom, rename, dan hasil tetap punya easing lembut.
   * Gunakan sumber waktu ini untuk preview DAN render.
   */
  playbackSpeed: 1,
  colors: { bg:'#071321', cyan:'#67E8F9', mint:'#9FF6C7', amber:'#FFCF83', panel:'#102437'},
  text: {
    kicker:'WINDOWS HACKS', episode:'05 / 05',
    problemA:'BIKIN FOLDER', problemB:'MASIH KLIK KANAN?', problemSub:'Padahal ada cara yang jauh lebih cepat.',
    shortcutA:'COBA TEKAN',shortcutB:'CTRL + SHIFT + N',shortcutSub:'Langsung dari dalam File Explorer.',
    folderA:'FOLDER BARU',folderB:'LANGSUNG JADI!',folderSub:'Tinggal ketik nama foldernya.',
    bonusA:'BONUS DI BROWSER',bonusB:'MODE PRIVAT!',bonusSub:'Edge: InPrivate · Chrome: Incognito',
    finishA:'1 SHORTCUT', finishB:'2 FUNGSI!', finishSub:'File Explorer + Edge / Chrome',
    originalFolder:'Project Kerja',newFolder:'Konten Baru',
    fileRows:['Thumbnail','Video Reels','Naskah.docx','Referensi.png'],
  },
  timings: {
    contextOpen:1.20,contextClose:3.28,
    keyIn:3.30,keyPress:5.06,keyOut:6.42,
    folderCreated:6.56,renameStart:7.77,renameEnd:9.72,renameConfirm:9.99,
    browserIn:11.55,browserKeyIn:12.38,browserKeyPress:13.27,privateOpen:14.12,
    recap:16.14,
  },
  layout:{monitorX:61,monitorY:681,monitorW:958,monitorH:654,kickerX:73,kickerY:266,
    titleX:67,titleY:330,subX:75,subY:550,keyX:101,keyY:1400},
  sound:{enabled:true,volume:0.42},
} as const;

/** Mengonversi detik output menjadi waktu animasi asli.
 * Terdiri dari beberapa aksi + jeda. Titik batas berada di perpindahan scene,
 * sehingga efek tetap halus dan tidak terputus meskipun durasinya dipadatkan.
 */
export const timelineTime = (seconds: number): number => {
  const shownAt = [0, 2.5, 5.0, 9.6, 13.0, 15.0];
  const sourceAt = [0, 3.30, 6.55, 11.55, 16.20, 18.0];
  for (let index=0; index<shownAt.length-1; index++) {
    if (seconds <= shownAt[index+1]) {
      const fraction = Math.max(0, (seconds-shownAt[index])/(shownAt[index+1]-shownAt[index]));
      return sourceAt[index] + fraction*(sourceAt[index+1]-sourceAt[index]);
    }
  }
  return 18;
};
