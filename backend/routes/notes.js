const express = require('express');
const { authenticateToken } = require("../utilities");
const notesController = require('../controllers/notes');

const router = express.Router();

router.get("/get-all-notes", authenticateToken, notesController.getAllNotes);

router.post("/add-note", authenticateToken, notesController.postAddNotes);

router.put("/edit-note/:noteId", authenticateToken, notesController.putEditNotesById);

router.delete("/delete-note/:noteId", authenticateToken, notesController.deleteNotesById);

router.put("/update-note-pinned/:noteId", authenticateToken, notesController.updatePinnedNoteById);

router.get("/search-notes/", authenticateToken, notesController.getSearchNotes);

module.exports = router;