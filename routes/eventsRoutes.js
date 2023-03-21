const express = require('express');
const eventRouter = express.Router();

// import controllers
const eventsController = require('../controllers/eventsController');
const attendeeController = require('../controllers/attendeeController');

// import middleware
const authorizeUser = require('../middlewares/authorizeUser');

eventRouter
        .get('/', eventsController.getAllEvents)
        .post('/', eventsController.createEvent)
        .get('/:eventId', eventsController.getOneEvent)
        .delete('/:eventId', authorizeUser, eventsController.deleteEvent)

        .get('/:eventId/attendees', attendeeController.getAttendeesOfOneEvent)
        .post('/:eventId/attendees', authorizeUser, attendeeController.createAttendeeForEvent)
        .get('/:eventId/attendees/:attendeeId', attendeeController.getOneAttendeeInOneEvent)

        .put('/:eventId/attendees/:attendeeId', authorizeUser, attendeeController.editOneAttendeeForOneEvent)
        .delete('/:eventId/attendees/:attendeeId', authorizeUser, attendeeController.deleteOneAttendeeFromOneEvent)


module.exports = eventRouter;