import React,{createContext,useContext} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
export type LayerSettings={
 id?:string; scaleX?:number; scaleY?:number; hueShift?:number; x:number;y:number;scale:number;rotation:number;opacity:number;zIndex:number;
 enabled:boolean;startFrame:number;endFrame:number;
 animation:'none'|'fade'|'slide-up'|'pop';delayFrames:number;animationFrames:number;
};
export type SceneSettings={layers:Record<string,LayerSettings>;sfxVolume:number;sfxEnabled:boolean};
const SoundContext=createContext({sfxEnabled:true,sfxVolume:1});
export const useSfxControls=()=>useContext(SoundContext);
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>{const v=clamp(n);return v*v*(3-2*v)};
/** source CSS animationTransform + editable userTransform, separate & deterministic. */
export const LayerVars:React.FC<{
 settings:SceneSettings;children:React.ReactNode
}>=({settings,children})=>{
 const frame=useCurrentFrame();
 const css:Record<string,string|number>={};
 for(const [raw,l] of Object.entries(settings.layers??{})){
  const key=(l.id??raw).replace(/[^a-zA-Z0-9-]/g,'-').toLowerCase();
  const live=l.enabled&&frame>=l.startFrame&&(l.endFrame<0||frame<l.endFrame);
  const ap=frame-(l.startFrame+l.delayFrames);const phase=ease(ap/Math.max(1,l.animationFrames));
  const startAnim=l.animation==='none'?1:phase;
  const yAnim=l.animation==='slide-up'?(1-phase)*36:0;
  const scaleAnim=l.animation==='pop'?.78+.22*phase:1;
  css[`--l-${key}-translate`]=`${l.x}px ${l.y+yAnim}px`;
  css[`--l-${key}-scale`]=`${l.scale*scaleAnim*(l.scaleX??1)} ${l.scale*scaleAnim*(l.scaleY??1)}`;
  css[`--l-${key}-hue`]=`${l.hueShift??0}deg`;
  css[`--l-${key}-rotate`]=`${l.rotation}deg`;
  css[`--l-${key}-alpha`]=live?l.opacity*startAnim:0;
  css[`--l-${key}-z`]=l.zIndex===0?'auto':l.zIndex;
  css[`--l-${key}-visibility`]=live?'visible':'hidden';
 }
 return <SoundContext.Provider value={{sfxEnabled:settings.sfxEnabled,sfxVolume:settings.sfxVolume}}><AbsoluteFill style={css as React.CSSProperties}>{children}</AbsoluteFill></SoundContext.Provider>;
};
