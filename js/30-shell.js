'use strict';

/** Poker Mate v9.0.0 — 30-shell.js */
const PAGE_META={
  home:{eyebrow:'POKER MATE',title:'ホーム'},
  sessions:{eyebrow:'SESSION LOG',title:'収支を記録'},
  venues:{eyebrow:'VENUES & CHIPS',title:'店舗・チップ'},
  ranges:{eyebrow:'PREFLOP RANGE',title:'レンジ'},
  tools:{eyebrow:'POKER TOOLS',title:'計算ツール'},
  more:{eyebrow:'REVIEW & DATA',title:'管理'}
};
function applyUiPreferences(){
  document.body.dataset.density=uiState.uiDensity||'standard';
  document.body.dataset.motion=uiState.uiMotion||'standard';
  document.body.classList.toggle('sticky-controls-disabled',uiState.uiStickyControls===false);
  if(document.getElementById('uiDensity'))document.getElementById('uiDensity').value=uiState.uiDensity||'standard';
  if(document.getElementById('uiMotion'))document.getElementById('uiMotion').value=uiState.uiMotion||'standard';
  if(document.getElementById('uiStickyControls'))document.getElementById('uiStickyControls').checked=uiState.uiStickyControls!==false;
}
function updateTopbarContext(pageId){
  const meta=PAGE_META[pageId]||PAGE_META.home;
  document.getElementById('activePageEyebrow').textContent=meta.eyebrow;
  document.getElementById('activePageTitle').textContent=meta.title;
}

function showToast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(showToast.t); showToast.t=setTimeout(()=>el.classList.remove('show'),1800);
}

function go(pageId){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===pageId));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.go===pageId));
  document.body.dataset.page=pageId;
  updateTopbarContext(pageId);
  window.scrollTo({top:0,behavior:document.body.dataset.motion==='reduced'?'auto':'smooth'});
  if(pageId==='home')renderHome();
  if(pageId==='sessions')renderSessions();
  if(pageId==='venues'){renderVenues();setVenueView(uiState.venueView||'list',false);}
  if(pageId==='ranges')renderRangeGrid();
  if(pageId==='tools'){
    renderOdds();renderRaiseOdds();renderDraw();renderPower();
    setTool(uiState.lastTool==='raise'?'odds':(uiState.lastTool||'odds'),false);
  }
  if(pageId==='more'){
    renderHands();renderBankroll();renderSettings();
    setMoreView(uiState.moreView||'review',false);
  }
}
document.addEventListener('click',e=>{
  const accountTarget=e.target.closest('[data-open-account]');
  if(accountTarget){
    go('more');setMoreView('settings');
    setTimeout(()=>document.getElementById('accountSettingsPanel')?.scrollIntoView({behavior:document.body.dataset.motion==='reduced'?'auto':'smooth',block:'start'}),80);
    return;
  }
  const target=e.target.closest('[data-go]');
  if(target) go(target.dataset.go);
});


function setVenueView(view,save=true){
  const resolved=view==='chips'?'chips':'list';
  document.querySelectorAll('[data-venue-view]').forEach(button=>{
    button.classList.toggle('active',button.dataset.venueView===resolved);
  });
  document.querySelectorAll('[data-venue-section]').forEach(section=>{
    section.classList.toggle('hidden',section.dataset.venueSection!==resolved);
  });
  if(save)updateUiState({venueView:resolved});
}
document.querySelectorAll('[data-venue-view]').forEach(button=>{
  button.addEventListener('click',()=>setVenueView(button.dataset.venueView));
});

function setMoreView(view,save=true){
  const allowed=['review','bankroll','settings'];
  const resolved=allowed.includes(view)?view:'review';
  document.querySelectorAll('[data-more-view]').forEach(button=>{
    button.classList.toggle('active',button.dataset.moreView===resolved);
  });
  document.querySelectorAll('[data-more-section]').forEach(section=>{
    section.classList.toggle('hidden',section.dataset.moreSection!==resolved);
  });
  if(save)updateUiState({moreView:resolved});
}
document.querySelectorAll('[data-more-view]').forEach(button=>{
  button.addEventListener('click',()=>setMoreView(button.dataset.moreView));
});

function renderHome(){
  const total=state.sessions.reduce((a,s)=>a+sessionProfitBase(s),0);
  const cash=state.sessions.filter(s=>s.type==='cash');
  const tourn=state.sessions.filter(s=>s.type==='tournament');
  const cashHours=cash.reduce((a,s)=>a+num(s.hours),0);
  const cashProfit=cash.reduce((a,s)=>a+sessionProfitBase(s),0);
  const tournamentCost=tourn.reduce((a,s)=>a+num(s.costLocal)*num(s.fxRate),0);
  const tournamentProfit=tourn.reduce((a,s)=>a+sessionProfitBase(s),0);
  const monthKey=today().slice(0,7);
  const monthSessions=state.sessions.filter(s=>String(s.date||'').startsWith(monthKey));
  const monthProfit=monthSessions.reduce((sum,s)=>sum+sessionProfitBase(s),0);
  const chipValue=state.venues.reduce((sum,venue)=>sum+venueChipValueBase(venue),0);
  const bankroll=currentBankroll();
  const venuePerformance=state.venues.map(venue=>({
    venue,
    profit:state.sessions.filter(s=>s.venueId===venue.id).reduce((sum,s)=>sum+sessionProfitBase(s),0)
  })).sort((a,b)=>b.profit-a.profit);
  const bestVenue=venuePerformance.find(item=>state.sessions.some(s=>s.venueId===item.venue.id));
  const drawdown=sessionDrawdown();

  document.getElementById('heroProfit').textContent=signed(total,state.settings.baseCurrency);
  document.getElementById('heroProfit').className=`hero-number ${total>=0?'positive':'negative'}`;
  document.getElementById('heroSub').textContent=state.sessions.length?`${state.sessions.length}セッションを記録`:'まだセッションがありません';
  document.getElementById('heroMeta').innerHTML=`
    <span class="${monthProfit>=0?'positive':'negative'}">今月 ${signed(monthProfit,state.settings.baseCurrency)}</span>
    <span>資金 ${fmt(bankroll,state.settings.baseCurrency)}</span>`;

  document.getElementById('homeStats').innerHTML=`
    <div class="stat-card"><strong>${state.sessions.length}</strong><span>総セッション</span></div>
    <div class="stat-card"><strong>${cashHours?fmt(cashProfit/cashHours,state.settings.baseCurrency):'—'}</strong><span>リング時給</span></div>
    <div class="stat-card"><strong>${tournamentCost?pct(tournamentProfit/tournamentCost*100):'—'}</strong><span>MTT ROI</span></div>`;

  document.getElementById('homeInsights').innerHTML=`
    <article class="insight-card"><span>現在のバンクロール</span><strong class="${bankroll>=0?'positive':'negative'}">${fmt(bankroll,state.settings.baseCurrency)}</strong><small>開始資金・収支・入出金</small></article>
    <article class="insight-card"><span>店舗チップ総額</span><strong>${fmt(chipValue,state.settings.baseCurrency)}</strong><small>総資産の内訳（足し算不要）</small></article>
    <article class="insight-card"><span>今月の収支</span><strong class="${monthProfit>=0?'positive':'negative'}">${signed(monthProfit,state.settings.baseCurrency)}</strong><small>${monthSessions.length}セッション</small></article>
    <article class="insight-card"><span>好成績の店舗</span><strong>${bestVenue?esc(bestVenue.venue.name):'—'}</strong><small>${bestVenue?signed(bestVenue.profit,state.settings.baseCurrency):'データなし'}</small></article>
    <article class="insight-card"><span>ピークからの下落</span><strong class="${drawdown.currentDrawdown?'negative':''}">${drawdown.currentDrawdown?`-${fmt(drawdown.currentDrawdown,state.settings.baseCurrency)}`:fmt(0,state.settings.baseCurrency)}</strong><small>現在のドローダウン</small></article>
    <article class="insight-card"><span>最大ドローダウン</span><strong class="${drawdown.maxDrawdown?'negative':''}">${drawdown.maxDrawdown?`-${fmt(drawdown.maxDrawdown,state.settings.baseCurrency)}`:fmt(0,state.settings.baseCurrency)}</strong><small>全期間の最大下落幅</small></article>`;

  const setupItems=[];
  if(!state.venues.length)setupItems.push({label:'店舗を登録',action:'venue-setup'});
  if(!normalizeRingStakes(state.settings.ringStakes).length)setupItems.push({label:'ステークスを設定',action:'stake-setup'});
  if(!num(state.bankroll.startingAmount))setupItems.push({label:'開始資金を設定',action:'bankroll'});
  const setupCard=document.getElementById('homeSetupCard');
  setupCard.classList.toggle('hidden',setupItems.length===0);
  document.getElementById('homeSetupText').textContent=setupItems.length
    ?`あと${setupItems.length}項目を設定すると、記録がさらにスムーズになります。`
    :'';
  document.getElementById('homeSetupActions').innerHTML=setupItems.map(item=>
    `<button type="button" data-quick-action="${item.action}">${item.label}<span>›</span></button>`
  ).join('');

  const recent=[...state.sessions].sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt).slice(0,4);
  const wrap=document.getElementById('recentSessions');
  wrap.innerHTML=recent.length?recent.map(sessionCardHtml).join(''):'<div class="empty-state"><strong>最初のセッションを記録しましょう</strong><p>ホームの「収支を記録」からすぐ始められます。</p></div>';

  document.getElementById('graphPeriod').value=uiState.graphPeriod||'30';
  renderPerformanceReport();
  drawProfitChart();
  updateLossLimitStatus();
}

function reportPeriodValues(mode){
  const values=new Set(state.sessions.map(session=>mode==='year'?String(session.date||'').slice(0,4):String(session.date||'').slice(0,7)).filter(Boolean));
  const current=mode==='year'?today().slice(0,4):today().slice(0,7);
  values.add(current);
  return [...values].sort().reverse();
}
function reportPeriodLabel(value,mode){
  if(mode==='year')return `${value}年`;
  const [year,month]=value.split('-');
  return `${year}年${Number(month)}月`;
}
function renderReportPeriodOptions(){
  const mode=document.getElementById('reportMode').value||uiState.reportMode||'month';
  const select=document.getElementById('reportPeriod');
  const values=reportPeriodValues(mode);
  const preferred=uiState.reportPeriod&&values.includes(uiState.reportPeriod)
    ?uiState.reportPeriod
    :values[0];
  select.innerHTML=values.map(value=>`<option value="${value}">${reportPeriodLabel(value,mode)}</option>`).join('');
  select.value=preferred;
  updateUiState({reportMode:mode,reportPeriod:preferred});
}
function reportSessionsForSelection(){
  const mode=document.getElementById('reportMode').value;
  const period=document.getElementById('reportPeriod').value;
  return state.sessions.filter(session=>mode==='year'
    ?String(session.date||'').startsWith(period)
    :String(session.date||'').slice(0,7)===period);
}
function renderPerformanceReport(){
  const modeSelect=document.getElementById('reportMode');
  const periodSelect=document.getElementById('reportPeriod');
  if(!modeSelect||!periodSelect)return;
  modeSelect.value=uiState.reportMode||'month';
  renderReportPeriodOptions();
  const list=reportSessionsForSelection();
  const stats=performanceStats(list);
  const mtt=stats.tournament;
  const venueGroups=state.venues.map(venue=>({
    venue,
    sessions:list.filter(session=>session.venueId===venue.id)
  })).filter(group=>group.sessions.length).map(group=>({
    ...group,
    profit:group.sessions.reduce((sum,session)=>sum+sessionProfitBase(session),0)
  })).sort((a,b)=>b.profit-a.profit);
  const bestVenue=venueGroups[0];

  document.getElementById('reportSummary').innerHTML=`
    <article><span>収支</span><strong class="${stats.profit>=0?'positive':'negative'}">${signed(stats.profit,state.settings.baseCurrency)}</strong></article>
    <article><span>セッション</span><strong>${list.length}</strong></article>
    <article><span>プレー時間</span><strong>${stats.hours.toFixed(1)}h</strong></article>
    <article><span>勝ちセッション率</span><strong>${list.length?pct(stats.winRate):'—'}</strong></article>
    <article><span>リング時給</span><strong>${list.some(session=>session.type==='cash')?fmt(stats.cashHourly,state.settings.baseCurrency):'—'}</strong></article>
    <article><span>経費</span><strong>${fmt(stats.expenses,state.settings.baseCurrency)}</strong></article>
    <article><span>最大DD</span><strong class="${stats.drawdown.maxDrawdown?'negative':''}">${stats.drawdown.maxDrawdown?`-${fmt(stats.drawdown.maxDrawdown,state.settings.baseCurrency)}`:fmt(0,state.settings.baseCurrency)}</strong></article>
    <article><span>好成績店舗</span><strong>${bestVenue?esc(bestVenue.venue.name):'—'}</strong></article>`;

  document.getElementById('reportBreakdown').innerHTML=`
    <div class="report-section">
      <h3>トーナメント統計</h3>
      <div class="tournament-report-grid">
        <div><span>MTT回数</span><strong>${mtt.events}</strong></div>
        <div><span>ROI</span><strong>${mtt.events?pct(mtt.roi):'—'}</strong></div>
        <div><span>ITM率</span><strong>${mtt.events?pct(mtt.itmRate):'—'}</strong></div>
        <div><span>FT率</span><strong>${mtt.events?pct(mtt.finalTableRate):'—'}</strong></div>
        <div><span>優勝</span><strong>${mtt.wins}</strong></div>
        <div><span>ABI</span><strong>${mtt.entries?fmt(mtt.abi,state.settings.baseCurrency):'—'}</strong></div>
        <div><span>リエントリー率</span><strong>${mtt.events?pct(mtt.reentryRate):'—'}</strong></div>
        <div><span>平均参加人数</span><strong>${mtt.averageField?mtt.averageField.toFixed(1):'—'}</strong></div>
      </div>
    </div>
    <div class="report-section">
      <h3>種別内訳</h3>
      <div class="report-type-list">
        ${['cash','tournament'].map(type=>{
          const sessions=list.filter(session=>session.type===type);
          const profit=sessions.reduce((sum,session)=>sum+sessionProfitBase(session),0);
          return `<div><span>${type==='cash'?'リング':'トーナメント'}・${sessions.length}件</span><strong class="${profit>=0?'positive':'negative'}">${signed(profit,state.settings.baseCurrency)}</strong></div>`;
        }).join('')}
      </div>
    </div>`;
}
document.getElementById('reportMode').addEventListener('change',()=>{
  updateUiState({reportMode:document.getElementById('reportMode').value,reportPeriod:''});
  renderPerformanceReport();
});
document.getElementById('reportPeriod').addEventListener('change',()=>{
  updateUiState({reportPeriod:document.getElementById('reportPeriod').value});
  renderPerformanceReport();
});

function drawProfitChart(){
  const filter=document.getElementById('graphFilter').value;
  const period=document.getElementById('graphPeriod').value;
  updateUiState({graphPeriod:period});
  const now=new Date(`${today()}T00:00:00`);
  const threshold=new Date(now);
  if(period==='30')threshold.setDate(threshold.getDate()-29);
  if(period==='90')threshold.setDate(threshold.getDate()-89);
  const yearPrefix=today().slice(0,4);
  const sessions=[...state.sessions].filter(session=>{
    if(filter!=='all'&&session.type!==filter)return false;
    if(period==='all')return true;
    if(period==='year')return String(session.date||'').startsWith(yearPrefix);
    return new Date(`${session.date}T00:00:00`)>=threshold;
  }).sort((a,b)=>a.date.localeCompare(b.date)||a.createdAt-b.createdAt);
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
document.getElementById('graphPeriod').addEventListener('change',drawProfitChart);
