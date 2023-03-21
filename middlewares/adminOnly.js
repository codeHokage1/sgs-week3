const User = require('../models/User');
const Event = require('../models/Event');

const jwt = require('jsonwebtoken')

const adminOnly = async (req, res, next) => {
        const authToken = req.headers.authorization.split(' ')[1];

        jwt.verify(
            authToken,
            process.env.AUTH_SECRET_KEY,
            async (err, decoded) => {
                if (err) {
                    if(err.message === "invalid signature") return res.status(403).json({error: "Access token is incorrect"});
    
                    if(err.message === "jwt expired") return res.status(403).json({error: "Access Token Expired. Kindly login again"});
    
                    return res.status(403).json({error: err.message});
                }
                console.log("From adminOnly: ", decoded);
                try {

                    //confirm if the logged in user is an admin
                    if(decoded.role === 'admin') {
                        next();
                    }
                    else{
                        return res.status(401).json({
                            message: "Not authorized. Login as an Admin to continue"
                        })
                    }
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({error: error.message});
                }


            }
        )
}

module.exports = adminOnly;