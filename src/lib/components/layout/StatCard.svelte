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

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium">{title}</Card.Title>
		{#if IconComponent}
			<IconComponent class="h-4 w-4 text-muted-foreground" />
		{/if}
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">{value}</div>
		{#if description}
			<p class="text-xs text-muted-foreground">{description}</p>
		{/if}
		{#if trend}
			<p class="text-xs {trend.value >= 0 ? 'text-green-600' : 'text-red-600'}">
				{trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
			</p>
		{/if}
	</Card.Content>
</Card.Root>
