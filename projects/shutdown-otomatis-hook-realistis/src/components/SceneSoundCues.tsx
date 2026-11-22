import React from 'react';
import {Audio,Sequence,staticFile} from 'remotion';
import cuesDoc from '../../production/sound-cues.json';
/** Keep old S03–S06 asset labels while display scene numbers shift +1. */
const tracks:Record<number,{name:string;start:number;length:number}>={
 0:{name:'S01',start:0,length:240},1:{name:'S02',start:240,length:165},
 3:{name:'S03',start:540,length:210},4:{name:'S04',start:750,length:300},
 5:{name:'S05',start:1050,length:225},6:{name:'S06',start:1275,length:255},
 8:{name:'S09',start:1695,length:300},
};
const files:Record<string,string>={
 'soft_reveal.wav':staticFile('videos/shutdown-otomatis-hook-realistis/audio/sfx/soft_reveal.wav'),
 'micro_click.wav':staticFile('videos/shutdown-otomatis-hook-realistis/audio/sfx/micro_click.wav'),
 'confirm.wav':staticFile('videos/shutdown-otomatis-hook-realistis/audio/sfx/confirm.wav'),
};
export const SceneSoundCues:React.FC<{sceneIndex:number;enabled?:boolean}>=({sceneIndex,enabled=true})=>{
 const track=tracks[sceneIndex];
 if(!enabled||!track)return null;
 return <>{cuesDoc.cues.filter(c=>c.status==='ready'&&c.scene===track.name).map(c=>{
  const from=c.startFrame-track.start;
  const duration=Math.min(track.length-from,c.endFrame-c.startFrame+1);
  const file=files[c.file.split('/').pop()||''];
  if(!file||from<0||from>=track.length||duration<1)return null;
  return <Sequence key={c.id} name={`SFX ${c.id} — ${c.action}`} from={from} durationInFrames={duration} layout="none">
   <Audio src={file} volume={Math.min(.5,Math.pow(10,c.gainDb/20))}/>
  </Sequence>;
 })}</>;
};
