import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {sceneSvg} from '../components/stickman-scene.mjs';
import {NativeSvgLayers} from '../components/editable/NativeSvgLayers';
import {mergeText} from '../config/editable';
import type {VideoProps,LayerTransform} from '../config/editable';

/** V29 user-selected visual direction — native separable SVG groups, not GIF or screenshot. */
export const Scene01Hook:React.FC<VideoProps>=(props)=>{
 const frame=useCurrentFrame(),t=mergeText(props.textOverrides),controls=props.sceneEditor?.scene01?.layers??{};
 const offsets:Record<string,LayerTransform>={};
 for(const [key,value] of Object.entries(controls))offsets[key]={...value,x:(value.x??0)/2,y:(value.y??0)/2};
 const speed=props.sceneEditor?.scene01?.speed??1;
 const svg=sceneSvg(Math.round(frame*speed),{filmLabel:props.filmLabel??t.filmLabel,hook1:t.hook1,hook2:t.hook2,hookSmall:t.hookSmall,end1:t.end1,end2:t.end2,showHookText:props.showHookText!==false,showEndText:props.showEndText!==false,layerOffsets:offsets});
 return <AbsoluteFill style={{background:'#F8F4F1',overflow:'hidden'}}><NativeSvgLayers markup={svg} sceneId="S01"/></AbsoluteFill>;
};
