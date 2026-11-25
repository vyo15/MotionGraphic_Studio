import React from 'react';
import {Interactive,useCurrentFrame,useVideoConfig} from 'remotion';
import {Stage} from '../components/Stage';
import {Folder,INK,CORAL} from '../components/Windows';
import {ProjectIcon} from '../components/AccLayers';
import {ramp,mix} from '../animations/motion';
import {VideoProps,defaults,motionTime,motionPath} from '../config/props';
import {starts} from '../config/timing';

export const Scene06:React.FC<VideoProps>=(input)=>{
 const p={...defaults,...input};
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=motionTime(f,fps,5,p);
 // Match the outgoing CTA hero, then reveal the folder-to-drive relationship.
 const settle=ramp(t,.18,.85), card=ramp(t,.65,1.05), folder=ramp(t,.88,1.42), arrow=ramp(t,1.45,1.95);
 const cx=mix(540,760,settle), cy=mix(840,938,settle), w=mix(340,235,settle);
 return <Stage props={{...p,showSubtitles:false,showVoGuide:false}} start={starts[5]}>
  <g opacity={folder}><Interactive.G name="S06 Folder hero" style={{translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>
   <g transform={`translate(${mix(225,265,folder)} 938)`}>
    <rect x="-170" y="-160" width="340" height="320" rx="22" fill="white" stroke="#DADDD8" strokeWidth="2"/>
    <Interactive.G name="S06 Ikon folder" style={{translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}><Folder x={-102} y={-100} s={2.8}/></Interactive.G>
    <Interactive.G name="S06 Nama folder" style={{translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}><text x="0" y="125" textAnchor="middle" fontSize="38" fontWeight="600" fill={INK}>{p.projectName}</text></Interactive.G>
   </g>
  </Interactive.G></g>
  <g opacity={1}><Interactive.G name="S06 Drive hero" style={{translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>
   <rect x={cx-170} y={cy-160} width="340" height="320" rx="22" fill="#FBF1E8" stroke={CORAL} strokeWidth="3" opacity={card}/>
   <Interactive.G name="S06 Ikon Project drive" style={{translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}><ProjectIcon url={p.projectIconUrl} x={cx} y={cy-28*settle} w={w}/></Interactive.G>
   <Interactive.G name="S06 Label Project drive" style={{translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}><text x={cx} y={cy+125} textAnchor="middle" fontSize="38" fontWeight="650" fill={INK} opacity={card}>{`${p.projectName} (${p.drive})`}</text></Interactive.G>
  </Interactive.G></g>
  <g opacity={arrow}><Interactive.G name="S06 Arrow" style={{translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>
   <path d={`M455 938H${455+110*arrow}`} stroke={CORAL} strokeWidth="7" strokeLinecap="round" fill="none"/>
   <path d="M545 918L565 938L545 958" stroke={CORAL} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={ramp(t,1.8,1.95)}/>
  </Interactive.G></g>
  <g opacity={ramp(t,1.85,2.3)}><Interactive.Text name="S06 Cover judul" x={540} y={468} textAnchor="middle" style={{translate:"0px 0px",scale:1,rotate:"0deg",fontSize:102,fontWeight:750,fill:"#202020",opacity:1}}>Folder jadi</Interactive.Text></g>
  <g opacity={ramp(t,2.15,2.65)}><Interactive.Text name="S06 Cover penekanan" x={540} y={590} textAnchor="middle" style={{translate:"0px 0px",scale:1,rotate:"0deg",fontSize:102,fontWeight:750,fill:"#DF805F",opacity:1}}>drive sendiri</Interactive.Text></g>
  <g opacity={ramp(t,2.6,3)}><Interactive.Text name="S06 Cover keterangan" x={540} y={1260} textAnchor="middle" style={{translate:"0px 0px",scale:1,rotate:"0deg",fontSize:44,fontWeight:600,fill:"#202020",opacity:1}}>Tanpa bikin partisi</Interactive.Text></g>
 </Stage>;
};
