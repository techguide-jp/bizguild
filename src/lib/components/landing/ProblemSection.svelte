<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { UserX, Search, Eye } from 'lucide-svelte';
</script>

<section class="bg-muted/30 py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center">
			<h2 class="text-2xl font-bold sm:text-3xl">こんな経験、ありませんか？</h2>
			<p class="mt-3 text-muted-foreground">ネットワークを持っているのに、活かしきれていない</p>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-3">
			<Card.Root class="shadow-soft border-none bg-background">
				<Card.Header>
					<div
						class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
					>
						<UserX class="h-6 w-6" />
					</div>
					<Card.Title class="text-lg">せっかくのつながりが活かせていない</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-muted-foreground">
						名刺は増えるのに、ビジネスにはつながらない。イベントや交流会で知り合っても、その後のフォローが難しく、関係が途切れてしまう。
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="shadow-soft border-none bg-background">
				<Card.Header>
					<div
						class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
					>
						<Search class="h-6 w-6" />
					</div>
					<Card.Title class="text-lg">「誰かいい人いない？」に応えきれない</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-muted-foreground">
						紹介したいのに、誰を紹介すればいいかわからない。知り合いは多いのに、それぞれの専門や強みを把握しきれていない。
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="shadow-soft border-none bg-background">
				<Card.Header>
					<div
						class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
					>
						<Eye class="h-6 w-6" />
					</div>
					<Card.Title class="text-lg">紹介しても、その後が見えない</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-muted-foreground">
						紹介して終わり、で本当によかったのか。紹介した相手がどうなったか追えず、次の紹介に活かせない。
					</p>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</section>
