'use strict';

/** Poker Mate v9.0.0 — 20-state.js */
function loadUiState(){
  const defaults={
    lastTool:'odds',
    venueView:'list',
    moreView:'review',
    graphPeriod:'30',
    venueSort:'recent',
    lastSessionType:'cash',
    lastVenueId:'',
    lastStake:'',
    rangeSource:'pokerMate',
    yokosawaThreshold:'green',
    yokosawaGame:'ring',
    yokosawaSituation:'firstIn',
    rangeGame:'ring',
    tournamentStack:'25',
    headsUpStack:'20',
    rangeMode:'rfi',
    rangePosition:'UTG',
    rangeTableSize:'6',
    rangeAnte:'bb',
    rangeIcm:'chip',
    rangeOpenSize:'2.5',
    rangeFrequencyEdit:false,
    oddsMode:'bet',
    equityHeroMode:'fixed',
    equityVillainMode:'random',
    equityPlayer3:false,
    uiDensity:'standard',
    uiMotion:'standard',
    uiStickyControls:true,
    reportMode:'month',
    reportPeriod:''
  };
  try{
    const parsed=JSON.parse(localStorage.getItem(UI_STORAGE_KEY));
    return {...defaults,...(parsed&&typeof parsed==='object'?parsed:{})};
  }catch(error){
    return defaults;
  }
}
function saveUiState(){
  try{localStorage.setItem(UI_STORAGE_KEY,JSON.stringify(uiState));}catch(error){}
}
function updateUiState(values){
  uiState={...uiState,...values};
  saveUiState();
}

let state = loadState();
let uiState = loadUiState();
let currentSessionType = 'cash';
let currentRangeGame = ['ring','tournament','headsup'].includes(uiState.rangeGame)?uiState.rangeGame:'ring';
let currentTournamentStack = ['100','80','60','40','25','15','10'].includes(String(uiState.tournamentStack))
  ?String(uiState.tournamentStack)
  :'25';
let currentHeadsUpStack = ['40','30','25','20','15','10','5'].includes(String(uiState.headsUpStack))
  ?String(uiState.headsUpStack)
  :'20';
let currentRangePosition = ['UTG','HJ','CO','BTN','SB'].includes(uiState.rangePosition)
  ?uiState.rangePosition
  :'UTG';
let currentRangeMode = ['rfi','bb'].includes(uiState.rangeMode)
  ?uiState.rangeMode
  :'rfi';
let selectedPnHand = null;
let pnCards = [null,null];
let equityCards = {hero:[null,null],villain:[null,null],player3:[null,null],board:[null,null,null,null,null]};
let equityWorker = null;
let activeCardTarget = null;
let deferredInstallPrompt = null;


function cleanStakeNumber(value){
  const n=Number(String(value).replace(/,/g,'').trim());
  if(!Number.isFinite(n)||n<=0)return '';
  return String(Number(n.toFixed(4)));
}
function normalizeStakeValue(value){
  const raw=String(value??'').replace(/\s/g,'').replace(/,/g,'');
  const parts=raw.split('/');
  if(parts.length!==2)return '';
  const sb=cleanStakeNumber(parts[0]);
  const bb=cleanStakeNumber(parts[1]);
  if(!sb||!bb)return '';
  return `${sb}/${bb}`;
}
function normalizeRingStakes(values){
  const seen=new Set();
  return (Array.isArray(values)?values:[])
    .map(normalizeStakeValue)
    .filter(value=>value&&!seen.has(value)&&seen.add(value));
}
function formatStakeNumber(value){
  const n=Number(value);
  return Number.isFinite(n)
    ?n.toLocaleString('ja-JP',{maximumFractionDigits:4})
    :String(value);
}
function formatStakeValue(value){
  const normalized=normalizeStakeValue(value);
  if(!normalized)return String(value||'');
  const [sb,bb]=normalized.split('/');
  return `${formatStakeNumber(sb)} / ${formatStakeNumber(bb)}`;
}
function renderRingStakeOptions(preferredValue){
  const select=document.getElementById('cashStakes');
  if(!select)return;
  const current=normalizeStakeValue(preferredValue??select.value);
  const configured=normalizeRingStakes(state.settings.ringStakes);
  const configuredSet=new Set(configured);
  const legacy=normalizeRingStakes(
    state.sessions
      .filter(session=>session.type==='cash'&&session.stakes)
      .map(session=>session.stakes)
  ).filter(value=>!configuredSet.has(value));

  let html='<option value="">設定済みステークスを選択</option>';
  if(configured.length){
    html+='<optgroup label="設定済み">';
    html+=configured.map(value=>`<option value="${esc(value)}">${esc(formatStakeValue(value))}</option>`).join('');
    html+='</optgroup>';
  }
  if(legacy.length){
    html+='<optgroup label="過去の入力">';
    html+=legacy.map(value=>`<option value="${esc(value)}">${esc(formatStakeValue(value))}</option>`).join('');
    html+='</optgroup>';
  }
  select.innerHTML=html;
  if(current&&[...select.options].some(option=>option.value===current)){
    select.value=current;
  }
}
function renderRingStakeSettings(){
  state.settings.ringStakes=normalizeRingStakes(state.settings.ringStakes);
  const list=document.getElementById('ringStakeList');
  const count=document.getElementById('ringStakeCount');
  if(!list||!count)return;
  const stakes=state.settings.ringStakes;
  count.textContent=`${stakes.length}件`;
  list.innerHTML=stakes.length
    ?stakes.map((value,index)=>`
      <div class="ring-stake-item" data-ring-stake-item="${esc(value)}" draggable="true">
        <button class="stake-drag-handle" type="button" data-drag-ring-stake="${esc(value)}" aria-label="${esc(formatStakeValue(value))}をドラッグして並び替え">
          <span aria-hidden="true">⠿</span>
        </button>
        <span class="stake-order-number" aria-label="${index+1}番目">${index+1}</span>
        <span class="stake-blind-label"><small>SB / BB</small><strong>${esc(formatStakeValue(value))}</strong></span>
        <div class="stake-item-actions">
          <button class="mini-btn delete" type="button" data-delete-ring-stake="${esc(value)}">削除</button>
        </div>
      </div>
    `).join('')
    :'<p class="empty muted">候補がありません。SBとBBを入力して追加してください。</p>';
  renderRingStakeOptions();
  initializeRingStakeDragAndDrop();
}


const EXPENSE_KEYS=['transport','food','lodging','tips','other'];
function normalizeExpenseBreakdown(value,fallback=0){
  const source=value&&typeof value==='object'?value:{};
  return {
    transport:Math.max(0,num(source.transport)),
    food:Math.max(0,num(source.food)),
    lodging:Math.max(0,num(source.lodging)),
    tips:Math.max(0,num(source.tips)),
    other:Math.max(0,num(source.other!==undefined?source.other:fallback))
  };
}
function expenseBreakdownTotal(value){
  const normalized=normalizeExpenseBreakdown(value,0);
  return EXPENSE_KEYS.reduce((sum,key)=>sum+num(normalized[key]),0);
}
function normalizeClockTime(value){
  const text=String(value||'');
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(text)?text:'';
}

function initialState(){
  const now=new Date().toISOString();
  return {
    version:DATA_SCHEMA_VERSION,
    schemaVersion:DATA_SCHEMA_VERSION,
    meta:{createdAt:now,updatedAt:now,lastManualBackupAt:null,lastAutoBackupAt:null,migrations:[]},
    settings:{baseCurrency:'JPY',lossLimit:0,ringStakes:[...DEFAULT_RING_STAKES]},
    bankroll:{startingAmount:0,cashBuyIn:0,tournamentBuyIn:0,cashTargetBuyIns:30,tournamentTargetBuyIns:100,transactions:[]},
    venues:[],
    chipTransactions:[],
    sessions:[],
    hands:[]
  };
}
function validId(value){return typeof value==='string'&&value.trim().length>0;}
function normalizedId(value){return validId(value)?value.trim():uid();}
function migrateToCurrentSchema(source){
  const migrated={...source};
  const oldSchema=num(source.schemaVersion||source.version||1);
  const sessions=Array.isArray(source.sessions)?source.sessions.map(session=>{
    const expenseBreakdown=normalizeExpenseBreakdown(session.expenseBreakdown,session.expenses);
    return {
      ...session,
      id:normalizedId(session.id),
      chipMode:session.chipMode||(session.reflected?'stored':'cash'),
      chipDelta:num(session.chipDelta),
      reflected:Boolean(session.reflected||session.chipMode==='stored'||session.chipMode==='purchase'),
      startTime:normalizeClockTime(session.startTime),
      endTime:normalizeClockTime(session.endTime),
      reentryCount:Math.max(0,Math.floor(num(session.reentryCount))),
      expenseBreakdown,
      expenses:expenseBreakdownTotal(expenseBreakdown)
    };
  }):[];
  const chipTransactions=Array.isArray(source.chipTransactions)?source.chipTransactions.map(tx=>({
    ...tx,id:normalizedId(tx.id),source:tx.source||'manual',sessionId:tx.sessionId||''
  })):[];
  const venues=Array.isArray(source.venues)?source.venues.map(venue=>{
    const venueId=normalizedId(venue.id);
    if(Number.isFinite(Number(venue.openingChipBalance))){
      return {...venue,id:venueId,openingChipBalance:num(venue.openingChipBalance)};
    }
    const txTotal=chipTransactions.filter(tx=>tx.venueId===venue.id).reduce((sum,tx)=>sum+num(tx.amount),0);
    const sessionTotal=sessions.filter(session=>session.venueId===venue.id&&session.reflected).reduce((sum,session)=>sum+num(session.chipDelta),0);
    const opening=PokerCore.deriveOpeningBalance(num(venue.chipBalance),txTotal,sessionTotal);
    return {...venue,id:venueId,openingChipBalance:opening};
  }):[];
  migrated.venues=venues;
  migrated.sessions=sessions;
  migrated.chipTransactions=chipTransactions;
  migrated.schemaVersion=DATA_SCHEMA_VERSION;
  migrated.version=DATA_SCHEMA_VERSION;
  migrated.meta={
    createdAt:source.meta?.createdAt||new Date().toISOString(),
    updatedAt:new Date().toISOString(),
    lastManualBackupAt:source.meta?.lastManualBackupAt||null,
    lastAutoBackupAt:source.meta?.lastAutoBackupAt||null,
    migrations:[...(Array.isArray(source.meta?.migrations)?source.meta.migrations:[]),...(oldSchema<DATA_SCHEMA_VERSION?[{from:oldSchema,to:DATA_SCHEMA_VERSION,at:new Date().toISOString()}]:[])]
  };
  return migrated;
}
function normalizeState(raw){
  const base=initialState();
  const source=migrateToCurrentSchema(raw&&typeof raw==='object'?raw:{});
  const venueIds=new Set();
  const venues=(Array.isArray(source.venues)?source.venues:[]).map(venue=>{
    let id=normalizedId(venue.id);while(venueIds.has(id))id=uid();venueIds.add(id);
    return {
      id,name:String(venue.name||'').trim(),currency:String(venue.currency||'JPY').trim().toUpperCase(),
      openingChipBalance:num(venue.openingChipBalance),fxRate:num(venue.fxRate)>0?num(venue.fxRate):1,
      notes:String(venue.notes||'')
    };
  });
  const sessionIds=new Set();
  const sessions=(Array.isArray(source.sessions)?source.sessions:[]).map(session=>{
    let id=normalizedId(session.id);while(sessionIds.has(id))id=uid();sessionIds.add(id);
    const chipMode=['stored','cash','purchase'].includes(session.chipMode)?session.chipMode:(session.reflected?'stored':'cash');
    const expenseBreakdown=normalizeExpenseBreakdown(session.expenseBreakdown,session.expenses);
    return {
      ...session,id,chipMode,reflected:chipMode!=='cash',chipDelta:num(session.chipDelta),
      startTime:normalizeClockTime(session.startTime),endTime:normalizeClockTime(session.endTime),
      reentryCount:Math.max(0,Math.floor(num(session.reentryCount))),
      expenseBreakdown,expenses:expenseBreakdownTotal(expenseBreakdown),
      createdAt:num(session.createdAt)||Date.now()
    };
  });
  const txIds=new Set();
  const chipTransactions=(Array.isArray(source.chipTransactions)?source.chipTransactions:[]).map(tx=>{
    let id=normalizedId(tx.id);while(txIds.has(id))id=uid();txIds.add(id);
    return {...tx,id,amount:num(tx.amount),source:tx.source||'manual',sessionId:tx.sessionId||'',createdAt:num(tx.createdAt)||Date.now()};
  });
  return {
    ...base,...source,version:DATA_SCHEMA_VERSION,schemaVersion:DATA_SCHEMA_VERSION,
    meta:{...base.meta,...(source.meta||{}),updatedAt:new Date().toISOString()},
    settings:{...base.settings,...(source.settings||{}),ringStakes:normalizeRingStakes(Array.isArray(source.settings?.ringStakes)?source.settings.ringStakes:base.settings.ringStakes)},
    bankroll:{...base.bankroll,...(source.bankroll||{}),transactions:Array.isArray(source.bankroll?.transactions)?source.bankroll.transactions:[]},
    venues,chipTransactions,sessions,hands:Array.isArray(source.hands)?source.hands:[]
  };
}
function loadAutoBackups(){
  try{const value=JSON.parse(localStorage.getItem(AUTO_BACKUP_KEY));return Array.isArray(value)?value:[];}catch(error){return [];}
}
function saveAutoBackups(backups){
  try{localStorage.setItem(AUTO_BACKUP_KEY,JSON.stringify(backups.slice(0,5)));return true;}catch(error){console.warn('Auto backup save failed',error);return false;}
}
function snapshotRawState(raw,reason,force=false){
  if(!raw)return false;
  const backups=loadAutoBackups();
  const latest=backups[0];
  if(!force&&latest&&Date.now()-new Date(latest.createdAt).getTime()<AUTO_BACKUP_INTERVAL_MS)return false;
  try{
    const parsed=JSON.parse(raw);
    backups.unshift({id:uid(),createdAt:new Date().toISOString(),reason,schemaVersion:num(parsed.schemaVersion||parsed.version||1),state:parsed});
    return saveAutoBackups(backups);
  }catch(error){return false;}
}
function createAutoBackup(reason='scheduled',force=false){
  const raw=localStorage.getItem(STORAGE_KEY);
  const created=snapshotRawState(raw,reason,force);
  if(created&&state?.meta)state.meta.lastAutoBackupAt=new Date().toISOString();
  return created;
}
function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw)return initialState();
    const parsed=JSON.parse(raw);
    const normalized=normalizeState(parsed);
    if(num(parsed.schemaVersion||parsed.version)!==DATA_SCHEMA_VERSION)localStorage.setItem(STORAGE_KEY,JSON.stringify(normalized));
    return normalized;
  }catch(error){console.warn('Stored data could not be loaded.',error);return initialState();}
}
function saveState(options={}){
  try{
    if(options.backup!==false)createAutoBackup(options.reason||'daily-save',Boolean(options.forceBackup));
    state.schemaVersion=DATA_SCHEMA_VERSION;state.version=DATA_SCHEMA_VERSION;
    state.meta={...(state.meta||{}),updatedAt:new Date().toISOString()};
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    return true;
  }catch(error){console.warn('Save failed.',error);showToast('端末への保存に失敗しました');return false;}
}
function uid(){ return globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function num(v){ const n=Number(v); return Number.isFinite(n)?n:0; }
function today(){ return PokerCore.localDateString(new Date()); }
function esc(v=''){ return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmt(n,currency=state.settings.baseCurrency){
  const value=num(n);
  try{
    return new Intl.NumberFormat('ja-JP',{style:'currency',currency:currency||'JPY',maximumFractionDigits:currency==='JPY'?0:2}).format(value);
  }catch(e){
    return `${currency||''} ${value.toLocaleString('ja-JP',{maximumFractionDigits:2})}`;
  }
}
function signed(n,currency){ return `${num(n)>0?'+':''}${fmt(n,currency)}`; }
function fmtPoints(n,currency=''){
  const value=Math.round(num(n));
  const formatted=value.toLocaleString('ja-JP',{maximumFractionDigits:0,minimumFractionDigits:0});
  return currency?`${currency} ${formatted}`:formatted;
}
function signedPoints(n,currency=''){
  return `${num(n)>0?'+':''}${fmtPoints(n,currency)}`;
}
function pct(n){ return `${num(n).toFixed(1)}%`; }
function venueChipBalance(venueId,subject=state){
  const venue=subject.venues.find(item=>item.id===venueId);if(!venue)return 0;
  return PokerCore.calculateVenueBalance({
    openingBalance:num(venue.openingChipBalance),
    transactions:subject.chipTransactions.filter(tx=>tx.venueId===venueId),
    sessions:subject.sessions.filter(session=>session.venueId===venueId&&session.reflected)
  });
}
function venueChipValueBase(venue,subject=state){return venueChipBalance(venue.id,subject)*num(venue.fxRate);}
function isValidDate(value){return PokerCore.isValidIsoDate(value);}
function clearFormError(form){form?.querySelector('.form-validation')?.remove();}
function reportFormError(form,message,field){
  clearFormError(form);
  const box=document.createElement('div');box.className='form-validation';box.setAttribute('role','alert');box.textContent=message;
  form.prepend(box);if(field){field.focus?.();field.scrollIntoView?.({behavior:'smooth',block:'center'});}return false;
}
function auditStateData(subject){
  const errors=[],warnings=[];
  if(num(subject.schemaVersion)!==DATA_SCHEMA_VERSION)warnings.push(`データ形式がv${subject.schemaVersion||'?'}です。保存時にv${DATA_SCHEMA_VERSION}へ移行されます。`);
  const collections=[['店舗',subject.venues],['セッション',subject.sessions],['チップ取引',subject.chipTransactions],['ハンドメモ',subject.hands],['入出金',subject.bankroll?.transactions||[]]];
  collections.forEach(([label,items])=>{const ids=new Set();items.forEach((item,index)=>{if(!validId(item.id))errors.push(`${label}${index+1}: IDがありません`);else if(ids.has(item.id))errors.push(`${label}: ID ${item.id} が重複しています`);else ids.add(item.id);});});
  const venueIds=new Set(subject.venues.map(v=>v.id));
  subject.venues.forEach(v=>{if(!v.name)errors.push('店舗名が空です');if(num(v.fxRate)<=0)errors.push(`${v.name||'店舗'}: 換算レートが0以下です`);if(num(v.openingChipBalance)<0)errors.push(`${v.name||'店舗'}: 導入時残高がマイナスです`);});
  subject.sessions.forEach(s=>{
    if(!isValidDate(s.date))errors.push(`セッション ${s.id}: 日付が不正です`);
    if(!['cash','tournament'].includes(s.type))errors.push(`セッション ${s.id}: 種別が不正です`);
    if(s.venueId&&!venueIds.has(s.venueId))errors.push(`セッション ${s.id}: 存在しない店舗を参照しています`);
    if(num(s.fxRate)<=0)errors.push(`セッション ${s.id}: 換算レートが0以下です`);
    if(num(s.buyIn)<0||num(s.expenses)<0||num(s.hours)<0)errors.push(`セッション ${s.id}: 負の入力値があります`);
    if(s.startTime&&!normalizeClockTime(s.startTime))errors.push(`セッション ${s.id}: 開始時刻が不正です`);
    if(s.endTime&&!normalizeClockTime(s.endTime))errors.push(`セッション ${s.id}: 終了時刻が不正です`);
    if(num(s.reentryCount)<0)errors.push(`セッション ${s.id}: リエントリー回数がマイナスです`);
    if(EXPENSE_KEYS.some(key=>num(s.expenseBreakdown?.[key])<0))errors.push(`セッション ${s.id}: 経費内訳に負の値があります`);
    if(s.type==='tournament'&&num(s.field)>0&&num(s.place)>num(s.field))errors.push(`セッション ${s.id}: 順位が参加人数を超えています`);
  });
  subject.chipTransactions.forEach(tx=>{if(!venueIds.has(tx.venueId))errors.push(`チップ取引 ${tx.id}: 存在しない店舗を参照しています`);if(!isValidDate(tx.date))errors.push(`チップ取引 ${tx.id}: 日付が不正です`);if(!num(tx.amount))warnings.push(`チップ取引 ${tx.id}: 金額が0です`);if(tx.source==='session'&&tx.sessionId&&!subject.sessions.some(s=>s.id===tx.sessionId))errors.push(`チップ取引 ${tx.id}: セッション参照が不正です`);});
  subject.bankroll.transactions.forEach(tx=>{if(!isValidDate(tx.date))errors.push(`入出金 ${tx.id}: 日付が不正です`);if(!num(tx.amount))warnings.push(`入出金 ${tx.id}: 金額が0です`);});
  subject.venues.forEach(v=>{const balance=venueChipBalance(v.id,subject);if(balance<0)warnings.push(`${v.name}: チップ残高が ${fmtPoints(balance,v.currency)} です`);});
  return {errors,warnings,ok:errors.length===0};
}
function validateSessionInput(){
  const form=document.getElementById('sessionForm');clearFormError(form);
  const date=document.getElementById('sessionDate');if(!isValidDate(date.value))return reportFormError(form,'日付を正しく入力してください。',date);
  const fx=document.getElementById('sessionFx');if(num(fx.value)<=0)return reportFormError(form,'換算レートは0より大きい値にしてください。',fx);
  if(loadSessionTimer()){
    return reportFormError(form,'セッションタイマーを終了してから保存してください。',document.getElementById('endSessionTimerBtn'));
  }
  const expenseFields=EXPENSE_FIELD_IDS.map(id=>document.getElementById(id));
  const invalidExpense=expenseFields.find(field=>num(field.value)<0);
  if(invalidExpense)return reportFormError(form,'経費は0以上にしてください。',invalidExpense);
  const venueId=document.getElementById('sessionVenue').value;
  if(currentSessionType==='cash'){
    const stakes=document.getElementById('cashStakes');if(!stakes.value)return reportFormError(form,'リングステークスを選択してください。',stakes);
    const buyIn=document.getElementById('cashBuyIn');if(num(buyIn.value)<=0)return reportFormError(form,'バイインは0より大きい値にしてください。',buyIn);
    const cashOut=document.getElementById('cashOut');if(num(cashOut.value)<0)return reportFormError(form,'終了時チップは0以上にしてください。',cashOut);
    const mode=document.getElementById('sessionChipMode').value;if(mode!=='cash'&&!venueId)return reportFormError(form,'店舗チップへ反映する場合は店舗を選択してください。',document.getElementById('sessionVenue'));
  }else{
    const buyIn=document.getElementById('tournamentBuyIn');if(num(buyIn.value)<=0)return reportFormError(form,'トーナメントのバイインは0より大きい値にしてください。',buyIn);
    const field=num(document.getElementById('tournamentField').value),place=num(document.getElementById('tournamentPlace').value);
    if(field>0&&place>field)return reportFormError(form,'順位は参加人数以下にしてください。',document.getElementById('tournamentPlace'));
    if(num(document.getElementById('tournamentReentryCount').value)<0)return reportFormError(form,'リエントリー回数は0以上にしてください。',document.getElementById('tournamentReentryCount'));
  }
  return true;
}

function venueById(id){ return state.venues.find(v=>v.id===id); }
function sessionProfitLocal(s){ return num(s.profitLocal); }
function sessionProfitBase(s){ return num(s.profitBase); }

function sortedSessions(list=state.sessions){
  return [...list].sort((a,b)=>a.date.localeCompare(b.date)||num(a.createdAt)-num(b.createdAt));
}
function sessionWinRate(list){
  return list.length?list.filter(session=>sessionProfitBase(session)>0).length/list.length*100:0;
}
function sessionExpenseBase(session){
  return num(session.expenses)*num(session.fxRate);
}
function sessionDrawdown(list=state.sessions){
  return PokerCore.calculateDrawdown(sortedSessions(list).map(sessionProfitBase));
}
function tournamentStats(list){
  const tournaments=list.filter(session=>session.type==='tournament');
  const events=tournaments.length;
  const entries=events+tournaments.reduce((sum,session)=>sum+num(session.reentryCount),0);
  const buyInTotal=tournaments.reduce((sum,session)=>sum+num(session.buyIn)+num(session.reentry),0);
  const costTotal=tournaments.reduce((sum,session)=>sum+num(session.costLocal)*num(session.fxRate),0);
  const profit=tournaments.reduce((sum,session)=>sum+sessionProfitBase(session),0);
  const itm=tournaments.filter(session=>num(session.prize)>0).length;
  const finalTables=tournaments.filter(session=>num(session.place)>0&&num(session.place)<=9).length;
  const wins=tournaments.filter(session=>num(session.place)===1).length;
  const reentered=tournaments.filter(session=>num(session.reentryCount)>0).length;
  const fieldValues=tournaments.map(session=>num(session.field)).filter(Boolean);
  return {
    tournaments,events,entries,profit,
    roi:costTotal?profit/costTotal*100:0,
    itmRate:events?itm/events*100:0,
    finalTableRate:events?finalTables/events*100:0,
    wins,
    abi:entries?buyInTotal/entries:0,
    reentryRate:events?reentered/events*100:0,
    averageField:fieldValues.length?fieldValues.reduce((sum,value)=>sum+value,0)/fieldValues.length:0
  };
}
function performanceStats(list){
  const profit=list.reduce((sum,session)=>sum+sessionProfitBase(session),0);
  const hours=list.reduce((sum,session)=>sum+num(session.hours),0);
  const expenses=list.reduce((sum,session)=>sum+sessionExpenseBase(session),0);
  const cash=list.filter(session=>session.type==='cash');
  const cashHours=cash.reduce((sum,session)=>sum+num(session.hours),0);
  const cashProfit=cash.reduce((sum,session)=>sum+sessionProfitBase(session),0);
  return {
    list,profit,hours,expenses,
    winRate:sessionWinRate(list),
    cashHourly:cashHours?cashProfit/cashHours:0,
    drawdown:sessionDrawdown(list),
    tournament:tournamentStats(list)
  };
}
