const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const port = process.env.PORT || 8080;

// Connect to DB
mongoose.connect(config.database);

// If connection to DB successful
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// If there is an error connecting to DB
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');
const events = require('./routes/events');
const features = require('./routes/features');
const news = require('./routes/news');


// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/events', events);
app.use('/features', features);
app.use('/news/', news);

// Index Route
app.get('/', (req,res) => {
    res.send('Test');
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});
