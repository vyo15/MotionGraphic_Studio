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

 return <AbsoluteFill
  style={{fontFamily:'Inter, Segoe UI, Arial,sans-serif',overflow:'hidden',color:'#fff'}}
 >
 <SeriesBackground/>
 <Interactive.Div name="S00 — Label seri" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',left:80,top:265,fontSize:25,color:"#67E8F9",fontWeight:800,letterSpacing:5,opacity:Math.min(1,intro)}}>● WINDOWS HACKS <span style={{color:'#a0b6cf',fontSize:20,letterSpacing:1}}>SPECIAL EDITION</span></Interactive.Div>
 <HookMessage index={0} m={messages[0]} frame={frame}>
   <Interactive.Div name="00 · Hook 1 · Teks 1" style={{fontWeight:950,fontSize:86,letterSpacing:-3.7,lineHeight:1.07,color:'#ffffff',translate:'0px 0px',scale:1,rotate:'0deg'}}>NGAPAIN KLIK</Interactive.Div>
   <Interactive.Div name="00 · Hook 1 · Teks 2" style={{fontWeight:950,fontSize:92,letterSpacing:-4.1,lineHeight:1.12,color:'#FFCC77',translate:'0px 0px',scale:1,rotate:'0deg'}}>SANA-SINI?</Interactive.Div>
   <Interactive.Div name="00 · Hook 1 · Keterangan" style={{color:'#a9c2de',fontSize:28,marginTop:25,fontWeight:700,letterSpacing:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>MASIH PAKAI CARA LAMA?</Interactive.Div>
 </HookMessage>
 <HookMessage index={1} m={messages[1]} frame={frame}>
   <Interactive.Div name="00 · Hook 2 · Teks 1" style={{fontWeight:950,fontSize:86,letterSpacing:-3.7,lineHeight:1.07,color:'#ffffff',translate:'0px 0px',scale:1,rotate:'0deg'}}>ADA CARA</Interactive.Div>
   <Interactive.Div name="00 · Hook 2 · Teks 2" style={{fontWeight:950,fontSize:92,letterSpacing:-4.1,lineHeight:1.12,color:'#67E8F9',translate:'0px 0px',scale:1,rotate:'0deg'}}>LEBIH CEPAT!</Interactive.Div>
   <Interactive.Div name="00 · Hook 2 · Keterangan" style={{color:'#a9c2de',fontSize:28,marginTop:25,fontWeight:700,letterSpacing:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>KERJA LEBIH EFISIEN</Interactive.Div>
 </HookMessage>
 <HookMessage index={2} m={messages[2]} frame={frame}>
   <Interactive.Div name="00 · Hook 3 · Teks 1" style={{fontWeight:950,fontSize:86,letterSpacing:-3.7,lineHeight:1.07,color:'#ffffff',translate:'0px 0px',scale:1,rotate:'0deg'}}>PENGGUNA</Interactive.Div>
   <Interactive.Div name="00 · Hook 3 · Teks 2" style={{fontWeight:950,fontSize:92,letterSpacing:-4.1,lineHeight:1.12,color:'#FFFFFF',translate:'0px 0px',scale:1,rotate:'0deg'}}>WINDOWS?</Interactive.Div>
   <Interactive.Div name="00 · Hook 3 · Keterangan" style={{color:'#a9c2de',fontSize:28,marginTop:25,fontWeight:700,letterSpacing:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>INI BUAT KAMU</Interactive.Div>
 </HookMessage>
 <HookMessage index={3} m={messages[3]} frame={frame}>
   <Interactive.Div name="00 · Hook 4 · Teks 1" style={{fontWeight:950,fontSize:86,letterSpacing:-3.7,lineHeight:1.07,color:'#ffffff',translate:'0px 0px',scale:1,rotate:'0deg'}}>WAJIB TAHU</Interactive.Div>
   <Interactive.Div name="00 · Hook 4 · Teks 2" style={{fontWeight:950,fontSize:92,letterSpacing:-4.1,lineHeight:1.12,color:'#9FF6C7',translate:'0px 0px',scale:1,rotate:'0deg'}}>5 SHORTCUT!</Interactive.Div>
   <Interactive.Div name="00 · Hook 4 · Keterangan" style={{color:'#a9c2de',fontSize:28,marginTop:25,fontWeight:700,letterSpacing:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>TIPS WINDOWS · EPISODE LENGKAP</Interactive.Div>
 </HookMessage>
 <Interactive.Div name="S00 — Papan 5 shortcut" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',top:855,left:72,width:936,height:590,display:'flex',flexDirection:'column',gap:17}}>
 <ShortcutChip index={0} label="CTRL + SHIFT + T" frame={frame}/>
 <ShortcutChip index={1} label="CTRL + SHIFT + ESC" frame={frame}/>
 <ShortcutChip index={2} label="WIN + SHIFT + S" frame={frame}/>
 <ShortcutChip index={3} label="WIN + E" frame={frame}/>
 <ShortcutChip index={4} label="CTRL + SHIFT + N" frame={frame}/>
 </Interactive.Div>
 <Interactive.Div name="00 · Progress · Jalur" style={{position:'absolute',left:76,top:1630,width:928,height:6,borderRadius:8,backgroundColor:'#29465e',overflow:'hidden',translate:'0px 0px',scale:1,rotate:'0deg'}}>
  <Interactive.Div name="00 · Progress · Isi" style={{height:6,borderRadius:8,backgroundColor:'#67E8F9',width:`${Math.min(100,rawFrame/Math.max(1,239)*100)}%`,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
 </Interactive.Div>
 </AbsoluteFill>
};

type Message=typeof messages[number];
/** Four authored source nodes; no `.map()` sharing one editing target. */
const HookMessage:React.FC<{index:number;m:Message;frame:number;children:React.ReactNode}>=({index,m,frame,children})=>{
 const text=useCopy();const op=enterExit(frame,m.start,m.end,10),rise=(1-smooth(frame,m.start,m.start+18))*48;
 return <div style={{position:'absolute',left:78,top:395,width:930,opacity:op,transform:`translateY(${rise}px)`}}>{children}</div>;
};
const ShortcutChip:React.FC<{index:number;label:string;frame:number}>=({index,label,frame})=>{
 const text=useCopy();const p=smooth(frame,12+index*8,29+index*8);const glow=frame>=163?Math.min(1,(frame-163)/24):0;
 return <Interactive.Div name={`S00 — Shortcut chip ${index+1}`} style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:92,borderRadius:18,border:'1px solid #345873',background:'linear-gradient(90deg,#193650,#122439)',display:'flex',alignItems:'center',padding:'0 30px',gap:25,opacity:p,transform:`translateX(${(1-p)*75}px) scale(${1+glow*.016})`,boxShadow:'0px 9px 24px #0004'}}><div style={{background:index===4?'#a9f5c6':'#1f7899',borderRadius:12,width:46,height:46,display:'grid',placeItems:'center',fontSize:21,fontWeight:900,color:index===4?'#14362b':'#fff'}}>{String(index+1).padStart(2,'0')}</div><b style={{fontSize:29,letterSpacing:1.2,color:'#ebf6ff'}}>{text(`shortcut-${index+1}`,label)}</b><span style={{marginLeft:'auto',color:'#67E8F9',fontSize:30}}>↗</span></Interactive.Div>;
};
