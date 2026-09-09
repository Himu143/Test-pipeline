<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TrainingList from './training-list.svelte';
	import ResourceList from './resource-list.svelte';
	import { bookmarkStore } from '$lib/stores/bookmark.svelte';
	import { BOOKMARK_EXTARNAL_KEY, BOOKMARK_TRAINING_KEY } from '$lib/constatns';

	// TAB STATE
	let activeTab = $state<'modules' | 'resources'>('modules');

	const showModules = () => (activeTab = 'modules');
	const showResources = () => (activeTab = 'resources');

	const traininCount = $derived(
		bookmarkStore.bookmarks.filter((item) => item.item_type == BOOKMARK_TRAINING_KEY).length
	);

	const resourcesCount = $derived(
		bookmarkStore.bookmarks.filter((item) => item.item_type == BOOKMARK_EXTARNAL_KEY).length
	);
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 lg:-mt-40 xl:px-24">
	<div
		class="items-center gap-12 pt-12 sm:pt-28 md:pt-40! lg:flex-row lg:items-center lg:justify-between lg:pt-36! xl:items-start 2xl:gap-36"
	>
		<!-- TITLE -->
		<h1 class="font-baskerville text-4xl font-bold text-black">{m.saved_items_title()}</h1>

		<!-- TABS -->
		<div
			class="my-4 inline-flex h-14 w-full items-center gap-10 border-b border-neutral-200 px-1 sm:my-9 sm:gap-20 sm:px-3"
		>
			<!-- MODULE TAB -->
			<button
				type="button"
				onclick={showModules}
				class="inline-flex flex-col items-center justify-center gap-1.5 border-b-2 px-1 py-1.5 text-left transition-colors"
				class:border-black={activeTab === 'modules'}
				class:border-transparent={activeTab !== 'modules'}
			>
				<span class="font-poppins text-sm font-medium text-black sm:text-xl">
					{m.saved_items_tab_module()}({traininCount})
				</span>
			</button>

			<!-- RESOURCES TAB -->
			<button
				type="button"
				onclick={showResources}
				class="inline-flex flex-col items-center justify-center gap-1.5 border-b-2 px-1 py-1.5 text-left transition-colors"
				class:border-black={activeTab === 'resources'}
				class:border-transparent={activeTab !== 'resources'}
			>
				<span class="font-poppins text-sm font-medium text-black sm:text-xl">
					{m.saved_items_tab_resources()}({resourcesCount})
				</span>
			</button>
		</div>

		{#if activeTab === 'modules'}
			<!-- MODULES GRID -->
			<TrainingList />
		{:else}
			<ResourceList />
		{/if}
	</div>
</section>
