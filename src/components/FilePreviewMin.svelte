<script lang="ts">
	import { fileSize } from '$lib/file-size';
	import { FileText, Image, Video } from '@lucide/svelte';
	type FilePreviewPros = {
		file: File;
	};
	type FileTp = 'IMG' | 'VIDEO' | 'OTHER';

	const { file }: FilePreviewPros = $props();
	let fileType: FileTp = $derived.by(() => {
		if (file.type.startsWith('image')) return 'IMG';
		if (file.type.startsWith('video')) return 'VIDEO';

		return 'OTHER';
	});
	// const url = $derived(URL.createObjectURL(file));
</script>

<div class="flex flex-row items-center gap-2 text-sm font-bold text-slate-300">
	{#if fileType === 'IMG'}
		<Image />
	{:else if fileType === 'VIDEO'}
		<Video />
	{:else}
		<FileText />
	{/if}
	<span class="flex-1">{file.name}</span>
	<span class="w-16 text-end text-slate-600">
		{fileSize(file.size)}
	</span>
</div>
