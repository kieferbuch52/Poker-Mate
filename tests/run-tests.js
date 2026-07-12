const assert=require('assert');const fs=require('fs');const vm=require('vm');const path=require('path');
const Core=require('../core-utils.js');
function close(a,b,epsilon=1e-9){assert(Math.abs(a-b)<epsilon,`${a} != ${b}`)}
const local=new Date(2026,6,12,0,30);assert.strictEqual(Core.localDateString(local),'2026-07-12');assert(Core.isValidIsoDate('2026-02-28'));assert(!Core.isValidIsoDate('2026-02-30'));
let odds=Core.calculateBetOdds({pot:100,bet:50,call:50});close(odds.need,25);assert.strictEqual(odds.finalPot,200);
let raise=Core.calculateRaiseOdds({pot:100,ownBet:50,raiseTo:150});close(raise.need,25);assert.strictEqual(raise.call,100);assert.strictEqual(raise.finalPot,400);
let draw=Core.calculateDrawOdds({street:'flop',outs:9});close(draw.next,9/47*100);close(draw.byRiver,(1-(38/47)*(37/46))*100);assert.strictEqual(draw.outs,9);
close(Core.calculateDurationHours('10:00','14:30'),4.5);
close(Core.calculateDurationHours('23:30','01:00'),1.5);
assert.strictEqual(Core.calculateDurationHours('invalid','01:00'),0);
let dd=Core.calculateDrawdown([100,-50,-100,200,-300]);
assert.strictEqual(dd.peak,150);
assert.strictEqual(dd.currentDrawdown,300);
assert.strictEqual(dd.maxDrawdown,300);
assert.strictEqual(Core.calculateVenueBalance({openingBalance:1000,transactions:[{amount:500},{amount:-200}],sessions:[{chipDelta:300},{chipDelta:-100}]}),1500);
assert.strictEqual(Core.deriveOpeningBalance(1500,300,200),1000);
const worker=fs.readFileSync(path.join(__dirname,'..','equity-worker.js'),'utf8');const context={self:{postMessage(){}},console};vm.createContext(context);vm.runInContext(worker+'\nself.__test={parseCard,evaluate7};',context);const {parseCard,evaluate7}=context.self.__test;
const score=cards=>evaluate7(cards.map(parseCard));
const hands={
 straightFlush:['As','Ks','Qs','Js','Ts','2d','3c'],quads:['Ah','Ad','Ac','As','Kd','2c','3h'],fullHouse:['Kh','Kd','Kc','2s','2d','9c','8h'],flush:['Ah','Jh','8h','5h','2h','Kd','Qc'],straight:['9s','8h','7d','6c','5s','Ah','Kd'],trips:['Qh','Qd','Qc','As','9d','5c','2h'],twoPair:['Jh','Jd','8c','8s','Ah','4d','2c'],pair:['Th','Td','As','Kc','8d','4c','2h'],high:['As','Kd','9c','7h','5d','3s','2c']};
const order=['straightFlush','quads','fullHouse','flush','straight','trips','twoPair','pair','high'];for(let i=0;i<order.length-1;i++)assert(score(hands[order[i]])>score(hands[order[i+1]]),`${order[i]} should beat ${order[i+1]}`);
assert(score(['5s','4h','3d','2c','As','Kh','Qd'])>score(['4s','3h','2d','Ac','Ks','Qh','Jd']),'wheel straight comparison');
assert(score(['Ah','Kh','9h','5h','2h','3c','4d'])>score(['Ah','Qh','9h','5h','2h','3c','4d']),'flush kicker');
assert.strictEqual(score(['As','Kd','2c','3d','4h','5s','6c']),score(['Qh','Jd','2c','3d','4h','5s','6c']),'board play tie');
console.log('All Poker Mate reliability tests passed.');
