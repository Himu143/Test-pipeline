<script lang="ts">
	import { cohortStore } from '$lib/stores/cohort.svelte';
	import CohortDialog from './cohort-dialog.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { Users } from '@lucide/svelte';

	let cohortDialog = $state(false);

	$effect(() => {
		cohortStore.getCohorts();
	});
</script>

<div class="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
	<!-- Header -->
	<div class="flex items-center justify-between flex-wrap px-6 py-5 border-b border-gray-100 gap-y-2 gap-x-3">
		<h1 class="text-2xl font-bold text-gray-900">Cohorts</h1>
		<Button
			onclick={() => (cohortDialog = true)}
			class="rounded-full px-5 font-semibold"
		>
			Add Cohort +
		</Button>
	</div>

	<!-- Cohort list -->
	{#if cohortStore.cohorts.length === 0}
		<div class="flex flex-col items-center justify-center gap-3 py-16 text-center">
			<Users class="h-12 w-12 text-gray-300" />
			<p class="text-base font-medium text-gray-500">No cohorts yet</p>
			<p class="text-sm text-gray-400">Create your first cohort to get started</p>
		</div>
	{:else}
		<ul class="divide-y divide-gray-100">
			{#each cohortStore.cohorts as cohort}
				<li class="flex items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
					<div class="min-w-0 flex-1">
						<p class="text-base font-semibold text-gray-900 truncate">{cohort.name}</p>
						{#if cohort.description}
							<p class="text-sm text-gray-500 truncate max-w-md">{cohort.description}</p>
						{/if}
					</div>
					<Button
						variant="secondary"
						size="sm"
						class="shrink-0 rounded-full px-5 bg-[#E0E0E0]!"
						onclick={() => goto(`/admin/cohort/${cohort.id}`)}
					>
						View
					</Button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<CohortDialog bind:open={cohortDialog} />
