<script lang="ts">
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';

	interface Props {
		firstInputGroupLength: number;
		secondInputGroupLength: number;
		value?: string;
	}

	let { firstInputGroupLength, secondInputGroupLength, value = $bindable('') }: Props = $props();

	const maxlength = firstInputGroupLength + secondInputGroupLength;
</script>

<InputOTP.Root {maxlength} bind:value>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells.slice(0, firstInputGroupLength) as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
		<InputOTP.Separator />
		<InputOTP.Group>
			{#each cells.slice(firstInputGroupLength, maxlength) as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>

<!-- example usage -->
<!-- <script lang="ts">
	import InputOtp from '$lib/components/generic/input-otp.svelte';

	let otp = $state('');

</script>

<InputOtp firstInputGroupLength={4} secondInputGroupLength={4} bind:value={otp} />

<p>Entered OTP: {otp}</p> -->
