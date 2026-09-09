<script lang="ts">
	import { tick } from 'svelte';
	import {
		PUBLIC_ENGLISH_USER_GUIDE_URL,
		PUBLIC_SPANISH_USER_GUIDE_URL
	} from '$env/static/public';

	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog-welcome';
	import { cn } from '$lib/utils';

	let { open = $bindable() } = $props();

	const userGuideVideoUrl =
		getLocale() === 'es' ? PUBLIC_SPANISH_USER_GUIDE_URL : PUBLIC_ENGLISH_USER_GUIDE_URL;

	let videoElement = $state<HTMLVideoElement | null>(null);
	let isPlaying = $state(false);

	// Reset to thumbnail whenever the dialog is opened or closed
	$effect(() => {
		if (open) {
			isPlaying = false;
			videoElement = null;
		} else {
			videoElement?.pause();
			videoElement = null;
			isPlaying = false;
		}
	});

	async function playVideo() {
		if (isPlaying) return;

		isPlaying = true;

		// Wait for the video element to mount
		await tick();

		try {
			await videoElement?.play();
		} catch (error) {
			console.error('Failed to play video:', error);
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="flex h-auto max-h-[90vh] w-[95vw] flex-col gap-0 overflow-hidden rounded-3xl border-none bg-white p-0 sm:max-w-250 sm:rounded-3xl"
	>
		<div class="relative w-full flex-1 overflow-y-auto">
			<div class="flex flex-col items-center justify-center p-8 pb-4 text-center">
				<Dialog.Title
					class="mb-3 text-2xl font-bold tracking-wide text-black md:text-3xl"
				>
					{m.welcome_title()}
				</Dialog.Title>

				<Dialog.Description
					class="max-w-2xl text-center text-lg font-medium text-secondary-black sm:text-xl"
				>
					{m.welcome_description()}
				</Dialog.Description>
			</div>

			<div class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-8 sm:px-8 xl:px-12">
				<!-- Video / Thumbnail -->
				<div class="relative overflow-hidden rounded-2xl shadow-sm">
					{#if !isPlaying}
						<div class="relative aspect-video w-full">
							<img
								src="/images/hero-section/thumbnail.png"
								alt={m.welcome_img_alt()}
								class="h-full w-full object-cover"
							/>

							<div
								class="pointer-events-none absolute inset-0 flex items-center justify-center"
							>
								<button
									type="button"
									class="pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-110"
									aria-label={m.welcome_watch_now()}
									onclick={playVideo}
								>
									<img
										src="/images/hero-section/play.png"
										alt=""
										aria-hidden="true"
										class="w-16 sm:w-20"
									/>
								</button>
							</div>
						</div>
					{:else}
						<!-- svelte-ignore a11y_media_has_caption -->
						<video
							bind:this={videoElement}
							class="block aspect-video w-full object-cover"
							src={userGuideVideoUrl}
							playsinline
							controls
							preload="metadata"
							aria-label={m.welcome_img_alt()}
						></video>
					{/if}
				</div>

				<div class="flex w-full flex-col-reverse justify-end gap-4 sm:flex-row">
					<Dialog.Close
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'h-12 border-black px-8 text-xl font-normal text-black hover:bg-gray-50'
						)}
					>
						{m.welcome_maybe_later()}
					</Dialog.Close>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
