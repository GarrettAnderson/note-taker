const notes = require('express').Router();
const fs = require('fs')
// const noteData = require('./db/db.json')
const uuid = require('../helpers/uuid')
const note = require('../helpers/fsUtils')

notes.get('/notes', (req, res) => {
    console.info(`${req.method} request made`);
    // note.getAllNotes()
    //     .then((notes) => {
    //         return res.json(notes)
    //     })
    // .catch((error) => res.status(500).json(error))
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if(err) {
        console.log(err)
      } else {
        res.status(200).send(data);
      }
    })
    // console.log(noteData)
    // res.send(noteData) 
  });
  


notes.post('/notes', (req, res) => {
    console.info(`${req.body.title} ${req.body.text} POST call received`)
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
  
  
  notes.delete('/notes/:id', (req, res) => {
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
  

  module.exports = notes;