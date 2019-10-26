const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/authenticationController');
const usersController = require('../controllers/usersController');
const authentication = require('../authentication/auth');

router.post('/register', AuthenticationController.register);
router.post('/register-admin', AuthenticationController.registerAdmin);
router.post('/login', AuthenticationController.login);
router.get('/users', authentication, usersController.getUsers);

// Export API routes
module.exports = router;
