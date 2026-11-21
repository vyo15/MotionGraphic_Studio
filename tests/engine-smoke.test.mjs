import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const exists=f=>fs.existsSync(path.join(ROOT,f));
test('Master engine has one Remotion entry and core tools',()=>{
 for(const f of ['package.json','src/index.ts','src/Root.tsx','tools/sync-projects.mjs','tools/project-flow.mjs','tools/validate-addon.mjs','tools/zip-video.mjs','contracts/studio-capabilities.json','docs/USER-FLOW-CHATGPT.md'])assert.ok(exists(f),f);
 const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json')));
 assert.equal(pkg.scripts.flow,'node tools/project-flow.mjs');
 assert.ok(pkg.dependencies.remotion);
});
test('Master catalog is valid and all present projects use manifest',()=>{
 const catalog=JSON.parse(fs.readFileSync(path.join(ROOT,'library/catalog.json')));
 assert.ok(Array.isArray(catalog.videos));
 for(const v of catalog.videos)if(v.projectDir)assert.ok(exists(path.join(v.projectDir,'motiongraphic-video.json')),v.id);
});
