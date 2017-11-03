const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

/** USER SCHEMA **/
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const User = module.exports = mongoose.model('User', UserSchema);


module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

