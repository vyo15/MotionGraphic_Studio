/** Same test suite as npm test, explicit paths for Windows and no shell. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {ROOT} from './menu-helper.mjs';
const tests=fs.readdirSync(path.join(ROOT,'tests')).filter(n=>n.endsWith('.test.mjs')).sort().map(n=>path.join(ROOT,'tests',n));
if(!tests.length){console.error('No regression tests');process.exitCode=1;}else{
 const r=spawnSync(process.execPath,['--test',...tests],{cwd:ROOT,stdio:'inherit',windowsHide:true});if(r.error)console.error(r.error.message);process.exitCode=r.status??1;
}
