# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

事業者ネットワーク型サービス。起業家・事業者間で横断依頼を協業で解決するプラットフォーム。

- 顧客窓口一本化（たらい回し防止）
- おすすめ機能（楽天ROOM的）でクロスセル促進
- 紹介ポイントシステム

## 技術スタック

| カテゴリ        | 技術                               |
| --------------- | ---------------------------------- |
| Frontend/Server | SvelteKit 2 + Svelte 5             |
| ORM             | Prisma 7 (PostgreSQL)              |
| 認証            | lucia-auth                         |
| 決済            | Stripe (Payment Intents + Webhook) |
| ストレージ      | S3互換 (Cloudflare R2等)           |
| UIライブラリ    | shadcn-svelte                      |
| CSS             | Tailwind CSS v4                    |
| アイコン        | Lucide Svelte                      |
| フォーム        | Superforms + Zod                   |

## アーキテクチャ

DDD + クリーンアーキテクチャ:

```
src/
  routes/           # SvelteKitルート（SSR + Actions + API）
  lib/
    domain/         # エンティティ/値オブジェクト/ドメインサービス
      entities/
      services/
      policies/
    usecases/       # ユースケース
      commands/
      queries/
    ports/          # リポジトリ/ゲートウェイインターフェース
      repositories/
      gateways/
      notifiers/
      storage/
    infrastructure/ # 実装
      prisma/
      stripe/
      email/
      s3/
    server/         # 認証/セッション/ガード/zodスキーマ
    stores/         # グローバル状態（Svelte 5 runes + context）
    schemas/        # Zodスキーマ（フォームバリデーション）
    components/
      ui/           # shadcn-svelteコンポーネント
      custom/       # カスタムコンポーネント
```

## ドメインコンポーネント（境界付けられたコンテキスト）

- **Onboarding**: 招待/審査/ユーザ有効化
- **ProfileTheme**: 公開プロフィール/テーマ
- **Catalog**: 商品/価格/公開設定
- **Recommendation**: ルーム/ボード/紹介リンク
- **InquiryDeal**: 相談/案件/メンバー/タスク
- **Commerce**: 注文/決済/精算
- **Points**: ポイント付与/利用/戻し

## ロール設計

案件ごとのロール（ユーザ種別は固定でない、誰でも購入者にも提供者にもなり得る）:

- **Front**: 顧客窓口/案件オーナー
- **Provider**: 役務提供（実作業）担当
- **Collaborator**: 協力メンバー

## 決済・ポイントの重要ルール

1. **冪等性必須**: `Payment.stripeEventId` と `PointLedger.eventKey` で二重処理防止
2. **トランザクション必須**: ConfirmPaymentはOrder更新 + Settlement + PointLedger + Notificationを1トランザクションで
3. **ポイント付与タイミング**: 入金確定時
4. **キャンセル時**: 付与済みポイントをREVERSALで戻す

## Prismaスキーマ

`docs/03_schema.prisma` を参照。主要モデル:

- `User` / `Session` / `UserProfile` / `UserTheme`
- `Product` / `ProductPrice` / `PointPolicy` / `PointOffer`
- `Board` / `BoardItem` / `ReferralLink`
- `Inquiry` / `Deal` / `DealMember` / `DealTask`
- `Order` / `OrderItem` / `Payment` / `Settlement`
- `PointAccount` / `PointLedger`

softDelete対応: `User.deletedAt`, `Product.deletedAt`

## 環境変数（必須）

```
DATABASE_URL=
SESSION_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
POINTS_RATE_YEN=1
POINTS_MAX_REDEEM_RATE_DEFAULT=0.3
```

## 開発コマンド

```bash
# 依存関係インストール
pnpm install

# 開発サーバー起動
pnpm dev

# Prismaマイグレーション
pnpm prisma migrate dev

# Prisma Client + ER図生成
pnpm prisma generate
# → docs/erd.md にMermaid ER図が出力される

# 型チェック
pnpm check

# ビルド
pnpm build
```

### ER図生成に必要なパッケージ

```bash
pnpm add -D prisma-erd-generator @mermaid-js/mermaid-cli
```

## ルーティング設計

### 公開ページ

- `/u/[slug]` - 公開プロフィール
- `/u/[slug]/room` - おすすめボード
- `/p/[productId]` - 商品ページ
- `/r/[refCode]` - 紹介リンク（フロントのブランドで表示）
- `/client/deals/[token]` - 顧客向け案件閲覧（ログイン不要）

### 認証

- `/login`, `/register`, `/invite/[code]`, `/screening`

### アプリ

- `/app/dashboard`, `/app/products`, `/app/room`
- `/app/inquiries`, `/app/deals`, `/app/orders`, `/app/points`
- `/app/settings/*`, `/app/admin`

## 状態管理

| 種類             | 管理方法                        |
| ---------------- | ------------------------------- |
| サーバー状態     | SvelteKit load関数 + invalidate |
| グローバルUI状態 | Svelte 5 $state (context)       |
| ローカルUI状態   | Svelte 5 $state                 |
| フォーム状態     | Superforms                      |

## UI実装ルール

- **レスポンシブ**: モバイルファースト、lg以上でサイドバー表示、モバイルはハンバーガーメニュー
- **ローディング**: スピナー表示
- **エラー**: トースト通知（svelte-sonner）
- **フォーム**: Superforms + Zod、サーバー/クライアント両方でバリデーション
- **テーマ**: 公開ページはUserThemeをCSS変数として適用

## 開発時の注意点

- Svelte 5のrunesを使用（`$state`, `$derived`, `$effect`）
- Server Actions中心、外部公開APIのみ`/api`
- 監査ログ必須: 手動入金/ポイント調整/審査承認
- DealTask.assignedToはDealMemberを参照（メンバー外への割当防止）
- 全文検索: PostgreSQL tsvector使用（Product.searchVector）

## ドキュメント

- `docs/01_requirements_definition.md` - 要件定義書
- `docs/02_詳細設計書.md` - 詳細設計書
- `docs/03_schema.prisma` - Prismaスキーマ
- `docs/06_UI設計書.md` - UI設計書
