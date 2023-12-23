import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }) {
	const id = params.gruppe_id;
	const result = await db.deleteGruppe(id);
	return json({ id: result });
}

export async function PUT({ request }) {
    const gruppe = await request.json();
	const result = await db.updateGruppe(gruppe);
	return json({ id: result });
}