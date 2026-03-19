const express = require('express');

const authRouter = express.Router();
const {signUp} = require('../controllers/auth.controller');
const {body} = require('express-validator');

authRouter.post('/signup' ,[
    // validation using express validator:
    body('firstName').notEmpty().withMessage("First name is required"),
    body('lastName').notEmpty().withMessage("Last name is required"),
    body('username').notEmpty().withMessage("Username is required"),
    body('email').isEmail().withMessage("Please provide a valid email address"),
    body('password').isLength({min : 6}).withMessage("Password must be at least 6 characters long")
] , signUp);









module.exports = authRouter;