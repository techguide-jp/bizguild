<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { users, boards } from '$lib/mock';
	import { ArrowLeft, ExternalLink, Quote } from 'lucide-svelte';

	const slug = $page.params.slug;
	const user = users.find((u) => u.slug === slug) || users[0];
	const board = boards[0]; // モックでは最初のボードを使用

	const themeStyle = `
		--theme-primary: ${user.theme.primaryColor};
		--theme-accent: ${user.theme.accentColor};
		--theme-bg: ${user.theme.bgColor};
		--theme-text: ${user.theme.textColor};
	`;
</script>

<svelte:head>
	<title>{user.name}のおすすめ - BizGuild</title>
</svelte:head>

<div class="min-h-screen" style={themeStyle}>
	<!-- Header -->
	<header class="border-b bg-[var(--theme-bg)]">
		<div class="mx-auto max-w-4xl px-4 py-6">
			<Button variant="ghost" href={`/u/${slug}`} class="mb-4">
				<ArrowLeft class="mr-2 h-4 w-4" />
				プロフィールに戻る
			</Button>
			<div class="flex items-center gap-4">
				<Avatar.Root class="h-12 w-12">
					<Avatar.Image src={user.avatarUrl} alt={user.name} />
					<Avatar.Fallback>{user.name.slice(0, 2)}</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<h1 class="text-xl font-bold" style="color: var(--theme-text)">
						{user.name}のおすすめ
					</h1>
					<p class="text-sm text-muted-foreground">
						信頼できるパートナーのサービスをご紹介します
					</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-4xl px-4 py-8">
		{#if board && board.items.length > 0}
			<div class="space-y-6">
				{#each board.items as item}
					<Card.Root class="overflow-hidden">
						<div class="flex flex-col sm:flex-row">
							{#if item.product.images[0]}
								<div class="sm:w-48">
									<img
										src={item.product.images[0]}
										alt={item.product.title}
										class="h-40 w-full object-cover sm:h-full"
									/>
								</div>
							{/if}
							<div class="flex-1 p-6">
								{#if item.comment}
									<div class="mb-4 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
										<Quote class="mt-0.5 h-4 w-4 text-muted-foreground" />
										<p class="text-sm italic text-muted-foreground">{item.comment}</p>
									</div>
								{/if}
								<h3 class="text-lg font-semibold">{item.product.title}</h3>
								{#if item.product.summary}
									<p class="mt-1 text-sm text-muted-foreground">{item.product.summary}</p>
								{/if}
								<div class="mt-3 flex items-center gap-2">
									<Avatar.Root class="h-6 w-6">
										<Avatar.Image
											src={item.product.owner.avatarUrl}
											alt={item.product.owner.name}
										/>
										<Avatar.Fallback class="text-xs">
											{item.product.owner.name.slice(0, 2)}
										</Avatar.Fallback>
									</Avatar.Root>
									<span class="text-sm text-muted-foreground">{item.product.owner.name}</span>
								</div>
								<div class="mt-3 flex flex-wrap gap-1">
									{#each item.product.tags.slice(0, 3) as tag}
										<Badge variant="outline" class="text-xs">{tag}</Badge>
									{/each}
								</div>
								<div class="mt-4 flex items-center justify-between">
									<div class="text-sm font-medium">
										{#if item.product.price}
											¥{item.product.price.toLocaleString()}
										{:else if item.product.priceMin && item.product.priceMax}
											¥{item.product.priceMin.toLocaleString()} 〜
										{:else}
											要相談
										{/if}
									</div>
									<Button size="sm" href={`/r/${slug}-${item.product.id}`}>
										詳細を見る
										<ExternalLink class="ml-1 h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</Card.Root>
				{/each}
			</div>
		{:else}
			<Card.Root class="py-12 text-center">
				<p class="text-muted-foreground">まだおすすめが登録されていません</p>
			</Card.Root>
		{/if}
	</main>
</div>
