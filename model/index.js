const mongoose = require('mongoose');
// const People = require('./people.model');

mongoose.connect('mongodb://localhost:27017/contactList', { useNewUrlParser: true, useUnifiedTopology: false }, (err) => {
    if (!err) {
        console.log('MongoDb > contactList connected.');
    } else {
        console.log('Error connecting to Database myAppCollection');
    }
});