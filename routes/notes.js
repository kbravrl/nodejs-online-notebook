const express = require("express");
const router = express.Router();

let notes = []; // Json objelerinde notları tutacak

// List all notes
router.get('/', (req, res) => {
    res.render('notes', {title: 'Notlar', notes});
});

// Show the form to add a new note
router.get('/add', (req, res) => {
    res.render('addNote', {title: 'Yeni Not Ekle'});
});

// Add a new note
router.post('/add', (req, res) => {
    const {title, content} = req.body;
    notes.push({id: notes.length +1, title, content})
    res.redirect('/notes');
});

// Show the form to edit a note
router.get('/edit/:id', (req, res) => {
    const note = notes.find(n => n.id == req.params.id);
    if(note) {
        res.render('editNote', {title: 'Notu Düzenle', note});
    } else {
        res.redirect('/notes');
    }
});

// Update a note
router.post('/edit/:id', (req, res) => {
    const {title, content} = req.body;
    const note = notes.find(n => n.id == req.params.id);

    if(note) {
        note.title= title;
        note.content = content;
    }

    res.redirect('/notes');
});

module.exports = router;



