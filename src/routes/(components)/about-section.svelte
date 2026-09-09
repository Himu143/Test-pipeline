<script>
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import Title from '$lib/components/app/ui/title.svelte';
	import { m } from '$lib/paraglide/messages'
</script>

<section class="bg-secondary px-4 sm:px-8 md:px-6 xl:px-24">
	<div class="flex flex-col gap-2 pt-12 pb-8 sm:pt-16 sm:pb-12 md:pb-16 lg:pt-28">
		<Subtitle text={m.about_circle()} />
		<Title title1={m.home_about_tag_line1()} title2={m.home_about_tag_line2()} />
	</div>
	<div
		class="mx-auto flex flex-col items-center justify-center gap-8 pb-12 md:gap-36 2xl:flex-row 2xl:justify-between"
	>
		<div class="flex w-full items-center justify-center 2xl:w-1/2">
			<img
				src="/images/about-section/about.webp"
				alt="Caregiver assisting elderly person"
				class="h-auto max-h-144.25 w-full rounded-lg object-cover shadow-md"
			/>
		</div>
		<div
			class="flex w-full flex-col items-center justify-center gap-8 md:gap-28 2xl:w-1/2 2xl:justify-between"
		>
			<div class="font-poppins text-xl sm:text-2xl font-medium text-secondary-black md:text-3xl leading-10 sm:leading-12">
				{m.home_about_paragraph()}
			</div>
			<div class="flex flex-col gap-6 sm:flex-row md:gap-20 2xl:gap-16">
				{@render numberCardView({
					nubmerText: '300+',
					description: m.home_about_number_card1()
				})}

				{@render numberCardView({
					nubmerText: '80%',
					description: m.home_about_number_card2()
				})}
			</div>
		</div>
	</div>
</section>

{#snippet numberCardView(item)}
	<div
		class="border-primary bg-primary flex flex-1 flex-col items-center justify-center rounded-2xl border p-6 text-center shadow-sm md:p-8"
	>
		<div class="font-baskerville mb-3 text-4xl font-bold text-black md:text-5xl leading-16">
			{item.nubmerText}
		</div>
		<p class="font-poppins text-xl sm:text-2xl text-black ">
			{item.description}
		</p>
	</div>
{/snippet}
