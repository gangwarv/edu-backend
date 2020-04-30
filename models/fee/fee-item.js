const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        ref:"FeeType",
        required: true
    },
    typeName: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    }
}, { timestamps: true });

// schema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('FeeItem', schema);