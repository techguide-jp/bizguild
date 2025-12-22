<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Network, Users, Sparkles, ExternalLink } from 'lucide-svelte';
	import { resolve } from '$app/paths';
</script>

<section
	class="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background"
>
	<!-- 背景装飾 -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
		<div class="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"></div>
	</div>

	<div class="mx-auto max-w-6xl px-4 py-20 lg:py-32">
		<div class="text-center">
			<Badge variant="secondary" class="mb-6 gap-1.5 px-4 py-1.5">
				<Sparkles class="h-3.5 w-3.5" />
				開発パートナー募集中
			</Badge>

			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
				あなたのネットワークを、<br />
				<span class="text-primary">ビジネスが生まれる場所に</span>
			</h1>

			<p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl">
				イベント参加者、ビジネス仲間、専門家のつながり。<br class="hidden sm:block" />
				BizGuildは、そのネットワークを<span class="font-medium text-foreground"
					>「協業・紹介が自然に生まれるコミュニティ」</span
				>に変えます。
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button size="lg" href={resolve('/contact')} class="gap-2 px-8">
					話を聞いてみる
					<ArrowRight class="h-5 w-5" />
				</Button>
				<Button size="lg" variant="outline" href={resolve('/features')} class="gap-2"
					>機能を詳しく見る</Button
				>
			</div>

			<!-- デモリンク -->
			<div class="mt-8 flex justify-center">
				<a
					href={resolve('/app/dashboard')}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
				>
					<ExternalLink class="h-4 w-4 shrink-0" />
					<span>開発中のデモを見る</span>
					<span
						class="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
						>プロトタイプ</span
					>
				</a>
			</div>

			<!-- 信頼バッジ -->
			<div
				class="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
			>
				<div class="flex items-center gap-2">
					<Network class="h-5 w-5 text-primary" />
					<span>ネットワークを資産化</span>
				</div>
				<div class="flex items-center gap-2">
					<Users class="h-5 w-5 text-primary" />
					<span>紹介が自然に生まれる</span>
				</div>
				<div class="flex items-center gap-2">
					<Sparkles class="h-5 w-5 text-primary" />
					<span>コミュニティ収益化</span>
				</div>
			</div>
		</div>
	</div>
</section>
