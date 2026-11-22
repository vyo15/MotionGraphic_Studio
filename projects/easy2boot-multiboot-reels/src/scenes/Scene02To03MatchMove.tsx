import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame} from 'remotion';
import type {Easy2BootScene03Props, LayerOverride} from '../config/props';
import {BRIDGE02TO03} from '../config/timings';

/**
 * Locked transition Opsi 01 (Match Move), continuing the exact end pose of Scene 02.
 * No header and no decorative typography. Changes only this 02->03 bridge.
 * Every layer is an independent editable SVG React group.
 */
const ink='#202327';
const coral='#DA7A5C';
const font='Inter, Arial, sans-serif';
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
/** Quintic smootherstep: zero velocity AND zero acceleration at motion boundaries. */
const smooth=(x:number)=>{const a=clamp(x);return a*a*a*(a*(a*6-15)+10)};
const tween=(f:number,a:number,b:number)=>smooth((f-a)/(b-a));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const animOpacity=(f:number,a:number,b:number)=>1-tween(f,a,b);

type EditLayerProps={id:string;name:string;p:Easy2BootScene03Props;children:React.ReactNode;
  opacity?:number;motion?:string};
const EditLayer:React.FC<EditLayerProps>=({id,name,p,children,opacity=1,motion=''})=>{
 const f=useCurrentFrame();
 const u:LayerOverride=p.layerOverrides?.[`S02:${id}`]??{};
 if(u.visible===false||(u.startFrame!==undefined&&f<u.startFrame)||(u.endFrame!==undefined&&f>=u.endFrame))return null;
 const points=[...(u.keyframes??[])].sort((a,b)=>a.frame-b.frame);
 const at=(field:'x'|'y'|'scale'|'rotation'|'opacity',fallback:number)=>{
  const a=[...points].reverse().find(k=>k.frame<=f&&k[field]!==undefined);
  const b=points.find(k=>k.frame>f&&k[field]!==undefined);
  if(!a)return b?.[field]??fallback;
  if(!b)return a[field]??fallback;
  return lerp(a[field]??fallback,b[field]??fallback,tween(f,a.frame,b.frame));
 };
 const transform=`translate(${at('x',u.x??0)} ${at('y',u.y??0)}) rotate(${at('rotation',u.rotation??0)}) scale(${at('scale',u.scale??1)})`;
 if(id==='bridgeTop'||id==='bridgeAccent'||id==='bridgeQuestion'||id==='bridgeHowTo')return <g id={`S02B-${id}`} opacity={opacity*at('opacity',u.opacity??1)} transform={transform}><g transform={motion}>{children}</g></g>;
 return <g id={`S02B-${id}`} opacity={opacity*at('opacity',u.opacity??1)} transform={transform}>
     <g transform={motion}>{children}</g>
   </g>;
};
const Text:React.FC<{v:string;x:number;y:number;size:number;fill?:string;weight?:number}>=
 ({v,x,y,size,fill=ink,weight=800})=><text x={x} y={y} fontSize={size} fontFamily={font} fontWeight={weight}
 textAnchor="middle" dominantBaseline="middle" fill={fill}>{v}</text>;
/** Same USB vector geometry/colors/scale/lights as the approved Scene02 native component. No animation scale drift. */
const USB:React.FC<{label:string;color:string}>=({label,color})=><g transform="translate(204 447) scale(1.2)">
 <rect x={24} y={0} width={60} height={49} rx={7} fill="#9BACB5"/>
 <rect x={37} y={12} width={8} height={13} rx={1} fill="#6E818B"/>
 <rect x={63} y={12} width={8} height={13} rx={1} fill="#6E818B"/>
 <rect x={8} y={42} width={92} height={195} rx={14} fill="#29363D"/>
 <rect x={14} y={51} width={80} height={174} rx={9} fill="#31464F"/>
 <rect x={23} y={63} width={62} height={39} rx={6} fill={color}/>
 <Text x={54} y={83} v={label} size={23} fill="#FFFFFF"/>
 <rect x={42} y={216} width={24} height={9} rx={3} fill="#83969F"/>
 {[0,1,2].map(i=><rect key={i} x={24+i*20} y={147} width={15} height={17} rx={3} stroke="#FFFFFF" strokeWidth={2} fill="#E2F3FA"/>)}
</g>;

export const Scene02To03MatchMove:React.FC<Easy2BootScene03Props>=(p)=>{
 const f=useCurrentFrame();
 const move=tween(f,p.bridgeMoveStartFrame,p.bridgeMoveEndFrame);
 const topOpacity=animOpacity(f,BRIDGE02TO03.titleExitStart,BRIDGE02TO03.titleExitEnd);
 const questionOpacity=tween(f,p.bridgeQuestionStartFrame,p.bridgeQuestionEndFrame);
 // Reserve a readable hold for the question before the last-frame handoff.
 const headingOpacity=tween(f,BRIDGE02TO03.headingStart-12,BRIDGE02TO03.headingEnd-12);
 // Keep question visible until S03 readable entrance takes over. No flash of old installer card.
 const v=(id:string,def:string)=>p.layerOverrides?.[`S02:${id}`]?.text??def;
 const size=(id:string,def:number)=>p.layerOverrides?.[`S02:${id}`]?.fontSize??def;
 const color=(id:string,def:string)=>p.layerOverrides?.[`S02:${id}`]?.fill??def;
 return <AbsoluteFill style={{background:p.backgroundColor}}>
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="1080" height="1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
     <EditLayer id="bridgeTop" name="Headline — SATU FLASHDISK" p={p} opacity={topOpacity}>
       {v('bridgeTop',p.scene02ManyLine1) !== 'SATU FLASHDISK' || size('bridgeTop',32) !== 32 || color('bridgeTop',ink) !== ink ? <Text x={270} y={274} v={v('bridgeTop',p.scene02ManyLine1)} size={size('bridgeTop',32)} fill={color('bridgeTop',ink)}/> : <Interactive.Text name="S02B — bridgeTop" x={270} y={274} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={32} fontWeight={800} fill={ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SATU FLASHDISK</Interactive.Text>}
     </EditLayer>
     <EditLayer id="bridgeAccent" name="Headline — BANYAK INSTALLER" p={p} opacity={topOpacity}>
       {v('bridgeAccent',p.scene02ManyLine2) !== 'BANYAK INSTALLER' || size('bridgeAccent',36) !== 36 || color('bridgeAccent',coral) !== coral ? <Text x={270} y={326} v={v('bridgeAccent',p.scene02ManyLine2)} size={size('bridgeAccent',36)} fill={color('bridgeAccent',coral)}/> : <Interactive.Text name="S02B — bridgeAccent" x={270} y={326} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={36} fontWeight={800} fill={coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BANYAK INSTALLER</Interactive.Text>}
     </EditLayer>
     <Interactive.G name="S02B — USB sama: Match Move ke atas" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><EditLayer id="bridgeUsb" name="USB sama: Match Move ke atas" p={p}
      motion={`translate(0 ${-p.bridgeUsbRiseLogicalPx*move})`}>
       <USB label={v('bridgeUsb',p.bridgeUsbLabel)} color={color('bridgeUsb',coral)}/>
     </EditLayer></Interactive.G>
     <EditLayer id="bridgeQuestion" name="Tanda tanya muncul" p={p} opacity={questionOpacity}
      motion={`translate(0 ${34*(1-questionOpacity)})`}>
       {v('bridgeQuestion','?') !== '?' || size('bridgeQuestion',100) !== 100 || color('bridgeQuestion',coral) !== coral ? <Text x={270} y={218} v={v('bridgeQuestion','?')} size={size('bridgeQuestion',100)} fill={color('bridgeQuestion',coral)}/> : <Interactive.Text name="S02B — bridgeQuestion" x={270} y={218} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={100} fontWeight={800} fill={coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>?</Interactive.Text>}
     </EditLayer>
     <EditLayer id="bridgeHowTo" name="Pertanyaan GIMANA CARA BIKINNYA" p={p} opacity={headingOpacity}
      motion={`translate(0 ${21*(1-headingOpacity)})`}>
       {v('bridgeHowTo',p.bridgeQuestionText) !== 'GIMANA CARA BIKINNYA?' || size('bridgeHowTo',32) !== 32 || color('bridgeHowTo',ink) !== ink ? <Text x={270} y={755} v={v('bridgeHowTo',p.bridgeQuestionText)} size={size('bridgeHowTo',32)} fill={color('bridgeHowTo',ink)}/> : <Interactive.Text
        name="S02B — bridgeHowTo"
        x={270}
        y={755}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize={32}
        fontWeight={800}
        fill={ink}
        style={{
         translate: '0px -63.2px',
         scale: 1,
         rotate: '0deg',
         opacity: 1
        }}
       >GIMANA CARA BIKINNYA?</Interactive.Text>}
     </EditLayer>
   </svg>
 </AbsoluteFill>;
};
