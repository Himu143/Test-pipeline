<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Avatar from '$lib/components/ui/avatar';
	import { MessageCircle, X } from 'lucide-svelte';
	import type { ForumPost } from '$lib/types';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { formatDistanceToNow } from 'date-fns';
	import { getNamedAvatar } from '$lib/utils';

	let {
		open = $bindable(),
		comment
	}: {
		open: boolean;
		comment: ForumPost | null;
	} = $props();
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
			{#if !comment}
				<div class="flex items-center justify-center py-20">
					<Spinner />
				</div>
			{:else}
				<!-- Header -->
				<div class="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
					<MessageCircle class="h-5 w-5 text-amber-500" />
					<h2 class="text-base font-bold text-slate-900">Comment Details</h2>
				</div>

				<!-- Comment content -->
				<div class="p-6 md:p-8">
					<!-- User info -->
					<div class="mb-4 flex items-center gap-3">
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
							<p class="text-sm font-bold text-slate-900">{comment.user_name}</p>
							<div class="mt-0.5 flex flex-wrap items-center gap-2">
								<span class="text-xs text-slate-400">
									{comment.created_at
										? formatDistanceToNow(new Date(`${comment.created_at}Z`), {
												addSuffix: true
											})
										: ''}
								</span>
								{#if comment.cohort_name}
									<span
										class="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700"
									>
										{comment.cohort_name}
									</span>
								{/if}
								{#if comment.channel_name}
									<span
										class="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600"
									>
										{comment.channel_name}
									</span>
								{/if}
							</div>
						</div>
					</div>

					<!-- Comment body -->
					<div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
						<p class="text-sm leading-relaxed text-slate-700">{comment.content}</p>
					</div>
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
