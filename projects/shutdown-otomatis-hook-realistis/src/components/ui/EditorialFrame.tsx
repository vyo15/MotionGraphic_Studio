import React from 'react';
import {EditableG} from '../editable/EditableG';
import type {EditorState,SceneKey,DesignOverrides} from '../../config/editable';
import {getLayer,mergeDesign} from '../../config/editable';
/** Shared visual header/footer. One SVG viewBox is exactly half physical pixels. */
export const EditorialFrame:React.FC<{scene:SceneKey;editor?:EditorState;design?:DesignOverrides}>=({scene,editor,design})=>{
 const d=mergeDesign(design);
 return <>
  <EditableG name={`${scene.toUpperCase()} · Background`} control={getLayer(editor,scene,'background')}>
   <rect width="540" height="960" fill={d.background}/>
  </EditableG>
  <EditableG name={`${scene.toUpperCase()} · Header`} control={getLayer(editor,scene,'header')}>
   <text x="42" y="56" fontSize="14" fontFamily={d.fontFamily} fontWeight="800" letterSpacing="2.5" fill={d.accent}>WINDOWS · TIPS 01</text>
   <path d="M42 70H135" stroke={d.accent} strokeWidth="2.5"/>
   <path d="M0 98H540" stroke="#E8E5E1" strokeWidth="1.5"/>
  </EditableG>
  <EditableG name={`${scene.toUpperCase()} · Footer`} control={getLayer(editor,scene,'footer')}>
   <path d="M41 869H499" stroke="#E4E5E2"/>
   <text x="42" y="891" fontSize="10" fontFamily={d.fontFamily} fill="#9BA2A8" fontWeight="600" letterSpacing="1.2">SHUTDOWN OTOMATIS · PREVIEW</text>
  </EditableG>
 </>;
};
export const SceneSvg:React.FC<{children:React.ReactNode}>=({children})=><svg viewBox="0 0 540 960" width="100%" height="100%" style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
