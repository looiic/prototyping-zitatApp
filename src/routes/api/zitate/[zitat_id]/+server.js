import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }) {
	const id = params.zitat_id;
	const result = await db.deleteZitat(id);
	return json({ id: result });
}

export async function PUT({ request }) {
    const zitat = await request.json();
	const result = await db.updateZitat(zitat);
	return json({ id: result });
}
