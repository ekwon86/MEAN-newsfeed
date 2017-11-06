const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Event = require('../models/event');

router.post('/new', (req, res, next) => {
    let newEvent = new Event({
        name: req.body.name,
        month: req.body.month,
        day: req.body.day,
        city: req.body.city,
        state: req.body.state,
        url: req.body.url
    });

    Event.addEvent(newEvent, (err, event) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to save event' });
        } else {
            res.json({ success: true, msg: 'Event saved' });
        }
    });
});

router.get('/all_events', (req, res) => {
    Event.find({}, (err, events) => {
       if(err) {
           res.json({ success: false, message: err });
       } else {
           if (!events) {
               res.json({ success: false, message: 'No events found' });
           } else {
               res.json({ success: true, events: events });
           }
       }
    });
});

module.exports = router;