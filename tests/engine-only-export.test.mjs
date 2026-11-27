import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {inspectZip} from '../tools/zip-preflight.mjs';
import {validateAddon} from '../tools/validate-addon.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function isolatedExport(fn){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-export-test-'));
 try {return fn(dir)} finally {fs.rmSync(dir,{recursive:true,force:true})}
}
function zip(dir,flag=[]){
 const r=spawnSync(process.execPath,[path.join(ROOT,'tools/zip-video.mjs'),'--studio',...flag],{
  cwd:ROOT,encoding:'utf8',env:{...process.env,MOTIONGRAPHIC_STUDIO_EXPORT_DIR:dir},timeout:120000
 });
 assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
 const files=fs.readdirSync(path.join(dir,'Master')).filter(x=>x.endsWith('.zip'));
 assert.equal(files.length,1);
 return inspectZip(path.join(dir,'Master',files[0])).paths;
}
test('default Master ZIP is standalone engine with empty registry, no old videos or generated state',()=>isolatedExport(dir=>{
 const paths=zip(dir);
 assert.ok(paths.includes('MotionGraphic-Studio/src/Root.tsx'));
 assert.ok(paths.includes('MotionGraphic-Studio/library/catalog.json'));
 assert.ok(!paths.some(p=>p.startsWith('MotionGraphic-Studio/projects/')&&p.endsWith('motiongraphic-video.json')));
 assert.ok(paths.includes('MotionGraphic-Studio/docs/EDITABLE-CONTRACT.md'));
 assert.ok(paths.includes('MotionGraphic-Studio/skills/opuscar-remotion-bridge/SKILL.md'));
 assert.ok(paths.includes('MotionGraphic-Studio/templates/sfx-library/catalog.json'));
 assert.ok(paths.includes('MotionGraphic-Studio/templates/sfx-library/audio/ui-click.wav'));
 assert.ok(paths.includes('MotionGraphic-Studio/tools/sfx-local.mjs'));
 assert.ok(paths.includes('MotionGraphic-Studio/CHATGPT-HISTORY.md'));
 assert.ok(!paths.some(p=>p.startsWith('MotionGraphic-Studio/library/sfx/')));
 assert.ok(!paths.some(p=>p.startsWith('MotionGraphic-Studio/projects/')&&p.endsWith('motiongraphic-video.json')));
 assert.ok(!paths.some(p=>p.includes('library/.studio-generated-state.json')||p.includes('library/backups/')));
}));
test('explicit backup mode includes all projects while excluding historical archives',()=>isolatedExport(dir=>{
 const paths=zip(dir,['--with-projects']);
 assert.ok(paths.includes('MotionGraphic-Studio/CHATGPT-HISTORY.md'));
 const hasIp=fs.existsSync(path.join(ROOT,'projects/ip-address/motiongraphic-video.json'));
 assert.equal(paths.includes('MotionGraphic-Studio/projects/ip-address/motiongraphic-video.json'),hasIp);
 assert.ok(paths.includes('MotionGraphic-Studio/library/.studio-generated-state.json'));
 assert.ok(!paths.some(p=>p.includes('library/backups/')));
}));
test('studio-direct-v4 starter passes static gate; flattened or unlabeled scene is refused',()=>isolatedExport(dir=>{
 const slug='v4-test-addon',base=path.join(dir,slug);
 fs.cpSync(path.join(ROOT,'templates/addon-starter'),base,{recursive:true});
 const mf=path.join(base,'motiongraphic-video.json');const manifest=JSON.parse(fs.readFileSync(mf,'utf8'));
 manifest.id='V4TestAddon';manifest.slug=slug;
 fs.writeFileSync(mf,JSON.stringify(manifest));
 let result=validateAddon(base,{root:ROOT,strict:true});
 assert.equal(result.ok,true,result.errors.join('\n'));
 const source=path.join(base,'src/scenes/Scene01.tsx');
 fs.writeFileSync(source,fs.readFileSync(source,'utf8').replace('name="S01 — Judul"',''));
 result=validateAddon(base,{root:ROOT,strict:true});
 assert.equal(result.ok,false);
 assert.ok(result.errors.some(e=>e.includes('tanpa nama')));
}));
