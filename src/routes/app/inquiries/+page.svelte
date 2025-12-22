<script lang="ts">
	import { resolve } from '$app/paths';
	import { PageHeader, EmptyState } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { inquiries } from '$lib/mock';
	import { MessageSquare, Briefcase, Mail, ExternalLink } from 'lucide-svelte';

	let activeTab = $state('all');

	const filteredInquiries = $derived(() => {
		if (activeTab === 'all') return inquiries;
		return inquiries.filter((i) => i.status === activeTab);
	});

	function getStatusBadge(status: string) {
		switch (status) {
			case 'NEW':
				return { label: '新着', variant: 'destructive' as const };
			case 'READ':
				return { label: '既読', variant: 'secondary' as const };
			case 'CONVERTED':
				return { label: '案件化済み', variant: 'default' as const };
			default:
				return { label: status, variant: 'outline' as const };
		}
	}

	async function convertToDeal() {
		toast.success('案件を作成しました');
		goto(resolve('/app/deals'));
	}
</script>

<svelte:head>
	<title>相談一覧 - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title="相談一覧" description="顧客からの相談を管理します" icon={MessageSquare} />

	<!-- Tabs -->
	<div class="mt-6">
		<Tabs.Root bind:value={activeTab}>
			<Tabs.List>
				<Tabs.Trigger value="all">
					すべて ({inquiries.length})
				</Tabs.Trigger>
				<Tabs.Trigger value="NEW">
					新着 ({inquiries.filter((i) => i.status === 'NEW').length})
				</Tabs.Trigger>
				<Tabs.Trigger value="READ">
					既読 ({inquiries.filter((i) => i.status === 'READ').length})
				</Tabs.Trigger>
				<Tabs.Trigger value="CONVERTED">
					案件化済み ({inquiries.filter((i) => i.status === 'CONVERTED').length})
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>

	<!-- Inquiries List -->
	<div class="mt-6">
		{#if filteredInquiries().length > 0}
			<div class="space-y-4">
				{#each filteredInquiries() as inquiry (inquiry.id)}
					<Card.Root
						class="transition-colors {inquiry.status === 'NEW'
							? 'border-primary bg-primary/5'
							: ''}"
					>
						<Card.Header class="pb-2">
							<div class="flex items-start justify-between">
								<div class="flex items-center gap-3">
									<div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
										<Mail class="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<p class="font-medium">{inquiry.name || '匿名'}</p>
										{#if inquiry.email}
											<p class="text-sm text-muted-foreground">{inquiry.email}</p>
										{/if}
									</div>
								</div>

								<Badge variant={getStatusBadge(inquiry.status).variant}
									>{getStatusBadge(inquiry.status).label}</Badge
								>
							</div>
						</Card.Header>
						<Card.Content>
							<p class="text-sm whitespace-pre-wrap">{inquiry.message}</p>

							{#if inquiry.sourceProduct}
								<div class="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-2">
									<span class="text-xs text-muted-foreground">関連商品:</span>
									<a
										href={resolve(`/p/${inquiry.sourceProduct.id}`)}
										class="flex items-center gap-1 text-sm text-primary hover:underline"
									>
										{inquiry.sourceProduct.title}
										<ExternalLink class="h-3 w-3" />
									</a>
								</div>
							{/if}
						</Card.Content>
						<Card.Footer class="flex items-center justify-between">
							<span class="text-xs text-muted-foreground">
								{new Date(inquiry.createdAt).toLocaleString('ja-JP')}
							</span>
							{#if inquiry.status !== 'CONVERTED'}
								<Button size="sm" onclick={() => convertToDeal(inquiry.id)}>
									<Briefcase class="mr-2 h-4 w-4" />
									案件化
								</Button>
							{/if}
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		{:else}
			<Card.Root>
				<EmptyState
					title="相談がありません"
					description={activeTab === 'all'
						? 'まだ相談が届いていません'
						: '該当する相談がありません'}
					icon={MessageSquare}
				/>
			</Card.Root>
		{/if}
	</div>
</div>
