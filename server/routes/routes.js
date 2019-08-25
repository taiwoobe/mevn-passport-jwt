const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/authenticationController');
const isAuthenticated = require('../authentication/auth');

router.post('/register', AuthenticationController.register);
router.post('/login', AuthenticationController.login);

// Export API routes
module.exports = router;
