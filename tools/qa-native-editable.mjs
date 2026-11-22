#!/usr/bin/env node
/** Validate declared native-editing targets. Legacy projects without blueprint are advisory. */
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {inspectNativeEditable} from './validate-addon.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const argv=process.argv.slice(2),strict=!argv.includes('--advisory');
const src=argv.find(x=>!x.startsWith('--'));
const projects=src?[path.resolve(src)]:fs.readdirSync(path.join(ROOT,'projects'),{withFileTypes:true})
 .filter(x=>x.isDirectory()&&!x.isSymbolicLink()).map(x=>path.join(ROOT,'projects',x.name));
let failures=0,warning=0;
for(const project of projects){
 const manifestFile=path.join(project,'motiongraphic-video.json');if(!fs.existsSync(manifestFile))continue;
 const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
 const modern=manifest.editableContract==='studio-direct-v4';
 const result=inspectNativeEditable(project,{strict:strict&&modern});
 console.log(`[NATIVE EDITABLE] ${manifest.slug}: ${result.targets} target · ${result.errors.length} FAIL · ${result.warnings.length} WARN${modern?' (contract v4)':' (legacy/info)'}`);
 for(const v of result.errors)console.error('[FAIL] '+v);
 for(const v of result.warnings)console.warn('[WARN] '+v);
 failures+=result.errors.length;warning+=result.warnings.length;
}
console.log(`[NATIVE EDITABLE] ${failures} FAIL, ${warning} WARN. Hasil AST tidak membuktikan drag / Save / reload / render Windows.`);
if(failures)process.exitCode=1;
