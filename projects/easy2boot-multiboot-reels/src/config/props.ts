export interface LayerKeyframe {
  frame:number; x?:number; y?:number; scale?:number; rotation?:number; opacity?:number;
}
export interface LayerOverride {
  /** Timeline keyframes, editable with local visual editor */
  keyframes?:LayerKeyframe[];
  /** Text content of an individual SVG text node */
  text?:string;
  fontSize?:number; fontWeight?:number; fontFamily?:string; letterSpacing?:number;
  strokeWidth?:number;
  /** Local image file in public/images replacing selected SVG element */
  asset?:string;

  /** Translasi non-destruktif relatif ke posisi asli SVG */
  x?: number; y?: number; scale?: number; rotation?: number;
  opacity?: number; visible?: boolean; fill?: string; stroke?: string;
  width?: number; height?: number; zIndex?: number;
  startFrame?: number; endFrame?: number;
  animation?: 'fade'|'slide-up'|'pop'|'wipe';
  animationStartFrame?: number; delayFrames?: number; durationFrames?: number;
  easing?: 'linear'|'ease-in-out';
}
/** Layer selectors use SVG group IDs, see PANDUAN-EDIT-ASSET.md. */
export type LayerOverrides=Partial<Record<`S0${1|2|3|4|5|6}:${string}`,LayerOverride>>;
export interface Easy2BootScene03Props {
  title01Need: string;
  title01Target: string;
  title01Wrong: string;
  title01Redo: string;
  title01Wait: string;
  title02NoRedo: string;
  title02App: string;
  title02Usb: string;
  title02Installers: string;
  backgroundColor: string;
  fontFamily: string;
  showVoiceOver: boolean;
  voiceOverFileName: string;
  showMusic: boolean;
  musicFileName: string;
  layerOverrides: LayerOverrides;
  showSubtitles: boolean;
  subtitleColor: string;

  titleBackup: string;
  titleOpen: string;
  titleSelect: string;
  titleCreate: string;
  titleDone: string;
  usbDriveLabel: string;
  footerText: string;
  showSfx: boolean;
  titleIso: string;
  titleWin10: string;
  titleWin11: string;
  titleLinux: string;
  titleMore: string;
  isoWin10Name: string;
  isoWin11Name: string;
  isoLinuxName: string;
  titleBoot: string;
  titleSelectUsb: string;
  titleFindIso: string;
  titleSelectIso: string;
  titleSetup: string;
  bootOption: string;
  isoBootName: string;
  ctaSetup: string;
  ctaOld: string;
  ctaMulti: string;
  ctaComment: string;
  coverBrand: string;
  coverLine1: string;
  coverLine2: string;
}
export const DEFAULT_PROPS: Easy2BootScene03Props = {
  title01Need:'MAU INSTAL',
  title01Target:'WINDOWS 11?',
  title01Wrong:'WINDOWS 10.',
  title01Redo:'BUAT ULANG?',
  title01Wait:'NUNGGU LAGI.',
  title02NoRedo:'NGGAK PERLU.',
  title02App:'EASY 2BOOT.',
  title02Usb:'SATU FLASHDISK',
  title02Installers:'BEBERAPA',
  backgroundColor:'#F7F7F5',
  fontFamily:'Inter, Arial, sans-serif',
  showVoiceOver:false,
  voiceOverFileName:'',
  showMusic:false,
  musicFileName:'',
  layerOverrides:{},
  showSubtitles:false,
  subtitleColor:'#202020',

  titleBackup: 'BACKUP DATA.',
  titleOpen: 'EASY2BOOT.',
  titleSelect: 'PILIH USB.',
  titleCreate: 'BUAT USB.',
  titleDone: 'USB SIAP.',
  usbDriveLabel: 'E: USB Flash Drive  —  32 GB',
  footerText: 'EASY2BOOT — SATU USB, BANYAK PILIHAN',
  showSfx: true,
  titleIso: 'SALIN ISO.',
  titleWin10: 'WINDOWS 10',
  titleWin11: 'WINDOWS 11',
  titleLinux: 'LINUX',
  titleMore: 'CUKUP SALIN.',
  isoWin10Name: 'Win10_22H2.iso',
  isoWin11Name: 'Win11_24H2.iso',
  isoLinuxName: 'Ubuntu-24.04.iso',
  titleBoot:'BOOT DARI USB.',
  titleSelectUsb:'PILIH USB BOOT.',
  titleFindIso:'CARI FILE ISO.',
  titleSelectIso:'PILIH WINDOWS 11.',
  titleSetup:'INSTALLER TERBUKA.',
  bootOption:'UEFI: USB Flash Drive',
  isoBootName:'Win11_24H2.iso',
  ctaSetup:'KALAU KAMU, BIASANYA...',
  ctaOld:'BOOTABLE ULANG?',
  ctaMulti:'MULTIBOOT?',
  ctaComment:'KOMENTAR',
  coverBrand:'EASY2BOOT',
  coverLine1:'1 FLASHDISK',
  coverLine2:'BANYAK INSTALLER',
};
