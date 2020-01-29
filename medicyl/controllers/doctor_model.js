var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new Schema({
    username: String,
    fullname: String,
    contact: String,
    dob: String,
    age: String,
    gender: String,
    usertype: String,
    specialization: String,
    experience: String,
    hospital: String,
    patientlist: Array
})

module.exports = mongoose.model('doctors', doctorSchema); 