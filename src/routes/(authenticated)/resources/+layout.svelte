<script lang="ts">
	import { extarnalResourceCategoryStore } from '$lib/stores/extarnal-resource.svelte';

	let { children } = $props();

	$effect(() => {
		extarnalResourceCategoryStore.getAllCategories();
	});
</script>

{@render children?.()}
