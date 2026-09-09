<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import type { Snippet } from 'svelte';

	interface Props {
		triggerText: string | Snippet;
		children: any;
		triggerTextLink?: string;
		triggerTextTarget?: string;
		triggerTextRel?: string;
		triggerTextStyle?: string;
	}

	const {
		triggerText,
		children,
		triggerTextLink,
		triggerTextTarget,
		triggerTextRel,
		triggerTextStyle
	}: Props = $props();
</script>

<HoverCard.Root>
	<HoverCard.Trigger
		href={triggerTextLink}
		target={triggerTextTarget}
		rel={triggerTextRel}
		class={`rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black ${triggerTextStyle}`}
	>
		{#if typeof triggerText === 'function'}
			{@render triggerText()}
		{:else if triggerText}
			{triggerText}
		{:else}
			Hover
		{/if}
	</HoverCard.Trigger>
	<HoverCard.Content>
		{@render children()}
	</HoverCard.Content>
</HoverCard.Root>
