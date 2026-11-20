/** All controls are frame-deterministic and reflected in full and segment comps. */
export type LayerTransform = {x?:number;y?:number;width?:number;height?:number;scale?:number;rotation?:number;opacity?:number;startFrame?:number;endFrame?:number;delayFrames?:number;durationFrames?:number;color?:string;fontSize?:number};
export type SceneKey = 'scene01'|'scene02'|'scene03'|'scene04';
export type EditorState = Partial<Record<SceneKey,{speed?:number;layers?:Record<string,LayerTransform>}>>;
export type TextOverrides = Partial<{
 hook1:string;hook2:string;hookSmall:string;end1:string;end2:string;filmLabel:string;
 scene02Title1:string;scene02Title2:string;scene02Small:string;downloadLabel:string;
 clockTitle:string;clockSmall:string;timeTag:string;timerTitle:string;timerDescription:string;
 tutorialTitle:string;tutorialSmall:string;runLabel:string;command:string;
 scheduledTitle:string;scheduledSmall:string;note:string;
 caption01a:string;caption01b:string;caption02a:string;caption02b:string;
 caption03a:string;caption03b:string;caption04a:string;caption04b:string;caption04c:string;
 }>;
export type DesignOverrides = Partial<{background:string;ink:string;accent:string;muted:string;panel:string;subtitleText:string;subtitleBackground:string;fontFamily:string;subtitleFontSize:number;subtitleY:number;subtitleX:number;subtitleWidth:number}>;
export type VideoProps = {
 showHookText?:boolean;showEndText?:boolean;showScene02Text?:boolean;showSubtitle?:boolean;
 filmLabel?:string;downloadFileLabel?:string;downloadPercent?:number;
 command?:string;shutdownSeconds?:number;voiceEnabled?:boolean;voiceVolume?:number;
 sceneEditor?:EditorState;textOverrides?:TextOverrides;designOverrides?:DesignOverrides;
 };
export const defaultText:Required<TextOverrides>={
 hook1:'Pernah ketiduran',hook2:'pas nonton?',hookSmall:'Pernah ngalamin yang begini?',
 end1:'Film masih jalan.',end2:'Kamu sudah tidur.',filmLabel:'Sedang menonton film',
 scene02Title1:'Mau tidur, tapi...',scene02Title2:'download belum selesai?',scene02Small:'Sudah malam, belum selesai juga.',downloadLabel:'materi-video.mp4',
 clockTitle:'Dua masalah, satu kebutuhan',clockSmall:'Laptop tetap menyala saat kita lelah.',timeTag:'WAKTU TERUS BERJALAN',timerTitle:'JADWALKAN SHUTDOWN',timerDescription:'Bisa diatur dari Windows',
 tutorialTitle:'Satu perintah saja',tutorialSmall:'Gunakan Windows Run.',runLabel:'Run',command:'shutdown /s /t 3600',
 scheduledTitle:'Shutdown dijadwalkan',scheduledSmall:'60 menit dari sekarang',note:'Simulasi penjelas · simpan pekerjaanmu',
 caption01a:'Pernah ketiduran pas nonton,',caption01b:'sampai laptop masih nyala semalaman?',
 caption02a:'Atau malah sebaliknya, udah ngantuk,',caption02b:'tapi download belum selesai?',
 caption03a:'Daripada harus nungguin laptop terus,',caption03b:'kamu bisa atur kapan laptop mati sendiri.',
 caption04a:'Caranya, tekan Windows dan R.',caption04b:'Ketik perintah ini di Run, lalu Enter.',caption04c:'Angka 3600 berarti satu jam.'
};
export const defaultDesign:Required<DesignOverrides>={
 background:'#F8F4F1',ink:'#171F2B',accent:'#DF805F',muted:'#66717F',panel:'#FFFFFF',
 subtitleText:'#FFFFFF',subtitleBackground:'#253848',fontFamily:'Arial, sans-serif',subtitleFontSize:43,subtitleY:1475,subtitleX:80,subtitleWidth:920
};
export const getLayer=(state:EditorState|undefined,s:SceneKey,key:string):LayerTransform=>state?.[s]?.layers?.[key]??{};
export const clamp=(v:number,min=0,max=1)=>Math.max(min,Math.min(max,v));
export const smooth=(a:number,b:number,f:number)=>{const t=clamp((f-a)/(b-a||1));return t*t*(3-2*t)};
export const mergeText=(t?:TextOverrides)=>({...defaultText,...t});
export const mergeDesign=(d?:DesignOverrides)=>({...defaultDesign,...d});
