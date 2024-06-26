require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const config = {
    connectionString: process.env.MONGODB_URI,
    PORT: process.env.PORT || 8000,
}

mongoose.connect(config.connectionString).then(() => console.log("MongoDB connected")).catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'https://noteup-ai.vercel.app',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

app.use(userRoutes);
app.use(noteRoutes);

app.listen(config.PORT, () => console.log(`Server Started at ${config.PORT}`));

module.exports = app;