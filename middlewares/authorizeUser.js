const User = require('../models/User');
const Event = require('../models/Event');

const jwt = require('jsonwebtoken')

const authorizeUser = async (req, res, next) => {
        const {eventId} = req.params;
        const authToken = req.headers.authorization.split(' ')[1];

        jwt.verify(
            authToken,
            process.env.AUTH_SECRET_KEY,
            async (err, decoded) => {
                if (err) {
                    // return res.status(401).send("Kindly log in")
                    if(err.message === "invalid signature") return res.status(403).json({error: "Access token is incorrect"});
    
                    if(err.message === "jwt expired") return res.status(403).json({error: "Access Token Expired. Kindly login again"});
    
                    return res.status(403).json({error: err.message});
                }
                console.log("From authorizer: ", decoded);
                try {
                    const foundEvent  = await Event.findOne({_id: eventId});

                    //confirm if the logged in user is the creator of the event
                    if(foundEvent.isCreatedBy !== decoded.email) return res.status(401).json({
                        message: "Not authorized. Login as the event creator to continue"
                    })
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({error: error.message});
                }

                next();
            }
        )
}

module.exports = authorizeUser;