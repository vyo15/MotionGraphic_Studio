import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {SceneSet} from '../components/SceneSet';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';
import {fade} from '../animations/motion';

/** Approved hook is kept; captions are separate Studio-editable literal layers. */
export const Scene01:React.FC<VideoProps>=(props)=>{
 const p={...DEFAULT_PROPS,...props};
 const f=useCurrentFrame();
 const outro=1; // Last approved S01 frame stays visible; S02 owns the outgoing title during match move.
 // Each subtitle follows a narration phrase. No panel or opaque backing.
 const cue1=fade(f,2,9)*(1-fade(f,116,127));
 const cue2=fade(f,128,137);
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:'Inter, Arial, sans-serif',overflow:'hidden'}}>
   <SceneSet globalFrame={f} options={p}/>
   <g opacity={outro} transform={`translate(${p.textShiftX} ${p.textShiftY})`}>
    <Interactive.Text name="S01 — Judul Ketiduran pas nonton" x={104} y={382} fontSize={56} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Ketiduran pas nonton?</Interactive.Text>
   </g>
   {p.showCaptions?<>
    <g opacity={cue1}>
    </g>
    <g opacity={cue2}>
    </g>
   </>:null}
  </svg>
 </AbsoluteFill>;
};
