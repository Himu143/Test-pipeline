<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	type Props = {
		text: string;
		href: string;
	};

	let { text, href }: Props = $props();
</script>

<Button
	{href}
	class={cn(
		'max-w-88 h-15',
		'flex items-center justify-end',
		'p-[4px_5px_4px_16px]',
		'rounded-4xl bg-black hover:bg-black',
	)}
>
	<div
		class={cn(
			'flex items-center',
			'max-w-75'
		)}
	>
		<span
			class={cn(
				'font-poppins',
				'text-xl font-medium leading-8 px-4',
				'text-white whitespace-nowrap'
			)}
		>
			{text}
		</span>

		<div
			class={cn(
				'flex items-center justify-center',
				'h-13 w-13',
				'rounded-full',
				'bg-primary'
			)}
		>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div
				class="h-8 w-8 bg-cover bg-center"
				style="background-image: url('/images/hero-section/arrow-up-right-icon.png');"
			/>
		</div>
	</div>
</Button>
