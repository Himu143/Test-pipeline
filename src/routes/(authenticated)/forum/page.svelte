<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import ForumPostSkeleton from '$lib/components/app/forum-post-skeleton.svelte';
	import { forumPostStore } from '$lib/stores/forum-post.svelte';
	import { page } from '$app/state';
	import { forumChannelCategoryStore, forumChannelStore } from '$lib/stores/forum-channel.svelte';

	import ForumPost from './forum-post.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import PostDetailsModal from './post-details-modal.svelte';
	import { cohortDetailStore } from '$lib/stores/cohort.svelte';

	let postDetailDialog: { open: boolean; postId: null | string } = $state({
		open: false,
		postId: null
	});

	const activeChannel = $derived.by(() => {
		const channelSlug = page.url.searchParams.get('channel');

		if (channelSlug) {
			return forumChannelStore.getActiveChannel(channelSlug);
		}
	});

	const activeTopic = $derived.by(() => {
		const slug = page.url.searchParams.get('topic');

		if (slug) {
			return forumChannelCategoryStore.categories.find((item) => item.slug == slug);
		}
	});

	$effect(() => {
		if (activeChannel) {
			if (activeTopic) {
				forumPostStore.getPosts(activeChannel.slug, activeTopic?.slug);
			} else {
				forumPostStore.getPosts(activeChannel.slug);
			}
			cohortDetailStore.getCohort(activeChannel.slug);
		}
	});
</script>

{#if forumPostStore.status == 'loading'}
	<ForumPostSkeleton type="list" />
{:else if forumPostStore.status == 'success'}
	{#each forumPostStore.posts as post}
		<ForumPost
			{post}
			channelSlug={activeChannel?.slug}
			onViewDetailClick={(postId) => {
				postDetailDialog.open = true;
				postDetailDialog.postId = postId;
			}}
		/>
	{/each}
{/if}

{#if forumPostStore.nextCursor}
	<div class="flex items-center justify-center">
		<Button
			variant="outline"
			class="rounded-sm border-solid-primary hover:bg-primary"
			onclick={() => {
				if (activeChannel) {
					if (activeTopic) {
						forumPostStore.loadMorePost(activeChannel.slug, activeTopic.slug);
					} else {
						forumPostStore.loadMorePost(activeChannel.slug);
					}
				}
			}}
			disabled={forumPostStore.loadMoreStatus == 'loading'}
		>
			{#if forumPostStore.loadMoreStatus == 'loading'}
				<Spinner /> {m.forum_loading()}
			{:else}
				{m.forum_load_more()}
				<ChevronDown />
			{/if}
		</Button>
	</div>
{/if}

<PostDetailsModal
	bind:open={postDetailDialog.open}
	postId={postDetailDialog.postId}
	channelId={activeChannel?.id}
/>
