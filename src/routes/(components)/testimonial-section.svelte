<script lang="ts">
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import Autoplay from 'embla-carousel-autoplay';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';

	// Sample testimonial data
	// Testimonial data using translation functions
	const testimonials = $derived([
		{
			quote: m.testimonial_1_quote(),
			name: m.testimonial_1_name(),
			description: m.testimonial_1_description()
		},
		{
			quote: m.testimonial_2_quote(),
			name: m.testimonial_2_name(),
			description: m.testimonial_2_description()
		},
		{
			quote: m.testimonial_3_quote(),
			name: m.testimonial_3_name(),
			description: m.testimonial_3_description()
		},
		{
			quote: m.testimonial_4_quote(),
			name: m.testimonial_4_name(),
			description: m.testimonial_4_description()
		},
		{
			quote: m.testimonial_5_quote(),
			name: m.testimonial_5_name(),
			description: m.testimonial_5_description()
		}
	]);

	// Svelte 5 rune state for the Embla API
	let carouselApi = $state<CarouselAPI | undefined>(undefined);

	function scrollPrev() {
		carouselApi?.scrollPrev();
	}

	function scrollNext() {
		carouselApi?.scrollNext();
	}
</script>

<!-- Training Section -->
<section class="bg-secondary px-4 sm:px-8 md:px-6 xl:px-24">
	<div class="flex flex-col gap-8 pt-12 pb-8 sm:pt-16 sm:pb-12 md:pb-16 lg:pt-28">
		<!-- Testimonials Container -->
		<div class="flex flex-col items-start justify-start gap-12 xl:flex-row xl:gap-24">
			<!-- Left Section: Title and Description -->
			<div class="flex w-full flex-col items-start justify-start gap-4 sm:gap-6 lg:gap-7">
				<div class="flex flex-col items-start justify-start gap-2 sm:gap-2.5">
					<Subtitle text={m.testimonials()} class="flex justify-start" />
					<h2
						class="max-w-130 font-baskerville text-2xl leading-tight font-bold text-black sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-16 xl:text-5xl!"
					>
						{m.home_testimonial_headline()}
					</h2>
				</div>
				<!-- 
					<p
						class="max-w-150 font-poppins text-xl leading-relaxed font-medium text-neutral-700 sm:text-2xl lg:text-3xl lg:leading-11"
					>
						{m.home_testimonial_descirption()}

						todo: update translation key for testimonial description

						"home_testimonial_descirption": "Here you will find some words and experiences
						from caregivers who participated in the previous version of the program.",

						"home_testimonial_descirption":
						"Aquí encontrarán algunas palabras y experiencias de cuidadores que participaron en
						la versión anterior del programa."
					</p>
					-->
			</div>

			<!-- Right Section: Carousel -->
			<div class="w-full xl:w-1/2">
				<div class="relative">
					<Carousel.Root
						setApi={(emblaApi) => (carouselApi = emblaApi)}
						opts={{
							loop: true,
							align: 'start'
						}}
						plugins={[
							Autoplay({
								delay: 3000,
								stopOnMouseEnter: true
							})
						]}
						class="w-full"
					>
						<Carousel.Content class="-ml-4">
							{#each testimonials as testimonial, i}
								<Carousel.Item class="pl-4">
									{@render carouselItem(testimonial)}
								</Carousel.Item>
							{/each}
						</Carousel.Content>

						<!-- Fixed navigation buttons outside of carousel content -->
						<div
							class="absolute right-0 bottom-2 flex items-center justify-start gap-4 bg-secondary pt-3 pl-4 sm:-bottom-2 sm:gap-6 sm:pt-0 sm:pl-8"
						>
							<!-- Previous button -->
							<Button
								onclick={scrollPrev}
								type="button"
								aria-label="Previous testimonial"
								class="h-auto w-auto rounded-lg bg-primary p-2 hover:bg-primary/80 sm:p-3 lg:p-4"
							>
								<ArrowLeft color="black" />
							</Button>

							<!-- Next button -->
							<Button
								onclick={scrollNext}
								type="button"
								aria-label="Next testimonial"
								class="h-auto w-auto rounded-lg bg-primary p-2 hover:bg-primary/80 sm:p-3 lg:p-4"
							>
								<ArrowRight color="black" />
							</Button>
						</div>
					</Carousel.Root>
				</div>
			</div>
		</div>
	</div>
</section>

{#snippet carouselItem(testimonial: { quote: any; name: any; description: any })}
	<div
		class="flex min-h-100 flex-col items-start justify-between gap-8 sm:min-h-112.5 sm:gap-10 md:min-h-100 lg:min-h-132.75 lg:gap-12"
	>
		<!-- Quote section -->
		<div
			class="font-poppins text-xl leading-relaxed font-medium text-neutral-700 sm:text-2xl sm:leading-relaxed lg:text-3xl lg:leading-14 2xl:text-4xl"
		>
			"{testimonial.quote}"
		</div>

		<!-- Bottom section with name -->
		<div
			class="flex w-full flex-col items-start justify-start gap-5 bg-secondary sm:gap-6 lg:gap-7"
		>
			<!-- Divider line -->
			<div class="h-0.5 w-full bg-amber-200"></div>

			<!-- Name section -->
			<div class="flex max-w-60 flex-col items-start justify-start sm:max-w-127">
				<div class="justify-start">
					<span
						class="font-poppins text-lg font-bold text-neutral-700 sm:text-xl lg:text-2xl"
					>
						{testimonial.name}
					</span>
					<span
						class="ml-1 font-poppins text-lg font-normal text-neutral-700 sm:text-xl lg:text-2xl"
					>
						{testimonial.description}
					</span>
				</div>
			</div>
		</div>
	</div>
{/snippet}
