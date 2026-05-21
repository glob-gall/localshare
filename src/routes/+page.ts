export async function load({ fetch }) {
	const res = await fetch('/api/files');
	const json = await res.json();

	return json;
}
