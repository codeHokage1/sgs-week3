const Event = require('../models/Event');
const Attendee = require('../models/Attendee');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getOneEvent = async (req, res) => {
    try {
        const foundEvent = await Event.findById(req.params.eventId);
        if(!foundEvent) return res.status(404).json({message: `Event with id ${req.params.eventId} not found`});

        res.json(foundEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.createEvent = async (req, res) => {
    const {name, date, location, description} = req.body;
    if(!name || !date || !location || !description){
        return res.status(400).json({"error": "Event must has a name, date, location and brief description"});
    }

    try {
        const newEvent = await Event.create({name, date, location, description});
        res.status(201).json({"message": "Event created successfully", newEvent});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}
exports.getAttendeesOfOneEvent = async (req, res) => {
    try {
        const foundEvent = await Event.findById(req.params.eventId);
        if(!foundEvent) return res.status(404).json({message: `Event with id ${req.params.eventId} not found`});

        const eventAttendees = foundEvent.attendees;
        res.json({
            eventId: foundEvent._id,
            event: foundEvent.name,
            eventAttendees,
            message: "Get more details about attendees using their ids to '/attendees' route"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.createNewAttendeeForOneEvent = async (req, res) => {
    try {
        const foundEvent = await Event.findById(req.params.eventId);
        if(!foundEvent) return res.status(404).json({message: `Event with id ${req.params.eventId} not found`});

        const {name, email} = req.body;
        if(!name ||!email){
            return res.status(400).json({"error": "Attendee must have a name and email"});
        }

        // check whether the attendee exists
        const foundAttendee = await Attendee.findOne({email});
        if(foundAttendee){
            // add the current event id to its event Ids array
            foundAttendee.eventsIds = foundAttendee.eventsIds.push(req.params.eventId)
            foundAttendee.save();

            // add the attendee details to the event details
            foundEvent.attendees.push({attendeeId: newAttendee._id, attendeeEmail: newAttendee.email});
            foundEvent.save();
            return res.status(201).json({
                "message": "Attendee created successfully. Check '/attendees' routes for details",
                foundEvent
            })
        }
        // if the attendee does not exist before
        const newAttendee = await Attendee.create({
            name,
            email, 
            eventsIds: [foundEvent._id]
        });

        // add the attendee details to the event details
        foundEvent.attendees.push({attendeeId: newAttendee._id, attendeeEmail: newAttendee.email});
        foundEvent.save();

        res.status(201).json({
            "message": "Attendee created successfully. Check '/attendees' routes for details",
            foundEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getOneAttendeeOfOneEvent = (req, res) => {
    res.send('One attendee for one particular event');
}

exports.editOneAttendeeForOneEvent = (req, res) => {
    res.send('Edit one attendee for one particular event');
}

exports.deleteOneAttendeeForOneEvent = (req, res) => {
    res.send('Delete one attendee for one particular event');
}