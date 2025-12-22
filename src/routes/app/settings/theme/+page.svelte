<script lang="ts">
	import { PageHeader } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { currentUser } from '$lib/mock';
	import { Palette, ExternalLink, RefreshCw } from 'lucide-svelte';

	let primaryColor = $state(currentUser.theme.primaryColor);
	let accentColor = $state(currentUser.theme.accentColor);
	let bgColor = $state(currentUser.theme.bgColor);
	let textColor = $state(currentUser.theme.textColor);
	let isLoading = $state(false);

	const presets = [
		{
			name: 'ブルー',
			primary: '#2563eb',
			accent: '#3b82f6',
			bg: '#f8fafc',
			text: '#1e293b'
		},
		{
			name: 'パープル',
			primary: '#7c3aed',
			accent: '#8b5cf6',
			bg: '#faf5ff',
			text: '#1e1b4b'
		},
		{
			name: 'グリーン',
			primary: '#059669',
			accent: '#10b981',
			bg: '#f0fdf4',
			text: '#14532d'
		},
		{
			name: 'オレンジ',
			primary: '#ea580c',
			accent: '#f97316',
			bg: '#fff7ed',
			text: '#431407'
		}
	];

	function applyPreset(preset: (typeof presets)[0]) {
		primaryColor = preset.primary;
		accentColor = preset.accent;
		bgColor = preset.bg;
		textColor = preset.text;
		toast.success(`「${preset.name}」テーマを適用しました`);
	}

	function resetToDefault() {
		applyPreset(presets[0]);
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.success('テーマを保存しました');
		isLoading = false;
	}

	// プレビュー用のスタイル
	const previewStyle = $derived(
		`--preview-primary: ${primaryColor}; --preview-accent: ${accentColor}; --preview-bg: ${bgColor}; --preview-text: ${textColor};`
	);
</script>

<svelte:head>
	<title>テーマ設定 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader
		title="テーマ設定"
		description="公開ページの見た目をカスタマイズします"
		icon={Palette}
	>
		{#snippet actions()}
			<Button variant="outline" href="/u/{currentUser.slug}">
				<ExternalLink class="mr-2 h-4 w-4" />
				公開ページを見る
			</Button>
		{/snippet}
	</PageHeader>

	<div class="mt-6 grid gap-6 lg:grid-cols-2">
		<!-- Settings -->
		<div class="space-y-6">
			<!-- Presets -->
			<Card.Root>
				<Card.Header>
					<Card.Title>プリセット</Card.Title>
					<Card.Description>ワンクリックでテーマを適用できます</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-2 gap-3">
						{#each presets as preset (preset.name)}
							<button
								class="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
								onclick={() => applyPreset(preset)}
							>
								<div class="h-8 w-8 rounded-full" style="background-color: {preset.primary}"></div>
								<span class="text-sm font-medium">{preset.name}</span>
							</button>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Custom Colors -->
			<Card.Root>
				<Card.Header>
					<div class="flex items-center justify-between">
						<div>
							<Card.Title>カスタムカラー</Card.Title>
							<Card.Description>自由に色を設定できます</Card.Description>
						</div>
						<Button variant="ghost" size="sm" onclick={resetToDefault}>
							<RefreshCw class="mr-2 h-4 w-4" />
							リセット
						</Button>
					</div>
				</Card.Header>
				<Card.Content>
					<form onsubmit={handleSubmit} class="space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label for="primaryColor">プライマリカラー</Label>
								<div class="flex gap-2">
									<Input
										id="primaryColor"
										type="color"
										bind:value={primaryColor}
										class="h-10 w-14 cursor-pointer p-1"
									/>
									<Input
										value={primaryColor}
										oninput={(e) => (primaryColor = (e.target as HTMLInputElement).value)}
										class="font-mono"
									/>
								</div>
							</div>

							<div class="space-y-2">
								<Label for="accentColor">アクセントカラー</Label>
								<div class="flex gap-2">
									<Input
										id="accentColor"
										type="color"
										bind:value={accentColor}
										class="h-10 w-14 cursor-pointer p-1"
									/>
									<Input
										value={accentColor}
										oninput={(e) => (accentColor = (e.target as HTMLInputElement).value)}
										class="font-mono"
									/>
								</div>
							</div>

							<div class="space-y-2">
								<Label for="bgColor">背景カラー</Label>
								<div class="flex gap-2">
									<Input
										id="bgColor"
										type="color"
										bind:value={bgColor}
										class="h-10 w-14 cursor-pointer p-1"
									/>
									<Input
										value={bgColor}
										oninput={(e) => (bgColor = (e.target as HTMLInputElement).value)}
										class="font-mono"
									/>
								</div>
							</div>

							<div class="space-y-2">
								<Label for="textColor">テキストカラー</Label>
								<div class="flex gap-2">
									<Input
										id="textColor"
										type="color"
										bind:value={textColor}
										class="h-10 w-14 cursor-pointer p-1"
									/>
									<Input
										value={textColor}
										oninput={(e) => (textColor = (e.target as HTMLInputElement).value)}
										class="font-mono"
									/>
								</div>
							</div>
						</div>

						<div class="flex justify-end pt-4">
							<Button type="submit" disabled={isLoading}>
								{#if isLoading}
									保存中...
								{:else}
									変更を保存
								{/if}
							</Button>
						</div>
					</form>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Preview -->
		<div>
			<Card.Root>
				<Card.Header>
					<Card.Title>プレビュー</Card.Title>
					<Card.Description>公開ページでの見え方</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="overflow-hidden rounded-lg border" style={previewStyle}>
						<!-- Preview Header -->
						<div class="p-4" style="background-color: var(--preview-bg)">
							<div class="flex items-center gap-3">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full text-white"
									style="background-color: var(--preview-primary)"
								>
									{currentUser.name.slice(0, 1)}
								</div>
								<div>
									<p class="font-medium" style="color: var(--preview-text)">
										{currentUser.name}
									</p>
									<p class="text-sm opacity-70" style="color: var(--preview-text)">
										{currentUser.headline}
									</p>
								</div>
							</div>
						</div>

						<!-- Preview Content -->
						<div class="space-y-3 bg-background p-4">
							<div class="rounded-lg border p-3">
								<p class="text-sm font-medium">サンプル商品</p>
								<p class="text-xs text-muted-foreground">商品の説明文がここに入ります</p>
							</div>
							<button
								class="w-full rounded-lg px-4 py-2 text-sm font-medium text-white"
								style="background-color: var(--preview-primary)"
							>
								相談する
							</button>
							<button
								class="w-full rounded-lg border px-4 py-2 text-sm font-medium"
								style="border-color: var(--preview-accent); color: var(--preview-accent)"
							>
								詳細を見る
							</button>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
