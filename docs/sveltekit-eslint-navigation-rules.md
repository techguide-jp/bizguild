# eslint / sveltekit ナビゲーション関連ルール（コンテキスト用）

## 目的

- `kit.paths.base` を考慮した **安全なURL生成** を徹底し、base配下運用・将来のパス変更に強くする
- `eslint-plugin-svelte` の `svelte/no-navigation-without-resolve` を満たし、リンク生成の一貫性を保つ

---

## 1) 基本ルール：ナビゲーションや href は `resolve()` を通す

### 対象（resolve必須）

- `<a href="...">`
- `goto(...)`
- `pushState(...)`, `replaceState(...)`
- base配下のアプリ内URL

### 例

```svelte
<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
</script>

<a href={resolve('/app/products')}>商品一覧</a>
<button on:click={() => goto(resolve('/app/products'))}>一覧へ</button>
```

---

## 2) ルートID（`/blog/[slug]` など）も `resolve()`

```ts
import { resolve } from '$app/paths';

const href = resolve('/blog/[slug]', { slug: 'hello' });
```

---

## 3) `resolveRoute` は使用しない

- 過去API（legacy）
- ESLintは `resolve()` のみを正とみなす

---

## 4) UIコンポーネント設計方針

- URL生成は **呼び出し側（ページ/コンテナ）**
- UIコンポーネントは href をそのまま受け取る

```svelte
<Button href={resolve('/app/products')}>商品一覧</Button>
```

---

## 5) resolve不要なケース

- 外部URL（https, mailto, tel）
- CDN / Storage 等

```svelte
<a href="https://example.com">外部</a>
```

---

## 6) ESLint抑制は最小限

```svelte
<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={cmsHref}>CMSリンク</a>
```

---

## 7) まとめ

- **アプリ内リンクは必ず resolve()**
- **UIはURL生成をしない**
- **外部URLはresolveしない**
