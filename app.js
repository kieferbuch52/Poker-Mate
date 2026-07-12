'use strict';

const APP_VERSION = '6.1.3';
const APP_CHANGELOG = [
  {
    version:'6.1.3',
    title:'ヘッズアップの基準アクションを明示',
    current:true,
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
    rangeGame:'ring',
    tournamentStack:'25',
    headsUpStack:'20',
    rangeMode:'rfi',
    rangePosition:'UTG',
    oddsMode:'bet',
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
let equityCards = {hero:[null,null],villain:[null,null],board:[null,null,null,null,null]};
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

function showToast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(showToast.t); showToast.t=setTimeout(()=>el.classList.remove('show'),1800);
}

function go(pageId){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===pageId));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.go===pageId));
  document.body.dataset.page=pageId;
  window.scrollTo({top:0,behavior:'smooth'});
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

function handLabel(row,col){
  if(row===col)return ranks[row]+ranks[col];
  return row<col?`${ranks[row]}${ranks[col]}s`:`${ranks[col]}${ranks[row]}o`;
}
function rangeScenario(){
  if(currentRangeGame==='ring'){
    return {
      gameLabel:'リング',
      stackLabel:'100BB',
      context:'6-max・100BBの標準的な学習用レンジ',
      positions:['UTG','HJ','CO','BTN','SB'],
      rfi:ranges,
      defense:bbDefenseRanges
    };
  }
  if(currentRangeGame==='headsup'){
    const stack=currentHeadsUpStack;
    const action=headsUpActionConfig[stack];
    return {
      gameLabel:'ヘッズアップ',
      stackLabel:`${stack}BB`,
      context:`BTN/SB対BB・${stack}BB・基準アクション ${action.label}`,
      positions:['BTN'],
      rfi:headsUpRfiRanges[stack],
      defense:headsUpBbDefenseRanges[stack],
      rfiAction:action
    };
  }
  const stack=currentTournamentStack;
  return {
    gameLabel:'トーナメント',
    stackLabel:`${stack}BB`,
    context:`アンティあり・6-max・${stack}BBのchipEV学習用レンジ`,
    positions:['UTG','HJ','CO','BTN','SB'],
    rfi:tournamentRfiRanges[stack],
    defense:tournamentBbDefenseRanges[stack]
  };
}
function renderRangeGrid(){
  const scenario=rangeScenario();

  if(!scenario.positions.includes(currentRangePosition)){
    currentRangePosition=scenario.positions[0];
    updateUiState({rangePosition:currentRangePosition});
  }

  document.querySelectorAll('[data-range-game]').forEach(button=>{
    button.classList.toggle('active',button.dataset.rangeGame===currentRangeGame);
  });
  document.getElementById('tournamentStackSelector').classList.toggle('hidden',currentRangeGame!=='tournament');
  document.getElementById('headsUpStackSelector').classList.toggle('hidden',currentRangeGame!=='headsup');
  document.querySelectorAll('[data-tournament-stack]').forEach(button=>{
    button.classList.toggle('active',button.dataset.tournamentStack===currentTournamentStack);
  });
  document.querySelectorAll('[data-headsup-stack]').forEach(button=>{
    button.classList.toggle('active',button.dataset.headsupStack===currentHeadsUpStack);
  });
  document.querySelectorAll('[data-range-mode]').forEach(button=>{
    button.classList.toggle('active',button.dataset.rangeMode===currentRangeMode);
  });
  document.querySelectorAll('[data-position]').forEach(button=>{
    const position=button.dataset.position;
    const visible=scenario.positions.includes(position);
    button.classList.toggle('hidden',!visible);
    button.classList.toggle('active',visible&&position===currentRangePosition);
    if(currentRangeGame==='headsup'&&position==='BTN'){
      button.textContent=currentRangeMode==='bb'?'vs BTN/SB':'BTN/SB';
    }else{
      button.textContent=currentRangeMode==='bb'?`vs ${position}`:position;
    }
  });
  document.getElementById('rangePositionTabs').classList.toggle('headsup-position-tabs',currentRangeGame==='headsup');

  const title=document.getElementById('rangePageTitle');
  const legend=document.getElementById('rangeLegend');
  const hint=document.getElementById('rangeHint');
  const contextBadge=document.getElementById('rangeContextBadge');
  const actionBadge=document.getElementById('rangeActionBadge');
  const contextDescription=document.getElementById('rangeContextDescription');
  const rfiModeButton=document.querySelector('[data-range-mode="rfi"]');

  contextBadge.textContent=`${scenario.gameLabel}・${scenario.stackLabel}`;
  contextDescription.textContent=scenario.context;
  rfiModeButton.textContent=currentRangeGame==='headsup'?'BTN/SBアクション':'オープンレンジ';

  const headsUpAction=currentRangeGame==='headsup'?scenario.rfiAction:null;
  actionBadge.classList.toggle('hidden',!headsUpAction);
  if(headsUpAction){
    const actionText=headsUpAction.type==='shove'
      ?'ALL-IN'
      :`OPEN ${stripNumberZeros(headsUpAction.size,1)}BB`;
    actionBadge.textContent=currentRangeMode==='rfi'
      ?actionText
      :headsUpAction.type==='shove'
        ?'vs ALL-IN'
        :`vs OPEN ${stripNumberZeros(headsUpAction.size,1)}BB`;
    actionBadge.classList.toggle('shove',headsUpAction.type==='shove');
  }else{
    actionBadge.classList.remove('shove');
  }

  const activeStack=currentRangeGame==='headsup'?currentHeadsUpStack:currentTournamentStack;
  const shortStack=currentRangeGame!=='ring'&&Number(activeStack)<=15;

  if(currentRangeMode==='rfi'){
    if(currentRangeGame==='ring')title.textContent='リング RFIレンジ表';
    else if(currentRangeGame==='headsup'){
      const action=scenario.rfiAction;
      title.textContent=action.type==='shove'
        ?`ヘッズアップ ${currentHeadsUpStack}BB BTN/SB オールイン`
        :`ヘッズアップ ${currentHeadsUpStack}BB BTN/SB ${action.label}`;
    }else title.textContent=`トーナメント ${currentTournamentStack}BB RFIレンジ`;

    if(currentRangeGame==='headsup'){
      const action=scenario.rfiAction;
      legend.innerHTML=action.type==='shove'
        ?'<span><i class="dot hu-shove-dot"></i>オールイン</span><span><i class="dot fold"></i>フォールド</span>'
        :`<span><i class="dot hu-open-dot"></i>${stripNumberZeros(action.size,1)}BBオープン</span><span><i class="dot fold"></i>フォールド</span>`;
    }else{
      legend.innerHTML=shortStack
        ?'<span><i class="dot open"></i>参加候補</span><span><i class="dot fold"></i>フォールド</span>'
        :'<span><i class="dot open"></i>オープン</span><span><i class="dot fold"></i>フォールド</span>';
    }

    if(currentRangeGame==='ring'){
      hint.textContent='標準的な100BB・6-maxの学習用簡易レンジです。レーキ、相手、オープンサイズに応じて調整してください。';
    }else if(currentRangeGame==='headsup'){
      const action=scenario.rfiAction;
      hint.textContent=action.type==='shove'
        ?`${currentHeadsUpStack}BBでは、色付きのハンドをBTN/SBからオールインする簡易基準として表示しています。実戦ではリンプやミンレイズを混ぜる戦略もあります。`
        :`${currentHeadsUpStack}BBでは、色付きのハンドをBTN/SBから${action.label}する簡易基準として表示しています。実戦ではリンプや一部オールインを混ぜる戦略もあります。`;
    }else if(shortStack){
      hint.textContent=`${currentTournamentStack}BBではミンレイズとオールインが混在します。表示は参加候補の目安です。バブル・ファイナル・サテライトなどICMが強い局面では必ず調整してください。`;
    }else{
      hint.textContent=`アンティあり・${currentTournamentStack}BB・6-maxを想定したchipEVの学習用簡易レンジです。100〜60BBは既存レンジから補間した目安で、バブルや賞金ジャンプではICMに応じて調整してください。`;
    }

    const set=scenario.rfi[currentRangePosition]||new Set();
    const headsUpClass=currentRangeGame==='headsup'
      ?scenario.rfiAction.type==='shove'?'hu-shove':'hu-open'
      :'open';
    const actionTitle=currentRangeGame==='headsup'
      ?scenario.rfiAction.type==='shove'?'オールイン':scenario.rfiAction.label
      :'オープン';

    document.getElementById('rangeGrid').innerHTML=ranks.flatMap((_,row)=>ranks.map((__,col)=>{
      const hand=handLabel(row,col);
      const active=set.has(hand);
      return `<button class="hand-cell ${active?headsUpClass:''}" title="${hand}${active?`：${actionTitle}`:'：フォールド'}">${hand}</button>`;
    })).join('');
  }else{
    if(currentRangeGame==='ring')title.textContent='リング BBディフェンス';
    else if(currentRangeGame==='headsup')title.textContent=`ヘッズアップ ${currentHeadsUpStack}BB BBディフェンス`;
    else title.textContent=`トーナメント ${currentTournamentStack}BB BBディフェンス`;

    legend.innerHTML=shortStack
      ?'<span><i class="dot threebet"></i>オールイン</span><span><i class="dot call"></i>コール</span><span><i class="dot fold"></i>フォールド</span>'
      :'<span><i class="dot threebet"></i>3ベット</span><span><i class="dot call"></i>コール</span><span><i class="dot fold"></i>フォールド</span>';

    if(currentRangeGame==='ring'){
      hint.textContent=`100BB・6-maxで${currentRangePosition}から約2.5BBオープンを受けた場合の学習用簡易レンジです。レーキが高いライブゲームではコールをやや絞ってください。`;
    }else if(currentRangeGame==='headsup'){
      const action=scenario.rfiAction;
      hint.textContent=action.type==='shove'
        ?`${currentHeadsUpStack}BBでBTN/SBのオールインを受けたBBの簡易目安です。青はコール／オールイン継続候補、黄は補助的なコール候補です。`
        :`${currentHeadsUpStack}BBでBTN/SBの${action.label}を受けたBBの学習用簡易レンジです。青は3ベット候補、黄はコール候補です。`;
    }else if(shortStack){
      hint.textContent=`${currentRangePosition}の約2BBオープンに対する${currentTournamentStack}BBの簡易目安です。青は主にオールイン候補、黄はコール候補です。ICMが強い場面ではオールインを慎重に調整してください。`;
    }else{
      hint.textContent=`${currentRangePosition}の約2〜2.2BBオープンに対する${currentTournamentStack}BBのchipEV学習用簡易レンジです。100〜60BBは補間値を含み、アンティ、相手のサイズ、ICMに応じて調整してください。`;
    }

    const defense=scenario.defense[currentRangePosition]||{threebet:new Set(),call:new Set()};
    document.getElementById('rangeGrid').innerHTML=ranks.flatMap((_,row)=>ranks.map((__,col)=>{
      const hand=handLabel(row,col);
      const action=defense.threebet.has(hand)?'threebet':defense.call.has(hand)?'call':'';
      return `<button class="hand-cell ${action}" title="${hand}">${hand}</button>`;
    })).join('');
  }
}
document.querySelectorAll('[data-range-game]').forEach(button=>button.addEventListener('click',()=>{
  currentRangeGame=button.dataset.rangeGame;
  if(currentRangeGame==='headsup')currentRangePosition='BTN';
  updateUiState({rangeGame:currentRangeGame,rangePosition:currentRangePosition});
  renderRangeGrid();
}));
document.querySelectorAll('[data-tournament-stack]').forEach(button=>button.addEventListener('click',()=>{
  currentTournamentStack=button.dataset.tournamentStack;
  updateUiState({tournamentStack:currentTournamentStack});
  renderRangeGrid();
}));
document.querySelectorAll('[data-headsup-stack]').forEach(button=>button.addEventListener('click',()=>{
  currentHeadsUpStack=button.dataset.headsupStack;
  updateUiState({headsUpStack:currentHeadsUpStack});
  renderRangeGrid();
}));
document.querySelectorAll('[data-range-mode]').forEach(button=>button.addEventListener('click',()=>{
  currentRangeMode=button.dataset.rangeMode;
  updateUiState({rangeMode:currentRangeMode});
  renderRangeGrid();
}));
document.querySelectorAll('[data-position]').forEach(button=>button.addEventListener('click',()=>{
  if(button.classList.contains('hidden'))return;
  currentRangePosition=button.dataset.position;
  updateUiState({rangePosition:currentRangePosition});
  renderRangeGrid();
}));

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

function renderBetSizeReferenceTable(){
  const pot=Math.max(0,num(document.getElementById('oddsPot').value));
  const sizes=[
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
      const result=PokerCore.calculateBetOdds({pot,bet,call:bet});
      return `<div class="odds-table-row"><span>${label}</span><span>${stripNumberZeros(bet,2)}</span><strong>${pct(result.need)}</strong></div>`;
    }).join('');
}
function renderRaiseSizeReferenceTable(){
  const pot=Math.max(0,num(document.getElementById('raisePot').value));
  const ownBet=Math.max(0,num(document.getElementById('raiseOwnBet').value));
  const multiples=[2,2.5,3,3.5,4,5];
  document.getElementById('oddsReferenceEyebrow').textContent='RAISE REFERENCE';
  document.getElementById('oddsReferenceTitle').textContent='レイズサイズ別 必要勝率表';
  document.getElementById('oddsReferenceContext').textContent='Raise to';
  document.getElementById('oddsReferenceHint').textContent=
    '現在のポットと自分のベット額を基準に、Raise toの倍率ごとの追加コール額と必要勝率を表示します。';
  document.getElementById('oddsReferenceTable').innerHTML=
    '<div class="odds-table-row header"><span>Raise to</span><span>追加コール</span><strong>必要勝率</strong></div>'+
    multiples.map(multiplier=>{
      const result=PokerCore.calculateRaiseOdds({pot,ownBet,raiseTo:ownBet*multiplier});
      return `<div class="odds-table-row"><span>${multiplier}x</span><span>${result.call.toLocaleString()}</span><strong>${pct(result.need)}</strong></div>`;
    }).join('');
}
function renderOddsReferenceTable(){
  const mode=uiState.oddsMode||'bet';
  if(mode==='raise')renderRaiseSizeReferenceTable();
  else renderBetSizeReferenceTable();
}
function renderOdds(){
  const result=PokerCore.calculateBetOdds({pot:num(document.getElementById('oddsPot').value),bet:num(document.getElementById('oddsBet').value),call:num(document.getElementById('oddsCall').value)});
  document.getElementById('oddsResult').innerHTML=oddsResultHtml({need:result.need,call:result.call,finalPot:result.finalPot,note:`相手のブラフ損益分岐点 ${pct(result.bluff)}・MDF ${pct(result.mdf)}`});
  renderOddsReferenceTable();
}
['oddsPot','oddsBet','oddsCall'].forEach(id=>document.getElementById(id).addEventListener('input',renderOdds));
document.querySelectorAll('[data-pot-fraction]').forEach(button=>button.addEventListener('click',()=>{
  const pot=num(document.getElementById('oddsPot').value),bet=Math.round(pot*num(button.dataset.potFraction)*100)/100;
  document.getElementById('oddsBet').value=bet;document.getElementById('oddsCall').value=bet;renderOdds();
}));
function renderRaiseOdds(){
  const result=PokerCore.calculateRaiseOdds({pot:num(document.getElementById('raisePot').value),ownBet:num(document.getElementById('raiseOwnBet').value),raiseTo:num(document.getElementById('raiseTo').value)});
  document.getElementById('raiseResult').innerHTML=result.valid?oddsResultHtml({need:result.need,call:result.call,finalPot:result.finalPot,note:`自分の既投入 ${result.ownBet.toLocaleString()}・相手のレイズ合計 ${result.raiseTo.toLocaleString()}`}):'<span class="negative">Raise toは自分のベット額以上にしてください。</span>';
  renderOddsReferenceTable();
}
['raisePot','raiseOwnBet','raiseTo'].forEach(id=>document.getElementById(id).addEventListener('input',renderRaiseOdds));
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
function cardsForContext(context){
  return context==='pn'?pnCards.filter(Boolean):[...equityCards.hero,...equityCards.villain,...equityCards.board].filter(Boolean);
}
function cardTargetLabel(target){
  if(!target)return 'カードを選択';
  if(target.context==='pn')return `パワーナンバー・${target.index+1}枚目`;
  if(target.zone==='hero')return `自分のハンド・${target.index+1}枚目`;
  if(target.zone==='villain')return `相手のハンド・${target.index+1}枚目`;
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
  document.querySelectorAll('[data-card-picker]').forEach(slot=>{
    const context=slot.dataset.cardPicker,zone=slot.dataset.cardZone,index=Number(slot.dataset.cardIndex);
    const code=context==='pn'?pnCards[index]:equityCards[zone][index];
    slot.innerHTML=cardFaceHtml(code);
    slot.classList.toggle('empty',!code);
    slot.classList.toggle('red-card',!!code&&['h','d'].includes(code[1]));
    slot.classList.toggle('black-card',!!code&&!['h','d'].includes(code[1]));
  });
  const villainKnown=equityCards.villain.filter(Boolean).length===2;
  document.getElementById('villainModeLabel').textContent=villainKnown?'指定ハンド':'ランダム';
  updatePnHandFromCards();
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
function equityInput(){
  const hero=equityCards.hero.filter(Boolean),villain=equityCards.villain.filter(Boolean),board=equityCards.board.filter(Boolean);
  if(hero.length!==2)return {error:'自分のハンドを2枚選択してください。'};
  if(villain.length===1)return {error:'相手のハンドは2枚とも選ぶか、2枚とも空にしてください。'};
  const firstGap=equityCards.board.findIndex(v=>!v);
  if(firstGap>=0&&equityCards.board.slice(firstGap+1).some(Boolean))return {error:'ボードは左から順番に選択してください。'};
  if(board.length===1||board.length===2)return {error:'ボードは0枚、3枚、4枚、5枚で指定してください。'};
  const all=[...hero,...villain,...board];
  if(new Set(all).size!==all.length)return {error:'同じカードが重複しています。'};
  return {hero,villain:villain.length===2?villain:null,board};
}
function formatEquityPercent(value){
  return `${num(value).toFixed(2)}%`;
}
function stopEquityWorker(message=''){
  if(equityWorker){
    equityWorker.terminate();
    equityWorker=null;
  }
  document.getElementById('calculateEquityBtn').disabled=false;
  document.getElementById('equityProgressWrap').classList.add('hidden');
  if(message)document.getElementById('equityMethod').textContent=message;
}
function setEquityProgress(processed,total){
  const percent=total?Math.min(100,processed/total*100):0;
  document.getElementById('equityProgressWrap').classList.remove('hidden');
  document.getElementById('equityProgressBar').style.width=`${percent}%`;
  document.getElementById('equityProgressPercent').textContent=`${percent.toFixed(0)}%`;
  document.getElementById('equityProgressText').textContent=
    `${processed.toLocaleString()} / ${total.toLocaleString()} 通り`;
}
function renderExactEquityResult(result){
  const heroWin=result.wins/result.total*100;
  const tie=result.ties/result.total*100;
  const villainWin=result.losses/result.total*100;
  const heroEq=(result.wins+result.ties/2)/result.total*100;
  const villainEq=100-heroEq;

  document.getElementById('heroEquity').textContent=formatEquityPercent(heroEq);
  document.getElementById('heroWin').textContent=formatEquityPercent(heroWin);
  document.getElementById('heroTie').textContent=formatEquityPercent(tie);
  document.getElementById('villainEquity').textContent=formatEquityPercent(villainEq);
  document.getElementById('villainWin').textContent=formatEquityPercent(villainWin);
  document.getElementById('villainTie').textContent=formatEquityPercent(tie);

  document.getElementById('equityResult').innerHTML=
    `自分のエクイティ <strong>${formatEquityPercent(heroEq)}</strong>`+
    `<div class="equity-meter"><div class="equity-meter-fill" style="width:${heroEq}%"></div></div>`+
    `<div class="exact-count-grid">`+
      `<span><small>勝ち</small><strong>${result.wins.toLocaleString()}</strong></span>`+
      `<span><small>引分</small><strong>${result.ties.toLocaleString()}</strong></span>`+
      `<span><small>負け</small><strong>${result.losses.toLocaleString()}</strong></span>`+
    `</div>`;

  const opponentText=result.villainMode==='random'?'ランダム相手':'指定ハンド';
  document.getElementById('equityMethod').textContent=
    `${opponentText}に対して全${result.total.toLocaleString()}通りを完全列挙しました。乱数は使用していません。Tieは双方のエクイティへ半分ずつ加算しています。`;
}
function calculateEquityNow(){
  const input=equityInput();
  const resultEl=document.getElementById('equityResult');

  if(input.error){
    resultEl.innerHTML=`<span class="negative">${input.error}</span>`;
    return;
  }
  if(!input.villain&&input.board.length===0){
    resultEl.innerHTML=
      `<span class="negative">プリフロップで相手をランダムにした完全計算は約21億通りになるため、相手の2枚を指定してください。</span>`;
    document.getElementById('equityMethod').textContent=
      '相手のハンドを指定すれば、プリフロップでも残り1,712,304ボードを完全列挙します。相手ランダムはフロップ以降に利用できます。';
    return;
  }
  if(typeof Worker==='undefined'){
    resultEl.innerHTML='<span class="negative">このブラウザは完全計算用のWeb Workerに対応していません。</span>';
    return;
  }

  stopEquityWorker();
  resetEquityStats();
  document.getElementById('calculateEquityBtn').disabled=true;
  document.getElementById('equityResult').textContent='完全計算を開始しています…';
  document.getElementById('equityProgressBar').style.width='0%';
  document.getElementById('equityProgressPercent').textContent='0%';
  document.getElementById('equityProgressText').textContent='組み合わせ数を準備しています';
  document.getElementById('equityProgressWrap').classList.remove('hidden');

  equityWorker=new Worker('./equity-worker.js?v=4.2.0');
  equityWorker.onmessage=event=>{
    const message=event.data;
    if(message.type==='progress'){
      setEquityProgress(message.processed,message.total);
      return;
    }
    if(message.type==='result'){
      renderExactEquityResult(message);
      stopEquityWorker();
      return;
    }
    if(message.type==='error'){
      if(message.code==='PREFLOP_RANDOM_TOO_LARGE'){
        resultEl.innerHTML='<span class="negative">プリフロップ対ランダムは相手の2枚を指定してください。</span>';
      }else{
        resultEl.innerHTML=`<span class="negative">計算できませんでした：${esc(message.message)}</span>`;
      }
      stopEquityWorker('入力内容を確認して、もう一度計算してください。');
    }
  };
  equityWorker.onerror=()=>{
    resultEl.innerHTML='<span class="negative">完全計算中にエラーが発生しました。</span>';
    stopEquityWorker('計算を中止しました。');
  };
  equityWorker.postMessage({
    hero:input.hero,
    villain:input.villain,
    board:input.board
  });
}
document.getElementById('calculateEquityBtn').addEventListener('click',calculateEquityNow);
document.getElementById('cancelEquityBtn').addEventListener('click',()=>{
  stopEquityWorker('計算を中止しました。カードを変更して再計算できます。');
  document.getElementById('equityResult').textContent='計算を中止しました。';
});
document.getElementById('resetEquityBtn').addEventListener('click',()=>{
  stopEquityWorker();
  equityCards={hero:[null,null],villain:[null,null],board:[null,null,null,null,null]};
  resetEquityStats();
  renderVisualCards();
});
document.getElementById('randomVillainBtn').addEventListener('click',()=>{
  stopEquityWorker();
  equityCards.villain=[null,null];
  resetEquityStats();
  renderVisualCards();
  showToast('相手をランダムハンドに戻しました');
});
function resetEquityStats(){
  ['heroEquity','heroWin','heroTie','villainEquity','villainWin','villainTie'].forEach(id=>document.getElementById(id).textContent='—');
  document.getElementById('equityResult').textContent='カード枠をタップして、自分のハンドを選択してください。';
  document.getElementById('equityMethod').textContent='乱数は使わず全組み合わせを完全列挙します。プリフロップでは相手の2枚を指定してください。相手ランダムはフロップ以降に利用できます。';
}

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
  const result=PokerCore.calculateDrawOdds({
    street:document.getElementById('drawStreet').value,
    outs:document.getElementById('drawOuts').value
  });
  const label=result.street==='flop'?'リバーまで':'リバー';
  document.getElementById('drawTotalBadge').textContent=`${result.outs}アウツ`;
  document.getElementById('drawResult').innerHTML=
    `次の1枚でヒット <strong>${pct(result.next)}</strong><br>`+
    `${label}までに1回以上ヒット <strong>${pct(result.byRiver)}</strong><br>`+
    `<span class="muted">2・4の法則では約 ${pct(result.ruleApprox)}。外れる確率は ${pct(result.miss)}。</span>`;
  renderDrawPresetUi();
}
document.getElementById('drawStreet').addEventListener('input',renderDraw);
document.getElementById('drawOuts').addEventListener('input',renderDraw);
document.querySelectorAll('[data-draw-preset]').forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.drawPreset;
  if(selectedDrawPreset===key){
    selectedDrawPreset=null;
    document.getElementById('drawOuts').value=0;
    renderDraw();
    return;
  }
  applyDrawPreset(key);
}));
document.getElementById('clearDrawPresetsBtn').addEventListener('click',()=>{
  selectedDrawPreset=null;
  document.getElementById('drawOuts').value=0;
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
  const selectedOk=Boolean(selectedHand)&&selectedPn>=required;

  document.getElementById('pnMValue').textContent=m.toFixed(2);
  document.getElementById('pnThresholdLabel').textContent=required.toFixed(1);
  document.getElementById('pnHandValue').textContent=selectedHand?pnDisplayValue(selectedPn):'—';
  document.getElementById('pnDecision').textContent=selectedHand
    ?(selectedOk?'候補':'見送り')
    :'未選択';
  document.getElementById('pnDecision').className=selectedHand
    ?(selectedOk?'positive':'negative')
    :'';

  document.getElementById('pnResult').textContent=selectedHand
    ?`${selectedHand}：${selectedOk?'必要PN以上':'必要PN未満'}`
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
['pnStack'  ,'pnSb','pnBb','pnAnteTotal','pnBehind'].forEach(id=>document.getElementById(id).addEventListener('input',renderPower));
document.getElementById('pnGrid').addEventListener('click',e=>{
  const b=e.target.closest('[data-pn-hand]');if(!b)return;selectedPnHand=b.dataset.pnHand;pnCards=representativeCardsForHand(selectedPnHand);renderVisualCards();renderPower();
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


function bankrollSessionProfit(){
  return state.sessions.reduce((sum,s)=>sum+sessionProfitBase(s),0);
}
function bankrollAdjustmentTotal(){
  return state.bankroll.transactions.reduce((sum,t)=>sum+num(t.amount),0);
}
function currentBankroll(){
  return num(state.bankroll.startingAmount)+bankrollSessionProfit()+bankrollAdjustmentTotal();
}
function renderBankroll(){
  const b=state.bankroll,current=currentBankroll(),profit=bankrollSessionProfit(),adjustments=bankrollAdjustmentTotal();
  const drawdown=sessionDrawdown();
  document.getElementById('bankrollCurrent').textContent=fmt(current,state.settings.baseCurrency);
  document.getElementById('bankrollCurrent').className=`bankroll-total ${current>=0?'positive':'negative'}`;
  const chipValue=state.venues.reduce((sum,venue)=>sum+venueChipValueBase(venue),0);
  const liquidEstimate=current-chipValue;
  document.getElementById('bankrollFormula').textContent=
    `総資産 ＝ 開始資金 ${fmt(b.startingAmount,state.settings.baseCurrency)} ＋ 外部入出金 ${signed(adjustments,state.settings.baseCurrency)} ＋ セッション損益 ${signed(profit,state.settings.baseCurrency)}`;
  document.getElementById('bankrollAssetBreakdown').innerHTML=`
    <div><span>総ポーカー資産</span><strong>${fmt(current,state.settings.baseCurrency)}</strong></div>
    <div><span>店舗チップ（内訳）</span><strong>${fmt(chipValue,state.settings.baseCurrency)}</strong></div>
    <div><span>手元現金等（推定）</span><strong class="${liquidEstimate>=0?'positive':'negative'}">${fmt(liquidEstimate,state.settings.baseCurrency)}</strong></div>`;

  const cashBuyIn=num(b.cashBuyIn),mttBuyIn=num(b.tournamentBuyIn);
  const cashCount=cashBuyIn?current/cashBuyIn:0,mttCount=mttBuyIn?current/mttBuyIn:0;
  const cashTarget=Math.max(1,num(b.cashTargetBuyIns)||30),mttTarget=Math.max(1,num(b.tournamentTargetBuyIns)||100);
  const cashProgress=cashBuyIn?Math.max(0,Math.min(100,cashCount/cashTarget*100)):0;
  const mttProgress=mttBuyIn?Math.max(0,Math.min(100,mttCount/mttTarget*100)):0;
  document.getElementById('bankrollStats').innerHTML=`
    <div class="bankroll-stat">
      <strong>${cashBuyIn?`${cashCount.toFixed(1)} BI`:'未設定'}</strong>
      <span>リング資金力・目標 ${cashTarget} BI</span>
      <div class="progress-track"><div class="progress-fill" style="width:${cashProgress}%"></div></div>
    </div>
    <div class="bankroll-stat">
      <strong>${mttBuyIn?`${mttCount.toFixed(1)}回`:'未設定'}</strong>
      <span>MTT参加可能回数・目標 ${mttTarget}回</span>
      <div class="progress-track"><div class="progress-fill" style="width:${mttProgress}%"></div></div>
    </div>
    <div class="bankroll-stat">
      <strong class="${profit>=0?'positive':'negative'}">${signed(profit,state.settings.baseCurrency)}</strong>
      <span>セッション収支</span>
    </div>
    <div class="bankroll-stat">
      <strong class="${adjustments>=0?'positive':'negative'}">${signed(adjustments,state.settings.baseCurrency)}</strong>
      <span>入出金合計</span>
    </div>
    <div class="bankroll-stat">
      <strong class="${drawdown.currentDrawdown?'negative':''}">${drawdown.currentDrawdown?`-${fmt(drawdown.currentDrawdown,state.settings.baseCurrency)}`:fmt(0,state.settings.baseCurrency)}</strong>
      <span>ピークからの下落</span>
    </div>
    <div class="bankroll-stat">
      <strong class="${drawdown.maxDrawdown?'negative':''}">${drawdown.maxDrawdown?`-${fmt(drawdown.maxDrawdown,state.settings.baseCurrency)}`:fmt(0,state.settings.baseCurrency)}</strong>
      <span>最大ドローダウン</span>
    </div>`;

  document.getElementById('bankrollStarting').value=b.startingAmount||0;
  document.getElementById('bankrollCashBuyIn').value=b.cashBuyIn||0;
  document.getElementById('bankrollTournamentBuyIn').value=b.tournamentBuyIn||0;
  document.getElementById('bankrollCashTarget').value=b.cashTargetBuyIns||30;
  document.getElementById('bankrollTournamentTarget').value=b.tournamentTargetBuyIns||100;

  const list=[...b.transactions].sort((a,z)=>z.date.localeCompare(a.date)||z.createdAt-a.createdAt);
  document.getElementById('bankrollTransactionList').innerHTML=list.length?list.map(t=>`
    <article class="log-card">
      <div class="transaction-row">
        <div><strong>${t.amount>=0?'入金':'出金'}</strong><div class="log-meta">${esc(t.date)}${t.memo?`・${esc(t.memo)}`:''}</div></div>
        <div class="amount ${t.amount>=0?'positive':'negative'}">${signed(t.amount,state.settings.baseCurrency)}</div>
      </div>
      <div class="log-actions"><button class="mini-btn delete" data-delete-bankroll-transaction="${t.id}">削除</button></div>
    </article>`).join(''):'<p class="empty muted">入出金の記録はまだありません。</p>';
}
document.getElementById('saveBankrollSettingsBtn').addEventListener('click',()=>{
  const container=document.getElementById('bankrollSettingsInput');clearFormError(container);
  const starting=num(document.getElementById('bankrollStarting').value),cashBuyIn=num(document.getElementById('bankrollCashBuyIn').value),tournamentBuyIn=num(document.getElementById('bankrollTournamentBuyIn').value),cashTarget=num(document.getElementById('bankrollCashTarget').value),tournamentTarget=num(document.getElementById('bankrollTournamentTarget').value);
  if([starting,cashBuyIn,tournamentBuyIn].some(value=>value<0))return reportFormError(container,'資金と想定バイインは0以上にしてください。',document.getElementById('bankrollStarting'));
  if(cashTarget<1||tournamentTarget<1)return reportFormError(container,'目標回数は1以上にしてください。',document.getElementById('bankrollCashTarget'));
  state.bankroll.startingAmount=starting;state.bankroll.cashBuyIn=cashBuyIn;state.bankroll.tournamentBuyIn=tournamentBuyIn;state.bankroll.cashTargetBuyIns=cashTarget;state.bankroll.tournamentTargetBuyIns=tournamentTarget;
  saveState({reason:'bankroll-settings'});renderBankroll();renderHome();showToast('バンクロール基準値を保存しました');
});
document.getElementById('bankrollTransactionForm').addEventListener('submit',e=>{
  e.preventDefault();clearFormError(e.target);
  const date=document.getElementById('bankrollTransactionDate'),amountField=document.getElementById('bankrollTransactionAmount');
  const raw=num(amountField.value);
  if(!isValidDate(date.value))return reportFormError(e.target,'日付を正しく入力してください。',date);
  if(raw<=0)return reportFormError(e.target,'金額は0より大きい値にしてください。',amountField);
  const sign=document.getElementById('bankrollTransactionType').value==='withdrawal'?-1:1;
  state.bankroll.transactions.push({
    id:uid(),
    date:document.getElementById('bankrollTransactionDate').value,
    amount:raw*sign,
    memo:document.getElementById('bankrollTransactionMemo').value.trim(),
    createdAt:Date.now()
  });
  saveState();
  e.target.reset();
  document.getElementById('bankrollTransactionDate').value=today();
  renderBankroll();showToast('入出金を記録しました');
});
document.getElementById('bankrollTransactionList').addEventListener('click',e=>{
  const b=e.target.closest('[data-delete-bankroll-transaction]');
  if(b&&confirm('この入出金記録を削除しますか？')){
    state.bankroll.transactions=state.bankroll.transactions.filter(t=>t.id!==b.dataset.deleteBankrollTransaction);
    saveState();renderBankroll();
  }
});



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

function renderSettings(){
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

function renderAll(){
  renderHome();renderSessions();renderVenues();renderRangeGrid();renderOdds();renderRaiseOdds();renderDraw();renderPower();renderHands();renderBankroll();renderSettings();
  setVenueView(uiState.venueView||'list',false);
  setMoreView(uiState.moreView||'review',false);
  setTool(uiState.lastTool==='raise'?'odds':(uiState.lastTool||'odds'),false);
}
document.getElementById('sessionDate').value=today();document.getElementById('handDate').value=today();document.getElementById('bankrollTransactionDate').value=today();document.getElementById('chipTransactionDate').value=today();
buildPnHandPicker();initializeSmartNumberInputs();initializeCollapsibleSections();resetSessionForm();renderAll();renderVisualCards();renderBackupStatus();
