<script lang="ts">
	let {
		text,
		class: className = ''
	}: {
		text: string;
		class?: string;
	} = $props();
</script>

<h2
	class={`font-poppins text-center text-xl sm:text-2xl leading-normal font-medium text-black uppercase ${className}`}
>
	{text}
</h2>
