<script lang="ts">
	import { goto } from '$app/navigation';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { products, users, PRODUCT_TYPE_LABELS } from '$lib/mock';
	import { Search, ExternalLink, Bookmark, UserPlus } from 'lucide-svelte';

	let searchQuery = $state('');
	let activeTab = $state('products');

	const publishedProducts = products.filter((p) => p.status === 'PUBLISHED');
	const activeUsers = users.filter((u) => u.status === 'ACTIVE');

	// 簡易検索フィルタ
	const filteredProducts = $derived(
		publishedProducts.filter(
			(p) =>
				p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
		)
	);

	const filteredUsers = $derived(
		activeUsers.filter(
			(u) =>
				u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
		)
	);

	function formatPrice(product: (typeof products)[0]): string {
		if (product.price) {
			return `¥${product.price.toLocaleString()}`;
		}
		if (product.priceMin && product.priceMax) {
			return `¥${product.priceMin.toLocaleString()} 〜`;
		}
		return '要相談';
	}
</script>

<div class="p-6">
	<PageHeader title="探す" description="商品や提供者を検索" icon={Search} />

	<!-- Search Bar -->
	<div class="mb-6">
		<div class="relative">
			<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="search"
				placeholder="キーワードで検索..."
				class="pl-10"
				bind:value={searchQuery}
			/>
		</div>
	</div>

	<!-- Tabs -->
	<Tabs.Root value={activeTab} onValueChange={(v) => (activeTab = v ?? 'products')}>
		<Tabs.List class="mb-6">
			<Tabs.Trigger value="products">商品 ({filteredProducts.length})</Tabs.Trigger>
			<Tabs.Trigger value="providers">提供者 ({filteredUsers.length})</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="products">
			<div class="mb-4 flex items-center justify-between">
				<p class="text-sm text-muted-foreground">{filteredProducts.length}件の商品</p>
				<Button variant="outline" size="sm" href="/app/discover/products">
					詳細検索
					<ExternalLink class="ml-1 h-3 w-3" />
				</Button>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredProducts as product}
					<Card.Root class="overflow-hidden transition-shadow hover:shadow-lg">
						{#if product.images[0]}
							<img src={product.images[0]} alt={product.title} class="h-32 w-full object-cover" />
						{/if}
						<Card.Header class="pb-2">
							<div class="flex items-start justify-between">
								<div>
									<Badge variant="secondary" class="mb-2"
										>{PRODUCT_TYPE_LABELS[product.type]}</Badge
									>
									<Card.Title class="text-base">{product.title}</Card.Title>
								</div>
								<Button variant="ghost" size="icon" class="h-8 w-8">
									<Bookmark class="h-4 w-4" />
								</Button>
							</div>
						</Card.Header>
						<Card.Content class="pb-2">
							<div class="flex flex-wrap gap-1">
								{#each product.tags.slice(0, 3) as tag}
									<Badge variant="outline" class="text-xs">{tag}</Badge>
								{/each}
							</div>
						</Card.Content>
						<Card.Footer class="flex items-center justify-between">
							<span class="text-sm font-medium">{formatPrice(product)}</span>
							<Button variant="ghost" size="sm" href={`/p/${product.id}`}>
								詳細
								<ExternalLink class="ml-1 h-3 w-3" />
							</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</Tabs.Content>

		<Tabs.Content value="providers">
			<div class="mb-4 flex items-center justify-between">
				<p class="text-sm text-muted-foreground">{filteredUsers.length}人の提供者</p>
				<Button variant="outline" size="sm" href="/app/discover/providers">
					詳細検索
					<ExternalLink class="ml-1 h-3 w-3" />
				</Button>
			</div>

			<div class="space-y-4">
				{#each filteredUsers as user}
					<Card.Root>
						<Card.Content class="flex items-center gap-4 p-4">
							<Avatar.Root class="h-14 w-14">
								<Avatar.Image src={user.avatarUrl} alt={user.name} />
								<Avatar.Fallback>{user.name.slice(0, 2)}</Avatar.Fallback>
							</Avatar.Root>
							<div class="flex-1">
								<h3 class="font-medium">{user.name}</h3>
								{#if user.headline}
									<p class="text-sm text-muted-foreground">{user.headline}</p>
								{/if}
								<div class="mt-2 flex flex-wrap gap-1">
									{#each user.specialties.slice(0, 3) as specialty}
										<Badge variant="outline" class="text-xs">{specialty}</Badge>
									{/each}
								</div>
							</div>
							<div class="flex gap-2">
								<Button variant="outline" size="sm">
									<UserPlus class="mr-1 h-3 w-3" />
									フォロー
								</Button>
								<Button variant="ghost" size="sm" href={`/u/${user.slug}`}>
									プロフィール
								</Button>
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>
