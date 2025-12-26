<script lang="ts">
	import { PUBLIC_FEEDBACK_URL } from '$env/static/public';
	import { ExternalLink } from '$lib/components/ui/external-link';
	import { resolve } from '$app/paths';
	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t bg-muted/30">
	<div class="mx-auto max-w-6xl px-4 py-12">
		<div class="grid gap-8 md:grid-cols-4">
			<!-- ブランド -->
			<div class="md:col-span-2">
				<a href={resolve('/')} class="flex items-center gap-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
					>
						<span class="text-sm font-bold">B</span>
					</div>
					<span class="text-lg font-semibold">BizGuild</span>
				</a>
				<p class="mt-4 text-sm text-muted-foreground">
					あなたのネットワークを、ビジネスが生まれる場所に。<br />
					コミュニティ運営者のためのプラットフォーム。
				</p>
			</div>

			<!-- サービス -->
			<div>
				<h4 class="mb-4 font-semibold">サービス</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>
						<a href={resolve('/features')} class="transition-colors hover:text-foreground">機能</a>
					</li>
					<li>
						<ExternalLink
							href={PUBLIC_FEEDBACK_URL}
							class="transition-colors hover:text-foreground"
						>
							お問い合わせ
						</ExternalLink>
					</li>
					<li>
						<a href={resolve('/')} class="transition-colors hover:text-foreground"
							>メンバーとして参加したい人</a
						>
					</li>
					<li>
						<a href={resolve('/community')} class="transition-colors hover:text-foreground"
							>コミュニティ運営者向け</a
						>
					</li>
				</ul>
			</div>

			<!-- 法的リンク -->
			<div>
				<h4 class="mb-4 font-semibold">法的情報</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>
						<a href={resolve('/terms')} class="transition-colors hover:text-foreground">利用規約</a>
					</li>
					<li>
						<a href={resolve('/privacy')} class="transition-colors hover:text-foreground"
							>プライバシーポリシー</a
						>
					</li>
					<li>
						<a href={resolve('/legal')} class="transition-colors hover:text-foreground"
							>特定商取引法</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
			<p>&copy; {currentYear} BizGuild. All rights reserved.</p>
		</div>
	</div>
</footer>
