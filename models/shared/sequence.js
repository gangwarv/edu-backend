const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: String,
    sequence_value: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Sequence', schema);