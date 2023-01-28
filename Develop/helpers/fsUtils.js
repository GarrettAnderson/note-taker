const fs = require('fs')
const util = require('util')

const readNotes = util.promisify(fs.readFile)

class Note {
    read() {
        return readNotes('./db/db.json', 'utf-8')
    }
}

module.exports = new Note()
