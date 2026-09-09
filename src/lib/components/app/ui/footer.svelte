<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';

	const quickLinks = $derived([
		{ label: m.footer_link_study_team(), href: '/home#study-team-section' },
		{ label: m.footer_link_training(), href: '/training' },
		{ label: m.footer_link_community(), href: '/community' },
		{ label: m.footer_link_resources(), href: '/resources' }
	]);

	const languages = $derived([
		{ label: m.footer_lang_english(), value: 'en' },
		{ label: m.footer_lang_spanish(), value: 'es' }
	]);

	const socialIcons = [
		{
			href: '#',
			icon: '/images/footer/fb-icon.png',
			alt: 'Facebook'
		},
		{
			href: '#',
			icon: '/images/footer/x-icon.png',
			alt: 'X (Twitter)'
		},
		{
			href: '#',
			icon: '/images/footer/linkedIn-icon.png',
			alt: 'LinkedIn'
		},
		{
			href: '#',
			icon: '/images/footer/youtube-icon.png',
			alt: 'YouTube'
		}
	];
</script>

<footer class="bg-secondary px-4 py-8 pt-4 sm:px-8 sm:pt-12 md:px-6 xl:px-24">
	<div class="mx-auto mt-6 mb-8 w-full sm:mt-16 sm:mb-12 md:mb-20">
		<!-- Main Content -->
		<div class="mb-16 flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
			<!-- Left Section: Disclaimer -->
			<div class="flex-1">
				<h2 class="mb-5 font-poppins text-xl font-bold text-gray-700">
					{m.footer_title()}
				</h2>
				<div
					class="space-y-4 font-poppins text-xl leading-normal font-normal text-secondary-black lg:max-w-4xl"
				>
					<p>
						{m.footer_description1()}
					</p>
					<p>
						{m.footer_description2()}
					</p>
					<p>
						{m.footer_description3()}
					</p>
					<p>
						{m.footer_description4()}
					</p>
				</div>
				<div class="flex-1 pt-6 lg:max-w-6xl">
					<div
						class="font-poppins text-xl leading-normal font-semibold text-secondary-black"
					>
						<p>
							{m.footer_description5()}
						</p>
					</div>
				</div>
			</div>

			<!-- Right Section: Logo and Links -->
			<div class="flex flex-col gap-12 lg:w-80 xl:w-96">
				<!-- Logo -->
				<div class="flex justify-start lg:justify-end">
					<a href="#" class="block">
						<img
							src="/images/footer/circle-final-footer-logo.png"
							alt="Circle Caregiver's Platform"
							class="h-20 w-auto object-contain lg:h-24"
						/>
					</a>
				</div>

				<!-- Quick Links and Languages -->
				<div class="flex gap-16 sm:gap-20 lg:justify-end">
					<!-- Quick Links -->
					<div>
						<h3 class="mb-5 font-poppins text-lg font-bold text-gray-700">
							{m.footer_quick_links()}
						</h3>
						<ul class="space-y-2.5">
							{#each quickLinks as link}
								<li>
									<a
										href={link.href}
										class="font-poppins text-lg font-medium text-gray-700 transition-colors hover:text-gray-900"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Languages -->
					<div>
						<h3 class="mb-5 font-poppins text-lg font-bold text-gray-700">
							{m.footer_languages()}
						</h3>
						<ul class="space-y-2.5">
							{#each languages as language}
								<li>
									<button
										class="font-poppins text-lg cursor-pointer font-medium text-gray-700 hover:text-gray-900"
										onclick={() => setLocale(language.value as 'en' | 'es')}
									>
										{language.label}
									</button>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="space-y-4 border-t border-gray-300 pt-4">
			<p class="text-center font-poppins text-base font-medium text-gray-700">
				<span class="text-xl font-bold">©</span>
				{m.footer_copyright()}
			</p>
		</div>
	</div>
</footer>
