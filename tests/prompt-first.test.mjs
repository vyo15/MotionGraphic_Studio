import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(ROOT,file),'utf8');
test('Prompt-first keeps creative techniques without local agent installation or a second renderer',()=>{
 const rules=read('docs/MOTION-DIRECTION-RULES.md');
 for(const name of ['Swiss Motion','Living Screencast','Instruction Manual','Data Storytelling','Precise Mechanism','Minimal Editorial'])assert.ok(rules.includes(name),name);
 assert.match(rules,/github.com\/lemomo-ai\/lemo-opuscar/);
 const pkg=JSON.parse(read('package.json'));
 assert.ok(!pkg.scripts.skills&&!pkg.scripts['skills:install']);
 assert.ok(!pkg.dependencies?.three&&!pkg.dependencies?.['playwright-core']);
 assert.ok(pkg.dependencies.remotion);
 assert.ok(!fs.existsSync(path.join(ROOT,'tools/remotion-skills.mjs')));
});
