const express = require('express')
const usersController = require('../controllers/users.controller')
const usersRoutes = express.Router()

usersRoutes.get('/', usersController.conectionResponse)

module.exports = usersRoutes