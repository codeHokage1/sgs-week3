const jwt = require('jsonwebtoken');
const User  = require('../models/User')

const authenticate = async (req, res, next) => {
    // const authToken = req.cookies.jwt;
    if(!req.headers || !req.headers.authorization){
        return res.status(401).send("Kindly log in");
    }
    const authToken = req.headers.authorization.split(' ')[1];
    
    if (!authToken) {
        return res.status(401).send("Kindly log in")
    }
    
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
            console.log(decoded);
            if(!await User.findOne({email: decoded.email})){
                return  res.status(401).json({
                    error: "User does not exist"
                })
            }
            next();
        }
    )

    // next();
}

module.exports = authenticate;