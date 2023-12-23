import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const gruppe = await request.json();
	const result = await db.createGruppe(gruppe);
	return json({ id: result });
}
