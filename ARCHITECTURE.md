# Poker Mate v9.0.0 アーキテクチャ

## 変更目的

v8.1.1までは主要機能が約3,600行の`app.js`へ集中していました。
v9.0.0では、GitHub Pagesでそのまま動く構成と既存データ互換性を保ったまま責務ごとに分割しています。

## モジュール

| ファイル | 役割 |
|---|---|
| `00-runtime.js` | 起動状態と例外捕捉 |
| `10-config.js` | バージョン、定数、レンジ基礎データ |
| `20-state.js` | 状態、保存、移行、検証、共通計算 |
| `30-shell.js` | 画面遷移、ホーム、月次・年次レポート |
| `40-sessions.js` | セッション、店舗、チップ |
| `50-ranges.js` | Poker Mate式・ヨコサワ式レンジ |
| `60-tools.js` | オッズ、勝率、アウツ、パワーナンバー |
| `70-review-bankroll.js` | ハンドレビュー、バンクロール |
| `80-components.js` | 入力UI、折りたたみ、クイック操作、設定 |
| `90-data.js` | バックアップ、CSV、認証UI、PWA |
| `app.js` | 起動処理と診断API |

読込順は`js/module-order.json`で管理します。

## データ互換性

- `pokerMateDataV1`
- `pokerMateUiV2`
- `pokerMateRangeFrequenciesV1`
- `pokerMateSessionTimerV1`
- データスキーマv6

## コマンド

```bash
npm run build
npm test
```

## 診断

```js
PokerMateDebug.version
PokerMateDebug.modules
PokerMateDebug.audit()
PokerMateDebug.getStateSnapshot()
PokerMateDebug.runtime.errors
```

## 変更ルール

1. 業務ロジックを`app.js`へ追加しない
2. 保存形式変更時は`20-state.js`へ移行処理を追加
3. モジュール追加時は`module-order.json`・`index.html`・`sw.js`を更新
4. 公開前に`npm test`を実行
