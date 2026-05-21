<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { Loader } from '@lucide/svelte';
	import FilePreviewMin from './FilePreviewMin.svelte';

	let files = $state<FileList | null | undefined>();
	let hasFile = $derived.by(() => {
		if (!files) return false;
		return files.length > 0;
	});

	let isUploading = $state(false);
</script>

<div class="flex flex-col items-center justify-center">
	<form
		enctype="multipart/form-data"
		method="POST"
		action="?/savefiles"
		class="flex flex-col gap-3"
		use:enhance={({}) => {
			isUploading = true;
			return async ({ result }) => {
				files = null;
				isUploading = false;
				await invalidate('/api/files');
			};
		}}
	>
		<label
			for="file"
			class="border- flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-700 px-12 py-8 transition duration-300 hover:border-orange-600 hover:bg-slate-700/80"
		>
			{#if !hasFile}
				<span>upload file here.</span>
			{/if}
		</label>
		<input id="file" name="file" type="file" bind:files class="hidden" multiple />
		<button
			disabled={isUploading}
			type="submit"
			class="flex justify-center rounded-lg bg-orange-500 px-4 py-3 text-slate-100 transition-all duration-300 hover:bg-orange-600 hover:text-slate-300"
		>
			{#if isUploading}
				<Loader class="animate-spin" />
			{:else}
				<span>upload</span>
			{/if}
		</button>
	</form>

	{#if files && files.length > 0}
		<div class="mt-4 flex flex-col gap-1 rounded-lg bg-slate-900/80 p-4">
			{#each files as file}
				<FilePreviewMin {file} />
				<!-- <span class="text-slate-400">{file.name}</span> -->
			{/each}
		</div>
	{/if}
</div>
