import {useSfxControls} from '../../editor/LayerVars';
import {useCopy} from '../../editor/TextOverrides';
import {layerStyle} from '../../editor/LayerStyling';
import React from 'react';
import {AbsoluteFill,Audio,Interactive,Easing,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {CONFIG} from './config/video';
import {Desktop,Cursor} from './components/Desktop';
import {TaskManager} from './components/TaskManager';
import './styles.css';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(v:number)=>Easing.inOut(Easing.cubic)(clamp(v));
const p=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const lerp=(a:number,b:number,x:number)=>a+(b-a)*x;
const PHASES=[
 {id:'problem',from:0,to:1.65,top:CONFIG.text.problemTop,bottom:CONFIG.text.problemBottom,sub:CONFIG.text.problemSub,color:'#FCA5A5'},
 {id:'hotkey',from:1.40,to:3.52,top:CONFIG.text.hotkeyTop,bottom:CONFIG.text.hotkeyBottom,sub:CONFIG.text.hotkeySub,color:'#67E8F9'},
 {id:'demo',from:3.22,to:7.60,top:CONFIG.text.demoTop,bottom:CONFIG.text.demoBottom,sub:CONFIG.text.demoSub,color:'#67E8F9'},
 {id:'result',from:7.42,to:10.1,top:CONFIG.text.endTop,bottom:CONFIG.text.endBottom,sub:CONFIG.text.endSub,color:'#A8FFCF'}
] as const;
const TitlePhase:React.FC<{phase:typeof PHASES[number];t:number}>=({phase,t})=>{
  const text=useCopy();
 const appear=p(t,phase.from,phase.from+.36),disappear=p(t,phase.to-.32,phase.to);
 const opacity=appear*(1-disappear);const dy=(1-appear)*33-disappear*19;
 return <>
  <Interactive.Div name={'02 — Title '+phase.id} className="whecMainTitle" style={{...layerStyle('title-'+phase.id),left:CONFIG.layout.titleX,top:CONFIG.layout.titleY,opacity,transform:`translateY(${dy}px)`}}><div>{text("title-"+phase.id+"-top",phase.top)}</div><div style={{color:phase.color}}>{text("title-"+phase.id+"-bottom",phase.bottom)}</div></Interactive.Div>
  <Interactive.Div name={'02 — Subtitle '+phase.id} className="whecSubTitle" style={{...layerStyle('subtitle-'+phase.id),left:CONFIG.layout.subtitleX,top:CONFIG.layout.subtitleY,opacity,transform:`translateY(${dy*.5}px)`}}>{text("subtitle-"+phase.id,phase.sub)}</Interactive.Div>
 </>;
};
const Key:React.FC<{value:string;active:number}>=({value,active})=><div className="whecKeyShell"><div className="whecKeyTop" style={{transform:`translateY(${active*8}px)`,background:active>.10?'linear-gradient(180deg,#1bace9,#12679a)':'linear-gradient(180deg,#344b63,#162a42)',boxShadow:active>.10?'inset 0 2px 14px #7fe9ff88, 0 2px 1px #07395b':'inset 0 1px 0 #aad1ed70,0 8px 2px #07172a'}}>{value}</div></div>;
const Keyboard:React.FC<{t:number;frame:number;fps:number}>=({t,frame,fps})=>{
 const a=p(t,CONFIG.timing.hotkey,CONFIG.timing.hotkey+.34)*(1-p(t,3.10,3.55));
 const s=spring({frame:Math.max(0,frame-CONFIG.timing.hotkey*fps),fps,config:{damping:16,stiffness:115,mass:.78}});
 const active=p(t,CONFIG.timing.keyPress,CONFIG.timing.keyPress+.13)*(1-p(t,CONFIG.timing.keyPress+.32,CONFIG.timing.keyPress+.55));
 return <Interactive.Div name="02 — Keyboard Ctrl + Shift + Esc" className="whecKeyboard" style={{...layerStyle('keyboard'),left:CONFIG.layout.keyboardX,top:CONFIG.layout.keyboardY,opacity:a,transform:`translateY(${(1-s)*65}px) scale(${.94+.06*s})`}}><Key value="CTRL" active={active}/><span>+</span><Key value="SHIFT" active={active}/><span>+</span><Key value="ESC" active={active}/></Interactive.Div>;
};
const MAG={w:894,h:225};
const Magnify:React.FC<{t:number}>=({t})=>{
 const a=p(t,4.77,5.16)*(1-p(t,7.23,7.56));
 const swap=p(t,5.85,6.20);
 // The entire TaskManager component is reused and enlarged instead of a rasterized screenshot.
 const scale=CONFIG.zoom.scale;
 const left=-lerp(CONFIG.zoom.rowCropX,CONFIG.zoom.buttonCropX,swap)*scale;
 const top=-lerp(CONFIG.zoom.rowCropY,CONFIG.zoom.buttonCropY,swap)*scale;
 
 const press=p(t,6.80,6.89)*(1-p(t,7.00,7.15));
 return <Interactive.Div name="02 — ZOOM DETAIL (reusable component)" className="whecZoom" style={{...layerStyle('zoom'),left:CONFIG.layout.zoomX,top:CONFIG.layout.zoomY,width:CONFIG.layout.zoomW,height:CONFIG.layout.zoomH,opacity:a,transform:`translateY(${(1-a)*35}px) scale(${.95+.05*a})`}}>
    <div className="whecZoomHead"><span className="whecZoomLive"/> ZOOM DETAIL <span className="whecZoomPhase">{swap<.5?'01 — PILIH APLIKASI MACET':'02 — KLIK END TASK'}</span><strong>2.1×</strong></div>
    <div className="whecZoomViewport"><div className="whecZoomManager" style={{left,top,transform:`scale(${scale})`}}><TaskManager time={t}/></div></div>
    <div className="whecZoomCursor" style={{left:lerp(428,449,swap),top:lerp(137,171,swap),opacity:t<7.18?1:0}}><svg viewBox="0 0 33 46" width="37" height="51"><path d="M3 2v34l8.6-9.2 7.5 14.8 7.2-3.6-7.7-14.2H31L3 2Z" fill="white" stroke="#111b27" strokeLinejoin="round" strokeWidth="2.6"/></svg>{press>.05&&<div className="whecZoomRing" style={{opacity:1-press,transform:`scale(${.45+press*.95})`}}/>}</div>
 </Interactive.Div>;
};
export const Video:React.FC=()=>{
 const sfx=useSfxControls();
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const begin=spring({frame:Math.max(0,frame-5),fps,config:{damping:20,stiffness:80,mass:.9}});
 const zoomIn=p(t,3.31,3.85)*(1-p(t,7.10,7.55));
 const zoomScale=.945+.055*begin+.036*zoomIn;
 const m=CONFIG.manager;
 const tx=p(t,4.03,4.68),ty=p(t,5.45,6.63);
 const cursorX=t<5.45?lerp(690,330,tx):lerp(330,662,ty);
 const cursorY=t<5.45?lerp(432,359,tx):lerp(359,181,ty);
 const pointerPress=t>=6.82&&t<7.06;
 const hint=p(t,4.53,4.95)*(1-p(t,6.0,6.4));
 const check=p(t,7.36,7.88);
 return <AbsoluteFill className="whecRoot" style={{background:CONFIG.colors.bg,fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}>
    <div className="whecGrid"/><div className="whecGlowOne"/><div className="whecGlowTwo"/>
    <div className="whecOutline"/>
    <Interactive.Div name="02 — Windows Hacks episode badge" className="whecTopLabel" style={{...layerStyle('badge'),left:CONFIG.layout.kickerX,top:CONFIG.layout.kickerY}}><span className="whecIndicator"/> {CONFIG.text.kicker}<span className="whecEpNumber">{CONFIG.text.episode}</span></Interactive.Div>
    <TitlePhase phase={PHASES[0]} t={t}/><TitlePhase phase={PHASES[1]} t={t}/><TitlePhase phase={PHASES[2]} t={t}/><TitlePhase phase={PHASES[3]} t={t}/>
    <Interactive.Div name="02 — Editable Windows desktop" className="whecMonitor" style={{...layerStyle('window'),left:CONFIG.layout.monitorX,top:CONFIG.layout.monitorY,width:CONFIG.layout.monitorW,height:CONFIG.layout.monitorH,opacity:p(t,.04,.51),transform:`scale(${zoomScale})`}}>
      <div className="whecMonitorScreen"><Desktop time={t}/><Cursor x={cursorX} y={cursorY} pressed={pointerPress} visible={t>3.45&&t<7.19}/></div>
      <div className="whecMonitorFooter"><span className="whecFooterLed"/> WINDOWS 11 · TASK MANAGER <span className="whecFooterLive">● LIVE DEMO</span></div>
    </Interactive.Div>
    <Keyboard t={t} frame={frame} fps={fps}/>
    <Interactive.Div name="02 — Select frozen app tip" className="whecHint" style={{...layerStyle('annotation'),opacity:hint,transform:`translateY(${(1-hint)*15}px)`}}><span className="whecHintBullet"/> PILIH YANG BERSTATUS NOT RESPONDING <span>↗</span></Interactive.Div>
    <Magnify t={t}/>
    <Interactive.Div name="02 — Result success card" className="whecSuccess" style={{...layerStyle('success'),opacity:check,transform:`translateY(${(1-check)*55}px) scale(${.94+.06*check})`}}><div className="whecSuccessCheck">✓</div><div><small>TASK MANAGER</small><b>APLIKASI BERHASIL DITUTUP!</b><span>End task · selesai</span></div></Interactive.Div>
    <div className="whecProgress"><div style={{width:`${100*p(t,.2,9.78)}%`}}/></div>
    {CONFIG.sound.enabled&&<Audio name="Audio — Keypress + Zoom + Click" src={staticFile('videos/windows-hacks-5-shortcut-lengkap/02-ctrl-shift-esc/audio/ctrl-shift-esc-sfx.wav')} volume={sfx.sfxEnabled?sfx.sfxVolume:0}/>}
 </AbsoluteFill>;
};
