<script lang="ts">
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { forumManagerCommentStore } from '$lib/stores/forum-post.svelte';
	import Comment from './comment.svelte';
	import { page } from '$app/state';
	import { MessageSquareOff } from '@lucide/svelte';

	const commentType = $derived.by(() => {
		return page.url.searchParams.get('type');
	});

	$effect(() => {
		if (commentType) {
			forumManagerCommentStore.getComments(commentType);
		}
	});
</script>

{#if forumManagerCommentStore.status == 'loading'}
	<div class="my-12 flex w-full justify-center">
		<Spinner />
	</div>
{:else if forumManagerCommentStore.status == 'success' || forumManagerCommentStore.status == 'no-op'}
	{#if forumManagerCommentStore.comments.length === 0}
		<div class="flex flex-col items-center justify-center gap-3 py-20 text-center rounded-2xl bg-white border border-gray-100 shadow-sm">
			<MessageSquareOff class="h-12 w-12 text-gray-300" />
			<p class="text-base font-semibold text-gray-500">
				No {commentType === 'pending' ? 'Pending' : 'Rejected'} Comments
			</p>
			<p class="text-sm text-gray-400">
				{commentType === 'pending'
					? 'There are no comments waiting for review right now.'
					: 'No comments have been rejected yet.'}
			</p>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each forumManagerCommentStore.comments as post}
				<Comment {post} type={commentType} />
			{/each}
		</div>
	{/if}
{/if}
