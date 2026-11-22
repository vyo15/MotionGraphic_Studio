import React from 'react';
import {Interactive} from 'remotion';

/** Native SVG primitives. Parts are editable independently, no raster flattening. */
const P={ink:'#202628',navy:'#223640',inner:'#314954',coral:'#DF805F'};
export type InstallerName='8'|'10'|'11'|'LINUX';
export const WindowsMark:React.FC<{color?:string;size?:number}>=({color='#087BD7',size=30})=>{
  const q=(size-4)/2;
  return <g fill={color}>{[0,1].flatMap(r=>[0,1].map(c=><rect key={`${r}-${c}`} x={c*(q+4)} y={r*(q+4)} width={q} height={q} rx={1}/>))}</g>;
};
export const PenguinMark:React.FC=()=> <g>
 <ellipse cx={0} cy={0} rx={12} ry={18} fill="#202B33"/>
 <ellipse cx={0} cy={5} rx={8.2} ry={12} fill="white"/>
 <circle cx={-4} cy={-9} r={2.1} fill="white"/><circle cx={4} cy={-9} r={2.1} fill="white"/>
 <path d="M-3 -4 L7 -3 L0 3Z" fill="#F0B24E"/>
 <ellipse cx={-9} cy={14} rx={7} ry={3.5} fill="#F0B24E"/>
 <ellipse cx={9} cy={14} rx={7} ry={3.5} fill="#F0B24E"/>
 </g>;

export const InstallerTile:React.FC<{version:InstallerName;w?:number;h?:number;name:string;id:string}>=({version,w=80,h=76,name,id})=>{
 const color=version==='8'?'#D9F1FF':version==='10'?'#B9DDF6':version==='11'?'#D7E8FF':'#FFF0D3';
 const ink=version==='8'?'#108CDC':version==='10'?'#056DCE':version==='11'?'#1663CB':'#252F34';
 return <g id={id}>
  <Interactive.G name={`${name} — latar kartu`} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <rect x={0} y={0} width={w} height={h} rx={13} fill={color} stroke="#EDF3F6" strokeWidth={1.5}/>
   <rect x={3} y={3} width={w-6} height={21} rx={10} fill="#FFFFFF" fillOpacity={.3}/>
  </Interactive.G>
  <Interactive.G name={`${name} — logo OS`} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   {version==='LINUX'?<g transform={`translate(${w/2},${h*.39}) scale(${w/80})`}><PenguinMark/></g>
    :<g transform={`translate(${(w-29)/2},${h*.20})`}><WindowsMark color={ink} size={29}/></g>}
  </Interactive.G>
  <Interactive.Text name={`${name} — nama OS`} x={w/2} y={h*.81} textAnchor="middle" fontSize={version==='LINUX'?11:14}
   fontFamily="Inter, Arial, sans-serif" fontWeight="800" fill={P.ink}
   style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{version==='LINUX'?'LINUX':`WIN ${version}`}</Interactive.Text>
 </g>;
};

/** Distinct selectable layers for USB head, body, logo, slots and connector. */
export const UsbParts:React.FC<{scope:'OLD'|'MULTI'; children?:React.ReactNode}>=({scope,children})=><g>
 <Interactive.G name={scope==='OLD'?'S06 — USB satu installer — konektor':'S06 — USB multiboot — konektor'} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
  <rect x={65} y={8} width={140} height={130} rx={17} fill="#ABBBC2" stroke="#8599A4" strokeWidth={4}/>
  <rect x={99} y={37} width={12} height={34} rx={4} fill="#6C8590"/>
  <rect x={159} y={37} width={12} height={34} rx={4} fill="#6C8590"/>
 </Interactive.G>
 <Interactive.G name={scope==='OLD'?'S06 — USB satu installer — badan':'S06 — USB multiboot — badan'} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
  <rect x={21} y={101} width={228} height={322} rx={37} fill={P.navy} stroke="#14242C" strokeWidth={7}/>
  <rect x={33} y={112} width={204} height={299} rx={31} fill={P.inner}/>
  <path d="M55 135H211" stroke="#5B7581" strokeWidth={4}/>
  <rect x={112} y={397} width={46} height={12} rx={5} fill="#9CB1BB"/>
 </Interactive.G>
 <Interactive.G name={scope==='OLD'?'S06 — USB satu installer — label coral':'S06 — USB multiboot — label coral'} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
  <rect x={80} y={149} width={110} height={64} rx={14} fill={P.coral}/>
 </Interactive.G>
 <Interactive.Text name={scope==='OLD'?'S06 — USB pertama — teks USB':'S06 — USB multiboot — teks USB'} x={135} y={193} fontFamily="Inter, Arial, sans-serif" fontSize={32} fontWeight={800} textAnchor="middle" fill="#FFFFFF" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>USB</Interactive.Text>
 {children}
 </g>;
