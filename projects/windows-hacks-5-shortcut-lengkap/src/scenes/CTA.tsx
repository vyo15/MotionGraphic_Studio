import {useCopy} from '../editor/TextOverrides';
import {layerStyle} from '../editor/LayerStyling';
import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame,useVideoConfig,spring} from 'remotion';
import {smooth,enterExit} from '../animations/presets';
import {SeriesBackground} from '../components/SeriesBackground';
export const CTA:React.FC=()=>{
 const copy=useCopy();const rawFrame=useCurrentFrame();const frame=Math.min(rawFrame,94),{fps}=useVideoConfig();
 const pop=spring({frame:Math.max(0,frame-7),fps,config:{damping:16,stiffness:110,mass:.88}});
 const flash=smooth(frame,49,65),exit=smooth(frame,101,114);
 return <AbsoluteFill style={{color:'#fff',fontFamily:'Inter, Segoe UI, Arial,sans-serif',overflow:'hidden'}}><SeriesBackground/>
 <Interactive.Div name="S06 — CTA label" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',top:300,left:80,right:80,textAlign:'center',fontSize:26,color:'#80e2f2',fontWeight:850,letterSpacing:4,opacity:smooth(frame,3,14)}}>5 SHORTCUT WINDOWS · SELESAI</Interactive.Div>
 <Interactive.Div name="S06 — Bookmark icon" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',top:493,left:375,width:330,height:340,display:'grid',placeItems:'center',transform:`translateY(${(1-pop)*85}px) scale(${.65+.35*pop})`,filter:'drop-shadow(0px 25px 38px #03142b)',opacity:Math.min(1,pop)}}>
 <svg width="300" height="325" viewBox="0 0 300 325" fill="none"><rect x="15" y="15" width="270" height="295" rx="48" fill="#12334A" stroke="#60D6ED" strokeWidth="4"/><path d="M93 68H207c7 0 12 5 12 12v159l-69-48-69 48V80c0-7 5-12 12-12Z" fill="#9FF6C7"/><path d="m114 128 23 23 49-53" stroke="#0b4b4b" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/><circle cx="244" cy="64" r="28" fill="#FFCC77" opacity={flash}/></svg>
 </Interactive.Div>
 <Interactive.Div name="S06 — CTA headline" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',left:63,right:63,top:895,textAlign:'center',opacity:1-exit,transform:`translateY(${(1-smooth(frame,11,32))*45}px)`}}><Interactive.Div name="06 · CTA · Teks SIMPAN VIDEONYA" style={{fontSize:85,fontWeight:950,letterSpacing:-3,color:'#fff',translate:'0px 0px',scale:1,rotate:'0deg'}}>SIMPAN VIDEONYA</Interactive.Div><Interactive.Div name="06 · CTA · Teks BIAR NGGAK LUPA" style={{fontSize:86,fontWeight:950,color:'#9FF6C7',letterSpacing:-4,marginTop:15,translate:'0px 0px',scale:1,rotate:'0deg'}}>BIAR NGGAK LUPA!</Interactive.Div></Interactive.Div>
 <Interactive.Div name="S06 — CTA small subtitle" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',top:1250,left:65,right:65,textAlign:'center',fontSize:29,fontWeight:650,color:'#B5CBE1',opacity:smooth(frame,35,58)*(1-exit)}}>Bookmark sekarang. Praktikkan shortcut-nya nanti.</Interactive.Div>
 <Interactive.Div name="S06 — CTA Save Button" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',top:1470,left:152,width:776,height:85,borderRadius:50,background:'#17445B',border:'2px solid #38718A',textAlign:'center',lineHeight:'85px',color:'#e2f9ff',fontSize:29,fontWeight:850,letterSpacing:2,opacity:smooth(frame,45,65)}}>WINDOWS HACKS · SAVE THIS VIDEO</Interactive.Div>
 <Interactive.Div name="06 · Progress CTA · Jalur" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',left:76,right:76,bottom:310,height:7,borderRadius:9,background:'#254963'}}><Interactive.Div name="06 · Progress CTA · Isi Bergerak" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',height:'100%',width:`${Math.min(100,100*rawFrame/120)}%`,background:'#9FF6C7',borderRadius:9}}/></Interactive.Div>
 </AbsoluteFill>
};
