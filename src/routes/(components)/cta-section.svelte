<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import { m } from '$lib/paraglide/messages';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import * as zod from 'zod';
	import { emailValidator } from '$lib/validation';
	import { createMutation } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';
	import { supportUs } from '$lib/services/contact';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';

	const { reset, data, createSubmitHandler, errors } = createForm({
		initialValues: {
			email: ''
		},
		extend: validator({
			schema: zod.object({
				email: emailValidator
			})
		}),
		onSubmit: async (values) => {
			mutation.mutate(values);
		}
	});

	const mutation = createMutation(() => ({
		mutationKey: ['support-us'],
		mutationFn: (values) => {
			return supportUs(values);
		},
		onSuccess: () => {
			toast.success(m.support_success_message());
			reset();
		}
	}));

	const submit = createSubmitHandler({
		onSubmit: (values) => {
			mutation.mutate(values);
		}
	});
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 xl:px-24">
	<div class="flex items-center justify-center">
		<div class="w-full overflow-hidden rounded-xl bg-primary shadow-lg">
			<div class="flex flex-col gap-3 p-6 sm:p-8 md:p-16">
				<!-- Row 1: Subtitle -->
				<div class="w-full">
					<Subtitle text={m.home_cta_sub()} class="text-left" />
				</div>

				<!-- Row 2: Title + Right Section -->
				<div class="grid grid-cols-1 items-start gap-10 xl:grid-cols-2">
					<!-- Left: Title -->
					<div class="flex flex-col justify-center">
						<h1
							class={`text-left font-baskerville text-2xl font-bold text-black sm:text-3xl sm:leading-16 md:text-4xl  lg:text-5xl`}
						>
							{m.home_cta_title1()}
							<br class="hidden lg:hidden 2xl:block" />
							{m.home_cta_title2()}
							<br class="hidden lg:hidden 2xl:block" />
							{m.home_cta_title3()}
						</h1>
					</div>

					<!-- Right Section -->
					<div class="flex flex-col justify-center gap-10">
						<p
							class="font-poppins text-lg leading-normal font-medium text-secondary-black sm:text-2xl"
						>
							{m.home_cta_description()}
						</p>

						<!-- Email Subscription Form -->
						<div>
							<div class="relative w-full">
								<input
									bind:value={$data.email}
									type="email"
									placeholder={m.home_cta_button_placeholder()}
									class={cn(
										'placeholder:font-poppins',
										'flex',
										'w-full',
										'items-center',
										'rounded-full',
										'border',
										'bg-white',
										'py-2',
										'pr-24',
										'pl-4',
										'placeholder:text-xs',
										'placeholder:font-light',
										'sm:min-h-17.5',
										'sm:pr-44',
										'sm:pl-9',
										'md:placeholder:text-xl'
									)}
								/>
								<Button
									onclick={submit}
									disabled={mutation.isPending}
									class={cn(
										'font-poppins',
										'absolute',
										'top-1/2',
										'right-1',
										'-translate-y-1/2',
										'rounded-full',
										'bg-black',
										'px-4',
										'py-2',
										'text-xs',
										'leading-normal',
										'font-medium',
										'text-white',
										'hover:bg-gray-800',
										'sm:min-h-15',
										'sm:min-w-39',
										'sm:text-xl'
									)}
								>
									{#if mutation.isPending}
										<Spinner />
									{/if}
									{m.home_cta_button()}
								</Button>
							</div>
							{#if $errors.email}
								<p class="mt-2 text-sm text-red-600">{$errors.email}</p>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
