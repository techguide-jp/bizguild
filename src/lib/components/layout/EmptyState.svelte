<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Inbox } from 'lucide-svelte';

	interface Props {
		title: string;
		description?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: any;
		action?: Snippet;
		/** 簡易アクション: ボタンラベル */
		actionLabel?: string;
		/** 簡易アクション: リンク先 */
		actionHref?: string;
	}

	let {
		title,
		description,
		icon: IconComponent = Inbox,
		action,
		actionLabel,
		actionHref
	}: Props = $props();
</script>

<div class="flex flex-col items-center justify-center py-12 text-center">
	<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
		<IconComponent class="h-8 w-8 text-muted-foreground" />
	</div>
	<h3 class="mb-1 text-lg font-semibold">{title}</h3>
	{#if description}
		<p class="mb-4 max-w-sm text-sm text-muted-foreground">{description}</p>
	{/if}
	{#if action}
		{@render action()}
	{:else if actionLabel && actionHref}
		<Button href={actionHref}>{actionLabel}</Button>
	{/if}
</div>
