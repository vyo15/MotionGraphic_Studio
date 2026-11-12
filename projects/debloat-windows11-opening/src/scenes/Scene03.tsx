import React from 'react';
import {AbsoluteFill, Freeze, Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Scene03Trash, TrashFlyingApp} from '../components/Scene03Trash';
import {Scene03Github} from '../components/Scene03Github';
import {Scene02} from './Scene02';
import {SCENE03} from '../config/scene03';
import {DESIGN} from '../config/design';
import {fadeOut, rise} from '../animations/presets';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
/** Preview / render share the same frame-driven motion graph; nothing is flattened. */
export const Scene03:React.FC<{showSubtitles:boolean;showGrid:boolean}>=({showSubtitles,showGrid})=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const t=SCENE03.timing;
  const toGithub=rise(s,t.githubStart,t.githubTransitionEnd);
  const introOpacity=clamp(1-toGithub);
  const githubOpacity=clamp(toGithub);
  const titleApp=fadeOut(s,t.introTitleChange-.14,t.introTitleChange+.18);
  const titleWin=rise(s,t.introTitleChange-.08,t.introTitleChange+.4);
  const author=rise(s,t.authorReveal,t.authorReveal+.43);
  const demoNotice=rise(s,1.2,1.65);
  return <AbsoluteFill style={{fontFamily:DESIGN.font,color:DESIGN.ink,overflow:'hidden'}}>
    <Background showGrid={showGrid}/>
    <Interactive.Div name="S03 — Label SCENE 03 WINUTIL" style={{pointerEvents:'auto',position:'absolute',left:76,top:245,padding:'13px 24px',fontSize:23,fontWeight:630,color:'#686A70',background:'#F0EEEB',borderRadius:22,
      translate:'0px 0px',scale:1,rotate:'0deg'}}>SCENE 03 / WINUTIL</Interactive.Div>
    <div style={{position:'absolute',inset:0,opacity:introOpacity,transform:`translateY(${-toGithub*22}px)`}}>
      <Interactive.Div name="S03 — Bingkai Aplikasi Putih" style={{pointerEvents:'auto',position:'absolute',left:80,top:514,width:920,height:932,background:'#FFFFFF',border:'2px solid #E7E6E4',
        boxShadow:DESIGN.shadow,borderRadius:44,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
      <Interactive.Div name="S03 — Windows 11 Toolbar" style={{pointerEvents:'auto',position:'absolute',left:120,top:548,width:840,height:110,borderRadius:26,background:'#F4F4F3',
        translate:'0px 0px',scale:1,rotate:'0deg'}}/>
      <Interactive.Div name="S03 — Teks Windows 11" style={{pointerEvents:'auto',position:'absolute',left:155,top:582,fontSize:34,fontWeight:680,color:'#242A34',translate:'0px 0px',scale:1,rotate:'0deg'}}>Windows 11</Interactive.Div>
      <Interactive.Div name="S03 — Titik Coral Windows" style={{pointerEvents:'auto',position:'absolute',left:899,top:599,width:21,height:21,borderRadius:'50%',background:DESIGN.coral,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
      <div style={{position:'absolute',top:343,left:0,width:1080,textAlign:'center',opacity:titleApp}}>
        <Interactive.Div
          name="S03 — Judul APLIKASI BAWAAN"
          style={{pointerEvents:'auto',fontSize:57,fontWeight:800,color:'#242A34',translate:'0px 0px',scale:1,rotate:'0deg'}}
        ></Interactive.Div>
      </div>
      <div style={{position:'absolute',top:343,left:0,width:1080,textAlign:'center',opacity:titleWin}}>
        <Interactive.Div name="S03 — Judul WINUTIL DEBLOAT" style={{pointerEvents:'auto',fontSize:57,fontWeight:800,color:'#242A34',translate:'0px 0px',scale:1,rotate:'0deg'}}>WINUTIL · DEBLOAT</Interactive.Div>
      </div>
      <div style={{position:'absolute',top:429,left:0,width:1080,textAlign:'center',opacity:fadeOut(s,t.introTitleChange-.25,t.introTitleChange+.2)}}>
      </div>
      <div style={{position:'absolute',top:429,left:0,width:1080,textAlign:'center',opacity:author}}>
        <Interactive.Div name="S03 — Pembuat Chris Titus Tech" style={{pointerEvents:'auto',fontSize:31,color:'#717780',fontWeight:600,translate:'0px 0px',scale:1,rotate:'0deg'}}>Chris Titus Tech</Interactive.Div>
      </div>
      {/* Flying cards are each separate editable icons, connected by their own motion path. */}
      <TrashFlyingApp which="Xbox" seconds={s}/>
      <TrashFlyingApp which="Bing Search" seconds={s}/>
      <TrashFlyingApp which="Copilot" seconds={s}/>
      <Scene03Trash seconds={s}/>
      <div style={{position:'absolute',top:1473,left:0,width:1080,textAlign:'center',opacity:demoNotice}}>
      </div>
    </div>
    <div style={{position:'absolute',inset:0,opacity:githubOpacity,transform:`translateY(${(1-toGithub)*32}px)`}}>
      <div style={{position:'absolute',top:341,left:0,width:1080,textAlign:'center'}}>
        <Interactive.Div name="S03 — Judul BUATAN CHRIS TITUS TECH" style={{pointerEvents:'auto',fontSize:48,fontWeight:780,color:'#242A34',translate:'0px 0px',scale:1,rotate:'0deg'}}>BUATAN CHRIS TITUS TECH</Interactive.Div>
      </div>
      <div style={{position:'absolute',top:424,left:0,width:1080,textAlign:'center'}}>
        <Interactive.Div name="S03 — Label Open-source di GitHub" style={{pointerEvents:'auto',fontSize:27,color:'#717780',translate:'0px 0px',scale:1,rotate:'0deg'}}>Open-source di GitHub</Interactive.Div>
      </div>
      <Scene03Github seconds={s}/>
      <div style={{position:'absolute',top:1473,left:0,width:1080,textAlign:'center',opacity:rise(s,10.2,10.85)}}>
        <Interactive.Div name="S03 — Catatan Stars Bukan Jumlah Pengguna" style={{pointerEvents:'auto',fontSize:19,color:'#858990',translate:'0px 0px',scale:1,rotate:'0deg'}}>Stars adalah minat komunitas, bukan jumlah pengguna.</Interactive.Div>
      </div>
    </div>
    {showSubtitles?<Scene03Subtitle seconds={s}/>:null}
    {/* Reuse the last actual frame of Scene 02 as a brief hand-off, no duplicate screenshot. */}
    {s < .84 ? <div style={{position:'absolute',inset:0,opacity:fadeOut(s,.04,.84),pointerEvents:'none'}}>
      <Freeze frame={464}><Scene02 showSubtitles={showSubtitles} showGrid={showGrid}/></Freeze>
    </div> : null}
  </AbsoluteFill>;
};

/** Single subtitle track; texts are literal inside Interactive for direct Studio text editing. */
const Scene03Subtitle:React.FC<{seconds:number}>=({seconds})=>{
  const i=seconds<2.5?0:seconds<4.5?1:seconds<6.75?2:seconds<9.2?3:seconds<11.3?4:5;
  return <div style={{position:'absolute',left:105,top:1490,width:870,minHeight:76,borderRadius:22,
    background:'transparent',
    display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 20px',pointerEvents:'none',zIndex:18}}>
    {i===0?null
    :i===1?null
    :i===2?null
    :i===3?<Interactive.Div name="S03 — Subtitle 04" style={{pointerEvents:'auto',fontSize:28,color:'#484746',textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>Tools ini open-source,</Interactive.Div>
    :i===4?null
    :null}
  </div>;
};
