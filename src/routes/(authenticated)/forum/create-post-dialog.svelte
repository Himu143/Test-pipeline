<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog-welcome';
	import { Input } from '$lib/components/ui/input';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { forumPostStore } from '$lib/stores/forum-post.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import type { ForumChannel } from '$lib/types';
	import { Smile } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import { m } from '$lib/paraglide/messages';
	import { authStore } from '$lib/stores/auth.svelte';
	import { getNamedAvatar } from '$lib/utils';

	const schema = z.object({
		header: z.string().trim().min(1, "Title can't be empty"),
		content: z.string().trim().min(1, "Content can't be empty")
	});

	let {
		open = $bindable(),
		channel,
		topic
	}: { open: boolean; channel?: ForumChannel; topic: any } = $props();

	let userDisplayName = $derived(authStore.user?.fullName);

	let userAvatarSrc = $derived(authStore.user?.avatar || '/images/avatars/01.png');

	let userInitials = $derived(getNamedAvatar(userDisplayName));

	const { form, errors, isValid, data, createSubmitHandler } = createForm({
		initialValues: {
			header: '',
			content: ''
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (values) => {
			if (!channel) return;

			const reqBody = {
				header: values.header,
				content: values.content,
				channel_id: channel.id,
				category_slugs: topic ? [topic.slug] : []
			};

			const { status } = await forumPostStore.createPost(reqBody);

			if (status == 'success') {
				toast.success('Post created successfully');
				open = false;
			} else {
				toast.error('Failed to create post');
			}
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[95vh] gap-0 overflow-y-auto rounded-xl bg-white p-0 sm:max-w-3xl">
		<div class="relative p-6 pb-2">
			<Dialog.Header class="mb-6">
				<Dialog.Title
					class="text-center text-2xl font-semibold tracking-wide text-slate-900 lg:text-3xl"
				>
					{#if channel}
						{channel.name} - {m.forum_create_discussion()}
					{:else}
						{m.forum_create_discussion()}
					{/if}
				</Dialog.Title>
			</Dialog.Header>

			<!-- User Profile Section (Static Placeholder as requested for missing data) -->
			<div class="mb-6 flex items-center gap-3">
				<div
					class="h-12 w-12 overflow-hidden rounded-full border border-white bg-yellow-100 shadow-sm"
				>
					<img
						src={userAvatarSrc}
						alt={userDisplayName}
						class="h-full w-full object-cover"
						onerror={(e) => {
							(e.currentTarget as HTMLImageElement).style.display = 'none';
						}}
					/>
					<!-- Fallback if img fails -->
					<div
						class="flex h-full w-full items-center justify-center bg-[#EAB308] text-lg text-white lg:text-xl"
					>
						<img
							src="/images/home/generic-avatar-bordered.svg"
							alt={userDisplayName}
							class="h-full w-full object-cover"
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<span class="text-base font-semibold text-slate-900 lg:text-lg"
						>{userDisplayName}</span
					>
				</div>
			</div>

			<form class="grid gap-4" use:form>
				<!-- Title Input -->
				<div class="relative">
					<Input
						name="header"
						id="title"
						bind:value={$data.header}
						placeholder={m.forum_discussion_title_placeholder()}
						class="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-base transition-shadow placeholder:text-slate-400 focus:ring-1 focus:ring-orange-200 focus:outline-none lg:text-lg"
					/>
					<ValidationError errors={$errors.header} />
				</div>

				<!-- Content Textarea -->
				<div class="relative">
					<Textarea
						name="content"
						id="content"
						bind:value={$data.content}
						placeholder={m.forum_mind_placeholder()}
						class="min-h-50 w-full resize-none rounded-lg border border-gray-200 bg-white p-4 text-base transition-shadow placeholder:text-slate-400 focus:ring-1 focus:ring-orange-200 focus:outline-none lg:text-lg"
					></Textarea>
					<ValidationError errors={$errors.content} />

					<!-- Smiley Icon -->
					<!-- <Smile
						class="absolute right-4 bottom-4 text-slate-400 transition-colors hover:text-slate-600"
					/> -->
				</div>
			</form>
		</div>

		<Dialog.Footer class="p-6 pt-2">
			<Button
				disabled={forumPostStore.createStatus == 'loading' || !$isValid}
				onclick={submitHandler}
				variant="secondary"
				size="lg"
				class="w-full bg-solid-primary font-semibold lg:text-lg"
			>
				{#if forumPostStore.createStatus == 'loading'}
					<Spinner class="mr-2 h-4 w-4" />
					{m.forum_posting()}
				{:else}
					{m.forum_post()}
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
