const Attendee = require('../models/Attendee')

exports.getAllAttendees = async(req, res) => {
    try {
        const attendees = await Attendee.find({});
        res.json(attendees);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}