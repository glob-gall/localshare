<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PreviewFile } from '$lib/types/preview-file';
	import { RefreshCw } from '@lucide/svelte';
	import FilePreview from '../components/FilePreview.svelte';
	import UploadFile from '../components/UploadFile.svelte';
	import type { PageProps } from './$types';

	let props: PageProps = $props();

	let files: PreviewFile[] = $derived(props.data.files);

	async function refetch() {
		await invalidate('/api/files');
	}
</script>

<div class="flex min-h-80 items-center justify-center">
	<UploadFile />
</div>

<button
	onclick={refetch}
	class="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-slate-100 transition-all duration-300 hover:bg-orange-600 hover:text-slate-300"
	><span>reload files</span> <RefreshCw size={18} />
</button>
<div class="columns-2 gap-4 space-y-4 p-4 sm:columns-4 md:columns-6 lg:columns-8">
	{#each files as file}
		<FilePreview {file} />
	{/each}
</div>
