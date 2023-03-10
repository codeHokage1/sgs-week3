const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authToken = req.cookies.jwt;
    
    if (!authToken) {
        return res.status(401).send("Kindly log in")
    }

    console.log(authToken)
    jwt.verify(
        authToken,
        process.env.AUTH_SECRET_KEY,
        (err, decoded) => {
            if (err) {
                return res.status(401).send("Kindly log in")
            }
            console.log(decoded)
            next();
        }
    )
}

module.exports = authenticate;