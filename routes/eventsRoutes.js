const express = require('express');
const eventRouter = express.Router();

// import controllers
const eventsController = require('../controllers/eventsController');
const attendeeController = require('../controllers/attendeeController');

eventRouter
        .get('/', eventsController.getAllEvents)
        .post('/', eventsController.createEvent)
        .get('/:eventId', eventsController.getOneEvent)
        .get('/:eventId/attendees', attendeeController.getAttendeesOfOneEvent)
        .post('/:eventId/attendees', attendeeController.createAttendeeForEvent)
        .get('/:eventId/attendees/:attendeeId', attendeeController.getOneAttendeeInOneEvent)

        .put('/:eventId/attendees/:attendeeId', attendeeController.editOneAttendeeForOneEvent)
        .delete('/:eventId/attendees/:attendeeId', attendeeController.deleteOneAttendeeFromOneEvent)


module.exports = eventRouter;