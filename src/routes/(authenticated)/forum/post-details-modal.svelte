<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Heart, MessageCircle, Send, X } from 'lucide-svelte';
	import type { ForumPost } from '$lib/types';
	import { forumCommentsStore, forumPostDetailStore } from '$lib/stores/forum-post.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import { m } from '$lib/paraglide/messages';
	import { toast } from 'svelte-sonner';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { formatDistanceToNow } from 'date-fns';
	import { getNamedAvatar } from '$lib/utils';

	let {
		open = $bindable(),
		post,
		postId,
		channelId
	}: {
		open: boolean;
		post?: ForumPost;
		postId: string | null;
		channelId: string | null | undefined;
	} = $props();

	const schema = z.object({
		content: z.string().trim().min(1, "Comment can't be empty")
	});

	const { form, errors, isValid, data, reset, createSubmitHandler } = createForm({
		initialValues: {
			content: ''
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			if (postId && channelId) {
				const { status } = await forumCommentsStore.createComment(postId, {
					...values,
					channelId: channelId
				});
				if (status === 'success') {
					toast.success('Comment posted successfully');
					reset();
				} else {
					toast.error('Failed to post comment');
				}
			}
		}
	});

	$effect(() => {
		if (postId && open) {
			forumCommentsStore.getCommnets(postId);
			forumPostDetailStore.getPost(postId);
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="flex max-h-[90vh] flex-col gap-0 overflow-hidden rounded-xl bg-white p-0 sm:max-w-3xl"
	>
		<!-- Header / Close -->
		<div class="absolute top-4 right-4 z-10">
			<Dialog.Close
				class="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
			>
				<X class="h-6 w-6 text-slate-400" />
				<span class="sr-only">Close</span>
			</Dialog.Close>
		</div>

		<div class="custom-scrollbar flex h-full flex-col overflow-y-auto">
			<!-- Post Content Section -->
			<div class="p-6 pb-4 md:p-8">
				<!-- User Info -->
				<div class="mb-6 flex items-center gap-3">
					<Avatar.Root class="h-12 w-12 border-2 border-white shadow-sm">
						<Avatar.Image src="#" alt="User" />
						<Avatar.Fallback class=" font-bold">
							<img
								src="/images/home/generic-avatar-bordered.svg"
								alt="user profile"
							/>
						</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col">
						<span class="text-base font-bold text-slate-900 lg:text-lg">
							{forumPostDetailStore.post?.user_name}
						</span>
						<span class="text-xs font-medium tracking-wide text-slate-500 lg:text-lg">
							{forumPostDetailStore.post
								? formatDistanceToNow(
										new Date(`${forumPostDetailStore.post.created_at}Z`),
										{ addSuffix: true }
									)
								: ''}
						</span>
					</div>
				</div>

				<!-- Title & Body -->
				<h2 class="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
					{forumPostDetailStore.post?.header}
				</h2>
				<div class="space-y-4 text-base leading-relaxed text-slate-600 lg:text-lg">
					<p>{forumPostDetailStore.post?.content}</p>
				</div>
			</div>

			<!-- Stats Bar -->
			<div class="px-6 py-4 md:px-8">
				<div class="flex items-center gap-4">
					<div class="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2">
						<Heart class="h-4 w-4 fill-yellow-400 text-yellow-500" />
						<span class="text-sm font-semibold text-slate-700 lg:text-lg">
							{forumPostDetailStore.post?.care_count}
						</span>
					</div>
					<div class="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2">
						<MessageCircle class="h-4 w-4 fill-yellow-400 text-yellow-500" />
						<span class="text-sm font-semibold text-slate-700 lg:text-lg">
							{forumPostDetailStore.post?.comment_count}
							{m.forum_comments()}
						</span>
					</div>
				</div>
			</div>

			<!-- Comment Input -->
			<div class="px-6 py-2 md:px-8">
				<form use:form class="relative">
					<input
						name="content"
						type="text"
						placeholder={m.forum_write_comment_placeholder()}
						class="h-12 w-full rounded-lg border border-gray-200 pr-12 pl-4 text-sm shadow-sm placeholder:text-slate-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none lg:text-lg"
						autocomplete="off"
					/>
					<button
						type="submit"
						class="absolute top-3 right-3 text-slate-400 transition-colors hover:text-slate-600 disabled:opacity-50"
						disabled={!$isValid}
					>
						<Send class="h-5 w-5" />
					</button>
				</form>
				<div class="mt-1">
					<ValidationError errors={$errors.content} />
				</div>
			</div>

			<!-- Comments List -->
			<div class="space-y-4 bg-white p-6 pt-4 md:p-8">
				<!-- Mock Comments (since store might be empty or plain strings) -->
				{#each [] as i}
					<div class="rounded-xl border border-gray-100 bg-gray-50/80 p-5">
						<div class="flex items-start gap-3">
							<Avatar.Root class="mt-1 h-10 w-10">
								<Avatar.Image src="/images/home/generic-avatar-bordered.svg" />
								<Avatar.Fallback class=" text-xs  lg:text-xl">
									<img
										src="/images/home/generic-avatar-bordered.svg"
										alt="user avatar"
									/>
								</Avatar.Fallback>
							</Avatar.Root>
							<div class="flex-1">
								<div class="mb-1 flex items-center gap-2">
									<span class="text-sm font-bold text-slate-900 lg:text-lg">
										Jenny Wilson
									</span>
									<span class="text-[10px] text-slate-400 lg:text-lg">
										01 Dec, 25 | 01:14 PM
									</span>
								</div>
								<p class="mb-3 text-xs leading-relaxed text-slate-600 lg:text-lg">
									Lorem Ipsum is simply dummy text of the printing and typesetting
									industry. Lorem Ipsum has been the industry's standard dummy
									text ever since the 1500s. Lorem Ipsum is simply dummy text of
									the printing and typesetting industry.
								</p>

								<div class="flex items-center gap-4 text-slate-400">
									<button
										class="flex items-center gap-1 transition-colors hover:text-red-500"
									>
										<Heart class="h-3 w-3" />
										<span class="text-[10px] font-medium lg:text-lg">15</span>
									</button>
									<button
										class="flex items-center gap-1 transition-colors hover:text-blue-500"
									>
										<MessageCircle class="h-3 w-3" />
										<span class="text-[10px] font-medium lg:text-lg">
											02 {m.forum_reply()}
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}

				<!-- Actual Store Comments -->
				{#if forumCommentsStore.status == 'loading'}
					<div class="w-full p-8">
						<Spinner />
					</div>
				{/if}

				{#if forumCommentsStore.status == 'success'}
					{#each forumCommentsStore.comments as comment}
						<div class="rounded-xl border border-gray-100 bg-gray-50/80 p-5">
							<div class="flex items-start gap-3">
								<Avatar.Root class="mt-1 h-10 w-10">
									<Avatar.Image src="/images/home/generic-avatar-bordered.svg" />
									<Avatar.Fallback class=" text-xs  lg:text-xl">
										<img
											src="/images/home/generic-avatar-bordered.svg"
											alt="user avatar"
										/>
									</Avatar.Fallback>
								</Avatar.Root>
								<div class="flex-1">
									<div class="mb-1 flex items-center gap-2">
										<span class="text-sm font-bold text-slate-900 lg:text-lg">
											{comment.user_name}
										</span>
										<span class="text-[10px] text-slate-400 lg:text-lg">
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
									<p
										class="mb-3 text-xs leading-relaxed text-slate-600 lg:text-lg"
									>
										{comment.content}
									</p>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>

<style>
	/* Custom scrollbar for inner content */
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
