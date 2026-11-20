#!/usr/bin/env node
/** Syntax-only JSX/TS check; does NOT replace tsc typechecking. */
import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
let ts;
try{ts=require('typescript')}catch{console.error('[SYNTAX] TypeScript belum terpasang; jalankan npm ci.');process.exit(2)}
const files=[];
function walk(dir){if(!fs.existsSync(dir))return;for(const x of fs.readdirSync(dir,{withFileTypes:true})){
 if(x.name.startsWith('.')||['node_modules','dist','build'].includes(x.name))continue;
 const p=path.join(dir,x.name);
 if(x.isDirectory())walk(p);else if(x.isFile()&&/\.(ts|tsx|js|jsx)$/.test(p))files.push(p);
}}
walk(path.join(root,'src'));walk(path.join(root,'projects'));walk(path.join(root,'templates'));
let failures=0;
for(const f of files){
 const source=ts.createSourceFile(f,fs.readFileSync(f,'utf8'),ts.ScriptTarget.Latest,true,f.endsWith('.tsx')||f.endsWith('.jsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 for(const d of source.parseDiagnostics){console.error('[SYNTAX FAIL] '+path.relative(root,f)+': '+ts.flattenDiagnosticMessageText(d.messageText,' '));failures++}
}
console.log(`[SYNTAX] ${files.length} source diperiksa, ${failures} kesalahan sintaks; typecheck/runtime tetap terpisah.`);
if(failures)process.exitCode=1;
