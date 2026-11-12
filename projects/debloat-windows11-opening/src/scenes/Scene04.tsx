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
  const when=[1.45,4.23,5.20]; // Enter (10.12s) adalah tombol keyboard, bukan klik mouse.
  const click=when.reduce((v,w)=>Math.max(v,clamp01(1-Math.abs(s-w)/.2)),0);
  const visible=s>.58&&s<13.75;
  return <div style={{position:'absolute',left:pos.x,top:pos.y,width:70,height:70,opacity:visible?1:0,zIndex:10,pointerEvents:'none'}}>
    {click>0?<div style={{position:'absolute',left:-17,top:-17,width:36,height:36,border:'3px solid #D8876D',opacity:click,borderRadius:'50%',transform:`scale(${1.45-click*.4})`}}/>:null}
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
    <div style={{position:'absolute',left:SCENE04.position.heading.x,top:SCENE04.position.heading.y,width:SCENE04.position.heading.width,textAlign:'center',transform:`translateY(${dy}px)`}}>
      {phase===0?<Interactive.Div name="S04 — Judul BUKA POWERSHELL" style={{pointerEvents:'auto',fontSize:52,fontWeight:800,letterSpacing:'-.8px',color:'#23282F',translate:'0px 0px',scale:1,rotate:'0deg'}}>BUKA POWERSHELL</Interactive.Div>
      :phase===1?<Interactive.Div
        name="S04 — Judul JALANKAN SEBAGAI ADMIN"
        style={{
          pointerEvents: 'auto',
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: '-.6px',
          color: '#23282F',
          translate: '0px 0px',
          scale: 1,
          rotate: '0deg'
        }}
      >JALANKAN SEBAGAI ADMIN</Interactive.Div>
      :phase===2?<Interactive.Div
        name="S04 — Judul MASUKKAN PERINTAH"
        style={{pointerEvents:'auto',fontSize:52,fontWeight:800,letterSpacing:'-.8px',color:'#23282F',translate:'0px 0px',scale:1,rotate:'0deg'}}
        durationInFrames={379}
      >MASUKKAN PERINTAH</Interactive.Div>
      :<Interactive.Div name="S04 — Judul WINUTIL TERBUKA" style={{pointerEvents:'auto',fontSize:52,fontWeight:800,letterSpacing:'-.8px',color:'#23282F',translate:'0px 0px',scale:1,rotate:'0deg'}}>WINUTIL TERBUKA</Interactive.Div>}
      {phase===0?null
      :phase===1?null
      :phase===2?<Interactive.Div name="S04 — Helper Perintah Sumber Resmi" style={{pointerEvents:'auto',fontSize:25,color:'#7B8086',marginTop:14,translate:'0px 0px',scale:1,rotate:'0deg'}}>Gunakan perintah dari sumber resmi</Interactive.Div>
      :null}
    </div>
  </>;
};

const Scene04Subtitles:React.FC<{seconds:number}>=({seconds:s})=>{
  if(s>=10.3)return null; // Setelah VO selesai, tampilkan command/proses tanpa caption ganda.
  return <div style={{position:'absolute',left:SCENE04.position.subtitle.x,top:SCENE04.position.subtitle.y,
    width:SCENE04.position.subtitle.width,height:SCENE04.position.subtitle.height,
    display:'flex',alignItems:'center',justifyContent:'center',background:'transparent',zIndex:11,
    padding:'8px 16px',pointerEvents:'none'}}>
    {s<4.15?null
    :s<6.10?null
    :null}
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
    {intro>0?<Interactive.Div name="S04 — Transisi dari GitHub Stars" style={{pointerEvents:'auto',position:'absolute',left:248,top:973,padding:'30px 36px',background:'#FFFFFF',border:'1px solid #E6E4E0',borderRadius:23,color:'#DA9651',fontSize:35,fontWeight:750,boxShadow:DESIGN.shadow,opacity:intro,translate:'0px 0px',scale:1,rotate:'0deg'}}>★ 65K+ GITHUB STARS</Interactive.Div>:null}
    <Cursor seconds={seconds}/>
    {showSubtitles?<Scene04Subtitles seconds={seconds}/>:null}
  </AbsoluteFill>;
};
