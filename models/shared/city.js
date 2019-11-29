const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "State"
    },
}, { timestamps: true });

module.exports = mongoose.model('City', schema);