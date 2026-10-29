import {useDemoFrame} from '../../editor/DemoClock';
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
const EditablePhase:React.FC<{start:number;end:number;t:number;children:React.ReactNode}>=({start,end,t,children})=>{
 const enter=p(t,start,start+.34),leave=p(t,end-.34,end);
 const opacity=enter*(1-leave);const dy=(1-enter)*32-leave*18;
 return <div style={{position:'absolute',inset:0,opacity,transform:`translateY(${dy}px)`,pointerEvents:'none'}}>{children}</div>;
};

const Key:React.FC<{value:string;active:number}>=({value,active})=><div className="whecKeyShell"><div className="whecKeyTop" style={{transform:`translateY(${active*8}px)`,background:active>.10?'linear-gradient(180deg,#1bace9,#12679a)':'linear-gradient(180deg,#344b63,#162a42)',boxShadow:active>.10?'inset 0 2px 14px #7fe9ff88, 0 2px 1px #07395b':'inset 0 1px 0 #aad1ed70,0 8px 2px #07172a'}}>{value}</div></div>;
const Keyboard:React.FC<{t:number;frame:number;fps:number}>=({t,frame,fps})=>{
 const a=p(t,CONFIG.timing.hotkey,CONFIG.timing.hotkey+.34)*(1-p(t,3.10,3.55));
 const s=spring({frame:Math.max(0,frame-CONFIG.timing.hotkey*fps),fps,config:{damping:16,stiffness:115,mass:.78}});
 const active=p(t,CONFIG.timing.keyPress,CONFIG.timing.keyPress+.13)*(1-p(t,CONFIG.timing.keyPress+.32,CONFIG.timing.keyPress+.55));
 return <Interactive.Div name="02 · Keyboard Ctrl + Shift + Esc" className="whecKeyboard" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:890,left:95,top:1402,opacity:a,transform:`translateY(${(1-s)*65}px) scale(${.94+.06*s})`}}><Key value="CTRL" active={active}/><span>+</span><Key value="SHIFT" active={active}/><span>+</span><Key value="ESC" active={active}/></Interactive.Div>;
};
const MAG={w:894,h:225};
const Magnify:React.FC<{t:number}>=({t})=>{
 const a=p(t,4.77,5.16)*(1-p(t,7.23,7.56));
 const swap=p(t,5.85,6.20);
 // The entire TaskManager component is reused and enlarged instead of a rasterized screenshot.
 const scale=CONFIG.zoom.scale;
 const cropX=lerp(CONFIG.zoom.rowCropX,CONFIG.zoom.buttonCropX,swap);
 const cropY=lerp(CONFIG.zoom.rowCropY,CONFIG.zoom.buttonCropY,swap);
 const left=-cropX*scale;
 const top=-cropY*scale;
 // Projeksi posisi kursor memakai target dari CONFIG yang sama dengan cursor desktop.
 // Offset +10/+66 berasal dari viewport dalam panel magnifier.
 const targetX=lerp(CONFIG.cursorTargets.excelRow.x,CONFIG.cursorTargets.endTask.x,swap);
 const targetY=lerp(CONFIG.cursorTargets.excelRow.y,CONFIG.cursorTargets.endTask.y,swap);
 const zoomPointerX=10+(targetX-CONFIG.manager.left-cropX)*scale;
 const zoomPointerY=66+(targetY-CONFIG.manager.top-cropY)*scale;
 
 const press=p(t,6.80,6.89)*(1-p(t,7.00,7.15));
 return <Interactive.Div
  name="02 · ZOOM DETAIL (reusable component)"
  className="whecZoom"
  style={{
   translate: '16.8px 126px',
   scale: 1,
   rotate: '0deg',
   transformOrigin: '50% 50%',
   left: 82,
   top: 1210,
   width: 916,
   height: 332,
   opacity: a,
   transform: `translateY(${(1 - a) * 35}px) scale(${.95 + .05 * a})`
  }}
 >
    <div className="whecZoomHead"><span className="whecZoomLive"/> ZOOM DETAIL <span className="whecZoomPhase">{swap<.5?'01 — PILIH APLIKASI MACET':'02 · KLIK END TASK'}</span><strong>2.1×</strong></div>
    <div className="whecZoomViewport"><div className="whecZoomManager" style={{left,top,transform:`scale(${scale})`}}><TaskManager time={t}/></div></div>
    <div className="whecZoomCursor" style={{...layerStyle("cursor-zoom"),left:zoomPointerX,top:zoomPointerY,opacity:t<7.18?1:0}}><svg viewBox="0 0 33 46" width="37" height="51"><path d="M3 2v34l8.6-9.2 7.5 14.8 7.2-3.6-7.7-14.2H31L3 2Z" fill="white" stroke="#111b27" strokeLinejoin="round" strokeWidth="2.6"/></svg>{press>.05&&<div className="whecZoomRing" style={{opacity:1-press,transform:`scale(${.45+press*.95})`}}/>}</div>
 </Interactive.Div>;
};
export const Video:React.FC=()=>{
 const sfx=useSfxControls();
 const frame=useDemoFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const begin=spring({frame:Math.max(0,frame-5),fps,config:{damping:20,stiffness:80,mass:.9}});
 const zoomIn=p(t,3.31,3.85)*(1-p(t,7.10,7.55));
 const zoomScale=.945+.055*begin+.036*zoomIn;
 const m=CONFIG.manager;
 const tx=p(t,4.03,4.68),ty=p(t,5.45,6.63);
 const cursorX=t<5.45?lerp(690,CONFIG.cursorTargets.excelRow.x,tx):lerp(CONFIG.cursorTargets.excelRow.x,CONFIG.cursorTargets.endTask.x,ty);
 const cursorY=t<5.45?lerp(432,CONFIG.cursorTargets.excelRow.y,tx):lerp(CONFIG.cursorTargets.excelRow.y,CONFIG.cursorTargets.endTask.y,ty);
 const pointerPress=t>=6.82&&t<7.06;
 const hint=p(t,4.53,4.95)*(1-p(t,6.0,6.4));
 const check=p(t,7.36,7.88);
 return <AbsoluteFill className="whecRoot" style={{background:CONFIG.colors.bg,fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}>
    <div className="whecGrid"/><div className="whecGlowOne"/><div className="whecGlowTwo"/>
    <div className="whecOutline"/>
    <Interactive.Div name="02 · Windows Hacks episode badge" className="whecTopLabel" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:930,fontSize:19,fontWeight:850,color:"#72dff1",letterSpacing:3.7,left:74,top:275}}><span className="whecIndicator"/> <Interactive.Div name="02 · Badge · WINDOWS HACKS" style={{display:"inline-block",fontSize:19,color:"#72dff1",translate:"0px 0px",scale:1,rotate:"0deg"}}>WINDOWS HACKS</Interactive.Div><Interactive.Div name="02 · Badge · 02 / 05" className="whecEpNumber" style={{display:"inline-block",translate:"0px 0px",scale:1,rotate:"0deg"}}>02 / 05</Interactive.Div></Interactive.Div>
    <EditablePhase start={0} end={1.65} t={t}>
      <Interactive.Div name="02 · Masalah · Judul 1" className="whecMainTitle" style={{position:'absolute',left:72,top:340,width:935,fontSize:87,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>APLIKASI</Interactive.Div>
      <Interactive.Div name="02 · Masalah · Judul 2" className="whecMainTitle" style={{position:'absolute',left:72,top:433,width:935,fontSize:87,fontWeight:950,color:'#FCA5A5',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>NGE-HANG?</Interactive.Div>
      <Interactive.Div name="02 · Masalah · Subtitle" className="whecSubTitle" style={{position:'absolute',left:77,top:557,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Tiba-tiba berhenti merespons?</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={1.4} end={3.52} t={t}>
      <Interactive.Div name="02 · Shortcut · Judul 1" className="whecMainTitle" style={{position:'absolute',left:72,top:340,width:935,fontSize:87,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>TEKAN SHORTCUT</Interactive.Div>
      <Interactive.Div name="02 · Shortcut · Judul 2" className="whecMainTitle" style={{position:'absolute',left:72,top:433,width:935,fontSize:87,fontWeight:950,color:'#67E8F9',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>CTRL + SHIFT + ESC</Interactive.Div>
      <Interactive.Div name="02 · Shortcut · Subtitle" className="whecSubTitle" style={{position:'absolute',left:77,top:557,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Task Manager langsung terbuka.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={3.22} end={7.6} t={t}>
      <Interactive.Div
       name="02 · Demonstrasi · Judul 1"
       className="whecMainTitle"
       style={{
        position: 'absolute',
        left: 72,
        top: 340,
        width: 935,
        fontSize: 87,
        fontWeight: 950,
        color: '#F7FBFF',
        letterSpacing: -3,
        translate: '50.4px -214.3px',
        scale: 1,
        rotate: '0deg',
        pointerEvents: 'auto'
       }}
      >PILIH APLIKASI</Interactive.Div>
      <Interactive.Div name="02 · Demonstrasi · Judul 2" className="whecMainTitle" style={{position:'absolute',left:72,top:433,width:935,fontSize:87,fontWeight:950,color:'#67E8F9',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>YANG MACET</Interactive.Div>
      <Interactive.Div name="02 · Demonstrasi · Subtitle" className="whecSubTitle" style={{position:'absolute',left:77,top:557,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Cari status Not responding.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={7.42} end={10.1} t={t}>
      <Interactive.Div
       name="02 · Hasil · Judul 1"
       className="whecMainTitle"
       style={{
        position: 'absolute',
        left: 72,
        top: 340,
        width: 935,
        fontSize: 87,
        fontWeight: 950,
        color: '#F7FBFF',
        letterSpacing: -3,
        translate: '67.2px 693.2px',
        scale: 4.647,
        rotate: '0deg',
        pointerEvents: 'auto'
       }}
      >KLIK END TASK</Interactive.Div>
      <Interactive.Div name="02 · Hasil · Judul 2" className="whecMainTitle" style={{position:'absolute',left:72,top:433,width:935,fontSize:87,fontWeight:950,color:'#A8FFCF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>BERES!</Interactive.Div>
      <Interactive.Div name="02 · Hasil · Subtitle" className="whecSubTitle" style={{position:'absolute',left:77,top:557,width:922,fontSize:30,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Aplikasi macet berhasil ditutup.</Interactive.Div>
    </EditablePhase>
    <Interactive.Div name="02 · Editable Windows desktop" className="whecMonitor" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:61,top:659,width:958,height:653,opacity:p(t,.04,.51),transform:`scale(${zoomScale})`}}>
      <div className="whecMonitorScreen"><Desktop time={t}/><Cursor x={cursorX} y={cursorY} pressed={pointerPress} visible={t>3.45&&t<7.19}/></div>
      <div className="whecMonitorFooter"><span className="whecFooterLed"/> WINDOWS 11 · TASK MANAGER <span className="whecFooterLive">● LIVE DEMO</span></div>
    </Interactive.Div>
    <Keyboard t={t} frame={frame} fps={fps}/>
    <Interactive.Div name="02 · Select frozen app tip" className="whecHint" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:102,top:1343,fontSize:19,fontWeight:800,color:"#d2e5f2",letterSpacing:1,opacity:hint,transform:`translateY(${(1-hint)*15}px)`}}><span className="whecHintBullet"/> PILIH YANG BERSTATUS NOT RESPONDING <span>↗</span></Interactive.Div>
    <Magnify t={t}/>
    <Interactive.Div name="02 · Result success card" className="whecSuccess" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:117,top:1324,width:844,height:155,fontSize:16,fontWeight:800,color:"#9bbdb4",letterSpacing:2,opacity:check,transform:`translateY(${(1-check)*55}px) scale(${.94+.06*check})`}}><div className="whecSuccessCheck">✓</div><div><small>TASK MANAGER</small><b>APLIKASI BERHASIL DITUTUP!</b><span>End task · selesai</span></div></Interactive.Div>
    <Interactive.Div name="02 · Loading Demo · Jalur" className="whecProgress" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:120,width:840}}><Interactive.Div name="02 · Loading Demo · Isi" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:`${100*p(t,.2,9.78)}%`}}/></Interactive.Div>
    
 </AbsoluteFill>;
};
