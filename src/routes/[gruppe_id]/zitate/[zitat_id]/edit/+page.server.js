import db from "$lib/db.js"

export async function load({ params }) {

    return {
        zitat: db.getZitat(params.zitat_id),
        personen: db.getPersonenByGruppenId(params.gruppe_id)
    };
}
