<script lang="ts">
	import { resolve } from '$app/paths';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import EmptyState from '$lib/components/layout/EmptyState.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { followingUsers, products } from '$lib/mock';
	import { Users, UserMinus, ExternalLink, Package, Search } from 'lucide-svelte';

	// 各ユーザーの最新商品を取得
	function getLatestProducts(userId: string, limit = 2) {
		return products
			.filter((p) => p.owner.id === userId && p.status === 'PUBLISHED')
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			.slice(0, limit);
	}

	// 各ユーザーの商品数
	function getProductCount(userId: string): number {
		return products.filter((p) => p.owner.id === userId && p.status === 'PUBLISHED').length;
	}
</script>

<div class="p-6">
	<PageHeader title="フォロー中" description="フォローしている提供者の一覧" icon={Users}>
		{#snippet actions()}
			<Button href="/app/discover/providers">
				<Search class="mr-2 h-4 w-4" />
				提供者を探す
			</Button>
		{/snippet}
	</PageHeader>

	{#if followingUsers.length === 0}
		<EmptyState
			icon={Users}
			title="フォロー中の提供者がいません"
			description="気になる提供者をフォローして、最新情報をチェックしましょう"
			actionLabel="提供者を探す"
			actionHref="/app/discover/providers"
		/>
	{:else}
		<div class="space-y-6">
			{#each followingUsers as user (user.id)}
				<Card.Root>
					<Card.Content class="p-6">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
							<Avatar.Root class="h-16 w-16 shrink-0">
								<Avatar.Image src={user.avatarUrl} alt={user.name} />
								<Avatar.Fallback class="text-lg">{user.name.slice(0, 2)}</Avatar.Fallback>
							</Avatar.Root>

							<div class="flex-1">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="text-lg font-semibold">{user.name}</h3>
										{#if user.headline}
											<p class="text-muted-foreground">{user.headline}</p>
										{/if}
									</div>
									<Button variant="outline" size="sm">
										<UserMinus class="mr-1 h-4 w-4" />
										フォロー解除
									</Button>
								</div>

								<div class="mt-2 flex flex-wrap gap-2">
									{#each user.specialties as specialty (specialty)}
										<Badge variant="secondary">{specialty}</Badge>
									{/each}
								</div>

								<!-- 最新の商品 -->
								{#if getLatestProducts(user.id).length > 0}
									<div class="mt-4">
										<p class="mb-2 text-sm font-medium text-muted-foreground">最新の商品</p>
										<div class="grid gap-2 sm:grid-cols-2">
											{#each getLatestProducts(user.id) as product (product.id)}
												<a
													href={resolve(`/p/${product.id}`)}
													class="flex items-center gap-2 rounded-lg border p-2 transition-colors hover:bg-accent"
												>
													{#if product.images[0]}
														<img
															src={product.images[0]}
															alt={product.title}
															class="h-10 w-10 rounded object-cover"
														/>
													{:else}
														<div
															class="flex h-10 w-10 items-center justify-center rounded bg-muted"
														>
															<Package class="h-5 w-5 text-muted-foreground" />
														</div>
													{/if}
													<span class="flex-1 truncate text-sm">{product.title}</span>
												</a>
											{/each}
										</div>
									</div>
								{/if}

								<div class="mt-4 flex gap-2">
									<Button variant="ghost" size="sm" href={`/u/${user.slug}`}>
										プロフィール
										<ExternalLink class="ml-1 h-3 w-3" />
									</Button>
									<Button variant="ghost" size="sm" href={`/u/${user.slug}/room`}>
										おすすめを見る
									</Button>
									<span class="ml-auto text-sm text-muted-foreground">
										{getProductCount(user.id)}件の商品
									</span>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
