/** Static native guide style/cue contract. Does not measure rendered glyphs or prove DOM visibility. */
import fs from 'node:fs';
import {resolveSpatialProfile} from './spatial-profiles.mjs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
export function inspectDesignGuide(dir,manifest,files){
 const errors=[];const fail=m=>errors.push(m);
 try{
  const ts=require('typescript');
  const plan=JSON.parse(fs.readFileSync(path.join(dir,'production/spatial-plan.json'),'utf8'));
  const narration=JSON.parse(fs.readFileSync(path.join(dir,'src/config/narration.json'),'utf8'));
  const tracks=plan.tracks.filter(t=>t.role==='vo-guide');const wanted=new Map(tracks.map(t=>[t.id,t]));const found=new Map();
  const {sy,reference}=resolveSpatialProfile(manifest);
  const attr=(node,key)=>node.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.text===key);
  const normalize=s=>s.replace(/\s+/g,' ').trim();
  for(const file of files.filter(f=>/\.tsx$/.test(f)&&f.includes(path.sep+'src'+path.sep))){
   const sf=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
   const walk=node=>{
    if(ts.isJsxElement(node)&&/^Interactive\.(Text|Div)$/.test(node.openingElement.tagName.getText(sf))){
     const el=node.openingElement,name=attr(el,'name')?.initializer;
     if(name&&ts.isStringLiteral(name)&&wanted.has(name.text)){
      const id=name.text,track=wanted.get(id);if(found.has(id))fail('Duplicate guide '+id);
      const text=node.children.map(c=>c.getText(sf)).join('').trim();
      if(!text||node.children.some(c=>!ts.isJsxText(c))||/[\r\n]/.test(text))fail('Guide must be single literal line: '+id);
      found.set(id,text);
      const init=attr(el,'style')?.initializer,style=init&&ts.isJsxExpression(init)?init.expression:null;
      if(!style||!ts.isObjectLiteralExpression(style)){fail('Guide style must be inline: '+id);}else{
       const props=new Map(style.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(sf).replace(/['"]/g,''),p.initializer]));
       const str=k=>{const v=props.get(k);return v&&ts.isStringLiteral(v)?v.text:null;};
       const num=k=>{const v=props.get(k);return v&&ts.isNumericLiteral(v)?Number(v.text):NaN;};
       if(!str('fontFamily')?.startsWith('MG Inter')||num('fontWeight')!==500||!(num('fontSize')>=reference.guideFontMin*sy-.001&&num('fontSize')<=reference.guideFontMax*sy+.001)||str('whiteSpace')!=='nowrap'||str('textAlign')!=='center'||num('lineHeight')!==1.2)fail('Guide typography/nowrap mismatch: '+id);
       for(const k of ['background','backgroundColor','backgroundImage','boxShadow','textShadow','border','borderWidth','animation','transition','opacity','overflow','textOverflow'])if(props.has(k)&&!(k==='backgroundColor'&&str(k)==='transparent'))fail('Guide decoration/animation forbidden: '+id+' '+k);
       if(style.properties.some(p=>!ts.isPropertyAssignment(p)))fail('Guide style must be literal: '+id);
       for(const k of track.keys)for(const [a,b] of [['left','x'],['top','y'],['width','w'],['height','h']])if(Math.abs(num(a)-k.value[b])>.01||!Number.isFinite(num(a)))fail('Guide source/plan geometry mismatch: '+id+' '+a);
      }
     }
    }
    ts.forEachChild(node,walk);
   };walk(sf);
  }
  for(const t of tracks)if(!found.has(t.id))fail('Guide native source missing: '+t.id);
  for(const b of narration.beats){const cues=tracks.filter(t=>t.start>=b.startFrame&&t.end<=b.endFrame).sort((a,b)=>a.start-b.start);if(normalize(cues.map(t=>found.get(t.id)||'').join(' '))!==normalize(b.text))fail('Guide text differs from narration: '+b.scene+' @'+b.startFrame);}
 }catch(e){fail(e.message);}
 return {ok:errors.length===0,errors};
}
