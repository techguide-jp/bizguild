<script lang="ts">
	import { PUBLIC_WAITLIST_FORM_URL } from '$env/static/public';
	import { resolve } from '$app/paths';
	import { LandingFooter } from '$lib/components/landing';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import {
		Users,
		Megaphone,
		Gift,
		ShieldCheck,
		ArrowUpRight,
		ExternalLink,
		Heart,
		Quote,
		Monitor
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title>メンバー先行登録 - BizGuild</title>
	<meta
		name="description"
		content="BizGuildへのメンバー先行登録。サービス開始時に優先的にご案内します。"
	/>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- ヘッダー -->
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
			<a
				href={resolve('/')}
				class="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				コミュニティを立ち上げたい方はこちら
				<ArrowUpRight class="h-4 w-4" />
			</a>
		</div>
	</header>

	<main>
		<!-- ヒーロー -->
		<section class="bg-gradient-to-b from-primary/5 to-background pt-20 pb-12 lg:pt-28 lg:pb-16">
			<div class="mx-auto max-w-6xl px-4 text-center">
				<Badge variant="secondary" class="mb-8">参加希望者 先行受付中</Badge>
				<h1 class="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
					信頼できる仲間と、協業・紹介で<br />
					<span class="text-primary">ビジネスを広げませんか？</span>
				</h1>
				<p class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
					BizGuildは、起業家・事業者のための<br class="hidden sm:block" />
					協業 × 相互紹介コミュニティです
				</p>

				<!-- デモリンク -->
				<div class="mt-10 flex justify-center">
					<a
						href={resolve('/app/dashboard')}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-full border bg-background/80 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
					>
						<Monitor class="h-4 w-4 shrink-0" />
						<span>開発中のデモを見る</span>
						<span
							class="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
							>プロトタイプ</span
						>
					</a>
				</div>
			</div>
		</section>

		<!-- 私たちの想い -->
		<section class="pt-8 pb-16 lg:pt-12 lg:pb-20">
			<div class="mx-auto max-w-3xl px-4">
				<div
					class="rounded-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8 lg:p-14"
				>
					<div class="mb-8 flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
							<Heart class="h-5 w-5 text-primary" />
						</div>
						<h2 class="text-xl font-bold">私たちの想い</h2>
					</div>

					<div class="space-y-6 leading-relaxed text-muted-foreground">
						<p class="text-lg">
							フリーランスや個人事業主として働いていると、
							<span class="font-medium text-foreground">「一人でできることの限界」</span
							>を感じることがありませんか？
						</p>

						<p class="text-lg">
							専門外の相談が来たとき、断るしかない。<br />
							誰かに頼みたいけど、信頼できる人が見つからない。<br />
							紹介したいけど、その後どうなったかわからない。
						</p>

						<p class="text-lg">私たちも、同じ悩みを抱えてきました。</p>

						<p class="text-lg">
							だからこそ、<span class="font-medium text-foreground"
								>「信頼できる仲間と、お互いを高め合えるコミュニティ」</span
							>を作りたいと思いました。
						</p>

						<p class="text-lg">
							一人では難しいことも、仲間となら実現できる。<br />
							紹介し合うことで、お互いのビジネスが広がる。<br />
							そんな場所を、一緒に作っていきませんか？
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- メリット -->
		<section class="bg-muted/30 py-20 lg:py-24">
			<div class="mx-auto max-w-6xl px-4">
				<div class="text-center">
					<h2 class="text-2xl font-bold sm:text-3xl">参加するとできること</h2>
					<p class="mt-4 text-muted-foreground">仲間がいるからこそ、新しい可能性が生まれます</p>
				</div>

				<div class="mt-14 grid gap-8 md:grid-cols-2">
					<Card.Root class="shadow-soft border-none bg-background">
						<Card.Header class="pb-4">
							<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
								<Users class="h-7 w-7 text-primary" />
							</div>
							<Card.Title class="text-lg">一人では受けられない案件に挑戦できる</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="leading-relaxed text-muted-foreground">
								「これ、自分だけじゃ無理だな...」という案件も、仲間に声をかければチームで対応できます。断るのではなく、一緒に挑戦する選択肢が生まれます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="shadow-soft border-none bg-background">
						<Card.Header class="pb-4">
							<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
								<Megaphone class="h-7 w-7 text-primary" />
							</div>
							<Card.Title class="text-lg">広告費ゼロで新しい顧客と出会える</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="leading-relaxed text-muted-foreground">
								仲間から「この人いいよ」と紹介してもらえるから、信頼がある状態で商談がスタート。広告ではなく、人のつながりで仕事が生まれます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="shadow-soft border-none bg-background">
						<Card.Header class="pb-4">
							<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
								<Gift class="h-7 w-7 text-primary" />
							</div>
							<Card.Title class="text-lg">紹介するだけで報酬がもらえる</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="leading-relaxed text-muted-foreground">
								「自分にはできないけど、あの人なら...」と紹介するだけで、成約時に紹介料が還元されます。お互いに紹介し合う文化が、自然と生まれます。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="shadow-soft border-none bg-background">
						<Card.Header class="pb-4">
							<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
								<ShieldCheck class="h-7 w-7 text-primary" />
							</div>
							<Card.Title class="text-lg">安心して協業できる環境</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="leading-relaxed text-muted-foreground">
								審査を通過したメンバーだけが参加するから、「この人なら大丈夫」という安心感があります。信頼を前提にビジネスの話ができます。
							</p>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</section>

		<!-- 参加者の声（将来のイメージ） -->
		<section class="py-20 lg:py-24">
			<div class="mx-auto max-w-4xl px-4">
				<div class="text-center">
					<h2 class="text-2xl font-bold sm:text-3xl">こんな未来を一緒に作りたい</h2>
					<p class="mt-4 text-muted-foreground">BizGuildが目指すコミュニティの姿</p>
				</div>

				<div class="mt-14 space-y-8">
					<div class="rounded-xl border bg-background p-8">
						<Quote class="mb-6 h-8 w-8 text-primary/30" />
						<p class="text-lg leading-relaxed text-muted-foreground italic">
							「一人でやっていたときは、専門外の相談は断るしかなかった。でも今は、仲間に声をかけてチームで対応できる。お客様にも喜ばれるし、自分の可能性も広がった。」
						</p>
						<p class="mt-6 text-sm font-medium">— フリーランスデザイナー Aさん（イメージ）</p>
					</div>

					<div class="rounded-xl border bg-background p-8">
						<Quote class="mb-6 h-8 w-8 text-primary/30" />
						<p class="text-lg leading-relaxed text-muted-foreground italic">
							「紹介してもらった案件がきっかけで、新しい領域の仕事が増えた。自分では出会えなかったお客様と、信頼がある状態で繋がれるのが嬉しい。」
						</p>
						<p class="mt-6 text-sm font-medium">— Webエンジニア Bさん（イメージ）</p>
					</div>

					<div class="rounded-xl border bg-background p-8">
						<Quote class="mb-6 h-8 w-8 text-primary/30" />
						<p class="text-lg leading-relaxed text-muted-foreground italic">
							「仲間を紹介するだけで報酬がもらえるのも嬉しいけど、何より『紹介してよかった』と言ってもらえるのが一番の喜び。お互いを高め合える関係ができた。」
						</p>
						<p class="mt-6 text-sm font-medium">— コンサルタント Cさん（イメージ）</p>
					</div>
				</div>
			</div>
		</section>

		<!-- こんな方におすすめ -->
		<section class="bg-muted/30 py-20 lg:py-24">
			<div class="mx-auto max-w-4xl px-4">
				<h2 class="mb-10 text-center text-2xl font-bold sm:text-3xl">こんな方と一緒に作りたい</h2>
				<div class="grid gap-5 sm:grid-cols-2">
					<div class="shadow-soft flex items-center gap-4 rounded-lg bg-background p-5">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
						>
							✓
						</div>
						<span class="leading-relaxed">フリーランス・個人事業主として活動している方</span>
					</div>
					<div class="shadow-soft flex items-center gap-4 rounded-lg bg-background p-5">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
						>
							✓
						</div>
						<span class="leading-relaxed">一人で完結しない案件に困っている方</span>
					</div>
					<div class="shadow-soft flex items-center gap-4 rounded-lg bg-background p-5">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
						>
							✓
						</div>
						<span class="leading-relaxed">信頼できる協業パートナーを探している方</span>
					</div>
					<div class="shadow-soft flex items-center gap-4 rounded-lg bg-background p-5">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
						>
							✓
						</div>
						<span class="leading-relaxed">紹介や口コミでの集客を強化したい方</span>
					</div>
					<div class="shadow-soft flex items-center gap-4 rounded-lg bg-background p-5">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
						>
							✓
						</div>
						<span class="leading-relaxed">仲間と一緒に成長したいと思っている方</span>
					</div>
					<div class="shadow-soft flex items-center gap-4 rounded-lg bg-background p-5">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
						>
							✓
						</div>
						<span class="leading-relaxed">Give & Takeを大切にできる方</span>
					</div>
				</div>
			</div>
		</section>

		<!-- 先行登録フォーム -->
		<section class="py-20 lg:py-24">
			<div class="mx-auto max-w-2xl px-4">
				<div class="text-center">
					<Badge variant="secondary" class="mb-6">先行登録</Badge>
					<h2 class="text-2xl font-bold sm:text-3xl">一緒にコミュニティを作りませんか？</h2>
					<p class="mt-4 leading-relaxed text-muted-foreground">
						サービス開始時に優先的にご案内します。<br />
						まずは気軽にご登録ください。
					</p>
				</div>

				<div class="mt-10">
					{#if PUBLIC_WAITLIST_FORM_URL}
						<div class="shadow-soft overflow-hidden rounded-lg border bg-background">
							<iframe
								src={PUBLIC_WAITLIST_FORM_URL}
								title="先行登録フォーム"
								class="h-[600px] w-full border-0"
								loading="lazy"
							></iframe>
						</div>
					{:else}
						<Card.Root class="shadow-soft text-center">
							<Card.Header class="pb-4">
								<Card.Title>フォーム準備中</Card.Title>
								<Card.Description class="leading-relaxed">
									先行登録フォームは現在準備中です。<br />
									もう少々お待ちください。
								</Card.Description>
							</Card.Header>
							<Card.Footer class="justify-center pt-2">
								<a
									href={resolve('/contact')}
									class="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
								>
									お問い合わせはこちら
									<ExternalLink class="h-4 w-4" />
								</a>
							</Card.Footer>
						</Card.Root>
					{/if}
				</div>

				<p class="mt-10 text-center text-sm leading-relaxed text-muted-foreground">
					自分でコミュニティを立ち上げたい方は
					<a href={resolve('/')} class="text-primary underline-offset-4 hover:underline">
						こちら
					</a>
					をご覧ください。
				</p>
			</div>
		</section>
	</main>

	<LandingFooter />
</div>
