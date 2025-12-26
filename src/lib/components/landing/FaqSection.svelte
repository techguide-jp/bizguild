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
			question: '特定の業種向けですか？',
			answer:
				'いいえ、業種を問わず使えます。サービス提供者同士の紹介・協業・案件管理に合わせて設計しているので、どんなサービスでも対応できます。'
		},
		{
			question: '今使っているツールを置き換える必要がありますか？',
			answer:
				'いいえ、併用できます。既存のチャットや管理ツールの置き換えではなく、紹介と協業を回すための運営基盤としてお使いください。'
		},
		{
			question: 'メンバーが少人数でも始められますか？',
			answer:
				'はい。まずは少人数で紹介や案件の流れを整え、運用が見えた段階で拡大するのがおすすめです。'
		},
		{
			question: '運営にどのくらいの時間がかかりますか？',
			answer:
				'初期設定後は、承認対応と月次の状況確認が中心です。紹介や協業のやりとりはメンバー同士で進みます。'
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
