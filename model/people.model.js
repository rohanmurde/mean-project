const mongoose = require('mongoose');

var ContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Required'
    },
    address: {
        type: String,
        required: 'Required'
    },
    phone: {
        type: String,
        required: 'Required'
    }
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);