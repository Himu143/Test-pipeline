<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Download } from 'lucide-svelte';

	let { open = $bindable(false) } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-[90vw] gap-0 p-0  md:max-w-[50vw]">
		<div
			class="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-4 sm:p-8 md:p-10"
		>
			<!-- Main Certificate Container -->
			<div
				class="border-primary relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden border bg-white"
			>
				<!-- Seal Image -->
				<div class="absolute top-0 right-7 z-10 aspect-[0.68] w-[10%] max-w-[100px] min-w-[60px]">
					<div class="absolute top-0 right-7">
						<img
							src="/images/training/certificate-flag.png"
							alt="Certificate Seal"
							class="h-full w-full object-contain"
						/>
					</div>
				</div>
			</div>

			<!-- Download Button Container -->
			<div class="mt-6 flex justify-center sm:mt-8">
				<Button
					class="flex h-auto items-center gap-2 rounded-full border-2 border-gray-500 bg-black px-8 py-3 text-lg font-semibold text-white hover:bg-black/90"
				>
					<div class="relative h-5 w-5 overflow-hidden">
						<img
							src="/images/training/badge.png"
							alt="Download Icon"
							class="h-full w-full object-cover"
						/>
					</div>
					Download Certificate
				</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
