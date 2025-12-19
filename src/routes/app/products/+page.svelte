<script lang="ts">
	import { PageHeader, EmptyState } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { products, currentUser, PRODUCT_TYPE_LABELS } from '$lib/mock';
	import { Package, Plus, Search, Edit, Eye, Archive } from 'lucide-svelte';

	let searchQuery = $state('');
	let activeTab = $state('all');

	// 自分の商品のみ
	const myProducts = products.filter((p) => p.owner.id === currentUser.id);

	const filteredProducts = $derived(() => {
		let result = myProducts;

		// タブによるフィルタ
		if (activeTab !== 'all') {
			result = result.filter((p) => p.status === activeTab);
		}

		// 検索クエリによるフィルタ
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(query) ||
					p.tags.some((t) => t.toLowerCase().includes(query))
			);
		}

		return result;
	});

	function getStatusBadge(status: string) {
		switch (status) {
			case 'PUBLISHED':
				return { label: '公開中', variant: 'default' as const };
			case 'DRAFT':
				return { label: '下書き', variant: 'secondary' as const };
			case 'ARCHIVED':
				return { label: 'アーカイブ', variant: 'outline' as const };
			default:
				return { label: status, variant: 'outline' as const };
		}
	}
</script>

<svelte:head>
	<title>商品管理 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="商品管理" description="あなたの商品を管理します" icon={Package}>
		{#snippet actions()}
			<Button href="/app/products/new">
				<Plus class="mr-2 h-4 w-4" />
				新規作成
			</Button>
		{/snippet}
	</PageHeader>

	<!-- Filters -->
	<div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<Tabs.Root bind:value={activeTab} class="w-full sm:w-auto">
			<Tabs.List>
				<Tabs.Trigger value="all">すべて ({myProducts.length})</Tabs.Trigger>
				<Tabs.Trigger value="PUBLISHED">
					公開中 ({myProducts.filter((p) => p.status === 'PUBLISHED').length})
				</Tabs.Trigger>
				<Tabs.Trigger value="DRAFT">
					下書き ({myProducts.filter((p) => p.status === 'DRAFT').length})
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>

		<div class="relative w-full sm:w-64">
			<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder="商品を検索..." class="pl-9" bind:value={searchQuery} />
		</div>
	</div>

	<!-- Products Grid -->
	<div class="mt-6">
		{#if filteredProducts().length > 0}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredProducts() as product}
					<Card.Root class="overflow-hidden">
						{#if product.images[0]}
							<img
								src={product.images[0]}
								alt={product.title}
								class="h-40 w-full object-cover"
							/>
						{:else}
							<div class="flex h-40 items-center justify-center bg-muted">
								<Package class="h-12 w-12 text-muted-foreground" />
							</div>
						{/if}
						<Card.Header class="pb-2">
							<div class="flex items-start justify-between">
								<Card.Title class="line-clamp-1 text-base">{product.title}</Card.Title>
								
								<Badge variant={getStatusBadge(product.status).variant}>{getStatusBadge(product.status).label}</Badge>
							</div>
							<div class="flex gap-1">
								<Badge variant="outline" class="text-xs">
									{PRODUCT_TYPE_LABELS[product.type]}
								</Badge>
							</div>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								{#if product.price}
									¥{product.price.toLocaleString()}
								{:else if product.priceMin && product.priceMax}
									¥{product.priceMin.toLocaleString()} 〜
								{:else}
									要相談
								{/if}
							</p>
						</Card.Content>
						<Card.Footer class="gap-2">
							<Button variant="outline" size="sm" href="/app/products/{product.id}/edit">
								<Edit class="mr-1 h-4 w-4" />
								編集
							</Button>
							<Button variant="ghost" size="sm" href="/p/{product.id}">
								<Eye class="mr-1 h-4 w-4" />
								プレビュー
							</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		{:else}
			<Card.Root>
				<EmptyState
					title="商品がありません"
					description={searchQuery
						? '検索条件に一致する商品が見つかりませんでした'
						: '最初の商品を作成しましょう'}
					icon={Package}
				>
					{#snippet action()}
						{#if !searchQuery}
							<Button href="/app/products/new">
								<Plus class="mr-2 h-4 w-4" />
								商品を作成
							</Button>
						{/if}
					{/snippet}
				</EmptyState>
			</Card.Root>
		{/if}
	</div>
</div>
