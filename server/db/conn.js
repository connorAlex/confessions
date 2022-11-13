const { MongoClient } = require("mongodb");
const url = process.env.ATLAS_URI;
const client = new MongoClient(url);
let dbName = "test_db";
let db_connect;

module.exports = {
  run: async () => {
    try {
      db_connect = await client.connect();
      console.log("Connected Correctly to DB");
      return db_connect;
    } catch (err) {
      console.log(err.stack);
    }
  },
  close: async () => {
    await client.close();
    console.log("Close DB Connection");
  },
  getDb: async () => {
    return await client.db("test_db");
  },
};
