
import { MongoClient, ObjectId } from 'mongodb'; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db('prototyping') // select database

//////////////////////////////////////////
// Zitate
//////////////////////////////////////////

// Get all zitate
async function getZitate() {
    let zitate = [];
    try {
        const collection = db.collection('zitate');

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        const query = {};

        // Get all objects that match the query
        zitate = await collection.find(query).toArray();
        zitate.forEach(zitat => {
            zitat._id = zitat._id.toString(); // convert ObjectId to String
        });
    } catch (error) {
        // TODO: errorhandling
    }
    return zitate;
}

async function getZitateByGruppeId(gruppenId) {
    let zitate = [];
    try {
        const collection = db.collection('zitate');

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        const query = [
            {'$match': { 'gruppe': gruppenId } }, 
            { '$addFields': { 'personId': { '$toObjectId': '$person' } } }, 
            { '$lookup': {
                    'from': 'personen',
                    'localField': 'personId',
                    'foreignField': '_id',
                    'as': 'person'
                } }, 
            { '$project': {
                    'person': {
                        '$first': '$person'
                    },
                    'zitat': 1,
                    'gruppe': 1,
                    'beschreibung': 1,
                    'datum': 1,
                    'bild': 1
                } } ]
        // Get all objects that match the query
        zitate = await collection.aggregate(query).toArray();
        zitate.forEach(zitat => {
            zitat._id = zitat._id.toString(); // convert ObjectId to String
            zitat.person._id = zitat.person._id.toString();
        });
    } catch (error) {
    }
    return zitate;
}

// Get zitat by id
async function getZitat(zitatId) {
    let zitat = null;
    try {
        const collection = db.collection('zitate');
        const query = [
            {'$match': { '_id': new ObjectId(zitatId) } }, 
            { '$addFields': { 'personId': { '$toObjectId': '$person' } } }, 
            { '$lookup': {
                    'from': 'personen',
                    'localField': 'personId',
                    'foreignField': '_id',
                    'as': 'person'
                } }, 
            { '$project': {
                    'person': {
                        '$first': '$person'
                    },
                    'zitat': 1,
                    'gruppe': 1,
                    'beschreibung': 1,
                    'datum': 1,
                    'bild': 1
                } } ]
        zitat = await collection.aggregate(query).toArray();
        zitat = zitat[0];

        if (!zitat) {
            console.log("No zitat with id " + zitatId);
            // TODO: errorhandling
        } else {
            zitat._id = zitat._id.toString(); // convert ObjectId to String
            zitat.person._id = zitat.person._id.toString();
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return zitat;
}

// create an zitat
async function createZitat(zitat) {
    try {
        const collection = db.collection('zitate');
        const result = await collection.insertOne(zitat);
        return result.insertedId.toString(); // convert ObjectId to String
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

// update zitat
// returns: id of the updated zitat or null, if zitat could not be updated
async function updateZitat(zitat) {

    try {
        let id = zitat._id;
        delete zitat._id; // delete the _id from the object, because the _id cannot be updated
        const collection = db.collection('zitate');
        const query = { _id: new ObjectId(id) }; // filter by id
        const result = await collection.updateOne(query, { $set: zitat });

        if (result.matchedCount === 0) {
            console.log("No zitat with id " + id);
            // TODO: errorhandling
        }
        else {
            console.log("Zitat with id " + id + " has been updated.");
            return id;
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

// delete zitat by id
// returns: id of the deleted zitat or null, if zitat could not be deleted
async function deleteZitat(id) {

    try {
        const collection = db.collection('zitate');
        const query = { _id: new ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            console.log("No object with id " + id)
        }
        else {
            console.log("Object with id " + id + " has been successfully deleted.")
            return id;
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

//////////////////////////////////////////
// Gruppen
//////////////////////////////////////////

// Get all gruppen
async function getGruppen() {
    let gruppen = [];
    try {
        const collection = db.collection('gruppen');

        const query = {};

        // Get all objects that match the query
        gruppen = await collection.find(query).toArray();
        gruppen.forEach(gruppe => {
            gruppe._id = gruppe._id.toString(); // convert ObjectId to String
        });

    } catch (error) {
        console.log(error)
    }
    return gruppen;
}

// Get gruppe by id
async function getGruppe(id) {
    let gruppe = null;
    try {
        const collection = db.collection('gruppen');
        const query = { _id: new ObjectId(id) }; // filter by id
        gruppe = await collection.findOne(query);

        if (!gruppe) {
            console.log("No gruppe with id " + id);
        } else {
            gruppe._id = gruppe._id.toString();  // convert ObjectId to String
        }
    } catch (error) {
        console.log(error.message);
    }
    return gruppe;
}

// create an gruppe
async function createGruppe(gruppe) {
    try {
        const collection = db.collection('gruppen');
        const result = await collection.insertOne(gruppe);
        return result.insertedId.toString(); // convert ObjectId to String
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

// update gruppe
// returns: id of the updated gruppe or null, if gruppe could not be updated
async function updateGruppe(gruppe) {

    try {
        let id = gruppe._id;
        delete gruppe._id; // delete the _id from the object, because the _id cannot be updated
        const collection = db.collection('gruppen');
        const query = { _id: new ObjectId(id) }; // filter by id
        const result = await collection.updateOne(query, { $set: gruppe });

        if (result.matchedCount === 0) {
            console.log("No gruppe with id " + id);
        }
        else {
            console.log("Gruppe with id " + id + " has been updated.");
            return id;
        }
    } catch (error) {
        console.log(error.message);
    }
    return null;
}

// delete gruppe by id
// returns: id of the deleted gruppe or null, if gruppe could not be deleted
async function deleteGruppe(id) {

    try {
        const collection = db.collection('gruppen');
        const query = { _id: new ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            console.log("No object with id " + id)
        }
        else {
            console.log("Object with id " + id + " has been successfully deleted.")
            return id;
        }
    } catch (error) {
        console.log(error.message);
    }
    return null;
}

// get all personen
async function getPersonen() {
    let personen = [];
    try {
        const collection = db.collection('personen');

        const query = {};

        // Get all objects that match the query
        personen = await collection.find(query).toArray();
        personen.forEach(person => {
            person._id = person._id.toString(); // convert ObjectId to String
        });
    } catch (error) {
        console.log(error.message);
    }
    return personen;
}

// delete person by id
async function deletePerson(id) {

    try {
        const collection = db.collection('personen');
        const query = { _id: new ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            console.log("No object with id " + id)
        }
        else {
            console.log("Object with id " + id + " has been successfully deleted.")
            return id;
        }
    } catch (error) {
        console.log(error.message);
    }
    return null
}

async function createPerson(person) {
    try {
        const collection = db.collection('personen');
        const result = await collection.insertOne(person);
        return result.insertedId.toString(); // convert ObjectId to String
    } catch (error) {
        console.log(error.message);
    }
    return null;
}

async function getPersonenByGruppenId(gruppenId) {
    let personen = [];
    try {
        const collection = db.collection('gruppen');

        const query = [
            { '$match': { _id: new ObjectId(gruppenId) } },
            { '$unwind': { path: '$personen' } },
            { '$project': { personen: 1, _id: 0 } },
            { '$addFields': { personid: { '$toObjectId': '$personen' } } },
            {
                '$lookup': {
                    from: 'personen',
                    localField: 'personid',
                    foreignField: '_id',
                    as: 'result'
                }
            },
            { '$addFields': { person: { '$first': '$result' } } },
            { '$addFields': { _id: '$person._id', name: '$person.name' } },
            { '$project': { name: 1 } }
        ];

        // Get all objects that match the query
        //personen = await collection.find(query).toArray();
        personen = await collection.aggregate(query).toArray();
        personen.forEach(person => {
            person._id = person._id.toString(); // convert ObjectId to String
        });
    } catch (error) {
        console.log(error.message);
    }
    return personen;
}

async function isPersonInGruppe(personId) {
    try {
        const collection = db.collection('gruppen');
        const query = {"personen": personId}; // filter by id
        collection.countDocuments(query, function(err, count) {
            if (err) throw err;
        
            if (count > 0) {
              return true;
            } else {
              return false;
            }

        });

    } catch (error) {
        console.log(error.message);
    }
    return true;
}



// export all functions so that they can be used in other files
export default {
    getZitate,
    getZitateByGruppeId,
    getZitat,
    createZitat,
    updateZitat,
    deleteZitat,
    getGruppen,
    getGruppe,
    createGruppe,
    updateGruppe,
    deleteGruppe,
    getPersonen,
    deletePerson,
    createPerson,
    getPersonenByGruppenId,
    isPersonInGruppe
}
