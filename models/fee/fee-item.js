const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // displayName: {
    //     type: String,
    //     required: true
    // },
    type: {
        type: String
    }
}, { timestamps: true });

schema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('FeeItem', schema);