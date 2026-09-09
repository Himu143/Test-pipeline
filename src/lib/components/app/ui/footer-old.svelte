<script lang="ts">
	const socialIcons = [
		{
			href: '#',
			background: '#f3e5bd',
			icon: '/images/footer/fb-icon.png',
			alt: 'fb-icon'
		},
		{
			href: '#',
			background: '#f3e5bd',
			icon: '/images/footer/x-icon.png',
			alt: 'x-icon'
		},
		{
			href: '#',
			background: '#f3e5bd',
			icon: '/images/footer/linkedIn-icon.png',
			alt: 'linkedin-icon'
		},
		{
			href: '#',
			background: '#f3e5bd',
			icon: '/images/footer/youtube-icon.png',
			alt: 'youtube-icon'
		}
	];
</script>

<footer class="bg-secondary px-4 py-8 pt-4 sm:px-8 sm:pt-12 md:px-6 xl:px-24">
	<div class="mx-auto mt-6 sm:mt-16 mb-8 w-full sm:mb-12 md:mb-20">
		<div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between lg:gap-20">
			<!-- Logo -->
			<div class="mb-8 w-[200px] shrink-0 md:mx-0 md:mb-0 lg:h-[95px] lg:w-auto">
				<a href="#" class="block h-full w-full">
					<img
						src="/images/footer/circle-final-footer-logo.png"
						alt="Footer Logo"
						class="h-full w-auto object-contain"
					/>
				</a>
			</div>

			<!-- Content -->
			<div class="max-w-[970px] flex-1">
				<div
					class="
                        grid grid-cols-1 gap-10
                        sm:grid-cols-2
                        lg:grid-cols-2
                        xl:grid-cols-3
                        xl:gap-20
                        2xl:gap-24
                    "
				>
					<!-- Languages -->
					<div class="sm:order-1 xl:order-1">
						<h6 class="font-poppins mb-5 text-[18px] font-bold text-[#404040]">Languages</h6>
						<div class="flex flex-col gap-[10px]">
							<a href="#" class="font-poppins text-[18px] font-medium text-[#404040]">English</a>
							<a href="#" class="font-poppins text-[18px] font-medium text-[#404040]">Spanish</a>
						</div>
					</div>

					<!-- Location (moves under Languages on SM and MD) -->
					<div class="sm:order-3 md:order-3 lg:order-3 xl:order-2">
						<h6 class="font-poppins mb-5 text-[18px] font-bold text-[#404040]">Location</h6>
						<p class="font-poppins text-[18px] leading-[27px] text-[#404040]">
							123 Demo Street<br />
							New York, NY 12345
						</p>
					</div>

					<!-- Contact + Social -->
					<div
						class="sm:order-2 sm:col-start-2 sm:row-span-2 md:row-span-2 lg:row-span-2 xl:order-3 xl:col-start-auto xl:row-span-1"
					>
						<div class="mb-10">
							<h6 class="font-poppins mb-5 text-[18px] font-bold text-[#404040]">Contact</h6>
							<div class="font-poppins text-[18px] leading-[27px] text-[#404040]">
								<a href="mailto:email@example.com" class="block">email@example.com</a>
								<a href="tel:(555)555-5555" class="block">(555) 555-5555</a>
							</div>
						</div>

						<div>
							<h3 class="font-poppins mb-[13px] text-[18px] font-bold text-[#404040]">
								Follow us on
							</h3>

							{@render socialIconsView(socialIcons)}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	{@render copyrightView()}
</footer>

{#snippet socialIconsView(icons)}
	<div
		class="
			flex flex-nowrap gap-5
			overflow-x-auto
			xl:overflow-visible
		"
	>
		{#each icons as icon}
			<a href={icon.href} class="flex h-12 w-12 items-center justify-center">
				<img src={icon.icon} alt={icon.alt} />
			</a>
		{/each}
	</div>
{/snippet}

{#snippet copyrightView()}
	<hr class="bg-primary h-[1px] w-full border-0" />

	<p
		class="font-poppins flex hidden items-center justify-center pt-4 text-center text-[16px] leading-[24px] font-medium text-[#404040] sm:block"
	>
		<span class="mr-1 text-[22px] leading-[26.4px] font-bold">©</span>
		2025 Powered by InNeed Intelligent Cloud. All rights reserved.
	</p>

	<p
		class="font-poppins flex items-center justify-center pt-4 text-center text-[16px] leading-[24px] font-medium text-[#404040] sm:hidden"
	>
		© 2025 Powered by InNeed Intelligent Cloud. All rights reserved.
	</p>
{/snippet}
