const mongoose = require('mongoose');
const config = require('../config/database');

/** FEATURE SCHEMA **/
const FeatureSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Feature = module.exports = mongoose.model('Feature', FeatureSchema);

module.exports.addFeature = function(newFeature, callback) {
    newFeature.save(callback);
};