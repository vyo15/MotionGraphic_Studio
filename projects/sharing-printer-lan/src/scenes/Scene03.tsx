import React from 'react';import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';import {Topology03} from '../components/Topology03';import {WindowsNetworkUI} from '../components/WindowsNetworkUI';import {Captions03} from '../components/Captions03';import {ramp,mix,sample} from '../animations/motion';import timing from '../config/scene03-timing.json';import type {VideoProps} from '../config/props';
export const Scene03:React.FC<VideoProps>=({showSubtitles,runCommand})=>{
 const frame=useCurrentFrame(),t=frame/30,a=timing.actions;
 const page=frame<a.controlPanel?-1:frame<a.networkInternet?0:frame<a.networkCenter?1:frame<a.sharingSettings||frame>=a.save?2:3;
 const discoveryOn=frame>=a.discovery,sharingOn=frame>=a.filePrinter,typed=runCommand.slice(0,Math.max(0,Math.floor((t-3.27)*9)));
 const [z,cx,cy]=sample(timing.camera,frame);const [px,py]=sample(timing.cursor,frame);
 const sx=page===-1?px:540+(px-cx)*z,sy=page===-1?py:785+(py-cy)*z;
 const centeredY=frame<a.run?120*ramp(frame,0,48):frame<a.controlPanel?100:160*(1-ramp(frame,696,719));
 // Headline follows the visible topology during the existing host zoom; sampled from ACC reference, in local coordinates.
 const [hostHeadlineY]=sample([[0,265],[12,293],[24,338],[36,383],[42,394],[48,388],[60,333],[72,274],[78,258],[84,258]],frame);
 const q=ramp(t,1.45,2.8),zoom=1+2.15*q,tx=540-mix(540,282,q)*zoom,ty=692.5-mix(692.5,574,q)*zoom;
 return <AbsoluteFill>
 <div style={{position:'absolute',inset:0,transform:`translateY(${centeredY}px)`}}>
 {frame<a.run ? <div style={{position:'absolute',left:50,top:250,width:980,height:1070,overflow:'hidden'}}><div style={{position:'absolute',left:-50,top:-250,transformOrigin:'0 0',transform:`translate(${tx}px,${ty}px) scale(${zoom})`,opacity:1-ramp(t,2.63,2.8)}}><Topology03 t={t}/></div></div> :
 <><div style={{position:'absolute',left:50,top:250,width:980,height:1070,overflow:'hidden'}}><div style={{position:'absolute',left:0,top:0,width:1080,height:1385,transformOrigin:'0 0',transform:page===-1?'translate(-50px,-250px)':`translate(${490-cx*z}px,${535-cy*z}px) scale(${z})`}}><WindowsNetworkUI page={page} discoveryOn={discoveryOn} sharingOn={sharingOn} typed={typed}/>
 {/* Action overlays are in the same world as the menu, before camera transforms. No raster layers. */}
 <svg width={1080} height={1385} style={{position:'absolute',left:0,top:0,pointerEvents:'none'}}>
  {page===0&&<Interactive.G name="S03 — Highlight Network and Internet" style={{opacity:ramp(frame,210,218)*(1-ramp(frame,231,236))}}><rect x={128} y={694} width={222} height={44} rx={7} fill="none" stroke="#DF805F" strokeWidth={3}/></Interactive.G>}
  {page===1&&<Interactive.G name="S03 — Highlight Network and Sharing Center" style={{opacity:ramp(frame,251,259)*(1-ramp(frame,303,307))}}><rect x={394} y={508} width={288} height={51} rx={7} fill="none" stroke="#DF805F" strokeWidth={3}/></Interactive.G>}
  {page===2&&frame<a.sharingSettings&&<Interactive.G name="S03 — Highlight Change advanced sharing settings" style={{opacity:ramp(frame,343,350)*(1-ramp(frame,391,396))}}><rect x={62} y={591} width={224} height={63} rx={7} fill="none" stroke="#DF805F" strokeWidth={3}/></Interactive.G>}
  {page===3&&<><Interactive.G name="S03 — Highlight Network Discovery" style={{opacity:ramp(frame,453,460)*(1-ramp(frame,502,510))}}><rect x={132} y={717} width={275} height={40} rx={7} fill="none" stroke="#DF805F" strokeWidth={3}/></Interactive.G>
  <Interactive.G name="S03 — Highlight File and Printer Sharing" style={{opacity:ramp(frame,522,530)*(1-ramp(frame,582,588))}}><rect x={132} y={920} width={307} height={44} rx={7} fill="none" stroke="#DF805F" strokeWidth={3}/></Interactive.G>
  <Interactive.G name="S03 — Highlight Save changes" style={{opacity:ramp(frame,613,620)*(1-ramp(frame,641,644))}}><rect x={693} y={1092} width={204} height={61} rx={7} fill="none" stroke="#DF805F" strokeWidth={4}/></Interactive.G></>}
 </svg></div></div>
 {sx>=50&&sx<1000&&sy>=250&&sy<1280&&<svg width={1080} height={1385} style={{position:'absolute',left:0,top:0,pointerEvents:'none'}}><Interactive.G name="S03 — Cursor Windows hotspot" style={{opacity:1,translate:`${sx}px ${sy}px`}} ><path d="M2 2 L2 37 L11 28 L18 42 L24 39 L17 26 L30 26 Z" fill="#A8A8A8"/><path d="M0 0 L0 35 L9 26 L16 40 L22 37 L15 24 L28 24 Z" fill="white" stroke="#202020" strokeWidth={2} strokeLinejoin="round"/></Interactive.G></svg>}</>}
 </div>
 {/* Contextual cue only at host and Run. Subtitle remains in independent screen space. */}
 {frame<a.run&&<div style={{position:'absolute',inset:0,opacity:ramp(frame,5,13)*(1-ramp(frame,72,79)),transform:`translateY(${hostHeadlineY}px)`,pointerEvents:'none'}}><Interactive.Div name="S03 — Highlight komputer utama" style={{position:'absolute',left:40,top:0,width:1000,height:92,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:80,fontWeight:700,lineHeight:1.1,color:'#202020',textAlign:'center'}}>KOMPUTER UTAMA</Interactive.Div></div>}
 {page===-1&&frame>=a.run&&<div style={{position:'absolute',inset:0,opacity:ramp(frame,86,91)*(1-ramp(frame,162,167)),pointerEvents:'none'}}><Interactive.Div name="S03 — Highlight Win R" style={{position:'absolute',left:40,top:612,width:1000,height:92,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:80,fontWeight:700,lineHeight:1.1,color:'#202020',textAlign:'center'}}>WIN + R</Interactive.Div></div>}
 <Captions03 showSubtitles={showSubtitles}/></AbsoluteFill>;
};
