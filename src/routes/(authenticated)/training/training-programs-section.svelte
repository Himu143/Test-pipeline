<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { assestUrl } from '$lib/services/utils';
	import { trainingStore } from '$lib/stores/taining.svelte';
	import { ArrowRight, Clock, Lock } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import { userTrainingStore } from '$lib/stores/user-training.svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { getTrainingPropertyLocale } from '$lib/utils';
	import { authStore } from '$lib/stores/auth.svelte';
	import { cohortUserStore } from '$lib/stores/cohort.svelte';

	let cardElements: HTMLElement[] = [];
	let isVisible: boolean[] = [];

	const hasTrainingAccess = $derived.by(() => {
		const isAdmin = authStore.user?.role?.toLowerCase?.() === 'admin';

		return cohortUserStore.userCohorts.length > 0 || isAdmin;
	});

	const trainings = $derived.by(() => {
		return trainingStore.trainings.map((item, index) => {
			let t = { ...item, isLocked: true };

			if (index == 0) {
				t.isLocked = false;
				return t;
			}

			const prevItem = trainingStore.trainings.at(index - 1);

			if (prevItem == null || prevItem == undefined) return t;

			const isPrevComplete = userTrainingStore.userTrainings.find(
				(el) => el.training_id == prevItem.id
			);

			if (!isPrevComplete) return t;

			t.isLocked = false;

			return t;
		});
	});

	const currengLang = $derived.by(() => {
		return getLocale();
	});

	function getLocaleByProperty(propertyName: string, training: Record<string, any>) {
		return getTrainingPropertyLocale(currengLang, propertyName, training);
	}
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 sm:py-16 md:px-6 md:py-20 lg:py-24 xl:px-24">
	<div class="mx-auto max-w-430">
		<!-- Header -->
		<div class="mb-12 flex flex-col gap-4 sm:mb-16 md:gap-6 lg:mb-20">
			<h2
				class="text-center font-baskerville text-3xl leading-tight font-bold text-black md:text-4xl lg:text-5xl lg:leading-16.5"
			>
				{m.training_programs_headline()}
			</h2>
			<p
				class="mx-auto max-w-430 text-center text-xl leading-relaxed font-normal text-wrap text-secondary-black md:text-2xl lg:text-3xl lg:leading-8.25"
			>
				{m.training_programs_subheadline()}
			</p>
		</div>

		<!-- Module Cards Grid -->
		<div class="relative">
			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-5">
				{#if trainingStore.status == 'success'}
					{#each trainings as program, index}
						{@render trainingCard(program, index)}
					{/each}
				{/if}
			</div>

			<!-- {#if !hasTrainingAccess}
				<div
					class="absolute inset-0 z-10 flex w-full items-start justify-center rounded-2xl bg-white/30 backdrop-blur-[2px]"
				>
					<div class="mt-40 rounded-xl bg-white/90 px-6 py-4 text-center shadow-lg">
						<p class="font-poppins text-lg font-semibold text-black sm:text-xl">
							You are not authorized to access this section.
						</p>
					</div>
				</div>
			{/if} -->
		</div>
	</div>
</section>

{#snippet trainingCard(training, index)}
	<div
		bind:this={cardElements[index]}
		data-index={index}
		class="group flex flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-5 transition-all duration-700 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
	>
		<!-- Image with Badges -->
		<div class="relative h-44 w-full overflow-hidden rounded-t-[10px] sm:h-48 md:h-52 lg:h-44">
			<img
				src={assestUrl(training.feature_image)}
				alt={training.name}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
			/>

			<!-- Locked Badge -->
			{#if training.isLocked}
				<div
					class="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 transition-all duration-300 group-hover:scale-105 sm:top-2.5 sm:right-2.5"
				>
					<Lock class="h-3 w-3 text-black" strokeWidth={2.5} />
					<span class="font-baskerville text-lg leading-tight font-bold text-black">
						Locked
					</span>
				</div>
			{:else if !training.isLocked}
				<div
					class="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 transition-all duration-300 group-hover:scale-105 sm:top-2.5 sm:right-2.5"
				>
					<span class="font-baskerville text-lg leading-tight font-bold text-black">
						Available
					</span>
				</div>
			{/if}
		</div>

		<!-- Card Content -->
		<div class="flex flex-1 flex-col gap-4 p-2 2xl:p-5">
			<!-- Title and Description -->
			<div class="flex flex-col gap-3.5">
				<h3
					class="line-clamp-2 min-h-12 font-baskerville text-xl leading-tight font-bold text-black sm:text-xl"
				>
					<span class="pr-1">{m.module()} {training.sort}:</span>
					{getLocaleByProperty('name', training)}
				</h3>
				<p
					class="line-clamp-2 text-lg leading-6 font-normal text-secondary-black sm:text-base"
				>
					{getLocaleByProperty('short_description', training)}
				</p>
			</div>

			<!-- Duration -->
			<div class="flex items-center gap-2">
				<Clock class="h-4 w-4 text-secondary-black" strokeWidth={2} />
				<span class="text-base leading-5 font-normal text-secondary-black">
					{getLocaleByProperty('video_length', training)}
				</span>
			</div>

			<!-- Action Button / Locked Message -->
			{#if training.isLocked}
				<div class="mt-auto flex items-center justify-center rounded-full py-2">
					<span class="text-left text-xl leading-5 font-medium text-black">
						{m.training_Locked_message()}
					</span>
				</div>
			{:else}
				<Button
					size="lg"
					onclick={() => {
						goto(`/training/${training.slug}`);
					}}
				>
					{m.start_module()}
					<ArrowRight class="h-4 w-4 text-white" strokeWidth={2} />
				</Button>
			{/if}
		</div>
	</div>
{/snippet}
