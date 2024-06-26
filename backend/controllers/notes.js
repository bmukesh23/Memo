const Note = require("../models/note.model");

exports.getAllNotes =  async (req, res) => {
    const { uid } = req.user;

    try {
        const notes = await Note.find({ userId: uid }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

exports.postAddNotes = async (req, res) => {
    const { title, content, tags } = req.body;
    const { uid } = req.user;

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
            userId: uid,
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
}

exports.putEditNotesById = async (req, res) => {
    const noteId = req.params.noteId;

    const { title, content, tags, isPinned } = req.body;
    const { uid } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: uid });

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
}

exports.deleteNotesById = async (req, res) => {
    const noteId = req.params.noteId;
    const { uid } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: uid });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: uid });

        return res.json({
            error: false,
            message: "Note deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

exports.updatePinnedNoteById = async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { uid } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: uid });

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
}

exports.getSearchNotes = async (req, res) => {
    const { uid } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: uid,
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
}