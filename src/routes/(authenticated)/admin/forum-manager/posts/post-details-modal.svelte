<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Heart, MessageCircle, X } from 'lucide-svelte';
	import type { ForumPost } from '$lib/types';
	import { forumCommentsStore, forumPostDetailStore } from '$lib/stores/forum-post.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { formatDistanceToNow } from 'date-fns';
	import { getNamedAvatar } from '$lib/utils';

	let {
		open = $bindable(),
		post,
		postId
	}: {
		open: boolean;
		post?: ForumPost;
		postId: string | null;
	} = $props();

	$effect(() => {
		if (postId && open) {
			forumCommentsStore.getCommnets(postId);
			forumPostDetailStore.getPost(postId);
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="flex max-h-[90vh] flex-col gap-0 overflow-hidden rounded-2xl bg-white p-0 sm:max-w-2xl"
	>
		<!-- Close button -->
		<div class="absolute top-4 right-4 z-10">
			<Dialog.Close
				class="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
			>
				<X class="h-5 w-5 text-slate-400" />
				<span class="sr-only">Close</span>
			</Dialog.Close>
		</div>

		<div class="custom-scrollbar flex h-full flex-col overflow-y-auto">
			{#if forumPostDetailStore.status === 'loading'}
				<div class="flex items-center justify-center py-20">
					<Spinner />
				</div>
			{:else if forumPostDetailStore.post}
				<!-- Post content -->
				<div class="p-6 pb-4 md:p-8">
					<!-- User info -->
					<div class="mb-5 flex items-center gap-3">
						<Avatar.Root class="mt-1 h-10 w-10">
							<Avatar.Image src="/images/home/generic-avatar-bordered.svg" />
							<Avatar.Fallback class=" text-xs  lg:text-xl">
								<img
									src="/images/home/generic-avatar-bordered.svg"
									alt="user avatar"
								/>
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="min-w-0">
							<p class="text-sm font-bold text-slate-900">
								{forumPostDetailStore.post?.user_name}
							</p>
							<div class="mt-0.5 flex flex-wrap items-center gap-2">
								<span class="text-xs text-slate-400">
									{forumPostDetailStore.post
										? formatDistanceToNow(
												new Date(
													`${forumPostDetailStore.post.created_at}Z`
												),
												{ addSuffix: true }
											)
										: ''}
								</span>
								{#if forumPostDetailStore.post?.cohort_name}
									<span
										class="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700"
									>
										{forumPostDetailStore.post.cohort_name}
									</span>
								{/if}
								{#if forumPostDetailStore.post?.channel_name}
									<span
										class="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600"
									>
										{forumPostDetailStore.post.channel_name}
									</span>
								{/if}
							</div>
						</div>
					</div>

					<!-- Title & body -->
					{#if forumPostDetailStore.post?.header}
						<h2 class="mb-3 text-xl font-bold text-slate-900">
							{forumPostDetailStore.post?.header}
						</h2>
					{/if}
					<p class="text-sm leading-relaxed text-slate-600">
						{forumPostDetailStore.post?.content}
					</p>
				</div>

				<!-- Stats bar -->
				<div class="border-t border-gray-100 px-6 py-3 md:px-8">
					<div class="flex items-center gap-3">
						<div class="flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-1.5">
							<Heart class="h-4 w-4 fill-amber-400 text-amber-500" />
							<span class="text-sm font-semibold text-slate-700">
								{forumPostDetailStore.post?.care_count ?? 0}
							</span>
						</div>
						<div class="flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-1.5">
							<MessageCircle class="h-4 w-4 fill-amber-400 text-amber-500" />
							<span class="text-sm font-semibold text-slate-700">
								{forumPostDetailStore.post?.comment_count ?? 0} Comments
							</span>
						</div>
					</div>
				</div>

				<!-- Comments list -->
				<div class="space-y-3 p-6 pt-4 md:p-8">
					<h3 class="text-sm font-semibold tracking-wide text-slate-700 uppercase">
						Comments
					</h3>

					{#if forumCommentsStore.status === 'loading'}
						<div class="flex items-center justify-center py-8">
							<Spinner />
						</div>
					{:else if forumCommentsStore.status === 'success'}
						{#if forumCommentsStore.comments.length === 0}
							<div
								class="rounded-xl border border-dashed border-gray-200 py-8 text-center"
							>
								<p class="text-sm text-gray-400">No comments yet</p>
							</div>
						{:else}
							{#each forumCommentsStore.comments as comment}
								<div class="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
									<div class="flex items-start gap-3">
										<Avatar.Root class="mt-0.5 h-8 w-8 flex-shrink-0">
											<Avatar.Image src="#" />
											<Avatar.Fallback
												class="bg-blue-100 text-xs text-blue-600"
											>
												{getNamedAvatar(comment.user_name)}
											</Avatar.Fallback>
										</Avatar.Root>
										<div class="min-w-0 flex-1">
											<div class="mb-1 flex flex-wrap items-center gap-2">
												<span class="text-sm font-bold text-slate-900"
													>{comment.user_name}</span
												>
												<span class="text-xs text-slate-400">
													{comment.created_at
														? formatDistanceToNow(
																new Date(`${comment.created_at}Z`),
																{
																	addSuffix: true
																}
															)
														: 'Just now'}
												</span>
											</div>
											<p class="text-sm leading-relaxed text-slate-600">
												{comment.content}
											</p>
										</div>
									</div>
								</div>
							{/each}
						{/if}
					{/if}
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: #e2e8f0;
		border-radius: 20px;
	}
</style>
