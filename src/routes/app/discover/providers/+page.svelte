<script lang="ts">
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { users, products } from '$lib/mock';
	import { Users, Search, UserPlus, ExternalLink, Package } from 'lucide-svelte';

	let searchQuery = $state('');
	let selectedSpecialty = $state<string | null>(null);

	const activeUsers = users.filter((u) => u.status === 'ACTIVE');

	// 各ユーザーの商品数を計算
	function getProductCount(userId: string): number {
		return products.filter((p) => p.owner.id === userId && p.status === 'PUBLISHED').length;
	}

	// 利用可能な専門分野を収集
	const allSpecialties = [...new Set(activeUsers.flatMap((u) => u.specialties))];

	// フィルタリング
	const filteredUsers = $derived(() => {
		let result = activeUsers.filter(
			(u) =>
				u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
		);

		if (selectedSpecialty !== null) {
			result = result.filter((u) => u.specialties.includes(selectedSpecialty!));
		}

		return result;
	});
</script>

<div class="p-6">
	<PageHeader title="提供者を探す" description="専門家やサービス提供者を検索" icon={Users}>
		{#snippet actions()}
			<Button variant="outline" href="/app/discover">
				戻る
			</Button>
		{/snippet}
	</PageHeader>

	<!-- Filters -->
	<Card.Root class="mb-6">
		<Card.Content class="p-4">
			<!-- Search -->
			<div class="relative">
				<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					placeholder="名前や専門分野で検索..."
					class="pl-10"
					bind:value={searchQuery}
				/>
			</div>

			<!-- Specialties -->
			<div class="mt-4">
				<p class="mb-2 text-sm font-medium">専門分野で絞り込み</p>
				<div class="flex flex-wrap gap-2">
					<Badge
						variant={selectedSpecialty === null ? 'default' : 'outline'}
						class="cursor-pointer"
						onclick={() => (selectedSpecialty = null)}
					>
						すべて
					</Badge>
					{#each allSpecialties as specialty}
						<Badge
							variant={selectedSpecialty === specialty ? 'default' : 'outline'}
							class="cursor-pointer"
							onclick={() => (selectedSpecialty = specialty)}
						>
							{specialty}
						</Badge>
					{/each}
				</div>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Results -->
	<div class="mb-4">
		<p class="text-sm text-muted-foreground">{filteredUsers().length}人の提供者</p>
	</div>

	<div class="space-y-4">
		{#each filteredUsers() as user}
			<Card.Root class="transition-shadow hover:shadow-md">
				<Card.Content class="p-6">
					<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
						<Avatar.Root class="h-16 w-16 shrink-0">
							<Avatar.Image src={user.avatarUrl} alt={user.name} />
							<Avatar.Fallback class="text-lg">{user.name.slice(0, 2)}</Avatar.Fallback>
						</Avatar.Root>

						<div class="flex-1">
							<div class="flex items-start justify-between">
								<div>
									<h3 class="text-lg font-semibold">{user.name}</h3>
									{#if user.headline}
										<p class="text-muted-foreground">{user.headline}</p>
									{/if}
								</div>
								<div class="flex items-center gap-2 text-sm text-muted-foreground">
									<Package class="h-4 w-4" />
									<span>{getProductCount(user.id)}件の商品</span>
								</div>
							</div>

							<div class="mt-3 flex flex-wrap gap-2">
								{#each user.specialties as specialty}
									<Badge variant="secondary">{specialty}</Badge>
								{/each}
							</div>

							<div class="mt-4 flex gap-2">
								<Button variant="default" size="sm">
									<UserPlus class="mr-1 h-4 w-4" />
									フォローする
								</Button>
								<Button variant="outline" size="sm" href={`/u/${user.slug}`}>
									プロフィール
									<ExternalLink class="ml-1 h-3 w-3" />
								</Button>
								<Button variant="ghost" size="sm" href={`/u/${user.slug}/room`}>
									おすすめを見る
								</Button>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>

	{#if filteredUsers().length === 0}
		<Card.Root class="py-12 text-center">
			<Users class="mx-auto h-12 w-12 text-muted-foreground" />
			<p class="mt-4 text-muted-foreground">条件に一致する提供者が見つかりません</p>
			<Button
				variant="outline"
				class="mt-4"
				onclick={() => {
					searchQuery = '';
					selectedSpecialty = null;
				}}
			>
				フィルタをクリア
			</Button>
		</Card.Root>
	{/if}
</div>
