import {useDemoFrame} from '../../../editor/DemoClock';
import {useSfxControls} from '../../../editor/LayerVars';
import {useCopy} from '../../../editor/TextOverrides';
import {layerStyle} from '../../../editor/LayerStyling';
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
 const text=useCopy(); const sfx=useSfxControls(); const frame=useDemoFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const lost=t>=VIDEO.timing.tabClose&&t<VIDEO.timing.restoreTab;
 const returned=t>=VIDEO.timing.restoreTab;
 const cx=t<1.18?lerp(490,400,seg(t,0,1.18)):t<1.78?398:t<3.1?lerp(398,835,seg(t,1.92,3.1)):t<6.15?835:lerp(835,530,seg(t,6.2,7));
 const cy=t<1.18?lerp(1180,633,seg(t,.1,1.18)):t<1.78?633:t<3.1?lerp(633,1110,seg(t,1.92,3.1)):t<6.15?1110:lerp(1110,1250,seg(t,6.2,7));
 const cursorOpacity=t<3.5?1:t<6.1?0:.42*(1-seg(t,6.3,7.4));
 const halo=Math.max(0,1-Math.abs(t-1.72)/.36);
 return <AbsoluteFill className="whShortcutTScene" style={{position:'relative',overflow:'hidden',width:VIDEO.width,height:VIDEO.height}}>
    <div className="grain"/><div className="glowOrb"/><div className="glowOrb2"/>
    <Interactive.Div name="01 · Label Seri" className="topline" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:86,top:248}}><div className="chip">WINDOWS SHORTCUT</div><div className="chipNo">TIPS #01 / 05</div></Interactive.Div>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:seg(t,0,.42)*(1-seg(t,3.15,3.55))}}>
      <Interactive.Div name="01 · Tab tertutup · Judul baris 1" className="introText whiteText" style={{position:'absolute',left:84,top:333,width:920,fontSize:83,fontWeight:950,letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',color:'#ffffff',pointerEvents:'auto'}}>TAB PENTING</Interactive.Div>
      <Interactive.Div name="01 · Tab tertutup · Judul baris 2" className="introText highText" style={{position:'absolute',left:84,top:435,width:920,fontSize:83,fontWeight:950,letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',color:'#6DE9DF',pointerEvents:'auto'}}>KE-TUTUP?</Interactive.Div>
      <Interactive.Div name="01 · Tab tertutup · Subtitle" className="smallExplainer" style={{position:'absolute',left:87,top:525,width:910,fontSize:27,fontWeight:650,color:'#9fbbd8',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Jangan panik, nggak perlu cari ulang.</Interactive.Div>
    </div>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:seg(t,3.35,3.67)*(1-seg(t,5.94,6.25))}}>
      <Interactive.Div name="01 · Tekan tombol · Judul baris 1" className="introText whiteText" style={{position:'absolute',left:84,top:333,width:920,fontSize:83,fontWeight:950,letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',color:'#ffffff',pointerEvents:'auto'}}>PAKAI</Interactive.Div>
      <Interactive.Div name="01 · Tekan tombol · Judul baris 2" className="introText highText" style={{position:'absolute',left:84,top:435,width:920,fontSize:83,fontWeight:950,letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',color:'#FDE68A',pointerEvents:'auto'}}>SHORTCUT INI!</Interactive.Div>
      <Interactive.Div name="01 · Tekan tombol · Subtitle" className="smallExplainer" style={{position:'absolute',left:87,top:525,width:910,fontSize:27,fontWeight:650,color:'#9fbbd8',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Cukup tekan tiga tombol keyboard.</Interactive.Div>
    </div>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:seg(t,6.12,6.46)}}>
      <Interactive.Div name="01 · Tab kembali · Judul baris 1" className="introText whiteText" style={{position:'absolute',left:84,top:333,width:920,fontSize:83,fontWeight:950,letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',color:'#ffffff',pointerEvents:'auto'}}>TAB-NYA</Interactive.Div>
      <Interactive.Div name="01 · Tab kembali · Judul baris 2" className="introText highText" style={{position:'absolute',left:84,top:435,width:920,fontSize:83,fontWeight:950,letterSpacing:-3,translate:'0px 0px',scale:1,rotate:'0deg',color:'#86F9C6',pointerEvents:'auto'}}>BALIK LAGI!</Interactive.Div>
      <Interactive.Div name="01 · Tab kembali · Subtitle" className="smallExplainer" style={{position:'absolute',left:87,top:525,width:910,fontSize:27,fontWeight:650,color:'#9fbbd8',translate:'0px 0px',scale:1,rotate:'0deg',pointerEvents:'auto'}}>Lanjut kerja tanpa cari riwayat browser.</Interactive.Div>
    </div>
    <BrowserChrome lost={lost} config={VIDEO} style={{opacity:seg(t,0,.6),transform:`translateY(${lerp(36,0,seg(t,0,.7))}px) scale(${1+.028*Math.sin(Math.PI*seg(t,6.13,6.55))})`}}/>
    <AssetSlots/>
    {/* Kursor dan ring klik berada dalam sistem koordinat yang sama. Jika layer kursor dipindah, ring mengikuti. */}
    <Interactive.Div name="01 · Kursor + klik (satu posisi)" className="cursor" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:46,height:55,left:cx,top:cy,transform:`scale(${t>3?.72:1})`,opacity:cursorOpacity}}>
      <svg width="46" height="55" viewBox="0 0 45 56"><path d="M5 2 L5 47 L16 36 L24 53 L33 48 L25 32 L42 32 Z" stroke="#161923" strokeWidth="4" strokeLinejoin="round" fill="#fff"/></svg>
      <Interactive.Div name="01 · Efek Klik — mengikuti kursor" className="clickHalo" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:90,height:90,left:-40,top:-43,opacity:halo*.8,transform:`scale(${lerp(.1,1.5,1-halo)})`}}/>
    </Interactive.Div>
    <Interactive.Div name="01 · Peringatan Tab" className="errorToast" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:121,top:1250,fontSize:27,fontWeight:750,color:"#ffb3bd",opacity:seg(t,2.05,2.4)*(1-seg(t,3.13,3.5)),transform:`translateY(${26*(1-seg(t,2.05,2.4))}px)`}}><span style={{fontSize:34}}>!</span><span>Waduh! Tab penting tertutup.</span></Interactive.Div>
    <ShortcutKeyboard seconds={t} config={VIDEO} opacity={seg(t,3.45,3.85)} translateY={32*(1-seg(t,3.45,3.85))}/>
    <Interactive.Div name="01 · Hasil Tab Kembali" className="bottomLine" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',fontSize:28,fontWeight:750,color:"#82f6db",textAlign:"center",top:1534,left:70,right:VIDEO.layers.result.x,opacity:seg(t,6.25,6.65),transform:`translateY(${15*(1-seg(t,6.25,6.65))}px)`}}>{text("success-prefix","Satu shortcut,")} <strong>{text("success","tab langsung kembali!")}</strong></Interactive.Div>
  <Interactive.Div name="01 · Loading Demo · Jalur" style={{position:'absolute',left:76,top:1630,width:928,height:6,borderRadius:8,backgroundColor:'#29465e',overflow:'hidden',translate:'0px 0px',scale:1,rotate:'0deg'}}>
   <Interactive.Div name="01 · Loading Demo · Isi" style={{height:6,borderRadius:8,backgroundColor:'#67E8F9',width:`${Math.min(100,t/9*100)}%`,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  </Interactive.Div>
 </AbsoluteFill>
}
