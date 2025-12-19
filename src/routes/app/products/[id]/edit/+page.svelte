<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { PageHeader } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { toast } from 'svelte-sonner';
	import { products } from '$lib/mock';
	import { Package, Eye, Save, Trash2 } from 'lucide-svelte';

	const productId = $page.params.id;
	const product = products.find((p) => p.id === productId) || products[0];

	let title = $state(product.title);
	let summary = $state(product.summary || '');
	let description = $state(product.descriptionMd || '');
	let type = $state(product.type);
	let price = $state(product.price?.toString() || '');
	let priceMin = $state(product.priceMin?.toString() || '');
	let priceMax = $state(product.priceMax?.toString() || '');
	let tags = $state(product.tags.join(', '));
	let providerVisibility = $state(product.providerVisibility);
	let pointMode = $state(product.pointPolicy?.mode || 'PERCENT');
	let pointValue = $state(product.pointPolicy?.value.toString() || '');
	let allowPointUse = $state(true);
	let isLoading = $state(false);

	const typeOptions = [
		{ value: 'ONE_TIME', label: '単発' },
		{ value: 'SUBSCRIPTION', label: 'サブスク' },
		{ value: 'OUTCOME', label: '成果報酬' },
		{ value: 'QUOTE', label: '見積' }
	];

	const visibilityOptions = [
		{ value: 'FULL', label: '完全表示（名前+プロフィール）' },
		{ value: 'PARTIAL', label: '名前のみ表示' },
		{ value: 'HIDDEN', label: '非表示（フロントのコンテンツとして表示）' }
	];

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.success('商品を更新しました');
		goto('/app/products');
	}

	async function handleSaveDraft() {
		isLoading = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
		toast.success('下書きを保存しました');
		isLoading = false;
	}

	async function handleDelete() {
		if (!confirm('この商品を削除しますか？')) return;

		isLoading = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
		toast.success('商品を削除しました');
		goto('/app/products');
	}
</script>

<svelte:head>
	<title>商品編集 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="商品編集" description={product.title} icon={Package}>
		{#snippet actions()}
			<Button variant="outline" onclick={handleSaveDraft} disabled={isLoading}>
				<Save class="mr-2 h-4 w-4" />
				下書き保存
			</Button>
			<Button variant="ghost" href="/p/{product.id}">
				<Eye class="mr-2 h-4 w-4" />
				プレビュー
			</Button>
		{/snippet}
	</PageHeader>

	<form onsubmit={handleSubmit} class="mt-6 space-y-6">
		<!-- 基本情報 -->
		<Card.Root>
			<Card.Header>
				<Card.Title>基本情報</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label for="title">タイトル *</Label>
					<Input id="title" bind:value={title} required />
				</div>

				<div class="space-y-2">
					<Label for="summary">サマリー</Label>
					<Input id="summary" bind:value={summary} />
				</div>

				<div class="space-y-2">
					<Label for="description">詳細説明（Markdown）</Label>
					<Textarea id="description" bind:value={description} rows={10} />
				</div>

				<div class="space-y-2">
					<Label for="tags">タグ（カンマ区切り）</Label>
					<Input id="tags" bind:value={tags} />
				</div>
			</Card.Content>
		</Card.Root>

		<!-- 料金設定 -->
		<Card.Root>
			<Card.Header>
				<Card.Title>料金設定</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label>料金タイプ *</Label>
					<Select.Root type="single" bind:value={type}>
						<Select.Trigger class="w-full">
							{typeOptions.find((o) => o.value === type)?.label}
						</Select.Trigger>
						<Select.Content>
							{#each typeOptions as option}
								<Select.Item value={option.value}>{option.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				{#if type === 'ONE_TIME' || type === 'SUBSCRIPTION'}
					<div class="space-y-2">
						<Label for="price">価格（円）</Label>
						<Input id="price" type="number" bind:value={price} />
					</div>
				{:else if type === 'QUOTE'}
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="space-y-2">
							<Label for="priceMin">最低価格（円）</Label>
							<Input id="priceMin" type="number" bind:value={priceMin} />
						</div>
						<div class="space-y-2">
							<Label for="priceMax">最高価格（円）</Label>
							<Input id="priceMax" type="number" bind:value={priceMax} />
						</div>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>

		<!-- ポイント設定 -->
		<Card.Root>
			<Card.Header>
				<Card.Title>ポイント設定</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<Label>ポイント計算方法</Label>
						<Select.Root type="single" bind:value={pointMode}>
							<Select.Trigger class="w-full">
								{pointMode === 'PERCENT' ? 'パーセント' : '固定'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="PERCENT">パーセント</Select.Item>
								<Select.Item value="FIXED">固定ポイント</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="space-y-2">
						<Label for="pointValue">
							{pointMode === 'PERCENT' ? 'ポイント率（%）' : 'ポイント数'}
						</Label>
						<Input id="pointValue" type="number" bind:value={pointValue} />
					</div>
				</div>

				<label class="flex items-center gap-2">
					<Checkbox bind:checked={allowPointUse} />
					<span class="text-sm">購入時のポイント利用を許可する</span>
				</label>
			</Card.Content>
		</Card.Root>

		<!-- 表示設定 -->
		<Card.Root>
			<Card.Header>
				<Card.Title>表示設定</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label>提供者表示レベル</Label>
					<Select.Root type="single" bind:value={providerVisibility}>
						<Select.Trigger class="w-full">
							{visibilityOptions.find((o) => o.value === providerVisibility)?.label}
						</Select.Trigger>
						<Select.Content>
							{#each visibilityOptions as option}
								<Select.Item value={option.value}>{option.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Danger Zone -->
		<Card.Root class="border-destructive">
			<Card.Header>
				<Card.Title class="text-destructive">危険な操作</Card.Title>
			</Card.Header>
			<Card.Content>
				<Button variant="destructive" type="button" onclick={handleDelete} disabled={isLoading}>
					<Trash2 class="mr-2 h-4 w-4" />
					商品を削除
				</Button>
			</Card.Content>
		</Card.Root>

		<!-- Actions -->
		<div class="flex justify-end gap-4">
			<Button variant="outline" type="button" href="/app/products">
				キャンセル
			</Button>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					保存中...
				{:else}
					変更を保存
				{/if}
			</Button>
		</div>
	</form>
</div>
