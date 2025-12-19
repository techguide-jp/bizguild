# ORM選定: Prisma vs Drizzle
作成日: 2025-12-19

## 結論

**Prisma継続を推奨**

---

## 比較表

| 観点 | Prisma | Drizzle | このPJでの重要度 |
|------|--------|---------|-----------------|
| 型安全性 | ◎ 自動生成 | ◎ TypeScript native | 高 |
| スキーマ定義 | ◎ DSL（可読性高） | △ TypeScript（冗長） | 高 |
| マイグレーション | ◎ 成熟 | ○ 発展中 | 高 |
| パフォーマンス | △ ランタイム重い | ◎ 軽量 | 中 |
| Edge Runtime | × 非対応（Accelerate必要） | ◎ 完全対応 | 低（初期） |
| Cold start | △ 遅め | ◎ 高速 | 低（初期） |
| GUI | ◎ Prisma Studio | × なし | 中 |
| lucia-auth統合 | ◎ adapter成熟 | ○ adapterあり | 高 |
| PostgreSQL機能 | ○ tsvector対応 | ○ tsvector対応 | 中 |
| コミュニティ | ◎ 大規模 | ○ 成長中 | 中 |
| SvelteKit統合 | ○ 手動設定 | ◎ sv create対応 | 低 |

---

## Prismaの強み

1. **直感的なスキーマ定義**
   ```prisma
   model User {
     id    String @id @default(cuid())
     email String @unique
     posts Post[]
   }
   ```
   - DSLが読みやすい
   - リレーションが明確

2. **強力なマイグレーション管理**
   - `prisma migrate dev` でスキーマ変更を追跡
   - マイグレーション履歴が残る
   - チーム開発に適している

3. **Prisma Studio**
   - GUIでデータ閲覧・編集
   - デバッグ時に便利

4. **豊富なドキュメント・エコシステム**
   - 問題解決が容易
   - Stack Overflowの回答が多い

---

## Drizzleの強み

1. **軽量・高速**
   - ランタイムなし（純粋なTypeScript）
   - バンドルサイズ小
   - Cold start高速

2. **Edge Runtime完全対応**
   - Vercel Edge Functions
   - Cloudflare Workers
   - 追加サービス不要

3. **SQLに近い記法**
   ```typescript
   const users = await db
     .select()
     .from(usersTable)
     .where(eq(usersTable.email, email));
   ```
   - SQLを知っていれば直感的
   - 複雑なクエリも書きやすい

4. **SvelteKit公式サポート**
   - `sv create` で選択可能
   - 設定が自動化される

---

## Drizzleの弱み（このPJにおいて）

1. **スキーマ定義が冗長**
   ```typescript
   export const users = pgTable('users', {
     id: text('id').primaryKey().$defaultFn(() => cuid()),
     email: text('email').notNull().unique(),
   });
   ```
   - Prisma DSLより記述量が多い
   - 20+テーブルあると管理が大変

2. **既存スキーマの変換コスト**
   - `docs/03_schema.prisma` を全て書き直す必要
   - 800行超のスキーマ変換は工数大

3. **マイグレーションツールが発展途上**
   - Drizzle Kitはあるが、Prismaほど成熟していない

4. **公式GUIなし**
   - データ確認にはpgAdmin等の別ツールが必要

---

## このプロジェクトでの判断

### Prismaを選ぶ理由

1. **既存資産の活用**
   - 800行超の詳細設計済みスキーマがある
   - 変換コストを回避

2. **複雑なリレーション**
   - User, Product, Deal, Order, Points等 20+テーブル
   - Prisma DSLの可読性が有利

3. **トランザクション要件**
   - 決済確定時に複数テーブル更新
   - Prismaの `$transaction` が使いやすい

4. **チーム開発を想定**
   - マイグレーション管理が重要
   - Prismaの方が安心

5. **Edge Runtimeは初期不要**
   - Vercel Serverless Functions で十分
   - パフォーマンス問題が出たら再検討

---

## 将来的な選択肢

### パフォーマンス問題が発生した場合

1. **Prisma Accelerate導入**
   - Prismaのまま Edge対応可能
   - 追加コストあり

2. **ハイブリッド構成**
   - 読み取り専用の軽量クエリだけDrizzleに移行
   - PrismaとDrizzleは共存可能
   ```typescript
   // 重い処理: Prisma（トランザクション）
   await prisma.$transaction([...]);

   // 軽い読み取り: Drizzle（Edge対応）
   const products = await db.select().from(productsTable);
   ```

3. **完全移行**
   - 初期リリース後、安定したらDrizzleに完全移行
   - スキーマ変換ツールで自動化可能

---

## 最終結論

| 選択 | 理由 |
|------|------|
| **Prisma継続** | 既存スキーマ活用、複雑なリレーション管理、マイグレーション成熟度 |

**再検討トリガー:**
- Cold startが3秒以上かかる
- Edge Functionsが必須になった
- Drizzleのマイグレーションツールが成熟した

---

## 参考リンク

- [Prisma公式](https://www.prisma.io/)
- [Drizzle ORM公式](https://orm.drizzle.team/)
- [Prisma vs Drizzle 比較記事](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-drizzle)
- [lucia-auth Prisma adapter](https://lucia-auth.com/database/prisma)
- [lucia-auth Drizzle adapter](https://lucia-auth.com/database/drizzle)
