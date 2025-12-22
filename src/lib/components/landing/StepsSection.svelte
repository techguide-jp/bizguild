<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { MessageSquare, Users, FileCheck, Code, Rocket, ArrowRight } from 'lucide-svelte';
</script>

<section id="how-it-works" class="py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center">
			<Badge variant="outline" class="mb-4">開発パートナーの流れ</Badge>
			<h2 class="text-2xl font-bold sm:text-3xl">5ステップで導入</h2>
			<p class="mt-3 text-muted-foreground">一緒にサービスを作り上げていきます</p>
		</div>

		<div class="mt-12">
			<div class="grid gap-6 md:grid-cols-5">
				<!-- Step 1 -->
				<div class="relative text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
					>
						<MessageSquare class="h-8 w-8 text-primary" />
					</div>
					<div
						class="absolute top-8 left-[calc(50%+40px)] hidden md:block lg:left-[calc(50%+50px)]"
					>
						<ArrowRight class="h-6 w-6 text-muted-foreground/30" />
					</div>
					<div
						class="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
					>
						1
					</div>
					<h3 class="mb-2 text-sm font-semibold">お問い合わせ</h3>
					<p class="text-xs text-muted-foreground">まずはお話を聞かせてください</p>
				</div>

				<!-- Step 2 -->
				<div class="relative text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
					>
						<Users class="h-8 w-8 text-primary" />
					</div>
					<div
						class="absolute top-8 left-[calc(50%+40px)] hidden md:block lg:left-[calc(50%+50px)]"
					>
						<ArrowRight class="h-6 w-6 text-muted-foreground/30" />
					</div>
					<div
						class="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
					>
						2
					</div>
					<h3 class="mb-2 text-sm font-semibold">ヒアリング</h3>
					<p class="text-xs text-muted-foreground">あなたのコミュニティについて伺います</p>
				</div>

				<!-- Step 3 -->
				<div class="relative text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
					>
						<FileCheck class="h-8 w-8 text-primary" />
					</div>
					<div
						class="absolute top-8 left-[calc(50%+40px)] hidden md:block lg:left-[calc(50%+50px)]"
					>
						<ArrowRight class="h-6 w-6 text-muted-foreground/30" />
					</div>
					<div
						class="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
					>
						3
					</div>
					<h3 class="mb-2 text-sm font-semibold">ご契約</h3>
					<p class="text-xs text-muted-foreground">開発パートナー契約を締結</p>
				</div>

				<!-- Step 4 -->
				<div class="relative text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
					>
						<Code class="h-8 w-8 text-primary" />
					</div>
					<div
						class="absolute top-8 left-[calc(50%+40px)] hidden md:block lg:left-[calc(50%+50px)]"
					>
						<ArrowRight class="h-6 w-6 text-muted-foreground/30" />
					</div>
					<div
						class="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
					>
						4
					</div>
					<h3 class="mb-2 text-sm font-semibold">開発・テスト運用</h3>
					<p class="text-xs text-muted-foreground">一緒にサービスを作り上げます</p>
				</div>

				<!-- Step 5 -->
				<div class="relative text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
					>
						<Rocket class="h-8 w-8 text-primary" />
					</div>
					<div
						class="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
					>
						5
					</div>
					<h3 class="mb-2 text-sm font-semibold">正式リリース</h3>
					<p class="text-xs text-muted-foreground">特別条件で継続利用</p>
				</div>
			</div>
		</div>
	</div>
</section>
