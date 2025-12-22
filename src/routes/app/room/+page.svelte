<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHeader, EmptyState } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Avatar from '$lib/components/ui/avatar';
	import { toast } from 'svelte-sonner';
	import { boards, products, currentUser } from '$lib/mock';
	import { Heart, Plus, GripVertical, Trash2, MessageSquare, ExternalLink } from 'lucide-svelte';

	const board = boards[0];
	let items = $state([...board.items]);
	let showAddDialog = $state(false);

	// 自分以外の商品を追加候補として表示
	const availableProducts = products.filter(
		(p) => p.owner.id !== currentUser.id && p.status === 'PUBLISHED'
	);

	function removeItem(index: number) {
		items = items.filter((_, i) => i !== index);
		toast.success('商品を削除しました');
	}

	function addProduct(product: (typeof products)[0]) {
		if (items.some((item) => item.product.id === product.id)) {
			toast.error('既に追加されています');
			return;
		}
		items = [...items, { product, comment: '' }];
		toast.success('商品を追加しました');
		showAddDialog = false;
	}

	function updateComment(index: number, comment: string) {
		items = items.map((item, i) => (i === index ? { ...item, comment } : item));
	}
</script>

<svelte:head>
	<title>おすすめ編集 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader
		title="おすすめ編集"
		description="信頼できるパートナーの商品を紹介しましょう"
		icon={Heart}
	>
		{#snippet actions()}
			<Button variant="outline" href={resolve(`/u/${currentUser.slug}/room`)}>
				<ExternalLink class="mr-2 h-4 w-4" />
				プレビュー
			</Button>
			<Button onclick={() => (showAddDialog = true)}>
				<Plus class="mr-2 h-4 w-4" />
				商品を追加
			</Button>
		{/snippet}
	</PageHeader>

	<div class="mt-6">
		{#if items.length > 0}
			<div class="space-y-4">
				{#each items as item, index (item.product.id)}
					<Card.Root>
						<div class="flex items-start gap-4 p-4">
							<button class="mt-2 cursor-grab text-muted-foreground hover:text-foreground">
								<GripVertical class="h-5 w-5" />
							</button>

							{#if item.product.images[0]}
								<img
									src={item.product.images[0]}
									alt={item.product.title}
									class="h-20 w-20 rounded-lg object-cover"
								/>
							{:else}
								<div class="flex h-20 w-20 items-center justify-center rounded-lg bg-muted">
									<Heart class="h-8 w-8 text-muted-foreground" />
								</div>
							{/if}

							<div class="flex-1 space-y-2">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="font-medium">{item.product.title}</h3>
										<div class="mt-1 flex items-center gap-2">
											<Avatar.Root class="h-5 w-5">
												<Avatar.Image
													src={item.product.owner.avatarUrl}
													alt={item.product.owner.name}
												/>
												<Avatar.Fallback class="text-xs">
													{item.product.owner.name.slice(0, 2)}
												</Avatar.Fallback>
											</Avatar.Root>
											<span class="text-sm text-muted-foreground">
												{item.product.owner.name}
											</span>
										</div>
									</div>
									<Button
										variant="ghost"
										size="icon"
										class="text-destructive"
										onclick={() => removeItem(index)}
									>
										<Trash2 class="h-4 w-4" />
									</Button>
								</div>

								<div class="flex items-center gap-2">
									<MessageSquare class="h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="コメントを追加（任意）"
										value={item.comment || ''}
										oninput={(e) => updateComment(index, (e.target as HTMLInputElement).value)}
										class="flex-1"
									/>
								</div>
							</div>
						</div>
					</Card.Root>
				{/each}
			</div>

			<div class="mt-6 flex justify-end">
				<Button onclick={() => toast.success('保存しました')}>変更を保存</Button>
			</div>
		{:else}
			<Card.Root>
				<EmptyState
					title="おすすめがありません"
					description="信頼できるパートナーの商品を追加しましょう"
					icon={Heart}
				>
					{#snippet action()}
						<Button onclick={() => (showAddDialog = true)}>
							<Plus class="mr-2 h-4 w-4" />
							商品を追加
						</Button>
					{/snippet}
				</EmptyState>
			</Card.Root>
		{/if}
	</div>
</div>

<!-- Add Product Dialog -->
{#if showAddDialog}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<Card.Root class="w-full max-w-lg">
			<Card.Header>
				<Card.Title>商品を追加</Card.Title>
				<Card.Description>おすすめに追加する商品を選択してください</Card.Description>
			</Card.Header>
			<Card.Content class="max-h-96 space-y-2 overflow-y-auto">
				{#each availableProducts as product (product.id)}
					<button
						class="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent"
						onclick={() => addProduct(product)}
					>
						{#if product.images[0]}
							<img
								src={product.images[0]}
								alt={product.title}
								class="h-12 w-12 rounded-lg object-cover"
							/>
						{:else}
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
								<Heart class="h-6 w-6 text-muted-foreground" />
							</div>
						{/if}
						<div class="flex-1">
							<p class="font-medium">{product.title}</p>
							<p class="text-sm text-muted-foreground">{product.owner.name}</p>
						</div>
						<Plus class="h-5 w-5 text-muted-foreground" />
					</button>
				{/each}
			</Card.Content>
			<Card.Footer>
				<Button variant="outline" class="w-full" onclick={() => (showAddDialog = false)}>
					キャンセル
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
{/if}
