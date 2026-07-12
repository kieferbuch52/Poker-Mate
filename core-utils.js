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
  function calculateBetOdds({pot,bet,call}){
    pot=Math.max(0,number(pot));bet=Math.max(0,number(bet));call=Math.max(0,number(call));
    const finalPot=pot+bet+call;
    return {pot,bet,call,finalPot,need:finalPot?call/finalPot*100:0,bluff:pot+bet?bet/(pot+bet)*100:0,mdf:pot+bet?pot/(pot+bet)*100:0};
  }
  function calculateRaiseOdds({pot,ownBet,raiseTo}){
    pot=Math.max(0,number(pot));ownBet=Math.max(0,number(ownBet));raiseTo=Math.max(0,number(raiseTo));
    const valid=raiseTo>=ownBet,call=Math.max(0,raiseTo-ownBet),finalPot=pot+ownBet+raiseTo+call;
    return {pot,ownBet,raiseTo,valid,call,finalPot,need:valid&&finalPot?call/finalPot*100:0};
  }
  function calculateVenueBalance({openingBalance,transactions=[],sessions=[]}){
    return number(openingBalance)+transactions.reduce((sum,item)=>sum+number(item.amount),0)+sessions.reduce((sum,item)=>sum+number(item.chipDelta),0);
  }
  function deriveOpeningBalance(currentBalance,transactionTotal,sessionTotal){return number(currentBalance)-number(transactionTotal)-number(sessionTotal);}
  return {number,localDateString,isValidIsoDate,calculateBetOdds,calculateRaiseOdds,calculateVenueBalance,deriveOpeningBalance};
});
