<script lang="ts">
	interface DataPoint {
		label: string;
		value: number;
	}

	interface Props {
		data: DataPoint[];
		height?: number;
		color?: string;
		showLabels?: boolean;
		yAxisLabel?: string;
		xAxisLabel?: string;
	}

	let {
		data,
		height = 200,
		color = 'var(--primary)',
		showLabels = true,
		yAxisLabel,
		xAxisLabel
	}: Props = $props();

	// Y軸の範囲を計算（きれいな数値に丸める）
	const yScale = $derived(() => {
		const values = data.map((d) => d.value);
		const dataMax = Math.max(...values);
		const dataMin = Math.min(...values);

		// 10単位で丸める
		const max = Math.ceil(dataMax / 10) * 10;
		const min = Math.max(0, Math.floor(dataMin / 10) * 10 - 10);
		const mid = Math.round((max + min) / 2);
		const range = max - min || 1;

		return { max, mid, min, range };
	});

	// グラフ描画エリア
	const chartLeft = 0;
	const chartWidth = 100;
	const chartTop = 10;
	const chartBottom = $derived(height - 30);
	const chartHeight = $derived(chartBottom - chartTop);

	// Y座標を計算
	function getY(value: number): number {
		const { min, range } = yScale();
		return chartBottom - ((value - min) / range) * chartHeight;
	}

	// SVG path for the line
	const linePath = $derived(() => {
		if (data.length === 0) return '';
		const stepX = chartWidth / (data.length - 1 || 1);

		return data
			.map((d, i) => {
				const x = chartLeft + i * stepX;
				const y = getY(d.value);
				return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
			})
			.join(' ');
	});

	// Area path
	const areaPath = $derived(() => {
		if (data.length === 0) return '';
		const stepX = chartWidth / (data.length - 1 || 1);

		const points = data.map((d, i) => {
			const x = chartLeft + i * stepX;
			const y = getY(d.value);
			return `${x},${y}`;
		});

		return `M ${chartLeft},${chartBottom} L ${points.join(' L ')} L ${chartLeft + chartWidth},${chartBottom} Z`;
	});

	// X軸ラベル（30日なら5〜7個に間引き）
	const xLabels = $derived(() => {
		if (data.length <= 7) {
			return data.map((d, i) => ({ index: i, label: d.label }));
		}

		// 5つのポイント: 最初、1/4、中間、3/4、最後
		const indices = [
			0,
			Math.floor(data.length / 4),
			Math.floor(data.length / 2),
			Math.floor((data.length * 3) / 4),
			data.length - 1
		];

		return indices.map((i) => ({ index: i, label: data[i].label }));
	});

	// Y軸グリッド線のY座標
	const gridLines = $derived(() => {
		const { max, mid, min } = yScale();
		return [
			{ y: getY(max), label: max },
			{ y: getY(mid), label: mid },
			{ y: getY(min), label: min }
		];
	});
</script>

<div class="w-full">
	{#if yAxisLabel}
		<div class="mb-1 text-[10px] font-medium text-muted-foreground">{yAxisLabel}</div>
	{/if}

	<div class="flex gap-2">
		<!-- Y軸の値 -->
		<div class="flex flex-col justify-between text-right text-[10px] text-muted-foreground tabular-nums" style="height: {chartHeight}px; margin-top: {chartTop}px;">
			<span>{yScale().max}</span>
			<span>{yScale().mid}</span>
			<span>{yScale().min}</span>
		</div>

		<!-- グラフ本体 -->
		<div class="flex-1">
			<svg viewBox="0 0 100 {height}" class="w-full" style="height: {height}px;" preserveAspectRatio="none">
				<!-- Grid lines -->
				{#each gridLines() as line}
					<line
						x1="0"
						y1={line.y}
						x2="100"
						y2={line.y}
						stroke="currentColor"
						stroke-opacity="0.15"
						stroke-width="0.3"
						stroke-dasharray="2,2"
					/>
				{/each}

				<!-- Area fill -->
				<path d={areaPath()} fill={color} fill-opacity="0.1" />

				<!-- Line -->
				<path
					d={linePath()}
					fill="none"
					stroke={color}
					stroke-width="0.6"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>

				<!-- Data points (間引いて表示) -->
				{#each data as point, i}
					{#if i % Math.ceil(data.length / 15) === 0 || i === data.length - 1}
						{@const stepX = chartWidth / (data.length - 1 || 1)}
						{@const x = chartLeft + i * stepX}
						{@const y = getY(point.value)}
						<circle cx={x} cy={y} r="1" fill={color} />
					{/if}
				{/each}
			</svg>
		</div>
	</div>

	<!-- X軸ラベル -->
	{#if showLabels && data.length > 0}
		<div class="ml-6 flex justify-between text-[10px] text-muted-foreground mt-1">
			{#each xLabels() as { label }}
				<span>{label}</span>
			{/each}
		</div>
		{#if xAxisLabel}
			<div class="mt-1 text-center text-[10px] font-medium text-muted-foreground">{xAxisLabel}</div>
		{/if}
	{/if}
</div>
