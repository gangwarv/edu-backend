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
    departmentName: String,
    department: {
        type: mongoose.Types.ObjectId,
        ref: "AcademicDepartment"
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', schema);