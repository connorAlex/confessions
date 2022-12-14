const { response } = require("express");
const express = require("express");
const cors = require('cors');
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const profanity = require("@2toad/profanity").profanity;

//router is an instance of the express router. Will be used to define routes.
// https://expressjs.com/en/guide/routing.html
const router = express.Router();
router.use(cors());

// get a random confession.
router.get("/view", async (req, res) => {
  const db_connection = await dbo.run();
  const db = db_connection.db("test_db");

  try {
    let randomConfession = await db
      .collection("test_collection")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray()
      .then((data) => data);
    //res.json({a:1});
    res.status(200).json(await randomConfession[0]);
  } catch (err) {
    console.error(err.stack);
  }

  dbo.close();
});

// Create a new confession
router.post("/", async (req, res) => {
  const db_connection = await dbo.run();
  const db = db_connection.db("test_db");

  // https://github.com/2Toad/Profanity Profanity Check - Thanks 2Toad!
  if (profanity.exists(req.body.confession)) {
    db_connection.close();
    return;
  }
  
  const newConfession = {
    userName: req.body.userName,
    confession: req.body.confession,
    time: req.body.time,
  };
  try {
    const postResult = await db
      .collection("test_collection")
      .insertOne(newConfession);
    console.log(await postResult);
  } catch (err) {
    console.error(err.stack);
  }
  db_connection.close();
  res.send("record added");
});

module.exports = router;
