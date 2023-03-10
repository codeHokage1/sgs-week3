exports.getAllEvents = (req, res) => {
    res.send('Here are all the events');
}

exports.getOneEvent = (req, res) => {
    res.send('One particular event');
}

exports.getAttendeesOfOneEvent = (req, res) => {
    res.send('All attendees for one particular event');
}

exports.createNewAttendeeForOneEvent = (req, res) => {
    res.send('Create new attendee for one particular event');
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