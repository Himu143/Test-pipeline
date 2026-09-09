<script>
	import { Button } from '$lib/components/ui/button';
	import { assestUrl } from '$lib/services/utils';
	import { trainingDetailStore } from '$lib/stores/taining.svelte';
	import { FileText } from '@lucide/svelte';
</script>

<div class="mt-9 flex w-full flex-col gap-6 rounded-xl border border-black/10 bg-white p-6">
	<h3 class="font-baskerville text-2xl text-black">Additional Resources</h3>
	<div class="flex flex-col gap-3">
		{#each trainingDetailStore.training?.resources as resource}
			<div
				class="flex flex-col justify-between gap-5 rounded-lg bg-gray-50 px-3 py-3 sm:flex-row sm:items-center sm:gap-0"
			>
				<div class="flex items-center gap-3">
					<div
						class={`flex h-10 w-10 items-center justify-center rounded bg-blue-100 text-purple-600`}
					>
						<FileText class="h-5 w-5" />
					</div>
					<div class="flex flex-col">
						<span class="font-baskerville text-lg text-black">
							{resource.documents_id.title}
						</span>
						<span class="font-poppins text-base text-secondary-black"> Document </span>
					</div>
				</div>
				<Button
					href={assestUrl(resource.documents_id.file)}
					target="_blank"
					variant="outline"
					class="px-6"
				>
					<!-- <Download class="h-4 w-4" /> -->
					Download
				</Button>
			</div>
		{/each}
	</div>
</div>
