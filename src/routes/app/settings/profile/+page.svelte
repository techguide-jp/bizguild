<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHeader } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { currentUser } from '$lib/mock';
	import { User, Camera, ExternalLink } from 'lucide-svelte';

	let name = $state(currentUser.name);
	let email = $state(currentUser.email);
	let slug = $state(currentUser.slug);
	let headline = $state(currentUser.headline || '');
	let specialties = $state(currentUser.specialties.join(', '));
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;

		await new Promise((r) => setTimeout(r, 1000));

		toast.success('プロフィールを更新しました');
		isLoading = false;
	}
</script>

<svelte:head>
	<title>プロフィール設定 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="プロフィール設定" description="あなたの情報を編集します" icon={User}>
		{#snippet actions()}
			<Button variant="outline" href={resolve(`/u/${currentUser.slug}`)}>
				<ExternalLink class="mr-2 h-4 w-4" />
				公開ページを見る
			</Button>
		{/snippet}
	</PageHeader>

	<form onsubmit={handleSubmit} class="mt-6 space-y-6">
		<!-- Avatar -->
		<Card.Root>
			<Card.Header>
				<Card.Title>アバター</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center gap-6">
					<div class="relative">
						<Avatar.Root class="h-24 w-24">
							<Avatar.Image src={currentUser.avatarUrl} alt={currentUser.name} />
							<Avatar.Fallback class="text-2xl">{currentUser.name.slice(0, 2)}</Avatar.Fallback>
						</Avatar.Root>
						<button
							type="button"
							class="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
							onclick={() => toast.info('画像アップロード機能（モック）')}
						>
							<Camera class="h-4 w-4" />
						</button>
					</div>
					<div class="text-sm text-muted-foreground">
						<p>推奨サイズ: 400x400px</p>
						<p>対応形式: JPG, PNG</p>
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Basic Info -->
		<Card.Root>
			<Card.Header>
				<Card.Title>基本情報</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label for="name">お名前 *</Label>
					<Input id="name" bind:value={name} required />
				</div>

				<div class="space-y-2">
					<Label for="email">メールアドレス *</Label>
					<Input id="email" type="email" bind:value={email} required />
				</div>

				<div class="space-y-2">
					<Label for="slug">URL用ID *</Label>
					<div class="flex items-center gap-2">
						<span class="text-sm text-muted-foreground">/u/</span>
						<Input id="slug" bind:value={slug} required />
					</div>
					<p class="text-xs text-muted-foreground">公開プロフィールのURLに使用されます</p>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Profile -->
		<Card.Root>
			<Card.Header>
				<Card.Title>プロフィール</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label for="headline">肩書き / キャッチコピー</Label>
					<Input
						id="headline"
						placeholder="例: Webマーケティングコンサルタント"
						bind:value={headline}
					/>
				</div>

				<div class="space-y-2">
					<Label for="specialties">得意領域（カンマ区切り）</Label>
					<Textarea
						id="specialties"
						placeholder="例: SEO, リスティング広告, SNS運用"
						bind:value={specialties}
						rows={3}
					/>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Actions -->
		<div class="flex justify-end">
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
