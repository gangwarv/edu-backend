const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        ref:"FeeGroup",
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    }
}, { timestamps: true });

schema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('FeeItem', schema);