import React from 'react';
import {AbsoluteFill,Interactive,interpolate,useCurrentFrame} from 'remotion';
export const Scene01: React.FC<{headline:string}> = ({headline}) => {
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{justifyContent:'center',alignItems:'center'}}>
    <Interactive.Div name="S01 — Headline" style={{fontFamily:'Arial, sans-serif',fontSize:88,fontWeight:700,color:'#202020',textAlign:'center',padding:30,opacity:interpolate(frame,[0,18],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>{headline}</Interactive.Div>
  </AbsoluteFill>;
};
