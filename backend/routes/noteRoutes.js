const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} = require('../controllers/noteController');

router.use(auth); // Apply middleware to all routes below

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;

