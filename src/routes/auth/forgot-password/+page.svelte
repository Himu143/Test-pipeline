<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { ArrowLeft } from '@lucide/svelte';
	import LeftSection from '../(components)/left-section.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import Copyright from '$lib/components/app/copyright.svelte';
	import { forgotPasswordSchema } from '$lib/validation';
	import { authStore } from '$lib/stores/auth.svelte';
	import { toast } from 'svelte-sonner';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';

	const { form, errors, data } = createForm({
		initialValues: {
			email: ''
		},
		extend: validator({ schema: forgotPasswordSchema }),
		onSubmit: async (values) => {
			const resp = await authStore.forgotPassword(values.email);

			if (resp.status == 'success') {
				toast.success('Success', {
					description: 'Verification code sent to you email address'
				});
				goto('/auth/set-new-pass');
			} else {
				toast.error('Error', {
					description: resp.message || 'Failed to send verification code'
				});
			}
		}
	});
</script>

<div class="flex w-full flex-col items-center justify-center lg:h-auto lg:w-1/2">
	<form use:form class="w-full">
		<Card.Root class="mx-auto w-full max-w-[360px] sm:max-w-[480px]">
			<Card.Header class="flex flex-col items-center gap-2 pt-4 pb-2">
				<Card.Title class="text-3xl font-semibold">Forgot Password?</Card.Title>
				<Card.Description
					class="text-center text-base leading-6 font-normal text-secondary-black"
				>
					Enter you email address for <br /> reset your password.
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid gap-5">
					<div class="grid gap-2">
						<Label for="email">Email Address</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="Enter email "
							required
						/>
						<ValidationError errors={$errors.email} />
					</div>

					<Button
						disabled={authStore.forgotPasswordState.status == 'loading'}
						type="submit"
						class="mt-5 min-h-11 w-full text-base font-semibold"
					>
						{#if authStore.forgotPasswordState.status == 'loading'}
							<Spinner />
						{/if}
						Continue
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
		</Card.Root>
	</form>
	<Copyright />
</div>
