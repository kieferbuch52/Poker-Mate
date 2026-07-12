'use strict';

/** Poker Mate v9.0.0 — 90-data.js */
function updateLossLimitStatus(){
  const limit=num(state.settings.lossLimit),todayProfit=state.sessions.filter(s=>s.date===today()).reduce((a,s)=>a+sessionProfitBase(s),0);
  const el=document.getElementById('lossLimitStatus');if(!el)return;
  if(!limit){el.textContent='0の場合、損失上限の警告は表示しません。';return;}
  el.textContent=todayProfit<=-limit?`本日の収支は ${signed(todayProfit,state.settings.baseCurrency)}。設定した損失上限に到達しています。`:`本日の収支 ${signed(todayProfit,state.settings.baseCurrency)}／損失上限 ${fmt(limit,state.settings.baseCurrency)}`;
  el.className=`hint ${todayProfit<=-limit?'negative':''}`;
}

function downloadBlob(filename,content,type){
  const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),anchor=document.createElement('a');anchor.href=url;anchor.download=filename;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function formatBackupTime(value){return value?new Date(value).toLocaleString('ja-JP'):'未実施';}

const FIREBASE_CONFIG_KEY='pokerMateFirebaseConfigV1';
let currentAuthUser=null;
function loadFirebaseConfig(){try{const value=JSON.parse(localStorage.getItem(FIREBASE_CONFIG_KEY));return value&&typeof value==='object'?value:{};}catch(error){return {};}}
function firebaseConfigIsComplete(config){return Boolean(config.apiKey&&config.authDomain&&config.projectId&&config.appId);}
function populateFirebaseConfigForm(){
 const config=loadFirebaseConfig(),map={firebaseApiKey:'apiKey',firebaseAuthDomain:'authDomain',firebaseProjectId:'projectId',firebaseAppId:'appId',firebaseSenderId:'messagingSenderId',firebaseStorageBucket:'storageBucket'};
 Object.entries(map).forEach(([id,key])=>document.getElementById(id).value=config[key]||'');
}
function authInitials(user){const name=user?.displayName||user?.email||'G';return name.trim().slice(0,1).toUpperCase()||'G';}
function renderAuthState(detail={}){
 const configured=Boolean(detail.configured);currentAuthUser=detail.user||null;const signedIn=Boolean(currentAuthUser);
 const badge=document.getElementById('authStatusBadge');badge.textContent=signedIn?'ログイン中':configured?'ログアウト中':'未設定';badge.className=`summary-badge ${signedIn?'positive':configured?'':'warning'}`;
 document.getElementById('accountDisplayName').textContent=signedIn?(currentAuthUser.displayName||'Googleユーザー'):configured?'Googleログインを利用できます':'Googleログイン未設定';
 document.getElementById('accountEmail').textContent=signedIn?(currentAuthUser.email||'メール非公開'):configured?'ボタンからログインしてください':'Firebase設定後にログインできます';
 document.getElementById('googleSignInBtn').disabled=!configured||signedIn;document.getElementById('googleSignInBtn').classList.toggle('hidden',signedIn);document.getElementById('googleSignOutBtn').classList.toggle('hidden',!signedIn);
 const initials=authInitials(currentAuthUser),photo=signedIn&&currentAuthUser.photoURL?`url("${currentAuthUser.photoURL}")`:'';
 for(const id of ['accountAvatar','headerUserAvatar']){const el=document.getElementById(id);el.textContent=initials;el.style.backgroundImage=photo;el.classList.toggle('has-photo',Boolean(photo));}
 document.getElementById('headerUserLabel').textContent=signedIn?(currentAuthUser.displayName||'ログイン中'):'未ログイン';
}
document.getElementById('saveFirebaseConfigBtn').addEventListener('click',()=>{
 const config={apiKey:document.getElementById('firebaseApiKey').value.trim(),authDomain:document.getElementById('firebaseAuthDomain').value.trim(),projectId:document.getElementById('firebaseProjectId').value.trim(),appId:document.getElementById('firebaseAppId').value.trim(),messagingSenderId:document.getElementById('firebaseSenderId').value.trim(),storageBucket:document.getElementById('firebaseStorageBucket').value.trim()};
 if(!firebaseConfigIsComplete(config)){alert('API Key、Auth Domain、Project ID、App IDは必須です。');return;}
 localStorage.setItem(FIREBASE_CONFIG_KEY,JSON.stringify(config));location.reload();
});
document.getElementById('clearFirebaseConfigBtn').addEventListener('click',()=>{if(!confirm('この端末に保存したFirebase接続設定を削除しますか？'))return;localStorage.removeItem(FIREBASE_CONFIG_KEY);location.reload();});
document.getElementById('googleSignInBtn').addEventListener('click',async()=>{try{await window.PokerMateAuth?.signIn();}catch(error){alert(`Googleログインに失敗しました。\n${error.message}`);}});
document.getElementById('googleSignOutBtn').addEventListener('click',async()=>{try{await window.PokerMateAuth?.signOut();}catch(error){alert(`ログアウトに失敗しました。\n${error.message}`);}});
window.addEventListener('poker-mate-auth-state',event=>renderAuthState(event.detail));
window.addEventListener('poker-mate-auth-error',event=>{renderAuthState({configured:firebaseConfigIsComplete(loadFirebaseConfig()),user:null});console.warn('Poker Mate auth:',event.detail);});

function renderBackupStatus(){
  const backups=loadAutoBackups();
  const latest=backups[0];
  const manual=state.meta?.lastManualBackupAt;
  const overdue=!manual||Date.now()-new Date(manual).getTime()>14*24*60*60*1000;
  document.getElementById('backupStatus').innerHTML=`
    <div><span>最新の自動バックアップ</span><strong>${latest?formatBackupTime(latest.createdAt):'まだありません'}</strong></div>
    <div><span>最終JSON書き出し</span><strong class="${overdue?'negative':''}">${formatBackupTime(manual)}</strong></div>
    ${overdue?'<p>JSONバックアップを14日以上書き出していません。</p>':''}`;
  document.getElementById('restoreAutoBackupBtn').disabled=!latest;
}
function csvSafe(value){const text=String(value??'');return /^[=+\-@]/.test(text)?`'${text}`:text;}
document.getElementById('exportJsonBtn').addEventListener('click',()=>{
  state.meta.lastManualBackupAt=new Date().toISOString();saveState({backup:false});
  downloadBlob(`poker-mate-backup-${today()}.json`,JSON.stringify(state,null,2),'application/json');renderBackupStatus();
});
document.getElementById('exportCsvBtn').addEventListener('click',()=>{
  const header=['date','start_time','end_time','type','venue','currency','stakes_or_tournament','hours','reentry_count','expense_transport','expense_food','expense_lodging','expense_tips','expense_other','profit_local','fx_rate','profit_base','notes'];
  const rows=state.sessions.map(session=>{
    const venue=venueById(session.venueId);
    const expenses=normalizeExpenseBreakdown(session.expenseBreakdown,session.expenses);
    return [session.date,session.startTime||'',session.endTime||'',session.type,venue?.name||'',venue?.currency||'',session.type==='cash'?session.stakes:session.tournamentName,session.hours,session.reentryCount||0,expenses.transport,expenses.food,expenses.lodging,expenses.tips,expenses.other,session.profitLocal,session.fxRate,session.profitBase,session.notes];
  });
  const csv=[header,...rows].map(row=>row.map(value=>`"${csvSafe(value).replace(/"/g,'""')}"`).join(',')).join('\n');
  downloadBlob(`poker-mate-sessions-${today()}.csv`,`\uFEFF${csv}`,'text/csv;charset=utf-8');
});
document.getElementById('importBtn').addEventListener('click',()=>document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    let candidate;
    if(data&&Array.isArray(data.sessions))candidate=normalizeState(data);
    else throw new Error('セッション配列がありません');
    const audit=auditStateData(candidate);
    if(audit.errors.length)throw new Error(`読み込みを中止しました。\n${audit.errors.slice(0,8).join('\n')}`);
    const summary=`店舗 ${candidate.venues.length}件\nセッション ${candidate.sessions.length}件\nチップ取引 ${candidate.chipTransactions.length}件\n警告 ${audit.warnings.length}件`;
    if(!confirm(`次のバックアップを読み込みます。現在のデータは自動保存されます。\n\n${summary}\n\n続行しますか？`))return;
    createAutoBackup('before-import',true);state=candidate;saveState({backup:false});renderAll();resetSessionForm();renderBackupStatus();showToast('検証済みバックアップを読み込みました');
  }catch(error){alert(`読み込みに失敗しました。\n${error.message}`);}
  event.target.value='';
});
document.getElementById('restoreAutoBackupBtn').addEventListener('click',()=>{
  const latest=loadAutoBackups()[0];if(!latest)return;
  if(!confirm(`${formatBackupTime(latest.createdAt)} の自動バックアップへ戻しますか？\n現在の状態も退避します。`))return;
  createAutoBackup('before-auto-restore',true);state=normalizeState(latest.state);saveState({backup:false});renderAll();resetSessionForm();renderBackupStatus();showToast('自動バックアップを復元しました');
});
document.getElementById('runIntegrityCheckBtn').addEventListener('click',()=>{
  const audit=auditStateData(state),box=document.getElementById('integrityResult');box.classList.remove('hidden');
  box.innerHTML=audit.ok&&audit.warnings.length===0?'<strong class="positive">問題は見つかりませんでした。</strong>':`<strong class="${audit.errors.length?'negative':''}">エラー ${audit.errors.length}件・警告 ${audit.warnings.length}件</strong>${[...audit.errors,...audit.warnings].length?`<ul>${[...audit.errors,...audit.warnings].slice(0,20).map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:''}`;
});
document.getElementById('resetBtn').addEventListener('click',()=>{
  if(!confirm('すべてのデータを削除します。削除前の状態は自動バックアップへ退避します。'))return;
  createAutoBackup('before-reset',true);state=initialState();saveState({backup:false});renderAll();resetSessionForm();resetVenueForm();renderBackupStatus();showToast('全データを削除しました');
});

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;document.getElementById('installBtn').classList.remove('hidden')});
document.getElementById('installBtn').addEventListener('click',async()=>{
  if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;document.getElementById('installBtn').classList.add('hidden');
});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
