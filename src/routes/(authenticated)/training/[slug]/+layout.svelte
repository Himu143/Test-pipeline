<script>
	import LearningTipsSection from './learning-tips-section.svelte';

	let { children } = $props();
</script>

{@render children?.()}

<LearningTipsSection />
