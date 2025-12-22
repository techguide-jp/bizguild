<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Users, ClipboardCheck, BarChart3, Package, Share2, MessageSquare } from 'lucide-svelte';
</script>

<section id="features" class="bg-muted/30 py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center">
			<Badge variant="outline" class="mb-4">できること</Badge>
			<h2 class="text-2xl font-bold sm:text-3xl">充実の機能</h2>
			<p class="mt-3 text-muted-foreground">
				コミュニティ運営者とメンバー、それぞれに必要な機能を揃えています
			</p>
		</div>

		<!-- コミュニティ運営機能 -->
		<div class="mt-12">
			<h3 class="mb-6 text-center text-lg font-semibold text-primary">コミュニティ運営</h3>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<Card.Root class="shadow-soft border-none bg-background transition-shadow hover:shadow-md">
					<Card.Header>
						<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
							<Users class="h-6 w-6 text-primary" />
						</div>
						<Card.Title class="text-lg">メンバー管理</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">
							誰がどんなスキルを持っているか一覧で見える。招待・審査でメンバーの質を担保。
						</p>
					</Card.Content>
				</Card.Root>

				<Card.Root class="shadow-soft border-none bg-background transition-shadow hover:shadow-md">
					<Card.Header>
						<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
							<ClipboardCheck class="h-6 w-6 text-primary" />
						</div>
						<Card.Title class="text-lg">審査機能</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">
							信頼できる人だけを招待・審査で選べる。コミュニティの質を維持できます。
						</p>
					</Card.Content>
				</Card.Root>

				<Card.Root class="shadow-soft border-none bg-background transition-shadow hover:shadow-md">
					<Card.Header>
						<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
							<BarChart3 class="h-6 w-6 text-primary" />
						</div>
						<Card.Title class="text-lg">成果ダッシュボード</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">
							紹介や成約がどれだけ生まれたかを把握。コミュニティの活性度が見える化されます。
						</p>
					</Card.Content>
				</Card.Root>
			</div>
		</div>

		<!-- メンバー向け機能 -->
		<div class="mt-12">
			<h3 class="mb-6 text-center text-lg font-semibold text-primary">メンバーができること</h3>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<Card.Root class="shadow-soft border-none bg-background transition-shadow hover:shadow-md">
					<Card.Header>
						<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
							<Package class="h-6 w-6 text-primary" />
						</div>
						<Card.Title class="text-lg">サービス登録</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">
							自分のサービスを登録して、他のメンバーに見つけてもらえる。専門分野や強みをアピール。
						</p>
					</Card.Content>
				</Card.Root>

				<Card.Root class="shadow-soft border-none bg-background transition-shadow hover:shadow-md">
					<Card.Header>
						<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
							<Share2 class="h-6 w-6 text-primary" />
						</div>
						<Card.Title class="text-lg">おすすめ機能</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">
							他のメンバーを「おすすめ」して、紹介料を得られる。紹介するだけで収入になります。
						</p>
					</Card.Content>
				</Card.Root>

				<Card.Root class="shadow-soft border-none bg-background transition-shadow hover:shadow-md">
					<Card.Header>
						<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
							<MessageSquare class="h-6 w-6 text-primary" />
						</div>
						<Card.Title class="text-lg">協業・相談</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">
							専門外の案件は仲間に相談して、一緒に解決できる。一人では受けられない案件も対応可能に。
						</p>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</section>
