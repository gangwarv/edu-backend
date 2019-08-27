const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true
    },
    module: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:12
    },
    userType: {
        type: String,
        required: true,
        default: 'admin'
    },
    retryAttempts: Number,
    blocked: Boolean,
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', schema);