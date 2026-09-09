<!-- title.svelte -->
<script lang="ts">
	let {
		title1,
		title2,
		title3,
		class: className = ''
	}: {
		title1: string;
		title2?: string;
		title3?: string;
		class?: string;
	} = $props();
</script>

<h1
	class={`font-baskerville text-center text-3xl font-bold text-black sm:text-4xl md:text-5xl sm:leading-16 ${className}`}
>
	{title1} <br class="hidden 2xl:block" />
	{#if title2}
		{title2}
		<br class="hidden 2xl:block" />
	{/if}
	{#if title3}
		{title3}
	{/if}
</h1>
