<script lang="ts">
	interface DataPoint {
		label: string;
		value: number;
		color?: string;
	}

	interface Props {
		data: DataPoint[];
		size?: number;
		donut?: boolean;
		showLegend?: boolean;
	}

	let { data, size = 160, donut = true, showLegend = true }: Props = $props();

	const defaultColors = [
		'oklch(0.68 0.12 15)', // primary pink
		'oklch(0.7 0.1 170)', // teal
		'oklch(0.7 0.1 300)', // purple
		'oklch(0.75 0.12 80)', // yellow
		'oklch(0.65 0.15 250)', // blue
		'oklch(0.6 0.1 30)' // orange
	];

	const total = $derived(data.reduce((sum, d) => sum + d.value, 0));

	// Calculate pie segments
	const segments = $derived(() => {
		let currentAngle = -90; // Start from top
		return data.map((d, i) => {
			const percentage = total > 0 ? (d.value / total) * 100 : 0;
			const angle = (percentage / 100) * 360;
			const startAngle = currentAngle;
			const endAngle = currentAngle + angle;
			currentAngle = endAngle;

			const startRad = (startAngle * Math.PI) / 180;
			const endRad = (endAngle * Math.PI) / 180;

			const x1 = 50 + 40 * Math.cos(startRad);
			const y1 = 50 + 40 * Math.sin(startRad);
			const x2 = 50 + 40 * Math.cos(endRad);
			const y2 = 50 + 40 * Math.sin(endRad);

			const largeArcFlag = angle > 180 ? 1 : 0;

			return {
				...d,
				percentage,
				color: d.color || defaultColors[i % defaultColors.length],
				path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
			};
		});
	});
</script>

<div class="flex items-center gap-4">
	<div style="width: {size}px; height: {size}px;" class="relative">
		<svg viewBox="0 0 100 100" class="h-full w-full -rotate-0">
			{#each segments() as segment (segment.label)}
				<path d={segment.path} fill={segment.color} class="transition-opacity hover:opacity-80" />
			{/each}
			{#if donut}
				<circle cx="50" cy="50" r="25" fill="var(--card)" />
			{/if}
		</svg>
		{#if donut}
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="text-center">
					<div class="text-lg font-bold">{total.toLocaleString()}</div>
					<div class="text-[10px] text-muted-foreground">合計</div>
				</div>
			</div>
		{/if}
	</div>

	{#if showLegend}
		<div class="flex flex-col gap-1.5">
			{#each segments() as segment (segment.label)}
				<div class="flex items-center gap-2 text-sm">
					<div class="h-3 w-3 rounded-sm" style="background-color: {segment.color};"></div>
					<span class="text-muted-foreground">{segment.label}</span>
					<span class="font-medium">{segment.percentage.toFixed(0)}%</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
