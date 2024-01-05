import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const person = await request.json();
	const result = await db.createPerson(person);
	return json({ id: result });
}
