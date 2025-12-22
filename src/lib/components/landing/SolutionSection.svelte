<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Users, Share2, Shield, CheckCircle } from 'lucide-svelte';
</script>

<section id="solutions" class="py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center">
			<Badge variant="outline" class="mb-4">BizGuildなら、こう変わります</Badge>
			<h2 class="text-2xl font-bold sm:text-3xl">3つの解決策</h2>
		</div>

		<div class="mt-16 space-y-20">
			<!-- 1. スキル・サービスを一覧で把握 -->
			<div class="grid items-center gap-8 lg:grid-cols-2">
				<div class="order-2 lg:order-1">
					<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
						<Users class="h-7 w-7 text-primary" />
					</div>
					<h3 class="text-xl font-bold sm:text-2xl">全員のスキル・サービスを一覧で把握</h3>
					<p class="mt-4 text-muted-foreground">
						メンバー登録時に専門分野やサービス内容を入力。<br />
						誰が何を得意としているか、検索ですぐに見つかります。
					</p>
					<ul class="mt-6 space-y-3">
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>「この案件なら○○さんに相談しよう」が即座に判断できる</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>メンバーのプロフィール・実績が可視化される</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>必要なときに、必要な人にすぐつながれる</span>
						</li>
					</ul>
				</div>
				<div class="order-1 lg:order-2">
					<div class="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
						<div class="flex h-full items-center justify-center">
							<div class="text-center">
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-lg"
								>
									<Users class="h-8 w-8 text-primary" />
								</div>
								<p class="text-sm font-medium text-muted-foreground">誰が何を得意か、すぐわかる</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 2. 紹介の仕組みをシステム化 -->
			<div class="grid items-center gap-8 lg:grid-cols-2">
				<div class="order-2">
					<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
						<Share2 class="h-7 w-7 text-primary" />
					</div>
					<h3 class="text-xl font-bold sm:text-2xl">紹介の仕組みをシステム化</h3>
					<p class="mt-4 text-muted-foreground">
						「おすすめ」機能でメンバー同士を紹介。<br />
						紹介が成約につながれば、紹介者にも報酬が還元されます。
					</p>
					<ul class="mt-6 space-y-3">
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>紹介する側にもメリットがあるから、自然と紹介が生まれる</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>紹介の成果が見える化される</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>コミュニティ内での取引が活性化する</span>
						</li>
					</ul>
				</div>
				<div class="order-1">
					<div class="aspect-video rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 p-8">
						<div class="flex h-full items-center justify-center">
							<div class="text-center">
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-lg"
								>
									<Share2 class="h-8 w-8 text-primary" />
								</div>
								<p class="text-sm font-medium text-muted-foreground">紹介で双方にメリット</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 3. 招待制・審査制で質を担保 -->
			<div class="grid items-center gap-8 lg:grid-cols-2">
				<div class="order-2 lg:order-1">
					<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
						<Shield class="h-7 w-7 text-primary" />
					</div>
					<h3 class="text-xl font-bold sm:text-2xl">招待制・審査制で質を担保</h3>
					<p class="mt-4 text-muted-foreground">
						誰でも参加できるオープンな場ではなく、<br />
						管理者が招待・審査したメンバーだけが参加します。
					</p>
					<ul class="mt-6 space-y-3">
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>信頼できる人同士だから、安心して協業・紹介ができる</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>コミュニティの価値が継続的に高まる</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span>他のコミュニティとの差別化要素になる</span>
						</li>
					</ul>
				</div>
				<div class="order-1 lg:order-2">
					<div class="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
						<div class="flex h-full items-center justify-center">
							<div class="text-center">
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-lg"
								>
									<Shield class="h-8 w-8 text-primary" />
								</div>
								<p class="text-sm font-medium text-muted-foreground">信頼できるメンバーだけ</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
