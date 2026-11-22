#!/usr/bin/env node
/**
 * Safe recovery for stale generated-state metadata. NEVER changes src/Root.tsx,
 * projects, approvals or the catalog. Rebuilds the canonical registry in an
 * isolated temporary Master; accepts only a BYTE-IDENTICAL Root match.
 * Refuses anything that could be a user-authored Root edit.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const rel='library/.studio-generated-state.json';
const target=path.join(ROOT,rel);
const realRoot=path.join(ROOT,'src/Root.tsx');
const isClean=p=>!fs.lstatSync(p).isSymbolicLink();
function copy(source,dest){
  if(!fs.existsSync(source))return;
  if(!isClean(source))throw Error('Symlink ditolak: '+source);
  fs.mkdirSync(path.dirname(dest),{recursive:true});
  fs.cpSync(source,dest,{recursive:true,filter:p=>{
    if(!isClean(p))throw Error('Symlink ditolak: '+p);
    return !['node_modules','.git','exports','out','dist'].includes(path.basename(p));
  }});
}
export function reconcile(root=ROOT,{apply=false}={}) {
  const rootFile=path.join(root,'src/Root.tsx');
  const stateFile=path.join(root,rel);
  if(!fs.existsSync(rootFile)||!fs.existsSync(stateFile))throw Error('Root atau generated-state tidak ditemukan');
  const current=fs.readFileSync(rootFile);
  if(!current.toString('utf8').includes('AUTO-GENERATED via npm run sync'))throw Error('Root bukan generated registry standar; tidak memulihkan otomatis');
  const previous=fs.readFileSync(stateFile),prior=JSON.parse(previous.toString('utf8'));
  if(prior.version!==2 || !prior.rootText || !prior.rootHash)throw Error('Generated state lama invalid; pemulihan otomatis ditolak');
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'motion-registry-proof-'));
  const dst=path.join(temp,'MotionGraphic-Studio');
  try {
    for(const dir of ['projects','tools','contracts'])copy(path.join(root,dir),path.join(dst,dir));
    for(const file of ['package.json','tsconfig.json'])copy(path.join(root,file),path.join(dst,file));
    fs.mkdirSync(path.join(dst,'src'),{recursive:true});
    fs.mkdirSync(path.join(dst,'library'),{recursive:true});
    fs.writeFileSync(path.join(dst,'src/Root.tsx'),"import React from 'react';\nimport {Folder} from 'remotion';\n/** Initial empty registry. npm run sync generates the actual Root. */\nexport const Root: React.FC = () => <Folder name=\"Videos\">{null}</Folder>;\n");
    fs.writeFileSync(path.join(dst,'library/catalog.json'),'{"schemaVersion":1,"videos":[]}\n');
    const tool=path.join(dst,'tools/sync-projects.mjs');
    const proof=spawnSync(process.execPath,[tool],{cwd:dst,encoding:'utf8',timeout:35000,maxBuffer:2*1024*1024});
    if(proof.status!==0)throw Error('Rebuild bukti di sandbox gagal: '+(proof.stderr||proof.stdout||'error').slice(-1200));
    const rebuilt=fs.readFileSync(path.join(dst,'src/Root.tsx'));
    if(!rebuilt.equals(current))throw Error('Root aktual TIDAK IDENTIK dengan registry canonical dari manifest; perbedaan mungkin berasal dari edit Studio. Tidak menimpa state atau Root.');
    const expected=fs.readFileSync(path.join(dst,rel));
    const data=JSON.parse(expected.toString('utf8'));
    if(data.rootText!==current.toString('utf8'))throw Error('Generated proof inconsistent');
    if(!apply)return {verified:true,repaired:false,message:'Root identik dengan manifest; repair boleh diterapkan'};
    // Guard against concurrent Studio edits while proof was running.
    if(!fs.readFileSync(rootFile).equals(current)||!fs.readFileSync(stateFile).equals(previous))throw Error('Root/state berubah saat audit; tidak ditulis');
    const back=path.join(root,'library/backups/generated-state-recovery');fs.mkdirSync(back,{recursive:true});
    const backup=path.join(back,`generated-state-${new Date().toISOString().replace(/[:.]/g,'-')}.json`);
    fs.writeFileSync(backup,previous);
    const tmp=stateFile+'.'+process.pid+'.tmp';fs.writeFileSync(tmp,expected);fs.renameSync(tmp,stateFile);
    return {verified:true,repaired:true,backup};
  }finally{fs.rmSync(temp,{recursive:true,force:true})}
}
const called=process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(called){
 try {const r=reconcile(ROOT,{apply:process.argv.includes('--repair')});console.log('[GENERATED STATE] '+JSON.stringify(r));}
 catch(e){console.error('[GENERATED STATE ERROR] '+e.message);process.exitCode=1;}
}
