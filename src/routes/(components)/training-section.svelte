<script lang="ts">
	import AppButton from '$lib/components/app/app-button.svelte';
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import Title from '$lib/components/app/ui/title.svelte';
	import { m } from '$lib/paraglide/messages'
</script>

<!-- Training Section -->
<section id="training-section" class="bg-primary px-4 sm:px-8 md:px-6 xl:px-24">
	<div class="flex flex-col gap-2 pt-12 pb-8 sm:pt-16 sm:pb-12 md:pb-16 lg:pt-28">
		<div
			class="flex flex-col items-center gap-6 lg:grid lg:grid-cols-7 lg:items-center lg:gap-8 xl:gap-12"
		>
			<!-- Left Side Image (Desktop only) -->
			<div class="hidden lg:col-span-2 lg:flex lg:flex-col lg:gap-4">
				<img
					class="h-auto w-full object-contain"
					src="/images/training-section/left-patient-1.webp"
					alt="Caregiver helping senior"
				/>
			</div>

			<!-- Center Content -->
			<div
				class="order-1 flex w-full flex-col gap-4 text-start lg:order-0 lg:col-span-3 lg:gap-6 lg:text-center"
			>
				<div class="flex flex-col gap-2 px-4 lg:gap-3 lg:px-0">
					<Subtitle
						text={m.training()}
						class="text-start lg:text-center!"
					/>
					<Title
						title1={m.home_training_headline1()}
						title2={m.home_training_headline2()}
						class="text-start! lg:text-center!"
					/>
				</div>

				<p
					class="font-poppins px-4 text-xl leading-relaxed font-normal text-neutral-800 lg:mx-auto lg:max-w-lg lg:px-0 sm:text-2xl lg:font-medium lg:text-gray-700 md:text-3xl"
				>
					{m.home_training_description()}
				</p>

				<!-- Button -->
				<div class="mt-2 flex justify-start px-4 lg:mt-4 lg:justify-center lg:px-0">
					<AppButton text={m.home_training_app_button()} href="/training" />
				</div>
			</div>

			<!-- Right Side Image (Desktop only) -->
			<div class="hidden lg:col-span-2 lg:flex lg:flex-col lg:gap-4">
				<img
					class="h-auto w-full object-cover"
					src="/images/training-section/right-patient-1.webp"
					alt="Senior care"
				/>
			</div>

			<!-- Mobile Images (Mobile only) -->
			<div class="order-2 mt-8 w-full gap-3 px-2 sm:gap-4 lg:hidden">
				<img
					class="justify-center object-contain w-full"
					src="/images/training-section/mobile-both.webp"
					alt="Caregiver helping senior"
				/>
			</div>
		</div>
	</div>
</section>
