const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressHandlebars = require('express-handlebars');
const connection = require('./model');
const api = require('./routes/api');
const port = 3000;

const app = express();

// use is used to customize express web server
app.use(bodyParser.urlencoded({
    extended: true
}))

// body-parse
app.use(bodyParser.json());

// adding middleware
app.use(cors());

// adding routes
app.use('/api', api);

// express to serve static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('ngApp'));

app.get('/help', (req, res) => {
    res.send('Help Express')
})

app.get('*', (req, res) => {
    res.send('<h1 style="color: red">My Error Page</h1>')
})

// express server begins listening for request in the browser
app.listen(port, () => {
    console.log("Server is running on localhost:" + port);
});