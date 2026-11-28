import {copyFixtureTools} from './fixture-tools.mjs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createZip,collectEntries} from '../tools/zip-core.mjs';
import {inspectZip} from '../tools/zip-preflight.mjs';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// The isolated host has no node_modules. Use the parent project's installed parser,
// not a silently downgraded syntax-validation mode.
const fixtureEnv={...process.env,NODE_PATH:[path.join(ROOT,'node_modules'),process.env.NODE_PATH].filter(Boolean).join(path.delimiter)};
const fixture=cb=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-import-fixture-'));return Promise.resolve().then(()=>cb(dir)).finally(()=>fs.rmSync(dir,{recursive:true,force:true}))};
function host(dir){
 for(const n of ['tools','projects','src','library'])fs.mkdirSync(path.join(dir,n),{recursive:true});
 fs.cpSync(path.join(ROOT,'templates/production-toolkit'),path.join(dir,'templates/production-toolkit'),{recursive:true});
 copyFixtureTools(ROOT,dir);
 fs.writeFileSync(path.join(dir,'package.json'),JSON.stringify({dependencies:{react:'19',remotion:'4.0.538'}}));
 fs.writeFileSync(path.join(dir,'library/catalog.json'),JSON.stringify({schemaVersion:1,videos:[]}));
}
function addon(dir){
 const source=path.join(dir,'incoming/demo-addon');fs.mkdirSync(path.join(source,'src/config'),{recursive:true});
 for(const x of ['src/scenes','src/components','src/animations'])fs.mkdirSync(path.join(source,x),{recursive:true});
 fs.writeFileSync(path.join(source,'README.md'),'Test fixture');fs.writeFileSync(path.join(source,'PANDUAN-EDIT-ASSET.md'),'Fixture');
 fs.mkdirSync(path.join(source,'public/audio'),{recursive:true});fs.writeFileSync(path.join(source,'public/audio/voice.wav'),'mock asset');
 const m={contractVersion:'1.0.0',id:'DemoAddon',slug:'demo-addon',title:'Demo',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:60,defaultProps:{}};
 fs.writeFileSync(path.join(source,'motiongraphic-video.json'),JSON.stringify(m));
 fs.writeFileSync(path.join(source,'src/Video.tsx'),"import {staticFile} from 'remotion'; export const Video=()=>staticFile('videos/demo-addon/audio/voice.wav');\n");
 return source;
}
test('real add-on ZIP imports and syncs without touching other active projects',()=>fixture(async dir=>{
 host(dir);const source=addon(dir);
 const entries=await collectEntries([{absolute:source,name:'demo-addon'}]);
 const zip=path.join(dir,'test-addon.zip');await createZip(entries,zip);
 assert.ok(inspectZip(zip).paths.includes('demo-addon/motiongraphic-video.json'));
 const r=spawnSync(process.execPath,[path.join(dir,'tools/import-video.mjs'),zip],{cwd:dir,encoding:'utf8',env:fixtureEnv});
 assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
 assert.ok(fs.existsSync(path.join(dir,'projects/demo-addon/src/config/narration.json')));
 const imported=fs.readFileSync(path.join(dir,'projects/demo-addon/src/Video.tsx'),'utf8');
 assert.match(imported,/videos\/demo-addon\/audio\/voice.wav/);
 const catalog=JSON.parse(fs.readFileSync(path.join(dir,'library/catalog.json'),'utf8'));
 assert.equal(catalog.videos.length,1);
 assert.equal(catalog.videos[0].voiceGuideCompositionId,'DemoAddonVOGuide');
 const again=spawnSync(process.execPath,[path.join(dir,'tools/import-video.mjs'),zip],{cwd:dir,encoding:'utf8',env:fixtureEnv});
 assert.notEqual(again.status,0);
 assert.match(again.stderr,/Project sudah ada/);
 assert.equal(fs.readFileSync(path.join(dir,'projects/demo-addon/src/Video.tsx'),'utf8'),imported);
}));
test('ZIP lean really excludes historical backups, while keeping project data and contracts',()=>fixture(async dir=>{
 fs.mkdirSync(path.join(dir,'library/backups'),{recursive:true});
 fs.mkdirSync(path.join(dir,'projects/demo'),{recursive:true});
 fs.mkdirSync(path.join(dir,'contracts'),{recursive:true});
 fs.writeFileSync(path.join(dir,'library/backups/old.txt'),'old');
 fs.writeFileSync(path.join(dir,'projects/demo/video.txt'),'keep');
 fs.writeFileSync(path.join(dir,'contracts/studio-capabilities.json'),'{}');
 const entries=await collectEntries(['library','projects','contracts'].map(n=>({absolute:path.join(dir,n),name:'MotionGraphic-Studio/'+n})),{
  ignoreRelative:name=>/^MotionGraphic-Studio\/library\/backups/.test(name),
 });
 assert.ok(!entries.some(x=>x.name.includes('backups')));
 assert.ok(entries.some(x=>x.name.endsWith('projects/demo/video.txt')));
 assert.ok(entries.some(x=>x.name.endsWith('contracts/studio-capabilities.json')));
 assert.ok(fs.existsSync(path.join(dir,'library/backups/old.txt')));
}));

test('legacy import failure twice quarantines uniquely and leaves no active project',()=>fixture(async dir=>{
 host(dir);const source=addon(dir);
 fs.writeFileSync(path.join(source,'src/config/narration.json'),JSON.stringify({schemaVersion:1,status:'draft',beats:[{scene:'S01',startFrame:5,endFrame:60,text:'Gap'}]}));
 const zip=path.join(dir,'bad.zip');await createZip(await collectEntries([{absolute:source,name:'demo-addon'}]),zip);
 for(let i=0;i<2;i++){const r=spawnSync(process.execPath,[path.join(dir,'tools/import-video.mjs'),zip],{cwd:dir,encoding:'utf8',env:fixtureEnv});assert.notEqual(r.status,0);assert.equal(fs.existsSync(path.join(dir,'projects/demo-addon')),false);}
 assert.equal(fs.readdirSync(path.join(dir,'library/gagal-import')).length,2);assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir,'library/catalog.json'),'utf8')).videos,[]);
}));
