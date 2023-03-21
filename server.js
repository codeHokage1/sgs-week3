const express = require('express');
require('dotenv').config();

// import internal and external modules
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const attendeesRoutes = require('./routes/attendeesRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const connectDB = require('./config/dbConfig');
const authenticate = require('./middlewares/authenticate');


// create express app
const app = express();

// set up middlewares
app.use(express.json());
app.use(cookieParser())

// set up routes
app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', authenticate, eventsRoutes);
app.use('/api/v1/attendees', authenticate, attendeesRoutes);
app.use('/api/v1/users', authenticate, usersRoutes);



// start app
const PORT = process.env.PORT;
connectDB();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

module.exports = app;