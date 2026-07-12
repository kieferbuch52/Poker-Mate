'use strict';

/** Poker Mate v9.0.0 — 50-ranges.js */
function handLabel(row,col){
  if(row===col)return ranks[row]+ranks[col];
  return row<col?`${ranks[row]}${ranks[col]}s`:`${ranks[col]}${ranks[row]}o`;
}
const RANGE_FREQUENCY_KEY='pokerMateRangeFrequenciesV1';
let rangeFrequencyStore=loadRangeFrequencyStore();
let rangeFrequencyEdit=Boolean(uiState.rangeFrequencyEdit);
function loadRangeFrequencyStore(){try{const v=JSON.parse(localStorage.getItem(RANGE_FREQUENCY_KEY));return v&&typeof v==='object'?v:{}}catch(e){return {}}}
function saveRangeFrequencyStore(){localStorage.setItem(RANGE_FREQUENCY_KEY,JSON.stringify(rangeFrequencyStore));}
function rankValueForHand(rank){return {A:14,K:13,Q:12,J:11,T:10,'9':9,'8':8,'7':7,'6':6,'5':5,'4':4,'3':3,'2':2}[rank]||0;}
function handStrengthScore(hand){if(!hand)return 0;const a=rankValueForHand(hand[0]),b=rankValueForHand(hand[1]);if(hand.length===2)return 80+a*4;const suited=hand.endsWith('s'),gap=Math.max(0,Math.abs(a-b)-1);return a*5+b*2+(suited?8:0)-gap*3+(a===14?5:0);}
function adjustSetByPercent(base,percent){const set=new Set(base||[]);if(!percent)return set;if(percent>0){const count=Math.round(set.size*percent/100);[...set].sort((a,b)=>handStrengthScore(a)-handStrengthScore(b)).slice(0,count).forEach(h=>set.delete(h));}else{const count=Math.round((169-set.size)*Math.abs(percent)/100);[...allStartingHands].filter(h=>!set.has(h)).sort((a,b)=>handStrengthScore(b)-handStrengthScore(a)).slice(0,count).forEach(h=>set.add(h));}return set;}
function currentRangeAdjustment(){if(currentRangeGame==='headsup')return 0;let a=0;if(uiState.rangeTableSize==='9')a+=8;if(currentRangeGame==='tournament'&&uiState.rangeAnte==='none')a+=5;if(currentRangeGame==='tournament'&&uiState.rangeIcm==='bubble')a+=8;if(currentRangeGame==='tournament'&&uiState.rangeIcm==='final')a+=12;return a;}
function adjustDefenseForOpenSize(defense){const size=num(uiState.rangeOpenSize||2.5),threebet=new Set(defense?.threebet||[]);let call=new Set(defense?.call||[]);const sizeAdj=size<=2?-14:size<=2.2?-7:size<=2.5?0:size<=3?11:24;call=adjustSetByPercent(call,sizeAdj);const cond=currentRangeAdjustment();if(cond>0)call=adjustSetByPercent(call,cond);threebet.forEach(h=>call.delete(h));return {threebet,call};}
function tournamentActionForStack(stack){const v=Number(stack);if(v<=10)return {type:'shove',label:'ALL-IN候補'};if(v===15)return {type:'mixed',label:'2BB OPEN / ALL-IN混合'};return {type:'open',label:'RFI'};}

const YOKOSAWA_TIER_ORDER=['navy','red','yellow','green','blue','white','purple','pink','fold'];
const YOKOSAWA_TIER_META={
  navy:{label:'8人・強',short:'8強'},red:{label:'8人・中',short:'8中'},
  yellow:{label:'8人・弱',short:'8弱'},green:{label:'後ろ6〜7人',short:'6〜7'},
  blue:{label:'後ろ4〜5人',short:'4〜5'},white:{label:'後ろ3人',short:'3人'},
  purple:{label:'後ろ2人',short:'2人'},pink:{label:'BBでBTNレイズにコール',short:'BB'},
  fold:{label:'フォールド',short:'Fold'}
};
const YOKOSAWA_TIER_ROWS=[
 ['navy','navy','red','red','red','green','green','green','green','green','green','green','green'],
 ['navy','navy','red','yellow','green','green','white','white','white','white','white','white','white'],
 ['red','yellow','navy','yellow','green','blue','white','white','white','purple','purple','purple','purple'],
 ['yellow','green','blue','red','yellow','blue','white','white','purple','pink','pink','pink','pink'],
 ['green','blue','white','blue','red','green','blue','purple','pink','pink','pink','pink','fold'],
 ['blue','white','white','white','white','red','blue','white','purple','pink','fold','fold','fold'],
 ['white','pink','pink','pink','pink','purple','yellow','white','purple','pink','fold','fold','fold'],
 ['white','pink','pink','fold','fold','pink','pink','yellow','white','purple','pink','fold','fold'],
 ['purple','pink','fold','fold','fold','fold','fold','fold','green','white','purple','pink','fold'],
 ['pink','pink','fold','fold','fold','fold','fold','fold','fold','green','purple','pink','fold'],
 ['pink','fold','fold','fold','fold','fold','fold','fold','fold','fold','blue','pink','fold'],
 ['pink','fold','fold','fold','fold','fold','fold','fold','fold','fold','fold','blue','fold'],
 ['pink','fold','fold','fold','fold','fold','fold','fold','fold','fold','fold','fold','blue']
];
const yokosawaTierByHand=(()=>{
  const map={};
  for(let row=0;row<13;row++)for(let col=0;col<13;col++)map[handLabel(row,col)]=YOKOSAWA_TIER_ROWS[row][col];
  return map;
})();
function yokosawaTierIndex(tier){
  const index=YOKOSAWA_TIER_ORDER.indexOf(tier);
  return index>=0?index:YOKOSAWA_TIER_ORDER.length-1;
}
function yokosawaEffectiveThreshold(game,threshold){
  const base=yokosawaTierIndex(threshold);
  if(game==='tournament'&&threshold!=='pink'){
    return YOKOSAWA_TIER_ORDER[Math.min(yokosawaTierIndex('purple'),base+1)];
  }
  return threshold;
}
function yokosawaOpponentThreeBetThreshold(game,threshold){
  const effective=yokosawaEffectiveThreshold(game,threshold);
  return YOKOSAWA_TIER_ORDER[Math.max(0,yokosawaTierIndex(effective)-2)];
}
function yokosawaFacingThreeBetAction(handTier,game,threshold){
  if(handTier==='fold')return 'fold';
  const opponent=yokosawaOpponentThreeBetThreshold(game,threshold);
  const handIndex=yokosawaTierIndex(handTier);
  const opponentIndex=yokosawaTierIndex(opponent);
  if(handIndex<=opponentIndex-2)return 'fourbet';
  if(handIndex<=opponentIndex)return 'call';
  return 'fold';
}
function yokosawaActionLabel(action){
  return action==='fourbet'?'4BET':action==='call'?'CALL':'FOLD';
}
function renderYokosawaControls(){
  const game=uiState.yokosawaGame||'ring';
  const situation=uiState.yokosawaSituation||'firstIn';
  document.querySelectorAll('[data-yokosawa-game]').forEach(button=>button.classList.toggle('active',button.dataset.yokosawaGame===game));
  document.querySelectorAll('[data-yokosawa-situation]').forEach(button=>button.classList.toggle('active',button.dataset.yokosawaSituation===situation));
  const select=document.getElementById('yokosawaThreshold');
  const pinkOption=select.querySelector('option[value="pink"]');
  pinkOption.disabled=situation==='facing3bet';
  if(situation==='facing3bet'&&(uiState.yokosawaThreshold||'green')==='pink'){
    uiState.yokosawaThreshold='purple';
    saveUiState();
  }
  select.value=uiState.yokosawaThreshold||'green';
  document.getElementById('yokosawaThresholdField').childNodes[0].nodeValue=
    situation==='facing3bet'?'自分がオープンした基準 ':'参加基準 ';
  document.getElementById('yokosawaTournamentWarning').classList.toggle('hidden',game!=='tournament');
  const effective=yokosawaEffectiveThreshold(game,select.value);
  const opponent=yokosawaOpponentThreeBetThreshold(game,select.value);
  document.getElementById('yokosawaSummaryTitle').textContent=`${game==='ring'?'リング':'トーナメント'}・${situation==='firstIn'?'First in':'3BET対応'}`;
  document.getElementById('yokosawaSummaryText').textContent=situation==='firstIn'
    ?game==='ring'
      ?`100BB・アンティなし。${YOKOSAWA_TIER_META[effective].label}以上を参加候補として表示します。`
      :`アンティありとして基準を1ランク広げ、${YOKOSAWA_TIER_META[effective].label}以上を参加候補として表示します。`
    :`自分は${YOKOSAWA_TIER_META[effective].label}までオープン。相手の3BET下限を${YOKOSAWA_TIER_META[opponent].label}と推定します。`;
}
function renderYokosawaFirstIn(game,threshold){
  const effective=yokosawaEffectiveThreshold(game,threshold);
  const thresholdIndex=yokosawaTierIndex(effective);
  document.getElementById('rangePageTitle').textContent=`ヨコサワ式 ${game==='ring'?'リング':'トーナメント'} First in`;
  document.getElementById('rangeContextBadge').textContent=`ヨコサワ式・${game==='ring'?'リング':'トーナメント'}`;
  document.getElementById('rangeActionBadge').classList.remove('hidden','shove');
  document.getElementById('rangeActionBadge').textContent=YOKOSAWA_TIER_META[effective].short;
  document.getElementById('rangeContextDescription').textContent=game==='ring'?'100BB・アンティなし':'アンティあり・40BB以上の簡易応用';
  document.getElementById('rangeLegend').innerHTML=YOKOSAWA_TIER_ORDER.map(tier=>`<span><i class="dot yokosawa-${tier}"></i>${YOKOSAWA_TIER_META[tier].short}</span>`).join('');
  document.getElementById('rangeGrid').innerHTML=ranks.flatMap((_,row)=>ranks.map((__,col)=>{
    const hand=handLabel(row,col),tier=yokosawaTierByHand[hand]||'fold';
    const active=tier!=='fold'&&yokosawaTierIndex(tier)<=thresholdIndex;
    return `<button class="hand-cell yokosawa-cell yokosawa-${tier} ${active?'yokosawa-active':'yokosawa-below'}" title="${hand}：${YOKOSAWA_TIER_META[tier].label}">${hand}</button>`;
  })).join('');
  document.getElementById('rangeHint').textContent=game==='ring'
    ?'選択した「後ろの人数」の色以上を、First inの参加候補として強調しています。'
    :'アンティゲームへの公開応用ルールとして、リングより参加基準を1ランク広げています。';
  document.getElementById('rangeAssumptionContent').innerHTML=`<dl>
    <div><dt>ゲーム</dt><dd>${game==='ring'?'リング・100BB・アンティなし':'トーナメント・アンティあり・40BB以上'}</dd></div>
    <div><dt>元の基準</dt><dd>${YOKOSAWA_TIER_META[threshold].label}</dd></div>
    <div><dt>適用基準</dt><dd>${YOKOSAWA_TIER_META[effective].label}${game==='tournament'?'（1ランク広げる）':''}</dd></div>
    <div><dt>注意</dt><dd>${game==='tournament'?'25BB以下や強いICM局面には非対応です。':'レーキや相手傾向に応じて調整してください。'}</dd></div>
  </dl><p>公開情報をPoker Mate用に再構成した非公式表示です。</p>`;
}
function renderYokosawaFacingThreeBet(game,threshold){
  const effective=yokosawaEffectiveThreshold(game,threshold);
  const opponent=yokosawaOpponentThreeBetThreshold(game,threshold);
  document.getElementById('rangePageTitle').textContent=`ヨコサワ式 ${game==='ring'?'リング':'トーナメント'} 3BET対応`;
  document.getElementById('rangeContextBadge').textContent=`${game==='ring'?'リング':'トーナメント'}・vs 3BET`;
  document.getElementById('rangeActionBadge').classList.remove('hidden','shove');
  document.getElementById('rangeActionBadge').textContent='4BET / CALL';
  document.getElementById('rangeContextDescription').textContent=`自分のオープン下限 ${YOKOSAWA_TIER_META[effective].short} → 相手3BET下限 ${YOKOSAWA_TIER_META[opponent].short}`;
  document.getElementById('rangeLegend').innerHTML='<span><i class="dot yokosawa-fourbet-dot"></i>4BET</span><span><i class="dot yokosawa-call-dot"></i>CALL</span><span><i class="dot yokosawa-fold-dot"></i>FOLD</span>';
  document.getElementById('rangeGrid').innerHTML=ranks.flatMap((_,row)=>ranks.map((__,col)=>{
    const hand=handLabel(row,col),tier=yokosawaTierByHand[hand]||'fold';
    const action=yokosawaFacingThreeBetAction(tier,game,threshold);
    return `<button class="hand-cell yokosawa-response-cell yokosawa-action-${action}" title="${hand}：${YOKOSAWA_TIER_META[tier].label} → ${yokosawaActionLabel(action)}">${hand}<small>${yokosawaActionLabel(action)}</small></button>`;
  })).join('');
  document.getElementById('rangeHint').textContent='自分のオープン下限より2ランク強い色を相手の3BET下限と推定。同ランク・1ランク上はコール、2ランク以上上は4BET、下はフォールドです。';
  document.getElementById('rangeAssumptionContent').innerHTML=`<dl>
    <div><dt>自分の範囲</dt><dd>${YOKOSAWA_TIER_META[effective].label}までオープン</dd></div>
    <div><dt>相手の推定</dt><dd>${YOKOSAWA_TIER_META[opponent].label}以上で3BET</dd></div>
    <div><dt>コール</dt><dd>相手の下限と同じ色、または1ランク強い色</dd></div>
    <div><dt>4BET</dt><dd>相手の下限より2ランク以上強い色</dd></div>
    <div><dt>フォールド</dt><dd>相手の推定3BET下限より弱い色</dd></div>
  </dl><p>サイズ、ポジション、レーキ、ICMを省略した初心者向け簡易判断です。</p>`;
}
function renderYokosawaRange(){
  renderYokosawaControls();
  const game=uiState.yokosawaGame||'ring';
  const situation=uiState.yokosawaSituation||'firstIn';
  const threshold=uiState.yokosawaThreshold||'green';
  document.getElementById('rangePositionTabs').classList.add('hidden');
  if(situation==='facing3bet')renderYokosawaFacingThreeBet(game,threshold);
  else renderYokosawaFirstIn(game,threshold);
}

function rangeScenario(){
  if(currentRangeGame==='ring')return {gameLabel:'リング',stackLabel:'100BB',context:'6-max・100BBの学習用固定レンジ',positions:['UTG','HJ','CO','BTN','SB'],rfi:ranges,defense:bbDefenseRanges,source:'Poker Mate学習用固定レンジ（ソルバー出力ではありません）'};
  if(currentRangeGame==='headsup'){const stack=currentHeadsUpStack,action=headsUpActionConfig[stack];return {gameLabel:'ヘッズアップ',stackLabel:`${stack}BB`,context:`BTN/SB対BB・${stack}BB・基準アクション ${action.label}`,positions:['BTN'],rfi:headsUpRfiRanges[stack],defense:headsUpBbDefenseRanges[stack],rfiAction:action,source:'Poker Mate学習用ヘッズアップ簡易モデル（リンプ・混合頻度を単純化）'};}
  const stack=currentTournamentStack;return {gameLabel:'トーナメント',stackLabel:`${stack}BB`,context:`${uiState.rangeTableSize}-max・${uiState.rangeAnte==='bb'?'BBアンティ':'アンティなし'}・${uiState.rangeIcm==='chip'?'chipEV':uiState.rangeIcm==='bubble'?'バブル補正':'FT補正'}`,positions:['UTG','HJ','CO','BTN','SB'],rfi:tournamentRfiRanges[stack],defense:tournamentBbDefenseRanges[stack],rfiAction:tournamentActionForStack(stack),source:'Poker Mate学習用トーナメント簡易モデル（100〜60BBと条件差は補間・簡易補正）'};
}
function rangeScenarioKey(){const stack=currentRangeGame==='ring'?'100':currentRangeGame==='headsup'?currentHeadsUpStack:currentTournamentStack;return [currentRangeGame,stack,currentRangeMode,currentRangePosition,uiState.rangeTableSize,uiState.rangeAnte,uiState.rangeIcm,uiState.rangeOpenSize].join('|');}
function rangeFrequencyForHand(hand,active){const custom=rangeFrequencyStore[rangeScenarioKey()]?.[hand];return Number.isFinite(custom)?custom:(active?100:0);}
function cycleRangeFrequency(hand,active){const key=rangeScenarioKey(),cur=rangeFrequencyForHand(hand,active),seq=[0,25,50,75,100],next=seq[(seq.indexOf(cur)+1)%seq.length];rangeFrequencyStore[key]||={};rangeFrequencyStore[key][hand]=next;saveRangeFrequencyStore();}

function pokerMateDefenseUsesAllIn(){
  if(currentRangeGame==='tournament')return Number(currentTournamentStack)<=15;
  if(currentRangeGame==='headsup')return Number(currentHeadsUpStack)<=15;
  return false;
}
function pokerMateAggressiveAction(){
  return pokerMateDefenseUsesAllIn()
    ?{className:'shove',label:'オールイン',dotClass:'shove'}
    :{className:'threebet',label:'3BET',dotClass:'threebet'};
}

function renderRangeAssumptions(s){const a=[];if(currentRangeGame!=='headsup'&&uiState.rangeTableSize==='9')a.push('9-max向けに下位境界を約8%タイト化');if(currentRangeGame==='tournament'&&uiState.rangeAnte==='none')a.push('アンティなしとして約5%タイト化');if(currentRangeGame==='tournament'&&uiState.rangeIcm==='bubble')a.push('バブル簡易補正');if(currentRangeGame==='tournament'&&uiState.rangeIcm==='final')a.push('FT簡易補正');if(currentRangeMode==='bb'&&num(uiState.rangeOpenSize)!==2.5)a.push(`${uiState.rangeOpenSize}BBオープン向けにディフェンス幅を簡易補正`);document.getElementById('rangeAssumptionContent').innerHTML=`<dl><div><dt>基準データ</dt><dd>${esc(s.source)}</dd></div><div><dt>現在の前提</dt><dd>${esc(s.context)}${currentRangeMode==='bb'?`・相手${uiState.rangeOpenSize}BBオープン`:''}</dd></div><div><dt>補正</dt><dd>${a.length?esc(a.join('／')):'なし（基準条件）'}</dd></div><div><dt>混合頻度</dt><dd>${rangeFrequencyEdit?'セルをタップして0→25→50→75→100%で編集できます。':'既定値は0%または100%。頻度編集で自分のソルバー値を登録できます。'}</dd></div></dl><p>GTOソルバーの生データではありません。レーキ、ICM、相手傾向で実戦レンジは変わります。</p>`;}
function renderRangeGrid(){
 const source=uiState.rangeSource||'pokerMate';
 document.querySelectorAll('[data-range-source]').forEach(button=>button.classList.toggle('active',button.dataset.rangeSource===source));
 document.getElementById('pokerMateRangeControls').classList.toggle('hidden',source!=='pokerMate');
 document.getElementById('yokosawaRangeControls').classList.toggle('hidden',source!=='yokosawa');
 document.getElementById('yokosawaAttribution').classList.toggle('hidden',source!=='yokosawa');
 document.getElementById('yokosawaThreshold').value=uiState.yokosawaThreshold||'green';
 if(source==='yokosawa'){renderYokosawaRange();return;}
 document.getElementById('rangePositionTabs').classList.remove('hidden');
 const s=rangeScenario();if(!s.positions.includes(currentRangePosition)){currentRangePosition=s.positions[0];updateUiState({rangePosition:currentRangePosition});}
 document.querySelectorAll('[data-range-game]').forEach(b=>b.classList.toggle('active',b.dataset.rangeGame===currentRangeGame));document.getElementById('tournamentStackSelector').classList.toggle('hidden',currentRangeGame!=='tournament');document.getElementById('headsUpStackSelector').classList.toggle('hidden',currentRangeGame!=='headsup');document.querySelectorAll('[data-tournament-stack]').forEach(b=>b.classList.toggle('active',b.dataset.tournamentStack===currentTournamentStack));document.querySelectorAll('[data-headsup-stack]').forEach(b=>b.classList.toggle('active',b.dataset.headsupStack===currentHeadsUpStack));document.querySelectorAll('[data-range-mode]').forEach(b=>b.classList.toggle('active',b.dataset.rangeMode===currentRangeMode));
 document.querySelectorAll('[data-position]').forEach(b=>{const p=b.dataset.position,v=s.positions.includes(p);b.classList.toggle('hidden',!v);b.classList.toggle('active',v&&p===currentRangePosition);b.textContent=currentRangeGame==='headsup'&&p==='BTN'?(currentRangeMode==='bb'?'vs BTN/SB':'BTN/SB'):(currentRangeMode==='bb'?`vs ${p}`:p);});
 const tour=currentRangeGame==='tournament';document.getElementById('rangeTableSizeField').classList.toggle('hidden',currentRangeGame==='headsup');document.getElementById('rangeAnteField').classList.toggle('hidden',!tour);document.getElementById('rangeIcmField').classList.toggle('hidden',!tour);document.getElementById('rangeOpenSizeField').classList.toggle('hidden',currentRangeMode!=='bb');['rangeTableSize','rangeAnte','rangeIcm','rangeOpenSize'].forEach(id=>document.getElementById(id).value=uiState[id]||({rangeTableSize:'6',rangeAnte:'bb',rangeIcm:'chip',rangeOpenSize:'2.5'}[id]));document.getElementById('toggleRangeFrequencyEdit').classList.toggle('active',rangeFrequencyEdit);document.getElementById('rangeFrequencyStatus').textContent=rangeFrequencyEdit?'頻度編集モード':'固定レンジ表示';document.getElementById('rangePositionTabs').classList.toggle('headsup-position-tabs',currentRangeGame==='headsup');
 const title=document.getElementById('rangePageTitle'),legend=document.getElementById('rangeLegend'),hint=document.getElementById('rangeHint'),contextBadge=document.getElementById('rangeContextBadge'),actionBadge=document.getElementById('rangeActionBadge'),contextDescription=document.getElementById('rangeContextDescription');contextBadge.textContent=`${s.gameLabel}・${s.stackLabel}`;contextDescription.textContent=s.context;document.querySelector('[data-range-mode="rfi"]').textContent=currentRangeGame==='headsup'?'BTN/SBアクション':'オープンレンジ';const action=currentRangeMode==='rfi'?s.rfiAction:{type:'defense',label:`VS OPEN ${uiState.rangeOpenSize}BB`};actionBadge.classList.toggle('hidden',!action);actionBadge.classList.toggle('shove',action?.type==='shove');actionBadge.textContent=action?.type==='defense'?action.label:action?.type==='shove'?'ALL-IN':action?.type==='mixed'?'OPEN / ALL-IN':action?.type==='open'&&currentRangeGame==='headsup'?`OPEN ${stripNumberZeros(action.size,1)}BB`:action?.label||'';
 const adj=currentRangeAdjustment();
 if(currentRangeMode==='rfi'){
  title.textContent=currentRangeGame==='ring'?'リング RFIレンジ表':currentRangeGame==='headsup'?(s.rfiAction.type==='shove'?`ヘッズアップ ${currentHeadsUpStack}BB BTN/SB オールイン`:`ヘッズアップ ${currentHeadsUpStack}BB BTN/SB ${s.rfiAction.label}`):`トーナメント ${currentTournamentStack}BB ${s.rfiAction.label}`;
  const set=adjustSetByPercent(s.rfi[currentRangePosition]||new Set(),adj),cls=currentRangeGame==='headsup'?(s.rfiAction.type==='shove'?'hu-shove':'hu-open'):(s.rfiAction?.type==='shove'?'hu-shove':'open');legend.innerHTML=currentRangeGame==='tournament'&&s.rfiAction.type==='mixed'?'<span><i class="dot open"></i>2BBオープン／オールイン混合</span><span><i class="dot fold"></i>フォールド</span>':currentRangeGame==='tournament'&&s.rfiAction.type==='shove'?'<span><i class="dot hu-shove-dot"></i>オールイン候補</span><span><i class="dot fold"></i>フォールド</span>':`<span><i class="dot ${cls==='hu-shove'?'hu-shove-dot':'open'}"></i>${currentRangeGame==='headsup'?s.rfiAction.label:'参加'}</span><span><i class="dot fold"></i>フォールド</span>`;hint.textContent=currentRangeGame==='tournament'&&s.rfiAction.type==='mixed'?'15BBはミンレイズとオールインが混在する参加候補です。':currentRangeGame==='tournament'&&s.rfiAction.type==='shove'?'10BBは主にオールイン候補です。ICMで調整してください。':'条件変更時は境界ハンドを簡易補正します。';
  document.getElementById('rangeGrid').innerHTML=ranks.flatMap((_,r)=>ranks.map((__,c)=>{const hand=handLabel(r,c),base=set.has(hand),freq=rangeFrequencyForHand(hand,base),active=freq>0,fl=freq>0&&freq<100?`<small>${freq}%</small>`:'';return `<button class="hand-cell ${active?cls:''} ${fl?'mixed-frequency':''}" data-range-hand="${hand}" data-default-active="${base?1:0}" style="--range-frequency:${freq/100}" title="${hand}：${freq}%">${hand}${fl}</button>`;})).join('');
 }else{
  title.textContent=currentRangeGame==='ring'?'リング BBディフェンス':currentRangeGame==='headsup'?`ヘッズアップ ${currentHeadsUpStack}BB BBディフェンス`:`トーナメント ${currentTournamentStack}BB BBディフェンス`;
  const aggressive=pokerMateAggressiveAction();
  legend.innerHTML=`<span><i class="dot ${aggressive.dotClass}"></i>${aggressive.label}</span><span><i class="dot call"></i>コール</span><span><i class="dot fold"></i>フォールド</span>`;
  hint.textContent=pokerMateDefenseUsesAllIn()
    ?`相手の${uiState.rangeOpenSize}BBオープンを想定。赤はオールイン、黄はコールです。`
    :`相手の${uiState.rangeOpenSize}BBオープンを想定。青は3BET、黄はコールです。`;
  const d=adjustDefenseForOpenSize(s.defense[currentRangePosition]||{threebet:new Set(),call:new Set()});
  document.getElementById('rangeGrid').innerHTML=ranks.flatMap((_,r)=>ranks.map((__,c)=>{
    const hand=handLabel(r,c);
    const baseAction=d.threebet.has(hand)?aggressive.className:d.call.has(hand)?'call':'';
    const base=Boolean(baseAction);
    const freq=rangeFrequencyForHand(hand,base);
    const act=freq>0?(baseAction||'call'):'';
    const fl=freq>0&&freq<100?`<small>${freq}%</small>`:'';
    const actionLabel=act===aggressive.className?aggressive.label:act==='call'?'コール':'フォールド';
    return `<button class="hand-cell ${act} ${fl?'mixed-frequency':''}" data-range-hand="${hand}" data-default-active="${base?1:0}" style="--range-frequency:${freq/100}" title="${hand}：${actionLabel} ${freq}%">${hand}${fl}</button>`;
  })).join('');
 }
 renderRangeAssumptions(s);
}
document.querySelectorAll('[data-range-source]').forEach(button=>button.addEventListener('click',()=>{
  updateUiState({rangeSource:button.dataset.rangeSource});
  renderRangeGrid();
}));
document.querySelectorAll('[data-yokosawa-game]').forEach(button=>button.addEventListener('click',()=>{
  updateUiState({yokosawaGame:button.dataset.yokosawaGame});
  renderRangeGrid();
}));
document.querySelectorAll('[data-yokosawa-situation]').forEach(button=>button.addEventListener('click',()=>{
  const patch={yokosawaSituation:button.dataset.yokosawaSituation};
  if(button.dataset.yokosawaSituation==='facing3bet'&&(uiState.yokosawaThreshold||'green')==='pink')patch.yokosawaThreshold='purple';
  updateUiState(patch);
  renderRangeGrid();
}));
document.getElementById('yokosawaThreshold').addEventListener('change',()=>{
  updateUiState({yokosawaThreshold:document.getElementById('yokosawaThreshold').value});
  renderRangeGrid();
});
document.querySelectorAll('[data-range-game]').forEach(b=>b.addEventListener('click',()=>{currentRangeGame=b.dataset.rangeGame;if(currentRangeGame==='headsup')currentRangePosition='BTN';updateUiState({rangeGame:currentRangeGame,rangePosition:currentRangePosition});renderRangeGrid();}));document.querySelectorAll('[data-tournament-stack]').forEach(b=>b.addEventListener('click',()=>{currentTournamentStack=b.dataset.tournamentStack;updateUiState({tournamentStack:currentTournamentStack});renderRangeGrid();}));document.querySelectorAll('[data-headsup-stack]').forEach(b=>b.addEventListener('click',()=>{currentHeadsUpStack=b.dataset.headsupStack;updateUiState({headsUpStack:currentHeadsUpStack});renderRangeGrid();}));document.querySelectorAll('[data-range-mode]').forEach(b=>b.addEventListener('click',()=>{currentRangeMode=b.dataset.rangeMode;updateUiState({rangeMode:currentRangeMode});renderRangeGrid();}));document.querySelectorAll('[data-position]').forEach(b=>b.addEventListener('click',()=>{if(b.classList.contains('hidden'))return;currentRangePosition=b.dataset.position;updateUiState({rangePosition:currentRangePosition});renderRangeGrid();}));['rangeTableSize','rangeAnte','rangeIcm','rangeOpenSize'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{updateUiState({[id]:document.getElementById(id).value});renderRangeGrid();}));document.getElementById('toggleRangeFrequencyEdit').addEventListener('click',()=>{rangeFrequencyEdit=!rangeFrequencyEdit;updateUiState({rangeFrequencyEdit});renderRangeGrid();});document.getElementById('resetRangeFrequency').addEventListener('click',()=>{delete rangeFrequencyStore[rangeScenarioKey()];saveRangeFrequencyStore();renderRangeGrid();showToast('現在の条件の頻度をリセットしました');});document.getElementById('rangeGrid').addEventListener('click',e=>{const cell=e.target.closest('[data-range-hand]');if(!cell||!rangeFrequencyEdit)return;cycleRangeFrequency(cell.dataset.rangeHand,cell.dataset.defaultActive==='1');renderRangeGrid();});
