import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }) {
	const id = params.person_id;
	const isPersonInGruppe = await db.isPersonInGruppe(id);
	if (isPersonInGruppe) {
		return json({ error: 'Person ist noch in einer Gruppe' }, { status: 400 });
	}
	const result = await db.deletePerson(id);
	return json({ id: result });
}
