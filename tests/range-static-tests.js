'use strict';
const fs=require('fs');
const path=require('path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const css=fs.readFileSync(path.join(__dirname,'..','styles.css'),'utf8');

const tournamentStacks=['100','80','60','40','25','15','10'];
for(const stack of tournamentStacks){
  if(!html.includes(`data-tournament-stack="${stack}"`))throw new Error(`missing tournament stack button ${stack}`);
  if(!app.includes(`tournamentRfiRanges['${stack}']`)&&!app.includes(`'${stack}': {`))throw new Error(`missing tournament RFI range ${stack}`);
  if(!app.includes(`tournamentBbDefenseRanges['${stack}']`)&&!app.includes(`'${stack}': {`))throw new Error(`missing tournament defense range ${stack}`);
}

const headsUpStacks=['40','30','25','20','15','10','5'];
for(const stack of headsUpStacks){
  if(!html.includes(`data-headsup-stack="${stack}"`))throw new Error(`missing heads-up stack button ${stack}`);
  if(!app.includes(`'${stack}':{BTN:`))throw new Error(`missing heads-up RFI range ${stack}`);
  if(!app.includes(`'${stack}':headsUpDefense(`))throw new Error(`missing heads-up defense range ${stack}`);
}

for(const removed of ['100','80','60']){
  if(html.includes(`data-headsup-stack="${removed}"`))throw new Error(`deep heads-up stack should be removed: ${removed}`);
}

if(!html.includes('data-range-game="headsup"'))throw new Error('missing heads-up selector');
if(!html.includes('id="headsUpStackSelector"'))throw new Error('missing separate heads-up stack selector');
if(!app.includes("headsUpStack:'20'"))throw new Error('missing 20BB heads-up default');
if(!app.includes('let currentHeadsUpStack'))throw new Error('missing independent heads-up state');
if(!app.includes('headsUpRfiRanges[currentHeadsUpStack]')&&!app.includes('headsUpRfiRanges[stack]'))throw new Error('heads-up RFI not stack-aware');
if(!app.includes('headsUpBbDefenseRanges[currentHeadsUpStack]')&&!app.includes('headsUpBbDefenseRanges[stack]'))throw new Error('heads-up defense not stack-aware');

console.log('Range static tests passed');


const actionConfig={
  '40':"type:'open',size:2.5",
  '30':"type:'open',size:2.5",
  '25':"type:'open',size:2.3",
  '20':"type:'open',size:2.2",
  '15':"type:'open',size:2.0",
  '10':"type:'shove',size:null",
  '5':"type:'shove',size:null"
};
for(const [stack,snippet] of Object.entries(actionConfig)){
  if(!app.includes(`'${stack}':{${snippet}`))throw new Error(`missing heads-up action ${stack}`);
}
if(!html.includes('id="rangeActionBadge"'))throw new Error('missing heads-up action badge');
if(!app.includes("headsUpRfiRanges['10']={BTN:cloneRangeSet(headsUpShove10)}"))throw new Error('10BB RFI is not the shove range');
if(!app.includes("headsUpRfiRanges['5']={BTN:cloneRangeSet(headsUpShove5)}"))throw new Error('5BB RFI is not the shove range');
if(!app.includes("'hu-shove':'hu-open'"))throw new Error('missing explicit action cell classes');

if(!html.includes('id="rangeTableSize"'))throw new Error('missing table-size condition');
if(!html.includes('id="rangeOpenSize"'))throw new Error('missing open-size condition');
if(!html.includes('id="toggleRangeFrequencyEdit"'))throw new Error('missing frequency editor');
if(!html.includes('id="rangeAssumptionContent"'))throw new Error('missing range provenance panel');
if(!app.includes('RANGE_FREQUENCY_KEY'))throw new Error('missing frequency persistence');
if(!app.includes('tournamentActionForStack'))throw new Error('missing tournament action labels');

if(!html.includes('data-range-source="yokosawa"'))throw new Error('missing Yokosawa source');
if(!app.includes('const YOKOSAWA_TIER_ROWS'))throw new Error('missing Yokosawa chart');
if(!app.includes('renderYokosawaRange'))throw new Error('missing Yokosawa renderer');


if(!html.includes('data-yokosawa-game="ring"'))throw new Error('missing Yokosawa ring button');
if(!html.includes('data-yokosawa-game="tournament"'))throw new Error('missing Yokosawa tournament button');
if(!html.includes('data-yokosawa-situation="firstIn"'))throw new Error('missing Yokosawa first-in button');
if(!html.includes('data-yokosawa-situation="facing3bet"'))throw new Error('missing Yokosawa facing-3bet button');
if(!html.includes('id="yokosawaTournamentWarning"'))throw new Error('missing tournament warning');
for(const name of ['yokosawaEffectiveThreshold','yokosawaOpponentThreeBetThreshold','yokosawaFacingThreeBetAction','renderYokosawaFacingThreeBet']){
  if(!app.includes(`function ${name}`))throw new Error(`missing ${name}`);
}
if(!app.includes("yokosawaGame:'ring'"))throw new Error('missing Yokosawa game default');
if(!app.includes("yokosawaSituation:'firstIn'"))throw new Error('missing Yokosawa situation default');


if(!app.includes('function pokerMateDefenseUsesAllIn'))throw new Error('missing all-in depth detection');
if(!app.includes("className:'shove'"))throw new Error('missing red all-in action class');
if(!app.includes("className:'threebet'"))throw new Error('missing blue 3bet action class');
if(!css.includes('.hand-cell.shove'))throw new Error('missing red all-in CSS');
if(!css.includes('.hand-cell.threebet'))throw new Error('missing blue 3bet CSS');
