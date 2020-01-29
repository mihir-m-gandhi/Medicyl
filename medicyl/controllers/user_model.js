var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    fullname: String,
    contact: String,
    dob: String,
    age: String,
    gender: String,
    usertype: String,
    height: String,
    weight: String,
    bloodgroup: String,
    criticalinfo: String
})

module.exports = mongoose.model('users', userSchema); 