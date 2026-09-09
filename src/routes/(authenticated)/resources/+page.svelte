<script>
	import SupportSection from '$lib/components/app/support-section.svelte';
	import HeroSection from './hero-section.svelte';
	import ResourceList from './resource-list.svelte';
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 lg:-mt-40 xl:px-24">
    <!-- hero -->
	<HeroSection />

	<ResourceList />
</section>


<SupportSection />
