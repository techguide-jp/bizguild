<script lang="ts">
	import { PUBLIC_WAITLIST_FORM_URL } from '$env/static/public';
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
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

	const formUrl = $derived.by(() => {
		if (!PUBLIC_WAITLIST_FORM_URL) return '';
		const hasReferrer = $page.url.searchParams.get('referrer') === 'true';
		if (!hasReferrer) return PUBLIC_WAITLIST_FORM_URL;
		const separator = PUBLIC_WAITLIST_FORM_URL.includes('?') ? '&' : '?';
		return `${PUBLIC_WAITLIST_FORM_URL}${separator}referrer=${encodeURIComponent('金城さやか')}`;
	});
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
				href={resolve('/community')}
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
					<h2 class="text-2xl font-bold sm:text-3xl">参加者の声</h2>
					<p class="mt-4 text-muted-foreground">
						コミュニティができたら、こんな声が届くようになります
					</p>
				</div>

				<div class="mt-12 grid gap-6 md:grid-cols-2">
					<Card.Root class="border-none bg-muted/40">
						<Card.Content class="space-y-4 p-6">
							<Quote class="h-6 w-6 text-primary" />
							<p class="text-sm leading-relaxed text-muted-foreground">
								「紹介の流れが可視化されたことで、紹介先とのやりとりがスムーズになりました。仕事の幅も広がって、売上が安定しています。」
							</p>
							<div class="text-sm font-medium text-foreground">Web制作フリーランス / 30代</div>
						</Card.Content>
					</Card.Root>

					<Card.Root class="border-none bg-muted/40">
						<Card.Content class="space-y-4 p-6">
							<Quote class="h-6 w-6 text-primary" />
							<p class="text-sm leading-relaxed text-muted-foreground">
								「チームで受けられる案件が増え、挑戦できる範囲が広がりました。紹介ポイントもモチベーションになります。」
							</p>
							<div class="text-sm font-medium text-foreground">マーケター / 40代</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</section>

		<!-- 参加条件 -->
		<section class="bg-muted/30 py-20 lg:py-24">
			<div class="mx-auto max-w-5xl px-4">
				<div class="text-center">
					<h2 class="text-2xl font-bold sm:text-3xl">参加条件</h2>
					<p class="mt-4 text-muted-foreground">安心して参加できる環境を整えています</p>
				</div>

				<div class="mt-12 grid gap-6 md:grid-cols-3">
					<Card.Root class="shadow-soft border-none bg-background">
						<Card.Header class="space-y-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
								<ShieldCheck class="h-5 w-5 text-primary" />
							</div>
							<Card.Title class="text-lg">招待制 + 審査制</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm leading-relaxed text-muted-foreground">
								信頼できる関係性を守るため、招待制でメンバーを募集しています。申し込み後に簡単な審査があります。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="shadow-soft border-none bg-background">
						<Card.Header class="space-y-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
								<Users class="h-5 w-5 text-primary" />
							</div>
							<Card.Title class="text-lg">紹介・協業ができる方</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm leading-relaxed text-muted-foreground">
								自分の専門を持ちつつ、他のメンバーと協力し合える方を歓迎しています。
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="shadow-soft border-none bg-background">
						<Card.Header class="space-y-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
								<Heart class="h-5 w-5 text-primary" />
							</div>
							<Card.Title class="text-lg">コミュニティ文化に共感できる方</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-sm leading-relaxed text-muted-foreground">
								相互紹介やチームでの挑戦など、コミュニティの文化に共感できる方と一緒に作っていきたいと考えています。
							</p>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</section>

		<!-- 参加フォーム -->
		<section class="py-20 lg:py-24">
			<div class="mx-auto max-w-4xl px-4">
				<div class="text-center">
					<h2 class="text-2xl font-bold sm:text-3xl">メンバー先行登録フォーム</h2>
					<p class="mt-4 text-muted-foreground">参加希望の方はフォームからご登録ください</p>
				</div>

				<div class="mt-10">
					{#if formUrl}
						<div class="shadow-soft overflow-hidden rounded-2xl border bg-background">
							<iframe title="BizGuild メンバー登録フォーム" src={formUrl} class="h-[900px] w-full"
							></iframe>
						</div>
					{:else}
						<Card.Root class="bg-muted/40">
							<Card.Content class="flex flex-col items-center gap-3 p-8 text-center">
								<ExternalLink class="h-6 w-6 text-primary" />
								<p class="text-sm text-muted-foreground">
									現在フォームが準備中です。公開までお待ちください。
								</p>
							</Card.Content>
						</Card.Root>
					{/if}
				</div>
			</div>
		</section>
	</main>

	<LandingFooter />
</div>
