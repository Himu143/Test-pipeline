<script lang="ts">
	import AppAvatar from '$lib/components/app/ui/app-avatar.svelte';
</script>

<div class="space-y-8">
	<div class="flex items-center">
		<AppAvatar src="/avatars/01.png" fallback="MM" alt="avatar" />

		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Mahedi Milki</p>
			<p class="text-sm text-muted-foreground">mahedimilki@gmail.com</p>
		</div>
		<div class="ml-auto font-medium">+$1,999.00</div>
	</div>
	<div class="flex items-center">
		<AppAvatar src="/avatars/02.png" fallback="PS" alt="avatar" />

		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Parves Sikder</p>
			<p class="text-sm text-muted-foreground">parvessikder@gmail.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
	<div class="flex items-center">
		<AppAvatar src="/avatars/03.png" fallback="IN" alt="avatar" />

		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
			<p class="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$299.00</div>
	</div>
	<div class="flex items-center">
		<AppAvatar src="/avatars/04.png" fallback="WK" alt="avatar" />

		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">William Kim</p>
			<p class="text-sm text-muted-foreground">will@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$99.00</div>
	</div>
	<div class="flex items-center">
		<AppAvatar src="/avatars/05.png" fallback="SD" alt="avatar" />

		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Sofia Davis</p>
			<p class="text-sm text-muted-foreground">sofia.davis@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
</div>
