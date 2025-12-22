<script lang="ts">
	import {
		LandingHeader,
		HeroSection,
		ProblemSection,
		SolutionSection,
		UseCaseSection,
		FeatureSection,
		ComparisonSection,
		PricingSection,
		StepsSection,
		FaqSection,
		CtaSection,
		LandingFooter
	} from '$lib/components/landing';
</script>

<svelte:head>
	<title>BizGuild - あなたのネットワークを、ビジネスが生まれる場所に</title>
	<meta
		name="description"
		content="BizGuildは、コミュニティ運営者のためのプラットフォームです。あなたのネットワークを「協業・紹介が自然に生まれるコミュニティ」に変えます。"
	/>
</svelte:head>

<div class="min-h-screen bg-background">
	<LandingHeader />
	<main>
		<HeroSection />
		<ProblemSection />
		<SolutionSection />
		<UseCaseSection />
		<FeatureSection />
		<ComparisonSection />
		<PricingSection />
		<StepsSection />
		<FaqSection />
		<CtaSection />
	</main>
	<LandingFooter />
</div>
