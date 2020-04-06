const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

        default: 'STD'
    },
    // completed: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // }
}, { timestamps: true });

module.exports = mongoose.model('FeeCategory', schema);