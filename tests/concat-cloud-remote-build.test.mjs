import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const workflow=read('.github/workflows/build-concat-cpu-portable.yml');
const manager=read('tools/concat-manager.ps1');
const importer=read('tools/import-concat-cpu.mjs');
const zip=read('tools/zip-video.mjs');
const pkg=JSON.parse(read('package.json'));
import {applyCpuPatch, canonicalSource, canonicalSourceBlobHash} from '../tools/concat-cpu-source.mjs';

test('Windows CRLF and LF Concat source hash to same pinned Git blob; modified source is rejected',()=>{
  const source = 'pub fn run() {\n    let gpu = Gpu::acquire();\n}\n';
  const crlf = source.replace(/\n/g,'\r\n');
  assert.equal(canonicalSource(crlf), source);
  assert.equal(canonicalSourceBlobHash(crlf),canonicalSourceBlobHash(source));
  assert.notEqual(canonicalSourceBlobHash(crlf.replace('Gpu::acquire()', 'Gpu::acquire_new()')),canonicalSourceBlobHash(source));
});
test('CPU source patch applies to both Windows CRLF and LF sources',()=>{
  const base = `fn backend() {\n    let gpu = Gpu::acquire();\n    let mut selector = selector_start();\n    selector = match &gpu {\n        None => selector,\n    };\n\n    // The custom title bar.\n}`;
  const a=applyCpuPatch(canonicalSource(base));
  const b=applyCpuPatch(canonicalSource(base.replace(/\n/g,'\r\n')));
  assert.equal(a.changed,true);
  assert.equal(b.content,a.content);
  assert.match(a.content,/MOTIONGRAPHIC_STUDIO_CPU_UI_PATCH_V1/);
  assert.match(a.content,/renderer_name\("software"\.into\(\)\)/);
  assert.equal(applyCpuPatch(a.content).changed,false);
});
test('cloud workflow is manual only, pinned upstream, and uses verified dependencies',()=>{
 assert.match(workflow,/workflow_dispatch:/);
 assert.doesNotMatch(workflow,/^\s+(?:push|pull_request):/m);
 assert.match(workflow,/windows-2022/);
 assert.match(workflow,/79116bd0f9a103c633d888603ad27890e929dbdc/);
 assert.match(workflow,/node tools\/concat-cpu-source\.mjs apply/);
 assert.match(workflow,/fetch\.sh ffmpeg-win64/);
 assert.match(workflow,/fetch\.sh onnxruntime-win-x64/);
 assert.match(workflow,/fetch\.sh llvm-win64/);
 assert.match(workflow,/fetch\.sh \$name sherpa\.tar\.bz2/);
 assert.match(workflow,/upload-artifact@v4/);
 assert.match(workflow,/cpu-build-manifest\.json/);
});
test('CPU portable import checks integrity and never overwrites official release',()=>{
 assert.match(manager,/function Test-CloudCpuPackage/);
 assert.match(manager,/Get-FileHash -LiteralPath \$exe -Algorithm SHA256/);
 assert.match(manager,/function Import-CloudCpuPackage/);
 assert.match(manager,/\$cpuPortableRoot = Join-Path \$appRoot 'cpu-portable'/);
 assert.match(manager,/if \(\$CpuOnlyUi -and \(Test-CloudCpuPackage \$cpuPortableCurrent\)\)/);
 assert.match(manager,/'import-cpu' \{ Import-CloudCpuPackage \$Package \}/);
 assert.match(manager,/CPU-only Concat belum dibangun\/dimpor/);
 assert.doesNotMatch(importer,/rmSync|unlinkSync|execSync/);
 assert.equal(pkg.scripts['concat:cpu:import'],'node tools/import-concat-cpu.mjs');
 assert.match(zip,/PANDUAN-CLOUD-BUILD-CONCAT-CPU/);
});
