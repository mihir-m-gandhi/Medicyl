var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema({
    username: String,
    name: String,
    type: String,
    description: String,
    date: String
})

module.exports = mongoose.model('documents', documentSchema); 