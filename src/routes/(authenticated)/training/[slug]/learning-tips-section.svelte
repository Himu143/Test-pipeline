<script>
	import { NotebookPen, Clock, CheckCircle } from 'lucide-svelte';

	let tips = [
		{
			id: 1,
			title: 'Take Notes',
			description: 'Download the PDF materials and keep notes as you progress through each module.',
			icon: NotebookPen,
			iconBg: 'bg-blue-100',
			iconColor: 'text-blue-600'
		},
		{
			id: 2,
			title: 'Set a Schedule',
			description: 'Dedicate regular time each week to ensure steady progress through the program.',
			icon: Clock,
			iconBg: 'bg-purple-100',
			iconColor: 'text-purple-600'
		},
		{
			id: 3,
			title: 'Apply What You Learn',
			description: 'Practice the techniques and strategies with your loved ones as you learn them.',
			icon: CheckCircle,
			iconBg: 'bg-green-100',
			iconColor: 'text-green-600'
		}
	];
</script>

<section class="bg-secondary px-4 py-8 sm:py-24 sm:px-8 md:px-6 xl:px-24">
	<div
		class="bg-primary mx-auto flex w-full flex-col items-center justify-center gap-12 rounded-2xl border border-purple-500/10 px-6 py-12 sm:px-12 lg:px-20"
	>
		<h2 class="font-baskerville text-3xl font-bold text-black sm:text-4xl">Learning Tips</h2>

		<div class="grid w-full grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20">
			{#each tips as tip}
				<div class="flex flex-col items-center gap-6 text-center">
					<div class={`flex h-12 w-12 items-center justify-center rounded-xl ${tip.iconBg}`}>
						<tip.icon class={`h-6 w-6 ${tip.iconColor}`} />
					</div>
					<div class="flex flex-col items-center gap-3">
						<h3 class="font-baskerville text-2xl font-bold text-black">{tip.title}</h3>
						<p class="font-poppins text-secondary-black text-2xl">
							{tip.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
