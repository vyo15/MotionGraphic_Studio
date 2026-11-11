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
    <Interactive.Div name="S06 — Label SCENE 06 PENUTUP" style={{position:'absolute',left:80,top:246,fontSize:22,letterSpacing:'1px',fontWeight:670,color:'#888783',translate:'0px 0px',scale:1,rotate:'0deg'}}>SCENE 06 / PENUTUP</Interactive.Div>
    <div style={{position:'absolute',left:100,top:347,width:880,textAlign:'center'}}>
      {phase===0?<Interactive.Div name="S06 — Judul JANGAN HAPUS SEMUANYA" style={{fontSize:52,fontWeight:810,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>JANGAN HAPUS SEMUANYA</Interactive.Div>:
       phase===1?<Interactive.Div name="S06 — Judul PILIHAN SUDAH DIPROSES" style={{fontSize:52,fontWeight:810,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>PILIHAN SUDAH DIPROSES</Interactive.Div>:
       <Interactive.Div name="S06 — Judul RESTART JIKA DIPERLUKAN" style={{fontSize:50,fontWeight:810,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>RESTART JIKA DIPERLUKAN</Interactive.Div>}
      <Interactive.Div name="S06 — Helper pilih sesuai kebutuhan" style={{marginTop:17,fontSize:26,color:'#85847F',translate:'0px 0px',scale:1,rotate:'0deg'}}>Pilih sesuai kebutuhan</Interactive.Div>
    </div>
  </>;
};

const TutorialSubtitle:React.FC<{seconds:number}>=({seconds:s})=>{
  return <div style={{position:'absolute',left:SCENE06.canvas.subtitles.x,top:SCENE06.canvas.subtitles.y,width:SCENE06.canvas.subtitles.width,height:SCENE06.canvas.subtitles.height,background:'rgba(255,255,255,.96)',borderRadius:19,boxShadow:'0 6px 24px #38342B12',border:'1px solid #EAE8E3',display:'grid',placeItems:'center',zIndex:50}}>
    {s<3.75?<Interactive.Div name="S06 — Subtitle hati-hati hapus semua" style={{fontSize:30,fontWeight:590,color:'#484A4D',translate:'0px 0px',scale:1,rotate:'0deg'}}>Tapi jangan asal hapus semuanya, ya.</Interactive.Div>:
    s<5.95?<Interactive.Div name="S06 — Subtitle Selesai" style={{fontSize:31,fontWeight:590,color:'#484A4D',translate:'0px 0px',scale:1,rotate:'0deg'}}>Selesai!</Interactive.Div>:
    <Interactive.Div name="S06 — Subtitle Restart" style={{fontSize:30,fontWeight:590,color:'#484A4D',translate:'0px 0px',scale:1,rotate:'0deg'}}>Restart kalau diperlukan.</Interactive.Div>}
  </div>;
};

const ProcessingOverlay:React.FC<{seconds:number}>=({seconds:s})=>{
  const show=visible(s,3.86,5.74,.25);
  const amount=reveal(s,4.13,1.11);
  return show>0?<Interactive.Div name="S06 — Panel proses pilihan WinUtil / posisi" style={{position:'absolute',left:216,top:982,width:648,height:292,boxSizing:'border-box',borderRadius:24,background:'rgba(255,255,255,.98)',border:'1px solid #DAE4ED',boxShadow:'0 19px 56px #16334B33',zIndex:25,opacity:show,padding:'43px 39px',translate:'0px 0px',scale:1,rotate:'0deg'}}>
    <Interactive.Div name="S06 — Label proses penghapusan selektif" style={{fontSize:32,fontWeight:800,color:'#384E62',marginBottom:17,translate:'0px 0px',scale:1,rotate:'0deg'}}>Memproses aplikasi terpilih</Interactive.Div>
    <Interactive.Div name="S06 — Pesan simulasi / bukan output asli" style={{fontSize:21,color:'#7A8997',marginBottom:24,translate:'0px 0px',scale:1,rotate:'0deg'}}>Simulasi penghapusan</Interactive.Div>
    <div style={{height:20,width:564,background:'#E6EDF3',borderRadius:20,overflow:'hidden'}}>
      <Interactive.Div name="S06 — Progress bar pilihan / warna / ukuran" style={{height:'100%',width:`${amount*100}%`,background:'linear-gradient(90deg,#3A8BCB,#64B4E9)',borderRadius:20,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    </div>
    <Interactive.Div name="S06 — Jumlah 2 aplikasi dipilih" style={{fontSize:20,fontWeight:620,color:'#66818B',marginTop:16,translate:'0px 0px',scale:1,rotate:'0deg'}}>2 aplikasi dipilih</Interactive.Div>
  </Interactive.Div>:null;
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
      {appFade>0?<div style={{position:'absolute',inset:0,opacity:appFade}}><Scene05WinUtil seconds={23.45}/></div>:null}
      {warning>0?<Interactive.Div name="S06 — Pengingat tidak semua aplikasi dihapus" style={{position:'absolute',left:545,top:1308,padding:'14px 21px',background:'#FCF1E8',border:'1px solid #F2DBCD',color:'#B06947',borderRadius:13,fontSize:22,fontWeight:700,opacity:warning,zIndex:22,translate:'0px 0px',scale:1,rotate:'0deg'}}>Biarkan yang diperlukan</Interactive.Div>:null}
      <ProcessingOverlay seconds={s}/>
      {s<SCENE06.timing.cta.start?<Scene06Pointer seconds={s}/>:null}
      {showSubtitles&&s<8.78?<TutorialSubtitle seconds={s}/>:null}
    </div>
    {cta>0?<Scene06CTA seconds={s} showGrid={showGrid}/>:null}
  </AbsoluteFill>;
};
