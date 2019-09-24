const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        default:'NO_CODE'
    },
    name: {
        type: String,
        required: true
    },
    departmentName: String,
    department: {
        type: mongoose.Types.ObjectId,
        ref: "AcademicDepartment"
    },
    type: {
        type: String,
        required: true,
        default: "UG"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    activeForAdmission: Boolean,
    isLateral: {
        type: Boolean,
        default: false
    },
    duration: {
        type: String,
        required: true,
        default: '6-S' // or '6-s'
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', schema);