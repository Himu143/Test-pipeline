<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { ChevronRight, Trash2 } from 'lucide-svelte';

	import type { ForumPost } from '$lib/types';
	import { Spinner } from '$lib/components/ui/spinner';
	import { forumManagerCommentStore } from '$lib/stores/forum-post.svelte';
	import { formatDate, getNamedAvatar } from '$lib/utils';
	import PostDetailsModal from '../posts/post-details-modal.svelte';
	import { CircleCheck } from '@lucide/svelte';

	type Props = {
		post: ForumPost;
		type: string | null;
	};

	let { post, type }: Props = $props();

	let approveLoading = $state(false);
	let rejectLoading = $state(false);
	let detailOpen = $state(false);
</script>

<div
	class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
>
	<!-- Top row: avatar + name + date + actions -->
	<div class="flex flex-wrap items-start justify-between gap-3 px-4 pt-4 pb-3 sm:px-5">
		<!-- Left: user info -->
		<div class="flex min-w-0 items-center gap-3">
			<Avatar.Root class="mt-1 h-10 w-10">
				<Avatar.Image src="/images/home/generic-avatar-bordered.svg" />
				<Avatar.Fallback class=" text-xs  lg:text-xl">
					<img src="/images/home/generic-avatar-bordered.svg" alt="user avatar" />
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="min-w-0">
				<p class="truncate text-sm font-semibold text-gray-900">{post.user_name}</p>
				<div class="mt-0.5 flex flex-wrap items-center gap-1.5">
					<span class="text-xs text-gray-400">{formatDate(post.created_at)}</span>
					{#if post.cohort_name}
						<span
							class="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-amber-700"
						>
							{post.cohort_name}
						</span>
					{/if}
				</div>
			</div>
		</div>

		<!-- Right: action buttons -->
		<div class="flex shrink-0 flex-wrap items-center gap-2">
			{#if type == 'pending'}
				<Button
					size="sm"
					class="h-8 rounded-sm bg-red-500 px-3 text-xs font-semibold text-white hover:bg-red-600 sm:px-4"
					onclick={async () => {
						rejectLoading = true;
						await forumManagerCommentStore.reject(post.id);
						rejectLoading = false;
					}}
					disabled={rejectLoading || approveLoading}
				>
					{#if rejectLoading}
						<Spinner class="h-3 w-3" />
					{:else}
						<span> <Trash2 /> </span> Reject
					{/if}
				</Button>
			{/if}
			<Button
				size="sm"
				class="h-8 rounded-sm! bg-green-500 px-3 text-xs font-semibold text-white hover:bg-green-600 sm:px-4"
				onclick={async () => {
					approveLoading = true;
					await forumManagerCommentStore.approve(post.id);
					approveLoading = false;
				}}
				disabled={approveLoading || rejectLoading}
			>
				{#if approveLoading}
					<Spinner class="h-3 w-3" />
				{:else}
					<span> <CircleCheck /> </span> Approve
				{/if}
			</Button>
		</div>
	</div>

	<!-- Content -->
	<div class="px-4 pb-2 sm:px-5">
		{#if post.channel_name}
			<span
				class="mb-2 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600"
			>
				{post.channel_name}
			</span>
		{/if}

		<p class="mt-1.5 line-clamp-4 text-sm leading-relaxed text-gray-600">{post.content}</p>
	</div>

	<!-- Footer: View Details -->
	<div class="flex items-center justify-end px-4 py-2.5 sm:px-5">
		<Button type="button" onclick={() => (detailOpen = true)} variant="secondary">
			View Details
			<ChevronRight class="h-3.5 w-3.5" />
		</Button>
	</div>
</div>

<PostDetailsModal bind:open={detailOpen} postId={post.parent_id || post.id} />
