# UIモック生成プロンプト

あなたはプロダクトUIを作るエンジニアです。以下の要件で、**モックシステム**（API・DBへの実接続不要）を作ってください。
画面遷移が分かるように、各ページをコンポーネント分割し、1ファイルが大きくなりすぎないようにしてください。
テキストは日本語で。システムの目的もUI上で分かるように記載してください。

---

## システムの目的

起業家・事業者ネットワークで、顧客の相談を「窓口一本化」しつつ、裏側で協業して解決まで進める。
おすすめ（楽天ROOM的）と紹介ポイントで、クロスセルを促進する。

---

## ロールの考え方

- ユーザは案件ごとに「フロント（窓口）」「提供（作業者）」になり得る
- 誰でも商品を出品でき、誰でも購入者になり得る
- 招待制 + 審査制でメンバーを管理

---

## UIモード

ユーザーの利用目的に応じて、UIを2つのモードで切り替え可能にする。

### 提供モード（Provider Mode）
**目的**: 自分のサービスを提供・販売したい
- ダッシュボード: 相談数、案件進捗、売上、ポイント残高
- 重点ナビ: 商品管理、案件管理、相談一覧、注文（販売）
- サイドバー上部にモード切替トグル

### 探索モード（Seeker Mode）
**目的**: 協業先やサービスを探したい
- ダッシュボード: フォロー中の更新、おすすめ商品、最近見た商品
- 重点ナビ: 探す、フォロー中、おすすめ、注文（購入）
- サイドバー上部にモード切替トグル

### モード共通
- 設定、ポイント、通知はどちらのモードでもアクセス可能
- ヘッダーに現在のモード表示（アイコン + ラベル）
- モード切替はワンクリックで即座に反映

---

## 必要ページ

### 認証・オンボーディング
| パス | 説明 |
|------|------|
| `/login` | ログイン画面 |
| `/register` | 新規登録画面 |
| `/invite/[code]` | 招待リンク経由の登録画面 |
| `/screening` | 審査フォーム（事業内容、実績、得意領域）→ 審査中表示 |

### 公開ページ（ログイン不要）
| パス | 説明 |
|------|------|
| `/u/[slug]` | 公開プロフィール（テーマ反映、相談ボタン） |
| `/u/[slug]/room` | おすすめボード（商品カード一覧） |
| `/p/[productId]` | 商品ページ（営業資料として使える詳細ページ） |
| `/r/[refCode]` | 紹介リンクページ（フロントのブランドで表示） |
| `/client/deals/[token]` | 顧客向け案件閲覧（ログイン不要、共有トークンでアクセス） |

### アプリ - 提供モード（Provider Mode）
| パス | 説明 |
|------|------|
| `/app/dashboard` | ダッシュボード（モードで内容切替） |
| `/app/products` | 商品一覧（自分の商品、ステータスフィルタ） |
| `/app/products/new` | 商品作成フォーム |
| `/app/products/[id]/edit` | 商品編集フォーム |
| `/app/room` | ルーム編集（商品追加・並び替え・コメント付与） |
| `/app/inquiries` | 相談一覧（新着バッジ、案件化ボタン） |
| `/app/deals` | 案件一覧（ステージフィルタ） |
| `/app/deals/[id]` | 案件詳細（後述） |
| `/app/orders` | 注文一覧（販売/購入タブ切替） |

### アプリ - 探索モード（Seeker Mode）
| パス | 説明 |
|------|------|
| `/app/dashboard` | ダッシュボード（モードで内容切替） |
| `/app/discover` | 探す（商品・提供者検索、カテゴリ/タグフィルタ） |
| `/app/discover/products` | 商品を探す（検索・フィルタ・ソート） |
| `/app/discover/providers` | 提供者を探す（専門領域・実績で検索） |
| `/app/following` | フォロー中（提供者一覧、更新通知） |
| `/app/bookmarks` | ブックマーク（保存した商品一覧） |
| `/app/feed` | フィード（フォロー中の新着商品・おすすめ更新） |

### アプリ - 共通
| パス | 説明 |
|------|------|
| `/app/points` | ポイント残高・履歴・利用 |
| `/app/settings/profile` | プロフィール編集 |
| `/app/settings/theme` | テーマ設定（色/ロゴ/プレビュー） |
| `/app/admin` | 管理者画面（審査/招待/手動入金/ポイント調整） |

---

## 画面詳細

### ダッシュボード `/app/dashboard`

**提供モード時**:
- 統計カード: 新規相談数、進行中案件数、今月売上、ポイント残高
- 最近の相談リスト（3件）
- 進行中の案件リスト（3件）

**探索モード時**:
- 統計カード: フォロー中の提供者数、ブックマーク数、利用可能ポイント
- フォロー中の新着商品（3件）
- おすすめ商品（3件）
- 最近見た商品（3件）

### 商品作成・編集 `/app/products/new`, `/app/products/[id]/edit`
- 基本情報: タイトル、サマリー、説明（Markdown）、カテゴリ、タグ
- 料金設定: タイプ選択（単発/サブスク/成果報酬/見積）→ タイプ別入力フォーム
- ポイント設定: デフォルトポイント（固定pt or %）
- 表示設定: 提供者表示レベル（FULL/PARTIAL/HIDDEN）、ポイント利用可否
- 画像アップロード（複数、並び替え可）
- プレビューボタン

### 案件詳細 `/app/deals/[id]`
- ステージStepper: 相談→ヒアリング→提案→見積→受注→納品→請求→完了
- メンバー一覧: ロール（Front/Provider/Collaborator）、顧客表示ON/OFF
- タスク一覧: ステータス（TODO/DOING/DONE）、担当者、期限、顧客表示ON/OFF
- コメント: 内部コメント / 顧客公開コメントをタブで分離
- ドキュメント: 提案書/見積書/請求書のリスト
- 顧客共有リンク発行ボタン

### 紹介リンク `/r/[refCode]`
提供者表示レベルによる違い:
- **FULL**: 提供者名・プロフィールリンク表示
- **PARTIAL**: 提供者名のみ表示
- **HIDDEN**: 提供者非表示（フロントのコンテンツとして表示）

### 管理者画面 `/app/admin`
タブ構成:
- 審査: 審査待ちユーザー一覧、承認/否認ボタン
- 招待: 招待コード発行、発行済み一覧
- 手動入金: 注文を選択して入金確定
- ポイント調整: ユーザー選択、ポイント加減算、理由入力

### 探す `/app/discover`
- 検索バー（キーワード検索）
- タブ: 商品 / 提供者
- フィルタ: カテゴリ、タグ、価格帯、提供形態
- ソート: 新着順、人気順、価格順
- 検索結果カード（商品または提供者）

### 商品を探す `/app/discover/products`
- 商品検索に特化したビュー
- グリッド表示（商品カード）
- フィルタサイドバー: カテゴリ、タグ、価格帯、提供形態
- 各カードに「ブックマーク」ボタン

### 提供者を探す `/app/discover/providers`
- 提供者検索に特化したビュー
- リスト表示（提供者カード: アバター、名前、専門領域、商品数）
- フィルタ: 専門領域、タグ
- 各カードに「フォロー」ボタン

### フォロー中 `/app/following`
- フォロー中の提供者一覧
- 各提供者の最新商品・更新情報
- フォロー解除ボタン
- 提供者プロフィールへのリンク

### ブックマーク `/app/bookmarks`
- ブックマークした商品一覧
- グリッド表示
- ブックマーク解除ボタン
- 並び替え: 追加日順、価格順

### フィード `/app/feed`
- フォロー中の提供者の新着情報をタイムライン表示
- 新商品追加、商品更新、おすすめ更新などのアクティビティ
- 無限スクロール
- 各アイテムから商品詳細・提供者プロフィールへリンク

---

## UI要件

### レイアウト
- サイドバー付きAppShell
- lg以上: サイドバー常時表示（256px）
- モバイル: ハンバーガーメニュー → ドロワー表示

### コンポーネント
- 一覧: テーブル + 検索 + フィルタ + ページネーション
- CTA: 「相談する」「購入する」「案件化」は目立つボタン
- ステータス: バッジで表示（色分け）
- 空状態: データなし時はEmptyState（アイコン + メッセージ + アクションボタン）
- ローディング: スピナー
- 通知: トースト（成功/エラー）
- モーダル: 確認ダイアログ、フォームダイアログ

### テーマ
- 公開ページはユーザーのテーマカラーを反映
- CSS変数で切り替える想定: `--theme-primary`, `--theme-accent`, `--theme-bg`, `--theme-text`

---

## モックデータ構造

```typescript
// ユーザー
interface User {
  id: string;
  name: string;
  email: string;
  slug: string;
  avatarUrl?: string;
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  headline?: string;
  specialties: string[];
  theme: {
    primaryColor: string;
    accentColor: string;
    bgColor: string;
    textColor: string;
  };
}

// 商品
interface Product {
  id: string;
  title: string;
  summary?: string;
  descriptionMd?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  type: 'ONE_TIME' | 'SUBSCRIPTION' | 'OUTCOME' | 'QUOTE';
  price?: number;
  priceMin?: number;
  priceMax?: number;
  tags: string[];
  images: string[];
  providerVisibility: 'FULL' | 'PARTIAL' | 'HIDDEN';
  pointPolicy?: {
    mode: 'FIXED' | 'PERCENT';
    value: number;
  };
  owner: User;
}

// ボード（おすすめ）
interface Board {
  id: string;
  title: string;
  items: {
    product: Product;
    comment?: string;
  }[];
}

// 相談
interface Inquiry {
  id: string;
  name?: string;
  email?: string;
  message: string;
  status: 'NEW' | 'READ' | 'CONVERTED';
  createdAt: string;
  sourceProduct?: Product;
}

// 案件
interface Deal {
  id: string;
  title: string;
  stage: 'CONSULT' | 'HEARING' | 'PROPOSAL' | 'ESTIMATE' | 'ORDERED' | 'DELIVERY' | 'INVOICE' | 'DONE' | 'CANCELLED';
  members: {
    user: User;
    role: 'FRONT' | 'PROVIDER' | 'COLLABORATOR';
    isClientVisible: boolean;
  }[];
  tasks: {
    id: string;
    title: string;
    status: 'TODO' | 'DOING' | 'DONE';
    assignee?: User;
    dueAt?: string;
    isClientVisible: boolean;
  }[];
  comments: {
    id: string;
    author: User;
    body: string;
    isClientVisible: boolean;
    createdAt: string;
  }[];
}

// 注文
interface Order {
  id: string;
  orderNo: string;
  status: 'PENDING_PAYMENT' | 'PAID' | 'CANCELLED' | 'REFUNDED';
  seller: User;
  buyer?: User;
  items: {
    product: Product;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  pointsDiscount: number;
  total: number;
  createdAt: string;
}

// ポイント
interface PointAccount {
  balance: number;
  ledger: {
    id: string;
    type: 'EARN' | 'SPEND' | 'ADJUST' | 'REVERSAL';
    points: number;
    note?: string;
    createdAt: string;
  }[];
}

// フォロー
interface Follow {
  id: string;
  followerId: string;  // フォローしている人
  followingId: string; // フォローされている人
  createdAt: string;
}

// ブックマーク
interface Bookmark {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

// 閲覧履歴
interface ViewHistory {
  id: string;
  userId: string;
  productId: string;
  viewedAt: string;
}

// フィードアイテム
interface FeedItem {
  id: string;
  type: 'NEW_PRODUCT' | 'PRODUCT_UPDATE' | 'ROOM_UPDATE';
  userId: string;      // アクションを起こしたユーザー
  productId?: string;
  createdAt: string;
}

// UIモード
type UIMode = 'PROVIDER' | 'SEEKER';
```

---

## 重要

- API呼び出しやDB接続は不要（ローカルのモックデータでOK）
- コンポーネントは適切に分割
- 1ファイルが大きくなりすぎない（300行以内目安）
- 画面遷移が分かるようにリンクを設定
