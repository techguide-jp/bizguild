<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Calendar, Briefcase, Network } from 'lucide-svelte';
</script>

<section class="py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center">
			<Badge variant="outline" class="mb-4">活用イメージ</Badge>
			<h2 class="text-2xl font-bold sm:text-3xl">こんな使い方ができます</h2>
			<p class="mt-3 text-muted-foreground">さまざまなネットワークをビジネスコミュニティに</p>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			<!-- イベント参加者のコミュニティ化 -->
			<div
				class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 transition-all hover:shadow-lg"
			>
				<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
					<Calendar class="h-7 w-7 text-primary" />
				</div>
				<h3 class="text-lg font-bold">イベント参加者のコミュニティ化</h3>
				<p class="mt-3 text-sm text-muted-foreground">
					起業家イベントや交流会の参加者を、継続的なビジネスネットワークに。イベント後も関係が続く仕組みを提供します。
				</p>
				<div class="mt-4 rounded-lg bg-background/80 p-3 text-xs text-muted-foreground">
					<span class="font-medium text-foreground">想定シーン:</span><br />
					セミナー主催者、イベンター、勉強会オーガナイザー
				</div>
			</div>

			<!-- 専門家ネットワークの運営 -->
			<div
				class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 p-6 transition-all hover:shadow-lg"
			>
				<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
					<Briefcase class="h-7 w-7 text-accent-foreground" />
				</div>
				<h3 class="text-lg font-bold">専門家ネットワークの運営</h3>
				<p class="mt-3 text-sm text-muted-foreground">
					士業や専門家のネットワークを構築。それぞれの専門分野を活かした協業・紹介が自然に生まれます。
				</p>
				<div class="mt-4 rounded-lg bg-background/80 p-3 text-xs text-muted-foreground">
					<span class="font-medium text-foreground">想定シーン:</span><br />
					協会運営者、コンサルタント集団、専門家コミュニティ
				</div>
			</div>

			<!-- ビジネス紹介の仕組み化 -->
			<div
				class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 p-6 transition-all hover:shadow-lg"
			>
				<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
					<Network class="h-7 w-7 text-primary" />
				</div>
				<h3 class="text-lg font-bold">ビジネス紹介の仕組み化</h3>
				<p class="mt-3 text-sm text-muted-foreground">
					紹介営業を仕組み化。誰が誰を紹介したか、成果はどうだったかを追跡でき、紹介者にも報酬が還元されます。
				</p>
				<div class="mt-4 rounded-lg bg-background/80 p-3 text-xs text-muted-foreground">
					<span class="font-medium text-foreground">想定シーン:</span><br />
					営業・紹介業、ビジネスマッチング事業者
				</div>
			</div>
		</div>
	</div>
</section>
