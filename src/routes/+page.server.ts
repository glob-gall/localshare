import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	savefiles: async (event) => {
		const formData = await event.request.formData();
		const files = formData.getAll('file');
		const uploadedFiles = files.filter(
			(value): value is File => value instanceof File && value.size > 0
		);

		const uploadDir = join(process.cwd(), 'uploads');

		const savedFiles = await Promise.all(
			uploadedFiles.map(async (file) => {
				const url = join(uploadDir, file.name);

				const buffer = Buffer.from(await file.arrayBuffer());
				await writeFile(url, buffer);

				return { url };
			})
		);

		return { savedFiles };
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ fetch, depends }) => {
	depends('data:files');
	const res = await fetch('/api/files');
	const json = await res.json();

	return json;
};
