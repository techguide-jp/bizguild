<script lang="ts">
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown, ArrowRight } from 'lucide-svelte';

	let openIndex = $state<number | null>(null);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}

	const faqs = [
		{
			question: '既存のSlackやDiscordコミュニティから移行できますか？',
			answer:
				'はい、既存のコミュニティメンバーを招待する形で移行できます。BizGuildはコミュニケーションの置き換えではなく、「ビジネス機能の追加」として併用することも可能です。'
		},
		{
			question: 'メンバーが10名未満でも始められますか？',
			answer:
				'はい、少人数からでも始められます。むしろ、小規模から始めて運用を固めてから拡大することを推奨しています。10名〜200名程度のコミュニティを想定しています。'
		},
		{
			question: '運営にどのくらいの時間がかかりますか？',
			answer:
				'初期設定後は、メンバー審査（1件あたり5分程度）と、月次のデータ確認（30分程度）が主な作業です。紹介や協業はメンバー間で自然に発生します。'
		}
	];
</script>

<section id="faq" class="py-20">
	<div class="mx-auto max-w-3xl px-4">
		<div class="text-center">
			<Badge variant="outline" class="mb-4">FAQ</Badge>
			<h2 class="text-2xl font-bold sm:text-3xl">よくある質問</h2>
		</div>

		<div class="mt-12 space-y-4">
			{#each faqs as faq, index (index)}
				<div class="rounded-lg border bg-background">
					<button
						type="button"
						class="flex w-full items-center justify-between p-4 text-left"
						onclick={() => toggle(index)}
					>
						<span class="font-medium">{faq.question}</span>
						<ChevronDown
							class="h-5 w-5 shrink-0 text-muted-foreground transition-transform {openIndex ===
							index
								? 'rotate-180'
								: ''}"
						/>
					</button>
					{#if openIndex === index}
						<div class="border-t px-4 py-3 text-sm text-muted-foreground">
							{faq.answer}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<Button variant="outline" href={resolve('/features')} class="gap-2">
				もっと詳しく見る
				<ArrowRight class="h-4 w-4" />
			</Button>
		</div>
	</div>
</section>
