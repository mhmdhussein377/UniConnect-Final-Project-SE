const express = require("express");
const router = express.Router();


router.post("/login", Login);

router.post("/register", Register);

module.exports = router;