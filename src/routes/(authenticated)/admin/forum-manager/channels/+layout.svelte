<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { forumChannelStore } from '$lib/stores/forum-channel.svelte';
	import SideMenu from '$lib/components/app/side-menu.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { children } = $props();

	const channels = $derived.by(() => {
		return forumChannelStore.channes.map((item) => ({
			id: item.id,
			name: item.name,
			path: `/admin/forum-manager/channels/${item.id}`
		}));
	});

	$effect(() => {
		forumChannelStore.getChannels();
	});
</script>

<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 px-4 sm:px-2">
	<aside class="md:col-span-1 order-1">
		{@render channelsView()}
	</aside>
	<main class="md:col-span-3 order-2">
		{@render children?.()}
	</main>
</div>

{#snippet channelsView()}
	<Card.Root>
		<Card.Header class="flex items-center justify-between">
			<Card.Title>Channles</Card.Title>
			<Button href="/admin/forum-manager/channels" size="sm">+</Button>
		</Card.Header>
		<Card.Content>
			<SideMenu items={channels} />
		</Card.Content>
	</Card.Root>
{/snippet}



