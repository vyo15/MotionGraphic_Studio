import React from 'react';
import {Interactive} from 'remotion';
import {SCENE05} from '../config/scene05';
import {s05ramp,s05smooth} from '../animations/scene05';

const EDIT={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const edit=(x:React.CSSProperties):React.CSSProperties=>({...x,...EDIT});
const ui=SCENE05.colors;
const FONT='Inter, Segoe UI, Arial, sans-serif';

const Checkbox:React.FC<{name:string;on:boolean;accent?:boolean}>=({name,on,accent=false})=>
  <Interactive.Div name={`S05 — Checkbox ${name} / posisi / warna`} style={{flex:'0 0 28px',width:28,height:28,position:'relative',borderRadius:6,border:`2px solid ${on?ui.blue:'#A5B7C5'}`,background:on?ui.blue:'#FFFFFF',boxSizing:'border-box',translate:'0px 0px',scale:1,rotate:'0deg'}}>
    {on?<svg style={{position:'absolute',left:3,top:2}} width="19" height="19" viewBox="0 0 19 19"><path d="M3 9.4 7.6 14 16 4.8" fill="none" stroke="white" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/></svg>:null}
  </Interactive.Div>;

const Button:React.FC<{name:string;active?:boolean;children:React.ReactNode;style?:React.CSSProperties}>=({name,active=false,children,style={}})=>
  <div style={{fontSize:21,...style}}><Interactive.Div name={`S05 — Tombol ${name}`} style={{boxSizing:'border-box',background:active?'#DDEFFC':'#F8FAFC',border:`${active?2:1}px solid ${active?ui.blue:ui.border}`,borderRadius:10,minHeight:55,padding:'12px 14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'inherit',fontWeight:active?690:540,color:active?'#286AAB':'#445565',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>{children}</Interactive.Div></div>;

const PaneText:React.FC<{name:string;children:React.ReactNode;strong?:boolean;style?:React.CSSProperties}>=({name,children,strong=false,style={}})=>
  <div style={{fontFamily:FONT,fontSize:24,fontWeight:strong?700:460,color:strong?'#354655':'#506272',...style}}><Interactive.Div name={`S05 — ${name}`} style={{fontFamily:'inherit',fontSize:'inherit',fontWeight:'inherit',color:'inherit',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>{children}</Interactive.Div></div>;

const Install:React.FC=()=>
  <div style={{position:'absolute',left:30,right:30,top:191,bottom:27,borderRadius:14,background:'#FFFFFF',border:'1px solid #E7EBEF',padding:'26px 24px',display:'flex',gap:26}}>
    <Interactive.Div name="S05 — Install Actions Sidebar" style={{width:192,background:'#F6F8FA',borderRadius:10,padding:'18px 12px',display:'flex',flexDirection:'column',gap:13,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <PaneText name="Install Actions title" strong style={{fontSize:24}}>Actions</PaneText>
      <Button name="Install / Install" >Install</Button>
      <Button name="Install / Uninstall">Uninstall</Button>
      <Button name="Install / Upgrade">Upgrade</Button>
    </Interactive.Div>
    <div style={{display:'flex',gap:35,flex:1,overflow:'hidden'}}>
      <div style={{width:200}}>
        <PaneText name="Install Browsers heading" strong style={{fontSize:27,marginBottom:18}}>Browsers</PaneText>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Chrome" on={false}/><PaneText name="Install Chrome">Chrome</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Firefox" on={false}/><PaneText name="Install Firefox">Firefox</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Brave" on={false}/><PaneText name="Install Brave">Brave</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13}}><Checkbox name="Vivaldi" on={false}/><PaneText name="Install Vivaldi">Vivaldi</PaneText></div>
      </div>
      <div style={{width:225}}>
        <PaneText name="Install Communication heading" strong style={{fontSize:26,marginBottom:18}}>Communication</PaneText>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Discord" on={false}/><PaneText name="Install Discord">Discord</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Telegram" on={false}/><PaneText name="Install Telegram">Telegram</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:21}}><Checkbox name="Signal" on={false}/><PaneText name="Install Signal">Signal</PaneText></div>
        <div style={{display:'flex',alignItems:'center',gap:13}}><Checkbox name="Zoom" on={false}/><PaneText name="Install Zoom">Zoom</PaneText></div>
      </div>
    </div>
    <PaneText name="Install Helper" style={{position:'absolute',bottom:45,left:246,fontSize:19,color:'#82909B'}}>Choose only what you need.</PaneText>
    <Button name="Install Selected" style={{position:'absolute',bottom:21,right:21,fontSize:19,minHeight:51}}>Install Selected</Button>
  </div>;

const TweakRow:React.FC<{name:string;checked:boolean;strong?:boolean;highlight?:boolean}>=({name,checked,strong=false,highlight=false})=>
  <Interactive.Div name={`S05 — Baris Tweak ${name} / posisi`} style={{display:'flex',alignItems:'center',gap:17,height:62,background:checked?'#EFF7FD':highlight?'#FBFBFC':'transparent',padding:'0 16px',borderRadius:10,translate:'0px 0px',scale:1,rotate:'0deg'}}>
    <Checkbox name={name} on={checked}/>
    <PaneText name={`Tweak ${name}`} strong={strong} style={{fontSize:24}}>{name}</PaneText>
  </Interactive.Div>;

const Tweaks:React.FC<{s:number}>=({s})=>{
  const t=SCENE05.time;const isRestored=s>=t.restoreSelect;const second=s>=t.secondTweakSelect;
  const progress=s05smooth((s-t.restoreProgressStart)/(t.restoreProgressEnd-t.restoreProgressStart));
  const loading=s>=t.restoreProgressStart&&s<t.restoreProgressEnd;
  const done=s>=t.restoreProgressEnd&&s<t.restoreStatusEnd;
  return <div style={{position:'absolute',left:28,right:28,top:189,bottom:28,background:'#FFFFFF',border:'1px solid #E6EBF0',borderRadius:14,padding:'24px 26px'}}>
    <PaneText name="Recommended Selections" strong style={{fontSize:22,marginBottom:17}}>Recommended Selections</PaneText>
    <div style={{display:'flex',gap:9,marginBottom:22}}>
      <Button name="Standard" style={{flex:1,fontSize:20,minHeight:51}}>Standard</Button>
      <Button name="Minimal" style={{flex:1,fontSize:20,minHeight:51}}>Minimal</Button>
      <Button name="Advanced" style={{flex:1,fontSize:20,minHeight:51}}>Advanced</Button>
      <Button name="Clear" style={{flex:1,fontSize:20,minHeight:51}}>Clear</Button>
    </div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
      <PaneText name="Essential Tweaks" strong style={{background:'#EAF4FB',borderRadius:9,padding:'12px 20px',fontSize:23,width:480}}>Essential Tweaks</PaneText>
      <Button name="AppX Removal" active={s>=13.23} style={{fontSize:22,minHeight:51,width:264}}>AppX Removal</Button>
    </div>
    <TweakRow name="Create Restore Point" checked={isRestored} strong highlight={s<4.2}/>
    <TweakRow name="Disable Telemetry" checked={second}/>
    <TweakRow name="Disable Game DVR" checked={false}/>
    <TweakRow name="Show File Extensions" checked={false}/>
    <div style={{position:'absolute',bottom:47,left:42,right:40,height:1,background:'#E1E8EE'}}/>
    <PaneText name="Tweaks Safety Reminder" style={{position:'absolute',bottom:17,left:40,fontSize:17,color:'#798995'}}>Select only the changes you understand.</PaneText>
    <Button name="Run Tweaks" active={s>=5.3&&s<5.98} style={{position:'absolute',bottom:8,right:39,width:252,minHeight:53,fontSize:21}}>Run Tweaks</Button>
    {loading?<div style={{position:'absolute',left:30,bottom:-4,right:30,height:25,background:'#E2EBF2',borderRadius:11,overflow:'hidden'}}>
      <Interactive.Div name="S05 — Progress bar Restore Point / warna / posisi" style={{height:'100%',width:`${Math.round(progress*100)}%`,background:'linear-gradient(90deg,#4096D9,#60BBF1)',borderRadius:11,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    </div>:null}
    {done?<Interactive.Div name="S05 — Status Restore Point berhasil (simulasi)" style={{position:'absolute',left:30,bottom:-17,fontSize:17,padding:'8px 20px',borderRadius:10,background:'#E8F7EE',color:'#25835C',translate:'0px 0px',scale:1,rotate:'0deg'}}>Restore point step complete (simulation)</Interactive.Div>:null}
  </div>;
};

const AppXRow:React.FC<{name:string;checked:boolean}>=({name,checked})=>
  <Interactive.Div name={`S05 — Baris AppX ${name}`} style={{display:'flex',alignItems:'center',gap:23,height:78,padding:'0 23px',borderBottom:'1px solid #EEF1F4',borderRadius:checked?8:0,background:checked?'#EFF7FD':'transparent',translate:'0px 0px',scale:1,rotate:'0deg'}}>
    <Checkbox name={`AppX ${name}`} on={checked}/>
    <PaneText name={`AppX nama ${name}`} style={{fontSize:26}}>{name}</PaneText>
  </Interactive.Div>;

const AppX:React.FC<{s:number}>=({s})=>{
  const checkedXbox=s>=SCENE05.time.xboxSelect;
  const checkedCopilot=s>=SCENE05.time.copilotSelect;
  const amount=(checkedXbox?1:0)+(checkedCopilot?1:0);
  return <div style={{position:'absolute',left:28,right:28,top:189,bottom:26,background:'#FFFFFF',border:'1px solid #E6EBF0',borderRadius:14,padding:'21px 25px'}}>
    <PaneText name="AppX Removal heading" strong style={{fontSize:30,marginBottom:7}}>AppX Removal</PaneText>
    <PaneText name="AppX Helper" style={{fontSize:20,color:'#84929D',marginBottom:17}}>Choose individual Windows app packages.</PaneText>
    <Interactive.Div name="S05 — AppX Search Bar / posisi" style={{height:62,border:'1px solid #D5DFE8',borderRadius:10,background:'#F9FBFC',display:'flex',alignItems:'center',padding:'0 17px',gap:18,marginBottom:13,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <svg width="23" height="23" viewBox="0 0 23 23"><circle cx="10" cy="10" r="7" fill="none" stroke="#8798A6" strokeWidth="2"/><path d="M16 16 22 22" fill="none" stroke="#8798A6" strokeWidth="2"/></svg>
      <PaneText name="AppX Search Placeholder" style={{fontSize:22,color:'#9AA4AD'}}>Search apps...</PaneText>
    </Interactive.Div>
    <AppXRow name="Xbox App" checked={checkedXbox}/>
    <AppXRow name="Microsoft Copilot" checked={checkedCopilot}/>
    <AppXRow name="Feedback Hub" checked={false}/>
    <AppXRow name="Xbox Identity Provider" checked={false}/>
    <div style={{position:'absolute',bottom:11,left:22,right:26,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',gap:7}}>
        {amount===0?<PaneText name="Jumlah dipilih 0" strong style={{fontSize:22,color:'#8794A0'}}>0 selected</PaneText>
        :amount===1?<PaneText name="Jumlah dipilih 1" strong style={{fontSize:22,color:'#3487C2'}}>1 selected</PaneText>
        :<PaneText name="Jumlah dipilih 2" strong style={{fontSize:22,color:'#3487C2'}}>2 selected</PaneText>}
      </div>
      <Button name="Remove Selected — TIDAK DIKLIK" active={amount>0} style={{fontSize:21,minHeight:54}}>Remove Selected</Button>
    </div>
  </div>;
};

const TABS=['Install','Tweaks','Config','Updates','MicroWin'] as const;
/** HTML/SVG app recreation, no screenshot flattening. Preview-only cursor/ticks; never deletes real apps. */
export const Scene05WinUtil:React.FC<{seconds:number}>=({seconds:s})=>{
  const t=SCENE05.time;
  const isInstall=s<t.installToTweaks;const showAppx=s>=t.appxOpen;
  const showAppxFade=s05ramp(s,t.appxOpen,t.appxOpen+.38);
  return <div style={{position:'absolute',left:SCENE05.ui.x,top:SCENE05.ui.y,width:SCENE05.ui.width,height:SCENE05.ui.height,pointerEvents:'none',fontFamily:FONT}}>
    <Interactive.Div name="S05 — Jendela WinUtil / posisi / ukuran / warna" style={{position:'absolute',inset:0,background:'#F7F9FA',border:'1px solid #CBD5DE',borderRadius:21,overflow:'hidden',boxShadow:'0 23px 66px rgba(9,27,42,.22)',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Interactive.Div name="S05 — Bilah judul WinUtil / posisi / warna" style={{height:74,background:'#EFF3F6',display:'flex',alignItems:'center',padding:'0 27px',translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <Interactive.Div name="S05 — Logo WinUtil W" style={{width:33,height:33,display:'grid',placeItems:'center',fontSize:23,color:'#FFF',fontWeight:770,background:'#3087C5',borderRadius:7,marginRight:17,translate:'0px 0px',scale:1,rotate:'0deg'}}>W</Interactive.Div>
        <PaneText name="Judul Chris Titus Tech Windows Utility" strong style={{fontSize:25}}>Chris Titus Tech's Windows Utility</PaneText>
        <PaneText name="Kontrol Window" style={{position:'absolute',right:20,top:17,fontSize:29,color:'#82909D'}}>–  □  ×</PaneText>
      </Interactive.Div>
      <div style={{position:'absolute',top:94,left:23,right:23,display:'flex',gap:9}}>
        {TABS.map((tab,i)=>{
          const active=isInstall?i===0:i===1;
          return <Interactive.Div key={tab} name={`S05 — Tab ${tab} / posisi`} style={{flex:1,height:61,borderRadius:10,background:active?'#DEEAF5':'#F0F3F6',border:`${active?2:1}px solid ${active?'#81AEDA':'#DDE4EA'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:active?710:520,color:active?'#2E567B':'#5F7081',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>{tab}</Interactive.Div>;
        })}
      </div>
      {isInstall?<Install/>:showAppx?<div style={{position:'absolute',inset:0,opacity:showAppxFade,transform:`translateX(${Math.round((1-showAppxFade)*13)}px)`}}><AppX s={s}/></div>:<Tweaks s={s}/>}
    </Interactive.Div>
  </div>;
};
