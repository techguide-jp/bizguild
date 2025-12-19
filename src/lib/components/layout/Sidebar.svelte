<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Switch } from '$lib/components/ui/switch';
	import { currentUser } from '$lib/mock';
	import { uiMode } from '$lib/stores/uiMode.svelte';
	import {
		LayoutDashboard,
		Package,
		MessageSquare,
		Briefcase,
		ShoppingCart,
		Coins,
		User,
		Palette,
		Shield,
		Heart,
		Search,
		Users,
		Bookmark,
		Rss,
		X,
		Store,
		Compass
	} from 'lucide-svelte';

	interface Props {
		class?: string;
		onClose?: () => void;
	}

	let { class: className, onClose }: Props = $props();

	// 提供モードのナビ
	const providerNavItems = [
		{ href: '/app/dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
		{ href: '/app/products', label: '商品管理', icon: Package },
		{ href: '/app/room', label: 'おすすめ', icon: Heart },
		{ href: '/app/inquiries', label: '相談', icon: MessageSquare },
		{ href: '/app/deals', label: '案件', icon: Briefcase },
		{ href: '/app/orders', label: '注文', icon: ShoppingCart }
	];

	// 探索モードのナビ
	const seekerNavItems = [
		{ href: '/app/dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
		{ href: '/app/discover', label: '探す', icon: Search },
		{ href: '/app/following', label: 'フォロー中', icon: Users },
		{ href: '/app/bookmarks', label: 'ブックマーク', icon: Bookmark },
		{ href: '/app/feed', label: 'フィード', icon: Rss },
		{ href: '/app/orders', label: '購入履歴', icon: ShoppingCart }
	];

	// 共通ナビ
	const commonNavItems = [{ href: '/app/points', label: 'ポイント', icon: Coins }];

	const settingsItems = [
		{ href: '/app/settings/profile', label: 'プロフィール', icon: User },
		{ href: '/app/settings/theme', label: 'テーマ設定', icon: Palette }
	];

	const adminItems = [{ href: '/app/admin', label: '管理者', icon: Shield }];

	function isActive(href: string): boolean {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}

	function handleModeToggle() {
		uiMode.toggle();
	}

	// 現在のモードに応じたナビアイテム
	const navItems = $derived(uiMode.current === 'PROVIDER' ? providerNavItems : seekerNavItems);
</script>

<aside class={cn('flex h-full w-64 flex-col border-r bg-card', className)}>
	<!-- Header -->
	<div class="flex h-16 items-center justify-between border-b px-4">
		<a href="/app/dashboard" class="flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
			>
				<span class="text-sm font-bold">B</span>
			</div>
			<span class="text-lg font-semibold">BizGuild</span>
		</a>
		{#if onClose}
			<button onclick={onClose} class="rounded-md p-1 hover:bg-accent lg:hidden">
				<X class="h-5 w-5" />
			</button>
		{/if}
	</div>

	<!-- Mode Toggle -->
	<div class="border-b px-4 py-3">
		<div class="flex items-center justify-between">
			<button
				onclick={handleModeToggle}
				class={cn(
					'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
					uiMode.current === 'PROVIDER'
						? 'bg-blue-100 text-blue-700'
						: 'bg-green-100 text-green-700'
				)}
			>
				{#if uiMode.current === 'PROVIDER'}
					<Store class="h-4 w-4" />
					<span>提供モード</span>
				{:else}
					<Compass class="h-4 w-4" />
					<span>探索モード</span>
				{/if}
			</button>
			<Switch checked={uiMode.current === 'SEEKER'} onCheckedChange={handleModeToggle} />
		</div>
		<p class="mt-1 text-xs text-muted-foreground">
			{uiMode.current === 'PROVIDER' ? 'サービスを提供・販売' : '協業先・サービスを探す'}
		</p>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 space-y-1 overflow-y-auto p-4">
		<div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
			メイン
		</div>
		{#each navItems as item}
			<a
				href={item.href}
				onclick={onClose}
				class={cn(
					'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
					isActive(item.href)
						? 'bg-primary text-primary-foreground'
						: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
				)}
			>
				<item.icon class="h-4 w-4" />
				{item.label}
			</a>
		{/each}

		{#each commonNavItems as item}
			<a
				href={item.href}
				onclick={onClose}
				class={cn(
					'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
					isActive(item.href)
						? 'bg-primary text-primary-foreground'
						: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
				)}
			>
				<item.icon class="h-4 w-4" />
				{item.label}
			</a>
		{/each}

		<div
			class="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
		>
			設定
		</div>
		{#each settingsItems as item}
			<a
				href={item.href}
				onclick={onClose}
				class={cn(
					'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
					isActive(item.href)
						? 'bg-primary text-primary-foreground'
						: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
				)}
			>
				<item.icon class="h-4 w-4" />
				{item.label}
			</a>
		{/each}

		{#if currentUser.isAdmin}
			<div
				class="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
			>
				管理
			</div>
			{#each adminItems as item}
				<a
					href={item.href}
					onclick={onClose}
					class={cn(
						'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
						isActive(item.href)
							? 'bg-primary text-primary-foreground'
							: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
					)}
				>
					<item.icon class="h-4 w-4" />
					{item.label}
				</a>
			{/each}
		{/if}
	</nav>

	<!-- User -->
	<div class="border-t p-4">
		<a
			href={`/u/${currentUser.slug}`}
			class="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent"
		>
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src={currentUser.avatarUrl} alt={currentUser.name} />
				<Avatar.Fallback>{currentUser.name.slice(0, 2)}</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex-1 truncate">
				<p class="truncate text-sm font-medium">{currentUser.name}</p>
				<p class="truncate text-xs text-muted-foreground">{currentUser.email}</p>
			</div>
		</a>
	</div>
</aside>
