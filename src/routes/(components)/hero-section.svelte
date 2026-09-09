<script lang="ts">
	import AppButton from '$lib/components/app/app-button.svelte';
	import { m } from '$lib/paraglide/messages';
	import { cn } from '$lib/utils';
</script>

<section class="hero-section bg-primary">
	<div
		class={cn(
			'flex flex-col',
			'min-h-[calc(100vh+8px)]',
			'gap-12 px-4 pt-24 pb-12',
			'sm:px-8 sm:pt-32',
			'md:px-6 md:pt-44!',
			'lg:-mt-40 lg:pt-48',
			'xl:flex-row xl:items-center xl:px-24',
			'2xl:gap-36'
		)}
	>
		<!-- Left content -->
		<div class="xl:w-1/2 flex flex-col gap-7 justify-start items-start">
			<h1
				class={cn(
					'font-baskerville font-bold',
					'text-4xl leading-11',
					'sm:leading-12',
					'md:text-5xl',
					'lg:leading-14',
					'xl:max-w-184.5',
					'2xl:leading-tight'
				)}
			>
				{m.home_hero_haedline1()} <br class="lg:block hidden"/>
				{m.home_hero_haedline2()}
			</h1>
			<p
				class={cn(
					'text-secondary-black',
					'text-xl md:text-2xl leading-8 sm:leading-10',
					'mb-6',
					'sm:mb-12',
					'xl:max-w-187'
				)}
			>
				{m.home_hero_paragraph()}
			</p>

			<AppButton text={m.home_hero_app_button()} href="/training" />
		</div>

		<!-- Right image -->
		<div class="xl:w-1/2">
			<img
				src="/images/hero-section/hero.webp"
				alt="Caregivers with patient"
				class="w-full h-auto rounded-lg"
			/>
		</div>
	</div>
</section>
