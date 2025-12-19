<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>BizGuild - 起業家・事業者ネットワーク</title>
</svelte:head>

{@render children()}
<Toaster richColors position="top-right" />
