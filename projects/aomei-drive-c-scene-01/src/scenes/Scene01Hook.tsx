import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {SceneHeader} from '../components/SceneHeader';
import {ExplorerWindow} from '../components/ExplorerWindow';
import {DiskDiagram} from '../components/DiskDiagram';
import {WindowsCursor} from '../components/WindowsCursor';
import {MotionLayer} from '../components/MotionLayer';
import {SceneCaptions} from '../components/SceneCaptions';
import {show,hide,drift,xyAt} from '../animations/presets';
import {SCENE01,Scene01Editor} from '../config/scene01';
import {DESIGN} from '../config/design';

export const Scene01Hook:React.FC<{
 showGrid:boolean;
 showSubtitles:boolean;
 sceneEditor?:Partial<Scene01Editor>;
}>=({showGrid,showSubtitles,sceneEditor})=>{
 const frame=useCurrentFrame();const{fps}=useVideoConfig();const t=frame/fps;
 const x=SCENE01.layout;
 const explorerVisible=show(t,.15,.70)*hide(t,4.15,.50);
 const diskVisible=show(t,4.25,.63);
 const mouse=xyAt(SCENE01.cursor,t);
 const cursorVisible=show(t,.32,.24)*hide(t,4.18,.37);
 return <AbsoluteFill style={{fontFamily:DESIGN.font,color:DESIGN.ink,overflow:'hidden'}}>
  <Background showGrid={showGrid}/>
  <Sequence from={0} name="S01 — Label editorial / editable">
   <MotionLayer basePosition={{x:x.header.x,y:x.header.y}} userTransform={sceneEditor?.header} zIndex={3}
       animationTransform={{opacity:show(t,.10,.45),y:drift(t,.10,.48,13)}}><SceneHeader/></MotionLayer>
  </Sequence>
  <Sequence from={0} name="S01 — File Explorer editable / Drive C + D">
   <MotionLayer basePosition={{x:x.explorer.x,y:x.explorer.y}} userTransform={sceneEditor?.explorer}
     animationTransform={{opacity:explorerVisible,y:drift(t,.15,.8,32)-8*show(t,4.1,.55),scale:.986+.014*show(t,.15,.8)}} width={x.explorer.width} height={x.explorer.height} zIndex={5}>
    <ExplorerWindow seconds={t}/>
   </MotionLayer>
  </Sequence>
  <Sequence from={0} name="S01 — Diagram Disk 0 / editable">
   <MotionLayer basePosition={{x:x.disk.x,y:x.disk.y}} userTransform={sceneEditor?.disk}
      animationTransform={{opacity:diskVisible,y:drift(t,4.25,.68,36),scale:.965+.035*show(t,4.25,.68)}}
      width={x.disk.width} height={x.disk.height} zIndex={6}>
     <DiskDiagram seconds={t}/>
   </MotionLayer>
  </Sequence>
  <Sequence from={0} name="S01 — Cursor / track path">
   <MotionLayer basePosition={{x:mouse.x,y:mouse.y}} userTransform={sceneEditor?.cursor}
       animationTransform={{opacity:cursorVisible}} zIndex={10}>
    <WindowsCursor/>
   </MotionLayer>
  </Sequence>
  {showSubtitles?<Sequence from={0} name="S01 — Subtitle VO terbaru (4 beat / editable)">
    <MotionLayer basePosition={{x:x.subtitle.x,y:x.subtitle.y}} userTransform={sceneEditor?.subtitle}
        width={x.subtitle.width} height={x.subtitle.height} zIndex={20}>
      <SceneCaptions seconds={t}/>
    </MotionLayer>
  </Sequence>:null}
 </AbsoluteFill>;
};
