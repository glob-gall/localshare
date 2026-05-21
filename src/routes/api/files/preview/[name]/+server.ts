import { getMimeType } from '$lib/file-utils';
import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
// import process from 'node:process';

export async function GET({ params }) {
	const decoded = basename(params.name);
	const filePath = join(process.cwd(), 'uploads', decoded);

	try {
		const file = await readFile(filePath);

		return new Response(file, {
			headers: {
				'Content-Type': getMimeType(decoded),
				'Content-Disposition': `inline; filename*=UTF-8''${encodeURIComponent(decoded)}`
			}
		});
	} catch {
		throw error(404, 'file not found');
	}
}
