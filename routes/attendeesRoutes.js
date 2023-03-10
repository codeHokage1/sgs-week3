const express = require('express');
const attendeesRoutes = express.Router();

//import controllers
const attendeeController = require('../controllers/attendeeController');

attendeesRoutes
        .get('/', attendeeController.getAllAttendees)

module.exports = attendeesRoutes;