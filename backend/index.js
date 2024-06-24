require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Note = require("./models/note.model");

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

// Create Account
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

    try {
        const existingUser = await User.findOne({ email: email }).lean();
        if (existingUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const accessToken = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000" });

        return res.json({
            error: false,
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
            accessToken,
            message: "Registration Successful",
        });
    } catch (error) {
        console.error('Sign-up error:', error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    try {
        const userInfo = await User.findOne({ email: email }).lean();

        if (!userInfo) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        const isMatch = bcrypt.compare(password, userInfo.password);

        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Invalid Credentials" });
        }

        const user = { id: userInfo._id, email: userInfo.email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000" });

        return res.json({
            error: false,
            message: "Login Successful",
            accessToken,
            email: userInfo.email,
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Google Auth
// app.post('/generate-token', async (req, res) => {
//     const { email, fullName } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: true, message: "Email is required" });
//     }

//     if (!fullName) {
//         return res.status(400).json({ error: true, message: "Name is required" });
//     }

//     try {
//         let userInfo = await User.findOne({ email: email }).lean();

//         if (!userInfo) {
//             const newUser = new User({
//                 fullName,
//                 email,
//                 password: "123345678"
//             });
//             userInfo = await newUser.save();
//         }

//         // const customToken = await admin.auth().createCustomToken(uid);
//         const customToken = jwt.sign({ id: userInfo._id, email: userInfo.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

//         return res.json({
//             error: false,
//             email: userInfo.email,
//             message: "Authentication is done successfully",
//             customToken,
//         });

//     } catch (error) {
//         console.error('Auth error:', error);
//         return res.status(500).json({ error: true, message: "Internal Server Error" });
//     }
// });

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const isUser = await User.findById(user._id);

        if (!isUser) {
            return res.sendStatus(401);
        }

        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn
            },
            message: "User retrieved successfully",
        });
    } catch (error) {
        return res.sendStatus(500);
    }
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }

    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            message: "Note added Succesfully",
            note,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully"
        })
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

//Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Search Notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.listen(config.PORT, () => console.log(`Server Started at ${config.PORT}`));

module.exports = app;