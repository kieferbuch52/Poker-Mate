'use strict';

/** Poker Mate v9.0.0 — 40-sessions.js */
function setSessionType(type){
  currentSessionType=type;
  document.querySelectorAll('[data-session-type]').forEach(b=>b.classList.toggle('active',b.dataset.sessionType===type));
  document.getElementById('cashFields').classList.toggle('hidden',type!=='cash');
  document.getElementById('tournamentFields').classList.toggle('hidden',type!=='tournament');
  document.getElementById('cashBuyIn').required=type==='cash';
  document.getElementById('cashOut').required=type==='cash';
  document.getElementById('sessionChipModeField').classList.toggle('hidden',type!=='cash');
  if(type!=='cash')document.getElementById('sessionChipMode').value='cash';
  updateSessionPreview();
}
document.querySelectorAll('[data-session-type]').forEach(b=>b.addEventListener('click',()=>setSessionType(b.dataset.sessionType)));

function renderVenueOptions(){
  const select=document.getElementById('sessionVenue');
  const prev=select.value;
  select.innerHTML=`<option value="">未登録</option>${state.venues.map(v=>`<option value="${v.id}">${esc(v.name)}（${esc(v.currency)}）</option>`).join('')}`;
  if([...select.options].some(o=>o.value===prev))select.value=prev;
  updateFxFromVenue();
}
function updateFxFromVenue(){
  const v=venueById(document.getElementById('sessionVenue').value);
  document.getElementById('sessionFx').value=v?num(v.fxRate)||1:1;
  document.getElementById('fxHint').textContent=v?`1 ${v.currency} = ${num(v.fxRate)||1} ${state.settings.baseCurrency}`:`1 現地通貨 = 1 ${state.settings.baseCurrency}`;
  updateSessionPreview();
}
document.getElementById('sessionVenue').addEventListener('change',updateFxFromVenue);


const EXPENSE_FIELD_IDS=['expenseTransport','expenseFood','expenseLodging','expenseTips','expenseOther'];
const SESSION_TIMER_KEY='pokerMateSessionTimerV1';

function currentExpenseBreakdown(){
  return {
    transport:num(document.getElementById('expenseTransport').value),
    food:num(document.getElementById('expenseFood').value),
    lodging:num(document.getElementById('expenseLodging').value),
    tips:num(document.getElementById('expenseTips').value),
    other:num(document.getElementById('expenseOther').value)
  };
}
function updateExpenseTotal(){
  const total=expenseBreakdownTotal(currentExpenseBreakdown());
  document.getElementById('sessionExpenses').value=total;
  const venue=venueById(document.getElementById('sessionVenue').value);
  document.getElementById('sessionExpenseTotal').textContent=`合計 ${fmtPoints(total,venue?.currency||'')}`;
  updateSessionPreview();
}
EXPENSE_FIELD_IDS.forEach(id=>{
  document.getElementById(id).addEventListener('input',updateExpenseTotal);
  document.getElementById(id).addEventListener('change',updateExpenseTotal);
});

function localClockTime(date=new Date()){
  return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
}
function loadSessionTimer(){
  try{
    const value=JSON.parse(localStorage.getItem(SESSION_TIMER_KEY));
    return value&&typeof value==='object'?value:null;
  }catch(error){return null;}
}
function saveSessionTimer(value){
  if(value)localStorage.setItem(SESSION_TIMER_KEY,JSON.stringify(value));
  else localStorage.removeItem(SESSION_TIMER_KEY);
}
function timerElapsedMs(timer,now=Date.now()){
  if(!timer)return 0;
  return num(timer.accumulatedMs)+(timer.status==='running'?Math.max(0,now-num(timer.lastResumedAt)):0);
}
function formatTimerDuration(ms){
  const totalSeconds=Math.floor(Math.max(0,ms)/1000);
  const hours=Math.floor(totalSeconds/3600);
  const minutes=Math.floor((totalSeconds%3600)/60);
  const seconds=totalSeconds%60;
  return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}
function timerHoursField(type){
  return document.getElementById(type==='tournament'?'tournamentHours':'cashHours');
}
function renderSessionTimer(){
  const timer=loadSessionTimer();
  const active=Boolean(timer);
  document.getElementById('sessionTimerDisplay').textContent=formatTimerDuration(timerElapsedMs(timer));
  document.getElementById('sessionTimerStatus').textContent=!timer
    ?'タイマー未開始'
    :timer.status==='paused'
      ?'一時停止中'
      :'計測中';
  document.getElementById('startSessionTimerBtn').disabled=active;
  document.getElementById('pauseSessionTimerBtn').classList.toggle('hidden',!timer||timer.status!=='running');
  document.getElementById('resumeSessionTimerBtn').classList.toggle('hidden',!timer||timer.status!=='paused');
  document.getElementById('endSessionTimerBtn').disabled=!active;
}
function startSessionTimer(){
  const now=new Date();
  const timer={
    status:'running',
    startedAt:now.getTime(),
    lastResumedAt:now.getTime(),
    accumulatedMs:0,
    sessionType:currentSessionType
  };
  saveSessionTimer(timer);
  document.getElementById('sessionDate').value=today();
  document.getElementById('sessionStartTime').value=localClockTime(now);
  document.getElementById('sessionEndTime').value='';
  renderSessionTimer();
  showToast('セッション計測を開始しました');
}
function pauseSessionTimer(){
  const timer=loadSessionTimer();if(!timer||timer.status!=='running')return;
  timer.accumulatedMs=timerElapsedMs(timer);
  timer.status='paused';
  timer.lastResumedAt=0;
  saveSessionTimer(timer);
  renderSessionTimer();
}
function resumeSessionTimer(){
  const timer=loadSessionTimer();if(!timer||timer.status!=='paused')return;
  timer.status='running';
  timer.lastResumedAt=Date.now();
  saveSessionTimer(timer);
  renderSessionTimer();
}
function endSessionTimer(){
  const timer=loadSessionTimer();if(!timer)return;
  const now=new Date();
  const elapsed=timerElapsedMs(timer,now.getTime());
  if(currentSessionType!==timer.sessionType)setSessionType(timer.sessionType);
  document.getElementById('sessionEndTime').value=localClockTime(now);
  timerHoursField(timer.sessionType).value=stripNumberZeros(elapsed/3600000,2);
  saveSessionTimer(null);
  renderSessionTimer();
  updateSessionPreview();
  showToast('計測時間をプレー時間へ反映しました');
}
function syncHoursFromClockTimes(){
  const start=document.getElementById('sessionStartTime').value;
  const end=document.getElementById('sessionEndTime').value;
  if(!start||!end)return;
  const hours=PokerCore.calculateDurationHours(start,end);
  timerHoursField(currentSessionType).value=stripNumberZeros(hours,2);
  updateSessionPreview();
}
document.getElementById('startSessionTimerBtn').addEventListener('click',startSessionTimer);
document.getElementById('pauseSessionTimerBtn').addEventListener('click',pauseSessionTimer);
document.getElementById('resumeSessionTimerBtn').addEventListener('click',resumeSessionTimer);
document.getElementById('endSessionTimerBtn').addEventListener('click',endSessionTimer);
document.getElementById('sessionStartTime').addEventListener('change',syncHoursFromClockTimes);
document.getElementById('sessionEndTime').addEventListener('change',syncHoursFromClockTimes);
setInterval(renderSessionTimer,1000);

function calculateFormProfit(){
  const expenses=num(document.getElementById('sessionExpenses').value);
  if(currentSessionType==='cash'){
    const buyIn=num(document.getElementById('cashBuyIn').value),cashOut=num(document.getElementById('cashOut').value);
    return {profit:cashOut-buyIn-expenses,cost:buyIn+expenses,chipDelta:cashOut-buyIn};
  }
  const buyIn=num(document.getElementById('tournamentBuyIn').value),reentry=num(document.getElementById('tournamentReentry').value),prize=num(document.getElementById('tournamentPrize').value);
  return {profit:prize-buyIn-reentry-expenses,cost:buyIn+reentry+expenses,chipDelta:prize-buyIn-reentry};
}
function updateSessionChipModeHint(){
  const mode=document.getElementById('sessionChipMode').value;
  const hints={stored:'保有チップからバイインを差し引き、終了時チップを残高へ戻します。',cash:'現金で直接参加した扱いです。店舗チップ残高は変わりません。',purchase:'バイイン額のチップ購入を自動記録し、そのチップで参加します。手動で同じ購入を記録しないでください。'};
  document.getElementById('sessionChipModeHint').textContent=hints[mode]||'';
}
document.getElementById('sessionChipMode').addEventListener('change',()=>{updateSessionChipModeHint();updateSessionPreview();});
function updateSessionPreview(){
  const c=calculateFormProfit(),fx=num(document.getElementById('sessionFx').value)||1;
  const venue=venueById(document.getElementById('sessionVenue').value),currency=venue?.currency||'LOCAL';
  const el=document.getElementById('sessionPreview');
  const baseProfit=c.profit*fx;
  let chipLine='';
  const mode=document.getElementById('sessionChipMode').value;
  if(currentSessionType==='cash'&&venue){
    const editingId=document.getElementById('sessionId').value;
    const oldSession=editingId?state.sessions.find(session=>session.id===editingId):null;
    const oldSessionDelta=oldSession?.venueId===venue.id&&oldSession.reflected?num(oldSession.chipDelta):0;
    const oldAutoPurchase=state.chipTransactions.filter(tx=>tx.venueId===venue.id&&tx.source==='session'&&tx.sessionId===editingId).reduce((sum,tx)=>sum+num(tx.amount),0);
    const currentBalance=venueChipBalance(venue.id)-oldSessionDelta-oldAutoPurchase;
    const purchase=mode==='purchase'?num(document.getElementById('cashBuyIn').value):0;
    const delta=mode==='cash'?0:c.chipDelta;
    chipLine=`<br>店舗チップ：<strong>${fmtPoints(currentBalance+purchase+delta,currency)}</strong> <span class="muted">（編集前 ${fmtPoints(venueChipBalance(venue.id),currency)}）</span>`;
  }
  el.innerHTML=`現地収支：<strong class="${c.profit>=0?'positive':'negative'}">${signedPoints(c.profit,currency)}</strong><br>基準通貨：<strong>${signed(baseProfit,state.settings.baseCurrency)}</strong>${chipLine}`;
  const status=document.getElementById('sessionStatusBar');
  if(status){
    const venue=venueById(document.getElementById('sessionVenue').value);
    const label=currentSessionType==='cash'
      ?[document.getElementById('cashStakes').value||'ステークス未選択',venue?.name||'店舗未選択'].join('・')
      :[document.getElementById('tournamentName').value||'トーナメント',venue?.name||'店舗未選択'].join('・');
    status.innerHTML=`<div><span>現在の入力</span><strong>${esc(label)}</strong></div><div><span>見込み収支</span><strong class="${baseProfit>=0?'positive':'negative'}">${signed(baseProfit,state.settings.baseCurrency)}</strong></div>`;
  }
}
['cashBuyIn','cashOut','sessionExpenses','tournamentBuyIn','tournamentReentry','tournamentPrize','sessionFx','cashStakes','tournamentName'].forEach(id=>{
  const element=document.getElementById(id);
  element.addEventListener('input',updateSessionPreview);
  element.addEventListener('change',updateSessionPreview);
});

function ensureCashStakeOption(value){
  renderRingStakeOptions(value);
}
function resetSessionForm(){
  document.getElementById('sessionForm').reset();
  renderRingStakeOptions(uiState.lastStake||'');
  document.getElementById('sessionId').value='';
  document.getElementById('sessionDate').value=today();
  document.getElementById('sessionExpenses').value=0;
  EXPENSE_FIELD_IDS.forEach(id=>document.getElementById(id).value=0);
  document.getElementById('sessionExpenseTotal').textContent='合計 0';
  document.getElementById('sessionStartTime').value='';
  document.getElementById('sessionEndTime').value='';
  document.getElementById('tournamentReentryCount').value=0;
  document.getElementById('tournamentReentry').value=0;
  document.getElementById('tournamentPrize').value=0;
  document.getElementById('sessionChipMode').value='stored';
  updateSessionChipModeHint();
  document.getElementById('cancelEditBtn').classList.add('hidden');
  document.getElementById('sessionSubmit').textContent='セッションを保存';
  setSessionType(uiState.lastSessionType||'cash');
  renderVenueOptions();
  if(uiState.lastVenueId&&state.venues.some(v=>v.id===uiState.lastVenueId)){
    document.getElementById('sessionVenue').value=uiState.lastVenueId;
    updateFxFromVenue();
  }
  if(uiState.lastStake&&[...document.getElementById('cashStakes').options].some(o=>o.value===uiState.lastStake)){
    document.getElementById('cashStakes').value=uiState.lastStake;
  }
  updateSessionPreview();
}
document.getElementById('cancelEditBtn').addEventListener('click',resetSessionForm);

document.getElementById('sessionForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(!validateSessionInput())return;
  const editingId=document.getElementById('sessionId').value;
  const old=editingId?state.sessions.find(session=>session.id===editingId):null;
  const calc=calculateFormProfit();
  const venueId=document.getElementById('sessionVenue').value;
  const fx=num(document.getElementById('sessionFx').value)||1;
  const chipMode=currentSessionType==='cash'?document.getElementById('sessionChipMode').value:'cash';
  const sessionId=editingId||uid();
  const session={
    id:sessionId,type:currentSessionType,date:document.getElementById('sessionDate').value,
    venueId,fxRate:fx,expenses:num(document.getElementById('sessionExpenses').value),
    expenseBreakdown:currentExpenseBreakdown(),
    startTime:document.getElementById('sessionStartTime').value,
    endTime:document.getElementById('sessionEndTime').value,
    notes:document.getElementById('sessionNotes').value.trim(),profitLocal:calc.profit,
    profitBase:calc.profit*fx,costLocal:calc.cost,chipMode,chipDelta:chipMode==='cash'?0:calc.chipDelta,reflected:chipMode!=='cash',
    createdAt:old?.createdAt||Date.now(),updatedAt:Date.now(),
    hours:currentSessionType==='cash'?num(document.getElementById('cashHours').value):num(document.getElementById('tournamentHours').value),
    stakes:currentSessionType==='cash'?document.getElementById('cashStakes').value.trim():'',
    buyIn:currentSessionType==='cash'?num(document.getElementById('cashBuyIn').value):num(document.getElementById('tournamentBuyIn').value),
    cashOut:currentSessionType==='cash'?num(document.getElementById('cashOut').value):0,
    tournamentName:currentSessionType==='tournament'?document.getElementById('tournamentName').value.trim():'',
    field:currentSessionType==='tournament'?num(document.getElementById('tournamentField').value):0,
    place:currentSessionType==='tournament'?num(document.getElementById('tournamentPlace').value):0,
    reentry:currentSessionType==='tournament'?num(document.getElementById('tournamentReentry').value):0,
    reentryCount:currentSessionType==='tournament'?Math.max(0,Math.floor(num(document.getElementById('tournamentReentryCount').value))):0,
    prize:currentSessionType==='tournament'?num(document.getElementById('tournamentPrize').value):0
  };
  state.chipTransactions=state.chipTransactions.filter(tx=>!(tx.source==='session'&&tx.sessionId===sessionId));
  if(chipMode==='purchase'){
    state.chipTransactions.push({id:uid(),venueId,date:session.date,type:'purchase',amount:session.buyIn,source:'session',sessionId,memo:'セッション開始時の自動購入',createdAt:Date.now()});
  }
  if(editingId)state.sessions=state.sessions.map(item=>item.id===editingId?session:item);else state.sessions.push(session);
  updateUiState({lastSessionType:currentSessionType,lastVenueId:venueId,lastStake:currentSessionType==='cash'?session.stakes:uiState.lastStake});
  saveState({reason:editingId?'session-edit':'session-create'});
  resetSessionForm();renderSessions();renderHome();renderVenues();showToast(editingId?'更新しました':'保存しました');
});

function sessionCardHtml(s){
  const v=venueById(s.venueId),currency=v?.currency||'LOCAL';
  const title=s.type==='cash'?(s.stakes||'リング'):(s.tournamentName||'トーナメント');
  const clock=s.startTime||s.endTime?`${s.startTime||'--:--'}–${s.endTime||'--:--'}・`:'';
  const detail=s.type==='cash'
    ?`${clock}${num(s.hours).toFixed(1)}h・Buy ${fmtPoints(s.buyIn,currency)} → ${fmtPoints(s.cashOut,currency)}`
    :`${clock}${s.place?`${s.place}位`:'順位未入力'}${s.field?` / ${s.field}人`:''}・費用 ${fmtPoints(s.costLocal,currency)}${num(s.reentryCount)?`・Re ${num(s.reentryCount)}回`:''}`;
  return `<article class="log-card">
    <div class="log-top"><div><strong>${esc(title)}</strong><div class="log-meta">${esc(s.date)}・${esc(v?.name||'店舗未登録')}<br>${esc(detail)}</div></div>
    <div class="log-profit ${s.profitLocal>=0?'positive':'negative'}">${signedPoints(s.profitLocal,currency)}</div></div>
    ${s.notes?`<p class="log-note">${esc(s.notes)}</p>`:''}
    <div class="log-actions"><button class="mini-btn" data-edit-session="${s.id}">編集</button><button class="mini-btn delete" data-delete-session="${s.id}">削除</button></div>
  </article>`;
}
function renderSessionVenueFilter(){
  const select=document.getElementById('sessionVenueFilter');
  if(!select)return;
  const previous=select.value||'all';
  select.innerHTML=`<option value="all">すべての店舗</option>${state.venues.map(v=>`<option value="${esc(v.id)}">${esc(v.name)}</option>`).join('')}`;
  select.value=previous==='all'||state.venues.some(v=>v.id===previous)?previous:'all';
}

function renderStakeStats(){
  const cash=state.sessions.filter(session=>session.type==='cash'&&session.stakes);
  document.getElementById('stakeStatsSummary').textContent=`リング${cash.length}件`;
  const groups=new Map();
  cash.forEach(session=>{
    if(!groups.has(session.stakes))groups.set(session.stakes,[]);
    groups.get(session.stakes).push(session);
  });
  const configured=normalizeRingStakes(state.settings.ringStakes);
  const order=value=>{
    const index=configured.indexOf(value);
    return index>=0?index:configured.length+100;
  };
  const rows=[...groups.entries()].sort((a,b)=>order(a[0])-order(b[0])||a[0].localeCompare(b[0]));
  document.getElementById('stakeStatsTable').innerHTML=rows.length
    ?`<div class="analytics-row analytics-header"><span>ステークス</span><span>回数</span><span>時間</span><span>勝率</span><span>時給</span><strong>収支</strong></div>`+
      rows.map(([stakes,sessions])=>{
        const hours=sessions.reduce((sum,session)=>sum+num(session.hours),0);
        const profit=sessions.reduce((sum,session)=>sum+sessionProfitBase(session),0);
        return `<div class="analytics-row">
          <span>${esc(formatStakeValue(stakes))}</span>
          <span>${sessions.length}</span>
          <span>${hours.toFixed(1)}h</span>
          <span>${pct(sessionWinRate(sessions))}</span>
          <span>${hours?fmt(profit/hours,state.settings.baseCurrency):'—'}</span>
          <strong class="${profit>=0?'positive':'negative'}">${signed(profit,state.settings.baseCurrency)}</strong>
        </div>`;
      }).join('')
    :'<div class="empty-state"><strong>リングの記録がありません</strong><p>ステークス別の回数・時給・勝率・収支を表示します。</p></div>';
}

function renderSessions(){
  renderVenueOptions();
  renderRingStakeOptions(document.getElementById('cashStakes').value);
  renderSessionVenueFilter();
  const typeFilter=document.getElementById('sessionListFilter').value;
  const venueFilter=document.getElementById('sessionVenueFilter').value;
  const search=(document.getElementById('sessionSearch').value||'').trim().toLowerCase();
  const list=[...state.sessions].filter(session=>{
    if(typeFilter!=='all'&&session.type!==typeFilter)return false;
    if(venueFilter!=='all'&&session.venueId!==venueFilter)return false;
    if(!search)return true;
    const venue=venueById(session.venueId);
    const haystack=[
      session.date,session.stakes,session.tournamentName,session.notes,
      venue?.name,venue?.currency
    ].join(' ').toLowerCase();
    return haystack.includes(search);
  }).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt);
  const total=list.reduce((sum,s)=>sum+sessionProfitBase(s),0);
  document.getElementById('sessionHistorySummary').textContent=`${list.length}件・${signed(total,state.settings.baseCurrency)}`;
  document.getElementById('sessionList').innerHTML=list.length
    ?list.map(sessionCardHtml).join('')
    :'<div class="empty-state"><strong>条件に合う履歴がありません</strong><p>検索条件を変更してください。</p></div>';
  renderStakeStats();
}
['sessionListFilter','sessionVenueFilter'].forEach(id=>document.getElementById(id).addEventListener('change',renderSessions));
document.getElementById('sessionSearch').addEventListener('input',renderSessions);
function handleSessionActionClick(event){
  const edit=event.target.closest('[data-edit-session]');
  const del=event.target.closest('[data-delete-session]');
  if(edit){
    const id=edit.dataset.editSession;
    go('sessions');
    requestAnimationFrame(()=>editSession(id));
    return;
  }
  if(del)deleteSession(del.dataset.deleteSession);
}
document.getElementById('sessionList').addEventListener('click',handleSessionActionClick);
document.getElementById('recentSessions').addEventListener('click',handleSessionActionClick);
function editSession(id){
  const s=state.sessions.find(x=>x.id===id);if(!s)return;
  openCollapsible('session-input');
  setSessionType(s.type);
  document.getElementById('sessionId').value=s.id;document.getElementById('sessionDate').value=s.date;
  document.getElementById('sessionVenue').value=s.venueId||'';document.getElementById('sessionFx').value=s.fxRate||1;
  const expenseBreakdown=normalizeExpenseBreakdown(s.expenseBreakdown,s.expenses);
  document.getElementById('sessionExpenses').value=expenseBreakdownTotal(expenseBreakdown);
  document.getElementById('expenseTransport').value=expenseBreakdown.transport||0;
  document.getElementById('expenseFood').value=expenseBreakdown.food||0;
  document.getElementById('expenseLodging').value=expenseBreakdown.lodging||0;
  document.getElementById('expenseTips').value=expenseBreakdown.tips||0;
  document.getElementById('expenseOther').value=expenseBreakdown.other||0;
  document.getElementById('sessionExpenseTotal').textContent=`合計 ${fmtPoints(expenseBreakdownTotal(expenseBreakdown),venueById(s.venueId)?.currency||'')}`;
  document.getElementById('sessionStartTime').value=s.startTime||'';
  document.getElementById('sessionEndTime').value=s.endTime||'';
  document.getElementById('sessionNotes').value=s.notes||'';
  document.getElementById('sessionChipMode').value=s.chipMode||(s.reflected?'stored':'cash');
  updateSessionChipModeHint();
  if(s.type==='cash'){
    ensureCashStakeOption(s.stakes||'');
    document.getElementById('cashStakes').value=s.stakes||'';document.getElementById('cashHours').value=s.hours||'';
    document.getElementById('cashBuyIn').value=s.buyIn||0;document.getElementById('cashOut').value=s.cashOut||0;
  }else{
    document.getElementById('tournamentName').value=s.tournamentName||'';document.getElementById('tournamentField').value=s.field||'';
    document.getElementById('tournamentPlace').value=s.place||'';document.getElementById('tournamentHours').value=s.hours||'';
    document.getElementById('tournamentBuyIn').value=s.buyIn||0;
    document.getElementById('tournamentReentryCount').value=s.reentryCount||0;
    document.getElementById('tournamentReentry').value=s.reentry||0;
    document.getElementById('tournamentPrize').value=s.prize||0;
  }
  document.getElementById('cancelEditBtn').classList.remove('hidden');document.getElementById('sessionSubmit').textContent='変更を保存';
  updateFxHintOnly();updateSessionPreview();window.scrollTo({top:0,behavior:'smooth'});
}
function updateFxHintOnly(){
  const v=venueById(document.getElementById('sessionVenue').value);
  document.getElementById('fxHint').textContent=v?`1 ${v.currency} = ${document.getElementById('sessionFx').value} ${state.settings.baseCurrency}`:`1 現地通貨 = 1 ${state.settings.baseCurrency}`;
}
function deleteSession(id){
  const s=state.sessions.find(x=>x.id===id);if(!s||!confirm('このセッションを削除しますか？'))return;
  state.sessions=state.sessions.filter(x=>x.id!==id);
  state.chipTransactions=state.chipTransactions.filter(tx=>!(tx.source==='session'&&tx.sessionId===id));
  saveState();
  renderSessions();
  renderHome();
  showToast('削除しました');
}


function renderChipTransactionOptions(){
  const venueSelect=document.getElementById('chipTransactionVenue');
  const filter=document.getElementById('chipTransactionFilter');
  if(!venueSelect||!filter)return;
  const venues=Array.isArray(state.venues)?state.venues:[];
  const previousVenue=venueSelect.value;
  const previousFilter=filter.value||'all';
  if(!venues.length){
    venueSelect.innerHTML='<option value="">先に店舗を登録してください</option>';
    venueSelect.disabled=true;
    filter.innerHTML='<option value="all">すべての店舗</option>';
  }else{
    venueSelect.disabled=false;
    venueSelect.innerHTML=venues.map(v=>`<option value="${esc(v.id)}">${esc(v.name)}（${esc(v.currency)}）</option>`).join('');
    venueSelect.value=venues.some(v=>String(v.id)===String(previousVenue))?previousVenue:String(venues[0].id);
    filter.innerHTML=`<option value="all">すべての店舗</option>${venues.map(v=>`<option value="${esc(v.id)}">${esc(v.name)}（${esc(v.currency)}）</option>`).join('')}`;
    filter.value=previousFilter==='all'||venues.some(v=>String(v.id)===String(previousFilter))?previousFilter:'all';
  }
  const amount=document.getElementById('chipTransactionAmount');
  const submit=document.getElementById('chipTransactionSubmit');
  if(amount)amount.disabled=!venues.length;
  if(submit)submit.disabled=!venues.length;
  updateChipTransactionPreview();
}
function updateChipTransactionPreview(){
  const venue=venueById(document.getElementById('chipTransactionVenue').value);
  const amount=Math.max(0,num(document.getElementById('chipTransactionAmount').value));
  const type=document.getElementById('chipTransactionType').value;
  const preview=document.getElementById('chipTransactionPreview');
  const badge=document.getElementById('chipTransactionBalance');
  document.getElementById('chipTransactionSubmit').textContent=type==='purchase'?'チップ購入を記録':'チップ換金を記録';
  if(!venue){
    preview.textContent='店舗を選択してください。';
    badge.textContent='店舗を選択';
    return;
  }
  const delta=type==='purchase'?amount:-amount;
  const currentBalance=venueChipBalance(venue.id);
  const after=currentBalance+delta;
  badge.textContent=`現在 ${fmtPoints(currentBalance,venue.currency)}`;
  preview.innerHTML=`${type==='purchase'?'購入後':'換金後'}の残高：
    <strong class="${after>=0?'positive':'negative'}">${fmtPoints(after,venue.currency)}</strong>
    <br><span class="muted">${fmtPoints(currentBalance,venue.currency)} ${delta>=0?'+':'−'} ${fmtPoints(Math.abs(delta),venue.currency)}</span>`;
}
['chipTransactionVenue','chipTransactionType','chipTransactionAmount'].forEach(id=>{
  document.getElementById(id).addEventListener('input',updateChipTransactionPreview);
  document.getElementById(id).addEventListener('change',updateChipTransactionPreview);
});
document.getElementById('chipTransactionFilter').addEventListener('change',renderChipTransactionHistory);

document.getElementById('chipTransactionForm').addEventListener('submit',e=>{
  e.preventDefault();
  clearFormError(e.target);
  const venue=venueById(document.getElementById('chipTransactionVenue').value);
  const date=document.getElementById('chipTransactionDate');
  const amountField=document.getElementById('chipTransactionAmount');
  const rawAmount=Math.max(0,num(amountField.value));
  if(!venue)return reportFormError(e.target,'店舗を選択してください。',document.getElementById('chipTransactionVenue'));
  if(!isValidDate(date.value))return reportFormError(e.target,'日付を正しく入力してください。',date);
  if(rawAmount<=0)return reportFormError(e.target,'チップ額は0より大きい値にしてください。',amountField);
  const type=document.getElementById('chipTransactionType').value;
  const signedAmount=type==='purchase'?rawAmount:-rawAmount;
  if(type==='cashout'&&venueChipBalance(venue.id)<rawAmount){
    return reportFormError(e.target,`換金額が現在残高 ${fmtPoints(venueChipBalance(venue.id),venue.currency)} を超えています。`,amountField);
  }
  state.chipTransactions.push({
    id:uid(),
    venueId:venue.id,
    date:document.getElementById('chipTransactionDate').value,
    type,
    amount:signedAmount,
    memo:document.getElementById('chipTransactionMemo').value.trim(),source:'manual',sessionId:'',
    createdAt:Date.now()
  });
  saveState();
  const selectedVenue=venue.id;
  e.target.reset();
  document.getElementById('chipTransactionDate').value=today();
  renderVenues();
  document.getElementById('chipTransactionVenue').value=selectedVenue;
  updateChipTransactionPreview();
  showToast(type==='purchase'?'チップ購入を記録しました':'チップ換金を記録しました');
});

function renderChipTransactionHistory(){
  const filter=document.getElementById('chipTransactionFilter').value;
  const transactions=[...state.chipTransactions]
    .filter(t=>filter==='all'||t.venueId===filter)
    .sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt);
  document.getElementById('chipTransactionList').innerHTML=transactions.length?transactions.map(t=>{
    const venue=venueById(t.venueId);
    const currency=venue?.currency||'LOCAL';
    const purchase=t.amount>=0;
    return `<article class="log-card">
      <div class="transaction-row">
        <div>
          <strong>${purchase?'チップ購入':'チップ換金'}</strong>
          <div class="log-meta">${esc(t.date)}・${esc(venue?.name||'削除済み店舗')}${t.memo?`<br>${esc(t.memo)}`:''}</div>
        </div>
        <div class="amount ${purchase?'positive':'negative'}">${signedPoints(t.amount,currency)}</div>
      </div>
      <div class="log-actions"><button class="mini-btn delete" data-delete-chip-transaction="${t.id}">削除</button></div>
    </article>`;
  }).join(''):'<p class="empty muted">チップの購入・換金履歴はまだありません。</p>';
}
document.getElementById('chipTransactionList').addEventListener('click',e=>{
  const button=e.target.closest('[data-delete-chip-transaction]');
  if(!button)return;
  const transaction=state.chipTransactions.find(t=>t.id===button.dataset.deleteChipTransaction);
  if(!transaction||!confirm('この履歴を削除し、店舗のチップ残高も元に戻しますか？'))return;
  state.chipTransactions=state.chipTransactions.filter(t=>t.id!==transaction.id);
  saveState();renderVenues();showToast('履歴を削除しました');
});

document.getElementById('venueForm').addEventListener('submit',e=>{
  e.preventDefault();
  const id=document.getElementById('venueId').value;
  const old=id?venueById(id):null;
  clearFormError(e.target);
  const name=document.getElementById('venueName').value.trim();
  const currency=(document.getElementById('venueCurrency').value.trim()||'JPY').toUpperCase();
  const openingChipBalance=num(document.getElementById('venueBalance').value);
  const fxRate=num(document.getElementById('venueFx').value);
  if(!name)return reportFormError(e.target,'店舗名を入力してください。',document.getElementById('venueName'));
  if(!/^[A-Z0-9]{2,6}$/.test(currency))return reportFormError(e.target,'通貨・ポイント単位は2〜6文字の英数字にしてください。',document.getElementById('venueCurrency'));
  if(openingChipBalance<0)return reportFormError(e.target,'導入時残高は0以上にしてください。',document.getElementById('venueBalance'));
  if(fxRate<=0)return reportFormError(e.target,'換算レートは0より大きい値にしてください。',document.getElementById('venueFx'));
  const venue={id:id||uid(),name,currency,openingChipBalance,fxRate,notes:document.getElementById('venueNotes').value.trim()};
  if(old)state.venues=state.venues.map(v=>v.id===id?venue:v);else state.venues.push(venue);
  saveState();resetVenueForm();renderVenues();showToast(id?'店舗を更新しました':'店舗を追加しました');
});
function resetVenueForm(){
  document.getElementById('venueForm').reset();document.getElementById('venueId').value='';
  document.getElementById('venueCurrency').value='JPY';document.getElementById('venueBalance').value=0;document.getElementById('venueFx').value=1;
}
function renderVenues(){
  renderChipTransactionOptions();
  renderChipTransactionHistory();
  const wrap=document.getElementById('venueList');
  const sort=document.getElementById('venueSort')?.value||uiState.venueSort||'recent';
  if(document.getElementById('venueSort'))document.getElementById('venueSort').value=sort;
  updateUiState({venueSort:sort});
  const venues=[...state.venues].sort((a,b)=>{
    if(sort==='name')return a.name.localeCompare(b.name,'ja');
    const profitA=state.sessions.filter(s=>s.venueId===a.id).reduce((sum,s)=>sum+sessionProfitBase(s),0);
    const profitB=state.sessions.filter(s=>s.venueId===b.id).reduce((sum,s)=>sum+sessionProfitBase(s),0);
    if(sort==='profit')return profitB-profitA;
    if(sort==='balance')return venueChipValueBase(b)-venueChipValueBase(a);
    return state.venues.indexOf(a)-state.venues.indexOf(b);
  });
  wrap.innerHTML=venues.length?venues.map(v=>{
    const sessions=state.sessions.filter(s=>s.venueId===v.id),profit=sessions.reduce((a,s)=>a+sessionProfitLocal(s),0);
    const cash=sessions.filter(s=>s.type==='cash'),hours=cash.reduce((a,s)=>a+num(s.hours),0);
    const chipBalance=venueChipBalance(v.id);
    const chipTx=state.chipTransactions.filter(t=>t.venueId===v.id);
    const purchased=chipTx.filter(t=>t.amount>0).reduce((a,t)=>a+num(t.amount),0);
    const cashedOut=Math.abs(chipTx.filter(t=>t.amount<0).reduce((a,t)=>a+num(t.amount),0));
    return `<article class="log-card venue-card">
      <div class="log-top"><div><strong>${esc(v.name)}</strong><div class="log-meta">${esc(v.currency)}・換算 ${num(v.fxRate)} ${esc(state.settings.baseCurrency)}</div></div>
      <div class="log-profit ${profit>=0?'positive':'negative'}">${signedPoints(profit,v.currency)}</div></div>
      <div class="balance">${fmtPoints(chipBalance,v.currency)}</div><div class="log-meta">台帳から自動計算（約 ${fmt(chipBalance*v.fxRate,state.settings.baseCurrency)}）</div>
      <div class="venue-stats"><div><strong>${sessions.length}</strong><span>セッション</span></div><div><strong>${hours?fmtPoints(cash.reduce((a,s)=>a+sessionProfitLocal(s),0)/hours,v.currency):'—'}</strong><span>リング時給</span></div><div><strong>${sessions.filter(s=>s.type==='tournament').length}</strong><span>MTT回数</span></div></div>
      ${(()=>{
        const wins=sessions.filter(session=>sessionProfitLocal(session)>0).length;
        const avgHours=sessions.length?sessions.reduce((sum,session)=>sum+num(session.hours),0)/sessions.length:0;
        const profits=sessions.map(sessionProfitLocal);
        const maxWin=profits.length?Math.max(...profits):0;
        const maxLoss=profits.length?Math.min(...profits):0;
        const recent10=[...sessions].sort((a,b)=>b.date.localeCompare(a.date)||num(b.createdAt)-num(a.createdAt)).slice(0,10).reduce((sum,session)=>sum+sessionProfitLocal(session),0);
        return `<div class="venue-analysis-grid">
          <div><span>勝ち率</span><strong>${sessions.length?pct(wins/sessions.length*100):'—'}</strong></div>
          <div><span>平均時間</span><strong>${sessions.length?`${avgHours.toFixed(1)}h`:'—'}</strong></div>
          <div><span>最大勝ち</span><strong class="${maxWin>0?'positive':''}">${sessions.length?signedPoints(maxWin,v.currency):'—'}</strong></div>
          <div><span>最大負け</span><strong class="${maxLoss<0?'negative':''}">${sessions.length?signedPoints(maxLoss,v.currency):'—'}</strong></div>
          <div><span>直近10回</span><strong class="${recent10>=0?'positive':'negative'}">${sessions.length?signedPoints(recent10,v.currency):'—'}</strong></div>
          <div><span>サンプル</span><strong>${sessions.length<5?'少':'有'}</strong></div>
        </div>${sessions.length&&sessions.length<5?'<p class="sample-warning">5セッション未満のため参考値です。</p>':''}`;
      })()}
      ${chipTx.length?`<div class="chip-flow-summary"><span>購入 ${fmtPoints(purchased,v.currency)}</span><span>換金 ${fmtPoints(cashedOut,v.currency)}</span></div>`:''}
      ${v.notes?`<p class="log-note">${esc(v.notes)}</p>`:''}
      <div class="venue-quick-actions">
        <button type="button" data-chip-action="purchase" data-chip-venue="${v.id}">＋ チップ購入</button>
        <button type="button" data-chip-action="cashout" data-chip-venue="${v.id}">− 換金</button>
      </div>
      <div class="log-actions"><button class="mini-btn" data-edit-venue="${v.id}">編集</button><button class="mini-btn delete" data-delete-venue="${v.id}">削除</button></div>
    </article>`;
  }).join(''):'<p class="empty muted">店舗を登録すると、店舗別成績とチップ残高を管理できます。</p>';
}
document.getElementById('venueList').addEventListener('click',e=>{
  const edit=e.target.closest('[data-edit-venue]'),del=e.target.closest('[data-delete-venue]');
  if(edit){
    const v=venueById(edit.dataset.editVenue);if(!v)return;
    openCollapsible('venue-input');
    document.getElementById('venueId').value=v.id;document.getElementById('venueName').value=v.name;document.getElementById('venueCurrency').value=v.currency;
    document.getElementById('venueBalance').value=v.openingChipBalance||0;document.getElementById('venueFx').value=v.fxRate;document.getElementById('venueNotes').value=v.notes||'';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  if(del){
    const id=del.dataset.deleteVenue;
    if(state.sessions.some(s=>s.venueId===id)){alert('この店舗にはセッション履歴があります。先にセッション側の店舗を変更または削除してください。');return;}
    if(state.chipTransactions.some(t=>t.venueId===id)){alert('この店舗にはチップ購入・換金履歴があります。先に履歴を削除してください。');return;}
    if(confirm('この店舗を削除しますか？')){state.venues=state.venues.filter(v=>v.id!==id);saveState();renderVenues();}
  }
});


document.getElementById('venueSort').addEventListener('change',renderVenues);
document.getElementById('venueList').addEventListener('click',event=>{
  const chipButton=event.target.closest('[data-chip-action]');
  if(!chipButton)return;
  setVenueView('chips');
  const venueId=chipButton.dataset.chipVenue;
  const type=chipButton.dataset.chipAction;
  document.getElementById('chipTransactionVenue').value=venueId;
  document.getElementById('chipTransactionType').value=type;
  updateChipTransactionPreview();
  openCollapsible('chip-input');
  document.getElementById('chipPanel').scrollIntoView({behavior:'smooth',block:'start'});
});
