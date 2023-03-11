const mongoose = require('mongoose');

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
    attendeesCount : {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Event', eventSchema);