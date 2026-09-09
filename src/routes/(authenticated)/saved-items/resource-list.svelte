<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { BOOKMARK_EXTARNAL_KEY, BOOKMARK_TRAINING_KEY } from '$lib/constatns';
	import { m } from '$lib/paraglide/messages';
	import { bookmarkStore } from '$lib/stores/bookmark.svelte';
	import { extarnalResourceStore } from '$lib/stores/extarnal-resource.svelte';
	import { ArrowRight, Bookmark } from '@lucide/svelte';

	let resources = $state([
		{
			id: 1,
			title: 'Federated Learning—A Solution for Democratizing Data for Cancer Research?',
			description:
				'Federated learning (FL) might well be the next paradigm shift in democratizing vast amounts of data from many data sources for use in cancer research. At its most basic level, FL offers a decentralized, but collective, approach to accessing, analyzing and interpreting data.',
			category: 'Federal Resources',
			image: '/images/resources/details/nih-details.png'
		},
		{
			id: 2,
			title: 'Federal Resources (NIH, CDC)',
			description:
				"Add your pricing strategy. Be sure to include important details like value, length of service, and why it's unique.",
			category: 'Clinical Guidance',
			image: '/images/resources/details/cdc-details.png'
		},
		{
			id: 3,
			title: 'Federal Resources (NIH, CDC)',
			description:
				"Add your pricing strategy. Be sure to include important details like value, length of service, and why it's unique.",
			category: 'Federal Resources',
			image: '/images/resources/details/nih-details.png'
		},
		{
			id: 4,
			title: 'Federal Resources (NIH, CDC)',
			description:
				"Add your pricing strategy. Be sure to include important details like value, length of service, and why it's unique.",
			category: 'Clinical Guidance',
			image: '/images/resources/details/cdc-details.png'
		}
	]);

	function imageUrl(link: string) {
		if (link && link.includes('nih.gov')) {
			return '/images/resources/details/nih-details.png';
		}

		if (link && link.includes('cdc.gov')) {
			return '/images/resources/details/cdc-details.png';
		}
	}

	$effect(() => {
		extarnalResourceStore.getAllResources();
	});

	const bookmarkedRources = $derived.by(() => {
		return bookmarkStore.bookmarks
			.filter((item) => item.item_type == BOOKMARK_EXTARNAL_KEY)
			.map((item) => {
				return extarnalResourceStore.resources.find((el) => el.id == item.item_id);
			});
	});
</script>

<div class="flex w-full flex-col gap-6">
	{#each bookmarkedRources as resource}
		<article
			class="relative w-full overflow-hidden rounded-2xl bg-white outline-1 -outline-offset-2 outline-neutral-200"
		>
			<div class="relative flex flex-col gap-6 p-6 lg:flex-row lg:gap-8">
				<!-- Left image block -->
				<div class="shrink-0 rounded-[10px] bg-amber-200 p-7 lg:h-72 lg:w-72 lg:py-16">
					<img
						class="h-36 w-full rounded-[10px] object-cover lg:h-36 lg:w-56"
						src={imageUrl(resource?.link)}
						alt={resource?.title}
						loading="lazy"
					/>
				</div>

				<!-- Right content -->
				<div class="flex min-w-0 flex-1 flex-col gap-7">
					<!-- Top row: tag + bookmark -->
					<div class="flex flex-wrap items-center justify-between gap-4 sm:items-start">
						<div
							class="inline-flex h-10 items-center justify-center rounded-2xl bg-amber-200/30 px-4 py-1.5 outline-1 -outline-offset-1 outline-amber-200"
						>
							<span class="font-poppins text-xl font-medium text-neutral-700">
								{resource?.category.name}
							</span>
						</div>
					</div>

					<!-- Title + description + CTA -->
					<div class="flex flex-col gap-6">
						<h2 class="font-poppins text-3xl font-semibold text-black">
							{resource?.title}
						</h2>

						<div
							class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
						>
							<p
								class="line-clamp-4 max-w-230 font-poppins text-xl font-normal text-neutral-700"
							>
								{resource?.short_description}
							</p>

							<Button
								href={resource?.link}
								target="_blank"
								size="lg"
								class="flex gap-4 border border-primary bg-white px-8! text-black hover:bg-solid-primary 2xl:px-20!"
							>
								{m.saved_items_read_more()}
								<ArrowRight class="h-6 w-6 text-black" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</article>
	{/each}
</div>
