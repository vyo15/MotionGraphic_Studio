import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame,useVideoConfig,spring,interpolate} from 'remotion';
import {Background} from '../components/Background';
import {Scene05WinUtil} from '../components/Scene05WinUtil';
import {Scene05Cursor} from '../components/Scene05Cursor';
import {SCENE05} from '../config/scene05';
import {DESIGN} from '../config/design';
import {s05ramp} from '../animations/scene05';

const ED={translate:'0px 0px',scale:1,rotate:'0deg'} as const;

const Titles:React.FC<{s:number;frame:number;fps:number}>=({s,frame,fps})=>{
  const ph=s<2?0:s<8.9?1:s<13.2?2:s<15?3:4;
  const phaseStart=[0,2,8.9,13.2,15][ph];
  const sp=spring({fps,frame:Math.max(0,frame-Math.round(phaseStart*fps)),config:{damping:25,stiffness:125}});
  const dy=interpolate(sp,[0,1],[22,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <>
    <Interactive.Div name="S05 — Label SCENE 05 WINUTIL" style={{position:'absolute',left:80,top:245,padding:'14px 24px',fontSize:22,fontWeight:650,letterSpacing:'.4px',color:'#6B6D6D',background:'#F0EEEB',borderRadius:20,translate:'0px 0px',scale:1,rotate:'0deg'}}>SCENE 05  /  WINUTIL</Interactive.Div>
    <div style={{position:'absolute',left:SCENE05.heading.x,top:SCENE05.heading.y,width:SCENE05.heading.width,textAlign:'center',transform:`translateY(${dy}px)`}}>
      {ph===0?<Interactive.Div name="S05 — Judul WINUTIL SIAP DIGUNAKAN" style={{fontSize:51,fontWeight:790,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>WINUTIL SIAP DIGUNAKAN</Interactive.Div>
      :ph===1?<Interactive.Div name="S05 — Judul BUAT RESTORE POINT DULU" style={{fontSize:49,fontWeight:790,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>BUAT RESTORE POINT DULU</Interactive.Div>
      :ph===2?<Interactive.Div name="S05 — Judul PILIH TWEAKS SEPERLUNYA" style={{fontSize:48,fontWeight:790,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>PILIH TWEAKS SEPERLUNYA</Interactive.Div>
      :ph===3?<Interactive.Div name="S05 — Judul BUKA APPX REMOVAL" style={{fontSize:52,fontWeight:790,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>BUKA APPX REMOVAL</Interactive.Div>
      :<Interactive.Div name="S05 — Judul PILIH APLIKASI" style={{fontSize:45,fontWeight:790,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>PILIH APLIKASI YANG TAK DIPAKAI</Interactive.Div>}
      {ph===0?<Interactive.Div name="S05 — Helper Siap" style={{fontSize:25,color:'#81868A',marginTop:15,translate:'0px 0px',scale:1,rotate:'0deg'}}>Mulai dari langkah yang aman</Interactive.Div>
      :ph===1?<Interactive.Div name="S05 — Helper Restore" style={{fontSize:25,color:'#81868A',marginTop:15,translate:'0px 0px',scale:1,rotate:'0deg'}}>Cadangkan kondisi sistem sebelum perubahan</Interactive.Div>
      :ph===2?<Interactive.Div name="S05 — Helper Tweaks" style={{fontSize:25,color:'#81868A',marginTop:15,translate:'0px 0px',scale:1,rotate:'0deg'}}>Jangan pilih semua pengaturan sekaligus</Interactive.Div>
      :ph===3?<Interactive.Div name="S05 — Helper AppX" style={{fontSize:25,color:'#81868A',marginTop:15,translate:'0px 0px',scale:1,rotate:'0deg'}}>Temukan aplikasi bawaan Windows</Interactive.Div>
      :<Interactive.Div name="S05 — Helper Pilih" style={{fontSize:25,color:'#81868A',marginTop:15,translate:'0px 0px',scale:1,rotate:'0deg'}}>Contoh seleksi, belum melakukan penghapusan</Interactive.Div>}
    </div>
  </>;
};

const Subtitles:React.FC<{s:number}>=({s})=>{
  const i=s<3.1?0:s<8.9?1:s<12.2?2:s<13.6?3:s<17.6?4:s<20.3?5:6;
  return <div style={{position:'absolute',left:SCENE05.subtitle.x,top:SCENE05.subtitle.y,width:SCENE05.subtitle.width,height:SCENE05.subtitle.height,display:'grid',placeItems:'center',background:'rgba(255,255,255,.95)',border:'1px solid #EFECEA',borderRadius:20,boxShadow:'0 7px 27px rgba(30,30,30,.06)',zIndex:12,padding:'10px 22px',boxSizing:'border-box'}}>
    {i===0?<Interactive.Div name="S05 — Subtitle Setelah terbuka" style={{fontSize:29,fontWeight:560,color:'#454B52',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Setelah terbuka, buat Restore Point dulu.</Interactive.Div>
    :i===1?<Interactive.Div name="S05 — Subtitle Restore Point" style={{fontSize:29,fontWeight:560,color:'#454B52',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Buat Restore Point dulu.</Interactive.Div>
    :i===2?<Interactive.Div name="S05 — Subtitle Tweaks" style={{fontSize:29,fontWeight:560,color:'#454B52',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Terus masuk ke Tweaks,</Interactive.Div>
    :i===3?<Interactive.Div name="S05 — Subtitle Pengaturan" style={{fontSize:28,fontWeight:560,color:'#454B52',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>pilih pengaturan yang dibutuhkan.</Interactive.Div>
    :i===4?<Interactive.Div name="S05 — Subtitle Aplikasi Bawaan" style={{fontSize:28,fontWeight:560,color:'#454B52',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Kalau mau hapus aplikasi bawaan,</Interactive.Div>
    :i===5?<Interactive.Div name="S05 — Subtitle AppX" style={{fontSize:29,fontWeight:560,color:'#454B52',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>buka AppX Removal,</Interactive.Div>
    :<Interactive.Div name="S05 — Subtitle Pilih Aplikasi" style={{fontSize:28,fontWeight:560,color:'#454B52',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>lalu pilih aplikasi yang nggak dipakai.</Interactive.Div>}
  </div>;
};

/** Deterministic 23.5-sec video illustration. Never operates on Windows apps. */
export const Scene05:React.FC<{showSubtitles:boolean;showGrid:boolean}>=({showSubtitles,showGrid})=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  return <AbsoluteFill style={{fontFamily:DESIGN.font,color:DESIGN.ink,overflow:'hidden'}}>
    <Background showGrid={showGrid}/>
    <Titles s={s} frame={frame} fps={fps}/>
    <Scene05WinUtil seconds={s}/>
    <Scene05Cursor seconds={s}/>
    {showSubtitles?<Subtitles s={s}/>:null}
  </AbsoluteFill>;
};
