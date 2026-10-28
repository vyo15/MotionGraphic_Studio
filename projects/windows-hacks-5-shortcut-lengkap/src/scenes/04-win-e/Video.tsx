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
const Phase:React.FC<{phase:typeof phases[number];t:number}>=({phase,t})=>{
  const text=useCopy();
 const enter=p(t,phase.from,phase.from+.33),leave=p(t,phase.to-.30,phase.to);
 const visibility=enter*(1-leave),dy=(1-enter)*33-leave*19;
 return <>
 <Interactive.Div name={'04 — Title '+phase.id} className="wheMainTitle weV2Title" style={{...layerStyle('title-'+phase.id),left:CONFIG.layout.titleX,top:CONFIG.layout.titleY,opacity:visibility,transform:`translateY(${dy}px)`}}><div>{text("title-"+phase.id+"-top",phase.top)}</div><div style={{color:phase.color}}>{text("title-"+phase.id+"-bottom",phase.bottom)}</div></Interactive.Div>
 <Interactive.Div name={'04 — Subtitle '+phase.id} className="wheSubTitle weV2Subtitle" style={{...layerStyle('subtitle-'+phase.id),left:CONFIG.layout.subtitleX,top:CONFIG.layout.subtitleY,opacity:visibility,transform:`translateY(${dy*.6}px)`}}>{text("subtitle-"+phase.id,phase.sub)}</Interactive.Div>
 </>;
};
const Key:React.FC<{value:string;active:number;isWindows?:boolean}>=({value,active,isWindows})=><div className="wheKeyShell"><div className="wheKeyTop" style={{minWidth:isWindows?192:160,transform:`translateY(${8*active}px)`,background:active>.10?'linear-gradient(175deg,#25b7f4,#106993)':'linear-gradient(180deg,#344b63,#17273f)',boxShadow:active>.10?'inset 0 2px 14px #a0eafa99,0 2px 1px #173458':'inset 0 1px 0 #abd0ed70,0 8px 2px #07172a'}}>{isWindows?<><span className="weKeyWin"><i/><i/><i/><i/></span> WIN</>:value}</div></div>;
const Keyboard:React.FC<{t:number;frame:number;fps:number}>=({t,frame,fps})=>{
 const opacity=p(t,CONFIG.timing.keyShow,CONFIG.timing.keyShow+.25)*(1-p(t,3.10,3.51));
 const press=p(t,CONFIG.timing.keyPress,CONFIG.timing.keyPress+.11)*(1-p(t,CONFIG.timing.keyPress+.24,CONFIG.timing.keyPress+.48));
 const springIn=spring({frame:Math.max(0,frame-CONFIG.timing.keyShow*fps),fps,config:{damping:19,stiffness:105,mass:.9}});
 return <Interactive.Div name="04 — Shortcut keyboard Win + E" className="wheKeyboard weKeyboard" style={{...layerStyle('keyboard'),left:CONFIG.layout.keyboardX,top:CONFIG.layout.keyboardY,opacity,transform:`translateY(${(1-springIn)*55}px) scale(${.94+.06*springIn})`}}><Key value="WIN" isWindows active={press}/><span>+</span><Key value="E" active={press}/></Interactive.Div>;
};
const StatusCompare:React.FC<{t:number}>=({t})=>{
 const opacity=p(t,CONFIG.timing.arrange+.47,CONFIG.timing.arrange+.9)*(1-p(t,9.56,9.94));
 const shift=p(t,CONFIG.timing.downloadsClick,CONFIG.timing.downloadsClick+.23);
 return <Interactive.Div name="04 — Two folder status comparison" className="weV2Compare" style={{...layerStyle('comparison'),left:CONFIG.layout.compareX,top:CONFIG.layout.compareY,width:CONFIG.layout.compareW,opacity,transform:`translateY(${(1-opacity)*28}px)`}}>
  <div className="weV2CompareHead"><span className="weV2LiveDot"/> TERBUKTI: DUA WINDOW, DUA FOLDER <span>WIN + E</span></div>
  <div className="weV2Cards">
   <Interactive.Div name="04 — Folder lama tetap terbuka" className="weV2StatusCard weV2OldStatus" style={{...layerStyle('other'),opacity:1}}><span className="weV2StatusIndex">01 · SEBELUM</span><div className="weV2StatusFolder"><Folder size={38} kind="Documents"/><b>{CONFIG.text.oldFolder}</b></div><div className="weV2Pill">✓ TETAP TERBUKA</div></Interactive.Div>
   <Interactive.Div name="04 — Folder baru siap digunakan" className="weV2StatusCard weV2NewStatus" style={{...layerStyle('other'),opacity:1}}><span className="weV2StatusIndex">02 · SESUDAH</span><div className="weV2StatusFolder"><Folder size={38} kind={shift>.5?'Downloads':'folder'}/><b>{shift>.5?CONFIG.text.newFolder:'Home'}</b></div><div className="weV2Pill">✓ JENDELA BARU</div></Interactive.Div>
  </div>
 </Interactive.Div>;
};
export const Video:React.FC=()=>{
 const sfx=useSfxControls();
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=frame/fps;
 const enter=spring({frame:Math.max(0,frame-2),fps,config:{damping:18,stiffness:95,mass:.82}});
 const showingTwo=p(t,CONFIG.timing.arrange,CONFIG.timing.arrange+.9);
 const monitorScale=.95+.05*enter+.027*showingTwo;
 const labelOpacity=p(t,.2,.6)*(1-p(t,1.64,1.95));
 const tagNew=p(t,3.41,3.77)*(1-p(t,5.05,5.50));
 const proof=p(t,7.53,7.93);
 return <AbsoluteFill className="wheRoot" style={{background:CONFIG.colors.bg,fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}>
  <div className="wheGrid"/><div className="wheGlowOne"/><div className="wheGlowTwo"/><div className="wheOutline"/>
  <Interactive.Div name="04 — Windows Hacks episode label" className="wheTopLabel" style={{...layerStyle('badge'),left:CONFIG.layout.kickerX,top:CONFIG.layout.kickerY}}><span className="wheIndicator"/>{CONFIG.text.kicker}<span className="wheEpNumber">{CONFIG.text.episode}</span></Interactive.Div>
  <Phase phase={phases[0]} t={t}/><Phase phase={phases[1]} t={t}/><Phase phase={phases[2]} t={t}/><Phase phase={phases[3]} t={t}/><Phase phase={phases[4]} t={t}/>
  <Interactive.Div name="04 — Realistic Windows 11 desktop" className="wheMonitor weV2Monitor" style={{...layerStyle('window'),left:CONFIG.layout.monitorX,top:CONFIG.layout.monitorY,width:CONFIG.layout.monitorW,height:CONFIG.layout.monitorH,opacity:p(t,.04,.48),transform:`scale(${monitorScale})`}}>
   <div className="wheMonitorScreen"><Desktop time={t}/></div>
   <div className="wheMonitorFooter"><span className="wheFooterLed"/> WINDOWS 11 · FILE EXPLORER <span className="wheFooterLive">● LIVE DEMO</span></div>
  </Interactive.Div>
  <Interactive.Div name="04 — Old folder annotation" className="weV2OldHint" style={{...layerStyle('annotation'),opacity:labelOpacity,transform:`translateY(${(1-labelOpacity)*23}px)`}}><span className="weV2Dot"/> FOLDER KERJA SUDAH TERBUKA <span>✓</span></Interactive.Div>
  <Interactive.Div name="04 — New window popup annotation" className="weV2NewHint" style={{...layerStyle('annotation'),opacity:tagNew,transform:`scale(${.91+.09*tagNew})`}}><span>＋</span> WINDOW BARU MUNCUL</Interactive.Div>
  <Keyboard t={t} frame={frame} fps={fps}/>
  <StatusCompare t={t}/>
  <Interactive.Div name="04 — Final reassurance" className="weV2ResultHint" style={{...layerStyle('success'),opacity:proof,transform:`translateY(${(1-proof)*14}px)`}}><span className="weV2Tick">✓</span><span>FOLDER PERTAMA TIDAK TERTUTUP</span></Interactive.Div>
  <div className="wheProgress"><div style={{width:`${100*p(t,.1,9.83)}%`}}/></div>
  {CONFIG.sound.enabled&&<Audio name="Audio — Win + E key / new window / snap" src={staticFile('videos/windows-hacks-5-shortcut-lengkap/04-win-e/audio/win-e-two-windows.wav')} volume={sfx.sfxEnabled?sfx.sfxVolume:0}/>}
 </AbsoluteFill>;
};
