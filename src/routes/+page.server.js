import db from "$lib/db.js"

export async function load() {
    return {
        gruppen: db.getGruppen()
    };
}
