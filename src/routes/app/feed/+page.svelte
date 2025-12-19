<script lang="ts">
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import EmptyState from '$lib/components/layout/EmptyState.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { followingFeed, PRODUCT_TYPE_LABELS } from '$lib/mock';
	import type { FeedItem } from '$lib/mock/types';
	import { Rss, Package, Heart, RefreshCw, ExternalLink, Users } from 'lucide-svelte';

	// フィードタイプのラベルとアイコン
	function getFeedTypeInfo(type: FeedItem['type']) {
		switch (type) {
			case 'NEW_PRODUCT':
				return { label: '新商品', icon: Package, color: 'text-blue-500' };
			case 'PRODUCT_UPDATE':
				return { label: '商品更新', icon: RefreshCw, color: 'text-green-500' };
			case 'ROOM_UPDATE':
				return { label: 'おすすめ更新', icon: Heart, color: 'text-pink-500' };
		}
	}

	// 日時フォーマット
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const days = Math.floor(hours / 24);

		if (hours < 1) return 'たった今';
		if (hours < 24) return `${hours}時間前`;
		if (days < 7) return `${days}日前`;
		return date.toLocaleDateString('ja-JP');
	}
</script>

<div class="p-6">
	<PageHeader title="フィード" description="フォロー中の提供者の最新情報" icon={Rss}>
		{#snippet actions()}
			<Button variant="outline">
				<RefreshCw class="mr-2 h-4 w-4" />
				更新
			</Button>
		{/snippet}
	</PageHeader>

	{#if followingFeed.length === 0}
		<EmptyState
			icon={Rss}
			title="フィードに表示する情報がありません"
			description="提供者をフォローすると、新商品やおすすめの更新がここに表示されます"
			actionLabel="提供者を探す"
			actionHref="/app/discover/providers"
		/>
	{:else}
		<div class="space-y-4">
			{#each followingFeed as item}
				{@const typeInfo = getFeedTypeInfo(item.type)}
				<Card.Root class="transition-shadow hover:shadow-md">
					<Card.Content class="p-4">
						<!-- Header -->
						<div class="flex items-center gap-3">
							<Avatar.Root class="h-10 w-10">
								<Avatar.Image src={item.user.avatarUrl} alt={item.user.name} />
								<Avatar.Fallback>{item.user.name.slice(0, 2)}</Avatar.Fallback>
							</Avatar.Root>
							<div class="flex-1">
								<div class="flex items-center gap-2">
									<a href={`/u/${item.user.slug}`} class="font-medium hover:underline">
										{item.user.name}
									</a>
									<Badge variant="outline" class="gap-1 {typeInfo.color}">
										<svelte:component this={typeInfo.icon} class="h-3 w-3" />
										{typeInfo.label}
									</Badge>
								</div>
								<p class="text-sm text-muted-foreground">{formatDate(item.createdAt)}</p>
							</div>
						</div>

						<!-- Content -->
						{#if item.product}
							<div class="mt-4">
								<a
									href={`/p/${item.product.id}`}
									class="flex gap-4 rounded-lg border p-3 transition-colors hover:bg-accent"
								>
									{#if item.product.images[0]}
										<img
											src={item.product.images[0]}
											alt={item.product.title}
											class="h-20 w-20 rounded object-cover"
										/>
									{:else}
										<div
											class="flex h-20 w-20 items-center justify-center rounded bg-muted"
										>
											<Package class="h-8 w-8 text-muted-foreground" />
										</div>
									{/if}
									<div class="flex-1">
										<div class="flex items-start justify-between">
											<div>
												<Badge variant="secondary" class="mb-1">
													{PRODUCT_TYPE_LABELS[item.product.type]}
												</Badge>
												<h4 class="font-medium">{item.product.title}</h4>
											</div>
											<ExternalLink class="h-4 w-4 text-muted-foreground" />
										</div>
										{#if item.product.summary}
											<p class="mt-1 line-clamp-2 text-sm text-muted-foreground">
												{item.product.summary}
											</p>
										{/if}
									</div>
								</a>
							</div>
						{:else if item.type === 'ROOM_UPDATE'}
							<div class="mt-4">
								<a
									href={`/u/${item.user.slug}/room`}
									class="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
								>
									<div class="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
										<Heart class="h-6 w-6 text-pink-500" />
									</div>
									<div class="flex-1">
										<p class="font-medium">{item.user.name}さんのおすすめが更新されました</p>
										<p class="text-sm text-muted-foreground">タップして確認する</p>
									</div>
									<ExternalLink class="h-4 w-4 text-muted-foreground" />
								</a>
							</div>
						{/if}
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<!-- Load More -->
		<div class="mt-6 text-center">
			<Button variant="outline">さらに読み込む</Button>
		</div>
	{/if}
</div>
