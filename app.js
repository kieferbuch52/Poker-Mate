'use strict';

const STORAGE_KEY = 'pokerMateDataV1';
const ranks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];

const powerMatrix = [
  [80,80,80,80,80,50,37,32,28,31,27,26,24],
  [80,80,80,75,66,44,17,15,14,13,11,10,9],
  [80,48,80,75,58,38,16,11,10,8,8,8,8],
  [50,31,26,80,58,39,21,12,7,7,7,7,5],
  [36,19,17,22,80,43,26,15,10,9,7,5,4],
  [27,12,9,9,11,80,31,17,10,9,3,3,1],
  [24,10,8,8,10,10,66,19,15,10,5,1,1],
  [22,9,6,5,6,7,10,58,15,10,9,1,1],
  [18,9,6,4,3,3,4,7,51,11,10,4,1],
  [21,9,6,4,1,1,1,1,1,44,11,8,1],
  [18,8,5,3,1,1,1,1,1,1,39,6,1],
  [16,8,5,3,1,1,1,1,1,1,1,33,1],
  [15,7,4,3,1,1,1,1,1,1,1,1,28]
];

const ranges = {
  UTG: new Set(['55','66','77','88','99','TT','JJ','QQ','KK','AA','A8s','A9s','ATs','AJs','AQs','AKs','AJo','AQo','AKo','KTs','KJs','KQs','KQo','QTs','QJs','JTs','T9s','98s']),
  HJ: new Set(['44','55','66','77','88','99','TT','JJ','QQ','KK','AA','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','ATo','AJo','AQo','AKo','K9s','KTs','KJs','KQs','KJo','KQo','Q9s','QTs','QJs','QJo','J9s','JTs','T8s','T9s','98s','87s']),
  CO: new Set(['22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','A8o','A9o','ATo','AJo','AQo','AKo','K7s','K8s','K9s','KTs','KJs','KQs','KTo','KJo','KQo','Q8s','Q9s','QTs','QJs','QTo','QJo','J8s','J9s','JTs','JTo','T8s','T9s','97s','98s','87s','76s','65s','54s']),
  BTN: new Set(['22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','K7o','K8o','K9o','KTo','KJo','KQo','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','Q9o','QTo','QJo','J6s','J7s','J8s','J9s','JTs','J9o','JTo','T6s','T7s','T8s','T9s','T9o','96s','97s','98s','98o','86s','87s','75s','76s','65s','54s']),
  SB: new Set(['22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','K8o','K9o','KTo','KJo','KQo','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','Q9o','QTo','QJo','J7s','J8s','J9s','JTs','J9o','JTo','T7s','T8s','T9s','T9o','97s','98s','87s','76s','65s','54s'])
};

let state = loadState();
let currentSessionType = 'cash';
let currentRangePosition = 'UTG';
let selectedPnHand = 'ATo';
let deferredInstallPrompt = null;

function initialState(){
  return {
    version:1,
    settings:{baseCurrency:'JPY',lossLimit:0},
    venues:[],
    sessions:[],
    hands:[]
  };
}

function loadState(){
  try{
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed && parsed.version ? {...initialState(),...parsed,settings:{...initialState().settings,...parsed.settings}} : initialState();
  }catch(e){ return initialState(); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
function uid(){ return `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function num(v){ const n=Number(v); return Number.isFinite(n)?n:0; }
function today(){ return new Date().toISOString().slice(0,10); }
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
function pct(n){ return `${num(n).toFixed(1)}%`; }
function venueById(id){ return state.venues.find(v=>v.id===id); }
function sessionProfitLocal(s){ return num(s.profitLocal); }
function sessionProfitBase(s){ return num(s.profitBase); }
function showToast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(showToast.t); showToast.t=setTimeout(()=>el.classList.remove('show'),1800);
}

function go(pageId){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===pageId));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.go===pageId));
  window.scrollTo({top:0,behavior:'smooth'});
  if(pageId==='home') renderHome();
  if(pageId==='sessions') renderSessions();
  if(pageId==='venues') renderVenues();
  if(pageId==='ranges') renderRangeGrid();
  if(pageId==='tools'){ renderOdds(); renderPower(); }
  if(pageId==='more'){ renderHands(); renderSettings(); }
}
document.addEventListener('click',e=>{
  const target=e.target.closest('[data-go]');
  if(target) go(target.dataset.go);
});

function renderHome(){
  const total=state.sessions.reduce((a,s)=>a+sessionProfitBase(s),0);
  const cash=state.sessions.filter(s=>s.type==='cash');
  const tourn=state.sessions.filter(s=>s.type==='tournament');
  const cashHours=cash.reduce((a,s)=>a+num(s.hours),0);
  const cashProfit=cash.reduce((a,s)=>a+sessionProfitBase(s),0);
  const tournamentCost=tourn.reduce((a,s)=>a+num(s.costLocal)*num(s.fxRate),0);
  const tournamentProfit=tourn.reduce((a,s)=>a+sessionProfitBase(s),0);
  document.getElementById('heroProfit').textContent=signed(total,state.settings.baseCurrency);
  document.getElementById('heroProfit').className=`hero-number ${total>=0?'positive':'negative'}`;
  document.getElementById('heroSub').textContent=state.sessions.length?`${state.sessions.length}セッションを記録`:'まだセッションがありません';
  document.getElementById('homeStats').innerHTML=`
    <div class="stat-card"><strong>${state.sessions.length}</strong><span>総セッション</span></div>
    <div class="stat-card"><strong>${cashHours?fmt(cashProfit/cashHours,state.settings.baseCurrency):'—'}</strong><span>リング時給</span></div>
    <div class="stat-card"><strong>${tournamentCost?pct(tournamentProfit/tournamentCost*100):'—'}</strong><span>MTT ROI</span></div>`;
  const recent=[...state.sessions].sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt).slice(0,4);
  const wrap=document.getElementById('recentSessions');
  wrap.innerHTML=recent.length?recent.map(sessionCardHtml).join(''):'<p class="empty muted">まだ記録がありません。</p>';
  drawProfitChart();
  updateLossLimitStatus();
}
function drawProfitChart(){
  const filter=document.getElementById('graphFilter').value;
  const sessions=[...state.sessions].filter(s=>filter==='all'||s.type===filter).sort((a,b)=>a.date.localeCompare(b.date)||a.createdAt-b.createdAt);
  const canvas=document.getElementById('profitChart');
  const empty=document.getElementById('chartEmpty');
  if(!sessions.length){ canvas.classList.add('hidden');empty.classList.remove('hidden');return; }
  canvas.classList.remove('hidden');empty.classList.add('hidden');
  const rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
  canvas.width=Math.max(320,rect.width*dpr);canvas.height=230*dpr;
  const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  const w=canvas.width/dpr,h=230,pad={l:48,r:14,t:18,b:30};
  let cum=0;const data=sessions.map(s=>({date:s.date,value:(cum+=sessionProfitBase(s))}));
  const values=[0,...data.map(d=>d.value)],min=Math.min(...values),max=Math.max(...values);
  const range=Math.max(1,max-min),x=i=>pad.l+(data.length===1?0:(w-pad.l-pad.r)*i/(data.length-1));
  const y=v=>pad.t+(h-pad.t-pad.b)*(max-v)/range;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;ctx.font='11px system-ui';ctx.fillStyle='#8faea2';
  for(let i=0;i<5;i++){
    const val=max-range*i/4,yy=y(val);ctx.beginPath();ctx.moveTo(pad.l,yy);ctx.lineTo(w-pad.r,yy);ctx.stroke();
    ctx.fillText(compactNumber(val),4,yy+4);
  }
  if(min<0&&max>0){ctx.strokeStyle='rgba(255,255,255,.26)';ctx.beginPath();ctx.moveTo(pad.l,y(0));ctx.lineTo(w-pad.r,y(0));ctx.stroke();}
  ctx.strokeStyle='#4be3a4';ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();
  data.forEach((d,i)=>{const xx=x(i),yy=y(d.value);i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)});ctx.stroke();
  ctx.lineTo(x(data.length-1),h-pad.b);ctx.lineTo(x(0),h-pad.b);ctx.closePath();
  const grad=ctx.createLinearGradient(0,pad.t,0,h-pad.b);grad.addColorStop(0,'rgba(75,227,164,.22)');grad.addColorStop(1,'rgba(75,227,164,0)');
  ctx.fillStyle=grad;ctx.fill();
  ctx.fillStyle='#a7c0b7';
  const first=data[0].date.slice(5).replace('-','/'),last=data[data.length-1].date.slice(5).replace('-','/');
  ctx.fillText(first,pad.l,h-8);ctx.textAlign='right';ctx.fillText(last,w-pad.r,h-8);ctx.textAlign='left';
}
function compactNumber(n){
  const a=Math.abs(n);if(a>=1000000)return `${(n/1000000).toFixed(1)}M`;if(a>=1000)return `${(n/1000).toFixed(1)}k`;return Math.round(n).toString();
}
window.addEventListener('resize',()=>{if(document.getElementById('home').classList.contains('active'))drawProfitChart()});
document.getElementById('graphFilter').addEventListener('change',drawProfitChart);

function setSessionType(type){
  currentSessionType=type;
  document.querySelectorAll('[data-session-type]').forEach(b=>b.classList.toggle('active',b.dataset.sessionType===type));
  document.getElementById('cashFields').classList.toggle('hidden',type!=='cash');
  document.getElementById('tournamentFields').classList.toggle('hidden',type!=='tournament');
  document.getElementById('cashBuyIn').required=type==='cash';
  document.getElementById('cashOut').required=type==='cash';
  document.getElementById('reflectChips').checked=type==='cash';
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

function calculateFormProfit(){
  const expenses=num(document.getElementById('sessionExpenses').value);
  if(currentSessionType==='cash'){
    const buyIn=num(document.getElementById('cashBuyIn').value),cashOut=num(document.getElementById('cashOut').value);
    return {profit:cashOut-buyIn-expenses,cost:buyIn+expenses,chipDelta:cashOut-buyIn};
  }
  const buyIn=num(document.getElementById('tournamentBuyIn').value),reentry=num(document.getElementById('tournamentReentry').value),prize=num(document.getElementById('tournamentPrize').value);
  return {profit:prize-buyIn-reentry-expenses,cost:buyIn+reentry+expenses,chipDelta:prize-buyIn-reentry};
}
function updateSessionPreview(){
  const c=calculateFormProfit(),fx=num(document.getElementById('sessionFx').value)||1;
  const venue=venueById(document.getElementById('sessionVenue').value),currency=venue?.currency||'LOCAL';
  const el=document.getElementById('sessionPreview');
  el.innerHTML=`現地収支：<strong class="${c.profit>=0?'positive':'negative'}">${signed(c.profit,currency)}</strong><br>基準通貨：<strong>${signed(c.profit*fx,state.settings.baseCurrency)}</strong>`;
}
['cashBuyIn','cashOut','sessionExpenses','tournamentBuyIn','tournamentReentry','tournamentPrize','sessionFx'].forEach(id=>document.getElementById(id).addEventListener('input',updateSessionPreview));

function resetSessionForm(){
  document.getElementById('sessionForm').reset();
  document.getElementById('sessionId').value='';
  document.getElementById('sessionDate').value=today();
  document.getElementById('sessionExpenses').value=0;
  document.getElementById('tournamentReentry').value=0;
  document.getElementById('tournamentPrize').value=0;
  document.getElementById('cancelEditBtn').classList.add('hidden');
  document.getElementById('sessionSubmit').textContent='セッションを保存';
  setSessionType('cash');renderVenueOptions();updateSessionPreview();
}
document.getElementById('cancelEditBtn').addEventListener('click',resetSessionForm);

document.getElementById('sessionForm').addEventListener('submit',e=>{
  e.preventDefault();
  const editingId=document.getElementById('sessionId').value;
  const old=editingId?state.sessions.find(s=>s.id===editingId):null;
  if(old&&old.reflected&&old.venueId){
    const oldVenue=venueById(old.venueId);if(oldVenue)oldVenue.chipBalance=num(oldVenue.chipBalance)-num(old.chipDelta);
  }
  const calc=calculateFormProfit(),venueId=document.getElementById('sessionVenue').value;
  const fx=num(document.getElementById('sessionFx').value)||1;
  const reflected=document.getElementById('reflectChips').checked&&!!venueId;
  const session={
    id:editingId||uid(),type:currentSessionType,date:document.getElementById('sessionDate').value,
    venueId,fxRate:fx,expenses:num(document.getElementById('sessionExpenses').value),
    notes:document.getElementById('sessionNotes').value.trim(),profitLocal:calc.profit,
    profitBase:calc.profit*fx,costLocal:calc.cost,chipDelta:reflected?calc.chipDelta:0,reflected,
    createdAt:old?.createdAt||Date.now(),
    hours:currentSessionType==='cash'?num(document.getElementById('cashHours').value):num(document.getElementById('tournamentHours').value),
    stakes:currentSessionType==='cash'?document.getElementById('cashStakes').value.trim():'',
    buyIn:currentSessionType==='cash'?num(document.getElementById('cashBuyIn').value):num(document.getElementById('tournamentBuyIn').value),
    cashOut:currentSessionType==='cash'?num(document.getElementById('cashOut').value):0,
    tournamentName:currentSessionType==='tournament'?document.getElementById('tournamentName').value.trim():'',
    field:currentSessionType==='tournament'?num(document.getElementById('tournamentField').value):0,
    place:currentSessionType==='tournament'?num(document.getElementById('tournamentPlace').value):0,
    reentry:currentSessionType==='tournament'?num(document.getElementById('tournamentReentry').value):0,
    prize:currentSessionType==='tournament'?num(document.getElementById('tournamentPrize').value):0
  };
  if(reflected){
    const v=venueById(venueId);if(v)v.chipBalance=num(v.chipBalance)+session.chipDelta;
  }
  if(editingId)state.sessions=state.sessions.map(s=>s.id===editingId?session:s);else state.sessions.push(session);
  saveState();resetSessionForm();renderSessions();showToast(editingId?'更新しました':'保存しました');
});

function sessionCardHtml(s){
  const v=venueById(s.venueId),currency=v?.currency||'LOCAL';
  const title=s.type==='cash'?(s.stakes||'リング'):(s.tournamentName||'トーナメント');
  const detail=s.type==='cash'?`${num(s.hours).toFixed(1)}h・Buy ${fmt(s.buyIn,currency)} → ${fmt(s.cashOut,currency)}`:
    `${s.place?`${s.place}位`:'順位未入力'}${s.field?` / ${s.field}人`:''}・費用 ${fmt(s.costLocal,currency)}`;
  return `<article class="log-card">
    <div class="log-top"><div><strong>${esc(title)}</strong><div class="log-meta">${esc(s.date)}・${esc(v?.name||'店舗未登録')}<br>${esc(detail)}</div></div>
    <div class="log-profit ${s.profitLocal>=0?'positive':'negative'}">${signed(s.profitLocal,currency)}</div></div>
    ${s.notes?`<p class="log-note">${esc(s.notes)}</p>`:''}
    <div class="log-actions"><button class="mini-btn" data-edit-session="${s.id}">編集</button><button class="mini-btn delete" data-delete-session="${s.id}">削除</button></div>
  </article>`;
}
function renderSessions(){
  renderVenueOptions();
  const filter=document.getElementById('sessionListFilter').value;
  const list=[...state.sessions].filter(s=>filter==='all'||s.type===filter).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt);
  document.getElementById('sessionList').innerHTML=list.length?list.map(sessionCardHtml).join(''):'<p class="empty muted">まだ記録がありません。</p>';
}
document.getElementById('sessionListFilter').addEventListener('change',renderSessions);
document.getElementById('sessionList').addEventListener('click',e=>{
  const edit=e.target.closest('[data-edit-session]'),del=e.target.closest('[data-delete-session]');
  if(edit) editSession(edit.dataset.editSession);
  if(del) deleteSession(del.dataset.deleteSession);
});
function editSession(id){
  const s=state.sessions.find(x=>x.id===id);if(!s)return;
  setSessionType(s.type);
  document.getElementById('sessionId').value=s.id;document.getElementById('sessionDate').value=s.date;
  document.getElementById('sessionVenue').value=s.venueId||'';document.getElementById('sessionFx').value=s.fxRate||1;
  document.getElementById('sessionExpenses').value=s.expenses||0;document.getElementById('sessionNotes').value=s.notes||'';
  document.getElementById('reflectChips').checked=!!s.reflected;
  if(s.type==='cash'){
    document.getElementById('cashStakes').value=s.stakes||'';document.getElementById('cashHours').value=s.hours||'';
    document.getElementById('cashBuyIn').value=s.buyIn||0;document.getElementById('cashOut').value=s.cashOut||0;
  }else{
    document.getElementById('tournamentName').value=s.tournamentName||'';document.getElementById('tournamentField').value=s.field||'';
    document.getElementById('tournamentPlace').value=s.place||'';document.getElementById('tournamentHours').value=s.hours||'';
    document.getElementById('tournamentBuyIn').value=s.buyIn||0;document.getElementById('tournamentReentry').value=s.reentry||0;document.getElementById('tournamentPrize').value=s.prize||0;
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
  if(s.reflected&&s.venueId){const v=venueById(s.venueId);if(v)v.chipBalance=num(v.chipBalance)-num(s.chipDelta);}
  state.sessions=state.sessions.filter(x=>x.id!==id);saveState();renderSessions();showToast('削除しました');
}

document.getElementById('venueForm').addEventListener('submit',e=>{
  e.preventDefault();
  const id=document.getElementById('venueId').value;
  const old=id?venueById(id):null;
  const venue={
    id:id||uid(),name:document.getElementById('venueName').value.trim(),
    currency:(document.getElementById('venueCurrency').value.trim()||'JPY').toUpperCase(),
    chipBalance:num(document.getElementById('venueBalance').value),
    fxRate:num(document.getElementById('venueFx').value)||1,
    notes:document.getElementById('venueNotes').value.trim()
  };
  if(old)state.venues=state.venues.map(v=>v.id===id?venue:v);else state.venues.push(venue);
  saveState();resetVenueForm();renderVenues();showToast(id?'店舗を更新しました':'店舗を追加しました');
});
function resetVenueForm(){
  document.getElementById('venueForm').reset();document.getElementById('venueId').value='';
  document.getElementById('venueCurrency').value='JPY';document.getElementById('venueBalance').value=0;document.getElementById('venueFx').value=1;
}
function renderVenues(){
  const wrap=document.getElementById('venueList');
  wrap.innerHTML=state.venues.length?state.venues.map(v=>{
    const sessions=state.sessions.filter(s=>s.venueId===v.id),profit=sessions.reduce((a,s)=>a+sessionProfitLocal(s),0);
    const cash=sessions.filter(s=>s.type==='cash'),hours=cash.reduce((a,s)=>a+num(s.hours),0);
    return `<article class="log-card venue-card">
      <div class="log-top"><div><strong>${esc(v.name)}</strong><div class="log-meta">${esc(v.currency)}・換算 ${num(v.fxRate)} ${esc(state.settings.baseCurrency)}</div></div>
      <div class="log-profit ${profit>=0?'positive':'negative'}">${signed(profit,v.currency)}</div></div>
      <div class="balance">${fmt(v.chipBalance,v.currency)}</div><div class="log-meta">現在のチップ残高（約 ${fmt(v.chipBalance*v.fxRate,state.settings.baseCurrency)}）</div>
      <div class="venue-stats"><div><strong>${sessions.length}</strong><span>セッション</span></div><div><strong>${hours?fmt(cash.reduce((a,s)=>a+sessionProfitLocal(s),0)/hours,v.currency):'—'}</strong><span>リング時給</span></div><div><strong>${sessions.filter(s=>s.type==='tournament').length}</strong><span>MTT回数</span></div></div>
      ${v.notes?`<p class="log-note">${esc(v.notes)}</p>`:''}
      <div class="log-actions"><button class="mini-btn" data-edit-venue="${v.id}">編集</button><button class="mini-btn delete" data-delete-venue="${v.id}">削除</button></div>
    </article>`;
  }).join(''):'<p class="empty muted">店舗を登録すると、店舗別成績とチップ残高を管理できます。</p>';
}
document.getElementById('venueList').addEventListener('click',e=>{
  const edit=e.target.closest('[data-edit-venue]'),del=e.target.closest('[data-delete-venue]');
  if(edit){
    const v=venueById(edit.dataset.editVenue);if(!v)return;
    document.getElementById('venueId').value=v.id;document.getElementById('venueName').value=v.name;document.getElementById('venueCurrency').value=v.currency;
    document.getElementById('venueBalance').value=v.chipBalance;document.getElementById('venueFx').value=v.fxRate;document.getElementById('venueNotes').value=v.notes||'';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  if(del){
    const id=del.dataset.deleteVenue;if(state.sessions.some(s=>s.venueId===id)){alert('この店舗にはセッション履歴があります。先にセッション側の店舗を変更または削除してください。');return;}
    if(confirm('この店舗を削除しますか？')){state.venues=state.venues.filter(v=>v.id!==id);saveState();renderVenues();}
  }
});

function handLabel(row,col){
  if(row===col)return ranks[row]+ranks[col];
  return row<col?`${ranks[row]}${ranks[col]}s`:`${ranks[col]}${ranks[row]}o`;
}
function renderRangeGrid(){
  document.querySelectorAll('[data-position]').forEach(b=>b.classList.toggle('active',b.dataset.position===currentRangePosition));
  const set=ranges[currentRangePosition];
  document.getElementById('rangeGrid').innerHTML=ranks.flatMap((_,r)=>ranks.map((__,c)=>{
    const hand=handLabel(r,c);return `<button class="hand-cell ${set.has(hand)?'open':''}" title="${hand}">${hand}</button>`;
  })).join('');
}
document.querySelectorAll('[data-position]').forEach(b=>b.addEventListener('click',()=>{currentRangePosition=b.dataset.position;renderRangeGrid()}));

function setTool(tool){
  document.querySelectorAll('[data-tool]').forEach(b=>b.classList.toggle('active',b.dataset.tool===tool));
  document.getElementById('oddsTool').classList.toggle('hidden',tool!=='odds');
  document.getElementById('powerTool').classList.toggle('hidden',tool!=='power');
}
document.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>setTool(b.dataset.tool)));

function renderOdds(){
  const pot=num(document.getElementById('oddsPot').value),bet=num(document.getElementById('oddsBet').value),call=num(document.getElementById('oddsCall').value);
  const finalPot=pot+bet+call,need=finalPot?call/finalPot*100:0;
  const bluff=pot+bet?bet/(pot+bet)*100:0,mdf=pot+bet?pot/(pot+bet)*100:0;
  document.getElementById('oddsResult').innerHTML=`必要勝率 <strong>${pct(need)}</strong><br><span class="muted">最終ポット ${finalPot.toLocaleString()} に対して ${call.toLocaleString()} をコール。相手がこのサイズをブラフする損益分岐点は ${pct(bluff)}、理論上のMDFは ${pct(mdf)}。</span>`;
}
['oddsPot','oddsBet','oddsCall'].forEach(id=>document.getElementById(id).addEventListener('input',renderOdds));
document.querySelectorAll('[data-pot-fraction]').forEach(b=>b.addEventListener('click',()=>{
  const pot=num(document.getElementById('oddsPot').value),bet=Math.round(pot*num(b.dataset.potFraction)*100)/100;
  document.getElementById('oddsBet').value=bet;document.getElementById('oddsCall').value=bet;renderOdds();
}));

function buildPnHandSelect(){
  const select=document.getElementById('pnHand');
  select.innerHTML=ranks.flatMap((_,r)=>ranks.map((__,c)=>handLabel(r,c))).map(h=>`<option value="${h}">${h}</option>`).join('');
  select.value=selectedPnHand;
}
function pnForHand(hand){
  for(let r=0;r<13;r++)for(let c=0;c<13;c++)if(handLabel(r,c)===hand)return powerMatrix[r][c];
  return 1;
}
function renderPower(){
  const stack=num(document.getElementById('pnStack').value),cpr=num(document.getElementById('pnSb').value)+num(document.getElementById('pnBb').value)+num(document.getElementById('pnAnteTotal').value);
  const behind=Math.max(1,num(document.getElementById('pnBehind').value)),m=cpr?stack/cpr:0,required=m*behind,pn=pnForHand(selectedPnHand);
  const ok=pn>=required;
  document.getElementById('pnResult').innerHTML=`M値 <strong>${m.toFixed(2)}</strong>・必要PN <strong>${required.toFixed(1)}</strong><br>
    ${selectedPnHand} のPNは <strong>${pn>=80?'75+':pn}</strong>：
    <span class="${ok?'positive':'negative'}">${ok?'数式上はプッシュ候補':'数式上はフォールド寄り'}</span>`;
  document.getElementById('pnGrid').innerHTML=ranks.flatMap((_,r)=>ranks.map((__,c)=>{
    const hand=handLabel(r,c),val=powerMatrix[r][c],klass=val>=35?'pn-high':val>=20?'pn-mid':'pn-low';
    return `<button class="hand-cell ${klass} ${hand===selectedPnHand?'selected':''}" data-pn-hand="${hand}" title="${hand}: ${val>=80?'75+':val}">${hand}<small>${val>=80?'75+':val<2?'–':val}</small></button>`;
  })).join('');
}
['pnStack','pnSb','pnBb','pnAnteTotal','pnBehind'].forEach(id=>document.getElementById(id).addEventListener('input',renderPower));
document.getElementById('pnHand').addEventListener('change',e=>{selectedPnHand=e.target.value;renderPower()});
document.getElementById('pnGrid').addEventListener('click',e=>{
  const b=e.target.closest('[data-pn-hand]');if(!b)return;selectedPnHand=b.dataset.pnHand;document.getElementById('pnHand').value=selectedPnHand;renderPower();
});

document.getElementById('handForm').addEventListener('submit',e=>{
  e.preventDefault();
  state.hands.push({id:uid(),date:document.getElementById('handDate').value,cards:document.getElementById('handCards').value.trim(),position:document.getElementById('handPosition').value,tag:document.getElementById('handTag').value,action:document.getElementById('handAction').value.trim(),conclusion:document.getElementById('handConclusion').value.trim(),createdAt:Date.now()});
  saveState();e.target.reset();document.getElementById('handDate').value=today();renderHands();showToast('ハンドメモを保存しました');
});
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

function renderSettings(){
  document.getElementById('baseCurrency').value=state.settings.baseCurrency||'JPY';
  document.getElementById('lossLimit').value=state.settings.lossLimit||0;updateLossLimitStatus();
}
document.getElementById('saveSettingsBtn').addEventListener('click',()=>{
  state.settings.baseCurrency=(document.getElementById('baseCurrency').value.trim()||'JPY').toUpperCase();
  state.settings.lossLimit=num(document.getElementById('lossLimit').value);saveState();renderSettings();showToast('設定を保存しました');
});
function updateLossLimitStatus(){
  const limit=num(state.settings.lossLimit),todayProfit=state.sessions.filter(s=>s.date===today()).reduce((a,s)=>a+sessionProfitBase(s),0);
  const el=document.getElementById('lossLimitStatus');if(!el)return;
  if(!limit){el.textContent='0の場合、損失上限の警告は表示しません。';return;}
  el.textContent=todayProfit<=-limit?`本日の収支は ${signed(todayProfit,state.settings.baseCurrency)}。設定した損失上限に到達しています。`:`本日の収支 ${signed(todayProfit,state.settings.baseCurrency)}／損失上限 ${fmt(limit,state.settings.baseCurrency)}`;
  el.className=`hint ${todayProfit<=-limit?'negative':''}`;
}

function downloadBlob(filename,content,type){
  const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
document.getElementById('exportJsonBtn').addEventListener('click',()=>downloadBlob(`poker-mate-backup-${today()}.json`,JSON.stringify(state,null,2),'application/json'));
document.getElementById('exportCsvBtn').addEventListener('click',()=>{
  const header=['date','type','venue','currency','stakes_or_tournament','hours','profit_local','fx_rate','profit_base','notes'];
  const rows=state.sessions.map(s=>{
    const v=venueById(s.venueId);return [s.date,s.type,v?.name||'',v?.currency||'',s.type==='cash'?s.stakes:s.tournamentName,s.hours,s.profitLocal,s.fxRate,s.profitBase,s.notes];
  });
  const csv=[header,...rows].map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
  downloadBlob(`poker-mate-sessions-${today()}.csv`,`\uFEFF${csv}`,'text/csv;charset=utf-8');
});
document.getElementById('importBtn').addEventListener('click',()=>document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change',async e=>{
  const file=e.target.files[0];if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    if(data.version&&Array.isArray(data.sessions)){state={...initialState(),...data,settings:{...initialState().settings,...data.settings}};}
    else if(Array.isArray(data.sessions)){
      const importedVenue={id:uid(),name:'旧アプリ取込',currency:'PHP',chipBalance:0,fxRate:1,notes:''};
      state=initialState();state.venues.push(importedVenue);
      state.sessions=data.sessions.map(s=>({id:uid(),type:'cash',date:s.date||today(),venueId:importedVenue.id,fxRate:1,expenses:0,notes:s.notes||'',profitLocal:num(s.profit),profitBase:num(s.profit),costLocal:0,chipDelta:0,reflected:false,createdAt:Date.now(),hours:num(s.hours),stakes:s.stakes||'',buyIn:0,cashOut:num(s.profit),tournamentName:'',field:0,place:0,reentry:0,prize:0}));
    }else throw new Error('形式不明');
    saveState();renderAll();showToast('バックアップを読み込みました');
  }catch(err){alert('読み込みに失敗しました。Poker MateのJSONバックアップを選んでください。');}
  e.target.value='';
});
document.getElementById('resetBtn').addEventListener('click',()=>{
  if(confirm('すべての店舗・収支・ハンドメモを削除します。元に戻せません。')){state=initialState();saveState();renderAll();resetSessionForm();resetVenueForm();showToast('全データを削除しました');}
});

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;document.getElementById('installBtn').classList.remove('hidden')});
document.getElementById('installBtn').addEventListener('click',async()=>{
  if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;document.getElementById('installBtn').classList.add('hidden');
});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}

function renderAll(){
  renderHome();renderSessions();renderVenues();renderRangeGrid();renderOdds();renderPower();renderHands();renderSettings();
}
document.getElementById('sessionDate').value=today();document.getElementById('handDate').value=today();
buildPnHandSelect();resetSessionForm();renderAll();
