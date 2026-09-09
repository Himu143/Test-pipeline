<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { ChevronDown, Plus } from 'lucide-svelte';

	import CreatePostDialog from './create-post-dialog.svelte';

	import { forumChannelCategoryStore, forumChannelStore } from '$lib/stores/forum-channel.svelte';
	import { page } from '$app/state';
	import SupportSection from '$lib/components/app/support-section.svelte';
	import { m } from '$lib/paraglide/messages';
	import UserActivitiesCard from './user-activities-card.svelte';
	import { cohortUserStore } from '$lib/stores/cohort.svelte';
	import { authStore } from '$lib/stores/auth.svelte';
	import LeftSidebar from './left-sidebar.svelte';
	import { forumPostStore } from '$lib/stores/forum-post.svelte';
	import ForumPostSkeleton from '$lib/components/app/forum-post-skeleton.svelte';
	import ForumPost from './forum-post.svelte';
	import { Spinner } from '$lib/components/ui/spinner';
	import PostDetailsModal from './post-details-modal.svelte';
	import type { ForumChannel } from '$lib/types';

	type CohortChannel = {
		channel_id: string;
		channel_slug: string;
		channel_name: string;
	};

	type UserCohort = {
		name: string;
		description?: string;
		channels?: CohortChannel[];
	};

	let showCreateDialog = $state(false);
	let showOnlyMyPosts = $state(false);

	let postDetailDialog: { open: boolean; postId: null | string } = $state({
		open: false,
		postId: null
	});

	const requestedChannelSlug = $derived(page.url.searchParams.get('channel'));
	const isPublic = $derived(!requestedChannelSlug || requestedChannelSlug === 'public');

	const activeCohort = $derived.by((): UserCohort | undefined => {
		if (!requestedChannelSlug) return;

		return (cohortUserStore.userCohorts as UserCohort[]).find((cohort) =>
			cohort.channels?.some((channel) => channel.channel_slug === requestedChannelSlug)
		);
	});

	const cohortChannels = $derived.by((): ForumChannel[] =>
		(activeCohort?.channels ?? []).map(
			(channel): ForumChannel => ({
				id: channel.channel_id,
				slug: channel.channel_slug,
				name: channel.channel_name
			})
		)
	);

	const requestedChannel = $derived.by(() => {
		if (!requestedChannelSlug) return undefined;
		return forumChannelStore.getActiveChannel(requestedChannelSlug);
	});

	const isAdmin = $derived.by(() => {
		return authStore.user?.role?.toLowerCase?.() === 'admin';
	});
	const currentUserId = $derived(authStore.user?.id);

	const hasAccess = $derived.by(() => {
		if (isPublic) return true;
		if (isAdmin) return true;
		return !!activeCohort;
	});

	const activeChannel = $derived.by(() => {
		if (!requestedChannelSlug) return undefined;
		if (isPublic) return forumChannelStore.getActiveChannel('public');

		if (!hasAccess) return undefined;

		return (
			cohortChannels.find((channel) => channel.slug === requestedChannelSlug) ??
			forumChannelStore.getActiveChannel(requestedChannelSlug)
		);
	});

	const activeTopic = $derived.by(() => {
		return forumChannelCategoryStore.categories.find(
			(item) => item.slug == page.url.searchParams.get('topic')
		);
	});

	const otherTopics = $derived.by(() =>
		cohortChannels.filter((channel) => channel.slug !== activeChannel?.slug)
	);

	const isLoaded = $derived(
		forumChannelStore.status === 'success' && cohortUserStore.userCohortsStatus === 'success'
	);

	const showAccessOverlay = $derived(!isPublic && isLoaded && !hasAccess);

	const accessMessage = $derived.by(() => {
		if (!isLoaded) return '';
		if (!requestedChannel) {
			return 'Cohort does not exist';
		}
		return "You don't have access to this cohort";
	});

	$effect(() => {
		forumChannelStore.getChannels();
		cohortUserStore.getUserCohorts();
	});

	$effect(() => {
		if (activeChannel && hasAccess) {
			forumChannelCategoryStore.getCategories(activeChannel.id);
		}
	});

	$effect(() => {
		if (activeChannel && hasAccess) {
			const userId = showOnlyMyPosts ? currentUserId : undefined;

			if (activeTopic) {
				forumPostStore.getPosts(activeChannel.slug, activeTopic.slug, userId);
			} else {
				forumPostStore.getPosts(activeChannel.slug, undefined, userId);
			}
		}
	});
</script>

<main
	class="mx-auto bg-secondary px-4 py-12 pt-24 sm:px-8 sm:pt-36 md:px-6 md:pt-52 lg:-mt-40 xl:px-24"
>
	<div class="relative">
		<div
			class="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-2 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2"
			class:blur-sm={showAccessOverlay}
			class:pointer-events-none={showAccessOverlay}
		>
			<!-- LEFT SIDEBAR -->
			<aside class="col-span-3 space-y-6 lg:col-span-1">
				<!-- {@render leftSidebar()} -->
				<LeftSidebar
					cohort={activeCohort}
					cohorts={cohortUserStore.userCohorts}
					{activeChannel}
					{otherTopics}
					{isAdmin}
				/>
			</aside>

			<!-- CENTER CONTENT -->
			<main class="col-span-3 space-y-6 lg:col-span-2">
				{@render startDisscusionView()}

				{@render welcomeBannerView()}

				{@render forumView()}
			</main>

			<!-- RIGHT SIDEBAR -->
			<aside class="col-span-3 lg:col-span-1">
				<UserActivitiesCard
					channelId={activeChannel?.id}
					onActivitySelect={(item) => {
						postDetailDialog.open = true;
						postDetailDialog.postId = item.id;
					}}
					onViewYourPosts={() => {
						showOnlyMyPosts = true;
					}}
				/>
			</aside>
		</div>

		{#if showAccessOverlay}
			<div
				class="absolute inset-0 z-10 flex w-full items-start justify-center rounded-2xl bg-white/30 backdrop-blur-[2px]"
			>
				<div class="mt-40 rounded-xl bg-white/90 px-6 py-4 text-center shadow-lg">
					<p class="font-poppins text-lg font-semibold text-black sm:text-xl">
						{accessMessage}
					</p>
				</div>
			</div>
		{/if}
	</div>
</main>

<CreatePostDialog bind:open={showCreateDialog} channel={activeChannel} topic={activeTopic} />

<SupportSection />

<PostDetailsModal
	bind:open={postDetailDialog.open}
	postId={postDetailDialog.postId}
	channelId={activeChannel?.id}
/>

{#snippet startDisscusionView()}
	<div class="relative w-full">
		<div
			class="group relative cursor-pointer"
			onclick={() => (showCreateDialog = true)}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Enter' && (showCreateDialog = true)}
		>
			<Input
				type="text"
				placeholder={m.forum_start_discussion_placeholder()}
				class="h-12 w-full cursor-pointer rounded-lg border-border bg-white pr-12 pl-4 shadow-sm focus-visible:ring-1 focus-visible:ring-solid-primary"
				readonly
			/>
			<Button
				size="icon"
				class="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded bg-solid-primary text-white transition-colors hover:bg-primary-hover"
			>
				<Plus class="h-5 w-5" />
			</Button>
		</div>
	</div>
{/snippet}

{#snippet welcomeBannerView()}
	<div class="relative overflow-hidden rounded-xl border border-border-gold bg-bg-gold-light p-5">
		<div class="relative z-10 flex items-start gap-3">
			<span class="mt-1 rotate-45 transform text-lg text-red-500">📌</span>
			<div class="space-y-2">
				<h3 class="text-lg font-semibold text-secondary-black lg:text-xl">
					Welcome to <span class="capitalize"
						>{activeCohort?.name ? activeCohort.name : 'Public'}</span
					> Community and Guideline
				</h3>
				<p class="text-sm leading-relaxed text-text-gray-medium lg:text-lg">
					<!-- {m.forum_welcome_banner_description()} -->
					{activeCohort?.description}
				</p>
			</div>
		</div>
	</div>
{/snippet}

{#snippet forumView()}
	{#if showOnlyMyPosts}
		<div class="mb-4 flex items-center justify-between gap-3">
			<h3 class="text-lg font-semibold text-secondary-black">
				{m.forum_your_posts()}
			</h3>

			<Button
				variant="outline"
				size="sm"
				class="rounded-full border-solid-primary"
				onclick={() => {
					showOnlyMyPosts = false;
				}}
			>
				{m.forum_all_posts()}
			</Button>
		</div>
	{/if}

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
						const userId = showOnlyMyPosts ? currentUserId : undefined;

						if (activeTopic) {
							forumPostStore.loadMorePost(
								activeChannel.slug,
								activeTopic.slug,
								userId
							);
						} else {
							forumPostStore.loadMorePost(activeChannel.slug, undefined, userId);
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
{/snippet}
