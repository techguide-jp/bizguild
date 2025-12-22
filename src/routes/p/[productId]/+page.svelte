<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import InquiryDialog from '$lib/components/InquiryDialog.svelte';
	import { products, PRODUCT_TYPE_LABELS } from '$lib/mock';
	import { parseDescription } from '$lib/utils/description';
	import { Coins, ExternalLink } from 'lucide-svelte';

	const productId = $page.params.productId;
	const product = products.find((p) => p.id === productId) || products[0];

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
	<title>{product.title} - BizGuild</title>
</svelte:head>

<div class="min-h-screen bg-muted/30">
	<!-- Header Image -->
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

						{#if product.pointPolicy}
							<div class="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-amber-700">
								<Coins class="h-4 w-4" />
								<span class="text-sm">
									{#if product.pointPolicy.mode === 'FIXED'}
										紹介ポイント: {product.pointPolicy.value.toLocaleString()}pt
									{:else}
										紹介ポイント: {product.pointPolicy.value}%
									{/if}
								</span>
							</div>
						{/if}
					</Card.Content>
					<Card.Footer class="flex flex-col gap-2">
						<InquiryDialog
							targetUser={product.owner}
							sourceProduct={product}
							buttonText="相談する"
						/>
					</Card.Footer>
				</Card.Root>

				<!-- Provider Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-lg">提供者</Card.Title>
					</Card.Header>
					<Card.Content>
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
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</div>
