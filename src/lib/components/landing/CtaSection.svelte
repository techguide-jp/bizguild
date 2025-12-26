<script lang="ts">
	import { PUBLIC_FEEDBACK_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Sparkles, ExternalLink } from 'lucide-svelte';
	import { resolve } from '$app/paths';
</script>

<section class="relative overflow-hidden bg-primary py-20">
	<!-- 背景装飾 -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute top-0 left-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
		<div class="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
	</div>

	<div class="mx-auto max-w-4xl px-4 text-center">
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-primary-foreground"
		>
			<Sparkles class="h-4 w-4" />
			<span>開発パートナー募集中</span>
		</div>

		<h2 class="text-3xl font-bold text-primary-foreground sm:text-4xl">
			あなたのネットワークで、<br />
			何が実現できるか
		</h2>

		<p class="mx-auto mt-4 max-w-xl text-primary-foreground/80">
			一緒に考えてみませんか？<br />
			まずはお気軽にお話を聞かせてください。
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button size="lg" variant="secondary" href={PUBLIC_FEEDBACK_URL} class="gap-2 px-8">
				話を聞いてみる
				<ArrowRight class="h-5 w-5" />
			</Button>
			<Button
				size="lg"
				variant="ghost"
				href={resolve('/features')}
				class="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
			>
				機能を詳しく見る
			</Button>
		</div>

		<!-- デモリンク -->
		<div class="mt-8 flex justify-center">
			<a
				href={resolve('/app/dashboard')}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
			>
				<ExternalLink class="h-4 w-4 shrink-0" />
				<span>開発中のデモを見る</span>
				<span
					class="rounded-full border border-primary-foreground/30 px-1.5 py-0.5 text-[10px] font-medium"
					>プロトタイプ</span
				>
			</a>
		</div>
	</div>
</section>
