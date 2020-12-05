const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const peopleModel = require('../model/people.model');
const userModel = require('../model/user.model');
const geocode = require('../utils/geocode')
const forecast = require('../utils/weather')

// add contact
router.post('/addPerson', (req, res) => {
    let newContact = new peopleModel({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });

    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: 'Failed to add contact...' });
        } else {
            res.json({ msg: 'Contact added successfully...' });
        }
    });
});

// retrieve contacts
router.get('/contacts', (req, res, next) => {
    peopleModel.find((err, contacts) => {
        res.json(contacts);
    })
});

// delete contacts
router.delete('/contact/:id', (req, res, next) => {
    peopleModel.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

// register new user
router.post('/register', (req, res) => {
    const userData = req.body;
    let user = new userModel(userData);

    user.save((err, registeredUser) => {
        if (err) {
            res.json({ msg: 'Failed to add contact...' });
        } else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token });
        }
    });
})

// login a user
router.post('/login', (req, res) => {
    const userData = req.body;
    userModel.findOne({
        email: userData.email
    }, (err, registeredUser) => {
        if (err) {
            console.log('Error detected...' + err);
        } else {
            if (!registeredUser) {
                res.status(401).send('Invalid email');
            } else {
                if (registeredUser.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: registeredUser._id };
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token });
                }
            }
        }
    })
})

// fetching events
router.get('/events', (req, res) => {
    let events = [{
        "_id": 1,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 2,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 3,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 4,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 5,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 6,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 7,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 8,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 9,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 10,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }]

    res.json(events);
});

// fetching special events
router.get('/special', verifyToken, (req, res) => {
    let events = [{
        "_id": 1,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 2,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 3,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 4,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 5,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 6,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 7,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 8,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }, {
        "_id": 9,
        "name": "Agri Expo",
        "description": "All about agriculture",
        "date": "2020-07-23T18:25:43.511Z"
    }, {
        "_id": 10,
        "name": "Tech Expo",
        "description": "All about latest technologies",
        "date": "2020-08-23T20:25:42.511Z"
    }]

    res.json(events);
});

// middleware to verify token coming from front-end is valid or not.
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized user request.');
    }
    let retrieveToken = req.headers.authorization.split(' ')[1];
    if (retrieveToken === 'null') {
        return res.status(401).send('Unauthorized user request.');
    }
    let payload = jwt.verify(retrieveToken, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized user request.');
    }
    req.userId = payload.subject;
    next();
}



// API's For weather-app
router.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address in your request.'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ Error: error })
        }
        forecast(data.lat, data.long, data.location, (err, forecastData) => {
            if (err) {
                return res.send({ Forecast_Error: err })
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

module.exports = router;