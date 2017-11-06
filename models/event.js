const mongoose = require('mongoose');
const config = require('../config/database');

/** EVENT SCHEMA **/
const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.addEvent = function(newEvent, callback) {
    newEvent.save(callback);
};