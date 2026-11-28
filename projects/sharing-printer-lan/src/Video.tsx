import React from 'react';import {AbsoluteFill,Audio,Sequence,staticFile} from 'remotion';import {EditorialBackground} from './components/EditorialBackground';import {DEFAULT_PROPS,type VideoProps} from './config/props';
import {LocalFonts} from './components/LocalFonts';
import {SceneLayout} from './components/SceneLayout';
import {SoundCueTrack} from './components/SoundCueTrack';
export const Video:React.FC<Partial<VideoProps>>=(input)=>{const p={...DEFAULT_PROPS,...input};return <AbsoluteFill><LocalFonts/><EditorialBackground color={p.backgroundColor}/>
<Sequence name="S01-Question" from={0} durationInFrames={186}><SceneLayout {...p} sceneIndex={0}/></Sequence>
<Sequence name="S01-Response" from={186} durationInFrames={84}><SceneLayout {...p} showVoiceover={false} sceneIndex={1}/></Sequence>
<Sequence name="S01" from={270} durationInFrames={278}><SceneLayout {...p} showVoiceover={false} sceneIndex={2}/></Sequence>
<Sequence name="S02" from={548} durationInFrames={330}><SceneLayout {...p} sceneIndex={3}/></Sequence>
<Sequence name="S03" from={878} durationInFrames={720}><SceneLayout {...p} sceneIndex={4}/></Sequence>
<Sequence name="S04" from={1598} durationInFrames={540}><SceneLayout {...p} sceneIndex={5}/></Sequence>
<Sequence name="S05" from={2138} durationInFrames={450}><SceneLayout {...p} sceneIndex={6}/></Sequence>
<Sequence name="S06" from={2588} durationInFrames={390}><SceneLayout {...p} sceneIndex={7}/></Sequence>
<Sequence name="S07" from={2978} durationInFrames={225}><SceneLayout {...p} sceneIndex={8}/></Sequence>
<Sequence name="S08" from={3203} durationInFrames={180}><SceneLayout {...p} sceneIndex={9}/></Sequence>
{p.showVoiceover && <Sequence name="VO S01-R → S01 (continuous)" from={212} durationInFrames={170} layout="none"><Audio src={staticFile('videos/sharing-printer-lan/audio/voiceover/s01-response-demo-clean.wav')} volume={Math.max(0,Math.min(1,Number.isFinite(p.voiceoverGain)?p.voiceoverGain!:1))}/></Sequence>}
<SoundCueTrack enabled={p.showSfx} gain={p.sfxGain} textProps={{runCommand:p.runCommand,hostAddress:p.hostAddress,ctaComment:p.ctaComment}}/></AbsoluteFill>};
