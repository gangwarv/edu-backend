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
        enum:['UG','PG'],
        required: true,
        default: "UG"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    admissionOpen: {
        type: Boolean,
        default: false
    },
    admissionLastDate: {
        type: Date
    },
    isLateral: {
        type: Boolean,
        default: false
    },
    duration: {
        type: String,
        required: true
    }
}, { timestamps: true });

// schema.index({ name: 1 }, { unique: true }); not required

module.exports = mongoose.model('Course', schema);