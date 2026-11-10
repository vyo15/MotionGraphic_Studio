import React from 'react';
import {AbsoluteFill, Freeze, Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {AppIcon} from '../components/AppIcons';
import {Background} from '../components/Background';
import {BingPanel, CopilotPanel, XboxPanel} from '../components/Scene02Panels';
import {OpeningScene} from './OpeningScene';
import {DESIGN} from '../config/design';
import {SCENE02} from '../config/scene02';
import {rise, fadeOut, mix} from '../animations/presets';

const tx = {translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const clamp = (x:number)=>Math.min(1,Math.max(0,x));
type Panel = 'xbox'|'bing'|'copilot';

const ActivePanel: React.FC<{which:Panel;seconds:number}> = ({which,seconds}) => {
  const {start,end}=SCENE02.panels[which];
  const entry=rise(seconds,start,start+0.52);
  const exit=fadeOut(seconds,end-0.51,end);
  const opacity=clamp(entry*exit);
  if(opacity<.001)return null;
  const scale=mix(.93,1,entry)*mix(1,.96,1-exit);
  const x=SCENE02.position.panel.x+mix(115,0,entry)-mix(0,115,1-exit);
  const y=SCENE02.position.panel.y+mix(28,0,entry);
  return <div style={{position:'absolute',left:x,top:y,width:936,height:684,opacity,
    transform:`scale(${scale})`,transformOrigin:'50% 50%'}}>
    {which==='xbox' ? <XboxPanel/> : which==='bing' ? <BingPanel/> : <CopilotPanel/>}
    <div style={{position:'absolute',top:728,left:0,width:'100%',display:'flex',justifyContent:'center'}}>
      <div style={{border:'1px solid #E7E4DE',background:'#FFFFFF',borderRadius:30,
        padding:'11px 28px',display:'flex',gap:10,alignItems:'center',boxShadow:'0 9px 22px rgba(20,20,20,.04)'}}>
        <div style={{height:11,width:11,borderRadius:'50%',background:DESIGN.coral}}/>
        {which==='xbox' ? <Interactive.Div name="S02 — Nama Fokus Xbox" style={{fontSize:24,fontWeight:600,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Xbox</Interactive.Div>
         : which==='bing' ? <Interactive.Div name="S02 — Nama Fokus Bing Search" style={{fontSize:24,fontWeight:600,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Bing Search</Interactive.Div>
         : <Interactive.Div name="S02 — Nama Fokus Copilot" style={{fontSize:24,fontWeight:600,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Copilot</Interactive.Div>}
      </div>
    </div>
  </div>;
};

const AppTile: React.FC<{which:Panel; seconds:number; order:number}> = ({which,seconds,order}) => {
  const start=SCENE02.summary.cardsStart+order*.22;
  const enter=rise(seconds,start,start+.58);
  const sort=rise(seconds,SCENE02.summary.stackStart+order*.13,SCENE02.summary.stackStart+1.10+order*.13);
  const x=mix(126+order*290,112,sort);
  const y=mix(SCENE02.layout.tileTop,774+order*163,sort);
  const scale=mix(.96,.57,sort);
  const label=which==='xbox'?'Xbox':which==='bing'?'Bing Search':'Copilot';
  const app=which==='xbox'?'Xbox':which==='bing'?'Bing Search':'Copilot';
  return <div style={{position:'absolute',left:x,top:y,width:220,height:240,
    opacity:enter,transform:`translateY(${mix(45,0,enter)}px) scale(${scale})`,transformOrigin:'top left'}}>
    <Interactive.Div name={`S02 — Kartu Review ${label}`} style={{position:'absolute',inset:0,borderRadius:25,
      background:'#FFFFFF',border:'1px solid #E8E6E2',boxShadow:DESIGN.shadow,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    <Interactive.Div name={`S02 — Ikon Kartu Review ${label}`} style={{position:'absolute',top:29,left:42,width:136,height:136,translate:'0px 0px',scale:1,rotate:'0deg'}}><AppIcon app={app} size={136}/></Interactive.Div>
    {which==='xbox'?<Interactive.Div name="S02 — Kartu Nama Xbox" style={{position:'absolute',top:191,left:0,width:220,textAlign:'center',fontSize:26,fontWeight:600,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Xbox</Interactive.Div>
      :which==='bing'?<Interactive.Div name="S02 — Kartu Nama Bing Search" style={{position:'absolute',top:191,left:0,width:220,textAlign:'center',fontSize:26,fontWeight:600,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Bing Search</Interactive.Div>
      :<Interactive.Div name="S02 — Kartu Nama Copilot" style={{position:'absolute',top:191,left:0,width:220,textAlign:'center',fontSize:26,fontWeight:600,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Copilot</Interactive.Div>}
  </div>;
};

const ReviewRow: React.FC<{which:Panel;seconds:number;order:number}> = ({which,seconds,order}) => {
  const start=SCENE02.summary.stackStart+order*.13;
  const a=rise(seconds,start,start+1.10);
  const y=SCENE02.layout.rowTop+order*163;
  return <div style={{position:'absolute',left:84,top:y,width:915,height:142,opacity:a}}>
    <Interactive.Div name={`S02 — Baris Review ${which}`} style={{position:'absolute',inset:0,borderRadius:20,
      background:'rgba(255,255,255,.64)',border:'1px solid #EAE8E3',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    {which==='xbox'?<Interactive.Div name="S02 — Daftar Nama Xbox" style={{position:'absolute',top:28,left:270,fontSize:31,fontWeight:690,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Xbox</Interactive.Div>
      :which==='bing'?<Interactive.Div name="S02 — Daftar Nama Bing Search" style={{position:'absolute',top:28,left:270,fontSize:31,fontWeight:690,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Bing Search</Interactive.Div>
      :<Interactive.Div name="S02 — Daftar Nama Copilot" style={{position:'absolute',top:28,left:270,fontSize:31,fontWeight:690,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>Copilot</Interactive.Div>}
    <Interactive.Div name={`S02 — Keterangan Review ${which}`} style={{position:'absolute',top:75,left:270,fontSize:22,color:'#9B9B96',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      Tinjau sebelum dihapus
    </Interactive.Div>
    <Interactive.Div name={`S02 — Kotak Pilihan ${which}`} style={{position:'absolute',right:28,top:55,width:30,height:30,
      borderRadius:8,border:`2px solid ${DESIGN.coral}`,background:'#FFFFFF',opacity:.85,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  </div>;
};

const ReviewSummary: React.FC<{seconds:number}> = ({seconds}) => {
  const a=rise(seconds,SCENE02.summary.start,SCENE02.summary.start+.85);
  if(a<.001)return null;
  const done=rise(seconds,13.68,14.45);
  return <>
    <div style={{position:'absolute',left:88,top:SCENE02.position.summary.y,opacity:a,
      transform:`translateY(${mix(38,0,a)}px)`}}>
      <Interactive.Div name="S02 — Judul JARANG DIPAKAI" style={{fontSize:57,fontWeight:780,color:DESIGN.ink,translate:'0px 0px',scale:1,rotate:'0deg'}}>
        JARANG DIPAKAI
      </Interactive.Div>
      <Interactive.Div name="S02 — Teks Pilih Aplikasi" style={{marginTop:9,fontSize:26,color:'#92928B',translate:'0px 0px',scale:1,rotate:'0deg'}}>
        Pilih yang memang ingin dirapikan
      </Interactive.Div>
    </div>
    {(['xbox','bing','copilot'] as Panel[]).map((which,i)=><ReviewRow key={'row'+which} which={which} seconds={seconds} order={i}/>)}
    {(['xbox','bing','copilot'] as Panel[]).map((which,i)=><AppTile key={which} which={which} seconds={seconds} order={i}/>)}
    <div style={{position:'absolute',left:315,top:1295,opacity:done,transform:`translateY(${mix(19,0,done)}px)`}}>
      <Interactive.Div name="S02 — Status Belum Dihapus" style={{width:450,textAlign:'center',fontSize:24,color:'#976D5B',fontWeight:600,
        background:'#EEE8E1',borderRadius:24,padding:'13px 18px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Belum dihapus</Interactive.Div>
    </div>
  </>;
};

/** Track subtitle mengikuti VO, terpisah dari semua kartu dan UI aplikasi. */
const VoiceSubtitle: React.FC<{seconds:number}> = ({seconds}) => {
  const current=seconds<SCENE02.subtitleSwitches[0]?0:seconds<SCENE02.subtitleSwitches[1]?1:
    seconds<SCENE02.subtitleSwitches[2]?2:seconds<SCENE02.subtitleSwitches[3]?3:4;
  const wrapper:React.CSSProperties={position:'absolute',left:SCENE02.position.subtitle.x,top:SCENE02.position.subtitle.y,
    width:SCENE02.position.subtitle.width,height:SCENE02.position.subtitle.height,display:'flex',alignItems:'center',justifyContent:'center',
    background:'rgba(255,255,255,.91)',borderRadius:28,boxShadow:'0 8px 25px rgba(40,35,30,.035)'};
  const st:React.CSSProperties={fontSize:31,fontWeight:500,color:'#484746',textAlign:'center',lineHeight:1.25,translate:'0px 0px',scale:1,rotate:'0deg'};
  return <div style={wrapper}>
    {current===0?<Interactive.Div name="S02 — Subtitle Xbox" style={{fontSize:31,fontWeight:500,color:'#484746',textAlign:'center',lineHeight:1.25,translate:'0px 0px',scale:1,rotate:'0deg'}}>Gue sendiri jarang pakai Xbox...</Interactive.Div>
     :current===1?<Interactive.Div name="S02 — Subtitle Bing" style={{fontSize:31,fontWeight:500,color:'#484746',textAlign:'center',lineHeight:1.25,translate:'0px 0px',scale:1,rotate:'0deg'}}>Bing Search...</Interactive.Div>
     :current===2?<Interactive.Div name="S02 — Subtitle Copilot" style={{fontSize:31,fontWeight:500,color:'#484746',textAlign:'center',lineHeight:1.25,translate:'0px 0px',scale:1,rotate:'0deg'}}>sama Copilot.</Interactive.Div>
     :current===3?<Interactive.Div name="S02 — Subtitle Daripada" style={{fontSize:31,fontWeight:500,color:'#484746',textAlign:'center',lineHeight:1.25,translate:'0px 0px',scale:1,rotate:'0deg'}}>Nah, daripada nggak kepakai...</Interactive.Div>
     :<Interactive.Div name="S02 — Subtitle Rapihin" style={{fontSize:31,fontWeight:500,color:'#484746',textAlign:'center',lineHeight:1.25,translate:'0px 0px',scale:1,rotate:'0deg'}}>mending kita rapihin aja.</Interactive.Div>}
  </div>;
};

export const Scene02:React.FC<{showSubtitles:boolean;showGrid:boolean}> = ({showSubtitles,showGrid}) => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig(); const s=f/fps;
  const openingOverlay=fadeOut(s,.05,.84);
  return <AbsoluteFill style={{fontFamily:DESIGN.font,color:DESIGN.ink,overflow:'hidden'}}>
    <Background showGrid={showGrid}/>
    <div style={{position:'absolute',left:SCENE02.position.header.x,top:SCENE02.position.header.y}}>
      <Interactive.Div name="S02 — Label WINDOWS 11" style={{fontSize:25,fontWeight:500,letterSpacing:1.1,color:'#7D7D79',translate:'0px 0px',scale:1,rotate:'0deg'}}>WINDOWS 11</Interactive.Div>
      <div style={{position:'absolute',left:193,top:15,width:48,height:4,borderRadius:2,background:DESIGN.coral}}/>
      <Interactive.Div name="S02 — Headline FITUR BAWAAN" style={{fontSize:61,fontWeight:760,letterSpacing:-1.7,color:DESIGN.ink,marginTop:21,translate:'0px 0px',scale:1,rotate:'0deg'}}>FITUR BAWAAN</Interactive.Div>
    </div>
    <ActivePanel which="xbox" seconds={s}/>
    <ActivePanel which="bing" seconds={s}/>
    <ActivePanel which="copilot" seconds={s}/>
    <ReviewSummary seconds={s}/>
    {showSubtitles?<VoiceSubtitle seconds={s}/>:null}
    {openingOverlay>0 ? <div style={{position:'absolute',inset:0,opacity:openingOverlay,pointerEvents:'none'}}>
      <Freeze frame={239}><OpeningScene showGrid={showGrid} showSubtitles={true}/></Freeze>
    </div>:null}
  </AbsoluteFill>;
};
