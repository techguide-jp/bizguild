<script lang="ts">
	import { resolve } from '$app/paths';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import * as Select from '$lib/components/ui/select';
	import { products, PRODUCT_TYPE_LABELS } from '$lib/mock';
	import { Package, Search, Bookmark } from 'lucide-svelte';

	function handleBookmark(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		// TODO: ブックマーク処理
	}

	let searchQuery = $state('');
	let selectedType = $state<string | undefined>(undefined);
	let sortBy = $state('newest');

	const publishedProducts = products.filter((p) => p.status === 'PUBLISHED');

	// 利用可能な商品タイプ
	const productTypes = Object.entries(PRODUCT_TYPE_LABELS).map(([value, label]) => ({
		value,
		label
	}));

	// フィルタリング & ソート
	const filteredProducts = $derived(() => {
		let result = publishedProducts.filter(
			(p) =>
				p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
		);

		if (selectedType) {
			result = result.filter((p) => p.type === selectedType);
		}

		// ソート
		if (sortBy === 'newest') {
			result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		} else if (sortBy === 'price-low') {
			result.sort((a, b) => (a.price || a.priceMin || 0) - (b.price || b.priceMin || 0));
		} else if (sortBy === 'price-high') {
			result.sort((a, b) => (b.price || b.priceMax || 0) - (a.price || a.priceMax || 0));
		}

		return result;
	});

	function formatPrice(product: (typeof products)[0]): string {
		if (product.price) {
			return `¥${product.price.toLocaleString()}`;
		}
		if (product.priceMin && product.priceMax) {
			return `¥${product.priceMin.toLocaleString()} 〜 ¥${product.priceMax.toLocaleString()}`;
		}
		return '要相談';
	}

	// 利用可能なタグを収集
	const allTags = [...new Set(publishedProducts.flatMap((p) => p.tags))];
</script>

<div class="p-6">
	<PageHeader title="商品を探す" description="サービスや商品を検索・フィルタ" icon={Package}>
		{#snippet actions()}
			<Button variant="outline" href={resolve('/app/discover')}>戻る</Button>
		{/snippet}
	</PageHeader>

	<!-- Filters -->
	<Card.Root class="mb-6">
		<Card.Content class="p-4">
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<!-- Search -->
				<div class="relative sm:col-span-2">
					<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="キーワードで検索..."
						class="pl-10"
						bind:value={searchQuery}
					/>
				</div>

				<!-- Type Filter -->
				<Select.Root type="single" bind:value={selectedType}>
					<Select.Trigger>
						{selectedType
							? PRODUCT_TYPE_LABELS[selectedType as keyof typeof PRODUCT_TYPE_LABELS]
							: '種別で絞り込み'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="">すべて</Select.Item>
						{#each productTypes as type (type.value)}
							<Select.Item value={type.value}>{type.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<!-- Sort -->
				<Select.Root type="single" bind:value={sortBy}>
					<Select.Trigger>
						{sortBy === 'newest'
							? '新着順'
							: sortBy === 'price-low'
								? '価格が安い順'
								: '価格が高い順'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="newest">新着順</Select.Item>
						<Select.Item value="price-low">価格が安い順</Select.Item>
						<Select.Item value="price-high">価格が高い順</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>

			<!-- Tags -->
			<div class="mt-4">
				<p class="mb-2 text-sm font-medium">タグで絞り込み</p>
				<div class="flex flex-wrap gap-2">
					{#each allTags as tag (tag)}
						<Badge
							variant="outline"
							class="cursor-pointer hover:bg-accent"
							onclick={() => (searchQuery = tag)}
						>
							{tag}
						</Badge>
					{/each}
				</div>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Results -->
	<div class="mb-4">
		<p class="text-sm text-muted-foreground">{filteredProducts().length}件の商品</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredProducts() as product (product.id)}
			<a href={resolve(`/p/${product.id}`)} class="group block">
				<Card.Root
					class="shadow-soft group-hover:shadow-soft-lg h-full overflow-hidden transition-all group-hover:-translate-y-1"
				>
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
							<Button variant="ghost" size="icon" class="h-8 w-8" onclick={handleBookmark}>
								<Bookmark class="h-4 w-4" />
							</Button>
						</div>
						{#if product.summary}
							<Card.Description class="line-clamp-2">{product.summary}</Card.Description>
						{/if}
					</Card.Header>
					<Card.Content class="pb-2">
						<div class="flex flex-wrap gap-1">
							{#each product.tags.slice(0, 3) as tag (tag)}
								<Badge variant="outline" class="text-xs">{tag}</Badge>
							{/each}
						</div>
					</Card.Content>
					<Card.Footer>
						<span class="font-medium">{formatPrice(product)}</span>
					</Card.Footer>
				</Card.Root>
			</a>
		{/each}
	</div>

	{#if filteredProducts().length === 0}
		<Card.Root class="py-12 text-center">
			<Package class="mx-auto h-12 w-12 text-muted-foreground" />
			<p class="mt-4 text-muted-foreground">条件に一致する商品が見つかりません</p>
			<Button variant="outline" class="mt-4" onclick={() => (searchQuery = '')}>
				フィルタをクリア
			</Button>
		</Card.Root>
	{/if}
</div>
