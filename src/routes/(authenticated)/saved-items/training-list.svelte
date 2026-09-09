<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Button } from '$lib/components/ui/button';
	import { bookmarkStore } from '$lib/stores/bookmark.svelte';
	import { trainingStore } from '$lib/stores/taining.svelte';
	import { assestUrl } from '$lib/services/utils';
	import { ArrowRight } from 'lucide-svelte';
	import { BOOKMARK_TRAINING_KEY } from '$lib/constatns';

	$effect(() => {
		trainingStore.getTraining();
	});

	const trainings = $derived.by(() => {
		return bookmarkStore.bookmarks
			.filter((item) => item.item_type == BOOKMARK_TRAINING_KEY)
			.map((item) => {
				const t = trainingStore.trainings.find((t) => t.slug == item.slug);
				return t;
			});
	});
</script>

<div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
	{#each trainings as module}
		<article
			class="flex h-full flex-col overflow-hidden rounded-2xl bg-white p-4 outline-1 outline-primary"
		>
			<!-- IMAGE + TOP PILLS -->
			<div class="relative h-45 w-full overflow-hidden sm:h-47">
				<!-- module image -->
				<img
					src={assestUrl(module?.feature_image)}
					alt={module?.name}
					class="h-full w-full rounded-t-xl object-cover"
				/>

				<!-- left pill: Module 1 / Module 2 -->
				<div
					class="absolute top-4 left-4 inline-flex items-center justify-center rounded-4xl bg-primary px-3 py-1 font-baskerville text-xs font-bold text-black sm:text-sm"
				>
					<span> Module </span> <span class="ml-1">{module?.sort}</span>
				</div>
			</div>

			<!-- BODY -->
			<div class="flex flex-1 flex-col gap-4 pt-3 pb-4 sm:pb-5">
				<!-- title + description + meta -->
				<div class="flex flex-1 flex-col gap-3">
					<div class="flex flex-col gap-2">
						<h2 class="font-baskerville text-lg font-bold text-black sm:text-xl">
							{module?.name}
						</h2>
						<p class="font-poppins text-xs font-normal text-neutral-700 sm:text-sm">
							{module?.short_description}
						</p>
					</div>

					<!-- <div class="mt-1 inline-flex items-center gap-2">
						<Clock class="h-4 w-4 text-neutral-700" />
						<p
							class="font-sans text-xs leading-5 font-normal text-neutral-700 sm:text-base"
						>
							{module?.duration}
						</p>
					</div> -->
				</div>

				<!-- CTA BUTTON -->
				<Button
					href={`/training/${module?.slug}`}
					type="button"
					class="mt-1 flex h-9 w-full items-center justify-center rounded-4xl bg-black"
				>
					<span
						class="font-Inter mr-2 text-xs leading-5 font-medium text-white sm:text-sm"
					>
						{m.saved_items_watch_module()}
					</span>

					<ArrowRight />
				</Button>
			</div>
		</article>
	{/each}
</div>
