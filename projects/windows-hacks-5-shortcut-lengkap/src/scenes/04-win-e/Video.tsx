import {useDemoFrame} from '../../editor/DemoClock';
import {useSfxControls} from '../../editor/LayerVars';
import {useCopy} from '../../editor/TextOverrides';
import {layerStyle} from '../../editor/LayerStyling';
import React from 'react';
import {AbsoluteFill,Audio,Interactive,Easing,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {CONFIG} from './config/video';
import {Desktop} from './components/Desktop';
import {Folder} from './components/ExplorerWindow';
import './styles.css';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(v:number)=>Easing.inOut(Easing.cubic)(clamp(v));
const p=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const phases=[
 {id:'problem',from:0,to:1.97,top:CONFIG.text.problemTop,bottom:CONFIG.text.problemBottom,sub:CONFIG.text.problemSub,color:'#FFCC77'},
 {id:'keyboard',from:1.70,to:3.68,top:CONFIG.text.hotkeyTop,bottom:CONFIG.text.hotkeyBottom,sub:CONFIG.text.hotkeySub,color:'#67E8F9'},
 {id:'new-window',from:3.35,to:5.26,top:CONFIG.text.demoTop,bottom:CONFIG.text.demoBottom,sub:CONFIG.text.demoSub,color:'#67E8F9'},
 {id:'two-windows',from:5.07,to:7.65,top:CONFIG.text.twoTop,bottom:CONFIG.text.twoBottom,sub:CONFIG.text.twoSub,color:'#93EEFF'},
 {id:'result',from:7.46,to:10.1,top:CONFIG.text.endTop,bottom:CONFIG.text.endBottom,sub:CONFIG.text.endSub,color:'#A8FFCF'}
] as const;
const EditablePhase:React.FC<{start:number;end:number;t:number;children:React.ReactNode}>=({start,end,t,children})=>{
 const enter=p(t,start,start+.34),leave=p(t,end-.34,end);
 const opacity=enter*(1-leave);const dy=(1-enter)*32-leave*18;
 return <div style={{position:'absolute',inset:0,opacity,transform:`translateY(${dy}px)`,pointerEvents:'none'}}>{children}</div>;
};

const Key:React.FC<{value:string;active:number;isWindows?:boolean}>=({value,active,isWindows})=><div className="wheKeyShell"><div className="wheKeyTop" style={{minWidth:isWindows?192:160,transform:`translateY(${8*active}px)`,background:active>.10?'linear-gradient(175deg,#25b7f4,#106993)':'linear-gradient(180deg,#344b63,#17273f)',boxShadow:active>.10?'inset 0 2px 14px #a0eafa99,0 2px 1px #173458':'inset 0 1px 0 #abd0ed70,0 8px 2px #07172a'}}>{isWindows?<><span className="weKeyWin"><i/><i/><i/><i/></span> WIN</>:value}</div></div>;
const Keyboard:React.FC<{t:number;frame:number;fps:number}>=({t,frame,fps})=>{
 const opacity=p(t,CONFIG.timing.keyShow,CONFIG.timing.keyShow+.25)*(1-p(t,3.10,3.51));
 const press=p(t,CONFIG.timing.keyPress,CONFIG.timing.keyPress+.11)*(1-p(t,CONFIG.timing.keyPress+.24,CONFIG.timing.keyPress+.48));
 const springIn=spring({frame:Math.max(0,frame-CONFIG.timing.keyShow*fps),fps,config:{damping:19,stiffness:105,mass:.9}});
 return <Interactive.Div name="04 · Shortcut keyboard Win + E" className="wheKeyboard weKeyboard" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:583,fontSize:44,left:248,top:1415,opacity,transform:`translateY(${(1-springIn)*55}px) scale(${.94+.06*springIn})`}}><Key value="WIN" isWindows active={press}/><span>+</span><Key value="E" active={press}/></Interactive.Div>;
};
const StatusCompare:React.FC<{t:number}>=({t})=>{
 const opacity=p(t,CONFIG.timing.arrange+.47,CONFIG.timing.arrange+.9)*(1-p(t,9.56,9.94));
 const shift=p(t,CONFIG.timing.downloadsClick,CONFIG.timing.downloadsClick+.23);
 return <Interactive.Div name="04 · Two folder status comparison" className="weV2Compare" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:79,top:1365,width:922,opacity,transform:`translateY(${(1-opacity)*28}px)`}}>
  <div className="weV2CompareHead"><span className="weV2LiveDot"/> TERBUKTI: DUA WINDOW, DUA FOLDER <span>WIN + E</span></div>
  <div className="weV2Cards">
   <Interactive.Div name="04 · Folder lama tetap terbuka" className="weV2StatusCard weV2OldStatus" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:137,opacity:1}}><span className="weV2StatusIndex">01 · SEBELUM</span><div className="weV2StatusFolder"><Folder size={38} kind="Documents"/><b>{CONFIG.text.oldFolder}</b></div><div className="weV2Pill">✓ TETAP TERBUKA</div></Interactive.Div>
   <Interactive.Div name="04 · Folder baru siap digunakan" className="weV2StatusCard weV2NewStatus" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:137,opacity:1}}><span className="weV2StatusIndex">02 · SESUDAH</span><div className="weV2StatusFolder"><Folder size={38} kind={shift>.5?'Downloads':'folder'}/><b>{shift>.5?CONFIG.text.newFolder:'Home'}</b></div><div className="weV2Pill">✓ JENDELA BARU</div></Interactive.Div>
  </div>
 </Interactive.Div>;
};
export const Video:React.FC=()=>{
 const sfx=useSfxControls();
 const frame=useDemoFrame(),{fps}=useVideoConfig(),t=frame/fps;
 const enter=spring({frame:Math.max(0,frame-2),fps,config:{damping:18,stiffness:95,mass:.82}});
 const showingTwo=p(t,CONFIG.timing.arrange,CONFIG.timing.arrange+.9);
 const monitorScale=.95+.05*enter+.027*showingTwo;
 const labelOpacity=p(t,.2,.6)*(1-p(t,1.64,1.95));
 const tagNew=p(t,3.41,3.77)*(1-p(t,5.05,5.50));
 const proof=p(t,7.53,7.93);
 return <AbsoluteFill className="wheRoot" style={{background:CONFIG.colors.bg,fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}>
  <div className="wheGrid"/><div className="wheGlowOne"/><div className="wheGlowTwo"/><div className="wheOutline"/>
  <Interactive.Div name="04 · Windows Hacks episode label" className="wheTopLabel" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:930,fontSize:19,fontWeight:850,color:"#72dff1",letterSpacing:3.7,left:74,top:268}}><span className="wheIndicator"/><Interactive.Div name="04 · Badge · WINDOWS HACKS" style={{display:"inline-block",translate:"0px 0px",scale:1,rotate:"0deg"}}>WINDOWS HACKS</Interactive.Div><Interactive.Div name="04 · Badge · 04 / 05" className="wheEpNumber" style={{display:"inline-block",translate:"0px 0px",scale:1,rotate:"0deg"}}>04 / 05</Interactive.Div></Interactive.Div>
    <EditablePhase start={0} end={1.97} t={t}>
      <Interactive.Div name="04 · Masalah · Judul 1" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:332,width:935,fontSize:78,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>FOLDER LAMA</Interactive.Div>
      <Interactive.Div name="04 · Masalah · Judul 2" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:425,width:935,fontSize:78,fontWeight:950,color:'#FFCC77',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>MASIH DIPAKAI?</Interactive.Div>
      <Interactive.Div name="04 · Masalah · Subtitle" className="wheSubTitle weV2Subtitle" style={{position:'absolute',left:76,top:553,width:922,fontSize:29,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Mau cari file lain tanpa menutupnya?</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={1.7} end={3.68} t={t}>
      <Interactive.Div name="04 · Shortcut · Judul 1" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:332,width:935,fontSize:78,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>NGGAK USAH</Interactive.Div>
      <Interactive.Div name="04 · Shortcut · Judul 2" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:425,width:935,fontSize:78,fontWeight:950,color:'#67E8F9',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>DITUTUP!</Interactive.Div>
      <Interactive.Div name="04 · Shortcut · Subtitle" className="wheSubTitle weV2Subtitle" style={{position:'absolute',left:76,top:553,width:922,fontSize:29,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Cukup tekan Win + E di keyboard.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={3.35} end={5.26} t={t}>
      <Interactive.Div name="04 · Jendela Baru · Judul 1" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:332,width:935,fontSize:78,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>FILE EXPLORER</Interactive.Div>
      <Interactive.Div name="04 · Jendela Baru · Judul 2" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:425,width:935,fontSize:78,fontWeight:950,color:'#67E8F9',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>BARU TERBUKA!</Interactive.Div>
      <Interactive.Div name="04 · Jendela Baru · Subtitle" className="wheSubTitle weV2Subtitle" style={{position:'absolute',left:76,top:553,width:922,fontSize:29,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Jendela pertama tetap terbuka.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={5.07} end={7.65} t={t}>
      <Interactive.Div name="04 · Dua Jendela · Judul 1" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:332,width:935,fontSize:78,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>DUA FOLDER</Interactive.Div>
      <Interactive.Div name="04 · Dua Jendela · Judul 2" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:425,width:935,fontSize:78,fontWeight:950,color:'#93EEFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>SEKALIGUS!</Interactive.Div>
      <Interactive.Div name="04 · Dua Jendela · Subtitle" className="wheSubTitle weV2Subtitle" style={{position:'absolute',left:76,top:553,width:922,fontSize:29,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Bisa pindah-pindah tanpa kehilangan folder.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={7.46} end={10.1} t={t}>
      <Interactive.Div name="04 · Hasil · Judul 1" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:332,width:935,fontSize:78,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>FOLDER LAMA</Interactive.Div>
      <Interactive.Div name="04 · Hasil · Judul 2" className="wheMainTitle weV2Title" style={{position:'absolute',left:68,top:425,width:935,fontSize:78,fontWeight:950,color:'#A8FFCF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>TETAP AMAN!</Interactive.Div>
      <Interactive.Div name="04 · Hasil · Subtitle" className="wheSubTitle weV2Subtitle" style={{position:'absolute',left:76,top:553,width:922,fontSize:29,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Win + E = buka jendela Explorer baru.</Interactive.Div>
    </EditablePhase>
  <Interactive.Div name="04 · Realistic Windows 11 desktop" className="wheMonitor weV2Monitor" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:61,top:663,width:958,height:653,opacity:p(t,.04,.48),transform:`scale(${monitorScale})`}}>
   <div className="wheMonitorScreen"><Desktop time={t}/></div>
   <div className="wheMonitorFooter"><span className="wheFooterLed"/> WINDOWS 11 · FILE EXPLORER <span className="wheFooterLive">● LIVE DEMO</span></div>
  </Interactive.Div>
  <Interactive.Div name="04 · Old folder annotation" className="weV2OldHint" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:108,top:1368,fontSize:20,fontWeight:850,color:"#ffda97",opacity:labelOpacity,transform:`translateY(${(1-labelOpacity)*23}px)`}}><span className="weV2Dot"/> FOLDER KERJA SUDAH TERBUKA <span>✓</span></Interactive.Div>
  <Interactive.Div name="04 · New window popup annotation" className="weV2NewHint" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:270,top:1360,fontSize:23,fontWeight:880,color:"#e4faff",opacity:tagNew,transform:`scale(${.91+.09*tagNew})`}}><span>＋</span> WINDOW BARU MUNCUL</Interactive.Div>
  <Keyboard t={t} frame={frame} fps={fps}/>
  <StatusCompare t={t}/>
  <Interactive.Div name="04 · Final reassurance" className="weV2ResultHint" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:211,top:1602,fontSize:21,fontWeight:900,color:"#b4ffe0",opacity:proof,transform:`translateY(${(1-proof)*14}px)`}}><span className="weV2Tick">✓</span><span>FOLDER PERTAMA TIDAK TERTUTUP</span></Interactive.Div>
  <Interactive.Div name="04 · Loading Demo · Jalur" className="wheProgress" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:120,width:840}}><Interactive.Div name="04 · Loading Demo · Isi" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:`${100*p(t,.1,9.83)}%`}}/></Interactive.Div>
  
 </AbsoluteFill>;
};
