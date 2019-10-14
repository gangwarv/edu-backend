const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12
    },
    userType: {
        type: String,
        required: true,
        default: 'individual'
    },
    userRef: {
        type: String
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    },
    retryAttempts: Number,
    isActive: {
        type: Boolean,
        default: true
    },
    blocked: Boolean
}, { timestamps: true });

module.exports = mongoose.model('User', schema);