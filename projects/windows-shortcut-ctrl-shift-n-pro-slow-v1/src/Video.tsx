import React from 'react';
import {AbsoluteFill,Audio,Interactive,staticFile,useCurrentFrame,useVideoConfig,spring} from 'remotion';
import {CFG,timelineTime} from './config/video';
import {ExplorerUI,BrowserUI,FolderIcon} from './components/WindowsUI';
import './styles.css';
import {TimelineOverlay} from './scenes/TimelineOverlay';
import {SuccessCue} from './scenes/SuccessCue';
const clamp=(x:number)=>Math.min(1,Math.max(0,x));
const ease=(x:number)=>{x=clamp(x);return x*x*(3-2*x)};
const anim=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
const lineups=[
  {id:'Problem',start:0,end:3.75,main:CFG.text.problemA,accent:CFG.text.problemB,sub:CFG.text.problemSub,color:CFG.colors.amber},
  {id:'Shortcut',start:3.46,end:6.65,main:CFG.text.shortcutA,accent:CFG.text.shortcutB,sub:CFG.text.shortcutSub,color:CFG.colors.cyan},
  {id:'Result',start:6.5,end:11.62,main:CFG.text.folderA,accent:CFG.text.folderB,sub:CFG.text.folderSub,color:CFG.colors.mint},
  {id:'Bonus',start:11.45,end:16.20,main:CFG.text.bonusA,accent:CFG.text.bonusB,sub:CFG.text.bonusSub,color:CFG.colors.cyan},
  {id:'Outro',start:16.06,end:18.0,main:CFG.text.finishA,accent:CFG.text.finishB,sub:CFG.text.finishSub,color:CFG.colors.mint}
] as const;
const Heading:React.FC<{phase:typeof lineups[number];t:number}>=({phase,t})=>{
 const into=anim(t,phase.start,phase.start+.45),away=anim(t,phase.end-.43,phase.end);
 const opacity=into*(1-away);
 return <>
  <Interactive.Div name={'05 — '+phase.id+' headline'} className="csnTitle" style={{left:CFG.layout.titleX,top:CFG.layout.titleY,opacity,transform:`translateY(${(1-into)*26+away*-18}px)`}}><div>{phase.main}</div><div style={{color:phase.color}}>{phase.accent}</div></Interactive.Div>
  <Interactive.Div name={'05 — '+phase.id+' subtitle'} className="csnSub" style={{left:CFG.layout.subX,top:CFG.layout.subY,opacity,transform:`translateY(${(1-into)*17}px)`}}>{phase.sub}</Interactive.Div>
 </>;
};
const Key:React.FC<{name:string;pressed:number;minwidth:number}>=({name,pressed,minwidth})=><div className="csnKeyOuter"><div className="csnKeyFace" style={{minWidth:minwidth,transform:`translateY(${8*pressed}px)`,background:pressed>.2?'linear-gradient(160deg,#28d0ff,#1480af)':'linear-gradient(170deg,#344b66,#14243b)',boxShadow:pressed>.2?'inset 0 2px 15px #e0f6ffac, 0 2px #082b48':'inset 0 2px 0 #bfdaf766,0 9px 1px #061629'}}>{name}</div></div>;
const Keyboard:React.FC<{t:number;frame:number;fps:number;browser?:boolean}>=({t,frame,fps,browser})=>{
 const start=browser?CFG.timings.browserKeyIn:CFG.timings.keyIn,pressAt=browser?CFG.timings.browserKeyPress:CFG.timings.keyPress,end=browser?14.48:CFG.timings.keyOut;
 const opacity=anim(t,start,start+.42)*(1-anim(t,end-.35,end));
 const sp=spring({frame:Math.max(0,frame-start*fps),fps,config:{stiffness:95,damping:18}});
 const press=anim(t,pressAt,pressAt+.13)*(1-anim(t,pressAt+.3,pressAt+.49));
 return <Interactive.Div name={browser?'05 — Bonus shortcut keyboard':'05 — Folder shortcut keyboard'} className="csnKeyboard" style={{left:CFG.layout.keyX,top:CFG.layout.keyY,opacity,transform:`translateY(${(1-sp)*30}px) scale(${.96+.04*sp})`}}><Key name="CTRL" pressed={press} minwidth={228}/><b>+</b><Key name="SHIFT" pressed={press} minwidth={230}/><b>+</b><Key name="N" pressed={press} minwidth={130}/></Interactive.Div>;
};
const Focus:React.FC<{t:number}>=({t})=>{
 const opacity=anim(t,6.86,7.27)*(1-anim(t,10.72,11.10));
 const typing=t>=CFG.timings.renameStart&&t<CFG.timings.renameConfirm;
 const typed=t<CFG.timings.renameStart?'New folder':CFG.text.newFolder.slice(0,Math.round(CFG.text.newFolder.length*anim(t,CFG.timings.renameStart,CFG.timings.renameEnd)));
 return <Interactive.Div name="05 — Zoom detail nama folder (HTML editable)" className="csnZoom" style={{opacity,transform:`translateY(${(1-opacity)*30}px)`}}><div className="csnZoomHeader"><span className="csnLive"/> ZOOM DETAIL · FOLDER BARU <span>2.0×</span></div><div className="csnZoomRow"><FolderIcon size={64}/><div className="csnZoomField">{t<CFG.timings.renameConfirm?<span className="csnZoomInput">{t<CFG.timings.renameStart?<mark>New folder</mark>:<>{typed}{typing&&<i>|</i>}</>}</span>:CFG.text.newFolder}</div>{t>=CFG.timings.renameConfirm&&<strong>✓</strong>}</div><div className="csnZoomTip">{t<CFG.timings.renameStart?'Nama otomatis terseleksi — tinggal ketik':t<CFG.timings.renameConfirm?'Ketik nama folder yang kamu mau…':'Selesai! Folder baru sudah dibuat.'}</div></Interactive.Div>;
};
const Recap:React.FC<{t:number}>=({t})=>{
 const opacity=anim(t,16.21,16.70);
 return <Interactive.Div name="05 — Summary two shortcut functions" className="csnRecap" style={{opacity,transform:`translateY(${(1-opacity)*32}px)`}}><div className="csnRecapTop">SATU KOMBINASI TOMBOL, DUA HASIL</div><div className="csnRecapCards"><div><FolderIcon size={36}/><span>FILE EXPLORER</span><b>Folder baru</b></div><div><span className="csnRecapPrivate">◧</span><span>EDGE / CHROME</span><b>Mode privat</b></div></div></Interactive.Div>;
};
export const Video:React.FC=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=timelineTime(frame/fps);
 const virtualFrame=t*fps;
 const browser=anim(t,CFG.timings.browserIn,CFG.timings.browserIn+.78);
 const windowIn=spring({frame:Math.max(0,virtualFrame-4),fps,config:{damping:18,stiffness:75}});
 const slowZoom=anim(t,6.6,7.75)*(1-anim(t,10.8,11.5));
 const borderTint=browser>.5?'#7cb5ed70':'#81d9f66d';
 return <AbsoluteFill className="csnRoot" style={{background:CFG.colors.bg,fontFamily:"'Inter','Segoe UI',Arial,sans-serif"}}>
   <div className="csnGrid"/><div className="csnGlowA"/><div className="csnGlowB"/>
   <div className="csnOutline"/>
   <Interactive.Div name="05 — Series label" className="csnKicker" style={{left:CFG.layout.kickerX,top:CFG.layout.kickerY}}><span className="csnKickerDot"/>{CFG.text.kicker}<span>{CFG.text.episode}</span></Interactive.Div>
   <Heading phase={lineups[0]} t={t}/><Heading phase={lineups[1]} t={t}/><Heading phase={lineups[2]} t={t}/><Heading phase={lineups[3]} t={t}/><Heading phase={lineups[4]} t={t}/>
   <Interactive.Div name="05 — Windows 11 demo monitor" className="csnMonitor" style={{left:CFG.layout.monitorX,top:CFG.layout.monitorY,width:CFG.layout.monitorW,height:CFG.layout.monitorH,opacity:anim(t,.1,.5),transform:`scale(${.97+.03*windowIn})`,borderColor:borderTint}}>
     <div className="csnMonitorScreen"><div className="csnWallpaper"><div className="csnRibbon r1"/><div className="csnRibbon r2"/><div className="csnRibbon r3"/></div>
       <div className="csnExplorerMount" style={{opacity:1-browser,transform:`translateY(${browser*-22}px) scale(${1+.14*slowZoom})`}}><ExplorerUI t={t}/></div>
       <div className="csnEdgeMount" style={{opacity:browser,transform:`translateY(${(1-browser)*30}px) scale(${.98+.02*browser})`}}><BrowserUI t={t}/></div>
       <div className="csnTaskbar"><div className="csnWindowsTiles"><i/><i/><i/><i/></div><span className="csnSearchPill">⌕　Search</span><FolderIcon size={28}/><span className="csnEdgeSmall">e</span><span className="csnClock">ENG　⌁　10:28</span></div>
     </div>
     <div className="csnMonitorFooter"><span>●</span>{browser>.5?'MICROSOFT EDGE · INPRIVATE':'WINDOWS 11 · FILE EXPLORER'}<b>● LIVE DEMO</b></div>
   </Interactive.Div>
   <Interactive.Div name="05 — Context menu annotation" className="csnContextHint" style={{opacity:anim(t,1.55,1.95)*(1-anim(t,3.1,3.55))}}>KLIK KANAN → NEW → FOLDER? <strong>RIBET!</strong></Interactive.Div>
   <Keyboard t={t} frame={virtualFrame} fps={fps}/>
   <Focus t={t}/>
   <Keyboard t={t} frame={virtualFrame} fps={fps} browser/>
   <Interactive.Div name="05 — Browser extra tip" className="csnBrowserTip" style={{opacity:anim(t,14.1,14.67)*(1-anim(t,16.05,16.35))}}><span>EDGE</span> INPRIVATE <i>·</i> <span>CHROME</span> INCOGNITO</Interactive.Div>
   <Recap t={t}/>
   <SuccessCue t={t} />
   <TimelineOverlay t={t} />
   <div className="csnProgress"><div style={{width:`${Math.min(100,frame/450*100)}%`}}/></div>
   {CFG.sound.enabled&&<Audio name="Audio — Original keypress UI SFX" src={staticFile('videos/windows-shortcut-ctrl-shift-n-pro-slow-v1/audio/ctrl-shift-n-v2.wav')} volume={CFG.sound.volume}/>}
 </AbsoluteFill>;
};
