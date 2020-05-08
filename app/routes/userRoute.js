var express = require("express");

var { createUser, loginUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);

module.exports = router;
