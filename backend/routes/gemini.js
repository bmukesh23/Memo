const express = require("express");
const geminiController = require("../controllers/gemini");

const router = express.Router();

router.post('/gemini', geminiController.postCompleteText);

module.exports = router;