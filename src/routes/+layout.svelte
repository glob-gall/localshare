<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="bg-slate-800">
	<div class="container mx-auto flex min-h-dvh w-full flex-col items-center justify-center">
		{@render children()}
	</div>
</div>
