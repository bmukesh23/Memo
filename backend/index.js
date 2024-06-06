require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");

const config = {
    connectionString: process.env.MONGODB_URI,
    PORT: process.env.PORT || 8000,
}

mongoose.connect(config.connectionString).then(() => console.log("MongoDB connected")).catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ eror: true, message: "Full Name is required" });
    }

    if (!email) {
        res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        res.status(400).json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({ error: true, message: "User already exists" });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400).json({ error: true, message: "User not found" });
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

        return res.json({
            error: false,
            message: "Login Successful",
            accessToken,
            email,
        });
    } else {
        return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }
})

app.listen(config.PORT, () => console.log(`Server Started at ${config.PORT}`));

module.exports = app;