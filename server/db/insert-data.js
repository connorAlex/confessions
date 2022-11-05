const {MongoClient} = require('mongodb');

const url = "mongodb+srv://cconAlex:rocketfish1970@cluster0.56bgb1d.mongodb.net//test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

const dbName = "test_db";

async function run() {
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

    } finally {
        await client.close();
    }
}

run().catch(console.dir);