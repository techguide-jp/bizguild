<script lang="ts">
	interface DataPoint {
		label: string;
		value: number;
	}

	interface Props {
		data: DataPoint[];
		height?: number;
		color?: string;
		showValues?: boolean;
		yAxisLabel?: string;
		xAxisLabel?: string;
	}

	let {
		data,
		height = 200,
		color = 'var(--primary)',
		showValues = true,
		yAxisLabel,
		xAxisLabel
	}: Props = $props();

	$effect(() => {
		// TODO: showValuesの表示切り替えを将来対応する
		void showValues;
	});

	// Y軸の範囲を計算
	const yScale = $derived(() => {
		const dataMax = Math.max(...data.map((d) => d.value));
		const max = Math.ceil(dataMax / 5) * 5 || 5;
		const mid = Math.round(max / 2);
		return { max, mid, min: 0 };
	});

	// X軸ラベル（30日なら5個に間引き）
	const xLabels = $derived(() => {
		if (data.length <= 7) {
			return data.map((d, i) => ({ index: i, label: d.label }));
		}

		// 5つのポイント
		const indices = [
			0,
			Math.floor(data.length / 4),
			Math.floor(data.length / 2),
			Math.floor((data.length * 3) / 4),
			data.length - 1
		];

		return indices.map((i) => ({ index: i, label: data[i].label }));
	});

	const chartHeight = $derived(height - 40);
</script>

<div class="w-full">
	{#if yAxisLabel}
		<div class="mb-1 text-[10px] font-medium text-muted-foreground">{yAxisLabel}</div>
	{/if}

	<div class="flex gap-2">
		<!-- Y軸の値 -->
		<div
			class="flex flex-col justify-between text-right text-[10px] text-muted-foreground tabular-nums"
			style="height: {chartHeight}px;"
		>
			<span>{yScale().max}</span>
			<span>{yScale().mid}</span>
			<span>{yScale().min}</span>
		</div>

		<!-- グラフ本体 -->
		<div class="flex-1" style="height: {chartHeight}px;">
			<div class="relative h-full">
				<!-- グリッド線 -->
				<div class="pointer-events-none absolute inset-0 flex flex-col justify-between">
					<div class="border-b border-dashed border-muted-foreground/15"></div>
					<div class="border-b border-dashed border-muted-foreground/15"></div>
					<div class="border-b border-muted-foreground/20"></div>
				</div>

				<!-- バー -->
				<div class="relative flex h-full items-end gap-px">
					{#each data as point, i (i)}
						{@const percentage = yScale().max > 0 ? (point.value / yScale().max) * 100 : 0}
						<div class="group flex h-full min-w-0 flex-1 flex-col items-center justify-end">
							<!-- ホバー時の値表示 -->
							<div
								class="pointer-events-none mb-0.5 text-[9px] font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100"
							>
								{point.value}
							</div>
							<div
								class="w-full rounded-t-sm transition-all group-hover:opacity-80"
								style="height: {percentage}%; background-color: {color}; min-height: {point.value >
								0
									? '1px'
									: '0'};"
							></div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- X軸ラベル -->
	<div class="mt-1 ml-6 flex justify-between text-[10px] text-muted-foreground">
		{#each xLabels() as { label, index } (index)}
			<span>{label}</span>
		{/each}
	</div>

	{#if xAxisLabel}
		<div class="mt-1 text-center text-[10px] font-medium text-muted-foreground">{xAxisLabel}</div>
	{/if}
</div>
