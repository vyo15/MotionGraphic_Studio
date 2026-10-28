#!/usr/bin/env node
/**
 * MotionGraphic Studio: Remotion official skills bootstrap / audit.
 * Does not touch src/Root.tsx, src/index.ts, package.json, library/catalog.json or projects/.
 * Fallback local skill adapters are already bundled in .agents/skills/.
 */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const skillsDir=path.join(root,'.agents','skills');
const stateFile=path.join(root,'.agents','remotion-skills-bootstrap.json');
const expected=['remotion-best-practices','remotion-create','remotion-markup','remotion-studio','remotion-render','remotion-maps','remotion-captions','remotion-saas','remotion-interactivity','remotion-docs','remotion-upgrade','remotion-multimedia'];
const extra='remotion-license';
const mode=(process.argv[2]||'status').toLowerCase();
const read=(p)=>{try{return fs.readFileSync(p,'utf8')}catch{return null}};
function inventory(){return expected.map(n=>{const file=path.join(skillsDir,n,'SKILL.md');const content=read(file);return {name:n,source:content?.includes('MotionGraphic Studio local adapter:')?'local-fallback':content?'upstream/other':'missing',bytes:content?.length||0};})}
function show(){
  console.log('\n=== REMOTION AGENT SKILLS - MOTIONGRAPHIC STUDIO ===');
  for(const s of inventory()) console.log(`${s.source==='missing'?'[MISSING]':s.source==='local-fallback'?'[LOKAL]':'[ADA]'} ${s.name} (${s.source})`);
  console.log(read(path.join(skillsDir,extra,'SKILL.md'))?'[ADA] remotion-license (referensi lokal tambahan)':'[MISSING] remotion-license');
  console.log('Lokasi skill: '+skillsDir);
  console.log('Sumber resmi: https://github.com/remotion-dev/skills');
}
function run(cmd,args,timeout){
 console.log('[SKILL] '+cmd+' '+args.join(' '));
 const r=spawnSync(cmd,args,{cwd:root,stdio:'inherit',shell:process.platform==='win32',timeout,windowsHide:false,env:{...process.env,CI:'1'}});
 if(r.error) console.warn('[SKILL] '+r.error.message);
 return r.status===0;
}
function install(timeout){
  // Prefer Remotion's official built-in installer; no new project runtime dependency.
  const cli=path.join(root,'node_modules','@remotion','cli','remotion-cli.js');
  let ok=false;
  if(fs.existsSync(cli)) ok=run(process.execPath,[cli,'skills','add'],timeout);
  if(!ok && mode!=='auto') {
    // Official generic Agent Skills installer. It installs into this project, not globally.
    const npx=process.platform==='win32'?'npx.cmd':'npx';
    ok=run(npx,['--yes','skills@latest','add','remotion-dev/skills','--all','--yes'],timeout);
  }
  const statuses=inventory();
  const count=statuses.filter(s=>s.source==='upstream/other').length;
  const success=ok && count===expected.length;
  const report={attemptedAt:new Date().toISOString(),command:mode,success,verifiedOfficialSkillCount:count,expectedOfficialSkillCount:expected.length,source:'remotion-dev/skills',note:success?'Twelve official repo skills available; remotion-license is a separate local reference.':'Bundled local fallback remains available. Re-run installer when internet and Node.js/npm are ready.'};
  fs.mkdirSync(path.dirname(stateFile),{recursive:true});
  fs.writeFileSync(stateFile,JSON.stringify(report,null,2)+'\n');
  console.log(`[SKILL] Verified official folders: ${count}/${expected.length}.`);
  if(!success)console.warn('[SKILL] Instalasi resmi belum lengkap. Panduan lokal tetap tersedia. Untuk mencoba ulang, klik INSTALL-SEMUA-SKILL-REMOTION.bat.');
  else console.log('[SKILL] Semua 12 skill dari repo resmi terdeteksi.');
  return success;
}
if(mode==='status'||mode==='check'){show(); process.exit(0)}
if(mode==='auto'){
 let state=null; try{state=JSON.parse(read(stateFile)||'null')}catch{console.warn('[SKILL] Status instalasi lama tidak valid; akan coba ulang sekali.')} 
 if(state?.success)process.exit(0);
 if(state?.attemptedAt){console.log('[SKILL] Instalasi otomatis sebelumnya sudah dicoba. Lewati agar Studio tetap cepat.');process.exit(0)}
 console.log('[SKILL] Mencoba sync skill resmi satu kali, tanpa mengubah video lama...');
 install(35000); process.exit(0); // Never prevent Studio from opening when offline.
}
if(mode==='install'||mode==='update'){
 const ok=install(150000);show();process.exit(ok?0:1);
}
console.error('Gunakan: node tools/remotion-skills.mjs status|auto|install|update');process.exit(2);
