import { getMimeType, isPrewable } from '$lib/file-utils';
import type { PreviewFile } from '$lib/types/preview-file';
import { json } from '@sveltejs/kit';
import type { Dirent } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function getFileProperties(file: Dirent<string>): Promise<PreviewFile> {
	const type = getMimeType(file.name);
	const encoded = encodeURIComponent(file.name);

	const filePath = join(file.parentPath, file.name);
	const stats = await stat(filePath);

	return {
		type,
		name: file.name,
		preview: isPrewable(type) ? `/api/files/preview/${encoded}` : null,
		download: `/api/files/download/${encoded}`,
		size: stats.size
	};
}

export async function GET() {
	const uploadDir = join(process.cwd(), 'uploads');
	const entries = await readdir(uploadDir, { withFileTypes: true });

	const onlyFiles = entries.filter((entry) => entry.isFile());

	const promises: Promise<PreviewFile>[] = [];
	for (const file of onlyFiles) {
		promises.push(getFileProperties(file));
	}

	const files = await Promise.all(promises);

	return json({ files });
}
