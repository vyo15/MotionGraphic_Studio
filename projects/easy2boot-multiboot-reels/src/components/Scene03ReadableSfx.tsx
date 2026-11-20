import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import type {Easy2BootScene03Props} from '../config/props';
import {SCENE03} from '../config/timings';
/** SFX source unchanged, playback adjusted to the only time-remapped entrance. */
export const Scene03ReadableSfx:React.FC<Pick<Easy2BootScene03Props,
  'scene03EntryFadeFrames'|'scene03ReadableIntroFrames'|'scene03IntroHoldFrames'|
  'scene03IntroStartSourceFrame'|'scene03IntroEndSourceFrame'>>=(p)=>{
 const src=staticFile('videos/easy2boot-multiboot-reels/audio/scene03_sfx.wav');
 const start=p.scene03IntroStartSourceFrame;
 const end=p.scene03IntroEndSourceFrame;
 const fade=p.scene03EntryFadeFrames;
 const reveal=p.scene03ReadableIntroFrames;
 const hold=p.scene03IntroHoldFrames;
 const tail=SCENE03.sourceDurationInFrames-end;
 return <>
   <Sequence from={fade} durationInFrames={reveal}>
     <Audio src={src} startFrom={start} endAt={end}
       playbackRate={(end-start)/Math.max(1,reveal)} volume={0.82}/>
   </Sequence>
   <Sequence from={fade+reveal+hold} durationInFrames={tail}>
     <Audio src={src} startFrom={end} volume={0.82}/>
   </Sequence>
 </>;
};
