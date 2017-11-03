const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({'username': req.body.username}, (err, user) => {
        if (user){
            return res.json({ success: false, message: 'Username already exists'});
        } else {
            User.addUser(newUser, (err, user) => {
                if(err){
                    res.json({success: false, msg:'Failed to register user'});
                } else {
                    res.json({success: true, msg:'User registered'});
                }
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
    });
});

module.exports = router;
