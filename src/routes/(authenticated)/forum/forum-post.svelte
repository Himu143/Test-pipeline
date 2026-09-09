<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Heart, MessageCircle, ChevronRight } from 'lucide-svelte';

	import type { ForumPost } from '$lib/types';
	import { forumPostStore } from '$lib/stores/forum-post.svelte';
	import PostDetailsModal from './post-details-modal.svelte';
	import { m } from '$lib/paraglide/messages';

	import { formatDistanceToNow } from 'date-fns';
	import { Item } from '$lib/components/ui/accordion';
	import { getNamedAvatar } from '$lib/utils';
	interface Props {
		post: ForumPost;
		detailView?: boolean;
		channelSlug?: string;
		onViewDetailClick: (postId: string) => void;
	}

	let { post, detailView = false, channelSlug, onViewDetailClick }: Props = $props();

	let showDetailsModal = $state(false);

	function likePost(postId: string) {
		// Prevent modal open when clicking like
		forumPostStore.likePost(postId);
	}

	function openDetails() {
		showDetailsModal = true;
	}
</script>

<Card.Root
	class="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
>
	<Card.Header class="px-6 pt-5 pb-3">
		<div class="flex items-start justify-between">
			<div class="flex items-center gap-3">
				<Avatar.Root class="mt-1 h-10 w-10">
					<Avatar.Image src="/images/home/generic-avatar-bordered.svg" />
					<Avatar.Fallback class=" text-xs  lg:text-xl">
						<img src="/images/home/generic-avatar-bordered.svg" alt="user avatar" />
					</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col">
					<div class="text-base font-bold text-slate-900">{post.user_name}</div>
					<div class="text-xs font-medium text-slate-500">
						<!-- 12m ago <span class="mx-1 text-slate-300">|</span> Today -->
						{formatDistanceToNow(new Date(`${post.created_at}Z`), { addSuffix: true })}
					</div>
				</div>
			</div>
		</div>
	</Card.Header>
	<Card.Content class="px-6 pb-6">
		<!-- Title -->
		<h4 class="mb-3 text-lg leading-tight font-bold text-slate-900">
			{post.header}
		</h4>

		<!-- Content Preview (Truncated) -->
		<p class="mb-6 line-clamp-3 text-base leading-relaxed text-slate-600 lg:text-lg">
			{post.content}
		</p>

		<!-- Footer / Stats & Action -->
		<div class="mt-auto flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<!-- Likes Pill -->
				<button
					onclick={() => forumPostStore.likePost(post.id)}
					class="flex items-center gap-2 rounded-full bg-gray-100/80 px-4 py-2 transition-colors hover:bg-gray-200"
				>
					<Heart class="h-4 w-4 fill-yellow-400 text-yellow-500" fill="currentColor" />
					<span class="text-xs font-bold text-slate-700">{post.care_count}</span>
				</button>

				<!-- Comments Pill -->
				<button
					class="flex items-center gap-2 rounded-full bg-gray-100/80 px-4 py-2 transition-colors hover:bg-gray-200"
					onclick={openDetails}
				>
					<MessageCircle class="h-4 w-4 fill-yellow-400 text-yellow-500" />
					<span class="text-xs font-bold text-slate-700">
						{post.comment_count}
						{m.forum_comments()}
					</span>
				</button>
			</div>

			<!-- View Details Button -->
			<Button
				variant="secondary"
				size="sm"
				class="h-9 bg-solid-primary"
				onclick={() => onViewDetailClick(post.id)}
			>
				{m.forum_view_details()}
				<ChevronRight class="ml-0.5 h-3 w-3" />
			</Button>
		</div>
	</Card.Content>
</Card.Root>
