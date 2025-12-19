<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Users,
		Handshake,
		Coins,
		ArrowRight,
		CheckCircle,
		MessageSquare,
		Briefcase
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title>BizGuild - 起業家・事業者ネットワーク</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-background to-muted/30">
	<!-- Header -->
	<header class="border-b">
		<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
					<span class="text-sm font-bold">B</span>
				</div>
				<span class="text-lg font-semibold">BizGuild</span>
			</div>
			<div class="flex items-center gap-4">
				<Button variant="ghost" href="/login">ログイン</Button>
				<Button href="/register">無料で始める</Button>
			</div>
		</div>
	</header>

	<!-- Hero -->
	<section class="mx-auto max-w-6xl px-4 py-20 text-center">
		<Badge class="mb-4" variant="secondary">招待制ネットワーク</Badge>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
			起業家・事業者の<br />
			<span class="text-primary">協業ネットワーク</span>
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
			顧客の相談を「窓口一本化」しつつ、裏側で協業して解決まで進める。<br />
			おすすめと紹介ポイントで、クロスセルを促進します。
		</p>
		<div class="mt-10 flex justify-center gap-4">
			<Button size="lg" href="/register">
				無料で始める
				<ArrowRight class="ml-2 h-5 w-5" />
			</Button>
			<Button size="lg" variant="outline" href="/login">
				ログイン
			</Button>
		</div>
	</section>

	<!-- Features -->
	<section class="mx-auto max-w-6xl px-4 py-20">
		<h2 class="mb-12 text-center text-3xl font-bold">主な機能</h2>
		<div class="grid gap-8 md:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<MessageSquare class="h-6 w-6" />
					</div>
					<Card.Title>窓口一本化</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-muted-foreground">
						顧客からの相談は、フロント担当が窓口として一元管理。裏側で適切なパートナーと協業して解決します。
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Handshake class="h-6 w-6" />
					</div>
					<Card.Title>おすすめボード</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-muted-foreground">
						信頼できるパートナーの商品を「おすすめ」として公開。楽天ROOM的な紹介で、クロスセルを促進します。
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Coins class="h-6 w-6" />
					</div>
					<Card.Title>紹介ポイント</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-muted-foreground">
						紹介からの成約でポイントを獲得。獲得したポイントは、ネットワーク内の商品購入に利用できます。
					</p>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- How it works -->
	<section class="bg-muted/50 py-20">
		<div class="mx-auto max-w-6xl px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">使い方</h2>
			<div class="grid gap-8 md:grid-cols-4">
				{#each [
					{ step: '1', title: '招待で参加', desc: '招待コードを使って登録し、審査を通過' },
					{ step: '2', title: '商品を出品', desc: 'あなたのサービスを商品として登録' },
					{ step: '3', title: 'おすすめを作成', desc: '信頼できるパートナーの商品を紹介' },
					{ step: '4', title: '協業で解決', desc: '顧客の課題をチームで解決' }
				] as item}
					<div class="text-center">
						<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
							{item.step}
						</div>
						<h3 class="mb-2 font-semibold">{item.title}</h3>
						<p class="text-sm text-muted-foreground">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="mx-auto max-w-6xl px-4 py-20 text-center">
		<h2 class="text-3xl font-bold">今すぐ始めましょう</h2>
		<p class="mx-auto mt-4 max-w-xl text-muted-foreground">
			招待制のネットワークで、信頼できるパートナーと協業しませんか？
		</p>
		<div class="mt-8">
			<Button size="lg" href="/register">
				無料で登録
				<ArrowRight class="ml-2 h-5 w-5" />
			</Button>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t py-8">
		<div class="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
			<p>&copy; 2024 BizGuild. All rights reserved.</p>
		</div>
	</footer>
</div>
