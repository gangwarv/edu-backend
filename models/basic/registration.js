const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	session: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
	lastName: {
        type: String,
        required: true
    },
	gender: {
        type: String,
        required: true
    },
	dateOfBirth: {
        type: Date
    },
	mobile: {
        type: String,
        required: true
    },
	email: {
        type: String,
        required: true
    },
	course: {
        type: mongoose.Types.ObjectId,
        required: true,
		ref: "Course"
    },
	lateralEntry: {
        type: Boolean
    },
	category: {
        type: mongoose.Types.ObjectId,
        required: true
    },
	addresses: [
        {
			type: {
                type: String,
                require: true
            },
            city: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            state: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            pin: String,
            address1: {
                type: String,
                require: true
            },
            address2: String,
            landmark: String
        }
    ]
});

module.exports = mongoose.model('Registration', schema);