<script lang="ts">
	import { fileSize } from '$lib/file-size';
	import type { PreviewFile } from '$lib/types/preview-file';
	import { Download, FileText, Image, Video } from '@lucide/svelte';
	type FilePreviewPros = {
		file: PreviewFile;
	};
	type FileTp = 'IMG' | 'VIDEO' | 'OTHER';

	const { file }: FilePreviewPros = $props();
	let fileType: FileTp = $derived.by(() => {
		if (file.type.startsWith('image')) return 'IMG';
		if (file.type.startsWith('video')) return 'VIDEO';

		return 'OTHER';
	});
	// const url = $derived(URL.createObjectURL(file));

	function downloadFile() {}
</script>

<div class="group relative overflow-hidden rounded-lg transition-all duration-300">
	{#if fileType === 'IMG'}
		<img src={file.preview} alt={file.name} class="flex-1 object-cover" />
	{:else if fileType === 'VIDEO'}
		<video src={file.preview} class="flex-1 object-cover"> <track kind="captions" /></video>
	{:else}
		<div class="h-48 w-full bg-slate-100 p-4">
			<p class="font-bold text-slate-800">
				{file.name}
			</p>
		</div>
	{/if}
	<div class="absolute right-0 bottom-0 left-0">
		<div class="h-10 bg-linear-to-b from-transparent via-stone-950/60 to-stone-950/60"></div>
		<div
			class="flex items-center justify-between bg-stone-950/60 p-2 md:h-0 md:p-0 md:group-hover:min-h-fit md:group-hover:p-2"
		>
			<div class="">
				<span
					class="flex flex-row items-center gap-2 text-sm font-bold text-stone-300 md:invisible md:group-hover:visible"
				>
					{#if fileType === 'IMG'}
						<Image />
					{:else if fileType === 'VIDEO'}
						<Video />
					{:else}
						<FileText />
					{/if}
					{fileSize(file.size)}
				</span>
			</div>

			<a
				href="/api/files/preview/{file.name}"
				target="_blank"
				class="cursor-pointer rounded bg-transparent p-0.5 text-stone-300 transition duration-200 hover:bg-stone-100 hover:text-stone-800 md:invisible md:group-hover:visible"
			>
				<Download class="" />
			</a>
		</div>
	</div>
</div>
