<script lang="ts">
	let { children } = $props();
</script>

<section
	class="flex min-h-screen flex-col bg-[radial-gradient(50%_50%_at_50%_50%,#FFF_50.35%,#FDF1CD_100%)]"
>
	<div class="pl-6 pt-6">
		<a href="/">
			<img
			src="/images/nav/circle-final-logo.png"
			alt="Circle Logo"
			class="h-20 w-60 lg:h-26 lg:w-77"
		/>
		</a>
	</div>
	<div class="flex flex-1 items-center justify-center py-8 sm:py-0">
		{@render children?.()}
	</div>
</section>
