<script lang="ts">
	import { Bookmark, Play, Pause, Maximize, Minimize, PictureInPicture } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import CertificateModal from './certificate-modal.svelte';
	import { trainingDetailStore } from '$lib/stores/taining.svelte';
	import { assestUrl } from '$lib/services/utils';
	import { userTrainingStore } from '$lib/stores/user-training.svelte';
	import DescriptionSection from './description-section.svelte';
	import AdditionalResourcesSection from './additional-resources-section.svelte';
	import ProgressSection from './progress-section.svelte';
	import HeaderSection from './header-section.svelte';
	import { page } from '$app/state';
	import ContentBookmark from '$lib/components/app/content-bookmark.svelte';
	import { trainingBookmarkId } from '$lib/utils';
	import { BOOKMARK_TRAINING_KEY } from '$lib/constatns';

	let isCertificateModalOpen = $state(false);

	let isPlaying = $state(false);
	let videoRef: HTMLVideoElement | undefined;
	let currentVideo = $state();
	let currentTime = $state(0);
	let duration = $state(0);
	let isHovering = $state(false);
	let isFullscreen = $state(false);
	let videoContainerRef: HTMLDivElement | undefined;

	function togglePlay() {
		if (!videoRef) return;
		if (isPlaying) {
			videoRef.pause();
		} else {
			videoRef.play();
		}
		isPlaying = !isPlaying;
	}

	function formatTime(seconds) {
		if (!seconds) return '00:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	function toggleFullscreen() {
		if (!videoContainerRef) return;

		if (!document.fullscreenElement) {
			videoContainerRef.requestFullscreen().catch((err) => {
				console.error(`Error attempting to enable fullscreen: ${err.message}`);
			});
			isFullscreen = true;
		} else {
			document.exitFullscreen();
			isFullscreen = false;
		}
	}

	function togglePiP() {
		if (!videoRef) return;

		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		} else {
			videoRef.requestPictureInPicture();
		}
	}

	function handleSeek(e: MouseEvent) {
		if (!videoRef || !duration) return;
		const target = e.currentTarget as HTMLElement;
		if (!target) return;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percentage = x / rect.width;
		videoRef.currentTime = percentage * duration;
	}

	function jumpToVideo(section) {
		if (videoRef) {
			videoRef.currentTime = section.start_time;
			videoRef.play();
		}
	}

	$effect(() => {
		if (page.params.slug) trainingDetailStore.getTraining(page.params.slug);
	});
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 lg:-mt-40 xl:px-24">
	<div
		class="items-center gap-12 pt-16 sm:pt-28 md:!pt-40 lg:flex-row lg:items-center lg:justify-between lg:!pt-40 xl:items-start 2xl:gap-36"
	>
		<div class="flex w-full flex-col gap-8 pb-9 lg:flex-row lg:items-center lg:justify-between">
			<HeaderSection />

			<!-- Right Side (Progress Card) -->
			<ProgressSection />
		</div>
		<!-- Video Section -->
		<div class="relative flex flex-col gap-8 xl:block">
			<!-- Video Player (Left) -->
			<div
				id="video-player-section"
				bind:this={videoContainerRef}
				class="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-primary p-6 sm:aspect-video xl:w-[63%]"
				onmouseenter={() => (isHovering = true)}
				onmouseleave={() => (isHovering = false)}
				role="region"
				aria-label="Video Player"
			>
				<!-- Video Element -->
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					bind:this={videoRef}
					bind:currentTime
					bind:duration
					class="absolute inset-0 h-full w-full object-cover"
					src={assestUrl(trainingDetailStore.training?.video)}
					onended={() => {
						isPlaying = false;
						userTrainingStore.createUserTraining(trainingDetailStore.training?.id);
					}}
					onpause={() => (isPlaying = false)}
					onplay={() => (isPlaying = true)}
					onclick={togglePlay}
				></video>

				<!-- Overlay (shown when paused) -->
				{#if !isPlaying}
					{@render videoPlayerOverlay()}
				{/if}

				<!-- Bottom Control Bar (shown on hover or when paused) -->
				{@render videoControlsBar()}
			</div>

			<!-- Video List (Right) -->

			{@render videoSectionView()}
		</div>

		<!-- What is Dementia Section -->
		<DescriptionSection
			onClaimCertificate={() => {
				isCertificateModalOpen = true;
			}}
		/>

		<!-- Additional Resources Section -->
		<AdditionalResourcesSection />
	</div>
</section>

<CertificateModal bind:open={isCertificateModalOpen} />

{#snippet videoPlayerOverlay()}
	<div class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-primary/80">
		<div class="absolute top-4 right-4 z-20 sm:top-6 sm:right-6">
			<ContentBookmark
				item={{
					item_id: trainingBookmarkId(trainingDetailStore.training?.slug),
					item_type: BOOKMARK_TRAINING_KEY,
					slug: trainingDetailStore.training?.slug,
					title: trainingDetailStore.training?.name
				}}
			/>
		</div>

		<div class="z-20 flex flex-col items-center gap-3 text-center sm:gap-5">
			<Button
				variant="ghost"
				class="h-auto p-0 text-secondary-black transition-transform hover:scale-110 hover:bg-transparent hover:text-black"
				onclick={togglePlay}
			>
				<Play class="!size-12 fill-transparent stroke-black stroke-[1.5] sm:!size-24" />
			</Button>
			<div class="flex flex-col items-center gap-1">
				<h3 class="max-w-[700px] font-poppins text-2xl text-black sm:text-3xl">
					Training Video: <br />{currentVideo?.title}
				</h3>
				<span class="font-poppins text-base text-secondary-black sm:text-lg">
					{trainingDetailStore.training?.video_length}
				</span>
			</div>
			<Button
				class="flex items-center gap-2.5 rounded-full border border-black bg-primary px-6 py-2.5 font-poppins text-base font-medium text-black transition-colors hover:bg-primary-hover sm:px-10 sm:py-3.5 sm:text-lg"
				onclick={togglePlay}
			>
				Start Video
			</Button>
		</div>
	</div>
{/snippet}

{#snippet videoControlsBar()}
	<div
		class={`absolute right-0 bottom-0 left-0 z-20 flex items-center gap-4 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
			isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
		}`}
	>
		<Button
			variant="ghost"
			size="icon"
			class="text-white hover:bg-white/20 hover:text-white"
			onclick={togglePlay}
		>
			{#if isPlaying}
				<Pause class="h-6 w-6" />
			{:else}
				<Play class="h-6 w-6 fill-white" />
			{/if}
		</Button>
		<div class="flex flex-1 items-center gap-3">
			<span class="font-poppins text-xs text-white sm:text-sm">{formatTime(currentTime)}</span
			>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="h-1.5 flex-1 cursor-pointer bg-white/30" onclick={handleSeek}>
				<div
					class="h-full bg-primary transition-all"
					style={`width: ${(currentTime / duration) * 100 || 0}%`}
				></div>
			</div>
			<span class="font-poppins text-xs text-white sm:text-sm">{formatTime(duration)}</span>
		</div>
		<div class="flex items-center gap-2">
			<Button
				variant="ghost"
				size="icon"
				class="text-white hover:bg-white/20 hover:text-white"
				onclick={togglePiP}
				title="Picture in Picture"
			>
				<PictureInPicture class="h-5 w-5" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				class="text-white hover:bg-white/20 hover:text-white"
				onclick={toggleFullscreen}
				title="Fullscreen"
			>
				{#if isFullscreen}
					<Minimize class="h-5 w-5" />
				{:else}
					<Maximize class="h-5 w-5" />
				{/if}
			</Button>
		</div>
	</div>
{/snippet}

{#snippet videoSectionView()}
	<div
		class="flex w-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white xl:absolute xl:top-0 xl:right-0 xl:bottom-0 xl:w-[34%]"
	>
		<!-- Introduction Header -->
		<div class="border-b border-black/10 bg-gray-50 px-4 py-4">
			<h4 class="font-poppins text-lg font-semibold text-black-soft">Sections</h4>
		</div>

		<!-- List Items -->
		<div class="flex flex-col overflow-y-auto">
			{#if trainingDetailStore.status == 'success'}
				{#each trainingDetailStore.training?.video_sections as segment}
					<div
						class={`flex cursor-pointer flex-col justify-center gap-2 border-b border-black/10 px-4 py-4 transition-colors hover:bg-gray-50`}
						onclick={() => jumpToVideo(segment)}
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === 'Enter' && handleSegmentClick(segment)}
					>
						<div class="flex items-center justify-between">
							<span class={`font-poppins text-lg font-normal text-black-soft`}>
								{segment.name}
							</span>
						</div>
						<!-- <span class="font-poppins text-sm text-text-gray-medium">{segment.duration}</span> -->
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/snippet}
