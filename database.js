const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

async function put(collectionName, objectToInsert) {
    try {
        let client = await MongoClient.connect(url);
        let db = client.db("Solvathon");
        let collection = db.collection(collectionName);
        await collection.insertOne(objectToInsert);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
}

async function find(collectionName, filter) {
    let res = null;
    try {
        let client = await MongoClient.connect(url);
        let db = client.db("Solvathon");
        let collection = db.collection(collectionName);
        res = await collection.findOne(filter);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
    return res;
}

async function remove(collectionName, filter) {
    try {
        let client = await MongoClient.connect(url);
        let db = client.db("Solvathon");
        let collection = db.collection(collectionName);
        await collection.deleteOne(filter);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
}

let database = {
    put: put,
    find: find,
    remove: remove
};

module.exports = database;