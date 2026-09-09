<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { SvelteComponent } from 'svelte';

	export interface CarouselItem {
		id?: string | number;
		content: string | number | typeof SvelteComponent;
	}

	export interface Props {
		items?: CarouselItem[];
		rootClass?: string;
		itemWrapperClass?: string;
		cardContentClass?: string;
		showControls?: boolean;
	}

	let {
		items = [],
		rootClass = 'w-full max-w-xs',
		itemWrapperClass = 'p-1',
		cardContentClass = 'flex aspect-square items-center justify-center p-6',
		showControls = true
	}: Props = $props();
</script>

<Carousel.Root class={rootClass}>
	<Carousel.Content>
		{#each items as item, i (item.id ?? i)}
			<Carousel.Item>
				<div class={itemWrapperClass}>
					<Card.Root>
						<Card.Content class={cardContentClass}>
							{#if typeof item.content === 'string' || typeof item.content === 'number'}
								<span class="text-4xl font-semibold">{item.content}</span>
							{:else}
								<svelte:component this={item.content} />
							{/if}
						</Card.Content>
					</Card.Root>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>

	{#if showControls}
		<Carousel.Previous />
		<Carousel.Next />
	{/if}
</Carousel.Root>

<!-- example usage -->
<!-- <script lang="ts">
	import Carousel from '$lib/components/generic/carousel.svelte';
	import { Inbox } from '@lucide/svelte/icons';

	const items = [
		{ id: 1, content: 'One' },
		{ id: 2, content: 'Two' },
		{ id: 3, content: Inbox },
		{ id: 4, content: 'Four' }
	];
</script>
<div class="container mx-auto flex justify-center py-20">

<Carousel
	items={items}
	rootClass="w-full max-w-md"
	itemWrapperClass="p-2"
	cardContentClass="flex items-center justify-center aspect-video bg-muted"
	showControls={true}
/>
</div> -->
