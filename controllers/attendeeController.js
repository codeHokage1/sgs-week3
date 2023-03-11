const Attendee = require('../models/Attendee');
const Event = require('../models/Event');

exports.getAllAttendees = async(req, res) => {
    try {
        const attendees = await Attendee.find({});
        res.json(attendees);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.createAttendeeForEvent = async (req, res) => {
    try {
        //find the event
        const foundEvent = await Event.findOne({_id: req.params.eventId});
        if(!foundEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        const {name, email} = req.body;
        if(!name ||!email){
            return res.status(400).json({"error": "Attendee must have a name and email"});
        }

        // check whether the attendee exists
        const foundAttendee = await Attendee.findOne({email});
        if(foundAttendee){
            // add the current event id to its event Ids array
            console.log()
            foundAttendee.eventsIds.push(req.params.eventId)
            foundAttendee.save();

            return res.status(201).json({
                "message": "Attendee created successfully",
                attendee: foundAttendee
            })
        }

        // if the attendee does not exist before
        const newAttendee = await Attendee.create({
            name,
            email, 
            eventsIds: [foundEvent._id]
        });

        // increase the attendees count in event
        foundEvent.attendeesCount++;
        foundEvent.save();

        res.status(201).json({
            "message": "Attendee created successfully",
            attendee: newAttendee
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getAttendeesOfOneEvent = async (req, res) => {
    try {
        //find the event
        const foundEvent = await Event.findOne({_id: req.params.eventId});
        if(!foundEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        // get all attendeess
        const allAttendees = await Attendee.find({});

        res.json({
            event: foundEvent.name,
            attendees: allAttendees.filter(attendee => attendee.eventsIds.includes(foundEvent._id))

        })       
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getOneAttendeeInOneEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const attendeeId = req.params.attendeeId;

        //find the event
        const foundEvent = await Event.findOne({_id: req.params.eventId});
        if(!foundEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        // get all attendeess
        const foundAttendee = await Attendee.findOne({_id: attendeeId});
        if(!foundAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if(!foundAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event "${eventId}"`});
        }

        res.json({
            event: foundEvent.name,
            attendee: foundAttendee
        })

         
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.editOneAttendeeForOneEvent = async(req, res) => {
    try {
        const {eventId, attendeeId} = req.params;

        //find the event
        const foundEvent = await Event.findOne({_id: eventId});
        if(!foundEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        //find the attendee and confirm if he is attending that event
        const foundAttendee = await Attendee.findOne({_id: attendeeId});
        if(!foundAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if(!foundAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event '${eventId}'`});
        }

        //update the details of the attendee
        if(!req.body) return res.status(400).json({message: "Update content can not be empty"});
        const updatedAttendee = await Attendee.findOneAndUpdate({_id: attendeeId}, req.body);

        res.json({
            message: "Attendee info updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteOneAttendeeFromOneEvent = async(req, res) => {
    try {
        const {eventId, attendeeId} = req.params;

        //find the event
        const foundEvent = await Event.findOne({_id: eventId});
        if(!foundEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        //find the attendee and confirm if he is attending that event
        let foundAttendee = await Attendee.findById(attendeeId);
        if(!foundAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if(!foundAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event '${eventId}'`});
        }

        //delete attendee from that event
        foundAttendee.eventsIds = foundAttendee.eventsIds.map(oneEventId => oneEventId !== eventId)
        foundAttendee.save();

        // decrease the attendees count in event
        foundEvent.attendeesCount--;
        foundEvent.save();

        res.json({
            message: "Attendee successfully removed from event"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}