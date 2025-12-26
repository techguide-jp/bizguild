<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Check, X, TrendingDown } from 'lucide-svelte';
	import {
		COMPETITOR_COMMISSION_RATES,
		PLATFORM_COMMISSION,
		formatPercentInt,
		formatPriceYen
	} from '$lib/constants/pricing';
</script>

<section class="bg-background py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center">
			<Badge variant="secondary" class="mb-4 gap-1.5">
				<TrendingDown class="h-3.5 w-3.5" />
				他社比較
			</Badge>
			<h2 class="text-2xl font-bold sm:text-3xl">BizGuildが選ばれる理由</h2>
			<p class="mt-3 text-muted-foreground">
				他のサービスと比較して、BizGuildの優位性をご確認ください
			</p>
		</div>

		<!-- 手数料比較 -->
		<div class="mt-12">
			<h3 class="mb-6 text-center text-lg font-semibold">手数料比較</h3>
			<div class="overflow-x-auto rounded-xl border bg-background">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b bg-muted/50">
							<th class="px-4 py-3 text-left font-semibold">サービス</th>
							<th class="px-4 py-3 text-center font-semibold">手数料率</th>
							<th class="px-4 py-3 text-center font-semibold">備考</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b">
							<td class="px-4 py-3 font-medium">クラウドソーシング系</td>
							<td class="px-4 py-3"></td>
							<td class="px-4 py-3"></td>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 pl-8">{COMPETITOR_COMMISSION_RATES.lancers.name}</td>
							<td class="px-4 py-3 text-center"
								>{formatPercentInt(COMPETITOR_COMMISSION_RATES.lancers.rate)}</td
							>
							<td class="px-4 py-3 text-center text-muted-foreground"
								>{COMPETITOR_COMMISSION_RATES.lancers.note}</td
							>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 pl-8">{COMPETITOR_COMMISSION_RATES.crowdworks.name}</td>
							<td class="px-4 py-3 text-center"
								>{formatPercentInt(COMPETITOR_COMMISSION_RATES.crowdworks.rate)}</td
							>
							<td class="px-4 py-3 text-center text-muted-foreground"
								>{COMPETITOR_COMMISSION_RATES.crowdworks.note}</td
							>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 pl-8">{COMPETITOR_COMMISSION_RATES.coconala.name}</td>
							<td class="px-4 py-3 text-center"
								>{formatPercentInt(COMPETITOR_COMMISSION_RATES.coconala.rate)}</td
							>
							<td class="px-4 py-3 text-center text-muted-foreground"
								>{COMPETITOR_COMMISSION_RATES.coconala.note}</td
							>
						</tr>
						<tr class="border-b">
							<td class="px-4 py-3 font-medium">マッチング系</td>
							<td class="px-4 py-3"></td>
							<td class="px-4 py-3"></td>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 pl-8">{COMPETITOR_COMMISSION_RATES.visasq.name}</td>
							<td class="px-4 py-3 text-center"
								>{formatPercentInt(COMPETITOR_COMMISSION_RATES.visasq.rate)}</td
							>
							<td class="px-4 py-3 text-center text-muted-foreground"
								>{COMPETITOR_COMMISSION_RATES.visasq.note}</td
							>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 pl-8">{COMPETITOR_COMMISSION_RATES.yenta.name}</td>
							<td class="px-4 py-3 text-center"
								>月額{formatPriceYen(COMPETITOR_COMMISSION_RATES.yenta.monthlyFee)}〜</td
							>
							<td class="px-4 py-3 text-center text-muted-foreground"
								>{COMPETITOR_COMMISSION_RATES.yenta.note}</td
							>
						</tr>
						<tr class="border-b">
							<td class="px-4 py-3 font-medium">紹介・営業代行系</td>
							<td class="px-4 py-3"></td>
							<td class="px-4 py-3"></td>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 pl-8">{COMPETITOR_COMMISSION_RATES.saleshub.name}</td>
							<td class="px-4 py-3 text-center"
								>{formatPercentInt(COMPETITOR_COMMISSION_RATES.saleshub.rate)}</td
							>
							<td class="px-4 py-3 text-center text-muted-foreground"
								>{COMPETITOR_COMMISSION_RATES.saleshub.note}</td
							>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 pl-8">{COMPETITOR_COMMISSION_RATES.salesAgent.name}</td>
							<td class="px-4 py-3 text-center">
								{formatPercentInt(
									COMPETITOR_COMMISSION_RATES.salesAgent.rate.min
								)}-{formatPercentInt(COMPETITOR_COMMISSION_RATES.salesAgent.rate.max)}
							</td>
							<td class="px-4 py-3 text-center text-muted-foreground"
								>{COMPETITOR_COMMISSION_RATES.salesAgent.note}</td
							>
						</tr>
						<tr class="border-b bg-primary/5">
							<td class="px-4 py-3 font-bold text-primary">BizGuild</td>
							<td class="px-4 py-3 text-center">
								<span class="rounded-full bg-primary px-3 py-1 font-bold text-primary-foreground">
									{formatPercentInt(PLATFORM_COMMISSION.total)}〜
								</span>
							</td>
							<td class="px-4 py-3 text-center font-medium text-primary">
								成約時のみ。紹介者への還元率は提供者が自由に設定可能
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- 優位性比較 -->
		<div class="mt-12">
			<h3 class="mb-6 text-center text-lg font-semibold">BizGuildの優位性</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border bg-background p-6">
					<div class="mb-4 flex items-center gap-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
							<TrendingDown class="h-5 w-5 text-primary" />
						</div>
						<h4 class="text-lg font-semibold">手数料率</h4>
					</div>
					<div class="space-y-3">
						<div class="flex items-start gap-3">
							<X class="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
							<div>
								<p class="font-medium">他サービス</p>
								<p class="text-sm text-muted-foreground">16-35%の手数料</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Check class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<div>
								<p class="font-medium text-primary">BizGuild</p>
								<p class="text-sm text-muted-foreground">
									成約時のみ{formatPercentInt(PLATFORM_COMMISSION.total)}〜の手数料
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-xl border bg-background p-6">
					<div class="mb-4 flex items-center gap-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
							<Check class="h-5 w-5 text-primary" />
						</div>
						<h4 class="text-lg font-semibold">成約前コスト</h4>
					</div>
					<div class="space-y-3">
						<div class="flex items-start gap-3">
							<X class="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
							<div>
								<p class="font-medium">他サービス</p>
								<p class="text-sm text-muted-foreground">月額費用・広告費が必要</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Check class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<div>
								<p class="font-medium text-primary">BizGuild</p>
								<p class="text-sm text-muted-foreground">成約まで0円。リスクなし</p>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-xl border bg-background p-6">
					<div class="mb-4 flex items-center gap-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
							<Check class="h-5 w-5 text-primary" />
						</div>
						<h4 class="text-lg font-semibold">手数料の分配</h4>
					</div>
					<div class="space-y-3">
						<div class="flex items-start gap-3">
							<X class="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
							<div>
								<p class="font-medium">他サービス</p>
								<p class="text-sm text-muted-foreground">システム会社が総取り</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Check class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<div>
								<p class="font-medium text-primary">BizGuild</p>
								<p class="text-sm text-muted-foreground">運営者・紹介者と利益分配</p>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-xl border bg-background p-6">
					<div class="mb-4 flex items-center gap-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
							<Check class="h-5 w-5 text-primary" />
						</div>
						<h4 class="text-lg font-semibold">関係性</h4>
					</div>
					<div class="space-y-3">
						<div class="flex items-start gap-3">
							<X class="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
							<div>
								<p class="font-medium">他サービス</p>
								<p class="text-sm text-muted-foreground">プラットフォーム経由の初対面</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Check class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<div>
								<p class="font-medium text-primary">BizGuild</p>
								<p class="text-sm text-muted-foreground">信頼できるコミュニティ内</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 機能比較 -->
		<div class="mt-12">
			<h3 class="mb-6 text-center text-lg font-semibold">機能・特徴の比較</h3>
			<div class="overflow-x-auto rounded-xl border bg-background">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b bg-muted/50">
							<th class="px-4 py-3 text-left font-semibold">項目</th>
							<th class="px-4 py-3 text-center font-semibold">オンラインサロン</th>
							<th class="px-4 py-3 text-center font-semibold">ビジネスマッチング</th>
							<th class="px-4 py-3 text-center font-semibold">Slack/Discord</th>
							<th class="px-4 py-3 text-center font-semibold text-primary">BizGuild</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b">
							<td class="px-4 py-3 font-medium">協業・紹介機能</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-primary" />
							</td>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 font-medium">コミュニティ運営</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-primary" />
							</td>
						</tr>
						<tr class="border-b">
							<td class="px-4 py-3 font-medium">紹介手数料の仕組み</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-primary" />
							</td>
						</tr>
						<tr class="border-b bg-muted/20">
							<td class="px-4 py-3 font-medium">審査制の仕組み化</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-primary" />
							</td>
						</tr>
						<tr class="border-b">
							<td class="px-4 py-3 font-medium">ビジネス成果に直結</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<X class="mx-auto h-5 w-5 text-muted-foreground" />
							</td>
							<td class="px-4 py-3 text-center">
								<Check class="mx-auto h-5 w-5 text-primary" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
