const express = require("express");
const authControllers = require("../controllers/auth.controller");
const router = express.Router();

router.get("/signup", authControllers.signup);

router.get("/login", authControllers.login)

router.get("/logout", authControllers.logout)

module.exports = router;