<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import Subtitle from '$lib/components/app/ui/subtitle.svelte';
	import Title from '$lib/components/app/ui/title.svelte';
	import { Input } from '$lib/components/ui/input';
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

<section class="bg-secondary px-4 py-6 sm:px-8 sm:py-12 md:px-6 md:py-20 xl:px-24">
	<div
		class="flex w-full items-center justify-center overflow-hidden rounded-xl bg-primary sm:rounded-2xl lg:rounded-3xl"
	>
		<div
			class="flex flex-col items-start gap-12 px-6 py-12 sm:items-center sm:gap-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
		>
			<!-- Header Section -->
			<div class="flex w-full flex-col items-start gap-5 sm:items-center">
				<!-- Subtitle -->
				<div class="w-full text-left sm:text-center">
					<Subtitle
						text={m.support_section_sub()}
						class="text-left text-sm font-bold sm:text-center sm:font-normal xl:text-2xl"
					/>
				</div>

				<!-- Main Heading -->
				<div class="w-full">
					<Title
						title1={m.support_section_title1()}
						title2={m.support_section_title2()}
						title3={m.support_section_title3()}
						class="text-left text-2xl leading-tight font-bold sm:text-center xl:text-5xl xl:leading-16"
					/>
				</div>

				<!-- Description -->
				<div class="w-full">
					<p
						class="mx-auto max-w-280 text-center font-poppins text-base leading-relaxed font-medium text-secondary-black sm:text-center sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:text-3xl lg:leading-9"
					>
						{m.support_section_description()}
					</p>
				</div>
			</div>

			<!-- Email Form -->
			<div class="w-full max-w-3xl">
				<div class="relative w-full">
					<Input
						bind:value={$data.email}
						type="email"
						placeholder={m.support_section_button_placeholder()}
						class={cn(
							'w-full',
							'rounded-full',
							'border',
							'border-primary',
							'bg-white',
							'py-3',
							'pl-6',
							'pr-28',
							'font-poppins',
							'text-base',
							'font-light',
							'text-gray-900',
							'placeholder:font-poppins',
							'placeholder:text-base',
							'placeholder:font-light',
							'placeholder:text-gray-500',
							'focus:outline-none',
							'focus:ring-2',
							'focus:ring-black',
							'focus:ring-offset-2',
							'sm:py-4',
							'sm:pl-9',
							'sm:pr-40',
							'sm:text-lg',
							'sm:placeholder:text-lg',
							'md:text-xl',
							'md:placeholder:text-xl',
							'lg:min-h-17',
							'lg:pl-10',
							'lg:pr-44'
						)}
					/>

					<Button
						type="button"
						size="sm"
						onclick={submit}
						disabled={mutation.isPending}
						class={cn(
							'absolute',
							'right-2',
							'top-1/2',
							'-translate-y-1/2',
							'lg:h-auto',
							'lg:px-8',
							'lg:py-3',
							'lg:text-lg'
						)}
					>
						{#if mutation.isPending}
							<Spinner />
						{/if}

						{m.support_section_button()}
					</Button>
				</div>

				{#if $errors.email}
					<p class="mt-2 text-sm text-red-600">
						{$errors.email}
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>
