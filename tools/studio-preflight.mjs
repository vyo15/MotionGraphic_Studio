/** Shared runtime gates. No test suite, render, cleanup or approval mutation. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT} from './menu-helper.mjs';
import {ensureExportDirs} from './export-paths.mjs';
export const STATIC_GATES=[['Registrasi','check-sync-state.mjs'],['Source dan aset','validate-library.mjs'],['Sintaks','check-source-syntax.mjs'],['Teks dan style','check-direct-studio-text.mjs'],['Native editable','qa-native-editable.mjs'],['Layout','check-layout-flow.mjs']];
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
 return {file,run,staticChecks(){for(const [label,script] of STATIC_GATES)run(label,script)}};
}
