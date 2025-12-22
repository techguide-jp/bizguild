<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface Props {
		title: string;
		value: string | number;
		description?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: any;
		trend?: {
			value: number;
			label: string;
		};
	}

	let { title, value, description, icon: IconComponent, trend }: Props = $props();
</script>

<Card.Root class="shadow-soft hover:shadow-soft-lg transition-all">
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium text-muted-foreground">{title}</Card.Title>
		{#if IconComponent}
			<div class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
				<IconComponent class="h-4 w-4 text-primary" />
			</div>
		{/if}
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold tracking-tight">{value}</div>
		{#if description}
			<p class="mt-1 text-xs text-muted-foreground">{description}</p>
		{/if}
		{#if trend}
			<p class="mt-1 text-xs font-medium {trend.value >= 0 ? 'text-emerald-500' : 'text-rose-500'}">
				{trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
			</p>
		{/if}
	</Card.Content>
</Card.Root>
