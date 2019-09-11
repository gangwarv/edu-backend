const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    privileges: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Role', schema);