import React from 'react';
import {Sequence} from 'remotion';
/** Timeline ringkas untuk komposisi lengkap, tanpa flatten video atau aset.
 * Expand Sequence bila perlu; edit layer utama lewat komposisi per segmen. */
export const createFullPreviewComposition=<P extends Record<string,any>>(
 VideoComponent:React.ComponentType<P>,durationInFrames:number,
):React.FC<P>=>{
 const Full:React.FC<P>=(props)=><Sequence name="VIDEO LENGKAP — preview gabungan" from={0} durationInFrames={durationInFrames}>
   <VideoComponent {...props}/>
 </Sequence>;
 Full.displayName='FullPreview';
 return Full;
};
