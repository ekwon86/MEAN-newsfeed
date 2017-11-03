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
        if(!user){
            return res.json({ success: false, message: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 Week  in seconds
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        username: user.username
                    }
                });
            } else {
                res.json({ success: false, message: 'Password is incorrect.' })
            }
        });
    })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;