<script lang="ts">
	import { page } from '$app/stores';
	import { PageHeader } from '$lib/components/layout';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { toast } from 'svelte-sonner';
	import { deals, STAGE_LABELS, type DealStage } from '$lib/mock';
	import {
		Briefcase,
		CheckCircle,
		Circle,
		Users,
		ListTodo,
		MessageSquare,
		FileText,
		Link,
		Plus,
		Send,
		Eye,
		EyeOff
	} from 'lucide-svelte';

	const dealId = $page.params.id;
	const deal = deals.find((d) => d.id === dealId) || deals[0];

	let activeTab = $state('tasks');
	let newComment = $state('');
	let newCommentIsClientVisible = $state(false);

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

	function getRoleBadge(role: string) {
		switch (role) {
			case 'FRONT':
				return { label: '窓口', variant: 'default' as const };
			case 'PROVIDER':
				return { label: '担当', variant: 'secondary' as const };
			case 'COLLABORATOR':
				return { label: '協力', variant: 'outline' as const };
			default:
				return { label: role, variant: 'outline' as const };
		}
	}

	function copyShareLink() {
		const url = `${window.location.origin}/client/deals/${deal.shareToken}`;
		navigator.clipboard.writeText(url);
		toast.success('共有リンクをコピーしました');
	}

	function addComment() {
		if (!newComment.trim()) return;
		toast.success('コメントを追加しました');
		newComment = '';
		newCommentIsClientVisible = false;
	}
</script>

<svelte:head>
	<title>{deal.title} - BizGuild</title>
</svelte:head>

<div class="p-6">
	<PageHeader title={deal.title} icon={Briefcase}>
		{#snippet actions()}
			<Button variant="outline" onclick={copyShareLink}>
				<Link class="mr-2 h-4 w-4" />
				共有リンク
			</Button>
		{/snippet}
	</PageHeader>

	<!-- Stage Stepper -->
	<Card.Root class="mt-6">
		<Card.Header>
			<Card.Title class="text-base">進捗状況</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-wrap gap-2">
				{#each stages as stage}
					{@const status = getStageStatus(stage)}
					<button
						class="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors
							{status === 'completed'
							? 'bg-green-100 text-green-700 hover:bg-green-200'
							: status === 'current'
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
						onclick={() => toast.info(`ステージを「${STAGE_LABELS[stage]}」に変更します`)}
					>
						{#if status === 'completed'}
							<CheckCircle class="h-4 w-4" />
						{:else if status === 'current'}
							<Circle class="h-4 w-4 fill-current" />
						{:else}
							<Circle class="h-4 w-4" />
						{/if}
						{STAGE_LABELS[stage]}
					</button>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>

	<div class="mt-6 grid gap-6 lg:grid-cols-3">
		<!-- Main Content -->
		<div class="lg:col-span-2">
			<Card.Root>
				<Tabs.Root bind:value={activeTab}>
					<Card.Header class="pb-0">
						<Tabs.List class="w-full justify-start">
							<Tabs.Trigger value="tasks" class="gap-2">
								<ListTodo class="h-4 w-4" />
								タスク
							</Tabs.Trigger>
							<Tabs.Trigger value="comments" class="gap-2">
								<MessageSquare class="h-4 w-4" />
								コメント
							</Tabs.Trigger>
							<Tabs.Trigger value="documents" class="gap-2">
								<FileText class="h-4 w-4" />
								ドキュメント
							</Tabs.Trigger>
						</Tabs.List>
					</Card.Header>
					<Card.Content class="pt-6">
						<!-- Tasks Tab -->
						<Tabs.Content value="tasks">
							<div class="space-y-3">
								{#each deal.tasks as task}
									<div
										class="flex items-center justify-between rounded-lg border p-3"
									>
										<div class="flex items-center gap-3">
											<button
												class="flex-shrink-0"
												onclick={() => toast.success(`タスク「${task.title}」を更新しました`)}
											>
												{#if task.status === 'DONE'}
													<CheckCircle class="h-5 w-5 text-green-500" />
												{:else if task.status === 'DOING'}
													<div class="h-5 w-5 animate-pulse rounded-full bg-blue-500"></div>
												{:else}
													<Circle class="h-5 w-5 text-muted-foreground" />
												{/if}
											</button>
											<div>
												<span
													class={task.status === 'DONE'
														? 'text-muted-foreground line-through'
														: ''}
												>
													{task.title}
												</span>
												<div class="mt-1 flex items-center gap-2">
													{#if task.assignee}
														<Avatar.Root class="h-5 w-5">
															<Avatar.Image
																src={task.assignee.avatarUrl}
																alt={task.assignee.name}
															/>
															<Avatar.Fallback class="text-xs">
																{task.assignee.name.slice(0, 1)}
															</Avatar.Fallback>
														</Avatar.Root>
													{/if}
													{#if task.dueAt}
														<span class="text-xs text-muted-foreground">{task.dueAt}</span>
													{/if}
												</div>
											</div>
										</div>
										<div class="flex items-center gap-2">
											{#if task.isClientVisible}
												<Eye class="h-4 w-4 text-muted-foreground" />
											{:else}
												<EyeOff class="h-4 w-4 text-muted-foreground" />
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

								<Button variant="outline" class="w-full">
									<Plus class="mr-2 h-4 w-4" />
									タスクを追加
								</Button>
							</div>
						</Tabs.Content>

						<!-- Comments Tab -->
						<Tabs.Content value="comments">
							<div class="space-y-4">
								<!-- Internal / External Tabs -->
								<div class="flex gap-2">
									<Badge variant="secondary">内部コメント</Badge>
									<Badge variant="outline">顧客公開</Badge>
								</div>

								{#each deal.comments as comment}
									<div class="flex gap-3">
										<Avatar.Root class="h-8 w-8">
											<Avatar.Image
												src={comment.author.avatarUrl}
												alt={comment.author.name}
											/>
											<Avatar.Fallback class="text-xs">
												{comment.author.name.slice(0, 2)}
											</Avatar.Fallback>
										</Avatar.Root>
										<div class="flex-1">
											<div class="flex items-center gap-2">
												<span class="font-medium">{comment.author.name}</span>
												<span class="text-xs text-muted-foreground">
													{new Date(comment.createdAt).toLocaleString('ja-JP')}
												</span>
												{#if comment.isClientVisible}
													<Badge variant="outline" class="text-xs">
														<Eye class="mr-1 h-3 w-3" />
														顧客公開
													</Badge>
												{/if}
											</div>
											<p class="mt-1 text-sm">{comment.body}</p>
										</div>
									</div>
								{/each}

								<!-- Add Comment -->
								<div class="mt-4 space-y-2">
									<Textarea
										placeholder="コメントを入力..."
										bind:value={newComment}
										rows={3}
									/>
									<div class="flex items-center justify-between">
										<label class="flex items-center gap-2">
											<Checkbox bind:checked={newCommentIsClientVisible} />
											<span class="text-sm">顧客に公開</span>
										</label>
										<Button size="sm" onclick={addComment}>
											<Send class="mr-2 h-4 w-4" />
											送信
										</Button>
									</div>
								</div>
							</div>
						</Tabs.Content>

						<!-- Documents Tab -->
						<Tabs.Content value="documents">
							<div class="space-y-3">
								<Button variant="outline" class="w-full justify-start">
									<FileText class="mr-2 h-4 w-4" />
									提案書を作成
								</Button>
								<Button variant="outline" class="w-full justify-start">
									<FileText class="mr-2 h-4 w-4" />
									見積書を作成
								</Button>
								<Button variant="outline" class="w-full justify-start">
									<FileText class="mr-2 h-4 w-4" />
									請求書を作成
								</Button>
							</div>
						</Tabs.Content>
					</Card.Content>
				</Tabs.Root>
			</Card.Root>
		</div>

		<!-- Sidebar -->
		<div class="space-y-6">
			<!-- Members -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Users class="h-5 w-5" />
						メンバー
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					{#each deal.members as member}
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<Avatar.Root class="h-8 w-8">
									<Avatar.Image src={member.user.avatarUrl} alt={member.user.name} />
									<Avatar.Fallback class="text-xs">
										{member.user.name.slice(0, 2)}
									</Avatar.Fallback>
								</Avatar.Root>
								<div>
									<p class="text-sm font-medium">{member.user.name}</p>
									<Badge variant={getRoleBadge(member.role).variant} class="text-xs">
										{getRoleBadge(member.role).label}
									</Badge>
								</div>
							</div>
							{#if member.isClientVisible}
								<Eye class="h-4 w-4 text-muted-foreground" />
							{:else}
								<EyeOff class="h-4 w-4 text-muted-foreground" />
							{/if}
						</div>
					{/each}
					<Button variant="outline" class="w-full" size="sm">
						<Plus class="mr-2 h-4 w-4" />
						メンバーを追加
					</Button>
				</Card.Content>
			</Card.Root>

			<!-- Share Link -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Link class="h-5 w-5" />
						顧客共有
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="mb-3 text-sm text-muted-foreground">
						顧客にこのリンクを共有すると、進捗状況を確認できます。
					</p>
					<Button variant="outline" class="w-full" onclick={copyShareLink}>
						共有リンクをコピー
					</Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
