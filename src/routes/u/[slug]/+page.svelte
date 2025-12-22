<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import InquiryDialog from '$lib/components/InquiryDialog.svelte';
	import { users, products } from '$lib/mock';
	import { Heart } from 'lucide-svelte';

	const slug = $page.params.slug;
	const user = users.find((u) => u.slug === slug) || users[0];
	const userProducts = products.filter((p) => p.owner.id === user.id && p.status === 'PUBLISHED');

	// テーマカラーをCSS変数に適用
	const themeStyle = `
		--theme-primary: ${user.theme.primaryColor};
		--theme-accent: ${user.theme.accentColor};
		--theme-bg: ${user.theme.bgColor};
		--theme-text: ${user.theme.textColor};
	`;
</script>

<svelte:head>
	<title>{user.name} - BizGuild</title>
</svelte:head>

<div class="min-h-screen" style={themeStyle}>
	<!-- Header with theme -->
	<header class="border-b bg-[var(--theme-bg)]">
		<div class="mx-auto max-w-4xl px-4 py-8">
			<div class="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
				<Avatar.Root class="h-24 w-24 border-4 border-white shadow-lg">
					<Avatar.Image src={user.avatarUrl} alt={user.name} />
					<Avatar.Fallback class="text-2xl">{user.name.slice(0, 2)}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex-1">
					<h1 class="text-2xl font-bold" style="color: var(--theme-text)">{user.name}</h1>
					{#if user.headline}
						<p class="mt-1 text-muted-foreground">{user.headline}</p>
					{/if}
					<div class="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
						{#each user.specialties as specialty (specialty)}
							<Badge variant="secondary">{specialty}</Badge>
						{/each}
					</div>
				</div>
				<div class="flex gap-2">
					<InquiryDialog targetUser={user} buttonStyle="background-color: var(--theme-primary)" />
					<Button variant="outline" href={`/u/${slug}/room`}>
						<Heart class="mr-2 h-4 w-4" />
						おすすめ
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-4xl px-4 py-8">
		<h2 class="mb-6 text-xl font-semibold">提供サービス</h2>

		{#if userProducts.length > 0}
			<div class="grid gap-6 sm:grid-cols-2">
				{#each userProducts as product (product.id)}
					<a href={resolve(`/p/${product.id}`)} class="group block">
						<Card.Root
							class="shadow-soft group-hover:shadow-soft-lg h-full overflow-hidden transition-all group-hover:-translate-y-1"
						>
							{#if product.images[0]}
								<img src={product.images[0]} alt={product.title} class="h-40 w-full object-cover" />
							{/if}
							<Card.Header>
								<Card.Title class="text-lg">{product.title}</Card.Title>
								{#if product.summary}
									<Card.Description>{product.summary}</Card.Description>
								{/if}
							</Card.Header>
							<Card.Content>
								<div class="flex flex-wrap gap-1">
									{#each product.tags.slice(0, 3) as tag (tag)}
										<Badge variant="outline" class="text-xs">{tag}</Badge>
									{/each}
								</div>
							</Card.Content>
							<Card.Footer>
								<div class="text-sm font-medium">
									{#if product.price}
										¥{product.price.toLocaleString()}
									{:else if product.priceMin && product.priceMax}
										¥{product.priceMin.toLocaleString()} 〜 ¥{product.priceMax.toLocaleString()}
									{:else}
										要相談
									{/if}
								</div>
							</Card.Footer>
						</Card.Root>
					</a>
				{/each}
			</div>
		{:else}
			<Card.Root class="py-12 text-center">
				<p class="text-muted-foreground">まだサービスが登録されていません</p>
			</Card.Root>
		{/if}
	</main>
</div>
