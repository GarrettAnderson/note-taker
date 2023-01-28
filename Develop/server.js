const express = require('express')
const path = require('path');
const fs = require('fs')
const noteData = require('./db/db.json')
const htmlRouter = require('./routes/htmlRoutes')
const uuid = require('./helpers/uuid');
// const { parse } = require('path');
const PORT = 3000
const app = express()

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', htmlRouter)

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request made`);

  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if(err) {
      console.log(err)
    } else {
      res.status(200).send(data);
    }
  })
  // console.log(noteData)
  // res.send(noteData) 
})

app.post('/api/notes', (req, res) => {
  console.table(`${req.body.title} ${req.body.text} POST call received`)
  const { title, text } = req.body
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid()
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
          (writeErr) => {
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
              res.json(parsedNotes)
          }
        )
      }
    })
    
    // const response = {
    //   status: 'success',
    //   body: newNote
    // }

    // console.log(response)
    // res.status(200).json(response) 
  } else {
    res.status(500).json('Error in posting review');

  }
})


app.delete('/api/notes/:id', (req, res) => {
  let noteId = req.params.id
  console.info(`${noteId} called to remove note`)
  // read notes from db/db.json
  let db = JSON.parse(fs.readFileSync('./db/db.json'))
  console.log(db)
  let deleteNotes = db.filter((note) => note.id !== req.params.id)
  console.log(deleteNotes)

  fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes))
  res.json(deleteNotes)
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  