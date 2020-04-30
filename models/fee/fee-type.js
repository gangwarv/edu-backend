const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

// schema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('FeeType', schema);