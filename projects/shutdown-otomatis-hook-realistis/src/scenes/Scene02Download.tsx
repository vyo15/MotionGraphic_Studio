import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {scene02Svg} from '../components/stickman-download.mjs';
import {NativeSvgLayers} from '../components/editable/NativeSvgLayers';
import {mergeText} from '../config/editable';
import type {VideoProps,LayerTransform} from '../config/editable';
/** Layout V31 with no arbitrary divider: this is a separate narrated situation. */
export const Scene02Download:React.FC<VideoProps>=(props)=>{
 const frame=useCurrentFrame(),t=mergeText(props.textOverrides),controls=props.sceneEditor?.scene02?.layers??{};
 const offsets:Record<string,LayerTransform>={};
 for(const [key,v] of Object.entries(controls))offsets[key]={...v,x:(v.x??0)/2,y:(v.y??0)/2};
 const speed=props.sceneEditor?.scene02?.speed??1;
 const f=Math.min(179,Math.round(frame*180/165*speed));
 const svg=scene02Svg(f,{downloadFileLabel:props.downloadFileLabel??t.downloadLabel,downloadPercent:props.downloadPercent??75,title1:t.scene02Title1,title2:t.scene02Title2,small:t.scene02Small,showHookText:props.showScene02Text!==false,showEndText:props.showEndText!==false,layerOffsets:offsets});
 return <AbsoluteFill style={{background:'#FBF9F7',overflow:'hidden'}}><NativeSvgLayers markup={svg} sceneId="S02"/></AbsoluteFill>;
};
