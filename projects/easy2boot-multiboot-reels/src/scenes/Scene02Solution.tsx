import React,{useMemo} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {NativeS02Layers} from '../components/NativeSceneLayers';
import {frameSvg} from '../components/FrameSvgRenderer';
import {frames} from '../config/frames/scene02';
import {SCENE02_SVG} from '../config/scene02Svg';
import type {Easy2BootScene03Props} from '../config/props';
const xml=(v:string)=>v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const splitAccent=(text:string)=>{const parts=text.trim().split(/\s+/);return `${xml(parts.slice(0,-1).join(' '))} <tspan fill="#DF805F">${xml(parts[parts.length-1]??'')}</tspan>`};
const customize=(src:string,p:Easy2BootScene03Props)=>{
 let out=src.replaceAll('#F7F7F5',p.backgroundColor);
 if(p.title02NoRedo!=='NGGAK PERLU.')out=out.replace('NGGAK <tspan fill="#F0A080">PERLU.</tspan>',xml(p.title02NoRedo));
 if(p.title02App!=='EASY 2BOOT.')out=out.replace('EASY<tspan fill="#DF805F">2BOOT.</tspan>',splitAccent(p.title02App));
 if(p.title02Usb!=='SATU FLASHDISK')out=out.replace('FLASH<tspan fill="#DF805F">DISK.</tspan>',xml(p.title02Usb));
 if(p.title02Installers!=='BEBERAPA')out=out.replace('BEBERAPA</text>',`${xml(p.title02Installers)}</text>`);
 return out;
};
/** S02 — layer terpisah, typography via Props, animasi deterministik. */
/** Declarative frame renderer: text, SVG objects and animation use the same source data. */
export const Scene02Solution:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const original=useMemo(()=>customize(SCENE02_SVG,props),[props]);
 const markup=useMemo(()=>frameSvg(original,'S02',frame,frames,props.layerOverrides,props.fontFamily),[original,frame,props.layerOverrides,props.fontFamily]);
 return <AbsoluteFill style={{background:props.backgroundColor}}><NativeS02Layers markup={markup}/></AbsoluteFill>;
};
