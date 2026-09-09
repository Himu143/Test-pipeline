<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { forumChannelDetailStore } from '$lib/stores/forum-channel.svelte';
	import ChannelDetail from '../channel-detail.svelte';

	$effect(() => {
		if (page.params.id) {
			forumChannelDetailStore.getChannel(page.params.id);
		}
	});

	function onSubmitHandler(values: any) {
		forumChannelDetailStore.editChannel(values);
	}

	async function onDeleteHandler(id: string) {
		const { status } = await forumChannelDetailStore.deleteChannel(id);
		if (status == 'success') {
			goto('/admin/forum-manager/channels');
		}
	}
</script>

<ChannelDetail
	type="edit"
	channel={forumChannelDetailStore.channes}
	submitHandler={onSubmitHandler}
	onDelete={onDeleteHandler}
/>
