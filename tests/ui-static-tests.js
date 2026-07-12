'use strict';
const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const auth=fs.readFileSync(path.join(root,'auth.mjs'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');

for(const id of [
  'activePageTitle','headerUserButton','uiDensity','uiMotion','uiStickyControls',
  'accountSettingsPanel','googleSignInBtn','firebaseApiKey','yokosawaThreshold',
  'yokosawaAttribution'
]){
  if(!html.includes(`id="${id}"`))throw new Error(`missing UI element ${id}`);
}
if(!html.includes('data-range-source="yokosawa"'))throw new Error('missing Yokosawa source');
if(!app.includes('YOKOSAWA_TIER_ROWS'))throw new Error('missing Yokosawa data');
if(!app.includes('renderYokosawaRange'))throw new Error('missing Yokosawa renderer');
if(!app.includes("rangeSource:'pokerMate'"))throw new Error('missing range source default');
if(!app.includes("uiDensity:'standard'"))throw new Error('missing density default');
if(!app.includes('FIREBASE_CONFIG_KEY'))throw new Error('missing Firebase config logic');
if(!auth.includes('GoogleAuthProvider'))throw new Error('missing Google provider');
if(!auth.includes('signInWithRedirect'))throw new Error('missing mobile redirect');
if(!auth.includes('signInWithPopup'))throw new Error('missing desktop popup');
if(!sw.includes('auth.mjs?v=8.0.0'))throw new Error('auth module not cached');
if(!css.includes('.yokosawa-navy'))throw new Error('missing Yokosawa colors');

const match=app.match(/const YOKOSAWA_TIER_ROWS=\[(.*?)\];/s);
if(!match)throw new Error('cannot parse Yokosawa rows');
const rows=eval(`[${match[1]}]`);
if(rows.length!==13||rows.some(row=>row.length!==13))throw new Error('Yokosawa chart must be 13x13');
const valid=new Set(['navy','red','yellow','green','blue','white','purple','pink','fold']);
for(const row of rows)for(const tier of row)if(!valid.has(tier))throw new Error(`invalid Yokosawa tier ${tier}`);

console.log('UI and authentication static tests passed');
