(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.PokerCore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function number(value){const parsed=Number(value);return Number.isFinite(parsed)?parsed:0;}
  function pad(value){return String(value).padStart(2,'0');}
  function localDateString(date=new Date()){return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;}
  function isValidIsoDate(value){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(String(value||'')))return false;
    const [year,month,day]=value.split('-').map(Number);const date=new Date(year,month-1,day);
    return date.getFullYear()===year&&date.getMonth()===month-1&&date.getDate()===day;
  }
  function rakeAmount(grossPot,rakePct=0,rakeCap=0){grossPot=Math.max(0,number(grossPot));rakePct=Math.max(0,number(rakePct));rakeCap=Math.max(0,number(rakeCap));const uncapped=grossPot*rakePct/100;return rakeCap>0?Math.min(uncapped,rakeCap):uncapped;}
  function calculateBetOdds({pot,bet,call,rakePct=0,rakeCap=0}){pot=Math.max(0,number(pot));bet=Math.max(0,number(bet));call=Math.max(0,number(call));const grossFinalPot=pot+bet+call,rake=rakeAmount(grossFinalPot,rakePct,rakeCap),finalPot=Math.max(call,grossFinalPot-rake);return {pot,bet,call,grossFinalPot,rake,finalPot,need:finalPot?call/finalPot*100:0,bluff:pot+bet?bet/(pot+bet)*100:0,mdf:pot+bet?pot/(pot+bet)*100:0};}
  function calculateRaiseOdds({pot,ownBet,raiseTo,rakePct=0,rakeCap=0}){pot=Math.max(0,number(pot));ownBet=Math.max(0,number(ownBet));raiseTo=Math.max(0,number(raiseTo));const valid=raiseTo>=ownBet,call=Math.max(0,raiseTo-ownBet),grossFinalPot=pot+ownBet+raiseTo+call,rake=rakeAmount(grossFinalPot,rakePct,rakeCap),finalPot=Math.max(call,grossFinalPot-rake);return {pot,ownBet,raiseTo,valid,call,grossFinalPot,rake,finalPot,need:valid&&finalPot?call/finalPot*100:0};}
  function calculateDrawOdds({street='flop',outs=0,dirtyOuts=0}){const normalizedStreet=street==='turn'?'turn':'flop',maxOuts=normalizedStreet==='flop'?47:46,rawOuts=Math.max(0,Math.min(maxOuts,Math.floor(number(outs)))),dirty=Math.max(0,Math.min(rawOuts,Math.floor(number(dirtyOuts)))),cleanOuts=Math.max(0,rawOuts-dirty),nextCards=normalizedStreet==='flop'?47:46,next=nextCards?cleanOuts/nextCards*100:0,byRiver=normalizedStreet==='flop'?(1-((47-cleanOuts)/47)*((46-cleanOuts)/46))*100:next;return {street:normalizedStreet,rawOuts,dirtyOuts:dirty,outs:cleanOuts,next,byRiver,ruleApprox:Math.min(100,cleanOuts*(normalizedStreet==='flop'?4:2)),miss:100-byRiver};}


  function calculateDurationHours(startTime,endTime){
    const parse=value=>{
      const match=String(value||'').match(/^([01]\d|2[0-3]):([0-5]\d)$/);
      return match?Number(match[1])*60+Number(match[2]):null;
    };
    const start=parse(startTime),end=parse(endTime);
    if(start===null||end===null)return 0;
    let minutes=end-start;
    if(minutes<0)minutes+=24*60;
    return minutes/60;
  }
  function calculateDrawdown(values=[]){
    let cumulative=0;
    let peak=0;
    let peakIndex=-1;
    let maxDrawdown=0;
    let maxDrawdownPeakIndex=-1;
    let maxDrawdownEndIndex=-1;
    values.forEach((raw,index)=>{
      cumulative+=number(raw);
      if(cumulative>peak){
        peak=cumulative;
        peakIndex=index;
      }
      const drawdown=peak-cumulative;
      if(drawdown>maxDrawdown){
        maxDrawdown=drawdown;
        maxDrawdownPeakIndex=peakIndex;
        maxDrawdownEndIndex=index;
      }
    });
    return {
      cumulative,
      peak,
      currentDrawdown:Math.max(0,peak-cumulative),
      maxDrawdown,
      maxDrawdownPeakIndex,
      maxDrawdownEndIndex
    };
  }
  function calculateVenueBalance({openingBalance,transactions=[],sessions=[]}){
    return number(openingBalance)+transactions.reduce((sum,item)=>sum+number(item.amount),0)+sessions.reduce((sum,item)=>sum+number(item.chipDelta),0);
  }
  function deriveOpeningBalance(currentBalance,transactionTotal,sessionTotal){return number(currentBalance)-number(transactionTotal)-number(sessionTotal);}
  return {number,localDateString,isValidIsoDate,calculateBetOdds,calculateRaiseOdds,calculateDrawOdds,calculateDurationHours,calculateDrawdown,calculateVenueBalance,deriveOpeningBalance};
});
