const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    session: {
        type: String,
        required: true
    },
    student: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    course: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
}, { timestamps: true });

module.exports = mongoose.model('StudentSession', schema);