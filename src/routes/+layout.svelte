<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="bg-slate-800 pb-12">
	<div class="container mx-auto flex min-h-dvh w-full flex-col items-center justify-center p-4">
		{@render children()}
	</div>
</div>

<footer class="flex w-full items-center justify-center bg-slate-900 px-4 py-12">
	<p class="text-slate-600">Luis Felipe Galleguillos Campos | Todos os direitos reservados</p>
</footer>
