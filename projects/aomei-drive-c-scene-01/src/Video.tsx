import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile} from 'remotion';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene01Editor} from './config/scene01';

export type AomeiHookProps = {
 showGrid?:boolean;
 showSubtitles?:boolean;
 voiceEnabled?:boolean;
 voiceVolume?:number;
 sceneEditor?:Partial<Scene01Editor>;
};

/** One standalone, folder-first add-on. The entire scene is editable React/SVG, never a baked preview. */
export const Video:React.FC<AomeiHookProps>=({
  showGrid=true,showSubtitles=true,voiceEnabled=false,voiceVolume=1,sceneEditor,
})=><AbsoluteFill>
 <Sequence from={0} durationInFrames={447} name="S01 — Hook | 7.45 detik">
   <Scene01Hook showGrid={showGrid} showSubtitles={showSubtitles} sceneEditor={sceneEditor}/>
 </Sequence>
 {voiceEnabled?<Audio src={staticFile('videos/aomei-drive-c-scene-01/audio/voiceover-scene01.wav')} volume={voiceVolume}/>:null}
</AbsoluteFill>;
