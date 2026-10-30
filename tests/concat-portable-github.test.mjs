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
// Ambil HANYA fungsi launcher. Blok switch di bawahnya boleh memanggil
// Check-Toolchain/Build-ConcatSource untuk aksi 'build' yang memang opsional.
// Mengiris hingga 'try { switch ($Action)' membuat tes Windows salah gagal.
function functionBody(source, functionName) {
  const escapedName=functionName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const pattern=new RegExp('^function '+escapedName+' \\{([\\s\\S]*?)^\\}', 'm');
  const match=source.match(pattern);
  assert.ok(match,`Fungsi ${functionName} tidak ditemukan atau tidak tertutup dengan benar`);
  return match[1];
}

test('Concat portable launch does not require Rust or use normal MSI installation',()=>{
  const launch=functionBody(manager,'Launch-ConcatSource');
  assert.match(launch,/Ensure-Portable/);
  assert.doesNotMatch(launch,/\b(?:Check-Toolchain|Build-ConcatSource)\b/);
  // Git on Windows may check out .ps1 with CRLF; guard against the CI failure.
  const windowsLaunch=functionBody(manager.replace(/\r?\n/g,'\r\n'),'Launch-ConcatSource');
  assert.match(windowsLaunch,/Ensure-Portable/);
  assert.doesNotMatch(windowsLaunch,/\b(?:Check-Toolchain|Build-ConcatSource)\b/);
  assert.doesNotMatch(windowsLaunch,/switch \(\$Action\)/);
  assert.match(manager,/msiexec \/a/);
  assert.doesNotMatch(manager,/msiexec \/i\b|winget install|cargo install|rustup-init\.exe/);
  assert.match(manager,/Get-FileHash .*SHA256/);
  assert.match(manager,/Get-OfficialRelease/);
});

test('optional Rust source-build remains available without affecting portable launch',()=>{
  const manualBuild=functionBody(manager,'Build-ConcatSource');
  assert.match(manualBuild,/Check-Toolchain/);
  assert.match(manager,/'build' \{ Build-ConcatSource \}/);
  const launch=functionBody(manager,'Launch-ConcatSource');
  assert.doesNotMatch(launch,/\b(?:Check-Toolchain|Build-ConcatSource)\b/);
});
test('existing editor, projects, and handoff have not been replaced',()=>{
  const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
  assert.match(read('tools/start-studio.mjs'),/Remotion|remotion/i);
  assert.equal(JSON.parse(read('projects/ip-address/motiongraphic-video.json')).id,'IPAddressReels');
  assert.equal(JSON.parse(read('projects/windows-hacks-5-shortcut-lengkap/motiongraphic-video.json')).id,'WindowsHacks5ShortcutLengkap');
  assert.match(pkg.scripts.handoff,/export-concat-segments\.mjs/);
});
