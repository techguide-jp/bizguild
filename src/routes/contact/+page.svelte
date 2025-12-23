<script lang="ts">
	import { resolve } from '$app/paths';
	import { LandingHeader, LandingFooter } from '$lib/components/landing';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import * as Card from '$lib/components/ui/card';
	import { MessageSquare, Mail, Building, ArrowRight } from 'lucide-svelte';

	let formData = $state({
		companyName: '',
		name: '',
		email: '',
		communitySize: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let isSubmitted = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		// TODO: 実際のフォーム送信処理を実装
		await new Promise((r) => setTimeout(r, 1000));

		isSubmitting = false;
		isSubmitted = true;
	}

	const communitySizes = [
		{ value: 'under10', label: '10名未満' },
		{ value: '10-30', label: '10〜30名' },
		{ value: '30-50', label: '30〜50名' },
		{ value: '50-100', label: '50〜100名' },
		{ value: '100-200', label: '100〜200名' },
		{ value: 'over200', label: '200名以上' },
		{ value: 'planning', label: 'これから立ち上げ予定' }
	];
</script>

<svelte:head>
	<title>お問い合わせ - BizGuild</title>
	<meta
		name="description"
		content="BizGuildへのお問い合わせ。開発パートナーとしてのご参加、サービスに関するご質問など、お気軽にお問い合わせください。"
	/>
</svelte:head>

<div class="min-h-screen bg-background">
	<LandingHeader />

	<main>
		<!-- ヒーロー -->
		<section class="bg-gradient-to-b from-primary/5 to-background py-16">
			<div class="mx-auto max-w-6xl px-4 text-center">
				<Badge variant="outline" class="mb-4">お問い合わせ</Badge>
				<h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">まずはお話を聞かせてください</h1>
				<p class="mx-auto mt-4 max-w-2xl text-muted-foreground">
					あなたのネットワークで、何が実現できるか。一緒に考えてみませんか？
				</p>
			</div>
		</section>

		<!-- フォームセクション -->
		<section class="py-16">
			<div class="mx-auto max-w-2xl px-4">
				{#if isSubmitted}
					<Card.Root class="text-center">
						<Card.Header>
							<div
								class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
							>
								<Mail class="h-8 w-8 text-primary" />
							</div>
							<Card.Title class="text-2xl">お問い合わせを受け付けました</Card.Title>
							<Card.Description>
								ありがとうございます。担当者より2営業日以内にご連絡いたします。
							</Card.Description>
						</Card.Header>
						<Card.Footer class="justify-center">
							<Button href={resolve('/')} variant="outline">トップページに戻る</Button>
						</Card.Footer>
					</Card.Root>
				{:else}
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<MessageSquare class="h-5 w-5 text-primary" />
								お問い合わせフォーム
							</Card.Title>
							<Card.Description>
								以下のフォームにご記入ください。担当者より2営業日以内にご連絡いたします。
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<form onsubmit={handleSubmit} class="space-y-6">
								<div class="space-y-2">
									<Label for="companyName">会社名・団体名</Label>
									<div class="relative">
										<Building
											class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
										/>
										<Input
											id="companyName"
											bind:value={formData.companyName}
											placeholder="株式会社○○ / 個人"
											class="pl-10"
										/>
									</div>
								</div>

								<div class="space-y-2">
									<Label for="name">お名前 <span class="text-destructive">*</span></Label>
									<Input id="name" bind:value={formData.name} placeholder="山田 太郎" required />
								</div>

								<div class="space-y-2">
									<Label for="email">メールアドレス <span class="text-destructive">*</span></Label>
									<div class="relative">
										<Mail
											class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
										/>
										<Input
											id="email"
											type="email"
											bind:value={formData.email}
											placeholder="example@email.com"
											class="pl-10"
											required
										/>
									</div>
								</div>

								<div class="space-y-2">
									<Label for="communitySize">コミュニティの規模</Label>
									<Select.Root type="single" name="communitySize">
										<Select.Trigger class="w-full">
											{#if formData.communitySize}
												{communitySizes.find((s) => s.value === formData.communitySize)?.label}
											{:else}
												<span class="text-muted-foreground">選択してください</span>
											{/if}
										</Select.Trigger>
										<Select.Content>
											{#each communitySizes as size (size.value)}
												<Select.Item
													value={size.value}
													label={size.label}
													onclick={() => (formData.communitySize = size.value)}
												/>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								<div class="space-y-2">
									<Label for="message"
										>お問い合わせ内容 <span class="text-destructive">*</span></Label
									>
									<Textarea
										id="message"
										bind:value={formData.message}
										placeholder="現在運営しているコミュニティについて、実現したいこと、ご質問など、自由にご記入ください。"
										rows={5}
										required
									/>
								</div>

								<Button type="submit" class="w-full gap-2" disabled={isSubmitting}>
									{#if isSubmitting}
										送信中...
									{:else}
										送信する
										<ArrowRight class="h-4 w-4" />
									{/if}
								</Button>
							</form>
						</Card.Content>
					</Card.Root>

					<p class="mt-6 text-center text-sm text-muted-foreground">
						メンバーとして参加したい方は
						<a href={resolve('/')} class="text-primary underline-offset-4 hover:underline">
							こちら
						</a>
						からご登録ください。
					</p>
				{/if}
			</div>
		</section>
	</main>

	<LandingFooter />
</div>
