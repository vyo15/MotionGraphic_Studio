/** Single configuration source for the reusable Ctrl+Shift+T composition.
 * Modify text, palette, position and timing without touching animation code.
 */
export const VIDEO = {
  width: 1080, height: 1920, fps: 30, durationSeconds: 9,
  colors: {cyan:'#6DE9DF', green:'#86F9C6', yellow:'#FDE68A'},
  layers: {
    heading: {x:84,y:333},
    browser: {x:72,y:598,width:936,height:670},
    keyboard: {x:85,y:1354},
    subtitle: {x:87,y:525},
    result: {x:70,y:1534},
  },
  timing: {tabClose:1.92, showError:2.05, showKeyboard:3.45, pressStart:4.72, restoreTab:6.15, success:6.25},
  title: {
    before:['TAB PENTING','KE-TUTUP?'],
    action:['PAKAI','SHORTCUT INI!'],
    after:['TAB-NYA','BALIK LAGI!'],
  },
  message: {
    before:'Jangan panik, nggak perlu cari ulang.',
    action:'Cukup tekan tiga tombol keyboard.',
    after:'Lanjut kerja tanpa cari riwayat browser.',
  },
};
export type VideoConfig = typeof VIDEO;
