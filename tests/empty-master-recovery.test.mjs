import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function fixture(rootText){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-empty-recovery-'));
 for(const sub of ['tools','projects','src','library'])fs.mkdirSync(path.join(dir,sub),{recursive:true});
 fs.cpSync(path.join(ROOT,'templates/production-toolkit'),path.join(dir,'templates/production-toolkit'),{recursive:true});
 for(const name of ['sync-projects.mjs','studio-props-bridge.mjs','register-scene-segments.mjs','production-scope.mjs','validate-addon.mjs','qa-motion-plan.mjs','qa-spatial.mjs','qa-spatial-trace.mjs','approval-identity.mjs'])
  fs.copyFileSync(path.join(ROOT,'tools',name),path.join(dir,'tools',name));
 fs.writeFileSync(path.join(dir,'package.json'),'{}');
 fs.writeFileSync(path.join(dir,'library/catalog.json'),JSON.stringify({schemaVersion:1,videos:[]}));
 fs.writeFileSync(path.join(dir,'src/Root.tsx'),rootText);
 fs.writeFileSync(path.join(dir,'library/.studio-generated-state.json'),JSON.stringify({version:2,rootHash:'stale',rootText:'OLD_PROJECT_REGISTRY',propsHashes:{}}));
 return {dir,run:()=>spawnSync(process.execPath,[path.join(dir,'tools/sync-projects.mjs')],{cwd:dir,encoding:'utf8'})};
}
const emptyRoot="import React from 'react';\nimport {Folder} from 'remotion';\n/** Initial empty registry. npm run sync generates the actual Root. */\nexport const Root: React.FC = () => <Folder name=\"Videos\">{null}</Folder>;\n";
test('empty Studio can regenerate stale state after deleting old projects',()=>{
 const x=fixture(emptyRoot);try{
  const a=x.run();assert.equal(a.status,0,a.stderr+'\n'+a.stdout);
  const reg=fs.readFileSync(path.join(x.dir,'src/Root.tsx'),'utf8');
  assert.match(reg,/AUTO-GENERATED/);assert.doesNotMatch(reg,/OLD_PROJECT_REGISTRY/);
  const state=JSON.parse(fs.readFileSync(path.join(x.dir,'library/.studio-generated-state.json')));
  assert.equal(state.version,2);assert.equal(state.rootText,reg);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(x.dir,'library/catalog.json'))).videos,[]);
 }finally{fs.rmSync(x.dir,{recursive:true,force:true})}
});
test('noncanonical Root remains protected when previous state is stale',()=>{
 const x=fixture(emptyRoot.replace('name="Videos"','name="Modified"'));
 try{
  const a=x.run();assert.notEqual(a.status,0);
  assert.match(a.stderr,/Sync dibatalkan|TypeScript belum terpasang|berubah selain Props/);
  assert.match(fs.readFileSync(path.join(x.dir,'src/Root.tsx'),'utf8'),/name="Modified"/);
 }finally{fs.rmSync(x.dir,{recursive:true,force:true})}
});

test('cleanup CLI is discoverable from package scripts without changing project files',()=>{
 const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
 assert.equal(pkg.scripts.clean,'node tools/clean-master.mjs');
});
