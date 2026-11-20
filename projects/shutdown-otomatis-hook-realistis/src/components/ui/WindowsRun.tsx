import React from 'react';
import {EditableG} from '../editable/EditableG';
import {getLayer} from '../../config/editable';
import type {EditorState,DesignOverrides} from '../../config/editable';
import {mergeDesign} from '../../config/editable';
/** Editable, Windows-Run-inspired layout, no screenshot or faux OS output. */
export const WindowsRun:React.FC<{command:string;typed:number;opacity:number;focus:number;clicked:number;editor?:EditorState;design?:DesignOverrides;runLabel?:string}>=({command,typed,opacity,focus,clicked,editor,design,runLabel='Run'})=>{
 const d=mergeDesign(design),x=63,y=295,w=414,h=295;
 const input=command.slice(0,Math.round(command.length*typed));
 return <>
  <EditableG name="S04 · Run · Jendela dan header" control={getLayer(editor,'scene04','runWindow')}>
   <g opacity={opacity}>
    <rect x={x+5} y={y+11} width={w} height={h} rx="12" fill="#BCC6CE"/>
    <rect x={x} y={y} width={w} height={h} rx="12" fill="#FFFFFF" stroke="#D0D6DC" strokeWidth="1.5"/>
    <path d={`M${x+11} ${y}H${x+w-11}Q${x+w} ${y} ${x+w} ${y+11}V${y+39}H${x}V${y+11}Q${x} ${y} ${x+11} ${y}Z`} fill="#EDF2F6"/>
    <rect x={x+18} y={y+13} width="13" height="13" rx="2" fill="#D99B65"/>
    <rect x={x+20} y={y+16} width="9" height="7" rx="1" fill="#FFFFFF"/>
    <text x={x+42} y={y+26} fontSize="15" fontWeight="650" fill={d.ink}>{runLabel}</text>
    <text x={x+w-25} y={y+26} fontSize="21" textAnchor="middle" fill="#778592">×</text>
    <text x={x+25} y={y+83} fontSize="11" fill={d.ink}>Type the name of a program, folder, document,</text>
    <text x={x+25} y={y+101} fontSize="11" fill={d.ink}>or Internet resource, and Windows will open it for you.</text>
    <text x={x+25} y={y+147} fontSize="13" fill={d.ink}>Open:</text>
   </g>
  </EditableG>
  <EditableG name="S04 · Run · Input perintah" control={getLayer(editor,'scene04','commandInput')}>
   <g opacity={opacity}>
    <rect x={x+85} y={y+126} width="301" height="35" rx="4" stroke={focus>0.3?d.accent:'#99AEBF'} strokeWidth={focus>0.3?2:1.2} fill="#FFFFFF"/>
    <text x={x+97} y={y+149} fontSize="14" fill={d.ink} fontFamily="DejaVu Sans Mono,monospace" fontWeight="600">{input}</text>
    {typed>0&&typed<1?<line x1={x+98+input.length*8.4} x2={x+98+input.length*8.4} y1={y+134} y2={y+152} stroke={d.ink} strokeWidth="1.4"/>:null}
   </g>
  </EditableG>
  <EditableG name="S04 · Run · Tombol OK/Cancel" control={getLayer(editor,'scene04','runButtons')}>
   <g opacity={opacity}>
    <rect x={x+242} y={y+207} width="61" height="34" rx="3" fill={clicked?'#E7F4EE':'#EDF3F6'} stroke="#DAE2E6"/>
    <text x={x+272} y={y+230} fontSize="12" textAnchor="middle" fontWeight="650" fill={d.ink}>OK</text>
    <rect x={x+311} y={y+207} width="75" height="34" rx="3" fill="#F5F6F7"/>
    <text x={x+348} y={y+230} fontSize="12" textAnchor="middle" fill={d.ink}>Cancel</text>
    <rect x={x+242} y={y+248} width="144" height="30" rx="3" fill="#F5F6F7"/>
    <text x={x+314} y={y+268} fontSize="11" textAnchor="middle" fill={d.ink}>Browse...</text>
   </g>
  </EditableG>
 </>;
};
