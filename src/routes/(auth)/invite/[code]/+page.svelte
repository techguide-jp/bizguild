<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { CheckCircle } from 'lucide-svelte';

	const inviteCode = $page.params.code;

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let passwordConfirm = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (password !== passwordConfirm) {
			toast.error('パスワードが一致しません');
			return;
		}

		isLoading = true;

		// モック: 登録処理をシミュレート
		await new Promise((r) => setTimeout(r, 1000));

		toast.success('登録が完了しました。審査フォームへ進みます。');
		goto(resolve('/screening'));
	}
</script>

<svelte:head>
	<title>招待登録 - BizGuild</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-8">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1 text-center">
			<div
				class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"
			>
				<span class="text-xl font-bold">B</span>
			</div>
			<Card.Title class="text-2xl">招待登録</Card.Title>
			<Card.Description>招待コードが適用されています</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="mb-6 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700">
				<CheckCircle class="h-5 w-5" />
				<span class="text-sm">招待コード: <strong>{inviteCode}</strong></span>
			</div>

			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="name">お名前</Label>
					<Input id="name" type="text" placeholder="山田 太郎" bind:value={name} required />
				</div>
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
						placeholder="8文字以上"
						bind:value={password}
						minlength={8}
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="passwordConfirm">パスワード（確認）</Label>
					<Input
						id="passwordConfirm"
						type="password"
						placeholder="もう一度入力"
						bind:value={passwordConfirm}
						minlength={8}
						required
					/>
				</div>
				<Button type="submit" class="w-full" disabled={isLoading}>
					{#if isLoading}
						登録中...
					{:else}
						登録する
					{/if}
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2 text-center text-sm">
			<a href={resolve('/login')} class="text-primary hover:underline">
				既にアカウントをお持ちの方はこちら
			</a>
		</Card.Footer>
	</Card.Root>
</div>
