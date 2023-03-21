const express = require('express');
const userRoutes = express.Router();

const usersControllers = require('../controllers/usersControllers')

userRoutes
        .get('/', usersControllers.getAllUsers)
        // .get('/:userId', usersControllers.getOneUser)
        .delete('/:userId', usersControllers.deleteOneUser)


module.exports = userRoutes;