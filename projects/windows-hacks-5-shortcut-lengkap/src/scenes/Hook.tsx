import {useCopy} from '../editor/TextOverrides';
import {layerStyle} from '../editor/LayerStyling';
import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame,spring,useVideoConfig} from 'remotion';
import {smooth,enterExit} from '../animations/presets';
import {SeriesBackground} from '../components/SeriesBackground';
import {COLORS} from '../config/series';
const messages=[
 {start:0,end:70,first:'NGAPAIN KLIK',second:'SANA-SINI?',tag:'MASIH PAKAI CARA LAMA?',accent:'#FFCC77'},
 {start:65,end:130,first:'ADA CARA',second:'LEBIH CEPAT!',tag:'KERJA LEBIH EFISIEN',accent:'#67E8F9'},
 {start:123,end:170,first:'PENGGUNA',second:'WINDOWS?',tag:'INI BUAT KAMU',accent:'#FFF'},
 {start:165,end:210,first:'WAJIB TAHU',second:'5 SHORTCUT!',tag:'TIPS WINDOWS · EPISODE LENGKAP',accent:'#9FF6C7'},
] as const;
export const Hook:React.FC=()=>{
 const text=useCopy();const rawFrame=useCurrentFrame();const frame=Math.min(rawFrame,190),{fps}=useVideoConfig();
 const intro=spring({frame,fps,config:{damping:22,stiffness:92}});
 const chips=['CTRL + SHIFT + T','CTRL + SHIFT + ESC','WIN + SHIFT + S','WIN + E','CTRL + SHIFT + N'];
 return <AbsoluteFill style={{fontFamily:'Inter, Segoe UI, Arial,sans-serif',overflow:'hidden',color:'#fff'}}>
 <SeriesBackground/>
 <Interactive.Div name="S00 — Label seri" style={{...layerStyle("badge"),position:'absolute',left:80,top:265,fontSize:25,color:COLORS.cyan,fontWeight:800,letterSpacing:5,opacity:Math.min(1,intro)}}>● WINDOWS HACKS <span style={{color:'#a0b6cf',fontSize:20,letterSpacing:1}}>SPECIAL EDITION</span></Interactive.Div>
 {messages.map((m,i)=>{const op=enterExit(frame,m.start,m.end,10),rise=(1-smooth(frame,m.start,m.start+18))*48;return <div key={i} style={{...layerStyle("headline"),position:'absolute',left:78,top:395,width:930,opacity:op,transform:`translateY(${rise}px)`}}>
 <div style={{fontWeight:950,fontSize:86,letterSpacing:-3.7,lineHeight:1.07}}>{text(`heading-${i}-first`,m.first)}</div>
 <div style={{fontWeight:950,fontSize:92,color:m.accent,letterSpacing:-4.1,lineHeight:1.12}}>{text(`heading-${i}-second`,m.second)}</div>
 <div style={{color:'#a9c2de',fontSize:28,marginTop:25,fontWeight:700,letterSpacing:1.2}}>{text(`heading-${i}-tag`,m.tag)}</div>
 </div>})}
 <Interactive.Div name="S00 — Papan 5 shortcut" style={{...layerStyle("shortcut-list"),position:'absolute',top:855,left:72,width:936,height:590,display:'flex',flexDirection:'column',gap:17}}>
 {chips.map((ch,i)=>{const p=smooth(frame,12+i*8,29+i*8);const glow=frame>=163?Math.min(1,(frame-163)/24):.0;return <div key={ch} style={{height:92,borderRadius:18,border:'1px solid #345873',background:'linear-gradient(90deg,#193650,#122439)',display:'flex',alignItems:'center',padding:'0 30px',gap:25,opacity:p,transform:`translateX(${(1-p)*75}px) scale(${1+glow*.016})`,boxShadow:'0px 9px 24px #0004'}}><div style={{background:i===4?'#a9f5c6':'#1f7899',borderRadius:12,width:46,height:46,display:'grid',placeItems:'center',fontSize:21,fontWeight:900,color:i===4?'#14362b':'#fff'}}>{String(i+1).padStart(2,'0')}</div><b style={{fontSize:29,letterSpacing:1.2,color:'#ebf6ff'}}>{ch}</b><span style={{marginLeft:'auto',color:'#67E8F9',fontSize:30}}>↗</span></div>})}
 </Interactive.Div>
 <div style={{...layerStyle("progress"),position:'absolute',left:76,right:76,bottom:310,height:7,borderRadius:9,background:'#254963'}}><div style={{height:'100%',width:`${Math.min(100,100*frame/190)}%`,background:'#67E8F9',borderRadius:9}}/></div>
 </AbsoluteFill>
};
