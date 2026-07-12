const CONFIG_KEY='pokerMateFirebaseConfigV1';
const FIREBASE_VERSION='11.10.0';
function loadConfig(){
 try{const local=JSON.parse(localStorage.getItem(CONFIG_KEY));if(local?.apiKey&&local?.authDomain&&local?.projectId&&local?.appId)return local;}catch(error){}
 const bundled=window.POKER_MATE_FIREBASE_CONFIG;
 return bundled?.apiKey&&bundled?.authDomain&&bundled?.projectId&&bundled?.appId?bundled:null;
}
function publicUser(user){return user?{uid:user.uid,displayName:user.displayName||'',email:user.email||'',photoURL:user.photoURL||''}:null;}
function emit(configured,user=null){window.dispatchEvent(new CustomEvent('poker-mate-auth-state',{detail:{configured,user:publicUser(user)}}));}
function fail(error){window.dispatchEvent(new CustomEvent('poker-mate-auth-error',{detail:{code:error?.code||'auth/unknown',message:error?.message||String(error)}}));}
const config=loadConfig();
if(!config){window.PokerMateAuth={configured:false,signIn:async()=>{throw new Error('Firebase接続設定が未入力です。');},signOut:async()=>{}};emit(false,null);}
else{
 try{
  const appModule=await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`);
  const authModule=await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`);
  const firebaseApp=appModule.initializeApp(config),auth=authModule.getAuth(firebaseApp);auth.useDeviceLanguage();
  await authModule.setPersistence(auth,authModule.browserLocalPersistence);
  const provider=new authModule.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});
  try{await authModule.getRedirectResult(auth);}catch(error){fail(error);}
  window.PokerMateAuth={configured:true,signIn:async()=>window.matchMedia('(max-width: 700px)').matches?authModule.signInWithRedirect(auth,provider):authModule.signInWithPopup(auth,provider),signOut:async()=>authModule.signOut(auth),getUser:()=>publicUser(auth.currentUser)};
  authModule.onAuthStateChanged(auth,user=>emit(true,user));
 }catch(error){window.PokerMateAuth={configured:true,signIn:async()=>{throw error;},signOut:async()=>{}};fail(error);}
}
