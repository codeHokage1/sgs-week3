const Event = require('../models/Event');
const Attendee = require('../models/Attendee');

exports.createEvent = async (req, res) => {
    const {name, date, location, description} = req.body;
    if(!name || !date || !location || !description){
        return res.status(400).json({"error": "Event must has a name, date, location and brief description"});
    }

    try {
        const newEvent = await Event.create({name, date, location, description});
        res.status(201).json({"message": "Event created successfully", event: {newEvent, attendees: []}});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}


exports.getAllEvents = async (req, res) => {
    try {
        let events = await Event.find({});
        const attendees = await Attendee.find({});

        events = events.map(event => {
            return {
                ...event._doc, 
                attendees: attendees.filter(attendee => {
                    if(attendee.eventsIds.includes(event._id)){
                        return {name: attendee.name, email: attendee.email}
                    }
                })
            }
        })

        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getOneEvent = async (req, res) => {
    try {
        let foundEvent = await Event.findById(req.params.eventId);
        if(!foundEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        const attendees = await Attendee.find({});

        foundEvent = {
            event: foundEvent,
            attendeees: attendees.filter(attendee => {
                if(attendee.eventsIds.includes(foundEvent._id)){
                    return {name: attendee.name, email: attendee.email}
                }
            })
        }
            
        res.json(foundEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}