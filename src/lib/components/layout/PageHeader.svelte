<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		description?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: any;
		actions?: Snippet;
	}

	let { title, description, icon: IconComponent, actions }: Props = $props();
</script>

<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
	<div class="flex items-center gap-3">
		{#if IconComponent}
			<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-pink-200/50 text-primary shadow-soft">
				<IconComponent class="h-5 w-5" />
			</div>
		{/if}
		<div>
			<h1 class="text-2xl font-bold tracking-tight">{title}</h1>
			{#if description}
				<p class="text-sm text-muted-foreground">{description}</p>
			{/if}
		</div>
	</div>
	{#if actions}
		<div class="flex items-center gap-2">
			{@render actions()}
		</div>
	{/if}
</div>
