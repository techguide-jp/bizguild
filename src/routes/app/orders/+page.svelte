<script lang="ts">
	import { PageHeader, EmptyState } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Table from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import * as Avatar from '$lib/components/ui/avatar';
	import { orders, currentUser } from '$lib/mock';
	import { ShoppingCart, Package } from 'lucide-svelte';

	let activeTab = $state('sales');

	// 販売（自分が売り手）
	const salesOrders = orders.filter((o) => o.seller.id === currentUser.id);

	// 購入（自分が買い手）
	const purchaseOrders = orders.filter((o) => o.buyer?.id === currentUser.id);

	const displayOrders = $derived(() => {
		return activeTab === 'sales' ? salesOrders : purchaseOrders;
	});

	function getStatusBadge(status: string) {
		switch (status) {
			case 'PENDING_PAYMENT':
				return { label: '入金待ち', variant: 'secondary' as const };
			case 'PAID':
				return { label: '入金済み', variant: 'default' as const };
			case 'CANCELLED':
				return { label: 'キャンセル', variant: 'destructive' as const };
			case 'REFUNDED':
				return { label: '返金済み', variant: 'outline' as const };
			default:
				return { label: status, variant: 'outline' as const };
		}
	}
</script>

<svelte:head>
	<title>注文一覧 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="注文一覧" description="販売・購入の注文を管理します" icon={ShoppingCart} />

	<!-- Tabs -->
	<div class="mt-6">
		<Tabs.Root bind:value={activeTab}>
			<Tabs.List>
				<Tabs.Trigger value="sales">
					販売 ({salesOrders.length})
				</Tabs.Trigger>
				<Tabs.Trigger value="purchases">
					購入 ({purchaseOrders.length})
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>

	<!-- Orders Table -->
	<div class="mt-6">
		{#if displayOrders().length > 0}
			<Card.Root>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>注文番号</Table.Head>
							<Table.Head>{activeTab === 'sales' ? '購入者' : '販売者'}</Table.Head>
							<Table.Head>商品</Table.Head>
							<Table.Head class="text-right">金額</Table.Head>
							<Table.Head>ステータス</Table.Head>
							<Table.Head>日時</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each displayOrders() as order}
							<Table.Row>
								<Table.Cell class="font-mono text-sm">{order.orderNo}</Table.Cell>
								<Table.Cell>
									{@const otherUser = activeTab === 'sales' ? order.buyer : order.seller}
									{#if otherUser}
										<div class="flex items-center gap-2">
											<Avatar.Root class="h-6 w-6">
												<Avatar.Image src={otherUser.avatarUrl} alt={otherUser.name} />
												<Avatar.Fallback class="text-xs">
													{otherUser.name.slice(0, 2)}
												</Avatar.Fallback>
											</Avatar.Root>
											<span class="text-sm">{otherUser.name}</span>
										</div>
									{:else}
										<span class="text-sm text-muted-foreground">-</span>
									{/if}
								</Table.Cell>
								<Table.Cell>
									{#each order.items as item}
										<div class="text-sm">{item.product.title}</div>
									{/each}
								</Table.Cell>
								<Table.Cell class="text-right">
									<div class="text-sm font-medium">
										¥{order.total.toLocaleString()}
									</div>
									{#if order.pointsDiscount > 0}
										<div class="text-xs text-muted-foreground">
											(ポイント: -{order.pointsDiscount.toLocaleString()}pt)
										</div>
									{/if}
								</Table.Cell>
								<Table.Cell>
									{@const statusBadge = getStatusBadge(order.status)}
									<Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
								</Table.Cell>
								<Table.Cell class="text-sm text-muted-foreground">
									{new Date(order.createdAt).toLocaleDateString('ja-JP')}
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Root>
		{:else}
			<Card.Root>
				<EmptyState
					title="注文がありません"
					description={activeTab === 'sales'
						? 'まだ販売がありません'
						: 'まだ購入がありません'}
					icon={Package}
				/>
			</Card.Root>
		{/if}
	</div>
</div>
