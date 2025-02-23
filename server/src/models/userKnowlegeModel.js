const mongoose = require('mongoose');

const userKnowlegeSchema = new mongoose.Schema({
    email : String,
    topics : [String,],
    rating :[Number,]
})

const userKnowlegeModel = mongoose.model('UserKnowlege', userKnowlegeSchema);

module.exports = userKnowlegeModel