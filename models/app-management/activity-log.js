const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    data: {
        type: String
    },
    userId:{
        type: String
    },
    userName:{
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', schema);