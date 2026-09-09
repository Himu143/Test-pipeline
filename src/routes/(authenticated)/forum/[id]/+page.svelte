<script>
	import { page } from '$app/state';
	import ForumPostSkeleton from '$lib/components/app/forum-post-skeleton.svelte';
	import { forumPostDetailStore, forumCommentsStore } from '$lib/stores/forum-post.svelte';
	import ForumPost from '../forum-post.svelte';

	$effect(() => {
		const id = page.params.id;
		if (id) {
			forumPostDetailStore.getPost(id);
			forumCommentsStore.getCommnets(id);
		}
	});
</script>

{#if forumPostDetailStore.status == 'loading'}
	<ForumPostSkeleton type="single" />
{:else if forumPostDetailStore.status == 'success' && forumPostDetailStore.post != null}
	<ForumPost post={forumPostDetailStore.post} detailView />
{/if}
