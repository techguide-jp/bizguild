<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { users, products, PRODUCT_TYPE_LABELS } from '$lib/mock';
	import { parseDescription } from '$lib/utils/description';
	import InquiryDialog from '$lib/components/InquiryDialog.svelte';
	import { ExternalLink } from 'lucide-svelte';

	const refCode = $page.params.refCode ?? '';

	// refCodeからフロント（紹介者）と商品を解析
	// 形式: {userSlug}-{productId}
	const [userSlug, productId] = refCode.split('-');
	const frontUser = users.find((u) => u.slug === userSlug) || users[0];
	const product = products.find((p) => p.id === productId) || products[1];

	// テーマはフロントユーザーのものを使用
	const themeStyle = `
		--theme-primary: ${frontUser.theme.primaryColor};
		--theme-accent: ${frontUser.theme.accentColor};
		--theme-bg: ${frontUser.theme.bgColor};
		--theme-text: ${frontUser.theme.textColor};
	`;

	function formatPrice(): string {
		if (product.price) {
			return `¥${product.price.toLocaleString()}`;
		}
		if (product.priceMin && product.priceMax) {
			return `¥${product.priceMin.toLocaleString()} 〜 ¥${product.priceMax.toLocaleString()}`;
		}
		return '要相談';
	}

	const descriptionBlocks = product.descriptionMd ? parseDescription(product.descriptionMd) : [];
</script>

<svelte:head>
	<title>{product.title} - {frontUser.name}からのご紹介</title>
</svelte:head>

<div class="min-h-screen" style={themeStyle}>
	<!-- Header with front user branding -->
	<header class="border-b bg-[var(--theme-bg)]">
		<div class="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
			<Avatar.Root class="h-10 w-10">
				<Avatar.Image src={frontUser.avatarUrl} alt={frontUser.name} />
				<Avatar.Fallback>{frontUser.name.slice(0, 2)}</Avatar.Fallback>
			</Avatar.Root>
			<div>
				<p class="text-sm text-muted-foreground">{frontUser.name}からのご紹介</p>
			</div>
		</div>
	</header>

	<!-- Product Image -->
	{#if product.images[0]}
		<div class="h-64 w-full bg-muted sm:h-80">
			<img src={product.images[0]} alt={product.title} class="h-full w-full object-cover" />
		</div>
	{/if}

	<!-- Content -->
	<div class="mx-auto max-w-4xl px-4 py-8">
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="lg:col-span-2">
				<Card.Root>
					<Card.Header>
						<div class="flex flex-wrap items-center gap-2">
							<Badge>{PRODUCT_TYPE_LABELS[product.type]}</Badge>
							{#each product.tags as tag (tag)}
								<Badge variant="outline">{tag}</Badge>
							{/each}
						</div>
						<Card.Title class="text-2xl">{product.title}</Card.Title>
						{#if product.summary}
							<Card.Description class="text-base">{product.summary}</Card.Description>
						{/if}
					</Card.Header>
					<Card.Content>
						{#if product.descriptionMd}
							<div class="space-y-3 text-sm leading-relaxed text-foreground/90">
								{#each descriptionBlocks as block, blockIndex (blockIndex)}
									{#if block.type === 'heading'}
										<h2 class="text-lg font-semibold text-foreground">{block.text}</h2>
									{:else if block.type === 'list'}
										<ul class="list-disc space-y-1 pl-5">
											{#each block.items as item, itemIndex (itemIndex)}
												<li>{item}</li>
											{/each}
										</ul>
									{:else}
										<p>
											{#each block.lines as line, lineIndex (lineIndex)}
												{line}{#if lineIndex < block.lines.length - 1}<br />{/if}
											{/each}
										</p>
									{/if}
								{/each}
							</div>
						{/if}
					</Card.Content>
				</Card.Root>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Price Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-lg">料金</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-2xl font-bold">{formatPrice()}</p>
						{#if product.type === 'SUBSCRIPTION'}
							<p class="text-sm text-muted-foreground">/ 月</p>
						{:else if product.type === 'OUTCOME'}
							<p class="text-sm text-muted-foreground">成果報酬型</p>
						{/if}
					</Card.Content>
					<Card.Footer>
						<InquiryDialog
							targetUser={product.owner}
							sourceProduct={product}
							buttonText="相談する"
							buttonStyle="background-color: var(--theme-primary)"
						/>
					</Card.Footer>
				</Card.Root>

				<!-- Provider Info (visibility based on settings) -->
				{#if product.providerVisibility !== 'HIDDEN'}
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-lg">提供者</Card.Title>
						</Card.Header>
						<Card.Content>
							{#if product.providerVisibility === 'FULL'}
								<a
									href={resolve(`/u/${product.owner.slug}`)}
									class="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent"
								>
									<Avatar.Root class="h-12 w-12">
										<Avatar.Image src={product.owner.avatarUrl} alt={product.owner.name} />
										<Avatar.Fallback>{product.owner.name.slice(0, 2)}</Avatar.Fallback>
									</Avatar.Root>
									<div class="flex-1">
										<p class="font-medium">{product.owner.name}</p>
										{#if product.owner.headline}
											<p class="text-sm text-muted-foreground">{product.owner.headline}</p>
										{/if}
									</div>
									<ExternalLink class="h-4 w-4 text-muted-foreground" />
								</a>
							{:else}
								<!-- PARTIAL: 名前のみ -->
								<p class="font-medium">{product.owner.name}</p>
							{/if}
						</Card.Content>
					</Card.Root>
				{/if}

				<!-- Referrer -->
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-lg">ご紹介者</Card.Title>
					</Card.Header>
					<Card.Content>
						<a
							href={resolve(`/u/${frontUser.slug}`)}
							class="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent"
						>
							<Avatar.Root class="h-12 w-12">
								<Avatar.Image src={frontUser.avatarUrl} alt={frontUser.name} />
								<Avatar.Fallback>{frontUser.name.slice(0, 2)}</Avatar.Fallback>
							</Avatar.Root>
							<div class="flex-1">
								<p class="font-medium">{frontUser.name}</p>
								{#if frontUser.headline}
									<p class="text-sm text-muted-foreground">{frontUser.headline}</p>
								{/if}
							</div>
							<ExternalLink class="h-4 w-4 text-muted-foreground" />
						</a>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</div>
