<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';

	let { src, fallback, alt = 'Avatar' } = $props();
</script>

<Avatar.Root class="h-9 w-9">
	<Avatar.Image {src} {alt} />
	<Avatar.Fallback>{fallback}</Avatar.Fallback>
</Avatar.Root>
