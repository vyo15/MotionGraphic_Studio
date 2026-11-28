import React from 'react';
import {AbsoluteFill, Audio, Interactive, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {ramp} from '../animations/motion';
import type {VideoProps} from '../config/props';

// V10 reference ACC: bold opening, coral Wi-Fi and Focus & Resolve. Native reconstruction pending runtime QA.
export const Scene01Question: React.FC<VideoProps> = ({showVoiceover=true,voiceoverGain=1}) => {
  const t = useCurrentFrame()/30;
  const a = ramp(t,.12,.55), b = ramp(t,1.12,1.38), c = ramp(t,2.33,2.85);
  const out=1-ramp(t,5.70,6.18);
  const reveal=ramp(t,2.33,2.85);
  const react=ramp(t,3.05,3.55)*(1-ramp(t,4.8,5.5));
  const scale=1+react*(.018+.018*Math.sin((t-3.05)*Math.PI*1.5));
  const angle=react*2.1*Math.sin((t-3.05)*Math.PI*1.7);
  const l=ramp(t,3.00,3.55), mid=ramp(t,3.35,4.15), r=ramp(t,3.17,3.95);
  const resolve=ramp(t,4.65,5.62);
  return <AbsoluteFill>
    {/* S01-Q recording only. Local frame 9, 83 frames (2.76s WAV); no duplicated root/segment track. */}
    {showVoiceover && <Sequence name="VO S01-Q" from={9} durationInFrames={83} layout="none">
      <Audio src={staticFile('videos/sharing-printer-lan/audio/voiceover/s01-question-clean.wav')} volume={Math.max(0,Math.min(1,Number.isFinite(voiceoverGain)?voiceoverGain:1))}/>
    </Sequence>}
    {(a*(1-ramp(t,.94,1.14)))>0 && <div style={{position:'absolute',inset:0,opacity:a*(1-ramp(t,.94,1.14)),transform:`translateY(${12*(1-a)}px)`}}>
      <Interactive.Div name="S01Q — Printer kamu" style={{position:'absolute',left:120,top:855,width:800,height:140,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:76,fontWeight:700,lineHeight:1.05,color:'#202020',textAlign:'center'}}>PRINTER KAMU</Interactive.Div>
    </div>}
    {(b*(1-ramp(t,2.13,2.36)))>0 && <div style={{position:'absolute',inset:0,opacity:b*(1-ramp(t,2.13,2.36)),transform:`translateY(${8*(1-b)}px)`}}>
      <Interactive.Div name="S01Q — belum punya fitur" style={{position:'absolute',left:120,top:855,width:800,height:140,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:76,fontWeight:700,lineHeight:1.05,color:'#202020',textAlign:'center'}}>BELUM PUNYA FITUR</Interactive.Div>
    </div>}
    {c*out>0 && <div style={{position:'absolute',inset:0,opacity:c*out,transform:`translateY(${8*(1-c)}px) rotate(${angle}deg) scale(${scale*(.94+.06*c)})`,transformOrigin:'520px 926px'}}>
      <div style={{position:'absolute',left:256,top:846,width:530,height:160,clipPath:`inset(0 ${100*(1-reveal)}% 0 0)`}}>
        <Interactive.Div name="S01Q — Coral highlight" style={{position:'absolute',left:0,top:0,width:530,height:160,backgroundColor:'#DF805F',borderRadius:4,opacity:1}}/>
      </div>
      <Interactive.Div name="S01Q — Wi-Fi?" style={{position:'absolute',left:120,top:796,width:800,height:260,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:140,fontWeight:800,lineHeight:1.05,color:'#202020',textAlign:'center'}}>Wi-Fi?</Interactive.Div>
    </div>}
    <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,opacity:l*(1-resolve)*out,transform:`translate(${(1-l)*90+resolve*210}px,${(1-l)*80+resolve*112}px) rotate(${-12*l*(1-resolve)}deg)`,transformOrigin:'192px 750px'}}>
      <Interactive.Div name="S01Q — Tanda tanya kiri" style={{position:'absolute',left:146,top:690,width:92,height:115,fontFamily:'MG Poppins, sans-serif',fontSize:72,fontWeight:700,lineHeight:1.05,color:'#646464',textAlign:'center'}}>?</Interactive.Div>
    </div>
    <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,opacity:mid*(1-resolve)*out,transform:`translateY(${(1-mid)*140+resolve*235}px)`,transformOrigin:'520px 645px'}}>
      <Interactive.Div name="S01Q — Tanda tanya tengah" style={{position:'absolute',left:474,top:583,width:92,height:120,fontFamily:'MG Poppins, sans-serif',fontSize:80,fontWeight:700,lineHeight:1.05,color:'#646464',textAlign:'center'}}>?</Interactive.Div>
    </div>
    <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,opacity:r*(1-resolve)*out,transform:`translate(${-((1-r)*90+resolve*210)}px,${(1-r)*80+resolve*112}px) rotate(${12*r*(1-resolve)}deg)`,transformOrigin:'848px 750px'}}>
      <Interactive.Div name="S01Q — Tanda tanya kanan" style={{position:'absolute',left:802,top:690,width:92,height:115,fontFamily:'MG Poppins, sans-serif',fontSize:72,fontWeight:700,lineHeight:1.05,color:'#646464',textAlign:'center'}}>?</Interactive.Div>
    </div>
  </AbsoluteFill>;
};
