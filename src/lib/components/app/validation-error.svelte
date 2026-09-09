<script lang="ts">
	let { errors }: { errors: null | Array<any> } = $props();
</script>

<!-- 
if error has 'no-message' as message then error message will
not appear, only red will appear
-->
{#if errors && !errors.includes('no-message')}
	{#each errors as err}
		<span class="text-sm text-red-600">{err}</span>
	{/each}
{/if}
