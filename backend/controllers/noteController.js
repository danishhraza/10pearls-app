const Note = require('../models/Note');


exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const note = await Note.create({
      user: req.user,
      title,
      content
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        await note.save();
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};