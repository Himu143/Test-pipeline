<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import type { Snippet } from 'svelte';

	interface Props {
		value: string;
		trigger: Snippet;
		content: Snippet;
	}

	let { value, trigger, content }: Props = $props();
</script>

<Accordion.Item {value}>
	<Accordion.Trigger>{@render trigger()}</Accordion.Trigger>
	<Accordion.Content>{@render content()}</Accordion.Content>
</Accordion.Item>
