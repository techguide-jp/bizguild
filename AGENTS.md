# Repository Guidelines

## プロジェクト構成
- アプリ本体は `src/` に配置。ルートは `src/routes/`、共通コードは `src/lib/`。
- LP関連コンポーネントは `src/lib/components/landing/`、UIプリミティブは `src/lib/components/ui/`。
- E2Eテストは `e2e/`、Prismaは `prisma/`、静的ファイルは `static/`。
- 仕様・設計資料は `docs/` に集約。

## 開発・ビルド・テスト
- `pnpm dev`: Viteで開発サーバー起動。
- `pnpm build`: SvelteKitの本番ビルド。
- `pnpm preview`: 本番ビルドのローカルプレビュー。
- `pnpm check`: `svelte-check` を実行。
- `pnpm lint`: Prettierチェック + ESLint。
- `pnpm test:unit`: Vitestでユニットテスト。
- `pnpm test:e2e`: PlaywrightでE2Eテスト。
- `pnpm test`: ユニット→E2Eの順で実行。

## コーディング規約
- 形式はPrettierに準拠（`pnpm format` / `pnpm lint`）。
- インデントはタブ、TS/JSはシングルクォートを優先。
- ルート命名はSvelteKitの慣例に従う（例: `src/routes/app/products/+page.svelte`）。
- 内部リンクは `resolve()` を使い、ベースパス対応を担保。

## テスト方針
- Vitest（ユニット）とPlaywright（E2E）を採用。
- 新規E2Eは `e2e/` 配下に配置し、ユーザー行動が伝わる命名にする。

## コミット・PRガイドライン
- コミットメッセージは日本語で短く要点を示す（例: 「LPページと待機リスト導線を追加」）。
- PRは要約、関連Issueリンク、UI変更のスクショを添付。

## セキュリティ・設定
- `.env.example` を `.env` にコピーして設定。
- メンバー先行登録フォームは `PUBLIC_WAITLIST_FORM_URL` で指定。
