<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { authService } from '$lib/services/auth';
	import { authStore } from '$lib/stores/auth.svelte';
	import { cn } from '$lib/utils';
	import { ChevronRight, ChevronDown } from '@lucide/svelte';

	let { children } = $props();

	let postsOpen = $state(false);
	let commentsOpen = $state(false);

	const currentPath = $derived(page.url.pathname);
	const currentType = $derived(page.url.searchParams.get('type'));

	// Auto-expand accordion sections based on current path
	$effect(() => {
		if (currentPath.includes('/forum-manager/posts')) {
			postsOpen = true;
		}
		if (currentPath.includes('/forum-manager/comments')) {
			commentsOpen = true;
		}
	});

	const postSubItems = [
		{ id: 'pending', name: 'Pending Posts', path: '/admin/forum-manager/posts?type=pending' },
		{ id: 'rejected', name: 'Rejected Posts', path: '/admin/forum-manager/posts?type=rejected' }
	];

	const commentSubItems = [
		{
			id: 'pending',
			name: 'Pending Comments',
			path: '/admin/forum-manager/comments?type=pending'
		},
		{
			id: 'rejected',
			name: 'Rejected Comments',
			path: '/admin/forum-manager/comments?type=rejected'
		}
	];

	const isCohortActive = $derived(
		currentPath === '/admin/cohort' || currentPath.startsWith('/admin/cohort/')
	);
	const isPostsActive = $derived(currentPath.includes('/forum-manager/posts'));
	const isCommentsActive = $derived(currentPath.includes('/forum-manager/comments'));

	onMount(async () => {
		const token = authService.getAccessToken();

		if (!token) {
			goto('/home');
			return;
		}

		await authStore.getProfile();

		const role = authStore.user?.role?.toLowerCase();

		if (role !== 'admin') {
			goto('/home');
		}
	});
</script>

<section class="bg-transparent px-4 pt-24 pb-12 sm:px-8 sm:pt-36 md:px-6 md:pt-44 lg:pt-8 xl:px-24">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
		<!-- Sidebar -->
		<aside class="">
			<div
				class="sticky top-6 overflow-hidden rounded-2xl border border-gray-100 bg-[#EBEAE8] shadow-sm"
			>
				<!-- Cohorts -->
				<a
					href="/admin/cohort"
					class={cn(
						'flex items-center justify-between border-b border-gray-100 px-5 py-4 text-base font-semibold transition-colors',
						isCohortActive ? 'bg-white' : 'hover:bg-gray-50'
					)}
					aria-current={isCohortActive ? 'page' : undefined}
				>
					<span>Cohorts</span>
					<ChevronRight class="h-4 w-4 text-gray-400" />
				</a>

				<!-- Posts Approval -->
				<div class="border-b border-gray-100">
					<button
						type="button"
						onclick={() => (postsOpen = !postsOpen)}
						class={cn(
							'flex w-full items-center justify-between px-5 py-4 text-base font-semibold transition-colors',
							isPostsActive ? 'bg-gray-50' : 'hover:bg-gray-50'
						)}
					>
						<span>Posts Approval</span>
						{#if postsOpen}
							<ChevronDown class="h-4 w-4 text-gray-400" />
						{:else}
							<ChevronRight class="h-4 w-4 text-gray-400" />
						{/if}
					</button>
					{#if postsOpen}
						<div class="pb-2">
							{#each postSubItems as sub}
								{@const isSubActive = isPostsActive && currentType === sub.id}
								<a
									href={sub.path}
									class={cn(
										'mx-2 mb-0.5 flex items-center justify-between rounded-xl px-5 py-2.5 text-sm font-medium transition-colors',
										isSubActive
											? 'bg-primary text-gray-500'
											: 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
									)}
									aria-current={isSubActive ? 'page' : undefined}
								>
									<span>{sub.name}</span>
									<ChevronRight
										class={cn(
											'h-3.5 w-3.5',
											isSubActive ? 'opacity-70' : 'opacity-40'
										)}
									/>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Comments Approval -->
				<div>
					<button
						type="button"
						onclick={() => (commentsOpen = !commentsOpen)}
						class={cn(
							'flex w-full items-center justify-between px-5 py-4 text-base font-semibold transition-colors',
							isCommentsActive ? 'bg-gray-50' : 'hover:bg-gray-50'
						)}
					>
						<span>Comments Approval</span>
						{#if commentsOpen}
							<ChevronDown class="h-4 w-4 text-gray-400" />
						{:else}
							<ChevronRight class="h-4 w-4 text-gray-400" />
						{/if}
					</button>
					{#if commentsOpen}
						<div class="pb-2">
							{#each commentSubItems as sub}
								{@const isSubActive = isCommentsActive && currentType === sub.id}
								<a
									href={sub.path}
									class={cn(
										'mx-2 mb-0.5 flex items-center justify-between rounded-xl px-5 py-2.5 text-sm font-medium transition-colors',
										isSubActive
											? 'bg-primary text-gray-500'
											: 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
									)}
									aria-current={isSubActive ? 'page' : undefined}
								>
									<span>{sub.name}</span>
									<ChevronRight
										class={cn(
											'h-3.5 w-3.5',
											isSubActive ? 'opacity-70' : 'opacity-40'
										)}
									/>
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</aside>

		<!-- Main content -->
		<main class="min-w-0">
			{@render children()}
		</main>
	</div>
</section>
