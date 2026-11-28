import React from 'react';
import {AbsoluteFill,getRemotionEnvironment,useVideoConfig} from 'remotion';
import {SAFE_AREA} from '../config/design';
/** Studio-only overlay; never appears in rendered media or alters layout. */
export const SafeZoneGuide:React.FC<{enabled?:boolean}> = ({enabled}) => {
 const {width,height}=useVideoConfig();const sx=width/1080,sy=height/1920;
 const environment=getRemotionEnvironment();
 if (!enabled || !environment.isStudio || environment.isRendering) return null;
 return <AbsoluteFill style={{pointerEvents:'none',zIndex:9999}}><div style={{position:'absolute',left:SAFE_AREA.left*sx,top:SAFE_AREA.top*sy,width:SAFE_AREA.guideWidth*sx,height:(SAFE_AREA.visualBottom-SAFE_AREA.top)*sy,boxSizing:'border-box',border:'2px dashed #DF805F'}}/><div style={{position:'absolute',left:SAFE_AREA.left*sx,top:SAFE_AREA.guideTop*sy,width:SAFE_AREA.guideWidth*sx,height:(SAFE_AREA.guideBottom-SAFE_AREA.guideTop)*sy,boxSizing:'border-box',border:'2px dashed #646464'}}/></AbsoluteFill>;
};
