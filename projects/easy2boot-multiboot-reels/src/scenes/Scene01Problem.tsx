import React,{useMemo} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {NativeS01Layers} from '../components/NativeSceneLayers';
import {frameSvg} from '../components/FrameSvgRenderer';
import {frames} from '../config/frames/scene01';
import {SCENE01_SVG} from '../config/scene01Svg';
import type {Easy2BootScene03Props} from '../config/props';
const xml=(v:string)=>v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const splitAccent=(text:string)=>{const parts=text.trim().split(/\s+/);return `${xml(parts.slice(0,-1).join(' '))} <tspan fill="#DF805F">${xml(parts[parts.length-1]??'')}</tspan>`};
const customize=(src:string,p:Easy2BootScene03Props)=>src
  .replace('MAU INSTAL',xml(p.title01Need))
  .replace('WINDOWS <tspan fill="#DF805F">11?</tspan>',splitAccent(p.title01Target))
  .replace('WINDOWS <tspan fill="#DF805F">10.</tspan>',splitAccent(p.title01Wrong))
  .replace('BUAT <tspan fill="#DF805F">ULANG?</tspan>',splitAccent(p.title01Redo))
  .replace('NUNGGU <tspan fill="#DF805F">LAGI.</tspan>',splitAccent(p.title01Wait))
  .replaceAll('#F7F7F5',p.backgroundColor);
/** S01 — layer terpisah, typography via Props, animasi deterministik. */
/** Declarative frame renderer: text, SVG objects and animation use the same source data. */
export const Scene01Problem:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const original=useMemo(()=>customize(SCENE01_SVG,props),[props]);
 const markup=useMemo(()=>frameSvg(original,'S01',frame,frames,props.layerOverrides,props.fontFamily),[original,frame,props.layerOverrides,props.fontFamily]);
 return <AbsoluteFill style={{background:props.backgroundColor}}><NativeS01Layers markup={markup}/></AbsoluteFill>;
};
