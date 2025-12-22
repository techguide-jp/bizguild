<script lang="ts">
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import StatCard from '$lib/components/layout/StatCard.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Select from '$lib/components/ui/select';
	import { Badge } from '$lib/components/ui/badge';
	import { SimpleLineChart, SimpleBarChart, SimplePieChart } from '$lib/components/charts';
	import {
		dailyStats,
		productAnalytics,
		trafficAnalytics,
		tagAnalytics,
		visitorAnalytics,
		referralAnalytics,
		analyticsSummary,
		TRAFFIC_SOURCE_LABELS,
		ANALYTICS_PERIOD_LABELS,
		type AnalyticsPeriod
	} from '$lib/mock';
	import {
		BarChart3,
		Eye,
		MessageSquare,
		TrendingUp,
		Users,
		Clock,
		Package,
		Share2,
		Tag,
		UserCircle
	} from 'lucide-svelte';

	let activeTab = $state('overview');
	let selectedPeriod = $state<AnalyticsPeriod>('30d');

	// 日付を "M/D" 形式に変換
	function formatDate(dateStr: string): string {
		const [, month, day] = dateStr.split('-');
		return `${parseInt(month)}/${parseInt(day)}`;
	}

	// 日別データをチャート用に変換
	const viewsChartData = $derived(
		dailyStats.map((d) => ({
			label: formatDate(d.date),
			value: d.views
		}))
	);

	const inquiriesChartData = $derived(
		dailyStats.map((d) => ({
			label: formatDate(d.date),
			value: d.inquiries
		}))
	);

	const profileViewsChartData = $derived(
		dailyStats.map((d) => ({
			label: formatDate(d.date),
			value: d.profileViews
		}))
	);

	// 流入元データをチャート用に変換
	const trafficPieData = $derived(
		trafficAnalytics.map((t) => ({
			label: TRAFFIC_SOURCE_LABELS[t.source],
			value: t.count
		}))
	);

	// 訪問者属性データをチャート用に変換
	const visitorPieData = $derived(
		visitorAnalytics.map((v) => ({
			label: v.specialty,
			value: v.count
		}))
	);
</script>

<div class="p-6">
	<PageHeader title="分析" description="パフォーマンスを分析" icon={BarChart3}>
		{#snippet actions()}
			<Select.Root type="single" bind:value={selectedPeriod}>
				<Select.Trigger class="w-32">
					{ANALYTICS_PERIOD_LABELS[selectedPeriod]}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="7d">過去7日</Select.Item>
					<Select.Item value="30d">過去30日</Select.Item>
					<Select.Item value="90d">過去90日</Select.Item>
				</Select.Content>
			</Select.Root>
		{/snippet}
	</PageHeader>

	<Tabs.Root value={activeTab} onValueChange={(v) => (activeTab = v ?? 'overview')}>
		<Tabs.List class="mb-6">
			<Tabs.Trigger value="overview">概要</Tabs.Trigger>
			<Tabs.Trigger value="products">商品分析</Tabs.Trigger>
			<Tabs.Trigger value="inquiries">相談分析</Tabs.Trigger>
			<Tabs.Trigger value="profile">プロフィール</Tabs.Trigger>
			<Tabs.Trigger value="referrals">紹介分析</Tabs.Trigger>
		</Tabs.List>

		<!-- 概要タブ -->
		<Tabs.Content value="overview">
			<!-- サマリーカード -->
			<div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="総閲覧数"
					value={analyticsSummary.totalViews.toLocaleString()}
					icon={Eye}
					trend={{ value: 12, label: '先月比' }}
				/>
				<StatCard
					title="総相談数"
					value={analyticsSummary.totalInquiries.toString()}
					icon={MessageSquare}
					trend={{ value: 8, label: '先月比' }}
				/>
				<StatCard
					title="転換率"
					value={`${analyticsSummary.conversionRate}%`}
					icon={TrendingUp}
					trend={{ value: 3, label: '先月比' }}
				/>
				<StatCard
					title="フォロワー"
					value={analyticsSummary.followerCount.toString()}
					icon={Users}
					description={`+${analyticsSummary.followerGrowth} 今月`}
				/>
			</div>

			<!-- グラフ -->
			<div class="grid gap-6 lg:grid-cols-2">
				<Card.Root class="shadow-soft">
					<Card.Header>
						<Card.Title class="flex items-center gap-2 text-base">
							<Eye class="h-4 w-4 text-primary" />
							閲覧数推移
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<SimpleLineChart
							data={viewsChartData}
							height={220}
							yAxisLabel="閲覧数"
							xAxisLabel="日付"
						/>
					</Card.Content>
				</Card.Root>

				<Card.Root class="shadow-soft">
					<Card.Header>
						<Card.Title class="flex items-center gap-2 text-base">
							<MessageSquare class="h-4 w-4 text-primary" />
							相談数推移
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<SimpleBarChart
							data={inquiriesChartData.slice(-14)}
							height={220}
							yAxisLabel="相談数"
							xAxisLabel="日付"
						/>
					</Card.Content>
				</Card.Root>
			</div>

			<!-- 流入元 -->
			<Card.Root class="shadow-soft mt-6">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Share2 class="h-4 w-4 text-primary" />
						流入元
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<SimplePieChart data={trafficPieData} />
				</Card.Content>
			</Card.Root>
		</Tabs.Content>

		<!-- 商品分析タブ -->
		<Tabs.Content value="products">
			<Card.Root class="shadow-soft">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Package class="h-4 w-4 text-primary" />
						商品別パフォーマンス
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b text-left text-sm text-muted-foreground">
									<th class="pb-3 font-medium">商品名</th>
									<th class="pb-3 text-right font-medium">閲覧数</th>
									<th class="pb-3 text-right font-medium">ブックマーク</th>
									<th class="pb-3 text-right font-medium">相談数</th>
									<th class="pb-3 text-right font-medium">成約数</th>
									<th class="pb-3 text-right font-medium">転換率</th>
								</tr>
							</thead>
							<tbody>
								{#each productAnalytics as pa (pa.productId)}
									<tr class="border-b last:border-0">
										<td class="py-3">
											<div class="font-medium">{pa.product.title}</div>
											<div class="mt-1 flex gap-1">
												{#each pa.product.tags.slice(0, 2) as tag (tag)}
													<Badge variant="outline" class="text-xs">{tag}</Badge>
												{/each}
											</div>
										</td>
										<td class="py-3 text-right">{pa.views.toLocaleString()}</td>
										<td class="py-3 text-right">{pa.bookmarks}</td>
										<td class="py-3 text-right">{pa.inquiries}</td>
										<td class="py-3 text-right">{pa.conversions}</td>
										<td class="py-3 text-right">
											<Badge variant={pa.conversionRate >= 30 ? 'default' : 'secondary'}>
												{pa.conversionRate}%
											</Badge>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- タグ分析 -->
			<Card.Root class="shadow-soft mt-6">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Tag class="h-4 w-4 text-primary" />
						人気タグ
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-3">
						{#each tagAnalytics as ta (ta.tag)}
							{@const maxViews = Math.max(...tagAnalytics.map((t) => t.views))}
							<div class="flex items-center gap-3">
								<Badge variant="outline" class="w-28 justify-center">{ta.tag}</Badge>
								<div class="flex-1">
									<div
										class="h-6 rounded-full bg-primary/20"
										style="width: {(ta.views / maxViews) * 100}%;"
									>
										<div
											class="h-full rounded-full bg-primary"
											style="width: {(ta.inquiries / ta.views) * 100}%;"
										></div>
									</div>
								</div>
								<div class="w-20 text-right text-sm">
									<span class="font-medium">{ta.views}</span>
									<span class="text-muted-foreground">閲覧</span>
								</div>
							</div>
						{/each}
					</div>
					<p class="mt-4 text-xs text-muted-foreground">※ 濃い部分は相談に繋がった割合</p>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>

		<!-- 相談分析タブ -->
		<Tabs.Content value="inquiries">
			<div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="総相談数"
					value={analyticsSummary.totalInquiries.toString()}
					icon={MessageSquare}
				/>
				<StatCard
					title="成約数"
					value={analyticsSummary.totalConversions.toString()}
					icon={TrendingUp}
				/>
				<StatCard title="転換率" value={`${analyticsSummary.conversionRate}%`} icon={TrendingUp} />
				<StatCard
					title="平均応答時間"
					value={`${analyticsSummary.avgResponseTime}分`}
					icon={Clock}
				/>
			</div>

			<div class="grid gap-6 lg:grid-cols-2">
				<Card.Root class="shadow-soft">
					<Card.Header>
						<Card.Title class="flex items-center gap-2 text-base">
							<MessageSquare class="h-4 w-4 text-primary" />
							相談数推移（日別）
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<SimpleBarChart
							data={inquiriesChartData}
							height={220}
							yAxisLabel="相談数"
							xAxisLabel="日付"
						/>
					</Card.Content>
				</Card.Root>

				<Card.Root class="shadow-soft">
					<Card.Header>
						<Card.Title class="flex items-center gap-2 text-base">
							<Share2 class="h-4 w-4 text-primary" />
							相談の流入元
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<SimplePieChart data={trafficPieData} />
					</Card.Content>
				</Card.Root>
			</div>
		</Tabs.Content>

		<!-- プロフィール分析タブ -->
		<Tabs.Content value="profile">
			<div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="プロフィール閲覧数"
					value={dailyStats.reduce((sum, d) => sum + d.profileViews, 0).toLocaleString()}
					icon={UserCircle}
					trend={{ value: 15, label: '先月比' }}
				/>
				<StatCard
					title="フォロワー数"
					value={analyticsSummary.followerCount.toString()}
					icon={Users}
				/>
				<StatCard
					title="今月の新規フォロワー"
					value={`+${analyticsSummary.followerGrowth}`}
					icon={Users}
				/>
			</div>

			<div class="grid gap-6 lg:grid-cols-2">
				<Card.Root class="shadow-soft">
					<Card.Header>
						<Card.Title class="flex items-center gap-2 text-base">
							<Eye class="h-4 w-4 text-primary" />
							プロフィール閲覧数推移
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<SimpleLineChart
							data={profileViewsChartData}
							height={220}
							yAxisLabel="閲覧数"
							xAxisLabel="日付"
						/>
					</Card.Content>
				</Card.Root>

				<Card.Root class="shadow-soft">
					<Card.Header>
						<Card.Title class="flex items-center gap-2 text-base">
							<UserCircle class="h-4 w-4 text-primary" />
							訪問者の専門領域
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<SimplePieChart data={visitorPieData} />
					</Card.Content>
				</Card.Root>
			</div>
		</Tabs.Content>

		<!-- 紹介分析タブ -->
		<Tabs.Content value="referrals">
			<div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="紹介リンククリック数"
					value={referralAnalytics.reduce((sum, r) => sum + r.clicks, 0).toLocaleString()}
					icon={Share2}
				/>
				<StatCard
					title="紹介経由成約数"
					value={referralAnalytics.reduce((sum, r) => sum + r.conversions, 0).toString()}
					icon={TrendingUp}
				/>
				<StatCard
					title="獲得ポイント"
					value={`${referralAnalytics.reduce((sum, r) => sum + r.pointsEarned, 0).toLocaleString()}pt`}
					icon={TrendingUp}
				/>
			</div>

			<Card.Root class="shadow-soft">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Share2 class="h-4 w-4 text-primary" />
						紹介リンク別パフォーマンス
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b text-left text-sm text-muted-foreground">
									<th class="pb-3 font-medium">商品</th>
									<th class="pb-3 font-medium">紹介者</th>
									<th class="pb-3 text-right font-medium">クリック数</th>
									<th class="pb-3 text-right font-medium">相談数</th>
									<th class="pb-3 text-right font-medium">成約数</th>
									<th class="pb-3 text-right font-medium">獲得ポイント</th>
								</tr>
							</thead>
							<tbody>
								{#each referralAnalytics as ra (ra.refCode)}
									<tr class="border-b last:border-0">
										<td class="py-3 font-medium">{ra.product.title}</td>
										<td class="py-3 text-muted-foreground">{ra.referrer.name}</td>
										<td class="py-3 text-right">{ra.clicks}</td>
										<td class="py-3 text-right">{ra.inquiries}</td>
										<td class="py-3 text-right">{ra.conversions}</td>
										<td class="py-3 text-right font-medium text-primary">
											{ra.pointsEarned.toLocaleString()}pt
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
