import fs from 'node:fs';
import path from 'node:path';
// Copy real tool dependency tree, not a stale hand-maintained subset.
export function copyFixtureTools(root,target){
 fs.cpSync(path.join(root,'tools'),path.join(target,'tools'),{recursive:true});
}
