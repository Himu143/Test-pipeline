<script lang="ts">
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { forumManagerPostStore } from '$lib/stores/forum-post.svelte';
	import Post from './post.svelte';
	import { page } from '$app/state';
	import { FileX2 } from '@lucide/svelte';

	const postType = $derived.by(() => {
		return page.url.searchParams.get('type');
	});

	$effect(() => {
		if (postType) {
			forumManagerPostStore.getPosts(postType);
		}
	});
</script>

{#if forumManagerPostStore.status == 'loading'}
	<div class="my-12 flex w-full justify-center">
		<Spinner />
	</div>
{:else if forumManagerPostStore.status == 'success' || forumManagerPostStore.status == 'no-op'}
	{#if forumManagerPostStore.posts.length === 0}
		<div class="flex flex-col items-center justify-center gap-3 py-20 text-center rounded-2xl bg-white border border-gray-100 shadow-sm">
			<FileX2 class="h-12 w-12 text-gray-300" />
			<p class="text-base font-semibold text-gray-500">
				No {postType === 'pending' ? 'Pending' : 'Rejected'} Posts
			</p>
			<p class="text-sm text-gray-400">
				{postType === 'pending'
					? 'There are no posts waiting for review right now.'
					: 'No posts have been rejected yet.'}
			</p>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each forumManagerPostStore.posts as post}
				<Post {post} type={postType} />
			{/each}
		</div>
	{/if}
{/if}
