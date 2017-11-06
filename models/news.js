const mongoose = require('mongoose');
const config = require('../config/database');

/** NEWS SCHEMA **/
const NewsSchema = mongoose.Schema({
    title: {
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
    year: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const News = module.exports = mongoose.model('News', NewsSchema);

module.exports.addNews = function(newNews, callback) {
    newNews.save(callback);
};