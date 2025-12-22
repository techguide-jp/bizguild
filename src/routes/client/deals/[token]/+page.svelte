<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { deals, STAGE_LABELS, type DealStage } from '$lib/mock';
	import { CheckCircle, Circle, Clock, Users, ListTodo, MessageSquare } from 'lucide-svelte';

	const token = $page.params.token;

	// トークンからdealを検索
	const deal = deals.find((d) => d.shareToken === token) || deals[0];

	// 顧客に表示可能なメンバーのみ
	const visibleMembers = deal.members.filter((m) => m.isClientVisible);

	// 顧客に表示可能なタスクのみ
	const visibleTasks = deal.tasks.filter((t) => t.isClientVisible);

	// 顧客に表示可能なコメントのみ
	const visibleComments = deal.comments.filter((c) => c.isClientVisible);

	const stages: DealStage[] = [
		'CONSULT',
		'HEARING',
		'PROPOSAL',
		'ESTIMATE',
		'ORDERED',
		'DELIVERY',
		'INVOICE',
		'DONE'
	];

	const currentStageIndex = stages.indexOf(deal.stage);

	function getStageStatus(stage: DealStage): 'completed' | 'current' | 'upcoming' {
		const stageIndex = stages.indexOf(stage);
		if (stageIndex < currentStageIndex) return 'completed';
		if (stageIndex === currentStageIndex) return 'current';
		return 'upcoming';
	}
</script>

<svelte:head>
	<title>{deal.title} - 案件進捗</title>
</svelte:head>

<div class="min-h-screen bg-muted/30">
	<!-- Header -->
	<header class="border-b bg-background">
		<div class="mx-auto max-w-4xl px-4 py-6">
			<p class="text-sm text-muted-foreground">案件進捗</p>
			<h1 class="text-2xl font-bold">{deal.title}</h1>
		</div>
	</header>

	<!-- Content -->
	<main class="mx-auto max-w-4xl px-4 py-8">
		<div class="space-y-8">
			<!-- Stage Stepper -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Clock class="h-5 w-5" />
						進捗状況
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap gap-2">
						{#each stages as stage (stage)}
							{@const status = getStageStatus(stage)}
							<div
								class="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm
									{status === 'completed'
									? 'bg-green-100 text-green-700'
									: status === 'current'
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'}"
							>
								{#if status === 'completed'}
									<CheckCircle class="h-4 w-4" />
								{:else if status === 'current'}
									<Circle class="h-4 w-4 fill-current" />
								{:else}
									<Circle class="h-4 w-4" />
								{/if}
								{STAGE_LABELS[stage]}
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Members -->
			{#if visibleMembers.length > 0}
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<Users class="h-5 w-5" />
							担当メンバー
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-wrap gap-4">
							{#each visibleMembers as member (member.user.id)}
								<div class="flex items-center gap-3">
									<Avatar.Root class="h-10 w-10">
										<Avatar.Image src={member.user.avatarUrl} alt={member.user.name} />
										<Avatar.Fallback>{member.user.name.slice(0, 2)}</Avatar.Fallback>
									</Avatar.Root>
									<div>
										<p class="font-medium">{member.user.name}</p>
										<Badge variant="outline" class="text-xs">
											{member.role === 'FRONT'
												? '窓口'
												: member.role === 'PROVIDER'
													? '担当'
													: '協力'}
										</Badge>
									</div>
								</div>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/if}

			<!-- Tasks -->
			{#if visibleTasks.length > 0}
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<ListTodo class="h-5 w-5" />
							タスク一覧
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="space-y-3">
							{#each visibleTasks as task (task.id)}
								<div class="flex items-center justify-between rounded-lg border p-3">
									<div class="flex items-center gap-3">
										{#if task.status === 'DONE'}
											<CheckCircle class="h-5 w-5 text-green-500" />
										{:else if task.status === 'DOING'}
											<div class="h-5 w-5 animate-pulse rounded-full bg-blue-500"></div>
										{:else}
											<Circle class="h-5 w-5 text-muted-foreground" />
										{/if}
										<span
											class={task.status === 'DONE' ? 'text-muted-foreground line-through' : ''}
										>
											{task.title}
										</span>
									</div>
									<div class="flex items-center gap-2">
										{#if task.dueAt}
											<span class="text-sm text-muted-foreground">{task.dueAt}</span>
										{/if}
										<Badge
											variant={task.status === 'DONE'
												? 'default'
												: task.status === 'DOING'
													? 'secondary'
													: 'outline'}
										>
											{task.status === 'DONE'
												? '完了'
												: task.status === 'DOING'
													? '進行中'
													: '予定'}
										</Badge>
									</div>
								</div>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/if}

			<!-- Comments -->
			{#if visibleComments.length > 0}
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<MessageSquare class="h-5 w-5" />
							コメント
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="space-y-4">
							{#each visibleComments as comment (comment.id)}
								<div class="flex gap-3">
									<Avatar.Root class="h-8 w-8">
										<Avatar.Image src={comment.author.avatarUrl} alt={comment.author.name} />
										<Avatar.Fallback class="text-xs">
											{comment.author.name.slice(0, 2)}
										</Avatar.Fallback>
									</Avatar.Root>
									<div class="flex-1">
										<div class="flex items-center gap-2">
											<span class="font-medium">{comment.author.name}</span>
											<span class="text-xs text-muted-foreground">
												{new Date(comment.createdAt).toLocaleDateString('ja-JP')}
											</span>
										</div>
										<p class="mt-1 text-sm">{comment.body}</p>
									</div>
								</div>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/if}
		</div>
	</main>
</div>
