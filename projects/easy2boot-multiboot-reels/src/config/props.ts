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
  /** 03/04 visual cleanup + editable layer text controls, Review 2026-11-20. */
  scene03CleanLayout:boolean;
  scene03ShowTextVO:boolean;
  scene04ShowTextVO:boolean;
  scene04CleanLayout:boolean;
  scene04IsoFiles:string[];
  scene04InstallerLabels:string[];
  scene04FolderPaths:string[];
  scene04SubtitleLines:string[];
  scene03SubtitleLines:string[];
  scene04SuccessLabel:string;
  scene04UsbLabel:string;
  scene04HeroTitle:string;
  scene04HeroSupport:string;

  /** Only the S03 entrance is retimed; original Scene03 SVG layers remain intact. */
  scene03EntryFadeFrames:number;
  scene03ReadableIntroFrames:number;
  scene03IntroHoldFrames:number;
  scene03IntroStartSourceFrame:number;
  scene03IntroEndSourceFrame:number;
  /** S02→S03 approved bridge timing / layout, separate from locked Scene02 */
  bridgeQuestionText:string;
  bridgeUsbLabel:string;
  bridgeMoveStartFrame:number;
  bridgeMoveEndFrame:number;
  bridgeUsbRiseLogicalPx:number;
  bridgeQuestionStartFrame:number;
  bridgeQuestionEndFrame:number;
  scene02BreakStartFrame:number;
  scene02BreakDurationFrames:number;
  scene02BreakSpread:number;
  scene02BreakRotation:number;
  scene02BreakColor:string;
  scene02ShowBreak:boolean;
  scene02ReactionLine1:string;
  scene02ReactionLine2:string;
  scene02SolutionLine1:string;
  scene02SolutionLine2:string;
  scene02ManyLine1:string;
  scene02ManyLine2:string;
  scene01MismatchTitle:string;
  scene01MismatchValue:string;
  scene01FinalLine1:string;
  scene01FinalLine2:string;
  scene01StampFrame:number;
  scene01StampScale:number;
  scene01ShakePower:number;
  scene01StampColor:string;
  scene01ShowStamp:boolean;
  scene01ShowCaptions:boolean;
  scene01CaptionLines:string[];

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
  scene03CleanLayout:true,
  scene03ShowTextVO:true,
  scene04ShowTextVO:true,
  scene04CleanLayout:true,
  scene04IsoFiles:['Win8_64.iso','Win10_22H2.iso','Win11_24H2.iso','Ubuntu_24.04.iso'],
  scene04InstallerLabels:['WINDOWS 8','WINDOWS 10','WINDOWS 11','LINUX'],
  scene04FolderPaths:['WINDOWS / WIN8','WINDOWS / WIN10','WINDOWS / WIN11','LINUX'],
  scene04SubtitleLines:['Salin file ISO installer','ke folder masing-masing.','Sesuai sistem operasinya.'],
  scene03SubtitleLines:['Pertama, backup data flashdisk.','Buka Easy2Boot.','Pilih USB yang benar,','lalu buat USB multiboot.'],
  scene04SuccessLabel:'4 ISO TERSIMPAN',
  scene04UsbLabel:'USB',
  scene04HeroTitle:'4 INSTALLER',
  scene04HeroSupport:'SATU FLASHDISK',

  scene03EntryFadeFrames:32,
  scene03ReadableIntroFrames:70,
  scene03IntroHoldFrames:25,
  scene03IntroStartSourceFrame:25,
  scene03IntroEndSourceFrame:75,
  bridgeQuestionText:'GIMANA CARA BIKINNYA?',
  bridgeUsbLabel:'USB',
  bridgeMoveStartFrame:26,
  bridgeMoveEndFrame:55,
  bridgeUsbRiseLogicalPx:137,
  bridgeQuestionStartFrame:51,
  bridgeQuestionEndFrame:68,
  scene02BreakStartFrame:5,
  scene02BreakDurationFrames:23,
  scene02BreakSpread:1,
  scene02BreakRotation:1,
  scene02BreakColor:'#DA7A5C',
  scene02ShowBreak:true,
  scene02ReactionLine1:'AH, RIBET',
  scene02ReactionLine2:'BANGET.',
  scene02SolutionLine1:'MENDING PAKAI',
  scene02SolutionLine2:'EASY2BOOT.',
  scene02ManyLine1:'SATU FLASHDISK',
  scene02ManyLine2:'BANYAK INSTALLER',
  scene01MismatchTitle:'TAPI USB-NYA',
  scene01MismatchValue:'MASIH WIN 10',
  scene01FinalLine1:'MASA HARUS',
  scene01FinalLine2:'BIKIN ULANG LAGI?',
  scene01StampFrame:332,
  scene01StampScale:1,
  scene01ShakePower:1,
  scene01StampColor:'#DA7A5C',
  scene01ShowStamp:true,
  scene01ShowCaptions:true,
  scene01CaptionLines:['Mau instal Windows 11,','tapi flashdisk bootable-nya|masih Windows 10?','Masa harus bikin bootable|ulang lagi?'],

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
