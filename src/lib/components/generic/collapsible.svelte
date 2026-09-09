<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import type { Snippet } from 'svelte';

	type Props =
		| {
				trigger: Snippet;
				triggerText?: never;
				content: Snippet;
				triggerClass?: string;
				contentClass?: string;
		  }
		| {
				trigger?: never;
				triggerText: string;
				content: Snippet;
				triggerClass?: string;
				contentClass?: string;
		  };

	let { trigger, triggerText, content, triggerClass, contentClass }: Props = $props();
</script>

<Collapsible.Root>
	<Collapsible.Trigger class={triggerClass}>
		{#if trigger}
			{@render trigger()}
		{:else if triggerText}
			{triggerText}
		{/if}
	</Collapsible.Trigger>

	<Collapsible.Content class={contentClass}>{@render content()}</Collapsible.Content>
</Collapsible.Root>

<!-- 
/* example usage:

<script>
	import Collapsible from '$lib/components/generic/collapsible.svelte';
</script>

<Collapsible triggerText="open" triggerClass="text-blue-500 font-semibold">
	
	{#snippet content()}
		<div>content hrere</div>
	{/snippet}
</Collapsible> -->
