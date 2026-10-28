import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame,useVideoConfig,Audio,staticFile} from 'remotion';
import {VIDEO} from '../config/video';
import {BrowserChrome} from '../components/BrowserChrome';
import {ShortcutKeyboard} from '../components/ShortcutKeyboard';
import {AssetSlots} from '../components/AssetSlots';
import '../styles.css';
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(p:number)=>{const x=clamp(p);return x*x*(3-2*x)};
const seg=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export const CtrlShiftT:React.FC = () => {
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const lost=t>=VIDEO.timing.tabClose&&t<VIDEO.timing.restoreTab;
 const returned=t>=VIDEO.timing.restoreTab;
 const title=t<3.4?VIDEO.title.before:t<6.15?VIDEO.title.action:VIDEO.title.after;
 const explainer=t<3.4?VIDEO.message.before:t<6.15?VIDEO.message.action:VIDEO.message.after;
 const cx=t<1.18?lerp(490,400,seg(t,0,1.18)):t<1.78?398:t<3.1?lerp(398,835,seg(t,1.92,3.1)):t<6.15?835:lerp(835,530,seg(t,6.2,7));
 const cy=t<1.18?lerp(1180,633,seg(t,.1,1.18)):t<1.78?633:t<3.1?lerp(633,1110,seg(t,1.92,3.1)):t<6.15?1110:lerp(1110,1250,seg(t,6.2,7));
 const cursorOpacity=t<3.5?1:t<6.1?0:.42*(1-seg(t,6.3,7.4));
 const halo=Math.max(0,1-Math.abs(t-1.72)/.36);
 return <AbsoluteFill className="shortcutTScene" style={{position:'relative',overflow:'hidden',width:VIDEO.width,height:VIDEO.height}}>
    <Audio name="Audio — SFX Ctrl Shift T" src={staticFile("videos/windows-shortcut-ctrl-shift-t/audio/sfx.wav")} volume={0.8}/><div className="grain"/><div className="glowOrb"/><div className="glowOrb2"/>
    <Interactive.Div name="S02 — Section Label" className="topline"><div className="chip">WINDOWS SHORTCUT</div><div className="chipNo">TIPS #01 / 05</div></Interactive.Div>
    <Interactive.Div name="S02 — Main Title" className="introText" style={{left:VIDEO.layers.heading.x,top:VIDEO.layers.heading.y,opacity:seg(t,0,.43),transform:`translateY(${26*(1-seg(t,0,.43))}px)`}}>
     <div className="whiteText">{title[0]}</div><div className="highText two" style={{color:returned?VIDEO.colors.green:t>=3.4?VIDEO.colors.yellow:VIDEO.colors.cyan}}>{title[1]}</div>
    </Interactive.Div>
    <Interactive.Div name="S02 — Subtitle" className="smallExplainer" style={{left:VIDEO.layers.subtitle.x,top:VIDEO.layers.subtitle.y}}>{explainer}</Interactive.Div>
    <BrowserChrome lost={lost} config={VIDEO} style={{opacity:seg(t,0,.6),transform:`translateY(${lerp(36,0,seg(t,0,.7))}px) scale(${1+.028*Math.sin(Math.PI*seg(t,6.13,6.55))})`}}/>
    <AssetSlots/>
    <div className="clickHalo" style={{left:455,top:620,opacity:halo*.8,transform:`scale(${lerp(.1,1.5,1-halo)})`}}/>
    <svg viewBox="0 0 45 56" className="cursor" style={{transform:`translate(${cx}px,${cy}px) scale(${t>3?.72:1})`,opacity:cursorOpacity}}><path d="M5 2 L5 47 L16 36 L24 53 L33 48 L25 32 L42 32 Z" stroke="#161923" strokeWidth="4" strokeLinejoin="round" fill="#fff"/></svg>
    <Interactive.Div name="S02 — Error Message" className="errorToast" style={{opacity:seg(t,2.05,2.4)*(1-seg(t,3.13,3.5)),transform:`translateY(${26*(1-seg(t,2.05,2.4))}px)`}}><span style={{fontSize:34}}>!</span><span>Waduh! Tab penting tertutup.</span></Interactive.Div>
    <ShortcutKeyboard seconds={t} config={VIDEO} opacity={seg(t,3.45,3.85)} translateY={32*(1-seg(t,3.45,3.85))}/>
    <Interactive.Div name="S02 — Success Caption" className="bottomLine" style={{top:VIDEO.layers.result.y,left:VIDEO.layers.result.x,right:VIDEO.layers.result.x,opacity:seg(t,6.25,6.65),transform:`translateY(${15*(1-seg(t,6.25,6.65))}px)`}}>Satu shortcut, <strong>tab langsung kembali!</strong></Interactive.Div>
  </AbsoluteFill>
}
