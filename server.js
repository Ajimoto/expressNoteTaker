const express = require('express');
const path = require('path');
const fs = require('fs');

const noteData = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// GET Route for homepage
app.get('/home', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// GET api notes
app.get('/api/notes', (req, res) =>
	res.sendFile(path.join(__dirname, 'db/db.json'))
);
// POST new note
app.post('/api/notes', (req, res) => {
	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		if (err) {
			throw err;
		}
		const notes = JSON.parse(data);
		const newNote = {
			title: req.body.title,
			text: req.body.text,
			id: notes.length + 1,
		};
		notes.push(newNote);
		console.log(notes);
		fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
			console.log(err)
		);
	});
	res.json({ ok: true });
});

// port data
app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT} 🚀`)
);
