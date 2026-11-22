import React,{useMemo} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {NativeS03Layers} from '../components/NativeSceneLayers';
import {Scene03MergedWorkflow} from '../components/Scene03MergedWorkflow';
import {frameSvg} from '../components/FrameSvgRenderer';
import {frames} from '../config/frames/scene03';
import {SCENE03_SVG} from '../config/scene03Svg';
import {cleanScene03Svg} from '../config/scene03Clean';
import type {Easy2BootScene03Props} from '../config/props';

const escapeXml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const withText = (svg: string, props: Easy2BootScene03Props): string => {
  // Kata kunci mengikuti VO. Pertahankan tag tspan dan layer independen.
  return svg
    .replace('BACKUP <tspan fill="#DF805F">DATA.</tspan>', `BACKUP <tspan fill="#DF805F">${escapeXml(props.titleBackup.replace(/^BACKUP\s*/i, ''))}</tspan>`)
    .replace('>EASY2BOOT.</text></g>', `>${escapeXml(props.titleOpen)}</text></g>`)
    .replace('PILIH <tspan fill="#DF805F">USB.</tspan>', `${escapeXml(props.titleSelect.split(' ')[0] ?? 'PILIH')} <tspan fill="#DF805F">${escapeXml(props.titleSelect.split(' ').slice(1).join(' ') || 'USB.')}</tspan>`)
    .replace('BUAT <tspan fill="#DF805F">USB.</tspan>', `BUAT <tspan fill="#DF805F">${escapeXml(props.titleCreate.replace(/^BUAT\s*/i,''))}</tspan>`)
    .replace('USB <tspan fill="#DF805F">SIAP.</tspan>', `USB <tspan fill="#DF805F">${escapeXml(props.titleDone.replace(/^USB\s*/i,''))}</tspan>`)
    .replaceAll('E: USB Flash Drive  —  32 GB', escapeXml(props.usbDriveLabel))
    .replace('EASY2BOOT — SATU USB, BANYAK PILIHAN', escapeXml(props.footerText));
};

/**
 * Removes only the four legacy B/C/D/E screen-level subtrees, not A/bridge.
 * A small balanced-tag scanner avoids regex truncating nested SVG <g> elements.
 * The originals remain in scene03Svg.ts for historical rollback.
 */
const withoutLegacyWorkflow=(source:string):string=>{
  let output=source;
  for(const id of ['B','C','D','E']){
    const begin=output.indexOf(`<g id="${id}"`);
    if(begin<0)continue;
    const groups=/<\/?g\b[^>]*>/g;
    groups.lastIndex=begin;
    let depth=0;let end=-1;let match:RegExpExecArray|null;
    while((match=groups.exec(output))!==null){
      depth+=match[0].startsWith('</')?-1:1;
      if(depth===0){end=groups.lastIndex;break;}
    }
    if(end<0)throw new Error(`Scene03: missing close tag for ${id}`);
    output=output.slice(0,begin)+output.slice(end);
  }
  return output;
};

/** Editable vector scene — individual objects are SVG groups (not raster video). */
/** Declarative frame renderer: text, SVG objects and animation use the same source data. */
export const Scene03Preparation:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const original=useMemo(()=>withoutLegacyWorkflow(withText(cleanScene03Svg(SCENE03_SVG,props).replaceAll('#F7F7F5',props.backgroundColor),props)),[props]);
 const markup=useMemo(()=>{
  return frameSvg(original,'S03',frame,frames,props.layerOverrides,props.fontFamily);
 },[original,frame,props.layerOverrides,props.fontFamily]);
 return <AbsoluteFill style={{background:props.backgroundColor}}>
  <NativeS03Layers markup={markup} overrides={props.layerOverrides}/>
  <Scene03MergedWorkflow props={props}/>
 </AbsoluteFill>;
};
