'use strict';

/** Poker Mate v9.0.0 — 80-components.js */
let activeNumberInput=null;
let numberDraft='0';
let numberPickerConfig=null;

const NUMBER_INPUT_CONFIGS = {
  cashHours:{step:.25,presets:[1,2,3,4,6,8],suffix:'時間'},
  tournamentHours:{step:.25,presets:[1,2,3,4,6,8],suffix:'時間'},
  tournamentField:{step:1,presets:[6,9,18,27,45,90],suffix:'人'},
  tournamentPlace:{step:1,presets:[1,2,3,4,5,9],suffix:'位'},
  tournamentReentryCount:{step:1,presets:[0,1,2,3,4,5],suffix:'回'},
  drawOuts:{step:1,presets:[4,6,8,9,12,15],suffix:'アウツ'},
  pnBehind:{step:1,presets:[1,2,3,4,5,6],suffix:'人'},
  bankrollCashTarget:{step:1,presets:[20,30,40,50,100],suffix:'BI'},
  bankrollTournamentTarget:{step:1,presets:[50,100,150,200,300],suffix:'回'},
  sessionFx:{step:.01,presets:[.1,.5,1,2,5,10]},
  venueFx:{step:.01,presets:[.1,.5,1,2,5,10]},
  oddsPot:{step:10,presets:[25,50,100,200,500]},
  oddsBet:{step:10,presets:[25,50,100,200,500]},
  oddsCall:{step:10,presets:[25,50,100,200,500]},
  raisePot:{step:10,presets:[25,50,100,200,500]},
  raiseOwnBet:{step:10,presets:[25,50,100,200,500]},
  raiseTo:{step:10,presets:[50,100,150,200,300,500]},
  pnStack:{step:1000,presets:[5000,10000,20000,30000,50000,100000]},
  pnSb:{step:100,presets:[25,50,100,200,500,1000]},
  pnBb:{step:100,presets:[50,100,200,400,1000,2000]},
  pnAnteTotal:{step:100,presets:[0,100,200,500,1000,2000]},
  ringStakeSb:{step:.5,presets:[.5,1,2,5,10,25,50,100,500,1000]},
  ringStakeBb:{step:.5,presets:[1,2,3,5,10,20,25,50,100,200,1000,2000]}
};

const MONEY_NUMBER_IDS = new Set([
  'cashBuyIn','cashOut','tournamentBuyIn','tournamentReentry','tournamentPrize',
  'expenseTransport','expenseFood','expenseLodging','expenseTips','expenseOther',
  'venueBalance','chipTransactionAmount','bankrollStarting',
  'bankrollCashBuyIn','bankrollTournamentBuyIn','bankrollTransactionAmount','lossLimit'
]);

function decimalsFromStep(step){
  const text=String(step);
  return text.includes('.')?text.split('.')[1].length:0;
}
function smartNumberConfig(input){
  const configured=NUMBER_INPUT_CONFIGS[input.id]||{};
  let step=configured.step;
  let presets=configured.presets;
  if(step===undefined){
    step=MONEY_NUMBER_IDS.has(input.id)?100:num(input.step)||1;
  }
  if(!presets&&MONEY_NUMBER_IDS.has(input.id)){
    presets=[100,500,1000,5000,10000];
  }
  const sourceStep=num(input.step)||step;
  const decimals=Math.max(decimalsFromStep(sourceStep),decimalsFromStep(step));
  return {
    step,
    presets:presets||[],
    suffix:configured.suffix||'',
    decimals,
    min:input.min===''||input.min===undefined?-Infinity:num(input.min),
    max:input.max===''||input.max===undefined?Infinity:num(input.max)
  };
}
function numberInputLabel(input){
  const label=input.closest('label');
  if(input.getAttribute('aria-label'))return input.getAttribute('aria-label');
  if(!label)return '数値を入力';
  const clone=label.cloneNode(true);
  clone.querySelectorAll('input,select,textarea,small,button').forEach(el=>el.remove());
  return clone.textContent.replace(/\s+/g,' ').trim()||'数値を入力';
}
function stripNumberZeros(value,decimals=4){
  if(!Number.isFinite(value))return '0';
  if(decimals<=0)return String(Math.round(value));
  let fixed=value.toFixed(decimals);
  if(fixed.includes('.')){
    fixed=fixed.replace(/0+$/,'').replace(/\.$/,'');
  }
  return fixed;
}
function clampNumber(value,config){
  return Math.min(config.max,Math.max(config.min,value));
}
function formattedNumberDraft(){
  const value=num(numberDraft);
  const maximum=numberPickerConfig?.decimals??2;
  return value.toLocaleString('ja-JP',{maximumFractionDigits:maximum});
}
function renderNumberPicker(){
  if(!activeNumberInput||!numberPickerConfig)return;
  document.getElementById('numberPickerValue').textContent=
    `${formattedNumberDraft()}${numberPickerConfig.suffix?` ${numberPickerConfig.suffix}`:''}`;
  document.getElementById('numberStepLabel').textContent=`±${numberPickerConfig.step}`;
  document.getElementById('numberDecimalBtn').disabled=numberPickerConfig.decimals===0;
  const presets=document.getElementById('numberPickerPresets');
  presets.innerHTML=numberPickerConfig.presets.map(value=>
    `<button type="button" data-number-preset="${value}">${Number(value).toLocaleString('ja-JP')}</button>`
  ).join('');
}
function openNumberPicker(input){
  activeNumberInput=input;
  numberPickerConfig=smartNumberConfig(input);
  numberDraft=input.value===''?'0':String(input.value).replace(/,/g,'');
  document.getElementById('numberPickerTitle').textContent=numberInputLabel(input);
  document.getElementById('numberPickerCaption').textContent='タップして入力・候補から選択';
  renderNumberPicker();
  document.getElementById('numberPickerBackdrop').classList.remove('hidden');
  document.getElementById('numberPickerSheet').classList.remove('hidden');
  document.body.classList.add('modal-open');
}
function closeNumberPicker(){
  document.getElementById('numberPickerBackdrop').classList.add('hidden');
  document.getElementById('numberPickerSheet').classList.add('hidden');
  document.body.classList.remove('modal-open');
  activeNumberInput=null;
  numberPickerConfig=null;
}
function setNumberDraft(value){
  const clamped=clampNumber(num(value),numberPickerConfig);
  numberDraft=stripNumberZeros(clamped,numberPickerConfig.decimals);
  renderNumberPicker();
}
function adjustNumberDraft(direction){
  setNumberDraft(num(numberDraft)+numberPickerConfig.step*direction);
}
function applyNumberKey(key){
  if(key==='backspace'){
    numberDraft=numberDraft.length>1?numberDraft.slice(0,-1):'0';
  }else if(key==='.'){
    if(numberPickerConfig.decimals>0&&!numberDraft.includes('.'))numberDraft+=numberDraft?' .'.trim(): '0.';
  }else{
    if(numberDraft==='0')numberDraft=key;
    else{
      const decimalPart=numberDraft.split('.')[1]||'';
      if(numberDraft.includes('.')&&decimalPart.length>=numberPickerConfig.decimals)return;
      numberDraft+=key;
    }
  }
  renderNumberPicker();
}
function commitNumberPicker(){
  if(!activeNumberInput)return;
  const value=clampNumber(num(numberDraft),numberPickerConfig);
  activeNumberInput.value=stripNumberZeros(value,numberPickerConfig.decimals);
  activeNumberInput.dispatchEvent(new Event('input',{bubbles:true}));
  activeNumberInput.dispatchEvent(new Event('change',{bubbles:true}));
  closeNumberPicker();
}
function initializeSmartNumberInputs(){
  document.querySelectorAll('input[type="number"]').forEach(input=>{
    input.readOnly=true;
    input.inputMode='none';
    input.classList.add('smart-number-input');
    input.title='タップして数値を入力';
    input.setAttribute('aria-haspopup','dialog');
    input.setAttribute('aria-controls','numberPickerSheet');
  });
}
document.addEventListener('click',event=>{
  const input=event.target.closest('input.smart-number-input');
  if(input&&!input.disabled){
    event.preventDefault();
    openNumberPicker(input);
  }
  const preset=event.target.closest('[data-number-preset]');
  if(preset&&numberPickerConfig)setNumberDraft(num(preset.dataset.numberPreset));
  const key=event.target.closest('[data-number-key]');
  if(key&&numberPickerConfig)applyNumberKey(key.dataset.numberKey);
});
document.getElementById('numberMinusBtn').addEventListener('click',()=>adjustNumberDraft(-1));
document.getElementById('numberPlusBtn').addEventListener('click',()=>adjustNumberDraft(1));
document.getElementById('clearNumberPickerBtn').addEventListener('click',()=>setNumberDraft(0));
document.getElementById('confirmNumberPickerBtn').addEventListener('click',commitNumberPicker);
document.getElementById('closeNumberPickerBtn').addEventListener('click',closeNumberPicker);
document.getElementById('numberPickerBackdrop').addEventListener('click',closeNumberPicker);
document.addEventListener('keydown',event=>{
  if(document.getElementById('numberPickerSheet').classList.contains('hidden'))return;
  if(event.key==='Escape')closeNumberPicker();
  if(/^\d$/.test(event.key))applyNumberKey(event.key);
  if(event.key==='Backspace')applyNumberKey('backspace');
  if(event.key==='Enter')commitNumberPicker();
});


function loadCollapsePreferences(){
  try{
    const parsed=JSON.parse(localStorage.getItem(COLLAPSE_STORAGE_KEY));
    return parsed&&typeof parsed==='object'?parsed:{};
  }catch(error){
    return {};
  }
}
function saveCollapsePreference(key,isOpen){
  const prefs=loadCollapsePreferences();
  prefs[key]=Boolean(isOpen);
  try{localStorage.setItem(COLLAPSE_STORAGE_KEY,JSON.stringify(prefs));}catch(error){}
}
function setCollapsibleOpen(key,isOpen,save=true){
  const target=document.querySelector(`[data-collapse-key="${key}"]`);
  if(!target)return;
  const button=target.querySelector(':scope > .collapsible-toggle');
  target.classList.toggle('is-collapsed',!isOpen);
  if(button){
    button.setAttribute('aria-expanded',String(isOpen));
    const status=button.querySelector('.collapsible-status');
    if(status)status.textContent=isOpen?'閉じる':'開く';
    const chevron=button.querySelector('.collapsible-chevron');
    if(chevron)chevron.textContent=isOpen?'⌃':'⌄';
  }
  if(save)saveCollapsePreference(key,isOpen);
}
function openCollapsible(key){
  setCollapsibleOpen(key,true);
}
function initializeCollapsibleSections(){
  const configs=[
    {selector:'#sessionForm',key:'session-input',label:'セッション入力',formLike:true},
    {selector:'#venueForm',key:'venue-input',label:'店舗情報入力',formLike:true},
    {selector:'#chipTransactionForm',key:'chip-input',label:'チップ購入・換金入力',formLike:true},
    {selector:'#oddsTool',key:'odds-input',label:'オッズ計算'},
    {selector:'#equityTool',key:'equity-input',label:'勝率計算ツール'},
    {selector:'#drawTool',key:'draw-input',label:'アウツ・ドロー計算',removeHeading:true},
    {selector:'#powerTool',key:'power-input',label:'パワーナンバーツール',removeHeading:true},
    {selector:'#handForm',key:'hand-input',label:'ハンドメモ入力',formLike:true},
    {selector:'#bankrollSettingsInput',key:'bankroll-settings',label:'バンクロール基準値',formLike:true,removeHeading:true},
    {selector:'#bankrollTransactionForm',key:'bankroll-transaction',label:'バンクロール入出金',formLike:true},
    {selector:'#ringStakeSettingsPanel',key:'stake-settings',label:'リングステークス候補'},
    {selector:'#appSettingsPanel',key:'app-settings',label:'基本設定'}
  ];
  const prefs=loadCollapsePreferences();
  configs.forEach(config=>{
    const target=document.querySelector(config.selector);
    if(!target||target.dataset.collapseReady==='true')return;
    target.dataset.collapseReady='true';
    target.dataset.collapseKey=config.key;
    target.classList.add('collapsible-container');
    if(target.classList.contains('form-panel'))target.classList.remove('form-panel');

    const body=document.createElement('div');
    body.className='collapsible-body';
    if(config.formLike)body.classList.add('form-panel');
    while(target.firstChild)body.appendChild(target.firstChild);

    if(config.removeHeading){
      const heading=[...body.children].find(child=>child.tagName==='H3');
      if(heading)heading.remove();
    }

    const button=document.createElement('button');
    button.type='button';
    button.className='collapsible-toggle';
    button.setAttribute('aria-expanded','true');
    button.innerHTML=`
      <span class="collapsible-title">
        <span class="collapsible-kicker">INPUT</span>
        <strong>${esc(config.label)}</strong>
      </span>
      <span class="collapsible-control">
        <span class="collapsible-status">閉じる</span>
        <span class="collapsible-chevron" aria-hidden="true">⌃</span>
      </span>`;
    button.addEventListener('click',()=>{
      const isOpen=button.getAttribute('aria-expanded')==='true';
      setCollapsibleOpen(config.key,!isOpen);
    });

    target.append(button,body);
    const initialOpen=Object.prototype.hasOwnProperty.call(prefs,config.key)
      ?Boolean(prefs[config.key])
      :true;
    setCollapsibleOpen(config.key,initialOpen,false);
  });
}


function openQuickActionSheet(){
  document.getElementById('quickActionBackdrop').classList.remove('hidden');
  document.getElementById('quickActionSheet').classList.remove('hidden');
  document.body.classList.add('modal-open');
}
function closeQuickActionSheet(){
  document.getElementById('quickActionBackdrop').classList.add('hidden');
  document.getElementById('quickActionSheet').classList.add('hidden');
  document.body.classList.remove('modal-open');
}
function runQuickAction(action){
  closeQuickActionSheet();
  if(action==='range'){go('ranges');return;}
  if(action==='review'){go('more');setMoreView('review');openCollapsible('hand-input');return;}
  if(action==='session'){
    go('sessions');openCollapsible('session-input');
    setTimeout(()=>document.getElementById('sessionForm').scrollIntoView({behavior:'smooth',block:'start'}),60);
  }
  if(action==='chip'){
    go('venues');setVenueView('chips');openCollapsible('chip-input');
  }
  if(action==='equity'){
    go('tools');setTool('equity');
  }
  if(action==='odds'){
    go('tools');setTool('odds');
  }
  if(action==='bankroll'){
    go('more');setMoreView('bankroll');openCollapsible('bankroll-settings');
  }
  if(action==='hand'){
    go('more');setMoreView('review');openCollapsible('hand-input');
  }
  if(action==='venue-setup'){
    go('venues');setVenueView('list');openCollapsible('venue-input');
  }
  if(action==='stake-setup'){
    go('more');setMoreView('settings');openCollapsible('stake-settings');
    setTimeout(()=>document.getElementById('ringStakeForm').scrollIntoView({behavior:'smooth',block:'center'}),80);
  }
}
document.getElementById('globalQuickButton').addEventListener('click',openQuickActionSheet);
document.getElementById('closeQuickActionBtn').addEventListener('click',closeQuickActionSheet);
document.getElementById('quickActionBackdrop').addEventListener('click',closeQuickActionSheet);
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-quick-action]');
  if(button)runQuickAction(button.dataset.quickAction);
});

function renderVersionHistory(){
  const list=document.getElementById('versionHistoryList');
  document.getElementById('currentVersionInModal').textContent=`v${APP_VERSION}`;
  list.innerHTML=APP_CHANGELOG.map((release,index)=>`
    <article class="version-release ${release.current?'current-release':''}">
      <div class="version-release-marker">
        <span></span>
        ${index<APP_CHANGELOG.length-1?'<i></i>':''}
      </div>
      <div class="version-release-content">
        <div class="version-release-heading">
          <div>
            <strong>v${release.version}</strong>
            <span>${esc(release.title)}</span>
          </div>
          ${release.current?'<em>現在</em>':''}
        </div>
        <ul>${release.changes.map(change=>`<li>${esc(change)}</li>`).join('')}</ul>
      </div>
    </article>
  `).join('');
}
function openVersionHistory(){
  renderVersionHistory();
  document.getElementById('versionHistoryBackdrop').classList.remove('hidden');
  document.getElementById('versionHistoryModal').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.getElementById('closeVersionHistoryBtn').focus();
}
function closeVersionHistory(){
  document.getElementById('versionHistoryBackdrop').classList.add('hidden');
  document.getElementById('versionHistoryModal').classList.add('hidden');
  document.body.classList.remove('modal-open');
}
document.getElementById('appVersion').addEventListener('click',openVersionHistory);
document.getElementById('settingsVersionRow').addEventListener('click',openVersionHistory);
document.getElementById('closeVersionHistoryBtn').addEventListener('click',closeVersionHistory);
document.getElementById('versionHistoryBackdrop').addEventListener('click',closeVersionHistory);
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!document.getElementById('versionHistoryModal').classList.contains('hidden')){
    closeVersionHistory();
  }
});


document.getElementById('saveDisplaySettingsBtn').addEventListener('click',()=>{
 updateUiState({uiDensity:document.getElementById('uiDensity').value,uiMotion:document.getElementById('uiMotion').value,uiStickyControls:document.getElementById('uiStickyControls').checked});
 applyUiPreferences();showToast('表示設定を保存しました');
});

function renderSettings(){
  applyUiPreferences();
  document.getElementById('appVersion').textContent=`v${APP_VERSION}`;
  document.getElementById('settingsVersion').innerHTML=`v${APP_VERSION} <span aria-hidden="true">›</span>`;
  document.getElementById('baseCurrency').value=state.settings.baseCurrency||'JPY';
  document.getElementById('lossLimit').value=state.settings.lossLimit||0;
  renderRingStakeSettings();
  updateLossLimitStatus();
  renderBackupStatus();
}
document.getElementById('saveSettingsBtn').addEventListener('click',()=>{
  const panel=document.getElementById('appSettingsPanel');clearFormError(panel);
  const currency=(document.getElementById('baseCurrency').value.trim()||'JPY').toUpperCase(),lossLimit=num(document.getElementById('lossLimit').value);
  if(!/^[A-Z0-9]{2,6}$/.test(currency))return reportFormError(panel,'基準通貨は2〜6文字の英数字にしてください。',document.getElementById('baseCurrency'));
  if(lossLimit<0)return reportFormError(panel,'損失上限は0以上にしてください。',document.getElementById('lossLimit'));
  state.settings.baseCurrency=currency;state.settings.lossLimit=lossLimit;saveState({reason:'app-settings'});renderSettings();renderHome();showToast('設定を保存しました');
});


let draggedRingStakeItem=null;
let pointerRingStakeDrag=null;

function ringStakeOrderFromDom(){
  return [...document.querySelectorAll('#ringStakeList [data-ring-stake-item]')]
    .map(item=>normalizeStakeValue(item.dataset.ringStakeItem))
    .filter(Boolean);
}
function saveRingStakeDomOrder(showMessage=true){
  const order=ringStakeOrderFromDom();
  if(!order.length)return;
  state.settings.ringStakes=order;
  saveState();
  renderRingStakeSettings();
  if(showMessage)showToast('ステークスの並び順を保存しました');
}
function clearRingStakeDragStyles(){
  document.querySelectorAll('#ringStakeList .ring-stake-item').forEach(item=>{
    item.classList.remove('is-dragging','is-drag-over');
  });
  document.body.classList.remove('ring-stake-dragging');
}
function moveRingStakeItemByPointer(item,clientY){
  const list=document.getElementById('ringStakeList');
  const siblings=[...list.querySelectorAll('.ring-stake-item:not(.is-dragging)')];
  const before=siblings.find(sibling=>{
    const rect=sibling.getBoundingClientRect();
    return clientY<rect.top+rect.height/2;
  });
  if(before)list.insertBefore(item,before);
  else list.appendChild(item);

  const edge=70;
  if(clientY<edge)window.scrollBy({top:-14,behavior:'auto'});
  else if(clientY>window.innerHeight-edge)window.scrollBy({top:14,behavior:'auto'});
}
function initializeRingStakeDragAndDrop(){
  const list=document.getElementById('ringStakeList');
  if(!list||list.dataset.dragReady==='true')return;
  list.dataset.dragReady='true';

  list.addEventListener('dragstart',event=>{
    const item=event.target.closest('[data-ring-stake-item]');
    if(!item)return;
    draggedRingStakeItem=item;
    item.classList.add('is-dragging');
    document.body.classList.add('ring-stake-dragging');
    if(event.dataTransfer){
      event.dataTransfer.effectAllowed='move';
      event.dataTransfer.setData('text/plain',item.dataset.ringStakeItem||'');
    }
  });
  list.addEventListener('dragover',event=>{
    if(!draggedRingStakeItem)return;
    event.preventDefault();
    moveRingStakeItemByPointer(draggedRingStakeItem,event.clientY);
  });
  list.addEventListener('drop',event=>{
    if(!draggedRingStakeItem)return;
    event.preventDefault();
    saveRingStakeDomOrder();
    draggedRingStakeItem=null;
    clearRingStakeDragStyles();
  });
  list.addEventListener('dragend',()=>{
    if(draggedRingStakeItem){
      saveRingStakeDomOrder(false);
      draggedRingStakeItem=null;
    }
    clearRingStakeDragStyles();
  });

  list.addEventListener('pointerdown',event=>{
    const handle=event.target.closest('[data-drag-ring-stake]');
    if(!handle||event.pointerType==='mouse')return;
    const item=handle.closest('[data-ring-stake-item]');
    if(!item)return;
    event.preventDefault();
    handle.setPointerCapture?.(event.pointerId);
    pointerRingStakeDrag={pointerId:event.pointerId,handle,item,moved:false,startY:event.clientY};
    item.classList.add('is-dragging');
    document.body.classList.add('ring-stake-dragging');
  });
  list.addEventListener('pointermove',event=>{
    if(!pointerRingStakeDrag||event.pointerId!==pointerRingStakeDrag.pointerId)return;
    event.preventDefault();
    if(Math.abs(event.clientY-pointerRingStakeDrag.startY)>4)pointerRingStakeDrag.moved=true;
    moveRingStakeItemByPointer(pointerRingStakeDrag.item,event.clientY);
  });
  const finishPointerDrag=event=>{
    if(!pointerRingStakeDrag||event.pointerId!==pointerRingStakeDrag.pointerId)return;
    event.preventDefault();
    const moved=pointerRingStakeDrag.moved;
    pointerRingStakeDrag.handle.releasePointerCapture?.(event.pointerId);
    pointerRingStakeDrag=null;
    if(moved)saveRingStakeDomOrder();
    else renderRingStakeSettings();
    clearRingStakeDragStyles();
  };
  list.addEventListener('pointerup',finishPointerDrag);
  list.addEventListener('pointercancel',finishPointerDrag);
}

document.getElementById('ringStakeForm').addEventListener('submit',event=>{
  event.preventDefault();
  const sb=num(document.getElementById('ringStakeSb').value);
  const bb=num(document.getElementById('ringStakeBb').value);
  if(sb<=0||bb<=0){
    alert('SBとBBには0より大きい値を設定してください。');
    return;
  }
  if(bb<sb){
    alert('BBはSB以上の値にしてください。');
    return;
  }
  const value=normalizeStakeValue(`${sb}/${bb}`);
  const stakes=normalizeRingStakes(state.settings.ringStakes);
  if(stakes.includes(value)){
    showToast('同じステークスは登録済みです');
    return;
  }
  state.settings.ringStakes=[...stakes,value];
  saveState();
  renderRingStakeSettings();
  document.getElementById('ringStakeSb').value=bb;
  document.getElementById('ringStakeBb').value=bb*2;
  showToast(`${formatStakeValue(value)} を追加しました`);
});
document.getElementById('ringStakeList').addEventListener('click',event=>{
  const deleteButton=event.target.closest('[data-delete-ring-stake]');
  if(!deleteButton)return;
  const value=normalizeStakeValue(deleteButton.dataset.deleteRingStake);
  state.settings.ringStakes=normalizeRingStakes(state.settings.ringStakes)
    .filter(stake=>stake!==value);
  saveState();
  renderRingStakeSettings();
  showToast(`${formatStakeValue(value)} を削除しました`);
});
document.getElementById('restoreRingStakesBtn').addEventListener('click',()=>{
  if(!confirm('リングステークス候補を初期状態に戻しますか？'))return;
  state.settings.ringStakes=[...DEFAULT_RING_STAKES];
  saveState();
  renderRingStakeSettings();
  showToast('初期候補に戻しました');
});
