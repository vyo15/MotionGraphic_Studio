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
 <Interactive.Div name="S06 — CTA label" style={{...layerStyle("badge"),position:'absolute',top:300,left:80,right:80,textAlign:'center',fontSize:26,color:'#80e2f2',fontWeight:850,letterSpacing:4,opacity:smooth(frame,3,14)}}>{copy("cta-top","5 SHORTCUT WINDOWS · SELESAI")}</Interactive.Div>
 <Interactive.Div name="S06 — Bookmark icon" style={{...layerStyle("bookmark"),position:'absolute',top:493,left:375,width:330,height:340,display:'grid',placeItems:'center',transform:`translateY(${(1-pop)*85}px) scale(${.65+.35*pop})`,filter:'drop-shadow(0px 25px 38px #03142b)',opacity:Math.min(1,pop)}}>
 <svg width="300" height="325" viewBox="0 0 300 325" fill="none"><rect x="15" y="15" width="270" height="295" rx="48" fill="#12334A" stroke="#60D6ED" strokeWidth="4"/><path d="M93 68H207c7 0 12 5 12 12v159l-69-48-69 48V80c0-7 5-12 12-12Z" fill="#9FF6C7"/><path d="m114 128 23 23 49-53" stroke="#0b4b4b" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/><circle cx="244" cy="64" r="28" fill="#FFCC77" opacity={flash}/></svg>
 </Interactive.Div>
 <Interactive.Div name="S06 — CTA headline" style={{...layerStyle("headline"),position:'absolute',left:63,right:63,top:895,textAlign:'center',opacity:1-exit,transform:`translateY(${(1-smooth(frame,11,32))*45}px)`}}><div style={{fontSize:85,fontWeight:950,letterSpacing:-3}}>{copy("cta-first","SIMPAN VIDEONYA")}</div><div style={{fontSize:86,fontWeight:950,color:'#9FF6C7',letterSpacing:-4,marginTop:15}}>{copy("cta-second","BIAR NGGAK LUPA!")}</div></Interactive.Div>
 <Interactive.Div name="S06 — CTA small subtitle" style={{...layerStyle("subtitle"),position:'absolute',top:1250,left:65,right:65,textAlign:'center',fontSize:29,fontWeight:650,color:'#B5CBE1',opacity:smooth(frame,35,58)*(1-exit)}}>{copy("cta-small","Bookmark sekarang. Praktikkan shortcut-nya nanti.")}</Interactive.Div>
 <div style={{...layerStyle("button"),position:'absolute',top:1470,left:152,width:776,height:85,borderRadius:50,background:'#17445B',border:'2px solid #38718A',textAlign:'center',lineHeight:'85px',color:'#e2f9ff',fontSize:29,fontWeight:850,letterSpacing:2,opacity:smooth(frame,45,65)}}>{copy("cta-button","WINDOWS HACKS · SAVE THIS VIDEO")}</div>
 </AbsoluteFill>
};
