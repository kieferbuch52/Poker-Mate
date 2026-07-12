'use strict';
const fs=require('fs');
const path=require('path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const stacks=['100','80','60','40','25','15','10'];
for(const stack of stacks){
  if(!html.includes(`data-tournament-stack="${stack}"`))throw new Error(`missing stack button ${stack}`);
  if(!app.includes(`tournamentRfiRanges['${stack}']`)&&!app.includes(`'${stack}': {`))throw new Error(`missing RFI range ${stack}`);
  if(!app.includes(`tournamentBbDefenseRanges['${stack}']`)&&!app.includes(`'${stack}': {`))throw new Error(`missing defense range ${stack}`);
}
if(!html.includes('data-range-game="headsup"'))throw new Error('missing heads-up selector');
if(!app.includes('const headsUpRfiRanges'))throw new Error('missing heads-up RFI data');
if(!app.includes('const headsUpBbDefenseRanges'))throw new Error('missing heads-up defense data');
console.log('Range static tests passed');
