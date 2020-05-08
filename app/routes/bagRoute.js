var express = require("express");

var { createBag, getUserBag } = require("../controllers/bagController");

const router = express.Router();

router.get("/bag", getUserBag);
router.post("bag", createBag);

module.exports = router;
