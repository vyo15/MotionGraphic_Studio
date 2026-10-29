import {useDemoFrame} from '../../editor/DemoClock';
import {useSfxControls} from '../../editor/LayerVars';
import {useCopy} from '../../editor/TextOverrides';
import {layerStyle} from '../../editor/LayerStyling';
import React from 'react';
import {AbsoluteFill,Audio,Interactive,staticFile,useCurrentFrame,useVideoConfig,spring} from 'remotion';
import {CFG} from './config/video';
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
const EditablePhase:React.FC<{start:number;end:number;t:number;children:React.ReactNode}>=({start,end,t,children})=>{
 const enter=anim(t,start,start+.45),leave=anim(t,end-.43,end);
 const opacity=enter*(1-leave);const dy=(1-enter)*32-leave*18;
 return <div style={{position:'absolute',inset:0,opacity,transform:`translateY(${dy}px)`,pointerEvents:'none'}}>{children}</div>;
};

const Key:React.FC<{name:string;pressed:number;minwidth:number}>=({name,pressed,minwidth})=><div className="whnKeyOuter"><div className="whnKeyFace" style={{minWidth:minwidth,transform:`translateY(${8*pressed}px)`,background:pressed>.2?'linear-gradient(160deg,#28d0ff,#1480af)':'linear-gradient(170deg,#344b66,#14243b)',boxShadow:pressed>.2?'inset 0 2px 15px #e0f6ffac, 0 2px #082b48':'inset 0 2px 0 #bfdaf766,0 9px 1px #061629'}}>{name}</div></div>;
const Keyboard:React.FC<{t:number;frame:number;fps:number;browser?:boolean}>=({t,frame,fps,browser})=>{
 const start=browser?CFG.timings.browserKeyIn:CFG.timings.keyIn,pressAt=browser?CFG.timings.browserKeyPress:CFG.timings.keyPress,end=browser?14.48:CFG.timings.keyOut;
 const opacity=anim(t,start,start+.42)*(1-anim(t,end-.35,end));
 const sp=spring({frame:Math.max(0,frame-start*fps),fps,config:{stiffness:95,damping:18}});
 const press=anim(t,pressAt,pressAt+.13)*(1-anim(t,pressAt+.3,pressAt+.49));
 return <Interactive.Div name={browser?'05 · Bonus shortcut keyboard':'05 · Folder shortcut keyboard'} className="whnKeyboard" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:CFG.layout.keyX,top:CFG.layout.keyY,opacity,transform:`translateY(${(1-sp)*30}px) scale(${.96+.04*sp})`}}><Key name="CTRL" pressed={press} minwidth={228}/><b>+</b><Key name="SHIFT" pressed={press} minwidth={230}/><b>+</b><Key name="N" pressed={press} minwidth={130}/></Interactive.Div>;
};
const Focus:React.FC<{t:number}>=({t})=>{
 const copy=useCopy(); const folderName=copy("folder-name",CFG.text.newFolder);
 const opacity=anim(t,6.86,7.27)*(1-anim(t,10.72,11.10));
 const typing=t>=CFG.timings.renameStart&&t<CFG.timings.renameConfirm;
 const typed=t<CFG.timings.renameStart?'New folder':folderName.slice(0,Math.round(folderName.length*anim(t,CFG.timings.renameStart,CFG.timings.renameEnd)));
 return <Interactive.Div name="05 · Zoom detail nama folder (HTML editable)" className="whnZoom" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:90,top:1355,width:900,height:222,opacity,transform:`translateY(${(1-opacity)*30}px)`}}><div className="whnZoomHeader"><span className="whnLive"/> ZOOM DETAIL · FOLDER BARU <span>2.0×</span></div><div className="whnZoomRow"><FolderIcon size={64}/><div className="whnZoomField" style={layerStyle("folder-zoom-name")}>{t<CFG.timings.renameConfirm?<span className="whnZoomInput">{t<CFG.timings.renameStart?<mark>New folder</mark>:<>{typed}{typing&&<i>|</i>}</>}</span>:folderName}</div>{t>=CFG.timings.renameConfirm&&<strong>✓</strong>}</div><div className="whnZoomTip">{t<CFG.timings.renameStart?'Nama otomatis terseleksi — tinggal ketik':t<CFG.timings.renameConfirm?'Ketik nama folder yang kamu mau…':'Selesai! Folder baru sudah dibuat.'}</div></Interactive.Div>;
};
const Recap:React.FC<{t:number}>=({t})=>{
 const opacity=anim(t,16.21,16.70);
 return <Interactive.Div name="05 · Summary two shortcut functions" className="whnRecap" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:94,top:1372,width:892,height:217,opacity,transform:`translateY(${(1-opacity)*32}px)`}}><div className="whnRecapTop">SATU KOMBINASI TOMBOL, DUA HASIL</div><div className="whnRecapCards"><div><FolderIcon size={36}/><span>FILE EXPLORER</span><b>Folder baru</b></div><div><span className="whnRecapPrivate">◧</span><span>EDGE / CHROME</span><b>Mode privat</b></div></div></Interactive.Div>;
};
export const Video:React.FC=()=>{
 const sfx=useSfxControls();
 const frame=useDemoFrame(),{fps}=useVideoConfig(),t=frame/fps;
 const virtualFrame=t*fps;
 const browser=anim(t,CFG.timings.browserIn,CFG.timings.browserIn+.78);
 const windowIn=spring({frame:Math.max(0,virtualFrame-4),fps,config:{damping:18,stiffness:75}});
 const slowZoom=anim(t,6.6,7.75)*(1-anim(t,10.8,11.5));
 const borderTint=browser>.5?'#7cb5ed70':'#81d9f66d';
 return <AbsoluteFill className="whnRoot" style={{background:CFG.colors.bg,fontFamily:"'Inter','Segoe UI',Arial,sans-serif"}}>
   <div className="whnGrid"/><div className="whnGlowA"/><div className="whnGlowB"/>
   <div className="whnOutline"/>
   <Interactive.Div name="05 · Series label" className="whnKicker" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:930,fontSize:20,fontWeight:850,color:"#7de7f4",letterSpacing:3,left:CFG.layout.kickerX,top:CFG.layout.kickerY}}><span className="whnKickerDot"/><Interactive.Div name="05 · Badge · WINDOWS HACKS" style={{display:"inline-block",translate:"0px 0px",scale:1,rotate:"0deg"}}>WINDOWS HACKS</Interactive.Div><Interactive.Div name="05 · Badge · 05 / 05" style={{display:"inline-block",translate:"0px 0px",scale:1,rotate:"0deg"}}>05 / 05</Interactive.Div></Interactive.Div>
    <EditablePhase start={0} end={3.75} t={t}>
      <Interactive.Div name="05 · Masalah · Judul 1" className="whnTitle" style={{position:'absolute',left:67,top:330,width:935,fontSize:79,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>BIKIN FOLDER</Interactive.Div>
      <Interactive.Div name="05 · Masalah · Judul 2" className="whnTitle" style={{position:'absolute',left:67,top:414,width:935,fontSize:79,fontWeight:950,color:'#FFCF83',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>MASIH KLIK KANAN?</Interactive.Div>
      <Interactive.Div name="05 · Masalah · Subtitle" className="whnSub" style={{position:'absolute',left:75,top:550,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Padahal ada cara yang jauh lebih cepat.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={3.46} end={6.65} t={t}>
      <Interactive.Div name="05 · Shortcut · Judul 1" className="whnTitle" style={{position:'absolute',left:67,top:330,width:935,fontSize:79,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>COBA TEKAN</Interactive.Div>
      <Interactive.Div name="05 · Shortcut · Judul 2" className="whnTitle" style={{position:'absolute',left:67,top:414,width:935,fontSize:79,fontWeight:950,color:'#67E8F9',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>CTRL + SHIFT + N</Interactive.Div>
      <Interactive.Div name="05 · Shortcut · Subtitle" className="whnSub" style={{position:'absolute',left:75,top:550,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Langsung dari dalam File Explorer.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={6.5} end={11.62} t={t}>
      <Interactive.Div name="05 · Folder Baru · Judul 1" className="whnTitle" style={{position:'absolute',left:67,top:330,width:935,fontSize:79,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>FOLDER BARU</Interactive.Div>
      <Interactive.Div name="05 · Folder Baru · Judul 2" className="whnTitle" style={{position:'absolute',left:67,top:414,width:935,fontSize:79,fontWeight:950,color:'#9FF6C7',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>LANGSUNG JADI!</Interactive.Div>
      <Interactive.Div name="05 · Folder Baru · Subtitle" className="whnSub" style={{position:'absolute',left:75,top:550,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Tinggal ketik nama foldernya.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={11.45} end={16.2} t={t}>
      <Interactive.Div name="05 · Bonus · Judul 1" className="whnTitle" style={{position:'absolute',left:67,top:330,width:935,fontSize:79,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>BONUS DI BROWSER</Interactive.Div>
      <Interactive.Div name="05 · Bonus · Judul 2" className="whnTitle" style={{position:'absolute',left:67,top:414,width:935,fontSize:79,fontWeight:950,color:'#67E8F9',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>MODE PRIVAT!</Interactive.Div>
      <Interactive.Div name="05 · Bonus · Subtitle" className="whnSub" style={{position:'absolute',left:75,top:550,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Edge: InPrivate · Chrome: Incognito</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={16.06} end={18.0} t={t}>
      <Interactive.Div name="05 · Ringkasan · Judul 1" className="whnTitle" style={{position:'absolute',left:67,top:330,width:935,fontSize:79,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>1 SHORTCUT</Interactive.Div>
      <Interactive.Div name="05 · Ringkasan · Judul 2" className="whnTitle" style={{position:'absolute',left:67,top:414,width:935,fontSize:79,fontWeight:950,color:'#9FF6C7',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>2 FUNGSI!</Interactive.Div>
      <Interactive.Div name="05 · Ringkasan · Subtitle" className="whnSub" style={{position:'absolute',left:75,top:550,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>File Explorer + Edge / Chrome</Interactive.Div>
    </EditablePhase>
   <Interactive.Div name="05 · Windows 11 demo monitor" className="whnMonitor" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:CFG.layout.monitorX,top:CFG.layout.monitorY,width:CFG.layout.monitorW,height:CFG.layout.monitorH,opacity:anim(t,.1,.5),transform:`scale(${.97+.03*windowIn})`,borderColor:borderTint}}>
     <div className="whnMonitorScreen"><div className="whnWallpaper"><div className="whnRibbon r1"/><div className="whnRibbon r2"/><div className="whnRibbon r3"/></div>
       <div className="whnExplorerMount" style={{opacity:1-browser,transform:`translateY(${browser*-22}px) scale(${1+.14*slowZoom})`}}><ExplorerUI t={t}/></div>
       <div className="whnEdgeMount" style={{opacity:browser,transform:`translateY(${(1-browser)*30}px) scale(${.98+.02*browser})`}}><BrowserUI t={t}/></div>
       <div className="whnTaskbar"><div className="whnWindowsTiles"><i/><i/><i/><i/></div><span className="whnSearchPill">⌕　Search</span><FolderIcon size={28}/><span className="whnEdgeSmall">e</span><span className="whnClock">ENG　⌁　10:28</span></div>
     </div>
     <div className="whnMonitorFooter"><span>●</span>{browser>.5?'MICROSOFT EDGE · INPRIVATE':'WINDOWS 11 · FILE EXPLORER'}<b>● LIVE DEMO</b></div>
   </Interactive.Div>
   <Interactive.Div name="05 · Context menu annotation" className="whnContextHint" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:147,top:1376,fontSize:21,fontWeight:850,color:"#ffc978",opacity:anim(t,1.55,1.95)*(1-anim(t,3.1,3.55))}}>KLIK KANAN → NEW → FOLDER? <strong>RIBET!</strong></Interactive.Div>
   <Keyboard t={t} frame={virtualFrame} fps={fps}/>
   <Focus t={t}/>
   <Keyboard t={t} frame={virtualFrame} fps={fps} browser/>
   <Interactive.Div name="05 · Browser extra tip" className="whnBrowserTip" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:98,top:1391,fontSize:23,fontWeight:800,color:"#7b91ae",opacity:anim(t,14.1,14.67)*(1-anim(t,16.05,16.35))}}><span>EDGE</span> INPRIVATE <i>·</i> <span>CHROME</span> INCOGNITO</Interactive.Div>
   <Recap t={t}/>
   <SuccessCue t={t} />
   <TimelineOverlay t={t} />
   <Interactive.Div name="05 · Loading Demo · Jalur" className="whnProgress" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:120,top:1694,width:840,height:4}}><Interactive.Div name="05 · Loading Demo · Isi" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:`${Math.min(100,frame/540*100)}%`}}/></Interactive.Div>
   
 </AbsoluteFill>;
};
