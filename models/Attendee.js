const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    attendeeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eventsIds : [{
        type: String,
    }]
})

module.exports = mongoose.model('Attendee', attendeeSchema);