<script lang="ts">
	import MemberCard from '$lib/components/app/member-card.svelte';
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import Title from '$lib/components/app/ui/title.svelte';
	import { m } from '$lib/paraglide/messages';

	const tabs = [
		m.study_team_tab_research_team(),
		m.study_team_tab_research_staff(),
		m.study_team_tab_system_team()
	] as const;
	let activeTab = $state<(typeof tabs)[number]>(m.study_team_tab_research_team());

	// Placeholder data using the hero image
	const memberImage = '/images/hero-section/hero-image.png';
	const logoImage = '/images/team-section/ut-health-logo.png';

	// Data structure for each tab
	const tabData = {
		[m.study_team_tab_research_team()]: {
			featured: {
				name: m.study_team_research_team_featured_name(),
				title: m.study_team_research_team_featured_title(),
				image: '/images/team-section/bianca-shieu.png',
				logo: logoImage,
				description: [
					m.study_team_research_team_featured_desc1(),
					m.study_team_research_team_featured_desc2()
				]
			},
			members: [
				{
					id: 1,
					name: m.study_team_research_team_member1_name(),
					title: m.study_team_research_team_member1_title(),
					image: '/images/team-section/dr-lixin-song.png',
					logo: logoImage
				},
				{
					id: 2,
					name: m.study_team_research_team_member2_name(),
					title: m.study_team_research_team_member2_title(),
					image: '/images/team-section/roxana-delgado.png',
					logo: logoImage
				},
				{
					id: 3,
					name: m.study_team_research_team_member3_name(),
					title: m.study_team_research_team_member3_title(),
					image: '/images/team-section/biostatistician-bianca-shieu.png',
					logo: logoImage
				}
			]
		},
		[m.study_team_tab_research_staff()]: {
			featured: {
				name: m.study_team_research_staff_featured_name(),
				title: m.study_team_research_staff_featured_title(),
				image: '/images/team-section/Male - Researcher 01.png',
				logo: logoImage,
				description: [
					m.study_team_research_staff_featured_desc1(),
					m.study_team_research_staff_featured_desc2()
				]
			},
			members: [
				{
					id: 1,
					name: m.study_team_research_staff_member1_name(),
					title: m.study_team_research_staff_member1_title(),
					image: '/images/team-section/Female - Researcher 01.png',
					logo: logoImage
				},
				{
					id: 2,
					name: m.study_team_research_staff_member2_name(),
					title: m.study_team_research_staff_member2_title(),
					image: '/images/team-section/Female-Researcher.png',
					logo: logoImage
				},
				{
					id: 3,
					name: m.study_team_research_staff_member3_name(),
					title: m.study_team_research_staff_member3_title(),
					image: '/images/team-section/Male-Researcher.png',
					logo: logoImage
				}
			]
		},
		[m.study_team_tab_system_team()]: {
			featured: {
				name: m.study_team_system_team_featured_name(),
				title: m.study_team_system_team_featured_title(),
				image: '/images/team-section/system-team/samim-ashrafi.png',
				logo: [
					{
						image: '/images/team-section/system-team/InNeedLogo-White.png',
						link: 'https://inneed.ai'
					},
					{
						image: '/images/team-section/system-team/linkedin-Logo.png',
						link: 'https://www.linkedin.com/in/shamimashrafi/'
					}
				],
				description: [
					m.study_team_system_team_featured_desc1(),
					m.study_team_system_team_featured_desc2()
				]
			},
			members: [
				{
					id: 1,
					name: m.study_team_system_team_member1_name(),
					title: m.study_team_system_team_member1_title(),
					image: '/images/team-section/system-team/shaman-sharif.jpg',
					logo: [
						{
							image: '/images/team-section/system-team/InNeedLogo-White.png',
							link: 'https://inneed.ai'
						},
						{
							image: '/images/team-section/system-team/linkedin-Logo.png',
							link: 'https://www.linkedin.com/in/shamansharif/'
						}
					]
				},
				{
					id: 2,
					name: m.study_team_system_team_member2_name(),
					title: m.study_team_system_team_member2_title(),
					image: '/images/team-section/system-team/mahdi-bakhtiar.png',
					logo: [
						{
							image: '/images/team-section/system-team/InNeedLogo-White.png',
							link: 'https://inneed.ai'
						},
						{
							image: '/images/team-section/system-team/linkedin-Logo.png',
							link: 'https://www.linkedin.com/in/mahdi-bakhtiar/'
						}
					]
				},
				{
					id: 3,
					name: m.study_team_system_team_member3_name(),
					title: m.study_team_system_team_member3_title(),
					image: '/images/team-section/system-team/prodipto-archo.png',
					logo: [
						{
							image: '/images/team-section/system-team/InNeedLogo-White.png',
							link: 'https://inneed.ai'
						},
						{
							image: '/images/team-section/system-team/linkedin-Logo.png',
							link: 'https://www.linkedin.com/in/prodipto-orcho/'
						}
					]
				}
			]
		}
	};

	// Get current tab data
	$effect(() => {
		// This will re-run when activeTab changes
		activeTab;
	});
</script>

<section id="study-team-section" class="bg-secondary px-4 pt-28 pb-40 sm:px-8 md:px-6 xl:px-24">
	<div class="flex flex-col items-center gap-4 text-center">
		<Subtitle text={m.study_team_study_team_sub()} />
		<Title title1={m.study_team_study_team_title1()} />
	</div>

	<!-- Tabs -->
	<div
		class="mt-16 flex flex-wrap justify-center gap-8 border-b border-gray-300 pb-4 sm:justify-start sm:gap-12"
	>
		{#each tabs as tab}
			<button
				class="cursor-pointer font-poppins text-xl font-medium transition-colors hover:text-black md:text-2xl {activeTab ===
				tab
					? '-mb-4 border-b-2 border-black pb-4 text-black'
					: ''}"
				onclick={() => (activeTab = tab)}
			>
				{tab}
			</button>
		{/each}
	</div>

	<!-- Content -->
	<div class="mt-12 flex flex-col gap-16">
		<!-- Featured Member (only for Research Team) -->
		{#if tabData[activeTab].featured}
			<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-28">
				<!-- Card -->
				<div class="relative h-137 w-full max-w-132 shrink-0 sm:min-h-full">
					<!-- Background gradient container -->
					<div
						class="absolute inset-0 flex items-center justify-center rounded-[20px] border-4 border-primary"
					>
						<!-- Profile Image -->
						<div
							class="h-full w-full rounded-2xl bg-cover bg-center bg-no-repeat"
							style="background-image: url('{tabData[activeTab].featured.image}')"
							role="img"
							aria-label="Portrait of {tabData[activeTab].featured.name}"
						></div>
					</div>
					<!-- Info Card -->
					<div
						class="absolute bottom-4 left-1/2 w-[calc(100%-32px)] -translate-x-1/2 rounded-xl bg-white px-4 py-4 shadow-lg"
					>
						<div class="flex items-center justify-between gap-2">
							<div class="flex min-w-0 flex-1 flex-col">
								<h3
									class="truncate font-poppins text-xl font-semibold text-black sm:text-2xl"
								>
									{tabData[activeTab].featured.name}
								</h3>
								<p
									class="truncate font-poppins text-lg font-normal text-black sm:text-xl"
								>
									{tabData[activeTab].featured.title}
								</p>
							</div>
							{#if tabData[activeTab].featured?.logo}
								<div class="flex shrink-0 items-center gap-3">
									{#if Array.isArray(tabData[activeTab].featured.logo)}
										{#each tabData[activeTab].featured.logo.slice(0, 2) as item}
											<a
												href={item.link}
												target="_blank"
												rel="noopener noreferrer"
											>
												<div
													class="h-16 w-18 bg-contain bg-center bg-no-repeat hover:opacity-80"
													style="background-image:url('{item.image}')"
												></div>
											</a>
										{/each}
									{:else}
										<div
											class="h-15 w-34 bg-contain bg-center bg-no-repeat"
											style="background-image:url('{tabData[activeTab]
												.featured.logo}')"
										></div>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Description -->
				<div
					class="flex flex-col gap-6 text-xl leading-normal text-secondary-black sm:text-2xl md:text-3xl md:leading-11"
				>
					{#each tabData[activeTab].featured.description as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Grid -->
		<div class="grid grid-cols-1 place-items-center gap-16 lg:grid-cols-2 2xl:grid-cols-3">
			{#each tabData[activeTab].members as member (member.id)}
				<MemberCard
					image={member.image}
					name={member.name}
					jobTitle={member.title}
					logo={member.logo}
				/>
			{/each}
		</div>
	</div>
</section>
