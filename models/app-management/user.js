const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
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
        default: 'admin'
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    },
    retryAttempts: Number,
    blocked: Boolean
}, { timestamps: true });

module.exports = mongoose.model('User', schema);