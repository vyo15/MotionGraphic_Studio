/** Shared runtime gates. No test suite, render, cleanup or approval mutation. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT} from './menu-helper.mjs';
import {ensureExportDirs} from './export-paths.mjs';
export const STATIC_GATES=[['Registrasi','check-sync-state.mjs'],['Source dan aset','validate-library.mjs'],['Sintaks','check-source-syntax.mjs'],['Teks dan style','check-direct-studio-text.mjs'],['Native editable','qa-native-editable.mjs'],['Layout','check-layout-flow.mjs']];
/** Shared read-only gate plan for startup, handoff and full maintenance QA. */
export function staticGatePlan(root=ROOT,{full=false}={}){
 const gates=STATIC_GATES.map(([label,script])=>({label,script,args:[]}));
 const drafts=[];
 const extra=[];
 const projects=path.join(root,'projects');
 if(fs.existsSync(projects))for(const d of fs.readdirSync(projects,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
  if(!d.isDirectory()||d.name.startsWith('.')||d.name.startsWith('_'))continue;
  const dir=path.join(projects,d.name),mf=path.join(dir,'motiongraphic-video.json');
  if(!fs.existsSync(mf))continue;
  const stage=JSON.parse(fs.readFileSync(mf,'utf8')).productionStage;
  if(stage==='review')gates.push({label:'Production gate '+d.name,script:'validate-addon.mjs',args:[dir,'--production','--syntax']});
  else if(stage==='draft')drafts.push(d.name);
  if(full&&stage!=='review'){
   extra.push({label:'Sound '+d.name,script:'qa-sound-cues.mjs',args:[dir,'--strict']});
   if(fs.existsSync(path.join(dir,'production','spatial-plan.json')))extra.push({label:'Spatial '+d.name,script:'qa-spatial.mjs',args:[dir]});
  }
 }
 if(full)gates.push(
  {label:'Release',script:'check-release.mjs',args:[]},
  {label:'Legacy editable inventory',script:'check-editability.mjs',args:['--strict']},
  {label:'Layer instances',script:'check-layer-instances.mjs',args:[]},
  {label:'Motion plans',script:'qa-motion-plan.mjs',args:['--all']},
  {label:'Approval state',script:'production-scope.mjs',args:[]},
  {label:'Approval board freshness',script:'scene-approval-board.mjs',args:['--all','--check']},
  {label:'SFX library',script:'sfx-local.mjs',args:['verify']},...extra);
 return {gates,drafts};
}
export function createPreflightLog(name='Studio-startup.log'){
 const file=path.join(ensureExportDirs().logs,name);
 fs.writeFileSync(file,`[${new Date().toISOString()}] ${name}\n`);
 const run=(label,script,args=[])=>{
  const r=spawnSync(process.execPath,[path.join(ROOT,'tools',script),...args],{cwd:ROOT,encoding:'utf8',maxBuffer:32*1024*1024,windowsHide:true});
  fs.appendFileSync(file,`\n=== ${label} ===\n${r.stdout??''}${r.stderr??''}${r.error?.message??''}\nexit=${r.status}\n`);
  if(r.status!==0){console.error(`[GAGAL] ${label}\n${r.stderr||r.stdout||r.error?.message||'Proses berhenti'}\nLog: ${file}`);throw Error(`${label} gagal`)}
  const warning=(r.stderr??'').trim();
  if(warning)console.warn(`[PERHATIAN] ${label}:\n${warning}`);
  return r;
 };
 return {file,run,staticChecks(){
  const {gates,drafts}=staticGatePlan();
  for(const {label,script,args} of gates)run(label,script,args);
  for(const name of drafts)console.log('[DRAFT] '+name+' — bukan preview produksi yang tervalidasi.');
 }};
}
