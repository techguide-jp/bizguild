<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { toast } from 'svelte-sonner';
	import { Clock } from 'lucide-svelte';

	let businessDescription = $state('');
	let experience = $state('');
	let specialties = $state<string[]>([]);
	let portfolioUrl = $state('');
	let isLoading = $state(false);
	let isSubmitted = $state(false);

	const specialtyOptions = [
		'Webマーケティング',
		'SNS運用',
		'SEO',
		'Web制作',
		'システム開発',
		'デザイン',
		'動画制作',
		'コンサルティング',
		'人材紹介',
		'その他'
	];

	function toggleSpecialty(specialty: string) {
		if (specialties.includes(specialty)) {
			specialties = specialties.filter((s) => s !== specialty);
		} else {
			specialties = [...specialties, specialty];
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (specialties.length === 0) {
			toast.error('得意領域を1つ以上選択してください');
			return;
		}

		isLoading = true;

		// モック: 審査申請をシミュレート
		await new Promise((resolve) => setTimeout(resolve, 1000));

		isSubmitted = true;
		toast.success('審査を申請しました');
	}
</script>

<svelte:head>
	<title>審査フォーム - BizGuild</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-8">
	{#if isSubmitted}
		<Card.Root class="w-full max-w-md">
			<Card.Header class="space-y-1 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
					<Clock class="h-8 w-8 text-amber-600" />
				</div>
				<Card.Title class="text-2xl">審査中です</Card.Title>
				<Card.Description>
					審査には通常1〜3営業日かかります。結果はメールでお知らせします。
				</Card.Description>
			</Card.Header>
			<Card.Content class="text-center">
				<p class="text-sm text-muted-foreground">
					審査が完了するまでしばらくお待ちください。<br />
					ご不明点がある場合は、お問い合わせください。
				</p>
			</Card.Content>
			<Card.Footer class="justify-center">
				<a href="/" class="text-sm text-primary hover:underline">
					トップページに戻る
				</a>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Card.Root class="w-full max-w-lg">
			<Card.Header class="space-y-1 text-center">
				<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
					<span class="text-xl font-bold">B</span>
				</div>
				<Card.Title class="text-2xl">審査フォーム</Card.Title>
				<Card.Description>
					あなたの事業について教えてください
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form onsubmit={handleSubmit} class="space-y-6">
					<div class="space-y-2">
						<Label for="businessDescription">事業内容 *</Label>
						<Textarea
							id="businessDescription"
							placeholder="現在行っている事業の内容を教えてください"
							bind:value={businessDescription}
							rows={4}
							required
						/>
					</div>

					<div class="space-y-2">
						<Label for="experience">実績・経験</Label>
						<Textarea
							id="experience"
							placeholder="これまでの実績や経験を教えてください"
							bind:value={experience}
							rows={4}
						/>
					</div>

					<div class="space-y-3">
						<Label>得意領域 *</Label>
						<div class="grid grid-cols-2 gap-2">
							{#each specialtyOptions as specialty}
								<label
									class="flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-accent"
								>
									<Checkbox
										checked={specialties.includes(specialty)}
										onCheckedChange={() => toggleSpecialty(specialty)}
									/>
									<span class="text-sm">{specialty}</span>
								</label>
							{/each}
						</div>
					</div>

					<div class="space-y-2">
						<Label for="portfolioUrl">ポートフォリオURL（任意）</Label>
						<Input
							id="portfolioUrl"
							type="url"
							placeholder="https://..."
							bind:value={portfolioUrl}
						/>
					</div>

					<Button type="submit" class="w-full" disabled={isLoading}>
						{#if isLoading}
							送信中...
						{:else}
							審査を申請する
						{/if}
					</Button>
				</form>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
