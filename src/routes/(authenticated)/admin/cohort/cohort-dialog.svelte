<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { cohortStore } from '$lib/stores/cohort.svelte';
	import { slugify } from '$lib/utils';
	import { createForm } from 'felte';

	let { open = $bindable() } = $props();

	let { form, data, setFields, reset, createSubmitHandler } = createForm({
		initialValues: {
			id: '',
			name: '',
			slug: '',
			description: ''
		}
	});

	function nameInputHandler() {
		setFields('slug', slugify($data.name));
	}

	const submit = createSubmitHandler({
		async onSubmit(values) {
			const { status } = await cohortStore.createChohort(values);
			if (status == 'success') {
				open = false;
			}
		}
	});

	$effect(() => {
		if (open) {
			setFields('name', '');
			setFields('slug', '');
			setFields('description', '');
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New Cohort</Dialog.Title>
			<Dialog.Description>
				<div>
					<Label for="name">Name</Label>
					<Input
						id="name"
						name="name"
						bind:value={$data.name}
						oninput={nameInputHandler}
					/>
				</div>

				<div>
					<Label for="slug">Slug</Label>
					<Input id="slug" name="slug" bind:value={$data.slug} />
				</div>

				<div>
					<Label for="description">Description</Label>
					<Textarea id="description" name="description" bind:value={$data.description} />
				</div>
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Dialog.Close type="button" class={buttonVariants({ variant: 'outline' })}>
				Cancel
			</Dialog.Close>
			<Button onclick={submit}>Save</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
