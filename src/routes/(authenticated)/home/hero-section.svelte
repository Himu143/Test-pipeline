<script>
// @ts-nocheck

	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import Title from '$lib/components/app/ui/title.svelte';
	import { cn } from '$lib/utils';
	import { m } from '$lib/paraglide/messages';
</script>

<section
	class={cn(
		'bg-secondary',
		'px-4',
		'py-12',
		'sm:px-8',
		'md:px-6',
		'lg:-mt-40',
		'xl:px-24'
	)}
>
	<div
		class={cn(
			'flex',
			'flex-col-reverse',
			'items-center',
			'gap-12',
			'pt-16',
			'sm:pt-28',
			'md:pt-40!',
			'xl:flex-row',
			'xl:items-center',
			'xl:justify-between',
			'xl:pt-56!',
			'xl:items-start',
			'2xl:gap-36'
		)}
	>
		<!-- Card Section (Left on Desktop, Bottom on Mobile) -->
		<div
			class={cn(
				'relative',
				'h-112',
				'w-full',
				'max-w-107',
				'sm:h-137',
				'sm:max-w-146'
			)}
		>
			<!-- Background gradient container -->
			<div
				class={cn(
					'border-primary',
					'absolute',
					'inset-0',
					'flex',
					'items-start',
					'justify-center',
					'rounded-[20px]',
					'border-4'
				)}
			>
				<!-- Profile Image -->
				<div
					class={cn(
						'h-full ',
						'w-full ',
						'rounded-2xl',
						'bg-cover',
						'bg-center',
						'bg-no-repeat'
					)}
					style="background-image: url('/images/hero-section/hero-image.png')"
					role="img"
					aria-label="Portrait of Dr. Carole White"
				></div>
			</div>

			<!-- Info Card at bottom -->
			<div
				class={cn(
					'absolute',
					'bottom-4',
					'left-1/2',
					'w-[calc(100%-38px)]',
					'2xl:max-w-123',
					'-translate-x-1/2',
					'rounded-xl',
					'bg-white',
					'px-4',
					'py-4',
					'shadow-lg',
					'sm:px-7',
					'sm:py-6'
				)}
			>
				<div
					class={cn(
						'flex',
						'items-center',
						'justify-between',
						'gap-2',
						'sm:gap-4'
					)}
				>
					<!-- Text Content -->
					<div class={cn('flex', 'min-w-0', 'flex-1', 'flex-col', 'gap-1')}>
						<h3
							class={cn(
								'font-poppins',
								'truncate',
								'text-lg',
								'leading-tight',
								'font-semibold',
								'text-black',
								'sm:text-2xl'
							)}
						>
							{m.study_team_hero_image_name()}
						</h3>
						<p
							class={cn(
								'font-poppins',
								'truncate',
								'text-sm',
								'text-black',
								'sm:text-xl'
							)}
						>
							{m.study_team_hero_image_degination()}
						</p>
					</div>

					<!-- Logo -->
					<div
						class={cn(
							'h-8',
							'w-20',
							'shrink-0',
							'bg-contain',
							'bg-center',
							'bg-no-repeat',
							'sm:h-14',
							'sm:w-32'
						)}
						style="background-image: url('/images/team-section/ut-health-logo.png')"
						role="img"
						aria-label="UT Health Logo"
					></div>
				</div>
			</div>
		</div>

		<!-- Text Section (Right on Desktop, Top on Mobile) -->
		<div class={cn('flex', 'flex-col', 'items-start', 'gap-6', 'text-left', 'xl:max-w-[60%]')}>
			<div class={cn('flex', 'flex-col', 'items-start', 'gap-2')}>
				<Subtitle text={m.study_team_hero_sub()} class="text-left" />
				<Title
					title1="{m.study_team_hero_title1()}"
					class="text-left"
				/>
			</div>

			<div
				class={cn(
					'flex',
					'flex-col',
					'gap-6',
					'text-xl',
					'leading-normal',
					'text-black/70',
					'sm:text-2xl',
					'md:text-3xl'
				)}
			>
				<p>
					{m.study_team_hero_description()}
				</p>
			</div>
		</div>
	</div>
</section>
