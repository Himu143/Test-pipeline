<script lang="ts">
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { trainingDetailStore } from '$lib/stores/taining.svelte';
	import { getTrainingPropertyLocale } from '$lib/utils';

	const currengLang = $derived.by(() => {
		return getLocale();
	});

	function getLocaleByProperty(propertyName: string, training: Record<string, any>) {
		return getTrainingPropertyLocale(currengLang, propertyName, training);
	}
</script>

<div class="flex flex-col gap-8">
	<Subtitle
		text={`${m.home()} → ${m.module()} ${trainingDetailStore.training?.sort}`}
		class="text-start !text-base !font-normal"
	/>
	<!-- Module Title & Description -->
	<div class="flex flex-col gap-3">
		<div class="flex flex-wrap items-center gap-2 sm:gap-6">
			<span
				class="font-baskerville text-3xl text-secondary-black sm:text-4xl md:text-4xl md:leading-10"
			>
				{m.module()}
				{trainingDetailStore.training?.sort}:
			</span>
			<span
				class="font-baskerville text-3xl text-black sm:text-4xl md:text-4xl md:leading-10"
			>
				{#if trainingDetailStore.training}
					{getLocaleByProperty('name', trainingDetailStore.training)}
				{/if}
			</span>
		</div>
		<p class="font-poppins text-lg text-secondary-black 2xl:min-w-[800px]">
			{#if trainingDetailStore.training}
				{getLocaleByProperty('short_description', trainingDetailStore.training)}
			{/if}
		</p>
	</div>
</div>
