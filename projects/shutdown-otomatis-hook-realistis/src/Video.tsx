import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {SceneQuestion} from './scenes/SceneQuestion';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene06IntroBridge} from './scenes/Scene06IntroBridge';
import {Scene07CommandExplain} from './scenes/Scene07CommandExplain';
import {Scene08CancelQuestion} from './scenes/Scene08CancelQuestion';
import {Scene09CancelRun} from './scenes/Scene09CancelRun';
import {Scene06} from './scenes/Scene06';
import {Scene10CTA} from './scenes/Scene10CTA';
import {Scene11CoverReels} from './scenes/Scene11CoverReels';
import {SceneSoundCues} from './components/SceneSoundCues';
import {DEFAULT_PROPS, type VideoProps} from './config/props';
/** Vector/React editable. VO recording isn't bundled. */
export const Video:React.FC<VideoProps>=(input)=>{
 const p={...DEFAULT_PROPS,...input};
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <Sequence name="S01 · Ketiduran saat menonton (ACC)" from={0} durationInFrames={240}><Scene01 {...p}/><SceneSoundCues sceneIndex={0} enabled={p.showSfx}/></Sequence>
  <Sequence name="S02 · Download belum selesai (ACC)" from={240} durationInFrames={165}><Scene02 {...p}/><SceneSoundCues sceneIndex={1} enabled={p.showSfx}/></Sequence>
  <Sequence name="S03 · Emang ada solusinya? (ACC v6)" from={405} durationInFrames={135}><SceneQuestion {...p}/></Sequence>
  <Sequence name="S04 · Solusi shutdown otomatis (ACC v15)" from={540} durationInFrames={240}><Scene03 {...p}/><SceneSoundCues sceneIndex={3} enabled={p.showSfx}/></Sequence>
  <Sequence name="S05 · Windows Run klik OK (ACC)" from={780} durationInFrames={300}><Scene04 {...p}/><SceneSoundCues sceneIndex={4} enabled={p.showSfx}/></Sequence>
  <Sequence name="S06 · Match Move dari 3600 (satu source)" from={1080} durationInFrames={90}><Scene06IntroBridge {...p}/></Sequence>
  <Sequence name="S07 · Cara kerjanya: /s /t 3600" from={1170} durationInFrames={375}><Scene07CommandExplain {...p}/></Sequence>
  <Sequence name="S08 · Kalau nggak jadi? (ACC v54)" from={1545} durationInFrames={150}><Scene08CancelQuestion {...p}/></Sequence>
  <Sequence name="S09 · Cara batalkan shutdown (ACC v55, lebih santai)" from={1695} durationInFrames={300}><Scene09CancelRun {...p}/><SceneSoundCues sceneIndex={8} enabled={p.showSfx}/></Sequence>
  <Sequence name="S10 · CTA komentar (v57 ACC untuk preview)" from={1995} durationInFrames={240}><Scene10CTA {...p}/></Sequence>
  <Sequence name="S11 · Cover Reels (v58, jam dinaikkan)" from={2235} durationInFrames={150}><Scene11CoverReels {...p}/></Sequence>
 </AbsoluteFill>;
};
