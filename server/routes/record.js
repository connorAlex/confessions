const { response } = require("express");
const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const profanity = require("@2toad/profanity").profanity;

//router is an instance of the express router. Will be used to define routes.
// https://expressjs.com/en/guide/routing.html
const router = express.Router();

// get a random confession.
router.get("https://localhost:8080/view", async (req, res) => {
  const db_connection = await dbo.run();
  const db = db_connection.db("test_db");

  try {
    let randomConfession = await db
      .collection("test_collection")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray()
      .then((data) => data);
    res.status(200).send(await randomConfession[0]);
  } catch (err) {
    console.error(err.stack);
  }

  dbo.close();
});

// Create a new confession
router.post("https://localhost:8080/", async (req, res) => {
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
  res.text("record added");
});

module.exports = router;
