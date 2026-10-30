import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(ROOT,p),'utf8');
test('Remotion and Concat remain two apps with a script-only handoff',()=>{
  const x=JSON.parse(read('package.json')).scripts;
  assert.match(x.dev,/start-studio/);
  assert.match(x.concat,/concat-manager\.ps1/);
  assert.match(x.handoff,/export-concat-segments\.mjs/);
  assert.doesNotMatch(read('tools/concat-manager.ps1'),/setup\.exe|Start-Process[^\n]*msi/i);
});
test('both projects have valid, frame-accurate Hook/Isi/CTA cuts',()=>{
  for(const slug of ['ip-address','windows-hacks-5-shortcut-lengkap']){
    const res=spawnSync(process.execPath,[path.join(ROOT,'tools/export-concat-segments.mjs'),'--project',slug,'--dry-run'],{cwd:ROOT,encoding:'utf8'});
    assert.equal(res.status,0,`${slug} failed: ${res.stderr} ${res.stdout}`);
    assert.match(res.stdout,/01-HOOK\.mp4/);
    assert.match(res.stdout,/02-ISI\.mp4/);
    assert.match(res.stdout,/03-CTA\.mp4/);
    assert.match(res.stdout,/DRY RUN OK/);
  }
});
test('no original motion source or manifest is duplicated into a new master',()=>{
  assert.ok(fs.existsSync(path.join(ROOT,'projects/ip-address/src/Video.tsx')));
  assert.ok(fs.existsSync(path.join(ROOT,'projects/windows-hacks-5-shortcut-lengkap/src/Video.tsx')));
  assert.equal(JSON.parse(read('projects/ip-address/motiongraphic-video.json')).id,'IPAddressReels');
  assert.equal(JSON.parse(read('projects/windows-hacks-5-shortcut-lengkap/motiongraphic-video.json')).id,'WindowsHacks5ShortcutLengkap');
});
