import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {AppIcon, type AppName} from './AppIcons';
import {DESIGN, BASE_POSITION} from '../config/design';
import {rise, fadeOut, mix, animationTransform} from '../animations/presets';
import {TIMING} from '../config/timing';

const icons: AppName[] = ['Edge','Copilot','Xbox','Outlook','Paint','Clock','Store','Notepad'];
const AppLabel: React.FC<{app: AppName}> = ({app}) => {
  if(app === 'Edge') return <Interactive.Div name="S01 — Label Aplikasi Start Edge" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Edge</Interactive.Div>;
  if(app === 'Copilot') return <Interactive.Div name="S01 — Label Aplikasi Start Copilot" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Copilot</Interactive.Div>;
  if(app === 'Xbox') return <Interactive.Div name="S01 — Label Aplikasi Start Xbox" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Xbox</Interactive.Div>;
  if(app === 'Outlook') return <Interactive.Div name="S01 — Label Aplikasi Start Outlook" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Outlook</Interactive.Div>;
  if(app === 'Paint') return <Interactive.Div name="S01 — Label Aplikasi Start Paint" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Paint</Interactive.Div>;
  if(app === 'Clock') return <Interactive.Div name="S01 — Label Aplikasi Start Clock" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Clock</Interactive.Div>;
  if(app === 'Store') return <Interactive.Div name="S01 — Label Aplikasi Start Store" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Store</Interactive.Div>;
  if(app === 'Notepad') return <Interactive.Div name="S01 — Label Aplikasi Start Notepad" style={{pointerEvents:'auto',position:'absolute',top:75,left:-17,width:166,textAlign:'center',fontSize:19,color:'#545454',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg'}}>Notepad</Interactive.Div>;
  return null;
};

const W = BASE_POSITION.startMenu.width;
const H = BASE_POSITION.startMenu.height;

const IconSlotInner: React.FC<{app: AppName; index: number; sec: number; style?:React.CSSProperties}> = ({app,index,sec,style}) => {
  const c = index % 4;
  const r = Math.floor(index / 4);
  const appear = rise(sec, TIMING.iconReveal[0] + index * .08, TIMING.iconReveal[1] + index * .08);
  return <div style={{position:'absolute',left: 96+c*190,top: 179+r*149,width: 132,height: 117,
    opacity:appear, transform:animationTransform(mix(22,0,appear),mix(.91,1,appear)),...style}}>
    <Interactive.Div name={`S01 — Ikon ${app} di Start Menu`} style={{pointerEvents:'auto',
      position:'absolute',left:37,top:0,width:58,height:58,
      translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',
    }}><AppIcon app={app} size={58}/></Interactive.Div>
    <AppLabel app={app}/>
  </div>;
};

const IconSlot=Interactive.create({Component:IconSlotInner});

export const StartMenu: React.FC = () => {
  const f = useCurrentFrame(), {fps} = useVideoConfig(), sec=f/fps;
  const open = rise(sec, ...TIMING.menuIn);
  const dim = fadeOut(sec, ...TIMING.menuDim);
  return <div style={{position:'absolute',left:BASE_POSITION.startMenu.x,top:BASE_POSITION.startMenu.y,
    width:W,height:H,opacity:open * mix(1,.18,1-dim),
    transform:animationTransform(mix(85,0,open),mix(.78,1,open))}}>
    <Interactive.Div name="S01 — Panel Start Menu Windows 11" style={{pointerEvents:'auto',
      position:'absolute',left:0,top:0,width:W,height:H,
      backgroundColor:'#FFFFFF',border:'1px solid #EDECEA',borderRadius:27,
      boxShadow:DESIGN.shadow,translate:'0px 0px',scale:1,rotate:'0deg',
    }}/>
    <div style={{position:'absolute',top:35,left:44,width:W-88,height:68,
      borderRadius:18,background:'#F5F6F9',border:'1px solid #EAECF0',
      display:'flex',alignItems:'center',gap:16,padding:'0 23px',color:'#8C919A'}}>
      <svg width="26" height="26" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6" fill="none" stroke="#898E97" strokeWidth="2"/><path d="M15 15L21 21" stroke="#898E97" strokeWidth="2" strokeLinecap="round"/></svg>
      <Interactive.Div name="S01 — Placeholder Windows Search" style={{pointerEvents:'auto',
        position:'relative',fontSize:19,color:'#9498A3',fontWeight:400,
        translate:'0px 0px',scale:1,rotate:'0deg',
      }}>Search for apps, settings, and documents</Interactive.Div>
    </div>
    <Interactive.Div name="S01 — Label Pinned" style={{pointerEvents:'auto',position:'absolute',left:65,top:129,
      fontSize:23,fontWeight:650,color:'#303036',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      Pinned
    </Interactive.Div>
    <Interactive.Div name="S01 — Label All apps" style={{pointerEvents:'auto',position:'absolute',right:62,top:127,background:'#F5F6F7',borderRadius:9,padding:'6px 12px',fontSize:15,color:'#898A8B',translate:'0px 0px',scale:1,rotate:'0deg'}}>All apps ›</Interactive.Div>
    <IconSlot name="S01 — Ikon Start Edge" key="Edge" app="Edge" index={0} sec={sec}/>
    <IconSlot name="S01 — Ikon Start Copilot" key="Copilot" app="Copilot" index={1} sec={sec}/>
    <IconSlot name="S01 — Ikon Start Xbox" key="Xbox" app="Xbox" index={2} sec={sec}/>
    <IconSlot name="S01 — Ikon Start Outlook" key="Outlook" app="Outlook" index={3} sec={sec}/>
    <IconSlot name="S01 — Ikon Start Paint" key="Paint" app="Paint" index={4} sec={sec}/>
    <IconSlot name="S01 — Ikon Start Clock" key="Clock" app="Clock" index={5} sec={sec}/>
    <IconSlot name="S01 — Ikon Start Store" key="Store" app="Store" index={6} sec={sec}/>
    <IconSlot name="S01 — Ikon Start Notepad" key="Notepad" app="Notepad" index={7} sec={sec}/>
    <div style={{position:'absolute',left:56,right:56,top:499,height:1,background:'#EAEAEA'}}/>
    <Interactive.Div name="S01 — Label Recommended" style={{pointerEvents:'auto',position:'absolute',left:65,top:516,
      fontSize:22,fontWeight:650,color:'#303036',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      Recommended
    </Interactive.Div>
    <div style={{position:'absolute',left:65,right:65,top:563,display:'flex',gap:18}}>
      <div style={{background:'#F3F4F7',width:345,height:47,borderRadius:9}}/>
      <div style={{background:'#F3F4F7',width:345,height:47,borderRadius:9}}/>
    </div>
  </div>;
};
