import {useDemoFrame} from '../../editor/DemoClock';
import {useSfxControls} from '../../editor/LayerVars';
import {useCopy} from '../../editor/TextOverrides';
import {layerStyle} from '../../editor/LayerStyling';
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
const EditablePhase:React.FC<{start:number;end:number;t:number;children:React.ReactNode}>=({start,end,t,children})=>{
 const enter=ease(get(t,start,start+.34)),leave=ease(get(t,end-.34,end));
 const opacity=enter*(1-leave);const dy=(1-enter)*32-leave*18;
 return <div style={{position:'absolute',inset:0,opacity,transform:`translateY(${dy}px)`,pointerEvents:'none'}}>{children}</div>;
};

const Key:React.FC<{text:string;active:number;windows?:boolean}> = ({text,active,windows}) => (
 <div className="whssKeyBase"><div className="whssKeyTop" style={{transform:`translateY(${active*7}px)`,boxShadow:active>.1?'inset 0 0 28px #69DDFB65, 0 5px 2px #173854':'inset 0 1px 0 #9BC4DF50, 0 8px 2px #0D263D',background:active>.1?'linear-gradient(180deg,#2097D1,#145885)':'linear-gradient(175deg,#344E6A,#1E334D)'}}>
 {windows?<WindowsIcon size={42}/>:text}
 </div></div>
);
const Keyboard:React.FC<{time:number}> = ({time})=>{
 const a=CONFIG.timeline;
 const visibility=ease(get(time,a.hotkey,a.hotkey+.40))*(1-ease(get(time,3.20,3.66))); // keycaps berakhir saat close-up mulai
 const bounce=spring({fps:30,frame:Math.max(0,(time-a.hotkey)*30),config:{damping:13,stiffness:105,mass:.85}});
 const active=ease(get(time,a.press,a.press+.16))*(1-ease(get(time,a.press+.36,a.press+.60)));
 return <Interactive.Div name="03 · Keyboard individual keys" className="whssKeyboard" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:878,height:126,left:102,top:1410,opacity:visibility,transform:`translateY(${(1-bounce)*60}px) scale(${.93+.07*bounce})`}}>
 <Key text="WIN" windows active={active}/><span className="whssPlus">+</span><Key text="SHIFT" active={active}/><span className="whssPlus">+</span><Key text="S" active={active}/>
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
 return <Interactive.Div name="03 · ZOOM DETAIL area screenshot (editable)" className="whssDetailZoom" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:80,top:1202,width:920,height:342,opacity,transform:`translateY(${(1-bounce)*48}px) scale(${0.95+0.05*bounce})`}}>
   <div className="whssDetailHeader"><span className="whssDetailPulse"/> <span>ZOOM DETAIL</span><span className="whssDetailStep">DRAG UNTUK SCREENSHOT</span><span className="whssDetailPower">1.4×</span></div>
   <div className="whssDetailViewport">
     <div className="whssDetailScaled" style={{left:CONFIG.zoom.cropLeft,top:CONFIG.zoom.cropTop,transform:`scale(${CONFIG.zoom.scale})`}}>
       <Desktop time={time}/>
       <Pointer x={x} y={y} visible={pointerVisible} crosshair={onCross} click={pointerClick}/>
     </div>
   </div>
 </Interactive.Div>;
};

const ResultGraphic:React.FC<{time:number}> = ({time})=>{
 const copy=useCopy();
 const a=CONFIG.timeline;
 const p=ease(get(time,a.result,a.result+.55));
 const tail=cap((time-a.result)/2.2);
 return <Interactive.Div name="03 · Screenshot result / clipboard" className="whssResult" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:98,top:1380,width:884,height:161,opacity:p,transform:`translateY(${(1-p)*95}px) scale(${.74+.26*p+Math.sin(tail*Math.PI)*.018})`}}>
  <div className="whssResultIcon"><svg width="53" height="53" viewBox="0 0 48 48" fill="none"><rect x="7" y="12" width="28" height="26" rx="4" stroke="#94F2C1" strokeWidth="3"/><path d="M16 10V8a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v23" stroke="#94F2C1" strokeWidth="3"/><path d="m15 26 6 6 12-15" stroke="#94F2C1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
  <div className="whssResultCopy"><div className="whssResultSmall">SNIPPING TOOL</div><div className="whssResultMain">{copy("clipboard-text","Copied to clipboard!")}</div><div className="whssResultDesc">{copy("clipboard-subtitle",CONFIG.text.finalNote)}</div></div>
  <div className="whssResultTick">✓</div>
 </Interactive.Div>;
};

/** Composition untuk preview dan render. Semuanya frame-based, tanpa video/gambar yang di-flatten. */
export const Video:React.FC=()=>{
 const sfx=useSfxControls();
 const frame=useDemoFrame();const {fps}=useVideoConfig(); const time=frame/fps;
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
 return <AbsoluteFill className="whssRoot" style={{background:CONFIG.colors.bg,fontFamily:CONFIG.typography.font,color:CONFIG.colors.text}}>
  <div className="whssGrid"/><div className="whssGlowA"/><div className="whssGlowB"/>
  <div className="whssOuterFrame"/>
  <Interactive.Div name="03 · Episode Label" className="whssKicker" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:932,fontSize:23,fontWeight:800,color:"#7BE7EE",letterSpacing:2,top:278,left:74}}><div className="whssMiniCircle"/><Interactive.Div name="03 · Badge · WINDOWS HACKS" style={{display:"inline-block",translate:"0px 0px",scale:1,rotate:"0deg"}}>WINDOWS HACKS</Interactive.Div><Interactive.Div name="03 · Badge · 03 / 05" className="whssKickerEpisode" style={{display:"inline-block",translate:"0px 0px",scale:1,rotate:"0deg"}}>03 / 05</Interactive.Div></Interactive.Div>

    <EditablePhase start={0} end={1.8} t={time}>
      <Interactive.Div name="03 · Masalah · Judul 1" className="whssTitle" style={{position:'absolute',left:72,top:340,width:935,fontSize:84,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>SCREENSHOT</Interactive.Div>
      <Interactive.Div name="03 · Masalah · Judul 2" className="whssTitle" style={{position:'absolute',left:72,top:429,width:935,fontSize:84,fontWeight:950,color:'#64ECF5',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>CUMA SEBAGIAN?</Interactive.Div>
      <Interactive.Div name="03 · Masalah · Subtitle" className="whssSubtitle" style={{position:'absolute',left:77,top:566,width:922,fontSize:31,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Nggak perlu screenshot satu layar.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={1.37} end={3.43} t={time}>
      <Interactive.Div name="03 · Shortcut · Judul 1" className="whssTitle" style={{position:'absolute',left:72,top:340,width:935,fontSize:84,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>PAKAI SHORTCUT</Interactive.Div>
      <Interactive.Div name="03 · Shortcut · Judul 2" className="whssTitle" style={{position:'absolute',left:72,top:429,width:935,fontSize:84,fontWeight:950,color:'#A8D7FF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>WIN + SHIFT + S</Interactive.Div>
      <Interactive.Div name="03 · Shortcut · Subtitle" className="whssSubtitle" style={{position:'absolute',left:77,top:566,width:922,fontSize:31,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Tekan ketiga tombol bersamaan.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={3.05} end={6.76} t={time}>
      <Interactive.Div name="03 · Seleksi · Judul 1" className="whssTitle" style={{position:'absolute',left:72,top:340,width:935,fontSize:84,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>TINGGAL DRAG</Interactive.Div>
      <Interactive.Div name="03 · Seleksi · Judul 2" className="whssTitle" style={{position:'absolute',left:72,top:429,width:935,fontSize:84,fontWeight:950,color:'#64ECF5',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>AREA-NYA!</Interactive.Div>
      <Interactive.Div name="03 · Seleksi · Subtitle" className="whssSubtitle" style={{position:'absolute',left:77,top:566,width:922,fontSize:31,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Klik, tahan, lalu tarik area pilihan.</Interactive.Div>
    </EditablePhase>
    <EditablePhase start={6.45} end={10} t={time}>
      <Interactive.Div name="03 · Hasil · Judul 1" className="whssTitle" style={{position:'absolute',left:72,top:340,width:935,fontSize:84,fontWeight:950,color:'#F7FBFF',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>SCREENSHOT</Interactive.Div>
      <Interactive.Div name="03 · Hasil · Judul 2" className="whssTitle" style={{position:'absolute',left:72,top:429,width:935,fontSize:84,fontWeight:950,color:'#AAFFC5',letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>BERHASIL!</Interactive.Div>
      <Interactive.Div name="03 · Hasil · Subtitle" className="whssSubtitle" style={{position:'absolute',left:77,top:566,width:922,fontSize:31,fontWeight:620,color:'#C0D5E9',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Otomatis tersalin ke clipboard.</Interactive.Div>
    </EditablePhase>
  <Interactive.Div name="03 · Windows 11 editable desktop" className="whssMonitor" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:62,top:663,width:956,height:650,opacity:interpolate(frame,[0,16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),transform:`scale(${screenScale})`}}>
    <div className="whssMonitorScreen"><Desktop time={time}/><Pointer x={x} y={y} visible={pointerVisible} crosshair={onCross} click={pointerClick}/></div>
    <div className="whssMonitorBar"><div className="whssMonitorLed"/><div className="whssMonitorBrand">WINDOWS 11 · SCREEN CAPTURE</div><span>● LIVE DEMO</span></div>
  </Interactive.Div>
  <Interactive.Div name="03 · Drag instruction" className="whssDragHint" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:102,top:1337,width:876,height:46,fontSize:22,fontWeight:780,color:"#A6EAF4",letterSpacing:1,opacity:helperVisibility,transform:`translateY(${(1-helperVisibility)*16}px)`}}><span className="whssHintDot"/> PILIH AREA YANG MAU DIAMBIL <span className="whssHintArrow">↗</span></Interactive.Div>
  <Keyboard time={time}/>
  <DetailZoom time={time} x={x} y={y} pointerVisible={pointerVisible} onCross={onCross} pointerClick={pointerClick}/>
  <ResultGraphic time={time}/>
  <div className="whssBottomGlimmer"/>
  <Interactive.Div name="03 · Loading Demo · Jalur" className="whssStepLine" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:82,top:1550,width:916,height:5}}><Interactive.Div name="03 · Loading Demo · Isi" className="whssStepFill" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:`${100*ease(get(time,.3,9.8))}%`}}/></Interactive.Div>
  
 </AbsoluteFill>;
};
