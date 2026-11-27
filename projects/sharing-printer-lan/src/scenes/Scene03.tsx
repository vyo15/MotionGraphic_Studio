import React from 'react';import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';import {Topology03} from '../components/Topology03';import {WindowsNetworkUI} from '../components/WindowsNetworkUI';import {Captions03} from '../components/Captions03';import {ramp,mix,sample} from '../animations/motion';import timing from '../config/scene03-timing.json';import type {VideoProps} from '../config/props';
export const Scene03:React.FC<VideoProps>=({showSubtitles,runCommand})=>{
 const frame=useCurrentFrame(),t=frame/30,a=timing.actions;
 const page=frame<a.controlPanel?-1:frame<a.networkInternet?0:frame<a.networkCenter?1:frame<a.sharingSettings||frame>=a.save?2:3;
 const discoveryOn=frame>=a.discovery,sharingOn=frame>=a.filePrinter,typed=runCommand.slice(0,Math.max(0,Math.floor((t-3.27)*9)));
 const [z,cx,cy]=sample(timing.camera,frame);const [px,py]=sample(timing.cursor,frame);
 const sx=page===-1?px:540+(px-cx)*z,sy=page===-1?py:785+(py-cy)*z;
 const q=ramp(t,1.45,2.8),zoom=1+2.15*q,tx=540-mix(540,282,q)*zoom,ty=692.5-mix(692.5,574,q)*zoom;
 return <AbsoluteFill>
 {frame<a.run ? <div style={{position:'absolute',left:50,top:250,width:980,height:1070,overflow:'hidden'}}><div style={{position:'absolute',left:-50,top:-250,transformOrigin:'0 0',transform:`translate(${tx}px,${ty}px) scale(${zoom})`,opacity:1-ramp(t,2.63,2.8)}}><Topology03 t={t}/></div></div> :
 <><div style={{position:'absolute',left:50,top:250,width:980,height:1070,overflow:'hidden'}}><div style={{position:'absolute',left:0,top:0,width:1080,height:1385,transformOrigin:'0 0',transform:page===-1?'translate(-50px,-250px)':`translate(${490-cx*z}px,${535-cy*z}px) scale(${z})`}}><WindowsNetworkUI page={page} discoveryOn={discoveryOn} sharingOn={sharingOn} typed={typed}/></div></div>
 {sx>=50&&sx<1000&&sy>=250&&sy<1280&&<svg width={1080} height={1385} style={{position:'absolute',left:0,top:0,pointerEvents:'none'}}><Interactive.G name="S03 — Cursor Windows hotspot" style={{opacity:1,translate:`${sx}px ${sy}px`}} ><path d="M2 2 L2 37 L11 28 L18 42 L24 39 L17 26 L30 26 Z" fill="#A8A8A8"/><path d="M0 0 L0 35 L9 26 L16 40 L22 37 L15 24 L28 24 Z" fill="white" stroke="#202020" strokeWidth={2} strokeLinejoin="round"/></Interactive.G></svg>}</>}
 <Captions03 showSubtitles={showSubtitles}/></AbsoluteFill>;
};
