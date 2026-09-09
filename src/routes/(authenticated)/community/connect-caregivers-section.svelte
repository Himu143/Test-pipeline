<script lang="ts">
	import Title from '$lib/components/app/ui/title.svelte';
	import { Button } from '$lib/components/ui/button';
	import { m } from '$lib/paraglide/messages';

	const features = [
		{
			title: m.community_feature_journey_title(),
			description: m.community_feature_journey_description(),
			image: '/images/community/journey-icon.png'
		},
		{
			title: m.community_feature_moderation_title(),
			description: m.community_feature_moderation_description(),
			image: '/images/community/badge-icon.png'
		},
		{
			title: m.community_feature_anonymous_title(),
			description: m.community_feature_anonymous_description(),
			image: '/images/community/anonymous-icon.png'
		}
	];
</script>

<section
	id="connect-caregivers-section"
	class="bg-secondary px-4 py-8 sm:px-8 sm:py-20 md:px-6 xl:px-24"
>
	<div class="mx-auto flex max-w-430 flex-col gap-18">
		<!-- Header Section -->
		<div class="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
			<div class="flex flex-col gap-16 lg:flex-row lg:gap-24 2xl:gap-60">
				<Title
					title1={m.community_connect_caregivers_title1()}
					title2={m.community_connect_caregivers_title2()}
					class="text-left leading-tight font-bold! text-black 2xl:whitespace-nowrap"
				/>
				<p
					class="font-poppins text-xl leading-relaxed font-medium text-secondary-black sm:text-2xl md:text-3xl"
				>
					{m.community_connect_caregivers_description()}
				</p>
			</div>
		</div>

		<!-- Cards Grid -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-3">
			{#each features as feature}
				{@render featureCard(feature.title, feature.description, feature.image)}
			{/each}
		</div>
	</div>
</section>

{#snippet featureCard(title: string, description: string, image: string)}
	<div>
		<div
			class="flex flex-col items-center gap-6 rounded-[20px] border border-primary bg-white p-6 text-center"
		>
			<div class="flex min-h-72 flex-col items-center justify-center gap-6">
				<div class="flex h-15 w-15 items-center justify-center rounded-full bg-primary">
					<div class="h-9 w-9 overflow-hidden">
						<img src={image} alt={title} class="h-full w-full object-cover" />
					</div>
				</div>
				<div class="flex flex-col items-center gap-3">
					<h3 class="font-poppins text-2xl font-semibold text-black sm:text-3xl">
						{title}
					</h3>
					<p class="font-poppins text-lg text-secondary-black sm:text-xl md:text-2xl">
						{description}
					</p>
				</div>
			</div>
		</div>
	</div>
{/snippet}
