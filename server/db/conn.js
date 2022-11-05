const { MongoClient } = require("mongodb");
const url = process.env.ATLAS_URI;
console.log(url);
const client = new MongoClient(url);
let dbName = "test_db";

module.exports = {
    run: async () => {
        try {
            await client.connect();
            console.log("Connected Correctly to server");
        } catch (err) {
            console.log(err.stack);
        }
    },
    close: async () => {
        await client.close();
    },
    getDb: () => {return db}
};
