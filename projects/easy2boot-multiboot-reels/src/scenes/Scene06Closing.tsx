import React,{useMemo} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {NativeS06Layers} from '../components/NativeSceneLayers';
import {frameSvg} from '../components/FrameSvgRenderer';
import {frames} from '../config/frames/scene06';
import {SCENE06_SVG} from '../config/scene06Svg';
import type {Easy2BootScene03Props} from '../config/props';

const escapeXml=(v:string)=>v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const customize=(src:string,p:Easy2BootScene03Props)=>src
 .replace('KALAU KAMU, BIASANYA...',escapeXml(p.ctaSetup))
 .replace('BOOTABLE <tspan fill="#DF805F">ULANG?</tspan>',escapeXml(p.ctaOld.replace(/\s*ULANG\?/i,''))+' <tspan fill="#DF805F">ULANG?</tspan>')
 .replace('MULTIBOOT?</text>',escapeXml(p.ctaMulti)+'</text>')
 .replace('TULIS DI KOMENTAR</text>',`TULIS DI ${escapeXml(p.ctaComment)}</text>`)
 .replace('<text x="540" y="382" text-anchor="middle" font-size="41" font-weight="820" fill="#DF805F" letter-spacing="4">EASY2BOOT</text>',`<text x="540" y="382" text-anchor="middle" font-size="41" font-weight="820" fill="#DF805F" letter-spacing="4">${escapeXml(p.coverBrand)}</text>`)
 .replace('>1 FLASHDISK</text>',`>${escapeXml(p.coverLine1)}</text>`)
 .replace('>BANYAK INSTALLER</text>',`>${escapeXml(p.coverLine2)}</text>`)
 .replaceAll('EASY2BOOT — SATU USB, BANYAK PILIHAN',escapeXml(p.footerText));

/** S06 — CTA yang netral, lalu cover yang diambil dari frame terakhir. */
/** Declarative frame renderer: text, SVG objects and animation use the same source data. */
export const Scene06Closing:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const original=useMemo(()=>customize(SCENE06_SVG.replaceAll('#F7F7F5',props.backgroundColor),props),[props]);
 const markup=useMemo(()=>frameSvg(original,'S06',frame,frames,props.layerOverrides,props.fontFamily),[original,frame,props.layerOverrides,props.fontFamily]);
 return <AbsoluteFill style={{background:props.backgroundColor}}><NativeS06Layers markup={markup}/></AbsoluteFill>;
};
