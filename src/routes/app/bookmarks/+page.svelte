<script lang="ts">
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import EmptyState from '$lib/components/layout/EmptyState.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import * as Select from '$lib/components/ui/select';
	import { bookmarkedProducts, PRODUCT_TYPE_LABELS } from '$lib/mock';
	import { Bookmark, BookmarkMinus, ExternalLink, Search, Package } from 'lucide-svelte';

	let sortBy = $state('newest');

	// ソート済み商品
	const sortedProducts = $derived(() => {
		const sorted = [...bookmarkedProducts];
		if (sortBy === 'newest') {
			sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		} else if (sortBy === 'price-low') {
			sorted.sort((a, b) => (a.price || a.priceMin || 0) - (b.price || b.priceMin || 0));
		} else if (sortBy === 'price-high') {
			sorted.sort((a, b) => (b.price || b.priceMax || 0) - (a.price || a.priceMax || 0));
		}
		return sorted;
	});

	function formatPrice(product: (typeof bookmarkedProducts)[0]): string {
		if (product.price) {
			return `¥${product.price.toLocaleString()}`;
		}
		if (product.priceMin && product.priceMax) {
			return `¥${product.priceMin.toLocaleString()} 〜 ¥${product.priceMax.toLocaleString()}`;
		}
		return '要相談';
	}
</script>

<div class="p-6">
	<PageHeader title="ブックマーク" description="保存した商品の一覧" icon={Bookmark}>
		{#snippet actions()}
			<Button href="/app/discover/products">
				<Search class="mr-2 h-4 w-4" />
				商品を探す
			</Button>
		{/snippet}
	</PageHeader>

	{#if bookmarkedProducts.length === 0}
		<EmptyState
			icon={Bookmark}
			title="ブックマークした商品がありません"
			description="気になる商品をブックマークして、後から簡単にアクセスできるようにしましょう"
			actionLabel="商品を探す"
			actionHref="/app/discover/products"
		/>
	{:else}
		<!-- Sort -->
		<div class="mb-4 flex items-center justify-between">
			<p class="text-sm text-muted-foreground">{bookmarkedProducts.length}件の商品</p>
			<Select.Root type="single" bind:value={sortBy}>
				<Select.Trigger class="w-40">
					{sortBy === 'newest'
						? '追加日順'
						: sortBy === 'price-low'
							? '価格が安い順'
							: '価格が高い順'}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="newest">追加日順</Select.Item>
					<Select.Item value="price-low">価格が安い順</Select.Item>
					<Select.Item value="price-high">価格が高い順</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each sortedProducts() as product}
				<Card.Root class="overflow-hidden transition-shadow hover:shadow-lg">
					{#if product.images[0]}
						<img src={product.images[0]} alt={product.title} class="h-40 w-full object-cover" />
					{:else}
						<div class="flex h-40 items-center justify-center bg-muted">
							<Package class="h-12 w-12 text-muted-foreground" />
						</div>
					{/if}
					<Card.Header class="pb-2">
						<div class="flex items-start justify-between">
							<div>
								<Badge variant="secondary" class="mb-2">{PRODUCT_TYPE_LABELS[product.type]}</Badge>
								<Card.Title class="text-base">{product.title}</Card.Title>
							</div>
							<Button variant="ghost" size="icon" class="h-8 w-8 text-amber-500">
								<BookmarkMinus class="h-4 w-4" />
							</Button>
						</div>
						{#if product.summary}
							<Card.Description class="line-clamp-2">{product.summary}</Card.Description>
						{/if}
					</Card.Header>
					<Card.Content class="pb-2">
						<!-- Provider -->
						<a
							href={`/u/${product.owner.slug}`}
							class="flex items-center gap-2 rounded p-1 transition-colors hover:bg-accent"
						>
							<Avatar.Root class="h-6 w-6">
								<Avatar.Image src={product.owner.avatarUrl} alt={product.owner.name} />
								<Avatar.Fallback class="text-xs">{product.owner.name.slice(0, 2)}</Avatar.Fallback>
							</Avatar.Root>
							<span class="text-sm text-muted-foreground">{product.owner.name}</span>
						</a>
					</Card.Content>
					<Card.Footer class="flex items-center justify-between">
						<span class="font-medium">{formatPrice(product)}</span>
						<Button variant="default" size="sm" href={`/p/${product.id}`}>
							詳細を見る
							<ExternalLink class="ml-1 h-3 w-3" />
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
