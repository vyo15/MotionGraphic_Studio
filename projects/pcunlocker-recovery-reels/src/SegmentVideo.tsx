import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {VideoProps,DEFAULT_PROPS} from './config/props';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';
export const SegmentVideo:React.FC<VideoProps&{segmentIndex:number}>=({segmentIndex,...input})=>{const p={...DEFAULT_PROPS,...input};return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
{segmentIndex===0?<Scene01 {...p}/>:null}
{segmentIndex===1?<Scene02 {...p}/>:null}
{segmentIndex===2?<Scene03 {...p}/>:null}
{segmentIndex===3?<Scene04 {...p}/>:null}
{segmentIndex===4?<Scene05 {...p}/>:null}
{segmentIndex===5?<Scene06 {...p}/>:null}
{segmentIndex===6?<Scene07 {...p}/>:null}
{segmentIndex===7?<Scene08 {...p}/>:null}
{segmentIndex===8?<Scene09 {...p}/>:null}
{segmentIndex===9?<Scene10 {...p}/>:null}
{segmentIndex===10?<Scene11 {...p}/>:null}
{segmentIndex===11?<Scene12 {...p}/>:null}
</AbsoluteFill>};
