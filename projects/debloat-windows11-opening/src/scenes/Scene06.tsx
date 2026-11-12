import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Scene05WinUtil} from '../components/Scene05WinUtil';
import {Scene06Windows} from '../components/Scene06Windows';
import {Scene06Pointer} from '../components/Scene06Pointer';
import {Scene06CTA} from '../components/Scene06CTA';
import {SCENE06} from '../config/scene06';
import {reveal, visible} from '../animations/scene06';
import {DESIGN} from '../config/design';

const ED={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const fade=(s:number,start:number,duration:number)=>reveal(s,start,duration);

const TutorialHeadline:React.FC<{seconds:number}>=({seconds:s})=>{
  const phase=s<3.75?0:s<5.74?1:2;
  return <>
    <div style={{position:'absolute',left:100,top:347,width:880,textAlign:'center'}}>
      {phase===0?<Interactive.Div name="S06 — Judul JANGAN HAPUS SEMUANYA" style={{pointerEvents:'auto',fontSize:52,fontWeight:810,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>JANGAN HAPUS SEMUANYA</Interactive.Div>:
       phase===1?<Interactive.Div name="S06 — Judul PILIHAN SUDAH DIPROSES" style={{pointerEvents:'auto',fontSize:52,fontWeight:810,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>PILIHAN SUDAH DIPROSES</Interactive.Div>:
       <Interactive.Div
         name="S06 — Judul RESTART JIKA DIPERLUKAN"
         style={{pointerEvents:'auto',fontSize:50,fontWeight:810,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}
       >RESTART JIKA DIPERLUKAN</Interactive.Div>}
    </div>
  </>;
};

const TutorialSubtitle:React.FC<{seconds:number}>=({seconds:s})=>{
  return <div style={{position:'absolute',left:SCENE06.canvas.subtitles.x,top:SCENE06.canvas.subtitles.y,
    width:SCENE06.canvas.subtitles.width,height:SCENE06.canvas.subtitles.height,
    background:'transparent',display:'grid',placeItems:'center',zIndex:50,pointerEvents:'none'}}>
    {s<3.75?null
    :s<5.95?null
    :null}
  </div>;
};

/** 17.233s / 517 frames. Same scene and config for full composition and S06 preview. */
export const Scene06:React.FC<{showSubtitles:boolean;showGrid:boolean}>=({showSubtitles,showGrid})=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  const cta=fade(s,SCENE06.timing.cta.start,.63);
  const appFade=1-reveal(s,5.68,.25);
  const warning=visible(s,1.05,3.45,.30);
  return <AbsoluteFill style={{overflow:'hidden',fontFamily:DESIGN.font,color:DESIGN.ink}}>
    <Background showGrid={showGrid}/>
    <div style={{position:'absolute',inset:0,opacity:1-cta,pointerEvents:'none'}}>
      <TutorialHeadline seconds={s}/>
      <Scene06Windows seconds={s}/>
      {appFade>0?<div style={{position:'absolute',inset:0,opacity:appFade}}><Scene05WinUtil seconds={20.99}/></div>:null}
      {warning>0?<Interactive.Div name="S06 — Pengingat tidak semua aplikasi dihapus" style={{pointerEvents:'auto',position:'absolute',left:545,top:1308,padding:'14px 21px',background:'#FCF1E8',border:'1px solid #F2DBCD',color:'#B06947',borderRadius:13,fontSize:22,fontWeight:700,opacity:warning,zIndex:22,translate:'0px 0px',scale:1,rotate:'0deg'}}>Biarkan yang diperlukan</Interactive.Div>:null}
      {s<SCENE06.timing.cta.start?<Scene06Pointer seconds={s}/>:null}
      {showSubtitles&&s<8.78?<TutorialSubtitle seconds={s}/>:null}
    </div>
    {cta>0?<Scene06CTA seconds={s} showGrid={showGrid}/>:null}
  </AbsoluteFill>;
};
