import db from "$lib/db.js"

export async function load({ params }) {
    return {
        zitate: db.getZitateByGruppeId(params.gruppe_id),
        gruppe: db.getGruppe(params.gruppe_id)
    };
}