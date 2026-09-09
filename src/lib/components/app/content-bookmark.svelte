<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { bookmarkStore } from '$lib/stores/bookmark.svelte';
	import type { BookMarkItem } from '$lib/types';
	import { cn } from '$lib/utils';
	import { Bookmark } from '@lucide/svelte';

	type Props = {
		item: BookMarkItem;
		type?: 'primary' | 'black';
	};

	let { item, type = 'primary' }: Props = $props();

	const isBookmarked = $derived.by(() => {
		const index = bookmarkStore.bookmarks.findIndex((el) => el.item_id == item?.item_id);

		if (index >= 0) return true;

		return false;
	});

	function createBookmark() {
		if (!item.item_id) return;
		bookmarkStore.createBookmark(item);
	}

	function removeBookmark() {
		bookmarkStore.deleteBookmark(item.item_id);
	}
</script>

{#if isBookmarked}
	<Button
		onclick={removeBookmark}
		variant="ghost"
		class={cn(
			'h-8 w-8 rounded-full border-2 p-0 text-secondary-black',
			'transition-transform hover:scale-110 hover:bg-transparent',
			'border-2 hover:text-black sm:h-16 sm:w-16',
			{ 'border-primary': type == 'primary' },
			{ 'border-black': type == 'black' }
		)}
		aria-label="Bookmark"
	>
		<Bookmark class="!size-5 sm:!size-9" fill="currentColor" />
	</Button>
{:else}
	<Button
		onclick={createBookmark}
		variant="ghost"
		class={cn(
			'h-8 w-8 rounded-full border-2 p-0 text-secondary-black',
			'transition-transform hover:scale-110 hover:bg-transparent',
			'border-2 hover:text-black sm:h-16 sm:w-16',
			{ 'border-primary': type == 'primary' },
			{ 'border-black': type == 'black' }
		)}
		aria-label="Bookmark"
	>
		<Bookmark class="!size-5 sm:!size-9" />
	</Button>
{/if}
