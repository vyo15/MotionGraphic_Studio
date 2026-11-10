import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {AppIcon} from './AppIcons';
import {DESIGN} from '../config/design';
import {rise, fadeOut, mix, pop} from '../animations/presets';
import {TIMING} from '../config/timing';

type Focus = {name: 'Xbox'|'Bing Search'|'Copilot'; x: number; order: number;};
const cards: Focus[] = [
  {name:'Xbox',x:108,order:0}, {name:'Bing Search',x:427,order:1}, {name:'Copilot',x:746,order:2},
];

const FocusCard: React.FC<{card:Focus;f:number;fps:number}> = ({card,f,fps}) => {
  const s=f/fps;
  const enter = pop(f,fps,5.04+card.order*.12);
  const focus=rise(s, ...TIMING.selectedCard);
  const active=card.name==='Xbox';
  const xToCenter=active ? (426-card.x) * focus : 0;
  const yToFocus=active ? -70*focus : 60*focus;
  const shrink = active ? 1+(.27*focus) : 1-(.15*focus);
  const exitOpacity=active ? 1 : fadeOut(s,6.65,7.35);
  return <div style={{position:'absolute',left:card.x,top:1029,width:226,height:213,
    opacity:Math.min(1,Math.max(0,enter))*exitOpacity,
    transform:`translate(${xToCenter}px,${mix(90,0,enter)+yToFocus}px) scale(${mix(.82,1,enter)*shrink})`}}>
    <Interactive.Div name={`S01 — Kartu Fokus ${card.name}`} style={{position:'absolute',left:0,top:0,
      width:226,height:213,background:'#FFFFFF',border:'1px solid #E6E4E0',borderRadius:22,
      boxShadow:DESIGN.shadow,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    <Interactive.Div name={`S01 — Icon Fokus ${card.name}`} style={{position:'absolute',top:36,left:75,
      width:76,height:76,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <AppIcon app={card.name} size={76}/>
    </Interactive.Div>
    {card.name === 'Xbox' ? <Interactive.Div name="S01 — Nama Fokus Xbox" style={{
      position:'absolute',top:145,left:0,width:226,textAlign:'center',fontSize:24,fontWeight:600,color:'#373737',
      translate:'0px 0px',scale:1,rotate:'0deg',
    }}>Xbox</Interactive.Div> : card.name === 'Copilot' ? <Interactive.Div name="S01 — Nama Fokus Copilot" style={{
      position:'absolute',top:145,left:0,width:226,textAlign:'center',fontSize:24,fontWeight:600,color:'#373737',
      translate:'0px 0px',scale:1,rotate:'0deg',
    }}>Copilot</Interactive.Div> : <Interactive.Div name="S01 — Nama Fokus Bing Search" style={{
      position:'absolute',top:145,left:0,width:226,textAlign:'center',fontSize:24,fontWeight:600,color:'#373737',
      translate:'0px 0px',scale:1,rotate:'0deg',
    }}>Bing Search</Interactive.Div>}
  </div>;
};

/** Kartu adalah layer mandiri; tidak menjadi screenshot Start Menu. */
export const FocusCards: React.FC = () => {
  const f=useCurrentFrame(),{fps}=useVideoConfig();
  if(f/fps<5.0)return null;
  return <>{cards.map(card=><FocusCard key={card.name} card={card} f={f} fps={fps}/>)}</>;
};
