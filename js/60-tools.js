'use strict';

/** Poker Mate v9.0.0 — 60-tools.js */
function setTool(tool,save=true){
  const resolved=tool==='raise'?'odds':tool;
  document.querySelectorAll('[data-tool]').forEach(button=>{
    button.classList.toggle('active',button.dataset.tool===resolved);
  });
  document.getElementById('oddsTool').classList.toggle('hidden',resolved!=='odds');
  document.getElementById('equityTool').classList.toggle('hidden',resolved!=='equity');
  document.getElementById('drawTool').classList.toggle('hidden',resolved!=='draw');
  document.getElementById('powerTool').classList.toggle('hidden',resolved!=='power');
  if(resolved==='odds')setOddsMode(uiState.oddsMode||'bet',false);
  if(save)updateUiState({lastTool:resolved});
}
document.querySelector('.tool-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tool]');if(b)setTool(b.dataset.tool);});


function setOddsMode(mode,save=true){
  const resolved=mode==='raise'?'raise':'bet';
  document.querySelectorAll('[data-odds-mode]').forEach(button=>{
    button.classList.toggle('active',button.dataset.oddsMode===resolved);
  });
  document.getElementById('betOddsPane').classList.toggle('hidden',resolved!=='bet');
  document.getElementById('raiseOddsPane').classList.toggle('hidden',resolved!=='raise');
  document.getElementById('oddsModeBadge').textContent=
    resolved==='bet'?'ベットにコール':'レイズにコール';
  if(save)updateUiState({oddsMode:resolved});
  renderOddsReferenceTable();
}
document.querySelectorAll('[data-odds-mode]').forEach(button=>{
  button.addEventListener('click',()=>setOddsMode(button.dataset.oddsMode));
});


function oddsResultHtml({need,call,finalPot,note=''}) {
  return `
    <div class="odds-result-summary">
      <span>必要勝率</span>
      <strong>${pct(need)}</strong>
    </div>
    <div class="odds-result-metrics">
      <div><span>コール額</span><strong>${call.toLocaleString()}</strong></div>
      <div><span>コール後ポット</span><strong>${finalPot.toLocaleString()}</strong></div>
    </div>
    ${note?`<p class="odds-result-note">${note}</p>`:''}`;
}

function currentRakeSettings(){return {rakePct:Math.max(0,num(document.getElementById('oddsRakePct').value)),rakeCap:Math.max(0,num(document.getElementById('oddsRakeCap').value))};}
function renderBetSizeReferenceTable(){
  const pot=Math.max(0,num(document.getElementById('oddsPot').value));
  const rake=currentRakeSettings();
  const sizes=[
    {label:'1/4 pot',fraction:1/4},
    {label:'1/3 pot',fraction:1/3},
    {label:'1/2 pot',fraction:1/2},
    {label:'2/3 pot',fraction:2/3},
    {label:'3/4 pot',fraction:3/4},
    {label:'Pot',fraction:1},
    {label:'1.5x pot',fraction:1.5},
    {label:'2x pot',fraction:2}
  ];
  document.getElementById('oddsReferenceEyebrow').textContent='BET REFERENCE';
  document.getElementById('oddsReferenceTitle').textContent='ベットサイズ別 必要勝率表';
  document.getElementById('oddsReferenceContext').textContent='ポット比';
  document.getElementById('oddsReferenceHint').textContent=
    'ベット前のポットに対するベットサイズ別の早見表です。相手のベット額と自分のコール額が同額として計算します。';
  document.getElementById('oddsReferenceTable').innerHTML=
    '<div class="odds-table-row header"><span>ベットサイズ</span><span>コール額</span><strong>必要勝率</strong></div>'+
    sizes.map(({label,fraction})=>{
      const bet=pot*fraction;
      const result=PokerCore.calculateBetOdds({pot,bet,call:bet,...rake});
      return `<div class="odds-table-row"><span>${label}</span><span>${stripNumberZeros(bet,2)}</span><strong>${pct(result.need)}</strong></div>`;
    }).join('');
}
function renderRaiseSizeReferenceTable(){
  const pot=Math.max(0,num(document.getElementById('raisePot').value));
  const ownBet=Math.max(0,num(document.getElementById('raiseOwnBet').value));
  const rake=currentRakeSettings();
  const multiples=[2,2.5,3,3.5,4,5];
  document.getElementById('oddsReferenceEyebrow').textContent='RAISE REFERENCE';
  document.getElementById('oddsReferenceTitle').textContent='レイズサイズ別 必要勝率表';
  document.getElementById('oddsReferenceContext').textContent='Raise to';
  document.getElementById('oddsReferenceHint').textContent=
    '現在のポットと自分のベット額を基準に、Raise toの倍率ごとの追加コール額と必要勝率を表示します。';
  document.getElementById('oddsReferenceTable').innerHTML=
    '<div class="odds-table-row header"><span>Raise to</span><span>追加コール</span><strong>必要勝率</strong></div>'+
    multiples.map(multiplier=>{
      const result=PokerCore.calculateRaiseOdds({pot,ownBet,raiseTo:ownBet*multiplier,...rake});
      return `<div class="odds-table-row"><span>${multiplier}x</span><span>${result.call.toLocaleString()}</span><strong>${pct(result.need)}</strong></div>`;
    }).join('');
}
function renderOddsReferenceTable(){
  const mode=uiState.oddsMode||'bet';
  if(mode==='raise')renderRaiseSizeReferenceTable();
  else renderBetSizeReferenceTable();
}
function renderOdds(){
  const result=PokerCore.calculateBetOdds({pot:num(document.getElementById('oddsPot').value),bet:num(document.getElementById('oddsBet').value),call:num(document.getElementById('oddsCall').value),...currentRakeSettings()});
  document.getElementById('oddsResult').innerHTML=oddsResultHtml({need:result.need,call:result.call,finalPot:result.finalPot,note:`レーキ ${result.rake.toLocaleString()}・控除前 ${result.grossFinalPot.toLocaleString()}／ブラフ損益分岐点 ${pct(result.bluff)}・MDF ${pct(result.mdf)}（MDFはレーキ未考慮）`});
  renderOddsReferenceTable();
}
['oddsPot','oddsBet','oddsCall','oddsRakePct','oddsRakeCap'].forEach(id=>document.getElementById(id).addEventListener('input',renderOdds));
document.querySelectorAll('[data-pot-fraction]').forEach(button=>button.addEventListener('click',()=>{
  const pot=num(document.getElementById('oddsPot').value),bet=Math.round(pot*num(button.dataset.potFraction)*100)/100;
  document.getElementById('oddsBet').value=bet;document.getElementById('oddsCall').value=bet;renderOdds();
}));
function renderRaiseOdds(){
  const result=PokerCore.calculateRaiseOdds({pot:num(document.getElementById('raisePot').value),ownBet:num(document.getElementById('raiseOwnBet').value),raiseTo:num(document.getElementById('raiseTo').value),...currentRakeSettings()});
  document.getElementById('raiseResult').innerHTML=result.valid?oddsResultHtml({need:result.need,call:result.call,finalPot:result.finalPot,note:`レーキ ${result.rake.toLocaleString()}・控除前 ${result.grossFinalPot.toLocaleString()}／自分の既投入 ${result.ownBet.toLocaleString()}`}):'<span class="negative">Raise toは自分のベット額以上にしてください。</span>';
  renderOddsReferenceTable();
}
['raisePot','raiseOwnBet','raiseTo','oddsRakePct','oddsRakeCap'].forEach(id=>document.getElementById(id).addEventListener('input',renderRaiseOdds));
document.querySelectorAll('[data-raise-multiple]').forEach(button=>button.addEventListener('click',()=>{
  document.getElementById('raiseTo').value=num(document.getElementById('raiseOwnBet').value)*num(button.dataset.raiseMultiple);renderRaiseOdds();
}));

function cardLabelFromCode(code){
  if(!code)return '?';
  const rank=code[0],suit=cardSuits.find(s=>s.key===code[1]);
  return `${rank}${suit?.symbol||''}`;
}
function fullDeck(){
  return ranks.flatMap(rank=>cardSuits.map(suit=>`${rank}${suit.key}`));
}
function suitClass(code){return code&&['h','d'].includes(code[1])?'red-card':'black-card';}
function cardFaceHtml(code){
  if(!code)return '<span class="card-question">?</span>';
  const suit=cardSuits.find(s=>s.key===code[1])?.symbol||'';
  return `<span class="card-rank">${code[0]}</span><span class="card-suit-symbol">${suit}</span>`;
}
function cardsForContext(context){return context==='pn'?pnCards.filter(Boolean):[...equityCards.hero,...equityCards.villain,...equityCards.player3,...equityCards.board].filter(Boolean);}
function cardTargetLabel(target){
  if(!target)return 'カードを選択';
  if(target.context==='pn')return `パワーナンバー・${target.index+1}枚目`;
  if(target.zone==='hero')return `自分のハンド・${target.index+1}枚目`;
  if(target.zone==='villain')return `相手のハンド・${target.index+1}枚目`;
  if(target.zone==='player3')return `Player 3・${target.index+1}枚目`;
  return target.index<3?`フロップ・${target.index+1}枚目`:target.index===3?'ターン':'リバー';
}
function renderCardPicker(){
  const grid=document.getElementById('cardPickerGrid');
  if(!grid)return;
  const used=new Set(cardsForContext(activeCardTarget?.context));
  const current=activeCardTarget?(activeCardTarget.context==='pn'?pnCards[activeCardTarget.index]:equityCards[activeCardTarget.zone][activeCardTarget.index]):null;
  grid.innerHTML=cardSuits.map(suit=>`<div class="deck-suit-row ${['h','d'].includes(suit.key)?'red-card':'black-card'}">
    ${ranks.map(rank=>{
      const code=`${rank}${suit.key}`;
      const disabled=used.has(code)&&code!==current;
      return `<button type="button" class="deck-card-button" data-pick-card="${code}" ${disabled?'disabled':''}><span>${rank}</span><b>${suit.symbol}</b></button>`;
    }).join('')}
  </div>`).join('');
  document.getElementById('cardPickerTitle').textContent=cardTargetLabel(activeCardTarget);
}
function openCardPicker(target){
  activeCardTarget=target;
  renderCardPicker();
  document.getElementById('cardPickerBackdrop').classList.remove('hidden');
  document.getElementById('cardPickerSheet').classList.remove('hidden');
}
function closeCardPicker(){
  activeCardTarget=null;
  document.getElementById('cardPickerBackdrop').classList.add('hidden');
  document.getElementById('cardPickerSheet').classList.add('hidden');
}
function nextCardTarget(target){
  if(target.context==='pn')return target.index===0?{context:'pn',zone:'pn',index:1}:null;
  if(target.zone==='hero')return target.index===0?{context:'equity',zone:'hero',index:1}:null;
  if(target.zone==='villain')return target.index===0?{context:'equity',zone:'villain',index:1}:null;
  if(target.zone==='player3')return target.index===0?{context:'equity',zone:'player3',index:1}:null;
  if(target.zone==='board')return target.index<4?{context:'equity',zone:'board',index:target.index+1}:null;
  return null;
}
function assignCardToTarget(code){
  if(!activeCardTarget)return;
  const target={...activeCardTarget};
  if(target.context==='pn')pnCards[target.index]=code;
  else equityCards[target.zone][target.index]=code;
  renderVisualCards();
  const next=nextCardTarget(target);
  if(next){activeCardTarget=next;renderCardPicker();}else closeCardPicker();
}
function clearActiveCard(){
  if(!activeCardTarget)return;
  if(activeCardTarget.context==='pn')pnCards[activeCardTarget.index]=null;
  else equityCards[activeCardTarget.zone][activeCardTarget.index]=null;
  renderVisualCards();
  renderCardPicker();
}
function renderVisualCards(){
  const heroMode=document.getElementById('equityHeroMode')?.value||uiState.equityHeroMode||'fixed',villainMode=document.getElementById('equityVillainMode')?.value||uiState.equityVillainMode||'random';
  document.querySelectorAll('[data-card-picker]').forEach(slot=>{const context=slot.dataset.cardPicker,zone=slot.dataset.cardZone,index=Number(slot.dataset.cardIndex),code=context==='pn'?pnCards[index]:equityCards[zone][index];slot.innerHTML=cardFaceHtml(code);slot.classList.toggle('empty',!code);slot.classList.toggle('red-card',!!code&&['h','d'].includes(code[1]));slot.classList.toggle('black-card',!!code&&!['h','d'].includes(code[1]));const disabled=context==='equity'&&((zone==='hero'&&heroMode!=='fixed')||(zone==='villain'&&villainMode!=='fixed'));slot.disabled=disabled;slot.classList.toggle('mode-disabled',disabled);});
  document.getElementById('villainModeLabel').textContent=villainMode==='fixed'?'指定ハンド':villainMode==='random'?'ランダム':`簡易上位${villainMode.replace('range','')}%`;
  document.getElementById('player3Card').classList.toggle('hidden',!uiState.equityPlayer3);document.getElementById('togglePlayer3Btn').textContent=uiState.equityPlayer3?'Player 3を削除':'Player 3を追加';updatePnHandFromCards();updateEquityEstimate();
}
document.addEventListener('click',e=>{
  const slot=e.target.closest('[data-card-picker]');
  if(slot){
    openCardPicker({context:slot.dataset.cardPicker,zone:slot.dataset.cardZone,index:Number(slot.dataset.cardIndex)});
    return;
  }
  const card=e.target.closest('[data-pick-card]');
  if(card&&!card.disabled){assignCardToTarget(card.dataset.pickCard);}
});
document.getElementById('closeCardPickerBtn').addEventListener('click',closeCardPicker);
document.getElementById('cardPickerBackdrop').addEventListener('click',closeCardPicker);
document.getElementById('clearActiveCardBtn').addEventListener('click',clearActiveCard);

function rankNumber(card){
  const r=card[0];
  return r==='A'?14:r==='K'?13:r==='Q'?12:r==='J'?11:r==='T'?10:Number(r);
}
function straightHighFromRanks(rankValues){
  const uniq=[...new Set(rankValues)].sort((a,b)=>b-a);
  if(uniq.includes(14))uniq.push(1);
  let run=1;
  for(let i=1;i<uniq.length;i++){
    if(uniq[i]===uniq[i-1]-1){run++;if(run>=5)return uniq[i-4];}
    else if(uniq[i]!==uniq[i-1])run=1;
  }
  return 0;
}
function evaluateSeven(cards){
  const values=cards.map(rankNumber);
  const counts=new Map();
  values.forEach(v=>counts.set(v,(counts.get(v)||0)+1));
  const byCount=[...counts.entries()].sort((a,b)=>b[1]-a[1]||b[0]-a[0]);
  const suitsMap={s:[],h:[],d:[],c:[]};
  cards.forEach(c=>suitsMap[c[1]].push(rankNumber(c)));
  const flushValues=Object.values(suitsMap).find(v=>v.length>=5);
  if(flushValues){const sfHigh=straightHighFromRanks(flushValues);if(sfHigh)return [8,sfHigh];}
  const quad=byCount.find(x=>x[1]===4);
  if(quad)return [7,quad[0],Math.max(...values.filter(v=>v!==quad[0]))];
  const trips=byCount.filter(x=>x[1]>=3).map(x=>x[0]).sort((a,b)=>b-a);
  const pairs=byCount.filter(x=>x[1]>=2).map(x=>x[0]).sort((a,b)=>b-a);
  if(trips.length){const pairCandidate=pairs.find(v=>v!==trips[0]);if(pairCandidate!==undefined)return [6,trips[0],pairCandidate];}
  if(flushValues)return [5,...flushValues.sort((a,b)=>b-a).slice(0,5)];
  const straightHigh=straightHighFromRanks(values);if(straightHigh)return [4,straightHigh];
  if(trips.length){const kickers=[...new Set(values.filter(v=>v!==trips[0]))].sort((a,b)=>b-a).slice(0,2);return [3,trips[0],...kickers];}
  if(pairs.length>=2){const top=pairs[0],second=pairs[1],kicker=Math.max(...values.filter(v=>v!==top&&v!==second));return [2,top,second,kicker];}
  if(pairs.length===1){const pair=pairs[0],kickers=[...new Set(values.filter(v=>v!==pair))].sort((a,b)=>b-a).slice(0,3);return [1,pair,...kickers];}
  return [0,...[...new Set(values)].sort((a,b)=>b-a).slice(0,5)];
}
function compareHands(a,b){
  const len=Math.max(a.length,b.length);
  for(let i=0;i<len;i++){const av=a[i]||0,bv=b[i]||0;if(av!==bv)return av>bv?1:-1;}
  return 0;
}
function comboCountForClass(hand){return hand.length===2?6:hand.endsWith('s')?4:12;}
function rangePresetClasses(percent){const target=1326*num(percent)/100;let total=0;const selected=[];[...allStartingHands].sort((a,b)=>handStrengthScore(b)-handStrengthScore(a)).some(hand=>{selected.push(hand);total+=comboCountForClass(hand);return total>=target;});return selected;}
function equitySpecFromMode(mode,cards){if(mode==='fixed')return {type:'fixed',cards};if(mode==='random')return {type:'random'};return {type:'range',classes:rangePresetClasses(Number(mode.replace('range','')))};}
function equityInput(){const heroMode=document.getElementById('equityHeroMode').value,villainMode=document.getElementById('equityVillainMode').value,hero=equityCards.hero.filter(Boolean),villain=equityCards.villain.filter(Boolean),p3=equityCards.player3.filter(Boolean),board=equityCards.board.filter(Boolean);if(heroMode==='fixed'&&hero.length!==2)return {error:'Player 1のハンドを2枚選択してください。'};if(villainMode==='fixed'&&villain.length!==2)return {error:'Player 2のハンドを2枚選択してください。'};if(uiState.equityPlayer3&&p3.length!==2)return {error:'Player 3のハンドを2枚選択してください。'};if(uiState.equityPlayer3&&(heroMode!=='fixed'||villainMode!=='fixed'))return {error:'3人ポットはPlayer 1・2・3をすべて指定ハンドにしてください。'};const gap=equityCards.board.findIndex(v=>!v);if(gap>=0&&equityCards.board.slice(gap+1).some(Boolean))return {error:'ボードは左から順番に選択してください。'};if(board.length===1||board.length===2)return {error:'ボードは0枚、3枚、4枚、5枚で指定してください。'};if((heroMode!=='fixed'||villainMode!=='fixed')&&board.length<3)return {error:'ランダムまたはレンジ計算はフロップ以降で使用してください。'};const all=[...hero,...villain,...p3,...board];if(new Set(all).size!==all.length)return {error:'同じカードが重複しています。'};return {heroSpec:equitySpecFromMode(heroMode,hero),villainSpec:equitySpecFromMode(villainMode,villain),player3:uiState.equityPlayer3?p3:null,board,heroMode,villainMode};}
function estimatedRangeCombos(mode){if(mode==='fixed')return 1;if(mode==='random')return 1081;return rangePresetClasses(Number(mode.replace('range',''))).reduce((s,h)=>s+comboCountForClass(h),0);}
function updateEquityEstimate(){const el=document.getElementById('equityEstimate');if(!el)return;const hm=document.getElementById('equityHeroMode').value,vm=document.getElementById('equityVillainMode').value,bc=equityCards.board.filter(Boolean).length,missing=5-bc;if(bc===1||bc===2){el.textContent='ボードは0・3・4・5枚で指定';return;}if((hm!=='fixed'||vm!=='fixed')&&bc<3){el.textContent='レンジ／ランダムはフロップ以降';return;}const boardComb=missing===0?1:missing===1?44:missing===2?990:1712304,est=Math.max(1,Math.round(estimatedRangeCombos(hm)*estimatedRangeCombos(vm)*boardComb));el.textContent=est>20000000?`約${est.toLocaleString()}通り：上限超過の可能性`:`約${est.toLocaleString()}通り`;}
function formatEquityPercent(value){return `${num(value).toFixed(2)}%`;}
function stopEquityWorker(message=''){if(equityWorker){equityWorker.terminate();equityWorker=null;}document.getElementById('calculateEquityBtn').disabled=false;document.getElementById('equityProgressWrap').classList.add('hidden');if(message)document.getElementById('equityMethod').textContent=message;}
function setEquityProgress(processed,total){const percent=total?Math.min(100,processed/total*100):0;document.getElementById('equityProgressWrap').classList.remove('hidden');document.getElementById('equityProgressBar').style.width=`${percent}%`;document.getElementById('equityProgressPercent').textContent=`${percent.toFixed(0)}%`;document.getElementById('equityProgressText').textContent=`${processed.toLocaleString()} / ${total.toLocaleString()} 通り`;}
function setPlayerEquity(prefix,p,total){document.getElementById(`${prefix}Equity`).textContent=formatEquityPercent(p.equityShare/total*100);document.getElementById(`${prefix}Win`).textContent=formatEquityPercent(p.wins/total*100);document.getElementById(`${prefix}Tie`).textContent=formatEquityPercent(p.ties/total*100);}
function renderExactEquityResult(result){setPlayerEquity('hero',result.players[0],result.total);setPlayerEquity('villain',result.players[1],result.total);if(result.players[2])setPlayerEquity('player3',result.players[2],result.total);const heroEq=result.players[0].equityShare/result.total*100;document.getElementById('equityResult').innerHTML=`Player 1のエクイティ <strong>${formatEquityPercent(heroEq)}</strong><div class="equity-meter"><div class="equity-meter-fill" style="width:${heroEq}%"></div></div><div class="exact-count-grid">${result.players.map((p,i)=>`<span><small>P${i+1}</small><strong>${formatEquityPercent(p.equityShare/result.total*100)}</strong></span>`).join('')}</div>`;document.getElementById('equityMethod').textContent=`${result.modeLabel}を全${result.total.toLocaleString()}通り完全列挙しました。乱数は使用していません。複数人の同着は等分します。`;}
function calculateEquityNow(){const input=equityInput(),resultEl=document.getElementById('equityResult');if(input.error){resultEl.innerHTML=`<span class="negative">${input.error}</span>`;return;}if(typeof Worker==='undefined'){resultEl.innerHTML='<span class="negative">このブラウザはWeb Workerに対応していません。</span>';return;}stopEquityWorker();resetEquityStats();document.getElementById('calculateEquityBtn').disabled=true;resultEl.textContent='完全列挙を開始しています…';document.getElementById('equityProgressBar').style.width='0%';document.getElementById('equityProgressPercent').textContent='0%';document.getElementById('equityProgressText').textContent='有効な組み合わせを準備しています';document.getElementById('equityProgressWrap').classList.remove('hidden');equityWorker=new Worker('./equity-worker.js?v=9.0.0');equityWorker.onmessage=e=>{const msg=e.data;if(msg.type==='progress'){setEquityProgress(msg.processed,msg.total);return;}if(msg.type==='result'){renderExactEquityResult(msg);stopEquityWorker();return;}if(msg.type==='error'){const text=msg.code==='CALCULATION_TOO_LARGE'?'正確な計算が2,000万通りを超えます。レンジを狭くするか、ターン／リバーを指定してください。':msg.message;resultEl.innerHTML=`<span class="negative">${esc(text)}</span>`;stopEquityWorker('入力条件を軽くして再計算してください。');}};equityWorker.onerror=()=>{resultEl.innerHTML='<span class="negative">完全計算中にエラーが発生しました。</span>';stopEquityWorker('計算を中止しました。');};equityWorker.postMessage(input);}
document.getElementById('calculateEquityBtn').addEventListener('click',calculateEquityNow);document.getElementById('cancelEquityBtn').addEventListener('click',()=>{stopEquityWorker('計算を中止しました。');document.getElementById('equityResult').textContent='計算を中止しました。';});document.getElementById('resetEquityBtn').addEventListener('click',()=>{stopEquityWorker();equityCards={hero:[null,null],villain:[null,null],player3:[null,null],board:[null,null,null,null,null]};document.getElementById('equityHeroMode').value='fixed';document.getElementById('equityVillainMode').value='random';updateUiState({equityHeroMode:'fixed',equityVillainMode:'random',equityPlayer3:false});resetEquityStats();renderVisualCards();});document.getElementById('randomVillainBtn').addEventListener('click',()=>{stopEquityWorker();equityCards.villain=[null,null];document.getElementById('equityVillainMode').value='random';updateUiState({equityVillainMode:'random'});resetEquityStats();renderVisualCards();showToast('Player 2をランダムに戻しました');});document.getElementById('togglePlayer3Btn').addEventListener('click',()=>{const enabled=!uiState.equityPlayer3;if(!enabled)equityCards.player3=[null,null];updateUiState({equityPlayer3:enabled});resetEquityStats();renderVisualCards();});['equityHeroMode','equityVillainMode'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{const hm=document.getElementById('equityHeroMode').value,vm=document.getElementById('equityVillainMode').value;if(hm!=='fixed')equityCards.hero=[null,null];if(vm!=='fixed')equityCards.villain=[null,null];updateUiState({equityHeroMode:hm,equityVillainMode:vm});resetEquityStats();renderVisualCards();}));
function resetEquityStats(){['heroEquity','heroWin','heroTie','villainEquity','villainWin','villainTie','player3Equity','player3Win','player3Tie'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='—';});document.getElementById('equityResult').textContent='ハンドまたはレンジとボードを指定してください。';document.getElementById('equityMethod').textContent='指定ハンド同士はプリフロップから完全列挙。ランダム・レンジはフロップ以降、3人ポットは全員指定ハンドに対応します。';updateEquityEstimate();}

const DRAW_PRESET_LABELS={
  'combo-15':'OESD+FD',
  'combo-12':'Gut+FD',
  flush:'FD',
  oesd:'OESD',
  gutshot:'Gut',
  pair:'→Pair',
  trips:'→Trips',
  quads:'→Quads'
};
let selectedDrawPreset=null;

function renderDrawPresetUi(){
  document.querySelectorAll('[data-draw-preset]').forEach(button=>{
    const selected=selectedDrawPreset===button.dataset.drawPreset;
    button.classList.toggle('selected',selected);
    button.setAttribute('aria-checked',String(selected));
  });
  if(!selectedDrawPreset){
    document.getElementById('drawSelectionText').textContent='代表例を1つ選択できます';
    return;
  }
  const button=document.querySelector(`[data-draw-preset="${selectedDrawPreset}"]`);
  const label=DRAW_PRESET_LABELS[selectedDrawPreset]||selectedDrawPreset;
  document.getElementById('drawSelectionText').textContent=
    `${label}：${Math.max(0,Math.floor(num(button?.dataset.outs)))}アウツ`;
}
function applyDrawPreset(preset){
  selectedDrawPreset=preset;
  const button=document.querySelector(`[data-draw-preset="${preset}"]`);
  document.getElementById('drawOuts').value=Math.max(0,Math.floor(num(button?.dataset.outs)));
  renderDraw();
}
function renderDraw(){
  const result=PokerCore.calculateDrawOdds({street:document.getElementById('drawStreet').value,outs:document.getElementById('drawOuts').value,dirtyOuts:document.getElementById('drawDirtyOuts').value});
  const label=result.street==='flop'?'リバーまで':'リバー';
  document.getElementById('drawTotalBadge').textContent=result.dirtyOuts?`${result.rawOuts}→${result.outs}クリーン`:`${result.outs}アウツ`;
  document.getElementById('drawResult').innerHTML=
    `次の1枚でヒット <strong>${pct(result.next)}</strong><br>`+
    `${label}までに1回以上ヒット <strong>${pct(result.byRiver)}</strong><br>`+
    `<span class="muted">2・4の法則では約 ${pct(result.ruleApprox)}。外れる確率は ${pct(result.miss)}。</span>`;
  renderDrawPresetUi();
}
document.getElementById('drawStreet').addEventListener('input',renderDraw);
document.getElementById('drawOuts').addEventListener('input',renderDraw);document.getElementById('drawDirtyOuts').addEventListener('input',renderDraw);
document.querySelectorAll('[data-draw-preset]').forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.drawPreset;
  if(selectedDrawPreset===key){
    selectedDrawPreset=null;
    document.getElementById('drawOuts').value=0;document.getElementById('drawDirtyOuts').value=0;
    renderDraw();
    return;
  }
  applyDrawPreset(key);
}));
document.getElementById('clearDrawPresetsBtn').addEventListener('click',()=>{
  selectedDrawPreset=null;
  document.getElementById('drawOuts').value=0;document.getElementById('drawDirtyOuts').value=0;
  renderDraw();
});

function canonicalHandFromCards(cards){
  if(!cards[0]||!cards[1])return null;
  const [a,b]=cards,ra=a[0],rb=b[0];
  if(ra===rb)return `${ra}${rb}`;
  const ai=ranks.indexOf(ra),bi=ranks.indexOf(rb),high=ai<bi?ra:rb,low=ai<bi?rb:ra;
  return `${high}${low}${a[1]===b[1]?'s':'o'}`;
}
function representativeCardsForHand(hand){
  const first=hand[0],second=hand[1];
  if(hand.length===2)return [`${first}s`,`${second}h`];
  return hand.endsWith('s')?[`${first}s`,`${second}s`]:[`${first}s`,`${second}h`];
}
function buildPnHandPicker(){
  pnCards=selectedPnHand?representativeCardsForHand(selectedPnHand):[null,null];
  renderVisualCards();
}
function updatePnHandFromCards(){
  const hand=canonicalHandFromCards(pnCards);
  selectedPnHand=hand||null;
  document.getElementById('pnSelectedLabel').textContent=hand||'未選択';
  if(document.getElementById('pnResult'))renderPower();
}
function pnForHand(hand){
  if(!hand)return 0;
  for(let r=0;r<13;r++)for(let c=0;c<13;c++)if(handLabel(r,c)===hand)return powerMatrix[r][c];
  return 1;
}
document.getElementById('clearPnCardsBtn').addEventListener('click',()=>{selectedPnHand=null;pnCards=[null,null];renderVisualCards();});

function pnDisplayValue(value){
  return value>=80?'all':value<2?'—':String(value);
}
function pnTierClass(value){
  if(value>=75)return 'pn-tier-max';
  if(value>=50)return 'pn-tier-4';
  if(value>=30)return 'pn-tier-3';
  if(value>=15)return 'pn-tier-2';
  if(value>=2)return 'pn-tier-1';
  return 'pn-tier-zero';
}
function renderPower(){
  const stack=num(document.getElementById('pnStack').value);
  const cpr=
    num(document.getElementById('pnSb').value)+
    num(document.getElementById('pnBb').value)+
    num(document.getElementById('pnAnteTotal').value);
  const behind=Math.max(1,num(document.getElementById('pnBehind').value));
  const m=cpr?stack/cpr:0;
  const required=m*behind;
  const selectedHand=canonicalHandFromCards(pnCards);
  const selectedPn=pnForHand(selectedHand);
  const icmMode=document.getElementById('pnIcmMode').value;
  const selectedOk=Boolean(selectedHand)&&selectedPn>=required;
  document.getElementById('pnScopeStatus').textContent=icmMode==='icm'?'ICM参考値':'chipEV';
  document.getElementById('pnScopeStatus').className=`summary-badge ${icmMode==='icm'?'warning':''}`;

  document.getElementById('pnMValue').textContent=m.toFixed(2);
  document.getElementById('pnThresholdLabel').textContent=required.toFixed(1);
  document.getElementById('pnHandValue').textContent=selectedHand?pnDisplayValue(selectedPn):'—';
  document.getElementById('pnDecision').textContent=selectedHand
    ?icmMode==='icm'
      ?(selectedOk?'参考候補':'参考見送り')
      :(selectedOk?'候補':'見送り')
    :'未選択';
  document.getElementById('pnDecision').className=selectedHand?(selectedOk?'positive':'negative'):'';

  document.getElementById('pnResult').textContent=selectedHand
    ?`${selectedHand}：${selectedOk?'必要PN以上':'必要PN未満'}${icmMode==='icm'?'（ICMでは参考値）':''}`
    :'白枠のハンドが必要PN以上です。';

  let qualifiedCount=0;
  const selected=canonicalHandFromCards(pnCards);
  const cells=ranks.flatMap((_,row)=>ranks.map((__,col)=>{
    const hand=handLabel(row,col);
    const value=powerMatrix[row][col];
    const qualifies=value>=required;
    if(qualifies)qualifiedCount++;
    const classes=[
      'hand-cell',
      pnTierClass(value),
      qualifies?'pn-qualified':'pn-below',
      hand===selected?'selected':''
    ].filter(Boolean).join(' ');

    return `<button class="${classes}" data-pn-hand="${hand}" `+
      `title="${hand}：PN ${pnDisplayValue(value)}／必要 ${required.toFixed(1)}">`+
      `<span>${hand}</span><small>${pnDisplayValue(value)}</small></button>`;
  }));

  document.getElementById('pnQualifiedCount').textContent=`${qualifiedCount} / 169`;
  document.getElementById('pnGrid').innerHTML=cells.join('');
}
['pnStack','pnSb','pnBb','pnAnteTotal','pnBehind','pnIcmMode'].forEach(id=>document.getElementById(id).addEventListener('input',renderPower));
document.getElementById('pnGrid').addEventListener('click',e=>{
  const b=e.target.closest('[data-pn-hand]');if(!b)return;selectedPnHand=b.dataset.pnHand;pnCards=representativeCardsForHand(selectedPnHand);renderVisualCards();renderPower();
});

document.getElementById('handForm').addEventListener('submit',e=>{
  e.preventDefault();
  state.hands.push({id:uid(),date:document.getElementById('handDate').value,cards:document.getElementById('handCards').value.trim(),position:document.getElementById('handPosition').value,tag:document.getElementById('handTag').value,action:document.getElementById('handAction').value.trim(),conclusion:document.getElementById('handConclusion').value.trim(),createdAt:Date.now()});
  saveState();e.target.reset();document.getElementById('handDate').value=today();renderHands();showToast('ハンドメモを保存しました');
});
