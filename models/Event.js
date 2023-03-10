const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    id: {
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
    }
})

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    date:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    attendees: [{
        attendeeId: String,
        attendeeEmail: String
    }]
})

module.exports = mongoose.model('Event', eventSchema);