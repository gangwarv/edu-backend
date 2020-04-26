const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: Boolean,
    courses: [{
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }],
},{timestamps: true});

module.exports = mongoose.model('Department', schema);