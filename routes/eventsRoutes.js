const express = require('express');
const eventRouter = express.Router();

// import controllers
const eventsController = require('../controllers/eventsController');

eventRouter
        .get('/', eventsController.getAllEvents)
        .post('/', eventsController.createEvent)
        .get('/:eventId', eventsController.getOneEvent)
        .get('/:eventId/attendees', eventsController.getAttendeesOfOneEvent)
        .post('/:eventId/attendees', eventsController.createNewAttendeeForOneEvent)
        .get('/:eventId/attendees/:attendeeId', eventsController.getOneAttendeeOfOneEvent)
        .put('/:eventId/attendees/:attendeeId', eventsController.editOneAttendeeForOneEvent)
        .delete('/:eventId/attendees/:attendeeId', eventsController.deleteOneAttendeeForOneEvent)


module.exports = eventRouter;