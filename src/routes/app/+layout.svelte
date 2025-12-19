<script lang="ts">
	import { AppShell } from '$lib/components/layout';

	let { children } = $props();
</script>

<AppShell>
	{@render children()}
</AppShell>
