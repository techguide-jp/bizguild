<script lang="ts">
	import { PageHeader } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { pointAccount } from '$lib/mock';
	import { Coins, TrendingUp, TrendingDown, RefreshCw, MinusCircle } from 'lucide-svelte';

	function getTypeInfo(type: string) {
		switch (type) {
			case 'EARN':
				return {
					label: '獲得',
					variant: 'default' as const,
					icon: TrendingUp,
					color: 'text-green-600'
				};
			case 'SPEND':
				return {
					label: '利用',
					variant: 'secondary' as const,
					icon: TrendingDown,
					color: 'text-red-600'
				};
			case 'ADJUST':
				return {
					label: '調整',
					variant: 'outline' as const,
					icon: RefreshCw,
					color: 'text-blue-600'
				};
			case 'REVERSAL':
				return {
					label: '取消',
					variant: 'destructive' as const,
					icon: MinusCircle,
					color: 'text-orange-600'
				};
			default:
				return {
					label: type,
					variant: 'outline' as const,
					icon: Coins,
					color: 'text-muted-foreground'
				};
		}
	}

	// 統計データ
	const totalEarned = pointAccount.ledger
		.filter((e) => e.type === 'EARN')
		.reduce((sum, e) => sum + e.points, 0);
	const totalSpent = pointAccount.ledger
		.filter((e) => e.type === 'SPEND')
		.reduce((sum, e) => sum + Math.abs(e.points), 0);
</script>

<svelte:head>
	<title>ポイント - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="ポイント" description="ポイントの残高と履歴を確認します" icon={Coins} />

	<!-- Stats -->
	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<Card.Root>
			<Card.Header class="pb-2">
				<Card.Title class="text-sm font-medium text-muted-foreground">残高</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center gap-2">
					<Coins class="h-6 w-6 text-amber-500" />
					<span class="text-3xl font-bold">{pointAccount.balance.toLocaleString()}</span>
					<span class="text-lg text-muted-foreground">pt</span>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="pb-2">
				<Card.Title class="text-sm font-medium text-muted-foreground">累計獲得</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center gap-2">
					<TrendingUp class="h-6 w-6 text-green-500" />
					<span class="text-3xl font-bold text-green-600">
						+{totalEarned.toLocaleString()}
					</span>
					<span class="text-lg text-muted-foreground">pt</span>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="pb-2">
				<Card.Title class="text-sm font-medium text-muted-foreground">累計利用</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center gap-2">
					<TrendingDown class="h-6 w-6 text-red-500" />
					<span class="text-3xl font-bold text-red-600">
						-{totalSpent.toLocaleString()}
					</span>
					<span class="text-lg text-muted-foreground">pt</span>
				</div>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Ledger -->
	<Card.Root class="mt-6">
		<Card.Header>
			<Card.Title>ポイント履歴</Card.Title>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>日時</Table.Head>
						<Table.Head>種別</Table.Head>
						<Table.Head>内容</Table.Head>
						<Table.Head class="text-right">ポイント</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each pointAccount.ledger as entry}
						{@const typeInfo = getTypeInfo(entry.type)}
						<Table.Row>
							<Table.Cell class="text-sm text-muted-foreground">
								{new Date(entry.createdAt).toLocaleDateString('ja-JP')}
							</Table.Cell>
							<Table.Cell>
								<Badge variant={typeInfo.variant}>
									<svelte:component this={typeInfo.icon} class="mr-1 h-3 w-3" />
									{typeInfo.label}
								</Badge>
							</Table.Cell>
							<Table.Cell class="text-sm">
								{entry.note || '-'}
							</Table.Cell>
							<Table.Cell class="text-right font-medium {typeInfo.color}">
								{entry.points > 0 ? '+' : ''}{entry.points.toLocaleString()} pt
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>
