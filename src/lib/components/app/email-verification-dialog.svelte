<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import { otpSchema } from '$lib/validation';
	import { authStore } from '$lib/stores/auth.svelte';

	interface Props {
		open?: boolean;
		email: string;
		onVerified?: () => void;
	}

	let { open = $bindable(false), email, onVerified }: Props = $props();

	let isLoading = $state(false);
	let isResending = $state(false);
	let error = $state<string | null>(null);
	let resendSuccess = $state(false);

	const { form, errors, data, reset } = createForm({
		initialValues: {
			otp: ''
		},
		extend: validator({ schema: otpSchema }),
		onSubmit: async (values) => {
			isLoading = true;
			error = null;

			try {
				await authStore.verifyEmailSignup({
					email,
					otp: values.otp
				});
				onVerified?.();
				reset();
				open = false;
			} catch (err: any) {
				error = err.message || 'Failed to verify email';
			} finally {
				isLoading = false;
			}
		}
	});

	async function handleResendVerification() {
		isResending = true;
		error = null;
		resendSuccess = false;

		try {
			await authStore.resendVerificationEmail({ email });
			resendSuccess = true;
			// Clear success message after 3 seconds
			setTimeout(() => {
				resendSuccess = false;
			}, 3000);
		} catch (err: any) {
			error = err.message || 'Failed to resend verification email';
		} finally {
			isResending = false;
		}
	}

	$effect(() => {
		if (!open) {
			reset();
			error = null;
			resendSuccess = false;
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Verify Your Email</Dialog.Title>
			<Dialog.Description>
				We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter it below.
			</Dialog.Description>
		</Dialog.Header>

		<form use:form class="space-y-4">
			<div class="grid gap-2">
				<Label for="otp">Verification Code</Label>
				<InputOTP.Root
					maxlength={6}
					name="otp"
					id="otp"
					bind:value={$data.otp}
					class="justify-center"
				>
					{#snippet children({ cells })}
						<InputOTP.Group>
							{#each cells as cell (cell)}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
					{/snippet}
				</InputOTP.Root>
				{#if $errors.otp}
					<div>
						<ValidationError errors={$errors.otp} />
					</div>
				{/if}
				{#if error}
					<div class="text-sm text-red-600">{error}</div>
				{/if}
				{#if resendSuccess}
					<div class="text-sm text-green-600">Verification code sent successfully!</div>
				{/if}
				<div class="flex items-center justify-center gap-2 text-sm">
					<span class="text-muted-foreground">Didn't receive the code?</span>
					<button
						type="button"
						onclick={handleResendVerification}
						disabled={isResending}
						class="text-blue-600 hover:underline disabled:opacity-50"
					>
						{isResending ? 'Sending...' : 'Resend Code'}
					</button>
				</div>
			</div>

			<Dialog.Footer>
				<Button type="submit" disabled={isLoading} class="w-full">
					{isLoading ? 'Verifying...' : 'Verify Email'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
