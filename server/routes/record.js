const { response } = require("express");
const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//router is an instance of the express router. Will be used to define routes.
// https://expressjs.com/en/guide/routing.html
const router = express.Router();

// get a random confession.
router.get("/view", async (req, res) => {
    const db_connection = await dbo.run();
    const db = db_connection.db("test_db");

    try {
        let randomConfession = await db.collection("test_collection").aggregate([{ $sample: {size: 1} }]).toArray().then(data => data);
        res.send(await randomConfession[0]["confession"]);
    } catch (err) {
        console.error(err.stack);
    }

    db_connection.close();
});

// Create a new confession
router.post("/", async (req,res) => {
    const db_connection = await dbo.run();
    const db = db_connection.db("test_db");
    const newConfession  = {
        "userName": req.body.userName,
        "confession": req.body.confession,
        "time": req.body.time
    }
    try {
        const postResult = await db.collection("test_collection").insertOne(newConfession);
        console.log( await postResult);
    } catch (err) {
        console.error(err.stack);
    }
    db_connection.close();
    res.json("record added");
});

module.exports = router;