import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {SceneSet} from '../components/SceneSet';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';
import {SCENE01_FRAMES} from '../config/timing';
import {fade} from '../animations/motion';

/** Continuous full-frame match-move: video progress becomes download state. */
export const Scene02:React.FC<VideoProps>=(props)=>{
 const p={...DEFAULT_PROPS,...props,
  stickmanShiftX:(props.stickmanShiftX??DEFAULT_PROPS.stickmanShiftX)+(props.scene02StickmanShiftX??0),
  stickmanShiftY:(props.stickmanShiftY??DEFAULT_PROPS.stickmanShiftY)+(props.scene02StickmanShiftY??0),
  laptopShiftX:(props.laptopShiftX??DEFAULT_PROPS.laptopShiftX)+(props.scene02LaptopShiftX??0),
  laptopShiftY:(props.laptopShiftY??DEFAULT_PROPS.laptopShiftY)+(props.scene02LaptopShiftY??0),
  nightWindowShiftX:(props.nightWindowShiftX??DEFAULT_PROPS.nightWindowShiftX)+(props.scene02NightWindowShiftX??0),
  nightWindowShiftY:(props.nightWindowShiftY??DEFAULT_PROPS.nightWindowShiftY)+(props.scene02NightWindowShiftY??0),
  deskShiftX:(props.deskShiftX??DEFAULT_PROPS.deskShiftX)+(props.scene02DeskShiftX??0),
  deskShiftY:(props.deskShiftY??DEFAULT_PROPS.deskShiftY)+(props.scene02DeskShiftY??0),
 };
 const local=useCurrentFrame();
 const f=local+SCENE01_FRAMES;
 const oldTitleFade=1-fade(local,2,13);
 const intro=fade(local,13,22);
 // Screen captions are aligned to spoken phrases; the old phrase exits
 // before the new phrase enters, avoiding overlapped unboxed text.
 const oldCaptionFade=1-fade(local,0,7);
 const newCaptionFade=fade(local,8,16);
 const cue1=1-fade(local,75,85);
 const cue2=fade(local,86,95);
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:'Inter, Arial, sans-serif',overflow:'hidden'}}>
   <SceneSet globalFrame={f} options={p}/>
   <g opacity={oldTitleFade} transform={`translate(${p.textShiftX} ${p.textShiftY})`}>
   <Interactive.Text name="S02 Bridge — Judul outgoing ketiduran" x={104} y={382} fontSize={56} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Ketiduran pas nonton?</Interactive.Text>
  </g>
  <g opacity={intro} transform={`translate(${p.textShiftX} ${p.textShiftY})`}>
    <Interactive.Text name="S02 — Judul Download belum selesai" x={104} y={382} fontSize={55} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Download belum selesai?</Interactive.Text>
   </g>
   {p.showCaptions?<>
    <g opacity={oldCaptionFade}>
    </g>
    <g opacity={newCaptionFade*cue1}>
    </g>
    <g opacity={newCaptionFade*cue2}>
    </g>
   </>:null}
  </svg>
 </AbsoluteFill>;
};
