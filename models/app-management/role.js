const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    privileges: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Role', schema);