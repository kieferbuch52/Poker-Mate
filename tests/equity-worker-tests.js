'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
function run(payload){const messages=[];const context={self:{postMessage:m=>messages.push(m)},console,Uint8Array,Math,Set,Map,Array,Object,Number,String,Error};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'..','equity-worker.js'),'utf8'),context);context.self.onmessage({data:payload});const error=messages.find(m=>m.type==='error');if(error)throw new Error(error.message);return messages.find(m=>m.type==='result');}
let result=run({heroSpec:{type:'fixed',cards:['As','Ah']},villainSpec:{type:'fixed',cards:['Ks','Kh']},player3:null,board:['2c','3d','4h','5s','9c']});if(result.total!==1||result.players[0].wins!==1)throw new Error('fixed heads-up failed');
result=run({heroSpec:{type:'fixed',cards:['As','Ah']},villainSpec:{type:'fixed',cards:['Ks','Kh']},player3:['Qs','Qh'],board:['2c','3d','4h','5s','9c']});if(result.players.length!==3||result.players[0].wins!==1)throw new Error('three-way failed');
result=run({heroSpec:{type:'fixed',cards:['As','Ah']},villainSpec:{type:'range',classes:['KK','QQ']},player3:null,board:['2c','3d','4h','5s','9c']});if(result.total<=0)throw new Error('range opponent failed');

result=run({heroSpec:{type:'range',classes:['AA','KK']},villainSpec:{type:'range',classes:['QQ','JJ']},player3:null,board:['2c','3d','4h','5s','9c']});if(result.total<=0)throw new Error('range-vs-range failed');
console.log('Equity worker tests passed');
