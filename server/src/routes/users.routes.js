const express = require('express');
const usersController = require('../controllers/users.controller');
const usersRoutes = express.Router();

usersRoutes.patch('/', usersController.updateBackupMessages);
usersRoutes.get('/', usersController.getBackupMessages);

module.exports = usersRoutes;
