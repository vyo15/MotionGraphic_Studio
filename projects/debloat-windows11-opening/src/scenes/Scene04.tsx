import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {Background} from '../components/Background';
import {Scene04Desktop} from '../components/Scene04Windows';
import {Scene04Terminal} from '../components/Scene04Terminal';
import {Scene04WinUtil} from '../components/Scene04WinUtil';
import {SCENE04} from '../config/scene04';
import {animatedCursor, clamp01, ramp} from '../animations/scene04';
import {DESIGN} from '../config/design';

const editable={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const eStyle=(s:React.CSSProperties):React.CSSProperties=>({...s,...editable});

const Cursor:React.FC<{seconds:number}>=({seconds:s})=>{
  const pos=animatedCursor(s,SCENE04.cursorKeyframes);
  const when=[1.45,4.23,5.20,10.12];
  const click=when.reduce((v,w)=>Math.max(v,clamp01(1-Math.abs(s-w)/.2)),0);
  const visible=s>.58&&s<13.75;
  return <div style={{position:'absolute',left:pos.x,top:pos.y,width:70,height:70,opacity:visible?1:0,zIndex:10,pointerEvents:'none'}}>
    {click>0?<div style={{position:'absolute',left:-17,top:-17,width:36,height:36,border:'3px solid #D8876D',opacity:click,borderRadius:'50%',transform:`scale(${1.45-click*.4})`}}/>:null}
    <Interactive.Div name="S04 — Kursor Windows (X/Y editable)" style={{width:42,height:53,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <svg width="42" height="53" viewBox="0 0 42 53"><path d="M3 3v40l11-11 10 17 8-5-10-18 15-2Z" fill="#FDFDFE" stroke="#1B2636" strokeWidth="2.5" strokeLinejoin="round"/></svg>
    </Interactive.Div>
  </div>;
};

const Scene04Titles:React.FC<{seconds:number;fps:number;frame:number}>=({seconds:s,fps,frame})=>{
  const t=SCENE04.timing;
  const phase=s>=t.winutilReveal?3:s>=t.terminalOpen?2:s>=t.adminHighlight?1:0;
  const started=[0,t.adminHighlight,t.terminalOpen,t.winutilReveal][phase];
  const titleStartFrames=Math.round(started*fps);
  const eased=spring({frame:Math.max(0,frame-titleStartFrames),fps,config:{damping:25,stiffness:120,mass:1}});
  const dy=interpolate(eased,[0,1],[22,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <>
    <Interactive.Div name="S04 — Label Tutorial" style={{position:'absolute',left:80,top:245,padding:'14px 24px',fontSize:22,fontWeight:650,letterSpacing:'.4px',color:'#6B6D6D',background:'#F0EEEB',borderRadius:20,translate:'0px 0px',scale:1,rotate:'0deg'}}>SCENE 04  /  TUTORIAL</Interactive.Div>
    <div style={{position:'absolute',left:SCENE04.position.heading.x,top:SCENE04.position.heading.y,width:SCENE04.position.heading.width,textAlign:'center',transform:`translateY(${dy}px)`}}>
      {phase===0?<Interactive.Div name="S04 — Judul BUKA POWERSHELL" style={{fontSize:52,fontWeight:800,letterSpacing:'-.8px',color:'#23282F',translate:'0px 0px',scale:1,rotate:'0deg'}}>BUKA POWERSHELL</Interactive.Div>
      :phase===1?<Interactive.Div name="S04 — Judul JALANKAN SEBAGAI ADMIN" style={{fontSize:43,fontWeight:800,letterSpacing:'-.6px',color:'#23282F',translate:'0px 0px',scale:1,rotate:'0deg'}}>JALANKAN SEBAGAI ADMIN</Interactive.Div>
      :phase===2?<Interactive.Div name="S04 — Judul MASUKKAN PERINTAH" style={{fontSize:52,fontWeight:800,letterSpacing:'-.8px',color:'#23282F',translate:'0px 0px',scale:1,rotate:'0deg'}}>MASUKKAN PERINTAH</Interactive.Div>
      :<Interactive.Div name="S04 — Judul WINUTIL TERBUKA" style={{fontSize:52,fontWeight:800,letterSpacing:'-.8px',color:'#23282F',translate:'0px 0px',scale:1,rotate:'0deg'}}>WINUTIL TERBUKA</Interactive.Div>}
      {phase===0?<Interactive.Div name="S04 — Helper Cari dari Search" style={{fontSize:25,color:'#7B8086',marginTop:14,translate:'0px 0px',scale:1,rotate:'0deg'}}>Cari aplikasi dari Windows Search</Interactive.Div>
      :phase===1?<Interactive.Div name="S04 — Helper Klik Run as administrator" style={{fontSize:25,color:'#7B8086',marginTop:14,translate:'0px 0px',scale:1,rotate:'0deg'}}>Klik Run as administrator</Interactive.Div>
      :phase===2?<Interactive.Div name="S04 — Helper Perintah Sumber Resmi" style={{fontSize:25,color:'#7B8086',marginTop:14,translate:'0px 0px',scale:1,rotate:'0deg'}}>Gunakan perintah dari sumber resmi</Interactive.Div>
      :<Interactive.Div name="S04 — Helper Restore Point Berikutnya" style={{fontSize:25,color:'#7B8086',marginTop:14,translate:'0px 0px',scale:1,rotate:'0deg'}}>Siap lanjut ke Restore Point</Interactive.Div>}
    </div>
  </>;
};

const Scene04Subtitles:React.FC<{seconds:number}>=({seconds:s})=>{
  const i=s<1.9?0:s<4.15?1:s<6.1?2:3;
  return <div style={{position:'absolute',left:SCENE04.position.subtitle.x,top:SCENE04.position.subtitle.y,width:SCENE04.position.subtitle.width,height:SCENE04.position.subtitle.height,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.94)',boxShadow:'0 8px 25px rgba(30,30,30,.065)',border:'1px solid #EFECEA',borderRadius:22,zIndex:11,padding:'8px 16px'}}>
    {i===0?<Interactive.Div name="S04 — Subtitle 1" style={{fontSize:30,color:'#44474B',fontWeight:540,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Buat mencobanya,</Interactive.Div>
    :i===1?<Interactive.Div name="S04 — Subtitle 2" style={{fontSize:30,color:'#44474B',fontWeight:540,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>buka PowerShell</Interactive.Div>
    :i===2?<Interactive.Div name="S04 — Subtitle 3" style={{fontSize:30,color:'#44474B',fontWeight:540,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>sebagai Administrator,</Interactive.Div>
    :<Interactive.Div name="S04 — Subtitle 4" style={{fontSize:30,color:'#44474B',fontWeight:540,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>lalu masukkan perintah ini.</Interactive.Div>}
  </div>;
};

/** Scene 04: tutorial PowerShell. All elements can be manipulated separately. */
export const Scene04:React.FC<{showSubtitles:boolean;showGrid:boolean}>=({showSubtitles,showGrid})=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const seconds=frame/fps;
  const intro=1-ramp(seconds,.04,.58);
  return <AbsoluteFill style={{fontFamily:DESIGN.font,overflow:'hidden',color:DESIGN.ink}}>
    <Background showGrid={showGrid}/>
    <Scene04Titles seconds={seconds} fps={fps} frame={frame}/>
    <Scene04Desktop seconds={seconds}/>
    <Scene04Terminal seconds={seconds}/>
    <Scene04WinUtil seconds={seconds}/>
    {intro>0?<Interactive.Div name="S04 — Transisi dari GitHub Stars" style={{position:'absolute',left:248,top:973,padding:'30px 36px',background:'#FFFFFF',border:'1px solid #E6E4E0',borderRadius:23,color:'#DA9651',fontSize:35,fontWeight:750,boxShadow:DESIGN.shadow,opacity:intro,translate:'0px 0px',scale:1,rotate:'0deg'}}>★ 65K+ GITHUB STARS</Interactive.Div>:null}
    <Cursor seconds={seconds}/>
    {showSubtitles?<Scene04Subtitles seconds={seconds}/>:null}
  </AbsoluteFill>;
};
