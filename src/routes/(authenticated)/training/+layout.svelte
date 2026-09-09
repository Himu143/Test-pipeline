<script lang="ts">
	import { trainingStore } from '$lib/stores/taining.svelte';
	import { userTrainingStore } from '$lib/stores/user-training.svelte';
	import { cohortUserStore } from '$lib/stores/cohort.svelte';

	let { children } = $props();

	$effect(() => {
		trainingStore.getTraining();
		userTrainingStore.getUserTrainings();
		cohortUserStore.getUserCohorts(true);
	});
</script>

{@render children?.()}
