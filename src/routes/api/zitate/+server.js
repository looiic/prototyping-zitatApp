import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const zitat = await request.json();
	const result = await db.createZitat(zitat);
	return json({ id: result });
}
