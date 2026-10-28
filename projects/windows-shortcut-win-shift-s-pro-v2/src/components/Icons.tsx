import React from 'react';

export const WindowsIcon: React.FC<{size?: number; color?: string}> = ({size=33,color='currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-label="Windows">
    <path d="M2 3.5 11.3 2v9.4H2V3.5Zm10.65-1.7L22 0v11.4h-9.35V1.8ZM2 12.7h9.3V22L2 20.5v-7.8Zm10.65 0H22V24l-9.35-1.7v-9.6Z"/>
  </svg>
);
export const Pointer: React.FC<{x:number;y:number;visible:boolean;crosshair?:boolean;click?:number}> = ({x,y,visible,crosshair,click=0}) => !visible?null:(
  <div style={{position:'absolute',left:x,top:y,zIndex:30,filter:'drop-shadow(0 3px 3px rgba(0,0,0,.55))',pointerEvents:'none'}}>
    {click>0&&<div style={{position:'absolute',left:-23,top:-23,width:52,height:52,border:'3px solid rgba(145,233,255,.85)',borderRadius:'50%',transform:`scale(${1+click*2.5})`,opacity:1-click}}/>}
    {crosshair?<svg width="34" height="34" viewBox="0 0 34 34"><path d="M17 1V33M1 17H33" stroke="#222" strokeWidth="4"/><path d="M17 1V33M1 17H33" stroke="white" strokeWidth="2"/></svg>:<svg width="37" height="53" viewBox="0 0 37 53"><path d="M3 2v40l10-10 8 17 9-5-9-16h13Z" stroke="#191b28" strokeWidth="3.4" fill="white" strokeLinejoin="round"/></svg>}
  </div>
);
export const SnipIcon: React.FC<{type:'rectangle'|'freeform'|'window'|'fullscreen';size?:number}> = ({type,size=27}) => {
  const common={stroke:'currentColor',strokeWidth:1.9,fill:'none',strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  return <svg width={size} height={size} viewBox="0 0 32 32" {...common}>
    {type==='rectangle'&&<><rect x="5" y="6" width="21" height="18" rx="2"/><path d="M19 27v-7m-3.5 3.5h7"/></>}
    {type==='freeform'&&<><path d="M26 17c.5-8-4-13-10-13C9 4 6 10 7 15c1 4 7 4 10 6 3 2 5 5 3 7"/><path d="M15 27h10m-5-5v10"/></>}
    {type==='window'&&<><rect x="4" y="5" width="23" height="19" rx="2"/><path d="M4 11h23m-6 15v-9m-4 5h9"/></>}
    {type==='fullscreen'&&<><path d="M12 5H5v7m15-7h7v7M5 20v7h7m15-7v7h-7"/></>}
  </svg>;
};
