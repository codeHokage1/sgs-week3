const express = require('express');
const attendeesRoutes = express.Router();

//import controllers
const attendeeController = require('../controllers/attendeeController');

// import middleware
const authorizeUser = require('../middlewares/authorizeUser');


attendeesRoutes
        .get('/', authorizeUser, attendeeController.getAllAttendees)

module.exports = attendeesRoutes;