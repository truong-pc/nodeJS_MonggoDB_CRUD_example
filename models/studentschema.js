// Filename : studentschema.js 

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    StudentId: Number,
    name: String,
    email: String,
    birthday: Date,
    address: String
});

module.exports = mongoose.model('student', StudentSchema, 'Students');
