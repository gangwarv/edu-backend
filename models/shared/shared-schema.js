const mongoose = require('mongoose');

const mobile = {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 13,
    trim: true
}
const address = new mongoose.Schema({
    city: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    state: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    pin: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 6
    },
    address: {
        type: String,
        require: true
    },
    landmark: String
});

module.exports = {
    mobile,
    address
}