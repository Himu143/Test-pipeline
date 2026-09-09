<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { Toaster } from 'svelte-sonner';
	import { page } from '$app/state';

	import Navbar from '$lib/components/app/ui/navbar.svelte';
	import Footer from '$lib/components/app/ui/footer.svelte';

	let isAuthPage = $derived(page.url.pathname.startsWith('/auth'));

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<div class="relative">
		{#if !isAuthPage}
			<div class="sticky top-0 z-50 bg-secondary md:bg-transparent">
				<div class="lg:px-6 xl:px-24 ">
					<Navbar />
				</div>
			</div>
		{/if}
		{@render children()}
	</div>
</QueryClientProvider>

{#if !isAuthPage}
	<Footer />
{/if}

<Toaster position="top-right" richColors />
