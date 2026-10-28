#!/usr/bin/env node
/**
 * UI flow integrity guard — v1.
 * A structural Windows UI row (tabs, navbar, toolbar, table header, list row)
 * is edited with `Interactive.Div`, but must remain in its CSS flex/grid flow.
 *
 * Mark such nodes data-layout-role="flow".
 * The program rejects absolute/fixed positions that detach them from siblings,
 * and warns on non-zero translate that may cause visual overlap.
 * It NEVER rewrites project source.
 */
import {createRequire} from 'node:module';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {dirname,join,resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const ts=createRequire(import.meta.url)('typescript');
const base=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const projects=join(base,'projects');
const all=[];
const walk=(dir)=>{
 if(!existsSync(dir))return;
 for(const ent of readdirSync(dir,{withFileTypes:true})){
  if(ent.isSymbolicLink())continue;
  const at=join(dir,ent.name);
  if(ent.isDirectory())walk(at);
  else if(ent.isFile() && ent.name.endsWith('.tsx'))all.push(at);
 }
};
walk(projects);
let fail=0,flowNodes=0,warnings=0;
for(const file of all){
 const sf=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const visit=(node)=>{
  if((ts.isJsxOpeningElement(node)||ts.isJsxSelfClosingElement(node)) && node.tagName.getText(sf).startsWith('Interactive.')){
   const attrs=node.attributes.properties.filter(ts.isJsxAttribute);
   const role=attrs.find(a=>a.name.text==='data-layout-role');
   if(role?.initializer?.getText(sf)!=='"flow"') {ts.forEachChild(node,visit);return;}
   flowNodes++;
   const name=attrs.find(a=>a.name.text==='name')?.initializer?.getText(sf) || '(no name)';
   const style=attrs.find(a=>a.name.text==='style');
   const expr=style?.initializer&&ts.isJsxExpression(style.initializer)?style.initializer.expression:null;
   const get=(key)=>ts.isObjectLiteralExpression(expr) ? expr.properties.find(p=>
    ts.isPropertyAssignment(p)&&p.name.getText(sf).replaceAll(/['"]/g,'')===key
   )?.initializer.getText(sf):null;
   const position=get('position');
   const translation=get('translate');
   const label=relative(base,file)+':'+sf.getLineAndCharacterOfPosition(node.getStart(sf)).line;
   if(position && /['"](?:absolute|fixed)['"]/.test(position)){
     fail++;console.error('[FLOW ERROR] '+label+' '+name+' has '+position+'; use relative/static so its siblings remain aligned.');
   }
   if(translation && /^['"](?:(?!0(?:px|%)?\s+0(?:px|%)?)[^'"])+['"]$/.test(translation) &&
      translation!=="'0px 0px'" && translation!=='"0px 0px"'){
     warnings++;console.warn('[FLOW WARNING] '+label+' '+name+' has '+translation+'; check whether this is intentional.');
   }
  }
  ts.forEachChild(node,visit);
 };
 visit(sf);
}
console.log(`[FLOW LAYOUT] ${flowNodes} structural UI layers, ${fail} invalid absolute/fixed layouts, ${warnings} translated rows.`);
if(fail)process.exitCode=1;
