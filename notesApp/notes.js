const fs = require('fs')
const chalk = require('chalk')
const greenInverseItalic = chalk.green.inverse.italic.bold;
const redInverseItalic = chalk.red.inverse.italic.bold;

const readNote = (title) => {
    const allNotes = loadNotes()
    const noteToRead = allNotes.find((note) => {
        console.log('comparing ' + note.title + ' with ' + title)
        return note.title === title
    })
    if (noteToRead) {
        console.log(chalk.inverse(noteToRead.title))
        console.log(chalk.italic(noteToRead.body))
    } else {
        console.log(redInverseItalic('Note ' + title + ' was not found...'))
    }
}

const addNote = (title, body) => {
    const allNotes = loadNotes()
        // const duplicateNotesTitle = allNotes.filter((note) => {
        //     console.log('comparing ' + note.title + ' with ' + title)
        //     return note.title === title
        // })
        // Using find to break the loop once we find a duplicate title. 

    const duplicateNotesTitle = allNotes.find((note) => {
        console.log('comparing ' + note.title + ' with ' + title)
        return note.title === title
    })
    debugger
    if (!duplicateNotesTitle) {
        allNotes.push({
            title: title,
            body: body
        })
        saveNotes(allNotes)
        console.log(allNotes);
        console.log(greenInverseItalic('New note added successfully...'))
    } else {
        console.log(redInverseItalic('Duplicate note title found...'))
    }
}

const removeNote = (title) => {
    const allNotes = loadNotes()
    const notesToKeep = allNotes.filter((note) => {
        console.log('comparing ' + note.title + ' with ' + title)
        return note.title !== title
    })
    if (allNotes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(greenInverseItalic('Note ' + title + ' removed successfully...'))
    } else {
        console.log(redInverseItalic('Note ' + title + ' was not found...'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('allNotes.json')
        const dataJSON = dataBuffer.toString()
        console.log('Exising data is: ' + dataJSON)
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (allNotes) => {
    const dataJSON = JSON.stringify(allNotes)
    fs.writeFileSync('allNotes.json', dataJSON)
}

const listNotes = () => {
    const allNotes = loadNotes()
    console.log(chalk.yellow.bold.inverse.italic('Your Notes:'))
    allNotes.forEach(note => {
        console.log(note.title)
    });
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}


// const fs = require('fs'); // node requires fs module.
// const path = './notes-app.txt'
// try {
//     if (fs.existsSync(path)) {
//         console.log('notes-app file exists. Hence contents will be appended.')
//         fs.appendFileSync('notes-app.txt', ' This content has been appended.')
//     } else {
//         console.log('notes-app file does not exists. Hence creating new file.')
//         fs.writeFileSync('notes-app.txt', 'This file was created by node.js !')
//     }
// } catch (err) {
//     console.error(err)
// }