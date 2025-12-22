<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHeader, StatCard } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		inquiries,
		deals,
		pointAccount,
		orders,
		currentUser,
		STAGE_LABELS,
		followingUsers,
		bookmarkedProducts,
		recentlyViewedProducts,
		followingFeed,
		PRODUCT_TYPE_LABELS
	} from '$lib/mock';
	import { uiMode } from '$lib/stores/uiMode.svelte';
	import {
		LayoutDashboard,
		MessageSquare,
		Briefcase,
		Coins,
		TrendingUp,
		ArrowRight,
		ExternalLink,
		Users,
		Bookmark,
		Package,
		Rss,
		Store,
		Compass
	} from 'lucide-svelte';

	// === 提供モード用データ ===
	const newInquiries = inquiries.filter((i) => i.status === 'NEW').length;
	const activeDeals = deals.filter((d) => !['DONE', 'CANCELLED'].includes(d.stage)).length;
	const thisMonthSales = orders
		.filter((o) => o.status === 'PAID' && o.seller.id === currentUser.id)
		.reduce((sum, o) => sum + o.total, 0);

	// 最近の相談（3件）
	const recentInquiries = inquiries.slice(0, 3);

	// 進行中の案件（3件）
	const activeDealsData = deals.filter((d) => !['DONE', 'CANCELLED'].includes(d.stage)).slice(0, 3);

	// === 探索モード用データ ===
	// フォロー中の新着商品（3件）
	const newFromFollowing = followingFeed
		.filter((f) => f.type === 'NEW_PRODUCT' && f.product)
		.slice(0, 3);

	// おすすめ商品（フォロー中以外の公開商品から3件）
	const recommendedProducts = recentlyViewedProducts.slice(0, 3);
</script>

<svelte:head>
	<title>ダッシュボード - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader
		title="ダッシュボード"
		description="ようこそ、{currentUser.name}さん"
		icon={LayoutDashboard}
	>
		{#snippet actions()}
			<Badge variant="outline" class="gap-2">
				{#if uiMode.current === 'PROVIDER'}
					<Store class="h-3 w-3" />
					提供モード
				{:else}
					<Compass class="h-3 w-3" />
					探索モード
				{/if}
			</Badge>
		{/snippet}
	</PageHeader>

	{#if uiMode.current === 'PROVIDER'}
		<!-- ===== 提供モード ===== -->
		<!-- Stats -->
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard
				title="新規相談"
				value={newInquiries}
				description="未対応の相談"
				icon={MessageSquare}
			/>
			<StatCard
				title="進行中案件"
				value={activeDeals}
				description="アクティブな案件"
				icon={Briefcase}
			/>
			<StatCard
				title="今月の売上"
				value="¥{thisMonthSales.toLocaleString()}"
				icon={TrendingUp}
				trend={{ value: 12.5, label: '先月比' }}
			/>
			<StatCard
				title="ポイント残高"
				value="{pointAccount.balance.toLocaleString()}pt"
				icon={Coins}
			/>
		</div>

		<div class="mt-8 grid gap-6 lg:grid-cols-2">
			<!-- Recent Inquiries -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0">
					<Card.Title class="flex items-center gap-2">
						<MessageSquare class="h-5 w-5" />
						最近の相談
					</Card.Title>
					<Button variant="ghost" size="sm" href="/app/inquiries">
						すべて見る
						<ArrowRight class="ml-1 h-4 w-4" />
					</Button>
				</Card.Header>
				<Card.Content>
					{#if recentInquiries.length > 0}
						<div class="space-y-4">
							{#each recentInquiries as inquiry (inquiry.id)}
								<div class="flex items-start justify-between gap-4 rounded-lg border p-3">
									<div class="flex-1 space-y-1">
										<div class="flex items-center gap-2">
											<span class="font-medium">{inquiry.name || '匿名'}</span>
											{#if inquiry.status === 'NEW'}
												<Badge variant="destructive" class="text-xs">新着</Badge>
											{:else if inquiry.status === 'CONVERTED'}
												<Badge variant="default" class="text-xs">案件化済み</Badge>
											{/if}
										</div>
										<p class="line-clamp-2 text-sm text-muted-foreground">
											{inquiry.message}
										</p>
										<p class="text-xs text-muted-foreground">
											{new Date(inquiry.createdAt).toLocaleDateString('ja-JP')}
										</p>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="py-8 text-center text-muted-foreground">相談はありません</p>
					{/if}
				</Card.Content>
			</Card.Root>

			<!-- Active Deals -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0">
					<Card.Title class="flex items-center gap-2">
						<Briefcase class="h-5 w-5" />
						進行中の案件
					</Card.Title>
					<Button variant="ghost" size="sm" href="/app/deals">
						すべて見る
						<ArrowRight class="ml-1 h-4 w-4" />
					</Button>
				</Card.Header>
				<Card.Content>
					{#if activeDealsData.length > 0}
						<div class="space-y-4">
							{#each activeDealsData as deal (deal.id)}
								<a
									href={resolve(`/app/deals/${deal.id}`)}
									class="block rounded-lg border p-3 transition-colors hover:bg-accent"
								>
									<div class="flex items-center justify-between gap-4">
										<div class="flex-1 space-y-1">
											<p class="font-medium">{deal.title}</p>
											<div class="flex items-center gap-2">
												<Badge variant="secondary">{STAGE_LABELS[deal.stage]}</Badge>
												<span class="text-xs text-muted-foreground">
													タスク: {deal.tasks.filter((t) => t.status === 'DONE').length}/{deal.tasks
														.length}
												</span>
											</div>
										</div>
										<ExternalLink class="h-4 w-4 text-muted-foreground" />
									</div>
								</a>
							{/each}
						</div>
					{:else}
						<p class="py-8 text-center text-muted-foreground">進行中の案件はありません</p>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	{:else}
		<!-- ===== 探索モード ===== -->
		<!-- Stats -->
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard
				title="フォロー中"
				value={followingUsers.length}
				description="提供者をフォロー"
				icon={Users}
			/>
			<StatCard
				title="ブックマーク"
				value={bookmarkedProducts.length}
				description="保存した商品"
				icon={Bookmark}
			/>
			<StatCard
				title="利用可能ポイント"
				value="{pointAccount.balance.toLocaleString()}pt"
				icon={Coins}
			/>
			<StatCard
				title="新着情報"
				value={followingFeed.length}
				description="フォロー中の更新"
				icon={Rss}
			/>
		</div>

		<div class="mt-8 grid gap-6 lg:grid-cols-2">
			<!-- フォロー中の新着 -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0">
					<Card.Title class="flex items-center gap-2">
						<Rss class="h-5 w-5" />
						フォロー中の新着
					</Card.Title>
					<Button variant="ghost" size="sm" href="/app/feed">
						すべて見る
						<ArrowRight class="ml-1 h-4 w-4" />
					</Button>
				</Card.Header>
				<Card.Content>
					{#if newFromFollowing.length > 0}
						<div class="space-y-4">
							{#each newFromFollowing as item, i (i)}
								{#if item.product}
									<a
										href={resolve(`/p/${item.product.id}`)}
										class="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
									>
										{#if item.product.images[0]}
											<img
												src={item.product.images[0]}
												alt={item.product.title}
												class="h-16 w-16 rounded object-cover"
											/>
										{:else}
											<div class="flex h-16 w-16 items-center justify-center rounded bg-muted">
												<Package class="h-6 w-6 text-muted-foreground" />
											</div>
										{/if}
										<div class="flex-1">
											<div class="flex items-center gap-2">
												<Avatar.Root class="h-5 w-5">
													<Avatar.Image src={item.user.avatarUrl} alt={item.user.name} />
													<Avatar.Fallback class="text-[10px]"
														>{item.user.name.slice(0, 1)}</Avatar.Fallback
													>
												</Avatar.Root>
												<span class="text-sm text-muted-foreground">{item.user.name}</span>
											</div>
											<p class="mt-1 font-medium">{item.product.title}</p>
											<Badge variant="secondary" class="mt-1">
												{PRODUCT_TYPE_LABELS[item.product.type]}
											</Badge>
										</div>
									</a>
								{/if}
							{/each}
						</div>
					{:else}
						<div class="py-8 text-center">
							<p class="text-muted-foreground">新着情報はありません</p>
							<Button variant="outline" size="sm" class="mt-2" href="/app/discover/providers">
								提供者を探す
							</Button>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>

			<!-- 最近見た商品 -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0">
					<Card.Title class="flex items-center gap-2">
						<Package class="h-5 w-5" />
						最近見た商品
					</Card.Title>
					<Button variant="ghost" size="sm" href="/app/discover/products">
						商品を探す
						<ArrowRight class="ml-1 h-4 w-4" />
					</Button>
				</Card.Header>
				<Card.Content>
					{#if recommendedProducts.length > 0}
						<div class="space-y-4">
							{#each recommendedProducts as product (product.id)}
								<a
									href={resolve(`/p/${product.id}`)}
									class="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
								>
									{#if product.images[0]}
										<img
											src={product.images[0]}
											alt={product.title}
											class="h-16 w-16 rounded object-cover"
										/>
									{:else}
										<div class="flex h-16 w-16 items-center justify-center rounded bg-muted">
											<Package class="h-6 w-6 text-muted-foreground" />
										</div>
									{/if}
									<div class="flex-1">
										<p class="font-medium">{product.title}</p>
										{#if product.summary}
											<p class="mt-1 line-clamp-1 text-sm text-muted-foreground">
												{product.summary}
											</p>
										{/if}
										<div class="mt-2 flex items-center gap-2">
											<Badge variant="outline">{PRODUCT_TYPE_LABELS[product.type]}</Badge>
											<span class="text-sm font-medium">
												{#if product.price}
													¥{product.price.toLocaleString()}
												{:else}
													要相談
												{/if}
											</span>
										</div>
									</div>
								</a>
							{/each}
						</div>
					{:else}
						<div class="py-8 text-center">
							<p class="text-muted-foreground">閲覧履歴はありません</p>
							<Button variant="outline" size="sm" class="mt-2" href="/app/discover/products">
								商品を探す
							</Button>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>

		<!-- ブックマーク -->
		{#if bookmarkedProducts.length > 0}
			<Card.Root class="mt-6">
				<Card.Header class="flex flex-row items-center justify-between space-y-0">
					<Card.Title class="flex items-center gap-2">
						<Bookmark class="h-5 w-5" />
						ブックマーク
					</Card.Title>
					<Button variant="ghost" size="sm" href="/app/bookmarks">
						すべて見る
						<ArrowRight class="ml-1 h-4 w-4" />
					</Button>
				</Card.Header>
				<Card.Content>
					<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{#each bookmarkedProducts.slice(0, 3) as product (product.id)}
							<a
								href={resolve(`/p/${product.id}`)}
								class="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
							>
								{#if product.images[0]}
									<img
										src={product.images[0]}
										alt={product.title}
										class="h-12 w-12 rounded object-cover"
									/>
								{:else}
									<div class="flex h-12 w-12 items-center justify-center rounded bg-muted">
										<Package class="h-5 w-5 text-muted-foreground" />
									</div>
								{/if}
								<div class="flex-1">
									<p class="font-medium">{product.title}</p>
									<p class="text-sm text-muted-foreground">{product.owner.name}</p>
								</div>
							</a>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		{/if}
	{/if}
</div>
