import React from 'react';
import {AbsoluteFill, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';

/**
 * S07: Swiss Kinetic CTA V3, accepted in the cover-preview conversation.
 * 240 local frames @ 30 FPS. Source-layer remake of the user's selected V3 video.
 * No MP4 or flattened images. All visual events are deterministic and frame-based.
 */
const c=(x:number)=>Math.max(0,Math.min(1,x));
const e=(f:number,a:number,b:number)=>{const v=c(interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}));return v*v*(3-2*v);};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;

export const Scene07:React.FC<VideoProps>=(input)=>{
 const p={...DEFAULT_PROPS,...input}; const f=useCurrentFrame();
 const first=e(f,8,37),second=e(f,51,78),line=e(f,80,108),card=e(f,118,149),icon=e(f,129,157),caption=e(f,132,161);
 const push=1+0.026*e(f,10,92);
 const move=e(f,149,189),click=e(f,191,202);
 const cursorX=mix(938,810,move)+16*Math.sin(Math.PI*move)+p.scene07CursorShiftX;
 const cursorY=mix(1461,1223,move)-24*Math.sin(Math.PI*move)+p.scene07CursorShiftY;
 const careton=f>=203&&Math.floor((f-203)/13)%2===0;
 const subtitleOpacity=f<85?e(f,3,12)*(1-e(f,76,85)):f<146?e(f,86,95)*(1-e(f,137,146)):e(f,147,156)*(1-e(f,231,240));
 const textX=540+p.scene07MainShiftX,textY=p.scene07MainShiftY;
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
 <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{overflow:'hidden',fontFamily:'Inter, Arial, sans-serif'}}>
  <rect width="1080" height="1920" fill={p.backgroundColor}/>
  {p.showBackgroundGrid&&<Interactive.G name="S07 — Editorial faint grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><g stroke="#E9EEEB" strokeWidth={1} opacity={0.58}>
   <path d="M116 463V1406M282 463V1406M448 463V1406M614 463V1406M780 463V1406M946 463V1406M80 540H1000M80 730H1000M80 920H1000M80 1110H1000M80 1300H1000"/>
  </g></Interactive.G>}
  <Interactive.Text name="S07 — Header label PENUTUP 07" x={92} y={287} fontSize={30} fontWeight={700} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>PENUTUP 07</Interactive.Text>
  <Interactive.G name="S07 — Header divider" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><line x1={92} y1={319} x2={986} y2={319} stroke="#E2E6E3" strokeWidth={2}/></Interactive.G>
  <Interactive.Text name="S07 — Header Bagikan caramu" x={92} y={406} fontSize={58} fontWeight={700} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Bagikan caramu.</Interactive.Text>
  {f<28&&<g opacity={1-e(f,5,27)}><Interactive.G name="S07 — Continuity scene06 success check" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <circle cx={916} cy={498} r={29} fill="#E9F2ED"/><path d="M904 498L913 508L930 486" stroke="#568F7E" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </Interactive.G></g>}
  <g transform={`translate(${540} ${975}) scale(${p.scene07MainScale*push}) translate(${-540} ${-975})`}>
   <g opacity={first} transform={`translate(0 ${29*(1-first)})`}>
    {p.scene07PrimaryText===DEFAULT_PROPS.scene07PrimaryText ? <Interactive.Text name="S07 — CTA headline CARA LAIN" x={textX} y={775+textY+33} textAnchor="middle" fontSize={100} fontWeight={740} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>CARA LAIN</Interactive.Text> : <Interactive.Text name="S07 — Props override top" x={textX} y={775+textY+33} textAnchor="middle" fontSize={100} fontWeight={740} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene07PrimaryText}</Interactive.Text>}
   </g>
   <g opacity={second} transform={`translate(0 ${28*(1-second)})`}>
    {p.scene07SecondaryText===DEFAULT_PROPS.scene07SecondaryText ? <Interactive.Text name="S07 — CTA line LEBIH PRAKTIS" x={textX} y={985+textY+22} textAnchor="middle" fontSize={69} fontWeight={650} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>LEBIH PRAKTIS</Interactive.Text> : <Interactive.Text name="S07 — Props override second" x={textX} y={985+textY+22} textAnchor="middle" fontSize={69} fontWeight={650} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene07SecondaryText}</Interactive.Text>}
   </g>
   <Interactive.G name="S07 — Coral kinetic underline" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d={`M${280+p.scene07MainShiftX} ${1059+textY}h${p.scene07UnderlineWidth*line}`} stroke={p.coralColor} strokeWidth={8} strokeLinecap="round" fill="none"/></Interactive.G>
   {card>0&&<g opacity={card} transform={`translate(${p.scene07CardShiftX} ${p.scene07CardShiftY+55*(1-card)})`}>
    <Interactive.G name="S07 — Comment input box shadow and surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <rect x={150} y={1177} width={781} height={159} rx={24} fill="#E9EDEA"/>
     <rect x={150} y={1166} width={781} height={159} rx={24} fill="#FFFFFF" stroke="#DDE4E0" strokeWidth={2}/>
    </Interactive.G>
    <g opacity={icon}><Interactive.G name="S07 — Coral comment icon" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <rect x={218} y={1220} width={34} height={28} rx={6} stroke={p.coralColor} strokeWidth={2} fill="none"/>
     <path d="M228 1248L224 1256L235 1248" stroke={p.coralColor} strokeWidth={2} strokeLinejoin="round" fill="none"/>
    </Interactive.G></g>
    <g opacity={caption}>{p.scene07CommentText===DEFAULT_PROPS.scene07CommentText ? <Interactive.Text name="S07 — Comment placeholder text" x={314} y={1264} fontSize={36} fontWeight={600} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Tulis di kolom komentar</Interactive.Text> : <Interactive.Text name="S07 — Props override comment" x={314} y={1264} fontSize={36} fontWeight={600} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene07CommentText}</Interactive.Text>}</g>
    {f>164&&<Interactive.G name="S07 — Comment card tiny corner highlight" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><line x1="860" y1="1301" x2="892" y2="1301" stroke="#F0C6B5" strokeWidth="3"/></Interactive.G>}
    {careton&&<Interactive.G name="S07 — Input caret after click" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M806 1219V1264" stroke={p.coralColor} strokeWidth={3}/></Interactive.G>}
   </g>}
  </g>
  {f>=148&&<g transform={`translate(${cursorX} ${cursorY})`}>
   <Interactive.G name="S07 — Smoothed interactive cursor" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <path d="M0 0L3 37L12 28L27 55L34 51L22 25L41 25Z" fill="#FFFFFF" stroke={p.navyColor} strokeWidth={3} strokeLinejoin="round"/>
   </Interactive.G>
   {f>=191&&f<=202&&<Interactive.G name="S07 — Cursor click ring" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><circle cx={5} cy={5} r={18+30*click} stroke={p.coralColor} strokeWidth={3} opacity={1-click} fill="none"/></Interactive.G>}
  </g>}
  {p.showCaptions&&<g opacity={subtitleOpacity}>
   {f<85 ? <Interactive.Text name="S07 — CTA VO 01 Kalau kamu punya cara lain" x={540+p.subtitleShiftX} y={p.subtitleBaselineY+p.subtitleShiftY} textAnchor="middle" fontSize={p.subtitleFontSize} fontWeight={600} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Kalau kamu punya cara lain</Interactive.Text>
   : f<146 ? <Interactive.Text name="S07 — CTA VO 02 yang lebih praktis" x={540+p.subtitleShiftX} y={p.subtitleBaselineY+p.subtitleShiftY} textAnchor="middle" fontSize={p.subtitleFontSize} fontWeight={600} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>yang lebih praktis,</Interactive.Text>
   : <Interactive.Text name="S07 — CTA VO 03 share komentar" x={540+p.subtitleShiftX} y={p.subtitleBaselineY+p.subtitleShiftY} textAnchor="middle" fontSize={p.subtitleFontSize} fontWeight={600} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>coba share di kolom komentar!</Interactive.Text>}
  </g>}
 </svg>
 </AbsoluteFill>;
};
