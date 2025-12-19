# v0.dev プロンプト（モックUI生成用 / 日本語）
> 注意: v0.dev は主に React 前提のため、本プロンプトは **UIモック生成** を目的にします（実装はSvelteKitで別途移植）。

あなたはプロダクトUIを作るエンジニアです。以下の要件で、**モックシステム**（API・DBへの実接続不要）を作ってください。  
画面遷移が分かるように、各ページをコンポーネント分割し、1ファイルが大きくなりすぎないようにしてください。  
テキストは日本語で。システムの目的もUI上で分かるように記載してください。

## システムの目的
起業家・事業者ネットワークで、顧客の相談を「窓口一本化」しつつ、裏側で協業して解決まで進める。  
おすすめ（楽天ROOM的）と紹介ポイントで、クロスセルを促進する。

## ロールの考え方
ユーザは案件ごとに「フロント（窓口）」「提供（作業者）」になり得る。

## 必要ページ（モック）
### 公開ページ
- /u/[slug] 公開プロフィール（テーマ反映）
- /u/[slug]/room おすすめボード（商品カード一覧）
- /p/[productId] 商品ページ（営業資料）
- /r/[refCode] 紹介リンクページ（フロントのブランドで表示、提供者表示レベル切替）
- /client/deals/[token] 顧客向け案件閲覧（ログイン不要）

### アプリ（ログイン後）
- /app/dashboard ダッシュボード（相談/案件/売上/ポイント）
- /app/products 商品一覧
- /app/products/new 商品作成フォーム（料金タイプ、ポイント設定、提供者表示デフォルト）
- /app/room ルーム編集（商品追加・並び替え・コメント）
- /app/inquiries 相談一覧（案件化ボタン）
- /app/deals 案件一覧
- /app/deals/[id] 案件詳細（ステータス、メンバー、タスク、顧客共有ON/OFF）
- /app/orders 注文一覧（販売/購入）
- /app/points ポイント残高/履歴/利用
- /app/settings/theme テーマ設定（色/ロゴ/プレビュー）
- /app/admin（管理者） 審査/招待/手動入金/ポイント調整

## UI要件
- サイドバー付きAppShell
- 一覧はテーブル + 検索/フィルタ
- 主要CTA（相談する/購入する/案件化）は分かりやすく
- ステータス（審査/案件/注文）はバッジで表示
- テーマはCSS変数のような形で反映している想定のUI

## データ（モックでOK）
- User: name, slug, theme, status
- Product: title, price, type, pointPolicy, providerVisibility
- Board: items[]
- Inquiry: name, email, message
- Deal: stage, members[], tasks[]
- Order: status, total, payments
- Points: balance, ledger[]

## 重要
- API呼び出しやDB接続は不要（ローカルのモックデータでOK）
- コンポーネントは適切に分割
- 1ファイルが大きくなりすぎない
