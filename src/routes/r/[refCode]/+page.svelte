<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { users, products, PRODUCT_TYPE_LABELS, VISIBILITY_LABELS } from '$lib/mock';
	import InquiryDialog from '$lib/components/InquiryDialog.svelte';
	import { Coins, ExternalLink } from 'lucide-svelte';

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

	function formatDescription(md: string): string {
		return md
			.replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold mt-6 mb-2">$1</h2>')
			.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
			.replace(/\n\n/g, '</p><p class="mt-3">')
			.replace(/\n/g, '<br>');
	}
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
							{#each product.tags as tag}
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
							<div class="prose prose-sm max-w-none">
								{@html formatDescription(product.descriptionMd)}
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
									href={`/u/${product.owner.slug}`}
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
							href={`/u/${frontUser.slug}`}
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
