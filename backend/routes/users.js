const express = require("express");
const { authenticateToken } = require("../utilities");
const usersController = require("../controllers/users");

const router = express.Router();

router.get("/get-user", authenticateToken, usersController.getAllUsers);

router.post("/create-account", authenticateToken, usersController.postSigninUsers);

module.exports = router;