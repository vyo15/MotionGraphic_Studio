import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Scene01} from './scenes/Scene01';import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';import {Scene06} from './scenes/Scene06';
import {VideoProps,DEFAULT_PROPS} from './config/props';
import {DESIGN} from './config/design';
export const SegmentVideo:React.FC<VideoProps&{segmentIndex:number}>=({segmentIndex,...rest})=>{
 const p={...DEFAULT_PROPS,...rest};
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor,fontFamily:DESIGN.font}}>
  {segmentIndex===0?<Scene01 {...p}/>:null}
  {segmentIndex===1?<Scene02 {...p}/>:null}
  {segmentIndex===2?<Scene03 {...p}/>:null}
  {segmentIndex===3?<Scene04 {...p}/>:null}
  {segmentIndex===4?<Scene05 {...p}/>:null}
  {segmentIndex===5?<Scene06 {...p}/>:null}
 </AbsoluteFill>;
};
