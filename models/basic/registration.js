const mongoose = require('mongoose');
const { mobile, address } = require('../shared/shared-schema');

const schema = new mongoose.Schema({
    session: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        lowercase: true, 
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true, 
        trim: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    mobile: mobile,
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    lateralEntry: {
        type: Boolean
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    // city: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
    paddresses: address,
    caddresses: address,
    nationality: {
        type: String,
        required: true,
        default: 'indian'
    },
});

module.exports = mongoose.model('Registration', schema);