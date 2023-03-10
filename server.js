const express = require('express');
require('dotenv').config();

// import internal and external modules
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const connectDB = require('./config/dbConfig');
const authenticate = require('./middlewares/authenticate')


// create express app
const app = express();

// set up middlewares
app.use(express.json());
app.use(cookieParser())
// set up routes
app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API');
});
app.use('/auth', authRoutes);
app.use('/events', authenticate, eventsRoutes);


// start app
const PORT = process.env.PORT;
connectDB();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})