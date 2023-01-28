const express = require('express')
const path = require('path');
const fs = require('fs')
const noteData = require('./db/db.json')
const uuid = require('./helpers/uuid');
// const { parse } = require('path');
const PORT = 3000
const app = express()

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request made`);

  // console.log(noteData)
  res.status(200).json(noteData);
  // res.send(noteData)
})

app.post('/api/notes', (req, res) => {
  console.table(`${req.body.title} ${req.body.text} POST call received`)
  const { title, text } = req.body
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid()
    }
    console.log(newNote)
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if(err) {
        console.log(err)
      } else {
        const parsedNotes = JSON.parse(data)
        parsedNotes.push(newNote)
        // console.log(parsedNotes) 
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        )
      }
    })
    
    const response = {
      status: 'success',
      body: newNote
    }

    console.log(response)
    res.status(200).json(response)
  } else {
    res.status(500).json('Error in posting review');

  }
})


app.delete('/api/notes/:note_id', (req, res) => {
  let noteId = req.params.note_id ? req.params.note_id : '123'
  console.info(`${noteId} called to remove note`)
  // read notes from db/db.json
  let db = JSON.parse(fs.readFileSync('./db/db.json'))
  console.log(db)
  // let deleteNotes = db.filter((note) => note.note_id !== req.params.id)
  let deletedNotes = []

  for (var i = 0; i < db.length; i++) {
    console.log(req.params.note_id)
    if (db[i].note_id === req.params.id) {
      deletedNotes.push(db[i].note_id)
    }
  }
  console.log(deletedNotes)

  // fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes))
  res.json(db)
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  