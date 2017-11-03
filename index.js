const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const port = process.env.PORT || 8080;
const app = express();


/*** MongoDB Connection ***/
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
   console.log('Connected to database ' + config.database);
});
mongoose.connect.on('error', (err) => {
   console.log('There was an error connecting to the database: ' + err);
});



/*** Middleware ***/
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());



/*** App get route / misc. ***/
app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});