<script lang="ts">
	import AppButton from '$lib/components/app/app-button.svelte';
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<section class="hero-section bg-primary">
	<div
		class="flex min-h-[calc(83vh)] flex-col gap-8 px-4 pt-24! pb-12 sm:px-8 sm:pt-32! md:gap-12 md:px-6 md:pt-44! lg:-mt-40 lg:gap-16 lg:pt-48! xl:flex-row xl:items-center xl:justify-between xl:gap-20 xl:px-24"
	>
		<!-- Text Content -->
		<div class="max-w-full flex-1 xl:min-w-[55%]">
			<Subtitle text="{m.training_hero_sub()}" class="mb-4 text-left md:mb-6" />
			<h1
				class="font-baskerville text-3xl leading-tight font-bold sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:leading-16"
			>
				{m.training_hero_title1()}
			</h1>
		</div>

		<!-- Image Grid -->
		<div class="flex flex-1 items-center justify-center xl:justify-end">
			<div class="w-full max-w-150 sm:min-w-112.5">
				<img
					src="/images/training/training-hero-1.webp"
					alt="Training materials showcase"
					class="h-auto w-full"
				/>
			</div>
		</div>
	</div>
</section>
