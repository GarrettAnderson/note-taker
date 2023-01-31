const fs = require('fs')
const util = require('util')
const uuid = require('./uuid')

const readNotes = util.promisify(fs.readFile)
const writeNote = util.promisify(fs.writeFile)

class Note {
    read() {
       return readNotes('./db/db.json', 'utf-8')
    }

    write(note) {
        writeNote('./db/db.json', JSON.stringify(note))
    }

    getAllNotes() {
        return this.read().then((notes) => {
            let resNotes;
            console.log(`notes ${notes}`)
            // if (notes)
            // try {
            //     resNotes = [].concat(JSON.parse(notes));
            // } catch (error) {
            //     resNotes = []
            // }
            // return resNotes;
        })
    }

    addANote(note) {
        const { title, text } = note
        if (title && text) {
          const newNote = {
            title,
            text,
            id: uuid()
          }
        //   console.log(newNote)
        return this.getAllNotes()
                .then((notes) => {
                    // [...notes, newNote]
                    console.log(notes)
                })
        //   fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        //     if(err) {
        //       console.log(err)
        //     } else {
        //       const parsedNotes = JSON.parse(data)
        //       parsedNotes.push(newNote)
        //       // console.log(parsedNotes) 
        //       fs.writeFile(
        //         './db/db.json',
        //         JSON.stringify(parsedNotes, null, 4),
        //         (writeErr) => {
        //           writeErr
        //             ? console.error(writeErr)
        //             : console.info('Successfully updated reviews!')
        //             // res.json(parsedNotes)
        //         }
        //       )
        //     }
        //   })
          
          // const response = {
          //   status: 'success',
          //   body: newNote
          // }
      
          // console.log(response)
          // res.status(200).json(response) 
        } else {
          res.status(500).json('Error in posting review');
        }
    }
}

module.exports = new Note()
