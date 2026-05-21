// import { mkdir } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Actions } from './$types';

export const actions = {
	savefiles: async (event) => {
		const formData = await event.request.formData();
		const files = formData.getAll('file');
		const uploadedFiles = files.filter(
			(value): value is File => value instanceof File && value.size > 0
		);

		console.log('/////////////////////////////////////');

		files.forEach((file) => {
			console.log({ file });
		});
		console.log('/////////////////////////////////////');
		const uploadDir = join(process.cwd(), 'uploads');
		// await mkdir(uploadDir);

		const savedFiles = await Promise.all(
			uploadedFiles.map(async (file) => {
				const url = join(uploadDir, file.name);

				const buffer = Buffer.from(await file.arrayBuffer());
				await writeFile(url, buffer);

				return { url };
			})
		);
		console.log({ uploadDir });
		console.log({ savedFiles });
		console.log({ finished: true });

		return { savedFiles };
	}
} satisfies Actions;
