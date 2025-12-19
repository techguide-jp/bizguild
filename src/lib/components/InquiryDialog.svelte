<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { MessageSquare, Send } from 'lucide-svelte';
	import type { User, Product } from '$lib/mock/types';

	interface Props {
		/** 相談先のユーザー */
		targetUser: User;
		/** 関連商品（任意） */
		sourceProduct?: Product;
		/** ボタンのテキスト */
		buttonText?: string;
		/** ボタンのバリアント */
		buttonVariant?: 'default' | 'outline' | 'ghost';
		/** カスタムスタイル */
		buttonStyle?: string;
	}

	let {
		targetUser,
		sourceProduct,
		buttonText = '相談する',
		buttonVariant = 'default',
		buttonStyle = ''
	}: Props = $props();

	let open = $state(false);
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!message.trim()) {
			toast.error('相談内容を入力してください');
			return;
		}

		isLoading = true;

		// モック: 送信をシミュレート
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.success('相談を送信しました。担当者からご連絡いたします。');
		open = false;
		name = '';
		email = '';
		message = '';
		isLoading = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant={buttonVariant} style={buttonStyle}>
				<MessageSquare class="mr-2 h-4 w-4" />
				{buttonText}
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>相談する</Dialog.Title>
			<Dialog.Description>
				{targetUser.name}さんへ相談を送信します。
				{#if sourceProduct}
					<span class="mt-1 block text-xs">関連商品: {sourceProduct.title}</span>
				{/if}
			</Dialog.Description>
		</Dialog.Header>
		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="inquiry-name">お名前</Label>
				<Input
					id="inquiry-name"
					placeholder="山田 太郎"
					bind:value={name}
				/>
			</div>
			<div class="space-y-2">
				<Label for="inquiry-email">メールアドレス</Label>
				<Input
					id="inquiry-email"
					type="email"
					placeholder="you@example.com"
					bind:value={email}
				/>
				<p class="text-xs text-muted-foreground">
					返信のためにメールアドレスをご入力ください
				</p>
			</div>
			<div class="space-y-2">
				<Label for="inquiry-message">相談内容 *</Label>
				<Textarea
					id="inquiry-message"
					placeholder="どのようなことでお困りですか？&#10;具体的にお書きいただけると、より適切なご提案ができます。"
					bind:value={message}
					rows={5}
					required
				/>
			</div>
			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => (open = false)}>
					キャンセル
				</Button>
				<Button type="submit" disabled={isLoading}>
					{#if isLoading}
						送信中...
					{:else}
						<Send class="mr-2 h-4 w-4" />
						送信する
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
