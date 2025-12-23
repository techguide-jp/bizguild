<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { applyAction, enhance } from '$app/forms';
	import {
		Check,
		Rocket,
		ArrowRight,
		Percent,
		Wallet,
		Users,
		ArrowDown,
		Calendar
	} from 'lucide-svelte';
	import {
		PLANS,
		COMMISSION_RATES,
		formatPriceYen,
		formatPercentInt
	} from '$lib/constants/pricing';
	import { fly } from 'svelte/transition';

	let selectedPlan: 'fixed' | 'revenue' | 'monthly' = 'fixed';
	export let isUnlocked = false;
	export let pricingError: string | undefined;
	let localUnlocked = isUnlocked;
	let showShake = false;
	$: if (isUnlocked) localUnlocked = true;
	const exampleAmount = 1000000;
	const simulationAmounts = [1000000, 2000000, 3000000, 5000000];
	const totalCommission = exampleAmount * COMMISSION_RATES.referralOnly.total;
	const referrerAmount = exampleAmount * COMMISSION_RATES.referralOnly.referrer;
	const fixedOwnerAmount = exampleAmount * PLANS.fixed.ownerCommissionRate;
	const fixedBizguildAmount = exampleAmount * PLANS.fixed.bizguildCommissionRate;
	const revenueOwnerAmount = exampleAmount * PLANS.revenue.ownerCommissionRate;
	const revenueBizguildAmount = exampleAmount * PLANS.revenue.bizguildCommissionRate;
	const monthlyOwnerAmount = exampleAmount * PLANS.monthly.ownerCommissionRate;
	const monthlyBizguildAmount = exampleAmount * PLANS.monthly.bizguildCommissionRate;
	const providerAmount = exampleAmount - totalCommission;
</script>

<section id="pricing" class="bg-muted/30 py-20">
	<div class="mx-auto max-w-5xl px-4">
		<div class="text-center">
			<Badge variant="secondary" class="mb-4 gap-1.5">
				<Rocket class="h-3.5 w-3.5" />
				開発パートナー募集中
			</Badge>
			<h2 class="text-2xl font-bold sm:text-3xl">一緒にサービスを作り上げませんか？</h2>
			<p class="mt-3 text-muted-foreground">開発パートナーとして参加いただける方を募集しています</p>
		</div>

		{#if localUnlocked}
			<div transition:fly={{ y: 12, duration: 240 }}>
				<!-- プラン選択タブ -->
				<div class="mx-auto mt-10 flex max-w-2xl rounded-lg bg-muted p-1">
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors {selectedPlan ===
						'fixed'
							? 'bg-background text-foreground shadow-sm'
							: 'text-muted-foreground hover:text-foreground'}"
						onclick={() => (selectedPlan = 'fixed')}
					>
						<Wallet class="h-4 w-4" />
						固定費
					</button>
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors {selectedPlan ===
						'revenue'
							? 'bg-background text-foreground shadow-sm'
							: 'text-muted-foreground hover:text-foreground'}"
						onclick={() => (selectedPlan = 'revenue')}
					>
						<Percent class="h-4 w-4" />
						レベニューシェア
					</button>
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors {selectedPlan ===
						'monthly'
							? 'bg-background text-foreground shadow-sm'
							: 'text-muted-foreground hover:text-foreground'}"
						onclick={() => (selectedPlan = 'monthly')}
					>
						<Calendar class="h-4 w-4" />
						月額重視
					</button>
				</div>

				<!-- プランカード -->
				<div class="mt-8 grid gap-6 lg:grid-cols-3">
					<!-- 固定費プラン -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="relative cursor-pointer rounded-xl border-2 bg-background transition-all duration-300 {selectedPlan ===
						'fixed'
							? 'border-primary shadow-lg'
							: 'border-transparent bg-background/50 opacity-60 hover:opacity-80'}"
						onclick={() => (selectedPlan = 'fixed')}
					>
						<Card.Root class="border-0 bg-transparent shadow-none">
							{#if selectedPlan === 'fixed'}
								<div class="absolute -top-3 left-1/2 -translate-x-1/2">
									<Badge class="bg-primary text-primary-foreground">おすすめ</Badge>
								</div>
							{/if}
							<Card.Header class="text-center">
								<div
									class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
								>
									<Wallet class="h-6 w-6 text-primary" />
								</div>
								<Card.Title class="text-xl">固定費プラン</Card.Title>
								<Card.Description>成約が多くなる見込みのコミュニティに</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="text-center">
									<div class="text-4xl font-bold">
										{PLANS.fixed.initialFee >= 10000
											? `${PLANS.fixed.initialFee / 10000}`
											: PLANS.fixed.initialFee}
										<span class="text-lg font-normal text-muted-foreground">
											{PLANS.fixed.initialFee >= 10000 ? '万円' : '円'}
										</span>
									</div>
									<p class="mt-1 text-sm text-muted-foreground">初期費用（税別）</p>
								</div>

								<div class="mt-6 space-y-2">
									<div class="rounded-lg bg-muted/50 p-3">
										<div class="flex items-center justify-between text-sm">
											<span class="text-muted-foreground">月額費用</span>
											<span class="font-semibold">
												{formatPriceYen(PLANS.fixed.monthlyFee)}<span
													class="font-normal text-muted-foreground">/月</span
												>
											</span>
										</div>
										<p class="mt-1 text-xs text-muted-foreground">
											※ リリース後{PLANS.fixed.monthlyFeeStartMonth}ヶ月目より発生
										</p>
									</div>
									<div class="rounded-lg bg-muted/50 p-3">
										<div class="flex items-center justify-between text-sm">
											<span class="text-muted-foreground">運営者の取り分</span>
											<span class="font-semibold text-primary"
												>成約の {formatPercentInt(PLANS.fixed.ownerCommissionRate)}</span
											>
										</div>
										<p class="mt-1 text-xs text-muted-foreground">
											※ 別途BizGuildへ成約の{formatPercentInt(PLANS.fixed.bizguildCommissionRate)}
										</p>
									</div>
								</div>

								<div class="mt-6 space-y-3">
									<h4 class="text-sm font-semibold text-primary">開発パートナー特典</h4>
									<ul class="space-y-2 text-sm">
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>リリース後5ヶ月間、月額無料</span>
										</li>
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>機能要望の優先反映</span>
										</li>
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>ベータ機能の先行利用</span>
										</li>
									</ul>
								</div>

								<div class="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-3">
									<p class="text-center text-sm">
										<span class="font-medium">こんな方に</span><br />
										<span class="text-muted-foreground">成約が活発になる見込みの方</span>
									</p>
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<!-- レベニューシェアプラン -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="relative cursor-pointer rounded-xl border-2 bg-background transition-all duration-300 {selectedPlan ===
						'revenue'
							? 'border-primary shadow-lg'
							: 'border-transparent bg-background/50 opacity-60 hover:opacity-80'}"
						onclick={() => (selectedPlan = 'revenue')}
					>
						<Card.Root class="border-0 bg-transparent shadow-none">
							{#if selectedPlan === 'revenue'}
								<div class="absolute -top-3 left-1/2 -translate-x-1/2">
									<Badge class="bg-primary text-primary-foreground">初期費用ゼロ</Badge>
								</div>
							{/if}
							<Card.Header class="text-center">
								<div
									class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10"
								>
									<Percent class="h-6 w-6 text-accent-foreground" />
								</div>
								<Card.Title class="text-xl">レベニューシェアプラン</Card.Title>
								<Card.Description>リスクを抑えて始めたい方に</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="text-center">
									<div class="text-4xl font-bold">
										{PLANS.revenue.initialFee >= 10000
											? `${PLANS.revenue.initialFee / 10000}`
											: PLANS.revenue.initialFee}
										<span class="text-lg font-normal text-muted-foreground">
											{PLANS.revenue.initialFee >= 10000 ? '万円' : '円'}
										</span>
									</div>
									<p class="mt-1 text-sm text-muted-foreground">初期費用</p>
								</div>

								<div class="mt-6 space-y-2">
									<div class="rounded-lg bg-muted/50 p-3">
										<div class="flex items-center justify-between text-sm">
											<span class="text-muted-foreground">月額費用</span>
											<span class="font-semibold">
												{formatPriceYen(PLANS.revenue.monthlyFee)}<span
													class="font-normal text-muted-foreground">/月</span
												>
											</span>
										</div>
										<p class="mt-1 text-xs text-muted-foreground">
											※ リリース{PLANS.revenue.monthlyFeeStartMonth === 1
												? '月'
												: `${PLANS.revenue.monthlyFeeStartMonth}ヶ月目`}より発生
										</p>
									</div>
									<div class="rounded-lg bg-muted/50 p-3">
										<div class="flex items-center justify-between text-sm">
											<span class="text-muted-foreground">運営者の取り分</span>
											<span class="font-semibold text-primary"
												>成約の {formatPercentInt(PLANS.revenue.ownerCommissionRate)}</span
											>
										</div>
										<p class="mt-1 text-xs text-muted-foreground">
											※ 別途BizGuildへ成約の{formatPercentInt(PLANS.revenue.bizguildCommissionRate)}
										</p>
									</div>
								</div>

								<div class="mt-6 space-y-3">
									<h4 class="text-sm font-semibold text-primary">開発パートナー特典</h4>
									<ul class="space-y-2 text-sm">
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>初期費用なしでスタート</span>
										</li>
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>機能要望の優先反映</span>
										</li>
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>ベータ機能の先行利用</span>
										</li>
									</ul>
								</div>

								<div class="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-3">
									<p class="text-center text-sm">
										<span class="font-medium">こんな方に</span><br />
										<span class="text-muted-foreground">まず試してから本格運用したい方</span>
									</p>
									<p class="mt-2 text-xs text-muted-foreground">
										※ 月間成約100万円未満の場合、機能制限または追加料金が発生する場合があります
									</p>
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<!-- 月額重視プラン -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="relative cursor-pointer rounded-xl border-2 bg-background transition-all duration-300 {selectedPlan ===
						'monthly'
							? 'border-primary shadow-lg'
							: 'border-transparent bg-background/50 opacity-60 hover:opacity-80'}"
						onclick={() => (selectedPlan = 'monthly')}
					>
						<Card.Root class="border-0 bg-transparent shadow-none">
							{#if selectedPlan === 'monthly'}
								<div class="absolute -top-3 left-1/2 -translate-x-1/2">
									<Badge class="bg-primary text-primary-foreground">初期費用低め</Badge>
								</div>
							{/if}
							<Card.Header class="text-center">
								<div
									class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10"
								>
									<Calendar class="h-6 w-6 text-accent-foreground" />
								</div>
								<Card.Title class="text-xl">月額重視プラン</Card.Title>
								<Card.Description>初期費用を抑えたい方に</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="text-center">
									<div class="text-4xl font-bold">
										{PLANS.monthly.initialFee >= 10000
											? `${PLANS.monthly.initialFee / 10000}`
											: PLANS.monthly.initialFee}
										<span class="text-lg font-normal text-muted-foreground">
											{PLANS.monthly.initialFee >= 10000 ? '万円' : '円'}
										</span>
									</div>
									<p class="mt-1 text-sm text-muted-foreground">初期費用（税別）</p>
								</div>

								<div class="mt-6 space-y-2">
									<div class="rounded-lg bg-muted/50 p-3">
										<div class="flex items-center justify-between text-sm">
											<span class="text-muted-foreground">月額費用</span>
											<span class="font-semibold">
												{formatPriceYen(PLANS.monthly.monthlyFee)}<span
													class="font-normal text-muted-foreground">/月</span
												>
											</span>
										</div>
										<p class="mt-1 text-xs text-muted-foreground">
											※ リリース{PLANS.monthly.monthlyFeeStartMonth === 1
												? '月'
												: `${PLANS.monthly.monthlyFeeStartMonth}ヶ月目`}より発生
										</p>
									</div>
									<div class="rounded-lg bg-muted/50 p-3">
										<div class="flex items-center justify-between text-sm">
											<span class="text-muted-foreground">運営者の取り分</span>
											<span class="font-semibold text-primary"
												>成約の {formatPercentInt(PLANS.monthly.ownerCommissionRate)}</span
											>
										</div>
										<p class="mt-1 text-xs text-muted-foreground">
											※ 別途BizGuildへ成約の{formatPercentInt(PLANS.monthly.bizguildCommissionRate)}
										</p>
									</div>
								</div>

								<div class="mt-6 space-y-3">
									<h4 class="text-sm font-semibold text-primary">開発パートナー特典</h4>
									<ul class="space-y-2 text-sm">
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>初期費用を抑えてスタート</span>
										</li>
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>機能要望の優先反映</span>
										</li>
										<li class="flex items-center gap-2">
											<Check class="h-4 w-4 shrink-0 text-primary" />
											<span>ベータ機能の先行利用</span>
										</li>
									</ul>
								</div>

								<div class="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-3">
									<p class="text-center text-sm">
										<span class="font-medium">こんな方に</span><br />
										<span class="text-muted-foreground">初期費用を抑えつつ安定運用したい方</span>
									</p>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
				</div>

				<!-- 手数料の流れ -->
				<div class="mx-auto mt-12 max-w-3xl">
					<h3 class="mb-6 text-center text-lg font-semibold">紹介成約時の手数料の流れ</h3>
					<div class="rounded-xl border bg-background p-6">
						<div class="text-center">
							<p class="text-sm text-muted-foreground">例：成約金額</p>
							<p class="text-2xl font-bold">{formatPriceYen(exampleAmount)}</p>
						</div>

						<div class="my-4 flex justify-center">
							<ArrowDown class="h-6 w-6 text-muted-foreground" />
						</div>

						<div class="rounded-lg bg-muted/30 p-4">
							<p class="mb-3 text-center text-sm font-medium">
								手数料 {formatPercentInt(COMMISSION_RATES.referralOnly.total)}（{formatPriceYen(
									totalCommission
								)}）の分配
							</p>

							<div class="grid gap-4 sm:grid-cols-3">
								<!-- 固定費プランの場合 -->
								<div
									class="rounded-lg border bg-background p-4 {selectedPlan === 'fixed'
										? 'border-primary ring-2 ring-primary/20'
										: ''}"
								>
									<p class="mb-3 text-center text-sm font-semibold text-primary">固定費プラン</p>
									<div class="space-y-2 text-sm">
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Users class="h-3.5 w-3.5" />
												紹介者
											</span>
											<span class="font-medium">{formatPriceYen(referrerAmount)}</span>
										</div>
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Wallet class="h-3.5 w-3.5" />
												運営者
											</span>
											<span class="font-medium text-primary"
												>{formatPriceYen(fixedOwnerAmount)}</span
											>
										</div>
										<div class="flex items-center justify-between text-muted-foreground">
											<span class="flex items-center gap-1.5">
												<Rocket class="h-3.5 w-3.5" />
												BizGuild
											</span>
											<span>{formatPriceYen(fixedBizguildAmount)}</span>
										</div>
									</div>
								</div>

								<!-- レベニューシェアの場合 -->
								<div
									class="rounded-lg border bg-background p-4 {selectedPlan === 'revenue'
										? 'border-primary ring-2 ring-primary/20'
										: ''}"
								>
									<p class="mb-3 text-center text-sm font-semibold text-primary">
										レベニューシェア
									</p>
									<div class="space-y-2 text-sm">
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Users class="h-3.5 w-3.5" />
												紹介者
											</span>
											<span class="font-medium">{formatPriceYen(referrerAmount)}</span>
										</div>
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Wallet class="h-3.5 w-3.5" />
												運営者
											</span>
											<span class="font-medium text-primary"
												>{formatPriceYen(revenueOwnerAmount)}</span
											>
										</div>
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Rocket class="h-3.5 w-3.5" />
												BizGuild
											</span>
											<span class="font-medium">{formatPriceYen(revenueBizguildAmount)}</span>
										</div>
									</div>
								</div>

								<!-- 月額重視プランの場合 -->
								<div
									class="rounded-lg border bg-background p-4 {selectedPlan === 'monthly'
										? 'border-primary ring-2 ring-primary/20'
										: ''}"
								>
									<p class="mb-3 text-center text-sm font-semibold text-primary">月額重視</p>
									<div class="space-y-2 text-sm">
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Users class="h-3.5 w-3.5" />
												紹介者
											</span>
											<span class="font-medium">{formatPriceYen(referrerAmount)}</span>
										</div>
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Wallet class="h-3.5 w-3.5" />
												運営者
											</span>
											<span class="font-medium text-primary"
												>{formatPriceYen(monthlyOwnerAmount)}</span
											>
										</div>
										<div class="flex items-center justify-between">
											<span class="flex items-center gap-1.5">
												<Rocket class="h-3.5 w-3.5" />
												BizGuild
											</span>
											<span class="font-medium">{formatPriceYen(monthlyBizguildAmount)}</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<p class="mt-4 text-center text-sm text-muted-foreground">
							サービス提供者の受取：<span class="font-medium text-foreground"
								>{formatPriceYen(providerAmount)}</span
							>
						</p>
					</div>
				</div>

				<!-- 運用時シミュレーション -->
				<div class="mx-auto mt-12 max-w-5xl">
					<h3 class="mb-6 text-center text-lg font-semibold">運用時シミュレーション</h3>
					<div class="rounded-xl border bg-background p-6">
						<p class="mb-4 text-center text-sm text-muted-foreground">
							月間成約金額別の月間利益と初期費用回収期間
						</p>

						<div class="overflow-x-auto">
							<table class="w-full text-sm">
								<thead>
									<tr class="border-b">
										<th class="px-4 py-3 text-left font-semibold">月間成約金額</th>
										<th class="px-4 py-3 text-center font-semibold">固定費プラン</th>
										<th class="px-4 py-3 text-center font-semibold">レベニューシェア</th>
										<th class="px-4 py-3 text-center font-semibold">月額重視</th>
									</tr>
								</thead>
								<tbody>
									{#each simulationAmounts as amount, i (amount)}
										{@const fixedMonthlyProfit =
											amount * PLANS.fixed.ownerCommissionRate - PLANS.fixed.monthlyFee}
										{@const fixedRecoveryMonths =
											fixedMonthlyProfit > 0
												? Math.ceil(PLANS.fixed.initialFee / fixedMonthlyProfit)
												: null}
										{@const revenueMonthlyProfit =
											amount * PLANS.revenue.ownerCommissionRate - PLANS.revenue.monthlyFee}
										{@const monthlyMonthlyProfit =
											amount * PLANS.monthly.ownerCommissionRate - PLANS.monthly.monthlyFee}
										{@const monthlyRecoveryMonths =
											monthlyMonthlyProfit > 0
												? Math.ceil(PLANS.monthly.initialFee / monthlyMonthlyProfit)
												: null}

										<tr class="border-b {i === 2 ? 'bg-muted/30' : ''}">
											<td class="px-4 py-3 font-medium">{formatPriceYen(amount)}</td>
											<td class="px-4 py-3 text-center">
												<div class="space-y-1">
													<div
														class="{fixedMonthlyProfit >= 0
															? 'text-primary'
															: 'text-destructive'} font-semibold"
													>
														{fixedMonthlyProfit >= 0 ? '+' : ''}{formatPriceYen(fixedMonthlyProfit)}
													</div>
													<div class="text-xs text-muted-foreground">
														{fixedRecoveryMonths ? `回収: 約${fixedRecoveryMonths}ヶ月` : '-'}
													</div>
												</div>
											</td>
											<td class="px-4 py-3 text-center">
												<div class="space-y-1">
													<div
														class="{revenueMonthlyProfit >= 0
															? 'text-primary'
															: 'text-destructive'} font-semibold"
													>
														{revenueMonthlyProfit >= 0 ? '+' : ''}{formatPriceYen(
															revenueMonthlyProfit
														)}
													</div>
													<div class="text-xs text-muted-foreground">初期費用なし</div>
												</div>
											</td>
											<td class="px-4 py-3 text-center">
												<div class="space-y-1">
													<div
														class="{monthlyMonthlyProfit >= 0
															? 'text-primary'
															: 'text-destructive'} font-semibold"
													>
														{monthlyMonthlyProfit >= 0 ? '+' : ''}{formatPriceYen(
															monthlyMonthlyProfit
														)}
													</div>
													<div class="text-xs text-muted-foreground">
														{monthlyRecoveryMonths ? `回収: 約${monthlyRecoveryMonths}ヶ月` : '-'}
													</div>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>

						<div class="mt-6 rounded-lg bg-muted/50 p-4">
							<div class="space-y-2 text-xs text-muted-foreground">
								<p class="font-medium text-foreground">※ 計算方法</p>
								<ul class="ml-4 list-disc space-y-1">
									<li>月間利益 = 手数料収入（運営者取り分） - 月額費用</li>
									<li>回収期間 = 初期費用 ÷ 月間利益（小数点以下切り上げ）</li>
									<li>すべて「紹介のみ」パターンで計算（手数料10%）</li>
									<li>
										リリース後6ヶ月目以降の月額費用を考慮（固定費プランのみ1〜5ヶ月目は月額0円）
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- 共通条件 -->
				<div class="mx-auto mt-10 max-w-2xl">
					<Card.Root class="bg-background/50">
						<Card.Header class="pb-3">
							<Card.Title class="text-center text-base">開発パートナー共通条件</Card.Title>
						</Card.Header>
						<Card.Content>
							<ul class="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
								<li class="flex items-center gap-2">
									<Check class="h-4 w-4 shrink-0 text-primary" />
									月2回のフィードバックMTG
								</li>
								<li class="flex items-center gap-2">
									<Check class="h-4 w-4 shrink-0 text-primary" />
									最低10名でテスト運用
								</li>
								<li class="flex items-center gap-2">
									<Check class="h-4 w-4 shrink-0 text-primary" />
									開発期間 約3〜4ヶ月
								</li>
							</ul>
						</Card.Content>
					</Card.Root>
				</div>

				<!-- CTA -->
				<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button size="lg" class="gap-2 px-8" href={resolve('/contact')}>
						話を聞いてみる
						<ArrowRight class="h-5 w-5" />
					</Button>
					<Button size="lg" variant="outline" href={resolve('/features')}>機能を詳しく見る</Button>
				</div>
			</div>
		{:else}
			<div class="mx-auto mt-10 max-w-2xl" transition:fly={{ y: 12, duration: 240 }}>
				<Card.Root>
					<Card.Header class="text-center">
						<Card.Title>料金情報はパスワードが必要です</Card.Title>
						<Card.Description>
							開発パートナー向けの料金は限定公開しています。パスワードを入力してください。
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<form
							class="mx-auto flex max-w-md flex-col gap-3"
							method="post"
							action="?/unlockPricing"
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result) {
										await applyAction(result);
									}
									if (result?.type === 'success') {
										localUnlocked = true;
										await update();
										showShake = false;
										return;
									}
									if (result?.type === 'failure') {
										showShake = false;
										requestAnimationFrame(() => {
											showShake = true;
										});
									}
								};
							}}
						>
							<div class:shake={showShake}>
								<Input type="password" name="password" placeholder="パスワード" />
							</div>
							<Button type="submit" class="cursor-pointer">表示する</Button>
							{#if pricingError}
								<p class="text-sm text-destructive">{pricingError}</p>
							{/if}
						</form>
					</Card.Content>
				</Card.Root>
			</div>
		{/if}
	</div>
</section>

<style>
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		20%,
		60% {
			transform: translateX(-4px);
		}
		40%,
		80% {
			transform: translateX(4px);
		}
	}

	.shake {
		animation: shake 220ms ease-in-out;
	}
</style>
