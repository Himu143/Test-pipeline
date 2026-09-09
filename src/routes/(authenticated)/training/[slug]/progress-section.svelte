<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import { trainingStore } from '$lib/stores/taining.svelte';
	import { userTrainingStore } from '$lib/stores/user-training.svelte';

	const progress = $derived.by(() => {
		if (userTrainingStore.userTrainings.length == 0 || trainingStore.trainings.length == 0) {
			return 0;
		}

		return Math.ceil(
			(userTrainingStore.userTrainings.length / trainingStore.trainings.length) * 100
		);
	});
</script>

<div
	class="flex w-full flex-col gap-2.5 rounded-xl border border-border-gold bg-bg-gold-light px-6 py-3 lg:max-w-sm"
>
	<div class="flex flex-col gap-2">
		<div class="flex items-start justify-between">
			<span class="font-poppins text-lg text-black-soft">Your Progress</span>
			<span class="font-poppins text-2xl text-black-soft">{progress}%</span>
		</div>
		<Progress value={progress} max={100} class="h-2 w-full bg-primary" />
	</div>
</div>
