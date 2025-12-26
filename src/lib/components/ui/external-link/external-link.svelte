<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		children: Snippet;
	}

	let { children, href, class: className, ...restProps }: Props = $props();
</script>

<a {href} class={className} target="_blank" rel="noopener noreferrer" {...restProps}>
	{@render children()}
</a>
