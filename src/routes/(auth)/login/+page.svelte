<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;

		// モック: ログイン処理をシミュレート
		await new Promise((r) => setTimeout(r, 1000));

		toast.success('ログインしました');
		goto(resolve('/app/dashboard'));
	}
</script>

<svelte:head>
	<title>ログイン - BizGuild</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-muted/50 px-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1 text-center">
			<div
				class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"
			>
				<span class="text-xl font-bold">B</span>
			</div>
			<Card.Title class="text-2xl">ログイン</Card.Title>
			<Card.Description>起業家・事業者ネットワークで、顧客の相談を窓口一本化</Card.Description>
		</Card.Header>
		<Card.Content>
			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="email">メールアドレス</Label>
					<Input
						id="email"
						type="email"
						placeholder="you@example.com"
						bind:value={email}
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="password">パスワード</Label>
					<Input
						id="password"
						type="password"
						placeholder="••••••••"
						bind:value={password}
						required
					/>
				</div>
				<Button type="submit" class="w-full" disabled={isLoading}>
					{#if isLoading}
						ログイン中...
					{:else}
						ログイン
					{/if}
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2 text-center text-sm">
			<a href={resolve('/register')} class="text-primary hover:underline">
				アカウントをお持ちでない方はこちら
			</a>
		</Card.Footer>
	</Card.Root>
</div>
