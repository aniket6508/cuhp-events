const express = require("express");
const router = express.Router();

// Import necessary middleware and controllers
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const authController = require('../controllers/authController');

// Include the MongoDB connection
require("../DB/conn");

// Use the cookie-parser middleware with the router
router.use(cookieParser());

// Define routes and associate them with corresponding controller methods
router.post('/register', authController.register); 
router.post('/login', authController.login);
router.post('/passwordLink', authController.passwordLink);
router.get('/forgotPassword/:id/:token', authController.forgotPassword);
router.post('/:id/:token', authController.setNewPassword);

// Protected route requiring authentication middleware
router.post('/emailVerificationLink', authenticate,  authController.emailVerificationLink);
router.get('/verifyEmail/:id/:token', authController.verifyEmail);

// Logout route
router.get('/logout/:userId', authController.logout);

// Protected routes requiring authentication middleware
router.get('/about', authenticate, authController.about);
router.get('/getdata', authenticate, authController.getdata);
router.post('/contact', authenticate, authController.contact);

// Export the router to be used in other parts of the application
module.exports = router;
