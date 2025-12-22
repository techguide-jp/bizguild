<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink } from 'lucide-svelte';
	import { resolve } from '$app/paths';
</script>

<header
	class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
		<a href={resolve('/')} class="flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
			>
				<span class="text-sm font-bold">B</span>
			</div>
			<span class="text-lg font-semibold">BizGuild</span>
		</a>
		<nav class="hidden items-center gap-6 md:flex">
			<a
				href={resolve('/features')}
				class="text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				機能
			</a>
			<a
				href={resolve('/app/dashboard')}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<span>デモを見る</span>
				<span class="rounded-full border px-1.5 py-0.5 text-[10px] font-medium">開発中</span>
			</a>
			<a
				href={resolve('/contact')}
				class="text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				お問い合わせ
			</a>
		</nav>
		<div class="flex items-center gap-3">
			<Button
				variant="outline"
				href={resolve('/app/dashboard')}
				target="_blank"
				rel="noopener noreferrer"
				class="hidden gap-1.5 sm:inline-flex"
			>
				デモを見る
				<ExternalLink class="h-3.5 w-3.5" />
			</Button>
			<Button href={resolve('/contact')}>話を聞いてみる</Button>
		</div>
	</div>
</header>
