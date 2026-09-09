<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ForumChannel } from '$lib/types';
	import { createForm } from 'felte';
	import { slugify } from '$lib/utils';

	type Props = {
		type: 'edit' | 'new';
		channel?: ForumChannel;
		submitHandler: (values: ForumChannel) => Promise<any>;
		onDelete?: (id: string) => void;
	};

	let { type, channel, submitHandler, onDelete }: Props = $props();

	let deleteConfirmDialog = $state(false);

	let { form, data, setFields, reset } = createForm({
		initialValues: {
			id: '',
			name: '',
			slug: ''
		},
		async onSubmit(values) {
			const resp = await submitHandler(values);
			if (resp.status == 'success') {
				reset();
			}
		}
	});

	function nameInputHandler(e) {
		setFields('slug', slugify(e.target.value));
	}

	$effect(() => {
		if (channel) {
			setFields('id', channel.id);
			setFields('name', channel.name);
			setFields('slug', channel.slug);
		}
	});
</script>

<form use:form>
	<Card.Root class="mx-auto w-full">
		<Card.Header>
			<Card.Title class="text-2xl">
				{#if type == 'new'}
					Add New
				{:else if type == 'edit'}
					Channel Detail
				{/if}
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="mb-2 grid gap-4">
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input
						id="name"
						name="name"
						bind:value={$data.name}
						oninput={nameInputHandler}
					/>
				</div>
				<div class="grid gap-2">
					<Label for="slug">Slug</Label>
					<Input id="slug" name="slug" bind:value={$data.slug} />
				</div>
			</div>

			<div>
				{#if type == 'new'}
					<Button type="submit">Save</Button>
				{:else if type == 'edit'}
					<Button type="submit">Edit</Button>
				{/if}

				{#if type == 'edit'}
					<Button
						onclick={() => {
							deleteConfirmDialog = true;
						}}
						variant="destructive"
					>
						Delete
					</Button>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>
</form>

<AlertDialog.Root bind:open={deleteConfirmDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the channel.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={() => onDelete?.($data.id)}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
