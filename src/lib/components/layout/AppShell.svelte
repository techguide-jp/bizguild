<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import Sidebar from './Sidebar.svelte';
	import { Menu } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();

	let sidebarOpen = $state(false);

	// ページ遷移時にサイドバーを閉じる
	$effect(() => {
		void $page.url.pathname; // ページ遷移を監視
		sidebarOpen = false;
	});
</script>

<div class={cn('flex min-h-screen bg-background', className)}>
	<!-- Desktop Sidebar -->
	<div class="hidden lg:block">
		<div class="fixed inset-y-0 left-0 z-30 w-64">
			<Sidebar />
		</div>
	</div>

	<!-- Mobile Sidebar -->
	<Sheet.Root bind:open={sidebarOpen}>
		<Sheet.Content side="left" class="w-64 p-0">
			<Sidebar onClose={() => (sidebarOpen = false)} />
		</Sheet.Content>
	</Sheet.Root>

	<!-- Main Content -->
	<div class="flex flex-1 flex-col lg:pl-64">
		<!-- Mobile Header -->
		<header
			class="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden"
		>
			<Button variant="ghost" size="icon" onclick={() => (sidebarOpen = true)}>
				<Menu class="h-5 w-5" />
				<span class="sr-only">メニューを開く</span>
			</Button>
			<div class="flex items-center gap-2">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
				>
					<span class="text-sm font-bold">B</span>
				</div>
				<span class="text-lg font-semibold">BizGuild</span>
			</div>
		</header>

		<!-- Page Content -->
		<main class="flex-1">
			{@render children()}
		</main>
	</div>
</div>
