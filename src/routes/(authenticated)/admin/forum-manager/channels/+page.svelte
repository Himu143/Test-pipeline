<script lang="ts">
	import { forumChannelStore } from '$lib/stores/forum-channel.svelte';
	import ChannelDetail from './channel-detail.svelte';

	async function onSubmitHandler(values: any) {
		return forumChannelStore.createChannel(values);
	}
</script>

<ChannelDetail type="new" submitHandler={onSubmitHandler} />
