'use strict';

/** Poker Mate v9.0.0 — 70-review-bankroll.js */
function renderHands(){
  const list=[...state.hands].sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt);
  document.getElementById('handList').innerHTML=list.length?list.map(h=>`<article class="log-card">
    <div class="log-top"><div><strong>${esc(h.cards)}・${esc(h.position)}</strong><div class="log-meta">${esc(h.date)}・${esc(h.tag)}</div></div></div>
    <p class="log-note">${esc(h.action)}</p>${h.conclusion?`<p class="log-note"><b>次回：</b>${esc(h.conclusion)}</p>`:''}
    <div class="log-actions"><button class="mini-btn delete" data-delete-hand="${h.id}">削除</button></div></article>`).join(''):'<p class="empty muted">迷ったハンドだけ残せば十分です。</p>';
}
document.getElementById('handList').addEventListener('click',e=>{
  const b=e.target.closest('[data-delete-hand]');if(b&&confirm('このハンドメモを削除しますか？')){state.hands=state.hands.filter(h=>h.id!==b.dataset.deleteHand);saveState();renderHands();}
});


function bankrollSessionProfit(){
  return state.sessions.reduce((sum,s)=>sum+sessionProfitBase(s),0);
}
function bankrollAdjustmentTotal(){
  return state.bankroll.transactions.reduce((sum,t)=>sum+num(t.amount),0);
}
function currentBankroll(){
  return num(state.bankroll.startingAmount)+bankrollSessionProfit()+bankrollAdjustmentTotal();
}
function renderBankroll(){
  const b=state.bankroll,current=currentBankroll(),profit=bankrollSessionProfit(),adjustments=bankrollAdjustmentTotal();
  const drawdown=sessionDrawdown();
  document.getElementById('bankrollCurrent').textContent=fmt(current,state.settings.baseCurrency);
  document.getElementById('bankrollCurrent').className=`bankroll-total ${current>=0?'positive':'negative'}`;
  const chipValue=state.venues.reduce((sum,venue)=>sum+venueChipValueBase(venue),0);
  const liquidEstimate=current-chipValue;
  document.getElementById('bankrollFormula').textContent=
    `総資産 ＝ 開始資金 ${fmt(b.startingAmount,state.settings.baseCurrency)} ＋ 外部入出金 ${signed(adjustments,state.settings.baseCurrency)} ＋ セッション損益 ${signed(profit,state.settings.baseCurrency)}`;
  document.getElementById('bankrollAssetBreakdown').innerHTML=`
    <div><span>総ポーカー資産</span><strong>${fmt(current,state.settings.baseCurrency)}</strong></div>
    <div><span>店舗チップ（内訳）</span><strong>${fmt(chipValue,state.settings.baseCurrency)}</strong></div>
    <div><span>手元現金等（推定）</span><strong class="${liquidEstimate>=0?'positive':'negative'}">${fmt(liquidEstimate,state.settings.baseCurrency)}</strong></div>`;

  const cashBuyIn=num(b.cashBuyIn),mttBuyIn=num(b.tournamentBuyIn);
  const cashCount=cashBuyIn?current/cashBuyIn:0,mttCount=mttBuyIn?current/mttBuyIn:0;
  const cashTarget=Math.max(1,num(b.cashTargetBuyIns)||30),mttTarget=Math.max(1,num(b.tournamentTargetBuyIns)||100);
  const cashProgress=cashBuyIn?Math.max(0,Math.min(100,cashCount/cashTarget*100)):0;
  const mttProgress=mttBuyIn?Math.max(0,Math.min(100,mttCount/mttTarget*100)):0;
  document.getElementById('bankrollStats').innerHTML=`
    <div class="bankroll-stat">
      <strong>${cashBuyIn?`${cashCount.toFixed(1)} BI`:'未設定'}</strong>
      <span>リング資金力・目標 ${cashTarget} BI</span>
      <div class="progress-track"><div class="progress-fill" style="width:${cashProgress}%"></div></div>
    </div>
    <div class="bankroll-stat">
      <strong>${mttBuyIn?`${mttCount.toFixed(1)}回`:'未設定'}</strong>
      <span>MTT参加可能回数・目標 ${mttTarget}回</span>
      <div class="progress-track"><div class="progress-fill" style="width:${mttProgress}%"></div></div>
    </div>
    <div class="bankroll-stat">
      <strong class="${profit>=0?'positive':'negative'}">${signed(profit,state.settings.baseCurrency)}</strong>
      <span>セッション収支</span>
    </div>
    <div class="bankroll-stat">
      <strong class="${adjustments>=0?'positive':'negative'}">${signed(adjustments,state.settings.baseCurrency)}</strong>
      <span>入出金合計</span>
    </div>
    <div class="bankroll-stat">
      <strong class="${drawdown.currentDrawdown?'negative':''}">${drawdown.currentDrawdown?`-${fmt(drawdown.currentDrawdown,state.settings.baseCurrency)}`:fmt(0,state.settings.baseCurrency)}</strong>
      <span>ピークからの下落</span>
    </div>
    <div class="bankroll-stat">
      <strong class="${drawdown.maxDrawdown?'negative':''}">${drawdown.maxDrawdown?`-${fmt(drawdown.maxDrawdown,state.settings.baseCurrency)}`:fmt(0,state.settings.baseCurrency)}</strong>
      <span>最大ドローダウン</span>
    </div>`;

  document.getElementById('bankrollStarting').value=b.startingAmount||0;
  document.getElementById('bankrollCashBuyIn').value=b.cashBuyIn||0;
  document.getElementById('bankrollTournamentBuyIn').value=b.tournamentBuyIn||0;
  document.getElementById('bankrollCashTarget').value=b.cashTargetBuyIns||30;
  document.getElementById('bankrollTournamentTarget').value=b.tournamentTargetBuyIns||100;

  const list=[...b.transactions].sort((a,z)=>z.date.localeCompare(a.date)||z.createdAt-a.createdAt);
  document.getElementById('bankrollTransactionList').innerHTML=list.length?list.map(t=>`
    <article class="log-card">
      <div class="transaction-row">
        <div><strong>${t.amount>=0?'入金':'出金'}</strong><div class="log-meta">${esc(t.date)}${t.memo?`・${esc(t.memo)}`:''}</div></div>
        <div class="amount ${t.amount>=0?'positive':'negative'}">${signed(t.amount,state.settings.baseCurrency)}</div>
      </div>
      <div class="log-actions"><button class="mini-btn delete" data-delete-bankroll-transaction="${t.id}">削除</button></div>
    </article>`).join(''):'<p class="empty muted">入出金の記録はまだありません。</p>';
}
document.getElementById('saveBankrollSettingsBtn').addEventListener('click',()=>{
  const container=document.getElementById('bankrollSettingsInput');clearFormError(container);
  const starting=num(document.getElementById('bankrollStarting').value),cashBuyIn=num(document.getElementById('bankrollCashBuyIn').value),tournamentBuyIn=num(document.getElementById('bankrollTournamentBuyIn').value),cashTarget=num(document.getElementById('bankrollCashTarget').value),tournamentTarget=num(document.getElementById('bankrollTournamentTarget').value);
  if([starting,cashBuyIn,tournamentBuyIn].some(value=>value<0))return reportFormError(container,'資金と想定バイインは0以上にしてください。',document.getElementById('bankrollStarting'));
  if(cashTarget<1||tournamentTarget<1)return reportFormError(container,'目標回数は1以上にしてください。',document.getElementById('bankrollCashTarget'));
  state.bankroll.startingAmount=starting;state.bankroll.cashBuyIn=cashBuyIn;state.bankroll.tournamentBuyIn=tournamentBuyIn;state.bankroll.cashTargetBuyIns=cashTarget;state.bankroll.tournamentTargetBuyIns=tournamentTarget;
  saveState({reason:'bankroll-settings'});renderBankroll();renderHome();showToast('バンクロール基準値を保存しました');
});
document.getElementById('bankrollTransactionForm').addEventListener('submit',e=>{
  e.preventDefault();clearFormError(e.target);
  const date=document.getElementById('bankrollTransactionDate'),amountField=document.getElementById('bankrollTransactionAmount');
  const raw=num(amountField.value);
  if(!isValidDate(date.value))return reportFormError(e.target,'日付を正しく入力してください。',date);
  if(raw<=0)return reportFormError(e.target,'金額は0より大きい値にしてください。',amountField);
  const sign=document.getElementById('bankrollTransactionType').value==='withdrawal'?-1:1;
  state.bankroll.transactions.push({
    id:uid(),
    date:document.getElementById('bankrollTransactionDate').value,
    amount:raw*sign,
    memo:document.getElementById('bankrollTransactionMemo').value.trim(),
    createdAt:Date.now()
  });
  saveState();
  e.target.reset();
  document.getElementById('bankrollTransactionDate').value=today();
  renderBankroll();showToast('入出金を記録しました');
});
document.getElementById('bankrollTransactionList').addEventListener('click',e=>{
  const b=e.target.closest('[data-delete-bankroll-transaction]');
  if(b&&confirm('この入出金記録を削除しますか？')){
    state.bankroll.transactions=state.bankroll.transactions.filter(t=>t.id!==b.dataset.deleteBankrollTransaction);
    saveState();renderBankroll();
  }
});
