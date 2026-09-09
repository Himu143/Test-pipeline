<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { trainingDetailStore, trainingStore } from '$lib/stores/taining.svelte';
	import { userTrainingStore } from '$lib/stores/user-training.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { Award } from 'lucide-svelte';

	let { onClaimCertificate } = $props();

	const hasNext = $derived.by(() => {
		const t = userTrainingStore.userTrainings.find(
			(item) => item.training_id == trainingDetailStore.training?.id
		);

		return !!t;
	});

	function gotoTraining(sort: number) {
		const training = trainingStore.trainings.find((item) => item.sort == sort);

		if (training) {
			goto(`/training/${training.slug}`);
		}
	}

	function gotoNext() {
		const nextItemSort = trainingDetailStore.training?.sort + 1;
		gotoTraining(nextItemSort);
	}

	function gotoPrev() {
		const prevItemSort = trainingDetailStore.training?.sort - 1;
		gotoTraining(prevItemSort);
	}
</script>

<div class="mt-13 flex w-full flex-col gap-8 rounded-xl border border-black/10 bg-white p-8">
	<div class="training-overview">
		{@html trainingDetailStore.training?.overview}
	</div>
	<div class="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-8">
		<Button
			variant="outline"
			disabled={trainingDetailStore.training?.sort == 1}
			onclick={gotoPrev}
		>
			<ChevronLeft class="h-4 w-4" />
			Previous Section
		</Button>
		<div class="flex flex-wrap gap-4">
			{#if trainingDetailStore.training?.sort < trainingStore.trainings.length}
				<Button onclick={gotoNext} disabled={!hasNext}>
					Next Module
					<ChevronRight class="h-4 w-4" />
				</Button>
			{/if}
			{#if trainingDetailStore.training?.sort == trainingStore.trainings.length}
				<Button onclick={() => onClaimCertificate()}>
					Claim Certificate
					<Award class="" />
				</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.training-overview h2) {
		font-size: x-large;
	}

	:global(.training-overview p) {
		font-size: medium;
	}
</style>
