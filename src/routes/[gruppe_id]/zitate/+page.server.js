import db from "$lib/db.js"



export async function load({ params }) {
    console.log(params);
    return {
        zitate: db.getZitateByGruppeId(params.gruppe_id)
    };
}