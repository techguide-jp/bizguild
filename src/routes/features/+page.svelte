<script lang="ts">
	import { resolve } from '$app/paths';
	import { LandingHeader, LandingFooter } from '$lib/components/landing';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import {
		Users,
		ClipboardCheck,
		BarChart3,
		Package,
		Share2,
		MessageSquare,
		Settings,
		Bell,
		ArrowRight,
		ChevronDown
	} from 'lucide-svelte';

	let openFaqIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}

	const ownerFaqs = [
		{
			question: '今使っているツールと併用できますか？',
			answer:
				'はい、既存のツールと併用できます。BizGuildはコミュニケーションの置き換えではなく、紹介と協業を回すための運営基盤として使えます。'
		},
		{
			question: 'メンバーが10名未満でも始められますか？',
			answer:
				'はい、少人数からでも始められます。むしろ、小規模から始めて運用を固めてから拡大することを推奨しています。'
		},
		{
			question: 'どのくらいの規模のコミュニティに向いていますか？',
			answer:
				'10名〜200名程度のコミュニティを想定しています。メンバー同士が「顔と名前が一致する」規模感が、紹介や協業が生まれやすい環境です。'
		},
		{
			question: '運営にどのくらいの時間がかかりますか？',
			answer:
				'初期設定後は、メンバー審査（1件あたり5分程度）と、月次のデータ確認（30分程度）が主な作業です。紹介や協業はメンバー間で自然に発生します。'
		},
		{
			question: 'メンバーからの会費は取れますか？',
			answer:
				'はい、月額課金として設定可能です。コミュニティ参加費として徴収し、運営者60%・BizGuild40%で分配されます。'
		},
		{
			question: '紹介手数料の割合は変更できますか？',
			answer: 'はい、コミュニティの性質に合わせて設定可能です。'
		},
		{
			question: '料金プランは選べますか？',
			answer:
				'はい、初期費用・月額費用・成約手数料のバランスが異なる3つのプランから選べます。詳しくは料金ページをご確認ください。'
		},
		{
			question: '途中で解約できますか？',
			answer: '最低契約期間は12ヶ月です。契約期間終了後は、1ヶ月前の通知で解約可能です。'
		}
	];

	const memberFaqs = [
		{
			question: '誰でも参加できますか？',
			answer:
				'いいえ、各コミュニティのオーナーによる審査があります。これにより、信頼できるメンバーだけで構成されたネットワークが維持されます。'
		},
		{
			question: '参加費用はかかりますか？',
			answer:
				'コミュニティによって異なります。多くのコミュニティは参加無料で運営されており、紹介が成約した場合のみ手数料が発生する成果報酬型です。'
		},
		{
			question: '複数のコミュニティに参加できますか？',
			answer:
				'はい、複数のコミュニティに同時に参加できます。それぞれのコミュニティで異なるビジネス機会が生まれます。'
		},
		{
			question: '自分のサービスを宣伝してもいいですか？',
			answer:
				'はい、プロフィールにサービス内容を登録できます。ただし、過度な営業活動はコミュニティのルールで制限される場合があります。'
		},
		{
			question: '紹介料はどうやって受け取れますか？',
			answer:
				'紹介が成約し、報酬が確定した後、登録した銀行口座に振り込まれます（月末締め翌月払い）。'
		},
		{
			question: '紹介した案件がうまくいかなかった場合は？',
			answer: '紹介料は成約時にのみ発生します。紹介後に成約しなかった場合、費用は一切発生しません。'
		},
		{
			question: '個人情報は安全ですか？',
			answer:
				'はい、プロフィール情報は同じコミュニティのメンバーのみに公開されます。外部には公開されません。'
		},
		{
			question: 'トラブルが起きた場合はどうすればいいですか？',
			answer:
				'まずはコミュニティのオーナーにご相談ください。BizGuildとしてもサポート体制を整えています。'
		}
	];
</script>

<svelte:head>
	<title>機能紹介 - BizGuild</title>
	<meta
		name="description"
		content="BizGuildの機能紹介。コミュニティ運営機能・メンバー向け機能の詳細をご覧ください。"
	/>
</svelte:head>

<div class="min-h-screen bg-background">
	<LandingHeader />

	<main>
		<!-- ヒーロー -->
		<section class="bg-gradient-to-b from-primary/5 to-background py-16">
			<div class="mx-auto max-w-6xl px-4 text-center">
				<Badge variant="outline" class="mb-4">機能紹介</Badge>
				<h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">BizGuildでできること</h1>
				<p class="mx-auto mt-4 max-w-2xl text-muted-foreground">
					コミュニティ運営者とメンバー、それぞれに必要な機能を揃えています
				</p>
			</div>
		</section>

		<!-- コミュニティ運営機能 -->
		<section class="py-16">
			<div class="mx-auto max-w-6xl px-4">
				<div class="text-center">
					<Badge variant="secondary" class="mb-4">コミュニティ運営</Badge>
					<h2 class="text-2xl font-bold sm:text-3xl">運営者向け機能</h2>
					<p class="mt-3 text-muted-foreground">コミュニティの価値を高め、収益化を支援する機能</p>
				</div>

				<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card.Root>
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<Users class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>メンバー管理</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								メンバーのプロフィール、スキル、サービス内容を一覧で確認。誰が何を得意としているか一目でわかります。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<ClipboardCheck class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>審査機能</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								招待制・審査制でメンバーの質を担保。申請内容を確認し、承認・却下を管理できます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<BarChart3 class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>成果ダッシュボード</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								紹介数、成約数、取引金額などを可視化。コミュニティの活性度を把握できます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<Settings class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>コミュニティ設定</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								ロゴ、カラー、紹介手数料率などをカスタマイズ。コミュニティのブランドを表現できます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<Bell class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>通知・お知らせ</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								メンバー全員へのお知らせ配信、新規紹介や成約時の通知設定ができます。
							</p>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</section>

		<!-- メンバー向け機能 -->
		<section class="bg-muted/30 py-16">
			<div class="mx-auto max-w-6xl px-4">
				<div class="text-center">
					<Badge variant="secondary" class="mb-4">メンバー機能</Badge>
					<h2 class="text-2xl font-bold sm:text-3xl">メンバー向け機能</h2>
					<p class="mt-3 text-muted-foreground">協業・紹介でビジネスを広げるための機能</p>
				</div>

				<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card.Root class="bg-background">
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<Package class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>サービス登録</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								自分のサービスを登録して、他のメンバーに見つけてもらえます。専門分野や強みをアピール。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="bg-background">
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<Share2 class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>おすすめ機能</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								他のメンバーを「おすすめ」として紹介。成約時に紹介料が還元されます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="bg-background">
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<MessageSquare class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>協業・相談</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								専門外の案件は仲間に相談して、一緒に解決。一人では受けられない案件も対応可能に。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="bg-background">
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<Users class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>メンバー検索</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								専門分野やスキルでメンバーを検索。必要なときに必要な人にすぐつながれます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="bg-background">
						<Card.Header>
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
								<BarChart3 class="h-6 w-6 text-primary" />
							</div>
							<Card.Title>成果レポート</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm text-muted-foreground">
								自分の紹介実績、獲得した紹介料、閲覧数などを確認できます。
							</p>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</section>

		<!-- FAQ -->
		<section class="py-16">
			<div class="mx-auto max-w-4xl px-4">
				<div class="text-center">
					<Badge variant="outline" class="mb-4">FAQ</Badge>
					<h2 class="text-2xl font-bold sm:text-3xl">よくある質問</h2>
				</div>

				<!-- コミュニティオーナー向け -->
				<div class="mt-12">
					<h3 class="mb-6 text-lg font-semibold text-primary">コミュニティオーナー向け</h3>
					<div class="space-y-3">
						{#each ownerFaqs as faq, index (index)}
							<div class="rounded-lg border bg-background">
								<button
									type="button"
									class="flex w-full items-center justify-between p-4 text-left"
									onclick={() => toggleFaq(index)}
								>
									<span class="font-medium">{faq.question}</span>
									<ChevronDown
										class="h-5 w-5 shrink-0 text-muted-foreground transition-transform {openFaqIndex ===
										index
											? 'rotate-180'
											: ''}"
									/>
								</button>
								{#if openFaqIndex === index}
									<div class="border-t px-4 py-3 text-sm text-muted-foreground">
										{faq.answer}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- メンバー向け -->
				<div class="mt-12">
					<h3 class="mb-6 text-lg font-semibold text-primary">メンバー向け</h3>
					<div class="space-y-3">
						{#each memberFaqs as faq, index (index)}
							<div class="rounded-lg border bg-background">
								<button
									type="button"
									class="flex w-full items-center justify-between p-4 text-left"
									onclick={() => toggleFaq(index + ownerFaqs.length)}
								>
									<span class="font-medium">{faq.question}</span>
									<ChevronDown
										class="h-5 w-5 shrink-0 text-muted-foreground transition-transform {openFaqIndex ===
										index + ownerFaqs.length
											? 'rotate-180'
											: ''}"
									/>
								</button>
								{#if openFaqIndex === index + ownerFaqs.length}
									<div class="border-t px-4 py-3 text-sm text-muted-foreground">
										{faq.answer}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="bg-primary py-16">
			<div class="mx-auto max-w-4xl px-4 text-center">
				<h2 class="text-2xl font-bold text-primary-foreground sm:text-3xl">開発パートナー募集中</h2>
				<p class="mx-auto mt-4 max-w-xl text-primary-foreground/80">
					あなたのネットワークで、何が実現できるか。<br />
					一緒に考えてみませんか？
				</p>
				<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button size="lg" variant="secondary" href={resolve('/contact')} class="gap-2 px-8">
						話を聞いてみる
						<ArrowRight class="h-5 w-5" />
					</Button>
					<Button
						size="lg"
						variant="ghost"
						href={resolve('/app/dashboard')}
						target="_blank"
						rel="noopener noreferrer"
						class="gap-2 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
					>
						<span>デモを見る</span>
						<span
							class="rounded-full border border-primary-foreground/30 px-1.5 py-0.5 text-[10px] font-medium"
							>開発中</span
						>
					</Button>
				</div>
			</div>
		</section>
	</main>

	<LandingFooter />
</div>
