import React from 'react';
import {AbsoluteFill,Audio,Easing,Interactive,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {CONFIG} from './config/video';
import {Desktop} from './components/Desktop';
import {Pointer,WindowsIcon} from './components/Icons';
import './styles.css';

const cap=(v:number)=>Math.max(0,Math.min(1,v));
const get=(t:number,from:number,to:number)=>cap((t-from)/(to-from));
const ease=(v:number)=>Easing.inOut(Easing.cubic)(cap(v));

type TitlePhase={id:string;start:number;end:number;top:string;bottom:string;subtitle:string;highlight:string};
const phases:TitlePhase[]=[
 {id:'problem',start:0,end:1.80,top:CONFIG.text.problemTop,bottom:CONFIG.text.problemBottom,subtitle:CONFIG.text.subtitleProblem,highlight:'#64ECF5'},
 {id:'hotkey',start:1.37,end:3.43,top:CONFIG.text.shortcutTop,bottom:CONFIG.text.shortcutBottom,subtitle:CONFIG.text.subtitleShortcut,highlight:'#A8D7FF'},
 {id:'selecting',start:3.05,end:6.76,top:CONFIG.text.selectingTop,bottom:CONFIG.text.selectingBottom,subtitle:CONFIG.text.subtitleSelecting,highlight:'#64ECF5'},
 {id:'result',start:6.45,end:10,top:CONFIG.text.resultTop,bottom:CONFIG.text.resultBottom,subtitle:CONFIG.text.subtitleResult,highlight:'#AAFFC5'},
];
const TitleCard:React.FC<{phase:TitlePhase;time:number}> = ({phase,time})=>{
 const incoming=ease(get(time,phase.start,phase.start+.34));
 const outgoing=ease(get(time,phase.end-.35,phase.end));
 const opacity=incoming*(1-outgoing);
 const y=(1-incoming)*30-outgoing*20;
 return <>
   <Interactive.Div name={'S03 — Title '+phase.id} className="wssTitle" style={{left:CONFIG.layout.titleX,top:CONFIG.layout.titleY,opacity,transform:`translateY(${y}px)`}}>
      <div>{phase.top}</div><div style={{color:phase.highlight}}>{phase.bottom}</div>
   </Interactive.Div>
   <Interactive.Div name={'S03 — Subtitle '+phase.id} className="wssSubtitle" style={{left:CONFIG.layout.subtitleX,top:CONFIG.layout.subtitleY,opacity,transform:`translateY(${y*.6}px)`}}>{phase.subtitle}</Interactive.Div>
 </>;
};

const Key:React.FC<{text:string;active:number;windows?:boolean}> = ({text,active,windows}) => (
 <div className="wssKeyBase"><div className="wssKeyTop" style={{transform:`translateY(${active*7}px)`,boxShadow:active>.1?'inset 0 0 28px #69DDFB65, 0 5px 2px #173854':'inset 0 1px 0 #9BC4DF50, 0 8px 2px #0D263D',background:active>.1?'linear-gradient(180deg,#2097D1,#145885)':'linear-gradient(175deg,#344E6A,#1E334D)'}}>
 {windows?<WindowsIcon size={42}/>:text}
 </div></div>
);
const Keyboard:React.FC<{time:number}> = ({time})=>{
 const a=CONFIG.timeline;
 const visibility=ease(get(time,a.hotkey,a.hotkey+.40))*(1-ease(get(time,3.20,3.66))); // keycaps berakhir saat close-up mulai
 const bounce=spring({fps:30,frame:Math.max(0,(time-a.hotkey)*30),config:{damping:13,stiffness:105,mass:.85}});
 const active=ease(get(time,a.press,a.press+.16))*(1-ease(get(time,a.press+.36,a.press+.60)));
 return <Interactive.Div name="S03 — Keyboard individual keys" className="wssKeyboard" style={{left:CONFIG.layout.keysX,top:CONFIG.layout.keysY,opacity:visibility,transform:`translateY(${(1-bounce)*60}px) scale(${.93+.07*bounce})`}}>
 <Key text="WIN" windows active={active}/><span className="wssPlus">+</span><Key text="SHIFT" active={active}/><span className="wssPlus">+</span><Key text="S" active={active}/>
 </Interactive.Div>;
};

/** Close-up independen berisi komponen Desktop/Pointer yang sama, bukan footage flatten. */
const DetailZoom:React.FC<{time:number;x:number;y:number;pointerVisible:boolean;onCross:boolean;pointerClick:number}> = ({time,x,y,pointerVisible,onCross,pointerClick})=>{
 const appear=ease(get(time,3.42,3.82));
 const exit=ease(get(time,7.03,7.40));
 const opacity=appear*(1-exit);
 const bounce=spring({frame:Math.max(0,(time-3.42)*30),fps:30,config:{damping:18,stiffness:108,mass:0.9}});
 const show=opacity>.001;
 if(!show)return null;
 return <Interactive.Div name="S03 — ZOOM DETAIL area screenshot (editable)" className="wssDetailZoom" style={{left:CONFIG.layout.zoomX,top:CONFIG.layout.zoomY,width:CONFIG.layout.zoomW,height:CONFIG.layout.zoomH,opacity,transform:`translateY(${(1-bounce)*48}px) scale(${0.95+0.05*bounce})`}}>
   <div className="wssDetailHeader"><span className="wssDetailPulse"/> <span>ZOOM DETAIL</span><span className="wssDetailStep">DRAG UNTUK SCREENSHOT</span><span className="wssDetailPower">1.4×</span></div>
   <div className="wssDetailViewport">
     <div className="wssDetailScaled" style={{left:CONFIG.zoom.cropLeft,top:CONFIG.zoom.cropTop,transform:`scale(${CONFIG.zoom.scale})`}}>
       <Desktop time={time}/>
       <Pointer x={x} y={y} visible={pointerVisible} crosshair={onCross} click={pointerClick}/>
     </div>
   </div>
 </Interactive.Div>;
};

const ResultGraphic:React.FC<{time:number}> = ({time})=>{
 const a=CONFIG.timeline;
 const p=ease(get(time,a.result,a.result+.55));
 const tail=cap((time-a.result)/2.2);
 return <Interactive.Div name="S03 — Screenshot result / clipboard" className="wssResult" style={{opacity:p,transform:`translateY(${(1-p)*95}px) scale(${.74+.26*p+Math.sin(tail*Math.PI)*.018})`}}>
  <div className="wssResultIcon"><svg width="53" height="53" viewBox="0 0 48 48" fill="none"><rect x="7" y="12" width="28" height="26" rx="4" stroke="#94F2C1" strokeWidth="3"/><path d="M16 10V8a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v23" stroke="#94F2C1" strokeWidth="3"/><path d="m15 26 6 6 12-15" stroke="#94F2C1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
  <div className="wssResultCopy"><div className="wssResultSmall">SNIPPING TOOL</div><div className="wssResultMain">Copied to clipboard!</div><div className="wssResultDesc">{CONFIG.text.finalNote}</div></div>
  <div className="wssResultTick">✓</div>
 </Interactive.Div>;
};

/** Composition untuk preview dan render. Semuanya frame-based, tanpa video/gambar yang di-flatten. */
export const Video:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig(); const time=frame/fps;
 const a=CONFIG.timeline;
 const entrance=spring({frame:Math.max(0,frame-10),fps,config:{damping:16,stiffness:78,mass:1}});
 const zoomIn=ease(get(time,a.overlay+.12,a.selectionStart+.25));
 const zoomOut=ease(get(time,a.capture-.1,a.capture+.62));
 const screenScale=(.935+.065*entrance)*(1+.062*zoomIn*(1-zoomOut));
 const drag=ease(get(time,a.selectionStart,a.selectionEnd));
 const x=CONFIG.selection.startX+(CONFIG.selection.endX-CONFIG.selection.startX)*drag;
 const y=CONFIG.selection.startY+(CONFIG.selection.endY-CONFIG.selection.startY)*drag;
 const pointerVisible=time>=a.overlay+.17&&time<a.capture-.03;
 const onCross=time>=a.overlay+.3;
 const pointerClick=get(time,a.selectionStart,a.selectionStart+.13)*(1-get(time,a.selectionStart+.12,a.selectionStart+.33));
 const helperVisibility=ease(get(time,3.5,4.02))*(1-ease(get(time,6.05,6.36)));
 return <AbsoluteFill className="wssRoot" style={{background:CONFIG.colors.bg,fontFamily:CONFIG.typography.font,color:CONFIG.colors.text}}>
  <div className="wssGrid"/><div className="wssGlowA"/><div className="wssGlowB"/>
  <div className="wssOuterFrame"/>
  <Interactive.Div name="S03 — Episode Label" className="wssKicker" style={{top:CONFIG.layout.kickerY,left:CONFIG.layout.kickerX}}><div className="wssMiniCircle"/><span>{CONFIG.text.kicker}</span><span className="wssKickerEpisode">{CONFIG.text.episode}</span></Interactive.Div>
  {phases.map(x=><TitleCard key={x.id} phase={x} time={time}/>)}
  <Interactive.Div name="S03 — Windows 11 editable desktop" className="wssMonitor" style={{left:CONFIG.layout.monitorX,top:CONFIG.layout.monitorY,width:CONFIG.layout.monitorW,height:CONFIG.layout.monitorH,opacity:interpolate(frame,[0,16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),transform:`scale(${screenScale})`}}>
    <div className="wssMonitorScreen"><Desktop time={time}/><Pointer x={x} y={y} visible={pointerVisible} crosshair={onCross} click={pointerClick}/></div>
    <div className="wssMonitorBar"><div className="wssMonitorLed"/><div className="wssMonitorBrand">WINDOWS 11 · SCREEN CAPTURE</div><span>● LIVE DEMO</span></div>
  </Interactive.Div>
  <Interactive.Div name="S03 — Drag instruction" className="wssDragHint" style={{opacity:helperVisibility,transform:`translateY(${(1-helperVisibility)*16}px)`}}><span className="wssHintDot"/> PILIH AREA YANG MAU DIAMBIL <span className="wssHintArrow">↗</span></Interactive.Div>
  <Keyboard time={time}/>
  <DetailZoom time={time} x={x} y={y} pointerVisible={pointerVisible} onCross={onCross} pointerClick={pointerClick}/>
  <ResultGraphic time={time}/>
  <div className="wssBottomGlimmer"/>
  <div className="wssStepLine"><div className="wssStepFill" style={{width:`${100*ease(get(time,.3,9.8))}%`}}/></div>
  {CONFIG.sound.enabled&&<Audio name="Audio — Shortcut SFX (editable)" src={staticFile('videos/windows-shortcut-win-shift-s-pro-v2/audio/win-shift-s-sfx.wav')} volume={CONFIG.sound.volume}/>}
 </AbsoluteFill>;
};
