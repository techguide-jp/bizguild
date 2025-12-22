<script lang="ts">
	import { PageHeader, EmptyState } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Table from '$lib/components/ui/table';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Select from '$lib/components/ui/select';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { pendingUsers, inviteCodes, orders, users } from '$lib/mock';
	import { Shield, UserCheck, UserX, Plus, Copy, CreditCard, Coins } from 'lucide-svelte';

	let activeTab = $state('screening');

	// 招待コード生成
	let newInviteCode = $state('');

	function generateInviteCode() {
		newInviteCode = `INVITE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
	}

	function copyInviteCode() {
		navigator.clipboard.writeText(newInviteCode);
		toast.success('招待コードをコピーしました');
	}

	// 手動入金
	let selectedOrder = $state('');
	const pendingPaymentOrders = orders.filter((o) => o.status === 'PENDING_PAYMENT');

	function confirmPayment() {
		if (!selectedOrder) {
			toast.error('注文を選択してください');
			return;
		}
		toast.success('入金を確定しました');
		selectedOrder = '';
	}

	// ポイント調整
	let selectedUser = $state('');
	let pointAdjustment = $state('');
	let adjustmentReason = $state('');

	function adjustPoints() {
		if (!selectedUser || !pointAdjustment) {
			toast.error('ユーザーとポイント数を入力してください');
			return;
		}
		toast.success('ポイントを調整しました');
		selectedUser = '';
		pointAdjustment = '';
		adjustmentReason = '';
	}

	// 審査
	function approveUser() {
		toast.success('ユーザーを承認しました');
	}

	function rejectUser() {
		toast.success('ユーザーを否認しました');
	}
</script>

<svelte:head>
	<title>管理者画面 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="管理者画面" description="システムの管理機能" icon={Shield} />

	<div class="mt-6">
		<Tabs.Root bind:value={activeTab}>
			<Tabs.List class="grid w-full grid-cols-4">
				<Tabs.Trigger value="screening">審査</Tabs.Trigger>
				<Tabs.Trigger value="invite">招待</Tabs.Trigger>
				<Tabs.Trigger value="payment">手動入金</Tabs.Trigger>
				<Tabs.Trigger value="points">ポイント調整</Tabs.Trigger>
			</Tabs.List>

			<!-- 審査タブ -->
			<Tabs.Content value="screening" class="mt-6">
				<Card.Root>
					<Card.Header>
						<Card.Title>審査待ちユーザー</Card.Title>
						<Card.Description>登録申請を承認または否認します</Card.Description>
					</Card.Header>
					<Card.Content>
						{#if pendingUsers.length > 0}
							<div class="space-y-4">
								{#each pendingUsers as user (user.id)}
									<div class="flex items-center justify-between rounded-lg border p-4">
										<div class="flex items-center gap-4">
											<Avatar.Root class="h-12 w-12">
												<Avatar.Image src={user.avatarUrl} alt={user.name} />
												<Avatar.Fallback>{user.name.slice(0, 2)}</Avatar.Fallback>
											</Avatar.Root>
											<div>
												<p class="font-medium">{user.name}</p>
												<p class="text-sm text-muted-foreground">{user.email}</p>
												{#if user.headline}
													<p class="text-sm text-muted-foreground">{user.headline}</p>
												{/if}
												<div class="mt-1 flex flex-wrap gap-1">
													{#each user.specialties as specialty (specialty)}
														<Badge variant="outline" class="text-xs">{specialty}</Badge>
													{/each}
												</div>
											</div>
										</div>
										<div class="flex gap-2">
											<Button
												variant="outline"
												size="sm"
												class="text-destructive"
												onclick={() => rejectUser(user.id)}
											>
												<UserX class="mr-2 h-4 w-4" />
												否認
											</Button>
											<Button size="sm" onclick={() => approveUser(user.id)}>
												<UserCheck class="mr-2 h-4 w-4" />
												承認
											</Button>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<EmptyState
								title="審査待ちユーザーはいません"
								description="新規登録があると、ここに表示されます"
								icon={UserCheck}
							/>
						{/if}
					</Card.Content>
				</Card.Root>
			</Tabs.Content>

			<!-- 招待タブ -->
			<Tabs.Content value="invite" class="mt-6 space-y-6">
				<Card.Root>
					<Card.Header>
						<Card.Title>招待コード発行</Card.Title>
						<Card.Description>新しい招待コードを発行します</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="flex gap-4">
							<div class="flex-1">
								<Input placeholder="招待コード" bind:value={newInviteCode} readonly />
							</div>
							<Button variant="outline" onclick={generateInviteCode}>
								<Plus class="mr-2 h-4 w-4" />
								生成
							</Button>
							{#if newInviteCode}
								<Button onclick={copyInviteCode}>
									<Copy class="mr-2 h-4 w-4" />
									コピー
								</Button>
							{/if}
						</div>
						{#if newInviteCode}
							<p class="mt-2 text-sm text-muted-foreground">
								招待リンク: {window?.location?.origin}/invite/{newInviteCode}
							</p>
						{/if}
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>発行済み招待コード</Card.Title>
					</Card.Header>
					<Card.Content>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head>コード</Table.Head>
									<Table.Head>発行日</Table.Head>
									<Table.Head>使用者</Table.Head>
									<Table.Head>使用日</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each inviteCodes as code (code.code)}
									<Table.Row>
										<Table.Cell class="font-mono">{code.code}</Table.Cell>
										<Table.Cell class="text-sm text-muted-foreground">
											{new Date(code.createdAt).toLocaleDateString('ja-JP')}
										</Table.Cell>
										<Table.Cell>
											{#if code.usedBy}
												<div class="flex items-center gap-2">
													<Avatar.Root class="h-6 w-6">
														<Avatar.Image src={code.usedBy.avatarUrl} alt={code.usedBy.name} />
														<Avatar.Fallback class="text-xs">
															{code.usedBy.name.slice(0, 2)}
														</Avatar.Fallback>
													</Avatar.Root>
													<span class="text-sm">{code.usedBy.name}</span>
												</div>
											{:else}
												<Badge variant="outline">未使用</Badge>
											{/if}
										</Table.Cell>
										<Table.Cell class="text-sm text-muted-foreground">
											{code.usedAt ? new Date(code.usedAt).toLocaleDateString('ja-JP') : '-'}
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>

			<!-- 手動入金タブ -->
			<Tabs.Content value="payment" class="mt-6">
				<Card.Root>
					<Card.Header>
						<Card.Title>手動入金確定</Card.Title>
						<Card.Description>銀行振込などの入金を手動で確定します</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-2">
							<Label>入金待ち注文</Label>
							<Select.Root type="single" bind:value={selectedOrder}>
								<Select.Trigger class="w-full">
									{selectedOrder
										? pendingPaymentOrders.find((o) => o.id === selectedOrder)?.orderNo
										: '注文を選択'}
								</Select.Trigger>
								<Select.Content>
									{#each pendingPaymentOrders as order (order.id)}
										<Select.Item value={order.id}>
											{order.orderNo} - ¥{order.total.toLocaleString()}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>

						{#if selectedOrder}
							{@const order = pendingPaymentOrders.find((o) => o.id === selectedOrder)}
							{#if order}
								<div class="rounded-lg bg-muted p-4">
									<p class="text-sm">
										<strong>注文番号:</strong>
										{order.orderNo}
									</p>
									<p class="text-sm">
										<strong>金額:</strong> ¥{order.total.toLocaleString()}
									</p>
									<p class="text-sm">
										<strong>販売者:</strong>
										{order.seller.name}
									</p>
								</div>
							{/if}
						{/if}

						<Button onclick={confirmPayment} disabled={!selectedOrder}>
							<CreditCard class="mr-2 h-4 w-4" />
							入金を確定
						</Button>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>

			<!-- ポイント調整タブ -->
			<Tabs.Content value="points" class="mt-6">
				<Card.Root>
					<Card.Header>
						<Card.Title>ポイント調整</Card.Title>
						<Card.Description>ユーザーのポイントを手動で調整します</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-2">
							<Label>ユーザー</Label>
							<Select.Root type="single" bind:value={selectedUser}>
								<Select.Trigger class="w-full">
									{selectedUser ? users.find((u) => u.id === selectedUser)?.name : 'ユーザーを選択'}
								</Select.Trigger>
								<Select.Content>
									{#each users.filter((u) => u.status === 'ACTIVE') as user (user.id)}
										<Select.Item value={user.id}>{user.name}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>

						<div class="space-y-2">
							<Label for="pointAdjustment">ポイント数（マイナス可）</Label>
							<Input
								id="pointAdjustment"
								type="number"
								placeholder="例: 1000 または -500"
								bind:value={pointAdjustment}
							/>
						</div>

						<div class="space-y-2">
							<Label for="adjustmentReason">理由</Label>
							<Textarea
								id="adjustmentReason"
								placeholder="例: キャンペーン付与"
								bind:value={adjustmentReason}
								rows={3}
							/>
						</div>

						<Button onclick={adjustPoints} disabled={!selectedUser || !pointAdjustment}>
							<Coins class="mr-2 h-4 w-4" />
							ポイントを調整
						</Button>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
