import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {VideoProps} from '../config/props';
import {DESIGN} from '../config/design';
import cues from '../config/vo-subtitle-cues.json';

/** Editorial typography is shared across scenes; Windows UI has its own native Segoe UI. */
export const SceneBase:React.FC<{section?:string,children:React.ReactNode,backgroundColor?:string}>=({children,backgroundColor})=>
 <AbsoluteFill style={{backgroundColor:backgroundColor??DESIGN.bg,fontFamily:DESIGN.font}}>{children}</AbsoluteFill>;

const starts:Record<string,number>={S01:0,S02:855,S03:1335,S04:1635,S05:1905,S06:2295};
/**
 * VO reference text only: no card, background, border, padding, or shadow.
 * One unique Interactive callsite with a literal JSX child per editable cue.
 * Timing comes from vo-subtitle-cues.json; the JSX text must be kept in sync
 * with JSON/SRT after VO recording or source edits.
 * S03/S04 have their own native cue layers and are deliberately untouched.
 */
export const VoGuide:React.FC<{scene:string,props:VideoProps}>=({scene,props})=>{
 const f=useCurrentFrame(),g=(starts[scene]??0)+f;
 if(!props.showVoGuide||!props.showSubtitles)return null;
 const cueAt=(index:number)=>{
  const c=cues.cues[index];
  return c?.scene===scene && g>=c.startFrame && g<c.endFrame;
 };
 const cueOpacity=(index:number)=>{
  const c=cues.cues[index];
  if(!c)return 0;
  const edge=Math.min(g-c.startFrame,c.endFrame-g-1);
  return Math.min(1,Math.max(0,(edge+1)/6));
 };
 if(scene==='S01')return <>
  {cueAt(0) ? <Interactive.Div name="S01 VO — Cue 01" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(0)}}>Pernah nggak sih kepikiran,</Interactive.Div> : null}
  {cueAt(1) ? <Interactive.Div name="S01 VO — Cue 02" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(1)}}>gimana kalau setiap mulai kerja,</Interactive.Div> : null}
  {cueAt(2) ? <Interactive.Div name="S01 VO — Cue 03" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(2)}}>semua aplikasi langsung kebuka sendiri</Interactive.Div> : null}
  {cueAt(3) ? <Interactive.Div name="S01 VO — Cue 04" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(3)}}>tanpa harus buka satu-satu?</Interactive.Div> : null}
  {cueAt(4) ? <Interactive.Div name="S01 VO — Cue 05" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(4)}}>Kayaknya praktis banget, kan?</Interactive.Div> : null}
  {cueAt(5) ? <Interactive.Div name="S01 VO — Cue 06" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(5)}}>Tapi... emang bisa?</Interactive.Div> : null}
  {cueAt(6) ? <Interactive.Div name="S01 VO — Cue 07" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(6)}}>Jawabannya bisa!</Interactive.Div> : null}
 </>;
 if(scene==='S02')return <>
  {cueAt(7) ? <Interactive.Div name="S02 VO — Cue 01" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(7)}}>Pertama, siapkan shortcut</Interactive.Div> : null}
  {cueAt(8) ? <Interactive.Div name="S02 VO — Cue 02" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(8)}}>aplikasi atau file yang mau</Interactive.Div> : null}
  {cueAt(9) ? <Interactive.Div name="S02 VO — Cue 03" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(9)}}>dibuka otomatis.</Interactive.Div> : null}
  {cueAt(10) ? <Interactive.Div name="S02 VO — Cue 04" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(10)}}>Kalau belum ada, cari aplikasi</Interactive.Div> : null}
  {cueAt(11) ? <Interactive.Div name="S02 VO — Cue 05" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(11)}}>atau filenya di File Explorer,</Interactive.Div> : null}
  {cueAt(12) ? <Interactive.Div name="S02 VO — Cue 06" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(12)}}>klik kanan, pilih Send to,</Interactive.Div> : null}
  {cueAt(13) ? <Interactive.Div name="S02 VO — Cue 07" style={{position:'absolute',left:90,top:1377,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(13)}}>lalu Desktop.</Interactive.Div> : null}
 </>;
 if(scene==='S05')return <>
  {cueAt(20) ? <Interactive.Div name="S05 VO — Cue 01" style={{position:'absolute',left:90,top:1590,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(20)}}>Selesai! Sekarang, setiap kali login Windows,</Interactive.Div> : null}
  {cueAt(21) ? <Interactive.Div name="S05 VO — Cue 02" style={{position:'absolute',left:90,top:1590,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(21)}}>aplikasi atau file tadi bakal kebuka sendiri.</Interactive.Div> : null}
  {cueAt(22) ? <Interactive.Div name="S05 VO — Cue 03" style={{position:'absolute',left:90,top:1590,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(22)}}>Nah, kalau kamu, aplikasi apa</Interactive.Div> : null}
  {cueAt(23) ? <Interactive.Div name="S05 VO — Cue 04" style={{position:'absolute',left:90,top:1590,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(23)}}>yang paling sering dibuka pas mulai kerja?</Interactive.Div> : null}
  {cueAt(24) ? <Interactive.Div name="S05 VO — Cue 05" style={{position:'absolute',left:90,top:1590,width:900,zIndex:80,color:'#343434',fontFamily:DESIGN.font,fontSize:39,fontWeight:590,lineHeight:1.25,textAlign:'center',opacity:cueOpacity(24)}}>Coba tulis di komentar!</Interactive.Div> : null}
 </>;
 return null;
};
