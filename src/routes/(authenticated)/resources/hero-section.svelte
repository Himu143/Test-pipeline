<script>
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import Title from '$lib/components/app/ui/title.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<div class="flex items-center pt-16 sm:pt-28 md:pt-40! lg:pt-44!">
	<div class="flex w-full flex-col gap-4 2xl:gap-8">
		<div class="flex flex-col xl:gap-1 2xl:gap-3">
			<Subtitle text={m.resources_sub()} class="text-center text-xl! font-medium! text-black" />
			<Title
				title1={m.resources_title1()}
				class="text-center leading-tight font-bold! text-black"
			/>
		</div>

		<div class="flex w-full justify-center">
			<p
				class="max-w-200 text-center font-poppins text-lg leading-relaxed font-medium text-secondary-black sm:text-xl md:text-xl"
			>
				{m.resources_description()}
			</p>
		</div>
	</div>
</div>
