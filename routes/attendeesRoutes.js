const express = require('express');
const attendeesRoutes = express.Router();

//import controllers
const attendeeController = require('../controllers/attendeeController');

// import middleware
const adminOnly = require('../middlewares/adminOnly');


attendeesRoutes
        .get('/', adminOnly, attendeeController.getAllAttendees)

module.exports = attendeesRoutes;