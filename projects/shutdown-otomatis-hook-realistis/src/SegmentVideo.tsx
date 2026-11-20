import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene02Download} from './scenes/Scene02Download';
import {Scene03Time} from './scenes/Scene03Time';
import {Scene04Run} from './scenes/Scene04Run';
import {SubtitleTrack} from './components/editable/SubtitleTrack';
import {SEGMENTS} from './config/timeline';
import type {VideoProps} from './config/editable';
/** True native segment editing: same component as full; local frame begins at zero. */
export const SegmentVideo:React.FC<VideoProps & {segmentIndex?:number}>=({segmentIndex=0,...props})=>{
 const idx=Math.min(3,Math.max(0,Math.floor(segmentIndex)));
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:'#F8F4F1'}}>
  {idx===0?<Scene01Hook {...props}/>:idx===1?<Scene02Download {...props}/>:idx===2?<Scene03Time {...props}/>:<Scene04Run {...props}/>}
  <SubtitleTrack {...props} absoluteFrame={SEGMENTS[idx].start+frame}/>
 </AbsoluteFill>;
};
