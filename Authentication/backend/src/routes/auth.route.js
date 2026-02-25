const express = require("express");

const router = express.Router();

router.get("/signup", async(req,res) =>{
    await res.send("signup route");
})

router.get("/login", async(req,res) =>{
    await res.send("login route");
})


module.exports = router;