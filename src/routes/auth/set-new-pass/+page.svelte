<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { ArrowLeft, Eye, EyeOff } from '@lucide/svelte';
	import LeftSection from '../(components)/left-section.svelte';
	import { createForm } from 'felte';
	import * as zod from 'zod';
	import { validator } from '@felte/validator-zod';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import Copyright from '$lib/components/app/copyright.svelte';
	import { setNewPasswordSchema } from '$lib/validation';
	import { authStore } from '$lib/stores/auth.svelte';
	import { toast } from 'svelte-sonner';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let isReset = $state(false);

	const { form, errors, data } = createForm({
		initialValues: {
			otp: '',
			password: '',
			confirmPassword: ''
		},
		extend: validator({ schema: setNewPasswordSchema }),
		onSubmit: async (values) => {
			const resp = await authStore.resetPassword({
				newPassword: values.password,
				otp: values.otp
			});

			if (resp.status == 'success') {
				toast.success('Success', { description: 'Password has been reset' });
				goto('/auth/sign-in');
			}

			if (resp.status == 'error') {
				toast.error(resp.message ? resp.message : 'Failed to reset password');
			}
		}
	});
</script>

<div class="flex w-full flex-col items-center justify-center lg:h-auto lg:w-1/2">
	<Card.Root class="mx-auto w-full max-w-[360px] sm:max-w-[480px]">
		{#if !isReset}
			<Card.Header class="flex flex-col items-center gap-2 pt-4 pb-2">
				<Card.Title class="text-center text-3xl font-semibold">Set New Password</Card.Title>
				<Card.Description
					class="text-center text-base leading-6 font-normal text-secondary-black"
					>Your new password must be different <br />to previously used passwords.</Card.Description
				>
			</Card.Header>
			<form use:form class="w-full">
				<Card.Content>
					<div class="grid gap-6">
						<div class="grid gap-2">
							<Label for="confirmPassword">OTP</Label>
							<div class="relative">
								<Input
									id="otp"
									name="otp"
									placeholder="Verification Code"
									class="pr-12 text-2xl leading-6"
									required
								/>
							</div>
							<ValidationError errors={$errors.otp} />
						</div>

						<div class="grid gap-2">
							<Label for="password">New Password</Label>
							<div class="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter password"
									class="pr-12 text-2xl leading-6"
								/>
								<button
									type="button"
									class="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center"
									onclick={() => (showPassword = !showPassword)}
									aria-label="Toggle password visibility"
								>
									{#if showPassword}
										<EyeOff size="20" class="text-gray-500" />
									{:else}
										<Eye size="20" class="text-gray-500" />
									{/if}
								</button>
							</div>
							{#if $errors.password}
								<ValidationError errors={$errors.password} />
							{/if}
						</div>

						<div class="grid gap-2">
							<Label for="confirmPassword">Confirm Password</Label>
							<div class="relative">
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="Confirm password"
									class="pr-12 text-2xl leading-6"
								/>
								<button
									type="button"
									class="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center"
									onclick={() => (showConfirmPassword = !showConfirmPassword)}
									aria-label="Toggle password visibility"
								>
									{#if showConfirmPassword}
										<EyeOff size="20" class="text-gray-500" />
									{:else}
										<Eye size="20" class="text-gray-500" />
									{/if}
								</button>
							</div>
							<ValidationError errors={$errors.confirmPassword} />
						</div>

						<Button
							disabled={authStore.resetPasswordState.status == 'loading'}
							type="submit"
							class="min-h-11 w-full text-base font-semibold"
						>
							{#if authStore.resetPasswordState.status == 'loading'}
								<Spinner />
							{/if}
							Reset password
						</Button>
					</div>
					<div class="flex justify-center">
						<Button
							variant="ghost"
							class="mt-4 mb-5 flex cursor-pointer justify-center gap-2 text-center text-sm leading-6 font-normal text-secondary-black hover:bg-transparent"
							onclick={() => {
								goto('/auth/sign-in');
							}}
						>
							<span><ArrowLeft /></span> Back to Login
						</Button>
					</div>
				</Card.Content>
			</form>
		{:else}
			<Card.Header class="flex flex-col items-center gap-2 pt-4 pb-2">
				<Card.Title class="text-center text-3xl font-semibold">Password Reset</Card.Title>
				<Card.Description
					class="text-center text-base leading-6 font-normal text-secondary-black"
					>Your password has been successfully reset. <br />Click below to sign in
					magically.</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<div class="grid gap-6">
					<Button
						type="submit"
						class="mt-7 min-h-11 w-full text-base font-semibold"
						onclick={() => {
							goto('/auth/sign-in');
						}}
					>
						Sign in
					</Button>
				</div>
			</Card.Content>
		{/if}
	</Card.Root>

	<Copyright />
</div>
