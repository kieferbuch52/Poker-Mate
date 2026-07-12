'use strict';

/** Poker Mate v9.0.0 — 10-config.js */
const APP_VERSION = '9.0.0';
const APP_CHANGELOG = [
  {
    version:'9.0.0',
    title:'コード構成を全面的に再設計',
    current:true,
    changes:[
      '3,600行超の単一app.jsを機能別の10モジュールへ分割',
      '設定・状態管理・ホーム・収支・レンジ・計算ツール・UI部品・データ管理を分離',
      'app.jsを起動処理専用の小さなブートストラップへ変更',
      '起動時の例外と未処理Promiseを捕捉するエラー境界を追加',
      '開発者向けのPokerMateDebug診断APIを追加',
      'モジュール読込順をmodule-order.jsonで一元管理',
      '保存キーとスキーマを変更せず既存データ互換性を維持',
      'モジュール構成・読込順・バンドル生成の自動テストを追加'
    ]
  },
  {
    version:'8.1.1',
    title:'オッズ・PN・レンジ配色の調整',
    current:false,
    changes:[
      'ベットにコールのプリセットと早見表へ1/4 potを追加',
      'パワーナンバーからFirst inの入力と適用外判定を削除',
      'パワーナンバーはchipEVとICM参考値のみを表示',
      'Poker Mateレンジの3BETを青色で表示',
      '15BB以下のオールインを赤色で表示',
      'BBディフェンスの凡例と説明を3BET／オールインで切り替え'
    ]
  },
  {
    version:'8.1.0',
    title:'ヨコサワ式のゲーム別・3BET対応',
    current:false,
    changes:[
      'ヨコサワ式へリングとトーナメントの切り替えを追加',
      'トーナメントではアンティゲーム向けに基準色を1ランク広げて表示',
      'ヨコサワ式へFirst inと3BETされた場面の切り替えを追加',
      '3BETされた場面で4BET・CALL・FOLDをハンド別に表示',
      '自分のオープン下限から相手の3BET下限を推定して表示',
      'トーナメント表示は40BB以上向けであることを明記',
      '25BB以下ではPoker Mateトーナメントレンジを案内'
    ]
  },
  {
    version:'8.0.0',
    title:'UI整理・ヨコサワ式レンジ・Google認証',
    current:false,
    changes:[
      'ヘッダーへ現在ページ名とGoogleアカウント表示を追加',
      'ホームのクイック操作を6項目へ整理',
      '表示密度・アニメーション・固定タブ設定を追加',
      'レンジをPoker Mate式とヨコサワ式で切り替え可能に変更',
      '世界のヨコサワ公開レンジの色ランクを独自グリッドとして再構成',
      '後ろの人数別に参加候補を強調する機能を追加',
      'Firebase Authenticationによる任意のGoogleログインを追加',
      'Googleログインはユーザー識別のみとし、データは端末内保存を継続'
    ]
  },
  {
    version:'7.0.0',
    title:'ポーカーツールの精度と適用条件を刷新',
    current:false,
    changes:[
      'レンジへ卓人数・アンティ・ICM・相手オープンサイズの条件設定を追加',
      'レンジの基準データと簡易補正内容を画面内へ明記',
      'ハンドごとの0・25・50・75・100%頻度編集を追加',
      '15BBと10BBトーナメントの基準アクションを明確化',
      'オッズ計算へレーキ率と上限を追加',
      'アウツ計算へ危険アウツの差し引きを追加',
      'パワーナンバーへFirst inとICM適用条件を追加',
      '勝率計算へ相手レンジ・レンジ対レンジ・3人ポットを追加',
      '完全計算の対応条件と概算計算量を表示'
    ]
  },
  {
    version:'6.1.3',
    title:'ヘッズアップの基準アクションを明示',
    current:false,
    changes:[
      'ヘッズアップの各スタックにオープンまたはオールインを明記',
      '40BB・30BBを2.5BBオープンとして表示',
      '25BBを2.3BB、20BBを2.2BB、15BBを2.0BBオープンとして表示',
      '10BB・5BBをオールインレンジとして表示',
      'オープンとオールインをレンジ表の色で区別',
      'BBディフェンスにも想定する相手のオープンサイズを表示'
    ]
  },
  {
    version:'6.1.2',
    title:'ヘッズアップをショートスタック中心に再設計',
    current:false,
    changes:[
      'ヘッズアップのスタックを40・30・25・20・15・10・5BBへ変更',
      'ヘッズアップの初期スタックを20BBへ変更',
      'トーナメントとヘッズアップのスタック選択状態を分離',
      '30BB・20BB・5BBのBTN/SB参加候補を追加',
      '30BB・20BB・5BBのBBディフェンスを追加',
      '15BB以下では青色を主にオールイン候補として表示'
    ]
  },
  {
    version:'6.1.1',
    title:'ヘッズアップの有効スタック拡張',
    current:false,
    changes:[
      'ヘッズアップでも有効スタック選択を表示',
      '100・80・60・40・25・15・10BBの7段階に対応',
      '各スタックのBTN/SBオープンレンジを追加',
      '各スタックのBBディフェンスレンジを追加',
      '15BB・10BBでは3ベット表示を主にオールイン候補として表示'
    ]
  },
  {
    version:'6.1.0',
    title:'ヘッズアップとスタック別レンジの拡張',
    current:false,
    changes:[
      'レンジのゲーム形式へヘッズアップを追加',
      'ヘッズアップ100BBのBTN/SBオープンレンジを追加',
      'ヘッズアップ100BBのBBディフェンスレンジを追加',
      'トーナメント有効スタックへ100BB・80BB・60BB・10BBを追加',
      'トーナメントを100・80・60・40・25・15・10BBの7段階へ拡張',
      'ヘッズアップ時はポジション表示をBTN/SBへ自動切り替え'
    ]
  },
  {
    version:'6.0.0',
    title:'収支分析とセッション計測の拡張',
    current:false,
    changes:[
      '開始・一時停止・再開・終了に対応したセッションタイマーを追加',
      '開始時刻・終了時刻と日またぎのプレー時間計算を追加',
      '経費を交通・飲食・宿泊・チップ・その他に分類',
      'リングのステークス別成績を追加',
      '店舗別に勝率・平均時間・最大勝ち負け・直近10回を追加',
      'MTTのITM率・FT率・優勝回数・ABI・リエントリー率を追加',
      '現在のドローダウンと最大ドローダウンを追加',
      '月次・年次レポートを追加',
      '保存データをスキーマv6へ移行'
    ]
  },
  {
    version:'5.2.1',
    title:'アウツ代表例と勝率ラベル配置の修正',
    current:false,
    changes:[
      'アウツ候補を画像の代表例8種類へ変更',
      'ドロー候補を複数選択から単一選択へ変更',
      '15・12・9・8・4・3・2・1アウツをワンタップで反映',
      'Player 1・自分のラベルを左揃えへ変更'
    ]
  },
  {
    version:'5.2.0',
    title:'アウツ選択とカード配置の改善',
    current:false,
    changes:[
      'アウツ計算のStreetと最終アウツを1行のコンパクト入力へ変更',
      'FD・OESD・Gut・Pair・Trips・Quadsを複数選択しアウツへ自動反映',
      '重複アウツを最終アウツ欄で手動補正できる構成を追加',
      'ベットにコールのプリセットへ2x potを追加',
      '勝率計算で自分と相手のハンドをボードより上へ移動',
      'パワーナンバーの初期ハンドを未選択へ変更'
    ]
  },
  {
    version:'5.1.0',
    title:'オッズ早見表とPN入力配置の改善',
    current:false,
    changes:[
      'ベットにコールではベットサイズ別の必要勝率表を表示',
      'レイズにコールではレイズサイズ別の必要勝率表を表示',
      '選択中のオッズモードに合わせて表題・列・説明を自動切り替え',
      'パワーナンバーのStack・SB・BB・Ante・後人数をスマホでも1行表示'
    ]
  },
  {
    version:'5.0.0',
    title:'データ信頼性と台帳構造の刷新',
    current:false,
    changes:[
      '日付をUTCではなく端末の現地日付で保存するよう修正',
      '店舗チップ残高を購入・換金・セッション台帳から自動計算する方式へ変更',
      'セッション時のチップ資金源を保有チップ・現金・同時購入から選択可能に変更',
      'データスキーマv5と旧データ自動移行を追加',
      '保存前検証、インポート検証、データ整合性診断を追加',
      '端末内自動バックアップと復元を追加',
      'ハンド評価・オッズ・日付・チップ台帳の自動テストを追加',
      'オッズ入力を1行へ圧縮し、モード別の必要勝率早見表を追加'
    ]
  },
  {
    version:'4.4.0',
    title:'PN画面圧縮とオッズ結果統一',
    current:false,
    changes:[
      'パワーナンバーの条件入力5項目をコンパクトな1〜2段へ整理',
      '自分のハンド選択を小型カード2枚の横並びへ変更',
      'M値・必要PN・ハンドPN・判定を帯状に集約',
      'パワーナンバー表がより早く画面へ表示されるよう余白を削減',
      'ベットにコールとレイズにコールの結果表示を同じ構成へ統一'
    ]
  },
  {
    version:'4.3.0',
    title:'設定・数値入力・ツール再編',
    current:false,
    changes:[
      'リングステークス候補と基本設定を別パネルへ分離',
      '基準通貨とセッション損失上限を設定画面下部へ移動',
      '数値候補の100や500が1や5になる不具合を修正',
      'ベット対応と対レイズをオッズ計算へ統合',
      'アウト表記をアウツへ変更',
      '計算ツールを4つのコンパクトな1行メニューへ変更'
    ]
  },
  {
    version:'4.2.0',
    title:'完全勝率計算とPN可視化',
    current:false,
    changes:[
      '勝率計算からモンテカルロ法を廃止し、残りカードの全組み合わせを完全列挙',
      '重い計算をWeb Workerへ分離し、進捗表示と中止ボタンを追加',
      '勝ち・引き分け・負けの正確な組み合わせ数を表示',
      'パワーナンバー表を5段階の色で表示',
      '必要PN以上のハンドを白枠で強調し、該当ハンド数を表示'
    ]
  },
  {
    version:'4.1.0',
    title:'リング・トーナメントレンジ',
    current:false,
    changes:[
      'レンジ画面にリング／トーナメント切り替えを追加',
      'トーナメントで40BB・25BB・15BBの有効スタックを選択可能に変更',
      '各スタックのRFIレンジとBBディフェンスレンジを追加',
      '選択したゲーム形式・スタック・場面・ポジションを端末に保存',
      '15BBのBBディフェンスは3ベット表示をオールイン候補として表示'
    ]
  },
  {
    version:'4.0.0',
    title:'UI・利用動線の全面改修',
    current:false,
    changes:[
      'ホームをダッシュボード化し、クイック操作・資金・今月収支・チップ総額を集約',
      'よく使う操作へどの画面からでも移動できるクイックボタンを追加',
      '収支履歴へ店舗・種別・キーワード検索と集計を追加',
      '最後に使った店舗・ステークス・種別を次回入力へ引き継ぐよう改善',
      '店舗一覧とチップ取引を分離し、店舗カードから購入・換金へ直接移動可能に変更',
      '計算ツールを説明付きのランチャーカードへ刷新',
      'その他画面を振り返り・バンクロール・設定の3画面へ整理',
      '収支グラフに30日・90日・今年・全期間の切り替えを追加'
    ]
  },
  {
    version:'3.6.0',
    title:'ドラッグ並び替えと表示修正',
    current:false,
    changes:[
      'リングステークス候補をドラッグ＆ドロップで並び替え可能に変更',
      'ホームの直近セッションから編集・削除できない不具合を修正',
      'TTPやVEなど店舗ポイントを小数点なしの整数表示へ統一'
    ]
  },
  {
    version:'3.5.2',
    title:'ステークス並び替え',
    current:false,
    changes:[
      '設定画面でリングステークス候補を上下に並び替え可能に変更',
      '保存した並び順をリング収支入力の選択肢へ反映',
      '先頭と末尾では移動できないボタンを自動的に無効化'
    ]
  },
  {
    version:'3.5.1',
    title:'同額ブラインド対応',
    current:false,
    changes:[
      'SBとBBが同額のステークスを登録可能に変更',
      '5／5を初期候補へ追加',
      'ステークス入力時のチェックをBB≧SBへ修正'
    ]
  },
  {
    version:'3.5.0',
    title:'ステークス設定と折りたたみ',
    current:false,
    changes:[
      '設定画面でリングのSB／BB候補を自由に追加・削除可能に変更',
      'リング収支入力では設定済みの組み合わせから選択',
      '各画面の入力パネルに開閉ボタンを追加',
      '入力パネルの開閉状態を端末に保存'
    ]
  },
  {
    version:'3.4.0',
    title:'入力操作とレンジ表示改善',
    current:false,
    changes:[
      '169ハンドのレンジ表を横スクロールなしで画面内に表示',
      'すべての数値欄をタップ式の数値入力パネルへ変更',
      '用途別の候補値、増減ボタン、テンキーを追加',
      'リングのステークスをSB／BBの選択式へ変更'
    ]
  },
  {
    version:'3.3.0',
    title:'バージョン履歴',
    current:false,
    changes:[
      'バージョン表示をタップできるボタンへ変更',
      'これまでのアップデート内容を確認できる履歴ウィンドウを追加',
      'ヘッダーと設定画面のどちらからでも履歴を開けるように改善'
    ]
  },
  {
    version:'3.2.0',
    title:'カード選択と計算ツール改善',
    changes:[
      '店舗チップ購入時に店舗を選べない不具合を修正',
      '対レイズ必要勝率ツールの動作を修正',
      '勝率計算をカード一覧から選択する画面へ刷新',
      'パワーナンバーの自分のハンドも実カードから選択可能に変更',
      '更新後に古い画面が残りにくいキャッシュ方式へ改善'
    ]
  },
  {
    version:'3.1.0',
    title:'店舗チップ取引',
    changes:[
      '店舗で現金購入したチップを記録する機能を追加',
      'チップの換金と取引履歴を追加',
      '購入・換金を店舗チップ残高へ自動反映'
    ]
  },
  {
    version:'3.0.0',
    title:'勝率・レンジ機能拡張',
    changes:[
      'アプリ内にバージョン表示を追加',
      'ヘッズアップ勝率計算を追加',
      'BBディフェンスレンジを追加',
      'レイズされたときの必要勝率表を追加',
      'パワーナンバーのハンド選択を改善'
    ]
  },
  {
    version:'2.0.0',
    title:'資金管理とドロー計算',
    changes:[
      'バンクロール管理を追加',
      '入金・出金の履歴管理を追加',
      'リングのバイイン数とMTT参加可能回数を表示',
      'アウト数・ドロー勝率計算ツールを追加'
    ]
  },
  {
    version:'1.0.0',
    title:'初期リリース',
    changes:[
      'リング・トーナメントの収支管理とグラフ表示',
      '店舗別成績とチップ残高管理',
      'RFIハンドレンジ表とパワーナンバー表',
      'ベット額ごとの必要勝率ツール',
      'ハンドメモ、JSONバックアップ、CSV出力、オフライン対応'
    ]
  }
];
const STORAGE_KEY = 'pokerMateDataV1';
const AUTO_BACKUP_KEY = 'pokerMateAutoBackupsV1';
const DATA_SCHEMA_VERSION = 6;
const AUTO_BACKUP_INTERVAL_MS = 24*60*60*1000;
const ranks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const cardSuits = [{key:'s',symbol:'♠'},{key:'h',symbol:'♥'},{key:'d',symbol:'♦'},{key:'c',symbol:'♣'}];
const DEFAULT_RING_STAKES = [
  '0.5/1','1/2','1/3','2/5','5/5','5/10','10/20','10/25','20/40','25/50',
  '50/100','100/200','200/400','250/500','500/1000','1000/2000',
  '2000/5000','5000/10000','10000/20000'
];
const COLLAPSE_STORAGE_KEY = 'pokerMateCollapseV1';
const UI_STORAGE_KEY = 'pokerMateUiV2';

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


function adjustedRange(base,add=[],remove=[]){
  const result=new Set(base||[]);
  add.forEach(hand=>result.add(hand));
  remove.forEach(hand=>result.delete(hand));
  return result;
}

const tournamentRfiRanges = {
  '40': {
    UTG:adjustedRange(ranges.UTG,
      ['44','A4s','A5s','K9s','Q9s','J9s','T8s','87s','76s']),
    HJ:adjustedRange(ranges.HJ,
      ['33','A2s','A3s','A4s','K8s','Q8s','J8s','97s','76s','65s']),
    CO:adjustedRange(ranges.CO,
      ['A2o','A3o','A4o','A5o','A6o','A7o','K5s','K6s','Q7s','J7s','T7s','96s','86s','75s','64s','53s','43s']),
    BTN:adjustedRange(ranges.BTN,
      ['K2o','K3o','K4o','K5o','K6o','Q7o','Q8o','J8o','T8o','95s','85s','84s','74s','64s','53s','43s','32s']),
    SB:adjustedRange(ranges.SB,
      ['K2o','K3o','K4o','K5o','K6o','K7o','Q7o','Q8o','J8o','T8o','98o','87o','76o','65o','43s','32s'])
  },
  '25': {
    UTG:adjustedRange(ranges.UTG,
      ['22','33','44','A2s','A3s','A4s','A5s','A6s','A7s','ATo','K9s','Q9s','J9s','T8s'],
      ['76s']),
    HJ:adjustedRange(ranges.HJ,
      ['22','33','A2s','A3s','A4s','A8o','A9o','K8s','Q8s','J8s','T8s','97s','76s','65s'],
      ['54s']),
    CO:adjustedRange(ranges.CO,
      ['A2o','A3o','A4o','A5o','A6o','A7o','K6s','K9o','Q7s','Q9o','J7s','J9o','T7s','T9o','96s','86s','75s','64s','53s'],
      ['54s']),
    BTN:adjustedRange(ranges.BTN,
      ['K2o','K3o','K4o','K5o','K6o','Q7o','Q8o','J8o','T8o','95s','85s','84s','74s','64s','53s','43s','32s']),
    SB:adjustedRange(ranges.SB,
      ['K2o','K3o','K4o','K5o','K6o','K7o','Q7o','Q8o','J8o','T8o','98o','87o','76o','65o','54o','43s','32s'])
  },
  '15': {
    UTG:new Set([
      '22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA',
      'A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs',
      'A9o','ATo','AJo','AQo','AKo','KTs','KJs','KQs','KQo','QTs','QJs','JTs','T9s'
    ]),
    HJ:new Set([
      '22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA',
      'A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs',
      'A8o','A9o','ATo','AJo','AQo','AKo','K9s','KTs','KJs','KQs','KJo','KQo',
      'QTs','QJs','QJo','J9s','JTs','T9s','98s'
    ]),
    CO:new Set([
      '22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA',
      'A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs',
      'A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo',
      'K7s','K8s','K9s','KTs','KJs','KQs','KTo','KJo','KQo',
      'Q8s','Q9s','QTs','QJs','QTo','QJo','J8s','J9s','JTs','JTo',
      'T8s','T9s','97s','98s','87s','76s','65s'
    ]),
    BTN:new Set([
      '22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA',
      'A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs',
      'A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo',
      'K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs',
      'K7o','K8o','K9o','KTo','KJo','KQo',
      'Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','Q9o','QTo','QJo',
      'J7s','J8s','J9s','JTs','J9o','JTo','T7s','T8s','T9s','T9o',
      '97s','98s','87s','76s','65s','54s'
    ]),
    SB:new Set([
      '22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA',
      'A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs',
      'A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo',
      'K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs',
      'K5o','K6o','K7o','K8o','K9o','KTo','KJo','KQo',
      'Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','Q8o','Q9o','QTo','QJo',
      'J7s','J8s','J9s','JTs','J8o','J9o','JTo',
      'T7s','T8s','T9s','T8o','T9o','97s','98s','87s','76s','65s','54s','43s'
    ])
  }
};


const bbDefenseRanges = {
  UTG: {
    threebet:new Set(['QQ','KK','AA','AKs','AKo','A5s']),
    call:new Set(['22','33','44','55','66','77','88','99','TT','JJ','A2s','A3s','A4s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AJo','AQo','K9s','KTs','KJs','KQs','KQo','Q9s','QTs','QJs','J9s','JTs','T9s','98s','87s','76s','65s'])
  },
  HJ: {
    threebet:new Set(['JJ','QQ','KK','AA','AQs','AKs','AKo','A4s','A5s']),
    call:new Set(['22','33','44','55','66','77','88','99','TT','A2s','A3s','A6s','A7s','A8s','A9s','ATs','AJs','ATo','AJo','AQo','K8s','K9s','KTs','KJs','KQs','KJo','KQo','Q8s','Q9s','QTs','QJs','QJo','J8s','J9s','JTs','T8s','T9s','97s','98s','86s','87s','76s','65s','54s'])
  },
  CO: {
    threebet:new Set(['TT','JJ','QQ','KK','AA','AJs','AQs','AKs','AQo','AKo','A2s','A3s','A4s','A5s','KQs']),
    call:new Set(['22','33','44','55','66','77','88','99','A6s','A7s','A8s','A9s','ATs','A8o','A9o','ATo','AJo','K6s','K7s','K8s','K9s','KTs','KJs','KTo','KJo','KQo','Q7s','Q8s','Q9s','QTs','QJs','QTo','QJo','J7s','J8s','J9s','JTs','JTo','T7s','T8s','T9s','96s','97s','98s','85s','86s','87s','75s','76s','65s','54s','43s'])
  },
  BTN: {
    threebet:new Set(['99','TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','AJo','AQo','AKo','A2s','A3s','A4s','A5s','KJs','KQs','KQo','QJs','JTs']),
    call:new Set(['22','33','44','55','66','77','88','A6s','A7s','A8s','A9s','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','K7o','K8o','K9o','KTo','KJo','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','Q9o','QTo','QJo','J6s','J7s','J8s','J9s','J9o','JTo','T6s','T7s','T8s','T9s','T9o','96s','97s','98s','98o','85s','86s','87s','75s','76s','64s','65s','54s','43s'])
  },
  SB: {
    threebet:new Set(['88','99','TT','JJ','QQ','KK','AA','A9s','ATs','AJs','AQs','AKs','ATo','AJo','AQo','AKo','A2s','A3s','A4s','A5s','KTs','KJs','KQs','KQo','QJs','JTs','T9s']),
    call:new Set(['22','33','44','55','66','77','A6s','A7s','A8s','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','K5o','K6o','K7o','K8o','K9o','KTo','KJo','Q2s','Q3s','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','Q8o','Q9o','QTo','QJo','J3s','J4s','J5s','J6s','J7s','J8s','J9s','J8o','J9o','JTo','T4s','T5s','T6s','T7s','T8s','T8o','T9o','95s','96s','97s','98s','98o','85s','86s','87s','87o','74s','75s','76s','64s','65s','53s','54s','43s','32s'])
  }
};

const tournamentBbDefenseRanges = {
  '40': {
    UTG:{
      threebet:adjustedRange(bbDefenseRanges.UTG.threebet,['JJ','AQs','AQo','A4s']),
      call:adjustedRange(bbDefenseRanges.UTG.call,['K8s','Q8s','J8s','T8s','97s'],['65s'])
    },
    HJ:{
      threebet:adjustedRange(bbDefenseRanges.HJ.threebet,['TT','AQo','A3s']),
      call:adjustedRange(bbDefenseRanges.HJ.call,['A9o','K7s','Q7s','T7s'],['54s'])
    },
    CO:{
      threebet:adjustedRange(bbDefenseRanges.CO.threebet,['99','ATs','AJo','KJs']),
      call:adjustedRange(bbDefenseRanges.CO.call,['A7o','K9o','Q9o','J9o','T9o','74s'],['43s'])
    },
    BTN:{
      threebet:adjustedRange(bbDefenseRanges.BTN.threebet,['88','A9s','ATo','KTs','QTs']),
      call:adjustedRange(bbDefenseRanges.BTN.call,['K6o','Q8o','J8o','T8o','76o','65s','54s'],[])
    },
    SB:{
      threebet:adjustedRange(bbDefenseRanges.SB.threebet,['77','A8s','A9o','K9s','QTs']),
      call:adjustedRange(bbDefenseRanges.SB.call,['K4o','Q7o','J7o','T7o','97o','76o','65o'],[])
    }
  },
  '25': {
    UTG:{
      threebet:new Set(['88','99','TT','JJ','QQ','KK','AA','AJs','AQs','AKs','AQo','AKo','A4s','A5s','KQs']),
      call:new Set(['22','33','44','55','66','77','A2s','A3s','A6s','A7s','A8s','A9s','ATs','AJo','K9s','KTs','KJs','Q9s','QTs','QJs','J9s','JTs','T9s','98s'])
    },
    HJ:{
      threebet:new Set(['77','88','99','TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','AJo','AQo','AKo','A4s','A5s','KQs']),
      call:new Set(['22','33','44','55','66','A2s','A3s','A6s','A7s','A8s','A9s','A9o','ATo','K8s','K9s','KTs','KJs','KJo','Q8s','Q9s','QTs','QJs','J8s','J9s','JTs','T8s','T9s','98s','87s'])
    },
    CO:{
      threebet:new Set(['66','77','88','99','TT','JJ','QQ','KK','AA','A9s','ATs','AJs','AQs','AKs','ATo','AJo','AQo','AKo','A2s','A3s','A4s','A5s','KTs','KJs','KQs','KQo','QJs']),
      call:new Set(['22','33','44','55','A6s','A7s','A8s','A7o','A8o','A9o','K7s','K8s','K9s','KTo','KJo','Q7s','Q8s','Q9s','QTs','QJo','J7s','J8s','J9s','JTs','JTo','T7s','T8s','T9s','97s','98s','87s','76s'])
    },
    BTN:{
      threebet:new Set(['55','66','77','88','99','TT','JJ','QQ','KK','AA','A7s','A8s','A9s','ATs','AJs','AQs','AKs','A9o','ATo','AJo','AQo','AKo','A2s','A3s','A4s','A5s','K9s','KTs','KJs','KQs','KJo','KQo','QTs','QJs','JTs']),
      call:new Set(['22','33','44','A6s','A2o','A3o','A4o','A5o','A6o','A7o','A8o','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K7o','K8o','K9o','KTo','Q5s','Q6s','Q7s','Q8s','Q9s','Q9o','QTo','QJo','J6s','J7s','J8s','J9s','J9o','JTo','T6s','T7s','T8s','T9s','T9o','97s','98s','87s','76s','65s'])
    },
    SB:{
      threebet:new Set(['44','55','66','77','88','99','TT','JJ','QQ','KK','AA','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','A8o','A9o','ATo','AJo','AQo','AKo','K9s','KTs','KJs','KQs','KTo','KJo','KQo','QTs','QJs','JTs']),
      call:new Set(['22','33','A2s','A3s','A4s','A2o','A3o','A4o','A5o','A6o','A7o','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K5o','K6o','K7o','K8o','K9o','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','Q8o','Q9o','QTo','J5s','J6s','J7s','J8s','J9s','J8o','J9o','JTo','T6s','T7s','T8s','T9s','T8o','T9o','97s','98s','87s','76s','65s','54s'])
    }
  },
  '15': {
    UTG:{
      threebet:new Set(['77','88','99','TT','JJ','QQ','KK','AA','AJs','AQs','AKs','AQo','AKo','A4s','A5s','KQs']),
      call:new Set(['22','33','44','55','66','A2s','A3s','A6s','A7s','A8s','A9s','ATs','AJo','KTs','KJs','QTs','QJs','JTs','T9s'])
    },
    HJ:{
      threebet:new Set(['66','77','88','99','TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','AJo','AQo','AKo','A4s','A5s','KQs']),
      call:new Set(['22','33','44','55','A2s','A3s','A6s','A7s','A8s','A9s','A9o','ATo','K9s','KTs','KJs','KJo','Q9s','QTs','QJs','J9s','JTs','T9s','98s'])
    },
    CO:{
      threebet:new Set(['55','66','77','88','99','TT','JJ','QQ','KK','AA','A8s','A9s','ATs','AJs','AQs','AKs','ATo','AJo','AQo','AKo','A2s','A3s','A4s','A5s','KTs','KJs','KQs','KQo','QJs']),
      call:new Set(['22','33','44','A6s','A7s','A7o','A8o','A9o','K8s','K9s','KTo','KJo','Q8s','Q9s','QTs','QJo','J8s','J9s','JTs','JTo','T8s','T9s','98s','87s'])
    },
    BTN:{
      threebet:new Set(['44','55','66','77','88','99','TT','JJ','QQ','KK','AA','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','A8o','A9o','ATo','AJo','AQo','AKo','K9s','KTs','KJs','KQs','KTo','KJo','KQo','QTs','QJs','QJo','JTs']),
      call:new Set(['22','33','A2s','A3s','A4s','A2o','A3o','A4o','A5o','A6o','A7o','K5s','K6s','K7s','K8s','K7o','K8o','K9o','Q7s','Q8s','Q9s','Q9o','QTo','J7s','J8s','J9s','J9o','JTo','T7s','T8s','T9s','T9o','98s','87s','76s'])
    },
    SB:{
      threebet:new Set(['22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo','K7s','K8s','K9s','KTs','KJs','KQs','K9o','KTo','KJo','KQo','Q9s','QTs','QJs','QTo','QJo','JTs','T9s']),
      call:new Set(['K2s','K3s','K4s','K5s','K6s','K5o','K6o','K7o','K8o','Q5s','Q6s','Q7s','Q8s','Q8o','Q9o','J6s','J7s','J8s','J9s','J8o','J9o','JTo','T7s','T8s','T9s','T8o','T9o','97s','98s','87s','76s','65s'])
    }
  }
};



function cloneRangeSet(value){
  return new Set(value||[]);
}
function rangeWithout(base,remove=[]){
  return adjustedRange(base,[],remove);
}
function cloneDefenseRange(base,{addThreebet=[],removeThreebet=[],addCall=[],removeCall=[]}={}){
  const threebet=adjustedRange(base?.threebet,addThreebet,removeThreebet);
  const call=adjustedRange(base?.call,addCall,[...removeCall,...threebet]);
  return {threebet,call};
}

/*
 * Deep-stack tournament ranges are intentionally interpolated around the
 * existing 40BB model. They are learning references rather than solver output.
 */
tournamentRfiRanges['100']={
  UTG:adjustedRange(ranges.UTG,['44','A5s','K9s','Q9s','J9s','T8s','87s']),
  HJ:adjustedRange(ranges.HJ,['33','A2s','A3s','A4s','K8s','Q8s','J8s','97s','76s']),
  CO:adjustedRange(ranges.CO,['A2o','A3o','A4o','A5o','A6o','A7o','K6s','Q7s','J7s','T7s','96s','86s','75s','64s']),
  BTN:adjustedRange(ranges.BTN,['K2o','K3o','K4o','K5o','Q7o','Q8o','J8o','T8o','95s','85s','74s','64s','53s','43s']),
  SB:adjustedRange(ranges.SB,['K2o','K3o','K4o','K5o','K6o','Q7o','Q8o','J8o','T8o','98o','87o','76o','65o'])
};
tournamentRfiRanges['80']={
  UTG:adjustedRange(tournamentRfiRanges['100'].UTG,['A4s','76s']),
  HJ:adjustedRange(tournamentRfiRanges['100'].HJ,['65s']),
  CO:adjustedRange(tournamentRfiRanges['100'].CO,['K5s','53s']),
  BTN:adjustedRange(tournamentRfiRanges['100'].BTN,['K6o','84s','32s']),
  SB:adjustedRange(tournamentRfiRanges['100'].SB,['K7o','43s','32s'])
};
tournamentRfiRanges['60']={
  UTG:adjustedRange(tournamentRfiRanges['80'].UTG,['A3s']),
  HJ:adjustedRange(tournamentRfiRanges['80'].HJ,['22','A8o']),
  CO:adjustedRange(tournamentRfiRanges['80'].CO,['K9o','Q9o','J9o','T9o']),
  BTN:adjustedRange(tournamentRfiRanges['80'].BTN,['Q6o','J7o','T7o','75s']),
  SB:adjustedRange(tournamentRfiRanges['80'].SB,['Q6o','J7o','T7o','54o'])
};
tournamentRfiRanges['10']={
  UTG:adjustedRange(tournamentRfiRanges['15'].UTG,['A8o','K9s'],['T9s']),
  HJ:adjustedRange(tournamentRfiRanges['15'].HJ,['A7o','K9o','QJo']),
  CO:adjustedRange(tournamentRfiRanges['15'].CO,['A2o','A3o','A4o','K5s','K6s','K9o','Q7s','Q9o','J7s','J9o','T7s','T9o','97s','87s','76s']),
  BTN:adjustedRange(tournamentRfiRanges['15'].BTN,['K2o','K3o','K4o','K5o','K6o','Q7o','Q8o','J8o','T8o','96s','86s','75s','65s']),
  SB:adjustedRange(tournamentRfiRanges['15'].SB,['K2o','K3o','K4o','Q5o','Q6o','Q7o','J7o','T7o','97o','86s','75s','64s','53s','43s','32s'])
};

tournamentBbDefenseRanges['100']={
  UTG:cloneDefenseRange(bbDefenseRanges.UTG,{addThreebet:['JJ','AQs','AQo','A4s'],addCall:['K8s','Q8s','J8s','T8s','97s']}),
  HJ:cloneDefenseRange(bbDefenseRanges.HJ,{addThreebet:['TT','AQo','A3s'],addCall:['A9o','K7s','Q7s','T7s']}),
  CO:cloneDefenseRange(bbDefenseRanges.CO,{addThreebet:['99','ATs','AJo','KJs'],addCall:['A7o','K9o','Q9o','J9o','T9o','74s']}),
  BTN:cloneDefenseRange(bbDefenseRanges.BTN,{addThreebet:['88','A9s','ATo','KTs','QTs'],addCall:['K6o','Q8o','J8o','T8o','76o','65s','54s']}),
  SB:cloneDefenseRange(bbDefenseRanges.SB,{addThreebet:['77','A8s','A9o','K9s','QTs'],addCall:['K4o','Q7o','J7o','T7o','97o','76o','65o']})
};
tournamentBbDefenseRanges['80']={
  UTG:cloneDefenseRange(tournamentBbDefenseRanges['100'].UTG,{addCall:['96s','86s']}),
  HJ:cloneDefenseRange(tournamentBbDefenseRanges['100'].HJ,{addThreebet:['99'],addCall:['K8o','97s','87s']}),
  CO:cloneDefenseRange(tournamentBbDefenseRanges['100'].CO,{addThreebet:['A9s'],addCall:['A6o','K8o','Q8o','J8o']}),
  BTN:cloneDefenseRange(tournamentBbDefenseRanges['100'].BTN,{addThreebet:['77','A8s'],addCall:['K5o','Q7o','J7o','T7o','65o']}),
  SB:cloneDefenseRange(tournamentBbDefenseRanges['100'].SB,{addThreebet:['66','A7s'],addCall:['K3o','Q6o','J6o','T6o','86o']})
};
tournamentBbDefenseRanges['60']={
  UTG:cloneDefenseRange(tournamentBbDefenseRanges['80'].UTG,{addThreebet:['TT'],addCall:['A9o','K9o']}),
  HJ:cloneDefenseRange(tournamentBbDefenseRanges['80'].HJ,{addThreebet:['88','ATs'],addCall:['A8o','K7o','Q8o']}),
  CO:cloneDefenseRange(tournamentBbDefenseRanges['80'].CO,{addThreebet:['88','ATo'],addCall:['A5o','K7o','Q7o','T8o']}),
  BTN:cloneDefenseRange(tournamentBbDefenseRanges['80'].BTN,{addThreebet:['66','A7s'],addCall:['K4o','Q6o','J6o','T6o','54o']}),
  SB:cloneDefenseRange(tournamentBbDefenseRanges['80'].SB,{addThreebet:['55','A6s'],addCall:['K2o','Q5o','J5o','T5o','75o']})
};
tournamentBbDefenseRanges['10']={
  UTG:cloneDefenseRange(tournamentBbDefenseRanges['15'].UTG,{addThreebet:['66','ATs','AJo','KQs'],removeCall:['22','33','T9s']}),
  HJ:cloneDefenseRange(tournamentBbDefenseRanges['15'].HJ,{addThreebet:['55','A9s','ATo','KJs'],removeCall:['22','98s']}),
  CO:cloneDefenseRange(tournamentBbDefenseRanges['15'].CO,{addThreebet:['44','A7s','A9o','KTs','QJs'],removeCall:['22','33','87s']}),
  BTN:cloneDefenseRange(tournamentBbDefenseRanges['15'].BTN,{addThreebet:['22','33','A2s','A3s','A4s','A7o','K8s','QJs'],removeCall:['76s']}),
  SB:cloneDefenseRange(tournamentBbDefenseRanges['15'].SB,{addThreebet:['K5s','K6s','K7o','Q8s','J9s','T9s'],removeCall:['65s']})
};

const allStartingHands=new Set(ranks.flatMap((_,row)=>ranks.map((__,col)=>{
  if(row===col)return ranks[row]+ranks[col];
  return row<col?`${ranks[row]}${ranks[col]}s`:`${ranks[col]}${ranks[row]}o`;
})));
function rangeFromBlacklist(remove=[]){
  return rangeWithout(allStartingHands,remove);
}

/*
 * Heads-up is focused on the transition from standard play to short-stack
 * play: 40 / 30 / 25 / 20 / 15 / 10 / 5BB.
 * RFI means a simplified "continue candidate" that combines raise, limp,
 * and shove frequencies into one learnable table.
 */

const headsUpActionConfig={
  '40':{type:'open',size:2.5,label:'2.5BBオープン'},
  '30':{type:'open',size:2.5,label:'2.5BBオープン'},
  '25':{type:'open',size:2.3,label:'2.3BBオープン'},
  '20':{type:'open',size:2.2,label:'2.2BBオープン'},
  '15':{type:'open',size:2.0,label:'2.0BBオープン'},
  '10':{type:'shove',size:null,label:'オールイン'},
  '5':{type:'shove',size:null,label:'オールイン'}
};

const headsUpRfiRanges={
  '40':{BTN:rangeFromBlacklist([
    '32o','42o','52o','62o','72o','82o','92o',
    'T2o','J2o','Q2o','32s'
  ])},
  '30':{BTN:rangeFromBlacklist([
    '32o','42o','52o','62o','72o','82o','92o',
    'T2o','J2o'
  ])},
  '25':{BTN:rangeFromBlacklist([
    '32o','42o','52o','62o','72o','82o','92o','T2o'
  ])},
  '20':{BTN:rangeFromBlacklist([
    '32o','42o','52o','62o','72o','82o','92o'
  ])},
  '15':{BTN:rangeFromBlacklist([
    '32o','42o','52o','62o','72o','82o'
  ])},
  '10':{BTN:rangeFromBlacklist([
    '32o','42o','52o','62o'
  ])},
  '5':{BTN:cloneRangeSet(allStartingHands)}
};

const headsUpThreebet40=new Set([
  '33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA',
  'A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs',
  'A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo',
  'K6s','K7s','K8s','K9s','KTs','KJs','KQs',
  'K9o','KTo','KJo','KQo',
  'Q7s','Q8s','Q9s','QTs','QJs','QTo','QJo',
  'J8s','J9s','JTs','T8s','T9s','98s','87s'
]);
const headsUpThreebet30=adjustedRange(headsUpThreebet40,[
  '22','A2o','A3o','A4o','K5s','K8o','Q8o','J7s','J9o','T8o','97s'
]);
const headsUpThreebet25=adjustedRange(headsUpThreebet30,[
  'K4s','K7o','Q7o','J8o','T7s','T9o','96s','86s'
]);
const headsUpThreebet20=adjustedRange(headsUpThreebet25,[
  'K2s','K3s','K6o','Q6s','Q9o','J6s','T7o','97o','76s'
]);

const headsUpShove15=new Set([
  '22','33','44','55','66','77','88','99','TT','JJ','QQ','KK','AA',
  'A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs',
  'A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo',
  'K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs',
  'K8o','K9o','KTo','KJo','KQo',
  'Q8s','Q9s','QTs','QJs','QTo','QJo',
  'J8s','J9s','JTs','JTo','T8s','T9s','98s','87s'
]);
const headsUpShove10=adjustedRange(headsUpShove15,[
  'K2s','K3s','K4s','K5o','K6o','K7o',
  'Q5s','Q6s','Q7s','Q8o','Q9o',
  'J6s','J7s','J8o','J9o',
  'T6s','T7s','T8o','T9o',
  '97s','97o','86s','76s','65s'
]);
const headsUpShove5=adjustedRange(headsUpShove10,[
  'K2o','K3o','K4o','K5o','K6o','K7o',
  'Q2s','Q3s','Q4s','Q5s','Q6s','Q7s','Q8o','Q9o',
  'J4s','J5s','J6s','J7s','J8o','J9o',
  'T5s','T6s','T7s','T8o','T9o',
  '96s','97s','97o','85s','86s','75s','76s','65s','54s'
]);

// At 10BB and 5BB the displayed BTN/SB table is explicitly a shove range.
headsUpRfiRanges['10']={BTN:cloneRangeSet(headsUpShove10)};
headsUpRfiRanges['5']={BTN:cloneRangeSet(headsUpShove5)};


function headsUpDefense(stack,aggressive,folds=[]){
  return {
    BTN:{
      threebet:aggressive,
      call:rangeWithout(headsUpRfiRanges[stack].BTN,[...aggressive,...folds])
    }
  };
}

const headsUpBbDefenseRanges={
  '40':headsUpDefense('40',headsUpThreebet40,[
    '32s','42s','52s','62s','72s','82s','92s'
  ]),
  '30':headsUpDefense('30',headsUpThreebet30,[
    '32s','42s','52s','62s','72s'
  ]),
  '25':headsUpDefense('25',headsUpThreebet25,[
    '32s','42s','52s','62s','72s'
  ]),
  '20':headsUpDefense('20',headsUpThreebet20,[
    '32s','42s','52s','62s'
  ]),
  '15':headsUpDefense('15',headsUpShove15,[
    '32s','42s','52s','62s'
  ]),
  '10':headsUpDefense('10',headsUpShove10,[
    '32s','42s'
  ]),
  '5':headsUpDefense('5',headsUpShove5,[])
};
