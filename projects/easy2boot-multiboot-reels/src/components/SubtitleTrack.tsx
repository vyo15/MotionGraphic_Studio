import React from 'react';
import {useCurrentFrame,AbsoluteFill} from 'remotion';
import {SUBTITLE_CUES} from '../config/subtitles';
/** Independent subtitle track; off by default until VO alignment is verified. */
export const SubtitleTrack:React.FC<{color:string}>=({color})=>{
 const frame=useCurrentFrame();
 const cue=SUBTITLE_CUES.find((c)=>frame>=c.from&&frame<c.to);
 if(!cue)return null;
 return <AbsoluteFill style={{pointerEvents:'none'}}>
  <div style={{position:'absolute',left:110,right:110,top:1430,minHeight:70,
       textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
       lineHeight:1.16,color,textShadow:'0 1px 6px #FFFFFF',
       background:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18}}>
   {cue.text}
  </div>
 </AbsoluteFill>;
};
