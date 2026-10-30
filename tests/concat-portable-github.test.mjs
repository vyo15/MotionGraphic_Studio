import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manager=fs.readFileSync(path.join(root,'tools/concat-manager.ps1'),'utf8');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));

test('npm run dev stays Remotion, npm run concat uses one GitHub-only launcher',()=>{
  assert.match(pkg.scripts.dev,/start-studio\.mjs/);
  assert.match(pkg.scripts.concat,/concat-manager\.ps1 -Action launch/);
  assert.match(manager,/https:\/\/github\.com\/jub0t\/Concat\.git/);
  assert.match(manager,/api\.github\.com\/repos\/jub0t\/Concat\/releases\/latest/);
});
test('Concat portable launch does not require Rust or use normal MSI installation',()=>{
  const launch=manager.slice(manager.indexOf('function Launch-ConcatSource {'),manager.indexOf('\ntry {\n    switch ($Action)'));
  assert.match(launch,/Ensure-Portable/);
  assert.doesNotMatch(launch,/Check-Toolchain|Build-ConcatSource/);
  assert.match(manager,/msiexec \/a/);
  assert.doesNotMatch(manager,/msiexec \/i\b|winget install|cargo install|rustup-init\.exe/);
  assert.match(manager,/Get-FileHash .*SHA256/);
  assert.match(manager,/Get-OfficialRelease/);
});
test('existing editor, projects, and handoff have not been replaced',()=>{
  const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
  assert.match(read('tools/start-studio.mjs'),/Remotion|remotion/i);
  assert.equal(JSON.parse(read('projects/ip-address/motiongraphic-video.json')).id,'IPAddressReels');
  assert.equal(JSON.parse(read('projects/windows-hacks-5-shortcut-lengkap/motiongraphic-video.json')).id,'WindowsHacks5ShortcutLengkap');
  assert.match(pkg.scripts.handoff,/export-concat-segments\.mjs/);
});
