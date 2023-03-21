const express = require('express');
const userRoutes = express.Router();
const adminOnly = require('../middlewares/adminOnly')
const usersControllers = require('../controllers/usersControllers')

userRoutes
        .get('/', adminOnly, usersControllers.getAllUsers)
        // .get('/:userId', usersControllers.getOneUser)
        .delete('/:userId', adminOnly, usersControllers.deleteOneUser)


module.exports = userRoutes;