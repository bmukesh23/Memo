const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.json({data: "hello"});
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));

module.exports = app;