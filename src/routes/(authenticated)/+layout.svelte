<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth.svelte';
	import { bookmarkStore } from '$lib/stores/bookmark.svelte';
	import { cohortUserStore } from '$lib/stores/cohort.svelte';

	let { children } = $props();

	$effect(() => {
		if (!authStore.isLoggedin) {
			goto('/auth/sign-in');
		} else {
			bookmarkStore.getBookmarks();
			cohortUserStore.getUserCohorts();
			authStore.getProfile();
		}
	});
</script>

{#if authStore.isLoggedin}
	{@render children?.()}
{/if}
