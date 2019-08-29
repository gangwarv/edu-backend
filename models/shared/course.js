const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "UG"
    },
    activeForAdmission: Boolean,    
    isActive: Boolean,    
    department: {
        type: String,
        required: true
    },
    courses: {
        type: mongoose.Types.ObjectId,
        ref: "AcademicDepartment"
    },
    department: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Course', schema);