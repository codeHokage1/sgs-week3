const User = require('../models/User');
const emailSender = require('../config/emailConfig');

// import modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({error: 'Please provide email and password'});
    }

    try {
        // find user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({error: `User with email ${email} already exists`});
        }
        const newUser = await User.create({email, password: await bcrypt.hash(password, 10)});

        const htmlMessage = `
        <h1>Welcome ${newUser.email}!</h1>
        <p>This is the SGS Week 3 Task on Event Management API</p>
        `
        const emailInfo = await emailSender('SGS - Event Management API', htmlMessage, newUser.email);
        res.status(201).json({
            message: 'User created successfully',
            emailInfo : emailInfo.length ? "Welcome email sent!" : "Problem sending email. Kindly contact admin",
            newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

}

exports.loginUser = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({error: 'Please provide email and password'});
    }
    
    try {
        // check if user exists
        const foundUser = await User.findOne({email});
        if(!foundUser) {
            return res.status(404).json({error: `User with email "${email}" not found`});
        }
        
        if(!await bcrypt.compare(password, foundUser.password)){
            return res.status(400).json({error: 'Password is incorrect'})
        }

        const authToken = jwt.sign(
            { email: foundUser.email },
            process.env.AUTH_SECRET_KEY,
            { expiresIn: 3600 * 60 }
        )
        res.cookie('jwt', authToken, { httpOnly: true, maxAge: 3600 * 60 * 1000 });
        res.status(200).json({
            message: "Found user",
            foundUser, 
            jwt: authToken
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.logoutUser = (req, res) => {
    const authToken = req.cookies.jwt;
    if(!authToken) {
        return res.json({"message": "You are not logged in"})
    }

    res.clearCookie('jwt', {httpOnly: true});
    res.status(200).json({message: "Logged out successfully"});
};