<script lang="ts">
	import clsx from 'clsx';

	let { cols = 3, gap = 1, children } = $props();

	let classes = clsx(
		'grid',
		'grid-cols-1',
		`gap-${gap}`,
        'mt-4',
		cols == 2 && ['sm:grid-cols-2'],
		cols == 3 && ['sm:grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-3'],
		cols == 4 && ['sm:grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4'],
        cols == 5 && ['sm:grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', '2xl:grid-cols-5'],
        cols == 6 && ['sm:grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', '2xl:grid-cols-6']
	);
</script>

<div class={classes}>
	{@render children?.()}
</div>
