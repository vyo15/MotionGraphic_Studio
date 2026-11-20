import React from 'react';
import {AbsoluteFill, Freeze, useCurrentFrame} from 'remotion';
import {Scene03Preparation} from './Scene03Preparation';
import {Scene02To03MatchMove} from './Scene02To03MatchMove';
import {SceneTextVO} from '../components/SceneTextVO';
import {BRIDGE02TO03, SCENE03} from '../config/timings';
import type {Easy2BootScene03Props} from '../config/props';

const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const smooth=(x:number)=>{const t=clamp(x);return t*t*t*(t*(t*6-15)+10)};

/**
 * S03 entrance only: no changes to the approved Scene02 or original Scene03 source.
 * 1) Soft handoff from the USB question (no ghost of old headline)
 * 2) Show BACKUP DATA with readable, slower cause/effect
 * 3) Hold the completed backup before moving to Make_E2B
 * Source frame and SFX audio map are derived from the same editable Props.
 */
export const Scene03ReadableEntrance:React.FC<Easy2BootScene03Props>=(p)=>{
  const f=useCurrentFrame();
  const cross=p.scene03EntryFadeFrames;
  const reveal=p.scene03ReadableIntroFrames;
  const hold=p.scene03IntroHoldFrames;
  const srcStart=p.scene03IntroStartSourceFrame;
  const srcEnd=p.scene03IntroEndSourceFrame;
  const revealEnd=cross+reveal;
  const holdEnd=revealEnd+hold;
  // Non-overlapping handoff: first fade out the question, then fade in backup.
  // Never show two sets of text/UI at the same time.
  const outEnd=Math.max(1,Math.round(cross*0.42));
  const inStart=Math.max(outEnd+2,Math.round(cross*0.53));
  const outgoingOpacity=1-smooth(f/outEnd);
  const incomingOpacity=smooth((f-inStart)/Math.max(1,cross-inStart));
  const sourceFrame=f<cross ? srcStart : f<revealEnd
    ? Math.round(srcStart+(srcEnd-srcStart)*((f-cross)/Math.max(1,reveal)))
    : f<holdEnd ? srcEnd : Math.min(SCENE03.sourceDurationInFrames-1,srcEnd+(f-holdEnd));
  return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
    {f<cross && <AbsoluteFill style={{opacity:outgoingOpacity}}>
      <Freeze frame={BRIDGE02TO03.durationInFrames-1}>
        <Scene02To03MatchMove {...p}/>
      </Freeze>
    </AbsoluteFill>}
    <AbsoluteFill style={{opacity:incomingOpacity}}>
      <Freeze frame={sourceFrame}>
        <Scene03Preparation {...p}/>
      </Freeze>
    </AbsoluteFill>
    {p.scene03ShowTextVO && !p.showSubtitles ? <SceneTextVO scene={3} props={p}/> : null}
  </AbsoluteFill>;
};
