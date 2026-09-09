<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Eye, EyeOff } from '@lucide/svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import Copyright from '$lib/components/app/copyright.svelte';
	import { signInSchema } from '$lib/validation';
	import { authStore } from '$lib/stores/auth.svelte';
	import VerifyEmailDialog from './verify-email-dialog.svelte';
	import { Spinner } from '$lib/components/ui/spinner';
	import { toast } from 'svelte-sonner';
	import * as m from '$lib/paraglide/messages.js';

	let showPassword = $state(false);

	let showEmailVerifyDailog = $state(false);

	const { form, errors, data } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		extend: validator({ schema: signInSchema }),
		onSubmit: async (values) => {
			const { status } = await authStore.login(values);

			if (status == 'success') {
				toast.success('Logged in successfully');
				goto('/home');
			} else if (status == 'email-noverify-error') {
				toast.error('Email not verified', {
					description: 'Please verify your email address'
				});
				showEmailVerifyDailog = true;
			} else {
				toast.error(authStore.signInState.errorMessage || 'Invalid credentials');
			}
		}
	});
</script>

<!-- Right side sign-in card -->
<div class="flex w-full flex-col items-center justify-center lg:h-auto lg:w-1/2">
	<form use:form class="w-full">
		<Card.Root class="mx-auto w-full max-w-90 sm:max-w-120">
			<Card.Header class="flex flex-col items-center gap-2 pt-4 pb-2">
				<Card.Title>{m.auth_signin_title()}</Card.Title>
				<Card.Description>
					{m.auth_signin_description()}
				</Card.Description>
			</Card.Header>

			<Card.Content>
				<div class="grid gap-5">
					<div class="grid gap-2">
						<Label for="email">{m.auth_signin_email_label()}</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder={m.auth_signin_email_placeholder()}
							required
						/>
						<ValidationError errors={$errors.email} />
					</div>

					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">{m.auth_signin_password_label()}</Label>
							<a
								href="/auth/forgot-password"
								class="ml-auto inline-block text-sm leading-6 font-medium text-tertiary underline-offset-4 hover:underline"
							>
								{m.auth_signin_forgot_password()}
							</a>
						</div>
						<div class="relative">
							<Input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								placeholder={m.auth_signin_password_placeholder()}
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
						<ValidationError errors={$errors.password} />
					</div>

					<Button
						disabled={authStore.signInState.status == 'loading'}
						type="submit"
						class="mt-5 min-h-11 w-full text-base font-semibold"
					>
						{#if authStore.signInState.status == 'loading'}
							<Spinner />
						{/if}
						{m.auth_signin_button()}
					</Button>
				</div>

				<div
					class="mt-4 flex justify-center gap-2 text-center text-sm leading-6 font-normal text-secondary-black"
				>
					{m.auth_signin_dont_have_account()}
					<a href="/auth/sign-up" class="text-sm leading-6 font-semibold text-tertiary">
						{m.auth_signin_signup_link()}
					</a>
				</div>
			</Card.Content>
		</Card.Root>
	</form>
	<Copyright />
</div>

<VerifyEmailDialog open={showEmailVerifyDailog} />
