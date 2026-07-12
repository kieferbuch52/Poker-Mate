'use strict';
const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const moduleOrder=JSON.parse(fs.readFileSync(path.join(root,'js','module-order.json'),'utf8'));
const app=moduleOrder.map(file=>fs.readFileSync(path.join(root,'js',file),'utf8')).join('\n')+'\n'+fs.readFileSync(path.join(root,'app.js'),'utf8');
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
if(!sw.includes('auth.mjs?v=9.0.0'))throw new Error('auth module not cached');
if(!css.includes('.yokosawa-navy'))throw new Error('missing Yokosawa colors');

const match=app.match(/const YOKOSAWA_TIER_ROWS=\[(.*?)\];/s);
if(!match)throw new Error('cannot parse Yokosawa rows');
const rows=eval(`[${match[1]}]`);
if(rows.length!==13||rows.some(row=>row.length!==13))throw new Error('Yokosawa chart must be 13x13');
const valid=new Set(['navy','red','yellow','green','blue','white','purple','pink','fold']);
for(const row of rows)for(const tier of row)if(!valid.has(tier))throw new Error(`invalid Yokosawa tier ${tier}`);

console.log('UI and authentication static tests passed');


if(!html.includes('data-yokosawa-game="ring"'))throw new Error('missing ring/tournament controls');
if(!html.includes('data-yokosawa-situation="facing3bet"'))throw new Error('missing facing-3bet control');
if(!css.includes('.yokosawa-action-fourbet'))throw new Error('missing 4bet response color');
if(!css.includes('.yokosawa-action-call'))throw new Error('missing call response color');


if(!html.includes('data-pot-fraction="0.25"'))throw new Error('missing 1/4 pot preset');
if(!app.includes("{label:'1/4 pot',fraction:1/4}"))throw new Error('missing 1/4 pot reference row');
if(html.includes('id="pnFirstIn"'))throw new Error('PN First in control should be removed');
if(app.includes("getElementById('pnFirstIn')"))throw new Error('PN First in logic should be removed');
