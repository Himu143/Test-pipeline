<script lang="ts">
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Pagination from '$lib/components/ui/pagination/index.js';

	interface Props {
		count: number;
		perPage?: number;
		desktopPerPage?: number;
		mobilePerPage?: number;
		siblingCount?: number;
		desktopSiblingCount?: number;
		mobileSiblingCount?: number;
		showLabels?: boolean;
		prevLabel?: string;
		nextLabel?: string;
		onPageChange?: (page: number) => void;
	}

	let {
		count,
		perPage,
		desktopPerPage = 3,
		mobilePerPage = 8,
		siblingCount,
		desktopSiblingCount = 1,
		mobileSiblingCount = 0,
		showLabels = true,
		prevLabel = 'Previous',
		nextLabel = 'Next',
		onPageChange
	}: Props = $props();

	const isDesktop = new MediaQuery('(min-width: 768px)');

	const finalPerPage = $derived(perPage ?? (isDesktop.current ? desktopPerPage : mobilePerPage));

	const finalSiblingCount = $derived(
		siblingCount ?? (isDesktop.current ? desktopSiblingCount : mobileSiblingCount)
	);
</script>

<Pagination.Root {count} perPage={finalPerPage} siblingCount={finalSiblingCount} {onPageChange}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton>
					<ChevronLeftIcon class="size-4" />
					{#if showLabels}
						<span class="hidden sm:block">{prevLabel}</span>
					{/if}
				</Pagination.PrevButton>
			</Pagination.Item>

			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}

			<Pagination.Item>
				<Pagination.NextButton>
					{#if showLabels}
						<span class="hidden sm:block">{nextLabel}</span>
					{/if}
					<ChevronRightIcon class="size-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>

<!-- example usage -->
 <!-- <script lang="ts">
	import SimplePagination from './SimplePagination.svelte';

	// Basic usage - just provide count
	let currentPage = $state(1);
	
	function handlePageChange(page: number) {
		currentPage = page;
		console.log('Page changed to:', page);
	}
</script>

<SimplePagination count={100} />

<SimplePagination 
	count={500} 
	onPageChange={handlePageChange} 
/>

<SimplePagination 
	count={200}
	desktopPerPage={5}
	mobilePerPage={10}
	desktopSiblingCount={2}
	mobileSiblingCount={1}
	onPageChange={handlePageChange}
/>

<SimplePagination 
	count={50} 
	showLabels={false}
	onPageChange={handlePageChange}
/>

<SimplePagination 
	count={300}
	prevLabel="Back"
	nextLabel="Forward"
	onPageChange={handlePageChange}
/>

<SimplePagination 
	count={150}
	perPage={7}
	siblingCount={1}
	onPageChange={handlePageChange}
/> -->
