const Event = require('../models/Event');
const Attendee = require('../models/Attendee');

const jwt = require('jsonwebtoken');


exports.createEvent = async (req, res) => {
    const {name, date, location, description} = req.body;
    if(!name || !date || !location || !description){
        return res.status(400).json({"error": "Event must has a name, date, location and brief description"});
    }

    try {
        // get the logged in user and set user as creator of event
        const authToken = req.headers.authorization.split(' ')[1];
        let creatorEmail = '';
        jwt.verify(
            authToken,
            process.env.AUTH_SECRET_KEY,
            async (err, decoded) => {
                if (err) {
                    if(err.message === "invalid signature") return res.status(403).json({error: "Access token is incorrect"});
    
                    if(err.message === "jwt expired") return res.status(403).json({error: "Access Token Expired. Kindly login again"});
    
                    return res.status(403).json({error: err.message});
                }
                console.log("From the model: ", decoded);
                creatorEmail = decoded.email;
            }
        )
        const newEvent = await Event.create({name, date, location, description, isCreatedBy: creatorEmail});
        res.status(201).json({"message": "Event created successfully", event: {...newEvent._doc, attendees: []}});
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