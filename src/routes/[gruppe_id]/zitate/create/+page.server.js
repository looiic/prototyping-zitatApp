import db from "$lib/db.js"

export async function load({ params }) {

    return {
        gruppe: db.getGruppe(params.gruppe_id),
        personen: db.getPersonenByGruppenId(params.gruppe_id)
    }
}
