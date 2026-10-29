#!/usr/bin/env node
/** Fast static QA. Doesn't require a browser or render. */
import {createRequire} from 'node:module';import {readFileSync,readdirSync,existsSync} from 'node:fs';import {join,resolve,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
const T=createRequire(import.meta.url)('typescript'),root=resolve(dirname(fileURLToPath(import.meta.url)),'..');let n=0,errors=0;
const walk=d=>!existsSync(d)?[]:readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isSymbolicLink()?[]:x.isDirectory()?walk(join(d,x.name)):x.isFile()&&/\.tsx?$/.test(x.name)?[join(d,x.name)]:[]);
for(const d of readdirSync(join(root,'projects'),{withFileTypes:true}).filter(x=>x.isDirectory()))for(const f of walk(join(root,'projects',d.name,'src'))){const s=readFileSync(f,'utf8');const sf=T.createSourceFile(f,s,T.ScriptTarget.Latest,true,f.endsWith('.tsx')?T.ScriptKind.TSX:T.ScriptKind.TS);n++;for(const p of sf.parseDiagnostics){console.error(f+': '+p.messageText);errors++;}}
console.log(`[STATIC QA] ${n} files TS/TSX, ${errors} parse errors`);if(errors)process.exitCode=1;
