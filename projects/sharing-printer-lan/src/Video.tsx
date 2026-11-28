import React from 'react';import {AbsoluteFill,Sequence} from 'remotion';import {EditorialBackground} from './components/EditorialBackground';import {DEFAULT_PROPS,type VideoProps} from './config/props';
import {LocalFonts} from './components/LocalFonts';
import {SceneLayout} from './components/SceneLayout';
import {SoundCueTrack} from './components/SoundCueTrack';
export const Video:React.FC<Partial<VideoProps>>=(input)=>{const p={...DEFAULT_PROPS,...input};return <AbsoluteFill><LocalFonts/><EditorialBackground color={p.backgroundColor}/>
<Sequence name="S01-Question" from={0} durationInFrames={198}><SceneLayout {...p} sceneIndex={0}/></Sequence>
<Sequence name="S01-Response" from={198} durationInFrames={84}><SceneLayout {...p} sceneIndex={1}/></Sequence>
<Sequence name="S01" from={282} durationInFrames={278}><SceneLayout {...p} sceneIndex={2}/></Sequence>
<Sequence name="S02" from={560} durationInFrames={330}><SceneLayout {...p} sceneIndex={3}/></Sequence>
<Sequence name="S03" from={890} durationInFrames={720}><SceneLayout {...p} sceneIndex={4}/></Sequence>
<Sequence name="S04" from={1610} durationInFrames={540}><SceneLayout {...p} sceneIndex={5}/></Sequence>
<Sequence name="S05" from={2150} durationInFrames={450}><SceneLayout {...p} sceneIndex={6}/></Sequence>
<Sequence name="S06" from={2600} durationInFrames={390}><SceneLayout {...p} sceneIndex={7}/></Sequence>
<Sequence name="S07" from={2990} durationInFrames={225}><SceneLayout {...p} sceneIndex={8}/></Sequence>
<Sequence name="S08" from={3215} durationInFrames={180}><SceneLayout {...p} sceneIndex={9}/></Sequence>
<SoundCueTrack enabled={p.showSfx} gain={p.sfxGain} textProps={{runCommand:p.runCommand,hostAddress:p.hostAddress,ctaComment:p.ctaComment}}/></AbsoluteFill>};
