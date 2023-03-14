# Event Management API
This API allows users to manage events and events' attendees. As a user of the API, you can:
1. Create a new account or login into an existing one
2. Create a new event to be managed
3. Create attendees for each of the event
4. Edit the details of the attendees of any event
5. Delete the details of the attendees of any event

- Link to deployed API :link: : https://event-mgmt.onrender.com/
- Postman Published Documentation :link: : https://documenter.getpostman.com/view/23438041/2s93JwM1er
  
- Mailtrap.io Login details:
  - email: codeHokage1@gmail.com
  - password: AbdullahDev

## Requirements Analysis
### Entities
1. User - This is the event manager. A User would have a name, email and password
2. Event - This si the event that is being created, modified or deleted. The details of the event would include its name, date, location, description, number of atendees amongst others
3. Attendee - This is the attendeee of a particular event. An Attendee would have a name, email and a list of the events that they are attending. Each attendee wil get an email when they are added or removed from an event

### Entities' Relationships
1. A User can create many events
2. An Event can have many attendees
3. An Attendee can have many events

### Schema of Entities
1. **User:**
```
email:{
    type: String,
    required: true
}, 
password:{
    type: String,
    required: true
}
```
2. **Event:**
```
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
```
3. **Attendee:**
```
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
eventsIds : [{
    type: String
}]
```


## API Endpoints
1. **Users**

    *NOTE*: that no 2 users are allowed to have the same email address
```
POST /api/v1/auth/register  - Create a new user
{
    "email": "abc@gmail.com",
    "password": "test123"
}

POST /api/v1/auth/login     - Login a user
{
    "email": "abc@gmail.com",
    "password": "test123"
}

POST /api/v1/auth/logout    - Logout a user
```

2. **Events**

    *NOTE*: that these routes are protected and can only be accessed when a user is logged in
```
POST /api/v1/events         -  Create a new event
{
    "name": "Anime and Chill", 
    "date": "March 17, 2023",
    "location": "London",
    "description": "Chill, Vibe and Watch Anime"
}

GET /api/v1/events          - Get all events

GET /api/v1/events/:eventId     - Get details of single event

GET /api/v1/events/:eventId/attendees   - Get attendees of single event

POST /api/v1/events/:eventId/attendees     - Create attendee for a particular event
{
    "name": "Sodiq Farhan",
    "email": "sodiqfarhan@gmail.com"
}

GET /api/v1/events/:eventId/attendees/:attendeeId   - Get the details of an attendee of a particular event

PUT /api/v1/events/:eventId/attendees/:attendeeId   - Update the details of an attendee of a particular event
{
    "name": "Sodiq Farhan A.",
}

DELETE /events/:eventId/attendees/:attendeeId - Delete an attendee from a particular event
```

3. **Attendees:**

    *NOTE*: that these routes are protected and can only be accessed when a user is logged in
```
GET /api/v1/attendees   - Get all attendees create by a user with a list of events they are attending
```

## How to Use:
1. Visit the link: https://event-mgmt.onrender.com/
2. Use the routes(/path) as stipulated above, accordingly

## Technologies Used:
1. MongoDB & Mongoose
2. JWT
3. Express JS
4. Dotenv
5. Cookie Parser
6. Bcrypt
7. Nodemon
8. Nodemailer
9. Mailtrap.io