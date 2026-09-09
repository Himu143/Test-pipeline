<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Snippet } from 'svelte';
	import { Button } from '../ui/button';

	interface Props {
		header?: Snippet;
		title?: string;
		description?: Snippet;
		content?: Snippet;
		footer?: Snippet;
		class?: string;
		cancelBtnText?: string; 
		actionBtnText?: string;
		actionBtnStyle?: string;
		cancelBtnStyle?: string;
	}

	let { header, title, description, content, footer, class: className = '', cancelBtnText='', actionBtnText='', cancelBtnStyle='', actionBtnStyle=''}: Props = $props();
</script>

<Card.Root class={`w-[350px] ${className}`}>
	<Card.Header>
		{#if header}
			{@render header()}
		{:else}
			{#if title}
				<Card.Title>{title}</Card.Title>
			{/if}
			{#if description}
				<Card.Description>
					{@render description()}
				</Card.Description>
			{/if}
		{/if}
	</Card.Header>

	{#if content}
		<Card.Content>
			{@render content()}
		</Card.Content>
	{/if}

	{#if footer}
		<Card.Footer class="flex justify-between">
			{@render footer()}
		</Card.Footer>
	{/if}
</Card.Root>
