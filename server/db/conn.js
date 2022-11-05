const { MongoClient } = require("mongodb");
const url = process.env.ATLAS_URI;
console.log(url);
const client = new MongoClient(url);
let dbName = "test_tb";

module.exports = {
    run: async () => {
        try {
            await client.connect();
            console.log("Connected Correctly to server");
            const db = client.db(dbName);
            
            const col = db.collection("test_collection");
    
            let confessionDocument = {
                'userName': 'TestUserName',
                'confession': "I've acted out at family",
                'time': new Date().toUTCString()
            }
    
            // insert the doc, wait for promise so we can then read it back
            const p = await col.insertOne(confessionDocument);
            //find one document
            const myDoc = await col.findOne();
            console.log(myDoc);
        } catch (err) {
            console.log(err.stack);
    
        }
    },
    close: async () => {
        await client.close();
    },
    getDb: () => {return db}
};
