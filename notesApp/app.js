const myNotes = require('./notes')

// A library of string validators and sanitizers.
const validator = require('validator')

// Terminal string styling using chalk
const chalk = require('chalk')

// Yargs helps you build interactive command line tools,
// by parsing arguments and generating an elegant user interface. 
const yargs = require('yargs')

yargs.command({
    command: 'add',
    describe: '--To add a new note',
    builder: {
        title: {
            describe: 'A title for your note.',
            demandOption: true, // mandatory title parameter.
            type: 'string'
        },
        body: {
            describe: 'A body for your note.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        myNotes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: '--To remove a new note',
    builder: {
        title: {
            describe: 'A title for your note.',
            demandOption: true, // mandatory title parameter.
            type: 'string'
        }
    },
    handler(argv) {
        myNotes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: '--To read a new note',
    builder: {
        title: {
            describe: 'A title for your note.',
            demandOption: true, // mandatory title parameter.
            type: 'string'
        }
    },
    handler(argv) {
        myNotes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: '--To list all notes',
    handler(argv) {
        myNotes.listNotes()
    }
})

// console.log(validator.isURL('https://www.google.com'))
// console.log(process.argv) // prints the cmd line arguemntsPropTypes.any
// console.log(yargs.argv)

yargs.parse()