const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Role"
    },
    path: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
        default: 'left'
    },
    sortOrder: String,
    disabled: Boolean
});

module.exports = mongoose.model('Menu', schema);