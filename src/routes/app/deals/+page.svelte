<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHeader, EmptyState } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { deals, STAGE_LABELS, type DealStage } from '$lib/mock';
	import { Briefcase, Plus, Users, ListTodo } from 'lucide-svelte';

	let activeTab = $state('active');

	const filteredDeals = $derived(() => {
		if (activeTab === 'active') {
			return deals.filter((d) => !['DONE', 'CANCELLED'].includes(d.stage));
		}
		if (activeTab === 'done') {
			return deals.filter((d) => d.stage === 'DONE');
		}
		if (activeTab === 'cancelled') {
			return deals.filter((d) => d.stage === 'CANCELLED');
		}
		return deals;
	});

	function getStageBadgeVariant(stage: DealStage) {
		switch (stage) {
			case 'CONSULT':
			case 'HEARING':
				return 'secondary' as const;
			case 'PROPOSAL':
			case 'ESTIMATE':
				return 'outline' as const;
			case 'ORDERED':
			case 'DELIVERY':
			case 'INVOICE':
				return 'default' as const;
			case 'DONE':
				return 'default' as const;
			case 'CANCELLED':
				return 'destructive' as const;
			default:
				return 'outline' as const;
		}
	}
</script>

<svelte:head>
	<title>案件一覧 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="案件一覧" description="進行中の案件を管理します" icon={Briefcase}>
		{#snippet actions()}
			<Button>
				<Plus class="mr-2 h-4 w-4" />
				案件を作成
			</Button>
		{/snippet}
	</PageHeader>

	<!-- Tabs -->
	<div class="mt-6">
		<Tabs.Root bind:value={activeTab}>
			<Tabs.List>
				<Tabs.Trigger value="active">
					進行中 ({deals.filter((d) => !['DONE', 'CANCELLED'].includes(d.stage)).length})
				</Tabs.Trigger>
				<Tabs.Trigger value="done">
					完了 ({deals.filter((d) => d.stage === 'DONE').length})
				</Tabs.Trigger>
				<Tabs.Trigger value="cancelled">
					キャンセル ({deals.filter((d) => d.stage === 'CANCELLED').length})
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>

	<!-- Deals List -->
	<div class="mt-6">
		{#if filteredDeals().length > 0}
			<div class="space-y-4">
				{#each filteredDeals() as deal (deal.id)}
					<a href={resolve(`/app/deals/${deal.id}`)} class="block">
						<Card.Root class="transition-colors hover:bg-accent/50">
							<Card.Header class="pb-2">
								<div class="flex items-start justify-between">
									<div>
										<Card.Title class="text-lg">{deal.title}</Card.Title>
										<Card.Description>
											作成日: {new Date(deal.createdAt).toLocaleDateString('ja-JP')}
										</Card.Description>
									</div>
									<Badge variant={getStageBadgeVariant(deal.stage)}>
										{STAGE_LABELS[deal.stage]}
									</Badge>
								</div>
							</Card.Header>
							<Card.Content>
								<div class="flex flex-wrap items-center gap-6">
									<!-- Members -->
									<div class="flex items-center gap-2">
										<Users class="h-4 w-4 text-muted-foreground" />
										<div class="flex -space-x-2">
											{#each deal.members.slice(0, 3) as member (member.user.id)}
												<Avatar.Root class="h-6 w-6 border-2 border-background">
													<Avatar.Image src={member.user.avatarUrl} alt={member.user.name} />
													<Avatar.Fallback class="text-xs">
														{member.user.name.slice(0, 1)}
													</Avatar.Fallback>
												</Avatar.Root>
											{/each}
											{#if deal.members.length > 3}
												<div
													class="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs"
												>
													+{deal.members.length - 3}
												</div>
											{/if}
										</div>
									</div>

									<!-- Tasks -->
									<div class="flex items-center gap-2 text-sm text-muted-foreground">
										<ListTodo class="h-4 w-4" />
										<span>
											{deal.tasks.filter((t) => t.status === 'DONE').length}/{deal.tasks.length}
											完了
										</span>
									</div>

									<!-- Role Badge -->
									{#each deal.members.filter((m) => m.role === 'FRONT') as frontMember (frontMember.user.id)}
										{#if frontMember.user.id === 'user-1'}
											<Badge variant="outline" class="text-xs">窓口担当</Badge>
										{/if}
									{/each}
								</div>
							</Card.Content>
						</Card.Root>
					</a>
				{/each}
			</div>
		{:else}
			<Card.Root>
				<EmptyState
					title="案件がありません"
					description={activeTab === 'active'
						? '相談から案件を作成しましょう'
						: '該当する案件がありません'}
					icon={Briefcase}
				>
					{#snippet action()}
						{#if activeTab === 'active'}
							<Button href={resolve('/app/inquiries')}>相談一覧を見る</Button>
						{/if}
					{/snippet}
				</EmptyState>
			</Card.Root>
		{/if}
	</div>
</div>
