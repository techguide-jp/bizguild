<script lang="ts">
	import { goto } from '$app/navigation';
	import { PageHeader } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Separator } from '$lib/components/ui/separator';
	import { toast } from 'svelte-sonner';
	import { Package, Eye, Save } from 'lucide-svelte';

	let title = $state('');
	let summary = $state('');
	let description = $state('');
	let type = $state('ONE_TIME');
	let price = $state('');
	let priceMin = $state('');
	let priceMax = $state('');
	let tags = $state('');
	let providerVisibility = $state('FULL');
	let pointMode = $state('PERCENT');
	let pointValue = $state('');
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

		// モック: 保存をシミュレート
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.success('商品を作成しました');
		goto('/app/products');
	}

	async function handleSaveDraft() {
		isLoading = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
		toast.success('下書きを保存しました');
		isLoading = false;
	}
</script>

<svelte:head>
	<title>商品作成 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="商品作成" description="新しい商品を作成します" icon={Package}>
		{#snippet actions()}
			<Button variant="outline" onclick={handleSaveDraft} disabled={isLoading}>
				<Save class="mr-2 h-4 w-4" />
				下書き保存
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
					<Input
						id="title"
						placeholder="例: SEOコンサルティング"
						bind:value={title}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="summary">サマリー</Label>
					<Input
						id="summary"
						placeholder="例: 検索順位を上げて集客力アップ！"
						bind:value={summary}
					/>
				</div>

				<div class="space-y-2">
					<Label for="description">詳細説明（Markdown）</Label>
					<Textarea
						id="description"
						placeholder="## サービス内容&#10;&#10;- 項目1&#10;- 項目2"
						bind:value={description}
						rows={10}
					/>
				</div>

				<div class="space-y-2">
					<Label for="tags">タグ（カンマ区切り）</Label>
					<Input
						id="tags"
						placeholder="例: SEO, マーケティング, コンサルティング"
						bind:value={tags}
					/>
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
							{typeOptions.find((o) => o.value === type)?.label || '選択してください'}
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
						<Input
							id="price"
							type="number"
							placeholder="例: 100000"
							bind:value={price}
						/>
						{#if type === 'SUBSCRIPTION'}
							<p class="text-sm text-muted-foreground">※月額料金として表示されます</p>
						{/if}
					</div>
				{:else if type === 'QUOTE'}
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="space-y-2">
							<Label for="priceMin">最低価格（円）</Label>
							<Input
								id="priceMin"
								type="number"
								placeholder="例: 500000"
								bind:value={priceMin}
							/>
						</div>
						<div class="space-y-2">
							<Label for="priceMax">最高価格（円）</Label>
							<Input
								id="priceMax"
								type="number"
								placeholder="例: 5000000"
								bind:value={priceMax}
							/>
						</div>
					</div>
				{:else if type === 'OUTCOME'}
					<p class="text-sm text-muted-foreground">
						成果報酬型の料金は、相談時に個別に決定します。
					</p>
				{/if}
			</Card.Content>
		</Card.Root>

		<!-- ポイント設定 -->
		<Card.Root>
			<Card.Header>
				<Card.Title>ポイント設定</Card.Title>
				<Card.Description>
					紹介者へのポイント付与設定
				</Card.Description>
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
						<Input
							id="pointValue"
							type="number"
							placeholder={pointMode === 'PERCENT' ? '例: 10' : '例: 5000'}
							bind:value={pointValue}
						/>
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
				<Card.Description>
					紹介リンクでの提供者情報の表示方法
				</Card.Description>
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
					<p class="text-sm text-muted-foreground">
						「非表示」を選択すると、紹介リンクで提供者情報が表示されず、フロント（紹介者）のコンテンツとして表示されます。
					</p>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Actions -->
		<div class="flex justify-end gap-4">
			<Button variant="outline" type="button" href="/app/products">
				キャンセル
			</Button>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					作成中...
				{:else}
					公開する
				{/if}
			</Button>
		</div>
	</form>
</div>
