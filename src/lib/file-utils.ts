import { extname } from 'node:path';

const MIME_MAP: Record<string, string> = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.pdf': 'application/pdf',
	'.txt': 'text/plain',
	'.json': 'application/json',
	'.mp4': 'video/mp4',
	'.mp3': 'audio/mpeg'
};

export function getMimeType(fileName: string) {
	return MIME_MAP[extname(fileName).toLocaleLowerCase()] ?? 'application/octet-stream';
}
export function isPrewable(type: string) {
	return type.startsWith('image/') || type.startsWith('video/');
	// type.startsWith('audio/') ||
	// type.startsWith('text/')
	// type === 'application/pdf'
}
