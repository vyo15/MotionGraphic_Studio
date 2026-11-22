import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {SceneQuestion} from './scenes/SceneQuestion';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene06IntroBridge} from './scenes/Scene06IntroBridge';
import {Scene07CommandExplain} from './scenes/Scene07CommandExplain';
import {Scene08CancelQuestion} from './scenes/Scene08CancelQuestion';
import {Scene09CancelRun} from './scenes/Scene09CancelRun';
import {Scene06} from './scenes/Scene06';
import {Scene10CTA} from './scenes/Scene10CTA';
import {Scene11CoverReels} from './scenes/Scene11CoverReels';
import {SceneSoundCues} from './components/SceneSoundCues';
import {DEFAULT_PROPS, type VideoProps} from './config/props';
/** Setiap scene membuka native editable SVG/Interactive, bukan crop video. */
export const SegmentVideo:React.FC<VideoProps&{segmentIndex:number}>=({segmentIndex,...input})=>{
 const p={...DEFAULT_PROPS,...input};
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  {segmentIndex===0?<Scene01 {...p}/>:null}
  {segmentIndex===1?<Scene02 {...p}/>:null}
  {segmentIndex===2?<SceneQuestion {...p}/>:null}
  {segmentIndex===3?<Scene03 {...p}/>:null}
  {segmentIndex===4?<Scene04 {...p}/>:null}
  {segmentIndex===5?<Scene06IntroBridge {...p}/>:null}
  {segmentIndex===6?<Scene07CommandExplain {...p}/>:null}
  {segmentIndex===7?<Scene08CancelQuestion {...p}/>:null}
  {segmentIndex===8?<Scene09CancelRun {...p}/>:null}
  {segmentIndex===9?<Scene10CTA {...p}/>:null}
  {segmentIndex===10?<Scene11CoverReels {...p}/>:null}
  {(segmentIndex<=4||segmentIndex===8)?<SceneSoundCues sceneIndex={segmentIndex} enabled={p.showSfx}/>:null}
 </AbsoluteFill>;
};
