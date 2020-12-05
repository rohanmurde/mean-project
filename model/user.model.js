const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: 'Required'
    },
    password: {
        type: String,
        required: 'Required'
    }
});

const user = module.exports = mongoose.model('user', userSchema);