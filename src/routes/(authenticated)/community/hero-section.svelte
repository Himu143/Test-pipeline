<script lang="ts">
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import { Button } from '$lib/components/ui/button';
	import Title from '$lib/components/app/ui/title.svelte';
	import { getLatestCohortForumLink, cohortService } from '$lib/services/cohort';
	import { cohortUserStore } from '$lib/stores/cohort.svelte';
	import { authStore } from '$lib/stores/auth.svelte';

	import { m } from '$lib/paraglide/messages';

	$effect(() => {
		cohortUserStore.getUserCohorts(true);
	});

	const cohortForumLink = $derived.by(() => {
		return getLatestCohortForumLink(cohortUserStore.userCohorts);
	});

	let adminLatestLink = $state<string | null>(null);

	$effect(() => {
		const isAdmin = authStore.user?.role?.toLowerCase?.() === 'admin';

		if (
			isAdmin &&
			cohortUserStore.userCohortsStatus === 'success' &&
			!cohortUserStore.userCohorts.length
		) {
			const fetchLatestCohort = async () => {
				const resp = await cohortService.getCohorts();

				if (resp.status === 'success' && Array.isArray(resp.data) && resp.data.length) {
					adminLatestLink = getLatestCohortForumLink(resp.data) ?? null;
				}
			};

			fetchLatestCohort();
		}
	});

	const communityCards = $derived.by(() => {
		const isAdmin = authStore.user?.role?.toLowerCase?.() === 'admin';
		return [
			{
				title: m.community_public_title(),
				description: m.community_public_description(),
				image: '/images/community/public-community-logo.png',
				alt: m.community_public_title(),
				link: '/forum?channel=public',
				disabled: false
			},
			{
				title: m.community_cohort_title(),
				description: m.community_cohort_description(),
				image: '/images/community/batch-community-logo.png',
				alt: m.community_cohort_title(),
				link: cohortForumLink ?? (isAdmin ? (adminLatestLink ?? '#') : '#'),
				disabled:
					// admins always have access or get redirected to latest cohort
					isAdmin
						? false
						: cohortUserStore.userCohortsStatus === 'success' && cohortForumLink == null
			}
		];
	});
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 lg:-mt-40 xl:px-24">
	<div
		class="flex flex-col items-center gap-12 pt-16 sm:px-8 sm:pt-28 md:pt-40! lg:pt-44! xl:items-center 2xl:gap-20"
	>
		<div class="flex w-full flex-col items-center gap-8 text-center">
			<div class="flex flex-col items-center gap-2">
				<Subtitle
					text={m.community_sub()}
					class="text-center text-xl! font-medium! text-black"
				/>
				<Title
					title1={m.community_headline()}
					class="text-center leading-tight font-bold! text-black"
				/>
			</div>
			<p
				class="max-w-200 text-center font-poppins text-lg leading-relaxed font-medium text-secondary-black sm:text-xl md:text-xl"
			>
				{m.community_description()}
			</p>
			<section class="w-full bg-secondary py-4 sm:py-8">
				<div class="mx-auto flex flex-col items-center">
					<!-- Cards Section -->
					<div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
						{#each communityCards as item}
							{@render card(
								item.title,
								item.description,
								item.image,
								item.alt,
								item.link,
								item.disabled
							)}
						{/each}
					</div>
				</div>
			</section>
		</div>

		<div class="relative w-full overflow-hidden rounded-2xl">
			<div class="aspect-1642/652 w-full">
				<img
					src="/images/community/hero-1.webp"
					alt="Community Hero"
					class="h-full w-full object-cover"
				/>
			</div>
		</div>
	</div>
</section>

{#snippet card(
	title: string,
	description: string,
	image: string,
	alt: string,
	link: string,
	disabled: boolean
)}
	<div
		class="flex w-full flex-col items-center rounded-3xl border border-primary bg-white py-12 text-center"
	>
		<div class="mb-6 flex min-h-16 w-16 items-center justify-center rounded-full bg-primary">
			<img src={image} {alt} class="h-9 w-9 object-cover" />
		</div>
		<h2 class="mb-3 font-poppins text-2xl font-semibold text-black sm:text-3xl">
			{title}
		</h2>
		<p class="mb-8 px-4 font-poppins text-lg text-secondary-black sm:px-8 md:px-12 xl:px-20">
			{description}
		</p>
		<Button size="lg" class="px-8" href={link} {disabled}
			>{m.community_start_discussion()}</Button
		>
	</div>
{/snippet}
