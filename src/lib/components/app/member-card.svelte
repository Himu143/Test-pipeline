<script lang="ts">
	type Logo =
		| string
		| {
				image: string;
				link?: string;
		  }[];

	type Props = {
		image: string;
		name: string;
		jobTitle: string;
		logo?: Logo;
	};

	let { image, name, jobTitle, logo }: Props = $props();
</script>

<div class="relative h-137 w-full max-w-132">
	<!-- Background gradient container -->
	<div
		class="absolute inset-0 flex items-center justify-center rounded-3xl border-4 border-primary"
	>
		<!-- Profile Image -->
		<div
			class="h-full w-full rounded-2xl bg-cover bg-center bg-no-repeat"
			style="background-image: url('{image}')"
			role="img"
			aria-label="Portrait of {name}"
		></div>
	</div>
	<!-- Info Card -->
	<div
		class="absolute bottom-4 left-1/2 w-[calc(100%-32px)] -translate-x-1/2 rounded-xl bg-white px-4 py-4 shadow-lg"
	>
		<div class="flex-wrap items-center justify-between md:flex">
			<div class="flex flex-1 flex-col">
				<h3
					class="truncate font-poppins text-lg font-semibold text-black lg:overflow-visible lg:text-2xl lg:text-clip lg:whitespace-normal xl:max-w-70"
				>
					{name}
				</h3>
				<p
					class="truncate font-poppins text-lg font-normal text-black lg:overflow-visible lg:text-2xl lg:text-clip lg:whitespace-normal"
				>
					{jobTitle}
				</p>
			</div>
			{#if logo}
				<div class="flex shrink-0 items-center gap-3">
					{#if Array.isArray(logo)}
						{#each logo as item}
							<a href={item.link} target="_blank" rel="noopener noreferrer">
								<div
									class="h-16 w-18 bg-contain bg-center bg-no-repeat hover:opacity-80"
									style="background-image:url('{item.image}')"
								/>
							</a>
						{/each}
					{:else}
						<div
							class="h-15 w-34 bg-contain bg-center bg-no-repeat"
							style="background-image:url('{logo}')"
						/>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
