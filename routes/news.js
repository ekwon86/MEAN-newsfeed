const express = require('express');
const router = express.Router();
const config = require('../config/database');
const News = require('../models/news');

router.post('/new', (req, res, next) => {
    let newNews = new News({
        title: req.body.title,
        month: req.body.month,
        day: req.body.day,
        year: req.body.year,
        snippet: req.body.snippet,
        url: req.body.url
    });

    News.addNews(newNews, (err, news) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to save news article ' + err });
        } else {
            res.json({ success: true, msg: 'News article saved' });
        }
    });
});

router.get('/all_news', (req, res) => {
    News.find({}, (err, news) => {
        if(err) {
            res.json({ success: false, message: err });
        } else {
            if(!news) {
                res.json({ success: false, message: 'No news articles found' });
            } else {
                res.json({ success: true, news: news });
            }
        }
    }).sort({ '_id': -1 });
});

module.exports = router;