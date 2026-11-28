import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame} from 'remotion';
import {ramp} from '../animations/motion';
import type {VideoProps} from '../config/props';

// Reference ACC V4: calm answer, first word then the supporting phrase.
export const Scene01Response: React.FC<VideoProps> = () => {
  const t = useCurrentFrame()/30;
  const a = ramp(t,.02,.43), b = ramp(t,.85,1.35), out=1-ramp(t,2.44,2.79);
  return <AbsoluteFill>
    {(a*out)>0 && <div style={{position:'absolute',inset:0,opacity:a*out,transform:`translateY(${-65*b+12*(1-a)}px)`}}>
      <Interactive.Div name="S01R — Tenang" style={{position:'absolute',left:120,top:855,width:800,height:140,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:84,fontWeight:700,lineHeight:1.05,color:'#202020',textAlign:'center'}}>Tenang,</Interactive.Div>
    </div>}
    {(b*out)>0 && <div style={{position:'absolute',inset:0,opacity:b*out,transform:`translateY(${19*(1-b)}px)`}}>
      <Interactive.Div name="S01R — ternyata ada cara" style={{position:'absolute',left:120,top:910,width:800,height:120,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:62,fontWeight:400,lineHeight:1.05,color:'#202020',textAlign:'center'}}>ternyata ada cara</Interactive.Div>
    </div>}
  </AbsoluteFill>;
};
