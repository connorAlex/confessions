const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//router is an instance of the express router. Will be used to define routes.
// https://expressjs.com/en/guide/routing.html
const router = express.Router();


// Home page route.
router.get("/", (req, res) => {
    res.send("Home Page says hello");
});

// Create a new confession
router.post("/", (req,res) => {
    let db_connect = dbo.getDb();
    let newConfession = {
        
    }
})

module.exports = router;