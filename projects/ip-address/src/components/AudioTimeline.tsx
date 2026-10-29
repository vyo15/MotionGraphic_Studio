import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
export type AudioTrack={id:string;enabled:boolean;src:string;startFrame:number;trimStartFrames:number;durationFrames:number;volume:number;muted:boolean};
export const AudioTimeline:React.FC<{tracks?:AudioTrack[];prefix:string}>=({tracks=[],prefix})=><>
 {tracks.filter(t=>t.enabled&&!t.muted&&t.src&&t.durationFrames>0).map(t=><Sequence key={t.id} name={'Audio — '+t.id} from={t.startFrame} durationInFrames={t.durationFrames}>
  <Audio src={staticFile('videos/'+prefix+'/'+t.src)} startFrom={t.trimStartFrames} endAt={t.trimStartFrames+t.durationFrames} volume={t.volume}/>
 </Sequence>)}
</>;
