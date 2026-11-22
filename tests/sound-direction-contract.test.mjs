import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const file=(rel)=>fs.readFileSync(path.join(ROOT,rel),'utf8');
test('SOUND DIRECTION main contract exists and documents gating, timing, CTA-cover, QA limits',()=>{
 const s=file('docs/SOUND-DIRECTION-RULES.md');
 for(const term of ['ACC','planned','omit','CTA','COVER','gainDb','impactFrame','endFrame inklusif','VO','lip','lisensi','listening','anti']){
  assert.ok(s.toLowerCase().includes(term.toLowerCase()),'missing term: '+term);
 }
});
test('ChatGPT onboarding, production and design documents point to the canonical sound rules',()=>{
 for(const rel of ['CHATGPT-READ-FIRST.md','AGENTS.md','PRODUCTION-RULES.md','PROMPT-PROYEK-CHATGPT.md','docs/CHATGPT-PROJECT-INSTRUCTIONS.md','docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md','docs/MOTION-DIRECTION-RULES.md','docs/STORYBOARD-TEMPLATE-UNIVERSAL.md','docs/QA-VISUAL-MOTION-CHECKLIST.md','docs/SOUND-DESIGN-WORKFLOW.md','docs/SCENE-LAYER-AND-SOUND-STANDARD.md','skills/sound-design-director/SKILL.md']){
  assert.ok(file(rel).includes('SOUND-DIRECTION-RULES.md'),`${rel} missing read-first pointer`);
 }
});
test('Starter keeps sound plan optional and existing sound-cues schema unchanged',()=>{
 const p=file('templates/addon-starter/production/SOUND-PLAN.md');
 const q=JSON.parse(file('templates/addon-starter/production/sound-cues.json'));
 assert.match(p,/CTA/);assert.match(p,/hold/);assert.match(p,/planned/);
 assert.equal(q.schemaVersion,1);assert.ok(Array.isArray(q.cues));
});
