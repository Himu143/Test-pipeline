<script lang="ts">
	import { goto } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { authStore } from '$lib/stores/auth.svelte';

	let { open = $bindable(false) } = $props();

	async function continueHandler() {
		const resp = await authStore.resendVerificationCode();

		if (resp.status == 'success') {
			goto('/auth/otp');
		}
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Your email is not verified</AlertDialog.Title>
			<AlertDialog.Description>To verify email click continue.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				disabled={authStore.resendCodeState.status == 'loading'}
				onclick={continueHandler}
			>
				Continue
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
